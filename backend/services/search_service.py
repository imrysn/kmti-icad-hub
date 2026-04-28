import os
from pathlib import Path
from dotenv import load_dotenv, find_dotenv

# Load environment variables from the project root
load_dotenv(find_dotenv())

import hashlib
import json
from datetime import datetime, timedelta
from typing import Optional, List

from ..rag_engine import rag_engine
from ..schemas import SearchResponse, SearchResult, MediaAsset, ChatMessage
from ..models import MediaMetadata, QueryCache
from ..database import SessionLocal
from sqlalchemy import or_

CACHE_TTL_HOURS = int(os.getenv("CHAT_CACHE_TTL_HOURS", "24"))


class SearchService:
    def __init__(self, engine):
        self.engine = engine
        # No persistent db session — use per-request context managers instead

    def search_knowledge_base(self, query: str) -> SearchResponse:
        """
        Search knowledge base and attach multimedia assets.
        This implements the Multimedia RAG concept.
        Each call opens and closes its own DB session to prevent connection leaks.
        """
        # Get text results from RAG engine
        raw_results = self.engine.search(query)

        source_ids = [r['id'] for r in raw_results]

        media_map: dict = {}
        if source_ids:
            # Use a per-request DB session (context manager closes it automatically)
            with SessionLocal() as db:
                # Use exact match instead of LIKE to avoid substring false positives
                media_records = db.query(MediaMetadata).filter(MediaMetadata.excel_row_id.in_(source_ids)).all()

                for m in media_records:
                    media_map.setdefault(m.excel_row_id, []).append(m)

        # Enrich results with multimedia assets
        enriched_results = []
        for r in raw_results:
            result = SearchResult(**r)
            related_media = media_map.get(result.id, []) # Use result.id to look up media

            if related_media:
                result.media = [
                    MediaAsset(
                        media_type=m.media_type,
                        media_url=m.media_url,
                        timestamp_start=m.timestamp_start,
                        timestamp_end=m.timestamp_end,
                        description=m.description,
                    )
                    for m in related_media
                ]

            enriched_results.append(result)

        return SearchResponse(query=query, results=enriched_results)


# Singleton instance
search_service = SearchService(rag_engine)


from .ai_service import ai_service

class ChatService:
    def __init__(self, search: SearchService):
        self.search = search

    def _make_cache_key(self, message: str, language: str, images: List[dict] = None) -> str:
        """SHA-256 of lowercased, stripped message + language code + image hashes."""
        img_hashes = ""
        if images:
            for img in images:
                # Hash the base64 data to ensure unique keys for different images
                img_hash = hashlib.md5(img["data"].encode('utf-8')).hexdigest()
                img_hashes += f":img{img_hash}"
        
        normalized = f"{language.lower()}:{message.strip().lower()}{img_hashes}"
        return hashlib.sha256(normalized.encode('utf-8')).hexdigest()

    def _get_cache(self, query_hash: str) -> Optional[dict]:
        """Return cached result if it exists and hasn't expired."""
        try:
            with SessionLocal() as db:
                entry = db.query(QueryCache).filter(
                    QueryCache.query_hash == query_hash,
                    QueryCache.expires_at > datetime.utcnow()
                ).first()
                if entry:
                    # Increment hit counter
                    entry.hit_count += 1
                    db.commit()
                    sources = json.loads(entry.sources_json) if entry.sources_json else []
                    return {
                        "answer": entry.answer,
                        "sources": sources,
                        "cached": True,
                        "suggestions": []  # PHASE 3: Cached responses don't include suggestions (performance)
                    }
        except Exception as e:
            print(f"[Cache] Read error: {e}")
        return None

    def _set_cache(self, query_hash: str, message: str, answer: str, sources: list) -> None:
        """Store a new cache entry, replacing any expired one with the same hash."""
        try:
            with SessionLocal() as db:
                existing = db.query(QueryCache).filter(QueryCache.query_hash == query_hash).first()
                if existing:
                    existing.answer = answer[:8000]
                    existing.sources_json = json.dumps(sources)[:16000]
                    existing.created_at = datetime.utcnow()
                    existing.expires_at = datetime.utcnow() + timedelta(hours=CACHE_TTL_HOURS)
                    existing.hit_count = 0
                else:
                    entry = QueryCache(
                        query_hash=query_hash,
                        query_text=message[:2000],
                        answer=answer[:8000],
                        sources_json=json.dumps(sources)[:16000],
                        expires_at=datetime.utcnow() + timedelta(hours=CACHE_TTL_HOURS),
                    )
                    db.add(entry)
                db.commit()
        except Exception as e:
            print(f"[Cache] Write error: {e}")

    async def chat(self, message: str, history: List[ChatMessage] = None, session_id: str = None, 
                   images: List[dict] = None, language: str = "en-US", is_regeneration: bool = False) -> dict:
        """RAG-grounded chat using AIService."""
        # Step 1: Cache check
        query_hash = self._make_cache_key(message, language, images)
        if not history and not is_regeneration:
            cached = self._get_cache(query_hash)
            if cached:
                return cached

        # Step 2: Retrieve context
        search_response = self.search.search_knowledge_base(message)
        sources = search_response.results

        if not sources:
            return {
                "answer": "I couldn't find any relevant information in the knowledge base for your question.",
                "sources": [],
                "cached": False,
                "suggestions": []
            }

        # Step 3: Build Prompt
        system_prompt, user_prompt, context_text = self._build_prompts(message, history, sources, language, is_regeneration)

        # Step 4: Call AIService
        answer = ai_service.generate_content(system_prompt, user_prompt, images)
        if answer is None:
            answer = self._fallback_summary(message, sources)

        serialized_sources = [s.model_dump() for s in sources[:5]]

        if not history and not is_regeneration and answer:
            self._set_cache(query_hash, message, answer, serialized_sources)

        suggestions = self._generate_suggestions(message, answer, context_text) if answer else []

        return {
            "answer": answer,
            "sources": serialized_sources,
            "cached": False,
            "suggestions": suggestions
        }

    async def chat_stream(self, message: str, history: List[ChatMessage] = None, 
                           images: List[dict] = None, language: str = "en-US", is_regeneration: bool = False):
        """Streaming version of chat using AIService."""
        search_response = self.search.search_knowledge_base(message)
        sources = search_response.results
        serialized_sources = [s.model_dump() for s in sources[:5]]

        if not sources:
            yield {"type": "content", "delta": "I couldn't find any relevant information in the knowledge base."}
            yield {"type": "end", "sources": [], "suggestions": []}
            return

        system_prompt, user_prompt, context_text = self._build_prompts(message, history, sources, language, is_regeneration)

        full_answer = ""
        try:
            async for chunk in ai_service.generate_content_stream(system_prompt, user_prompt, images):
                if chunk == "(Gemini API Key missing or invalid)":
                    # If we get the 'missing key' message, trigger fallback
                    full_answer = self._fallback_summary(message, sources)
                    yield {"type": "content", "delta": full_answer}
                    break
                full_answer += chunk
                yield {"type": "content", "delta": chunk}
        except Exception as e:
            print(f"[Chat] Stream error: {e}")
            if not full_answer:
                full_answer = self._fallback_summary(message, sources)
                yield {"type": "content", "delta": full_answer}

        suggestions = self._generate_suggestions(message, full_answer, context_text) if full_answer and "Gemini API is currently disabled" not in full_answer else []
        yield {
            "type": "end", 
            "full_answer": full_answer,
            "sources": serialized_sources, 
            "suggestions": suggestions
        }

    def _build_prompts(self, message: str, history: List[ChatMessage], sources: list, language: str, is_regeneration: bool):
        """Helper to construct system and user prompts uniformly."""
        pruned_history = self._prune_history(history or [])
        context_text = "\n\n".join([f"[{idx+1}] Source: {s.source}\nContent: {s.content}" for idx, s in enumerate(sources[:5])])
        
        history_text = ""
        if pruned_history:
            history_text = "Recent conversation flow:\n"
            for turn in pruned_history:
                role_label = "User" if turn.role == "user" else "Assistant"
                history_text += f"{role_label}: {turn.content}\n"

        lang_map = {"en-US": "ENGLISH", "ja-JP": "JAPANESE", "fil-PH": "FILIPINO (TAGALOG)"}
        target_lang = lang_map.get(language, "ENGLISH")

        reg_text = "\n\nCRITICAL: This is a REGENERATION request. Provide a DIFFERENT approach/explanation." if is_regeneration else ""

        system_prompt = (
            "You are the iCAD Technical Instructor. Answer comprehensively using the provided context as your foundation.\n\n"
            "STRICT GUIDELINES:\n"
            "1. GROUNDED & HELPFUL: Use the provided context to explain concepts. If a direct answer isn't present, synthesize a helpful explanation based on related info in the context. Only state you don't know if the context is entirely irrelevant.\n"
            "2. CITATIONS: Use [1], [2], etc. immediately after sentences that use info from a source. Match the indices from the context.\n"
            "3. STRUCTURE: Use Markdown. Bold key terms for clarity.\n"
            "4. ENGAGEMENT: End your response by asking if the explanation was helpful or if the user needs further clarification.\n"
            f"5. LANGUAGE: Respond in {target_lang}."
            f"{reg_text}"
        )

        user_prompt = f"Context:\n{context_text}\n\n{history_text}User: {message}\n\nAssistant:"
        return system_prompt, user_prompt, context_text

    def _prune_history(self, history: List[ChatMessage], limit: int = 10) -> List[ChatMessage]:
        if not history: return []
        return history[-limit:]

    def _generate_suggestions(self, query: str, answer: str, context: str) -> List[str]:
        system_prompt = (
            "You are a learning assistant for iCAD technical training. "
            "Suggest 3 natural follow-up questions (8-15 words). Return ONLY the questions, one per line."
        )
        user_prompt = f"User asked: {query}\n\nAnswer learned: {answer[:400]}\n\nContext available: {context[:300]}"
        
        response = ai_service.generate_content(system_prompt, user_prompt, temperature=0.7)
        if response:
            lines = [line.strip().strip('-•123456789.') for line in response.strip().split('\n')]
            return [line for line in lines if line and len(line) > 10][:3]
        return []

    def summarize_session_title(self, message: str, history: list) -> Optional[str]:
        system_prompt = "You are a session titler. Summarize the user's intent in exactly 3-5 words. No punctuation."
        user_history = "\n".join([f"{h.role}: {h.content[:100]}" for h in history[-4:]])
        user_prompt = f"History:\n{user_history}\nCurrent: {message}\n\nTitle:"
        
        title = ai_service.generate_content(system_prompt, user_prompt)
        if title:
            return title.strip().replace('"', '').replace('.', '')
        return None

    def _fallback_summary(self, query: str, sources) -> str:
        """Provide a structured, casual summary using 'THE AUTHENTIC COLLABORATOR' persona."""
        if not sources:
            return (
                "### I'D LOVE TO DIG INTO THAT...\n\n"
                "But honestly? It's not in my current records. 😅 \n\n"
                "> **Note:** Since my Gemini connection is a bit shaky right now, I'm relying purely on what's indexed.\n\n"
                "---\n\n"
                "**Next Step:** Try checking the standard operating procedures or rephrasing your query to be more general!"
            )
            
        # --- Small Talk / Self-Awareness Layer ---
        small_talk_patterns = {
            "name": "I'm the **iCAD Technical Instructor's assistant!** 🎓 My main AI brain is taking a quick rest (Gemini API is unavailable), but I've got the manual right here in front of me.",
            "how are you": "I'm doing great! Just keeping an eye on the technical documentation while the main AI system is resting.",
            "who are you": "I'm the **iCAD Technical Instructor!** At least, the offline version of him. I'm here to help you find what you need in our knowledge base.",
            "hello": "Hello! 👋 Glad to see you here. How can I help you with your iCAD training today?",
            "hi": "Hi there! 👋 How can I assist you with your project while the main AI is offline?",
            "help": "I'm here to help! My high-level AI brain is currently offline, but I can still search through all the technical tips and routines in our system."
        }
        
        lower_query = query.lower().strip()
        for key, response in small_talk_patterns.items():
            if key in lower_query:
                return f"### HEY THERE!\n\n{response}\n\n---\n\n**Try asking:** Anything about 2D Drawing, 3D Modeling, or BOM management!"

        # Persona logic: Wit + Empathy-Candor + Instruction-style rephrasing
        summary = "### ALRIGHT, I'VE DUG AROUND FOR YOU...\n\n"
        summary += f"My standard AI personality is currently taking a coffee break (Gemini API is unavailable), but I've found some specific records for **'{query}'** that should keep you moving. 🚀\n\n"
        
        summary += "> **Instructor Note:** I'm pulling these details directly from the source. No AI fluff, just the facts you need to know.\n\n"
        summary += "----\n\n"
        
        # Assertive instructor lead-ins
        lead_ins = [
            "For **{topic}**, remember that {info}",
            "Keep in mind for **{topic}**: {info}",
            "Pro Tip for **{topic}**: {info}",
            "Heads up regarding **{topic}**: {info}"
        ]
        
        # Filter sources by score threshold to avoid irrelevant noise
        # RRF scores with k=60 start around 0.016. 
        # A threshold of 0.015 ensures it was at least a top result in one search.
        relevant_sources = [s for s in sources if getattr(s, 'score', 0) > 0.015]
        
        if not relevant_sources:
            return (
                "### I'D LOVE TO DIG INTO THAT...\n\n"
                f"I've searched the logs for **'{query}'**, but I couldn't find a direct match in my current records. 😅 \n\n"
                "> **Note:** Since my Gemini connection is a bit shaky right now, I'm being extra cautious not to give you unrelated advice.\n\n"
                "---\n\n"
                "**Next Step:** Try rephrasing your query with more specific technical terms, or check the help menus directly!"
            )

        last_topic = None
        for i, source in enumerate(relevant_sources[:3]):
            content = source.content if hasattr(source, 'content') else ""
            meta = source.metadata or {}
            
            # --- Heuristic Data Analyzer ---
            # Split pipe-separated string and clean parts
            parts = [p.strip() for p in content.split('|') if p.strip()]
            
            # 1. Identify Main Topic
            main_topic = meta.get('main_topic') or (parts[0] if parts else 'Technical Detail')
            # Clean up topic (remove parenthetical numbers like (4) if repetitive)
            clean_topic = main_topic.split('(')[0].strip()
            
            # 2. Identify Instructional Content
            # We favor the 'instruction' metadata, or the longest part of the pipe-separated string
            primary_info = meta.get('instruction') or ''
            if len(primary_info) < 15 and parts:
                primary_info = max(parts, key=lambda p: len(p.split()))
            
            # 3. Format as Casual Conversation with Topic Grouping
            if primary_info and len(primary_info) > 15:
                # Auto-format lists/notes if detected
                if "Notes:" in primary_info:
                    primary_info = primary_info.replace("Notes:", "\n**Notes:**\n")
                
                # Grouping Logic: Only show header if topic changed
                if clean_topic != last_topic:
                    if last_topic is not None:
                        summary += "---\n\n" # Separator between DIFFERENT topics
                    summary += f"## {clean_topic}\n\n"
                
                # Use assertive instructor lead-in
                lead_in = lead_ins[i % len(lead_ins)].format(topic=clean_topic, info=primary_info)
                summary += f"{lead_in}\n\n"
                last_topic = clean_topic
            else:
                if clean_topic != last_topic:
                    if last_topic is not None:
                        summary += "---\n\n"
                    summary += f"## {clean_topic}\n\n"
                summary += f"{content}\n\n"
                last_topic = clean_topic
                
        summary += "---\n\n"
        summary += "### NEXT STEP\n"
        summary += "Scan those points to see if they address your needs. If not, try checking back in a few minutes when I'm 'fully conscious' again!"
        
        return summary


chat_service = ChatService(search_service)
