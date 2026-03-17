import os
from pathlib import Path
from dotenv import load_dotenv

# Walk up from this file to find the project root .env
_env_path = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(dotenv_path=_env_path)

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
        """
        RAG-grounded chat.
        """
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

        # Step 3: Prune History & Build Context
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

        regeneration_instruction = ""
        if is_regeneration:
            regeneration_instruction = "\n\nCRITICAL: This is a REGENERATION request. Provide a DIFFERENT approach/explanation."

        system_prompt = (
            "You are the iCAD Intelligence Node. Answer ONLY based on the provided context.\n\n"
            "STRICT GUIDELINES:\n"
            "1. GROUNDED: Use ONLY provided context. If missing, say you don't know.\n"
            "2. CITATIONS: Use [1], [2], etc. immediately after sentences that use info from a source. Match the indices from the context.\n"
            "3. STRUCTURE: Use Markdown. Bold key terms.\n"
            "4. SUGGESTIONS: Mention 1-2 related concepts at the end naturally.\n"
            f"5. LANGUAGE: Respond in {target_lang}."
            f"{regeneration_instruction}"
        )

        user_prompt = f"Context:\n{context_text}\n\n{history_text}User: {message}\n\nAssistant:"

        # Step 5: Call Gemini
        answer = self._call_gemini(system_prompt, user_prompt, images)
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
        """
        Streaming version of chat. Yields dictionary chunks.
        """
        # Step 1: Retrieve context
        print(f"[chat_stream] Starting search for: {message[:50]}...")
        try:
            search_response = self.search.search_knowledge_base(message)
            sources = search_response.results
            serialized_sources = [s.model_dump() for s in sources[:5]]
            print(f"[chat_stream] Search complete. Found {len(sources)} sources.")
        except Exception as e:
            print(f"[chat_stream] Search error: {e}")
            yield {"type": "content", "delta": f"\n\n(Error during knowledge search: {str(e)})"}
            return

        if not sources:
            print("[chat_stream] No sources found.")
            yield {"type": "content", "delta": "I couldn't find any relevant information in the knowledge base."}
            yield {"type": "end", "sources": [], "suggestions": []}
            return

        # Step 2: Prune History & Build Context
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

        regeneration_instruction = ""
        if is_regeneration:
            regeneration_instruction = "\n\nCRITICAL: This is a REGENERATION request. Provide a DIFFERENT approach/explanation."

        system_prompt = (
            "You are the iCAD Intelligence Node. Answer ONLY based on the provided context.\n"
            "STRICT GUIDELINES:\n"
            "1. GROUNDED: Use ONLY provided context.\n"
            "2. CITATIONS: Use [1], [2], etc. immediately after sentences. Match the context indices.\n"
            "3. STRUCTURE: Use Markdown.\n"
            f"4. LANGUAGE: Respond in {target_lang}."
            f"{regeneration_instruction}"
        )

        user_prompt = f"Context:\n{context_text}\n\n{history_text}User: {message}\n\nAssistant:"

        # Step 3: Async Stream from Gemini
        full_answer = ""
        try:
            from google import genai
            from google.genai import types
            
            client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
            
            # List of models confirmed to exist in this environment (March 2026)
            env_model = os.getenv("GEMINI_MODEL")
            models_to_try = [m for m in [
                env_model, 
                "models/gemini-2.5-flash", 
                "models/gemini-2.5-pro",
                "models/gemini-3.1-flash-lite-preview",
                "models/gemini-3-flash-preview",
                "models/gemini-2.0-flash",
                "gemini-1.5-flash" # Last resort
            ] if m]
            
            response_stream = None
            last_err = None
            
            for m_id in models_to_try:
                try:
                    print(f"[chat_stream] Trying Gemini model: {m_id}")
                    # Prepare parts including images for this attempt
                    parts = [types.Part.from_text(text=user_prompt)]
                    if images:
                        for img in images:
                            parts.append(types.Part.from_bytes(data=img["data"], mime_type=img["mime"]))
                    
                    contents = [types.Content(role="user", parts=parts)]

                    response_stream = await client.aio.models.generate_content_stream(
                        model=m_id,
                        contents=contents,
                        config=types.GenerateContentConfig(
                            system_instruction=system_prompt,
                            temperature=0.7,
                        )
                    )
                    # If we get here without exception, we tentatively have a stream
                    # But the exception might happen during iteration. We check the first chunk if possible.
                    break 
                except Exception as e:
                    print(f"[chat_stream] Model {m_id} failed: {e}")
                    last_err = e
                    continue

            if not response_stream:
                raise last_err or Exception("All Gemini models failed")

            print("[chat_stream] Awaiting Gemini stream chunks...")
            async for chunk in response_stream:
                if chunk.text:
                    full_answer += chunk.text
                    yield {"type": "content", "delta": chunk.text}
            
            print(f"[chat_stream] Gemini stream finished. Total content length: {len(full_answer)}")

        except Exception as e:
            print(f"[Streaming] Error: {e}")
            yield {"type": "content", "delta": "\n\n(Connection error during streaming. Please retry.)"}

        # Step 4: Final metadata
        suggestions = self._generate_suggestions(message, full_answer, context_text) if full_answer else []
        yield {
            "type": "end", 
            "full_answer": full_answer,
            "sources": serialized_sources, 
            "suggestions": suggestions
        }

    def _prune_history(self, history: List[ChatMessage], limit: int = 10) -> List[ChatMessage]:
        """Keep only the most recent N messages for context to prevent token bloat."""
        if not history:
            return []
        return history[-limit:]

    def _generate_suggestions(self, query: str, answer: str, context: str) -> List[str]:
        """
        PHASE 3 FEATURE #3: Generate 3 contextual follow-up questions using Gemini.
        This runs as a separate lightweight call after the main answer.
        """
        system_prompt = (
            "You are a learning assistant for iCAD technical training. "
            "Based on the user's question and the answer they received, suggest 3 natural follow-up questions "
            "that would help them deepen their understanding or explore related concepts. "
            "Each question should be:\n"
            "- 8-15 words long\n"
            "- Conversational and specific\n"
            "- Directly related to the topic\n"
            "- Actionable (user can ask it immediately)\n\n"
            "Return ONLY the 3 questions, one per line, no numbering or bullets."
        )
        
        user_prompt = (
            f"User asked: {query}\n\n"
            f"They learned: {answer[:400]}...\n\n"
            f"Context available in knowledge base:\n{context[:300]}...\n\n"
            "What 3 follow-up questions would help them learn more about this topic or related iCAD concepts?"
        )
        
        try:
            response = self._call_gemini(system_prompt, user_prompt)
            if response:
                # Parse lines, clean up, filter empty, limit to 3
                lines = [line.strip().strip('-•123456789.') for line in response.strip().split('\n')]
                suggestions = [line for line in lines if line and len(line) > 10][:3]
                return suggestions if len(suggestions) == 3 else []
        except Exception as e:
            print(f"[Suggestions] Generation error: {e}")
        
        return []

    def _call_gemini(self, system_prompt: str, user_prompt: str, images: List[dict] = None) -> Optional[str]:
        """Call Google Gemini API with retry on 429. Returns None if key is missing or all retries fail."""
        import time, re
        api_key = os.getenv("GOOGLE_API_KEY", "")
        if not api_key or api_key == "your_api_key_here":
            return None
        try:
            from google import genai
            from google.genai import types
            client = genai.Client(api_key=api_key)
            model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
        except Exception as e:
            print(f"[Gemini] Init error: {e}")
            return None

        max_retries = 3
        backoff = 10
        for attempt in range(max_retries):
            try:
                # Prepare contents: Text only or Text + Multiple Images
                parts = [types.Part.from_text(text=user_prompt)]
                if images:
                    for img in images:
                        parts.append(types.Part.from_bytes(data=img["data"], mime_type=img["mime"]))
                
                contents = [types.Content(role="user", parts=parts)]

                response = client.models.generate_content(
                    model=model_name,
                    contents=contents,
                    config=types.GenerateContentConfig(
                        system_instruction=system_prompt,
                        temperature=0.3,
                    )
                )
                return response.text.strip()
            except Exception as e:
                err_str = str(e)
                if "429" in err_str:
                    retry_after = backoff * (2 ** attempt)
                    match = re.search(r'retry_delay\s*\{\s*seconds:\s*(\d+)', err_str)
                    if match:
                        retry_after = int(match.group(1)) + 2
                    print(f"[Gemini] Rate limited. Retrying in {retry_after}s (attempt {attempt + 1}/{max_retries})...")
                    time.sleep(retry_after)
                else:
                    print(f"[Gemini] Error: {e}")
                    return None
        print("[Gemini] All retries exhausted.")
        return None

    def summarize_session_title(self, message: str, history: list) -> Optional[str]:
        """Generate a concise 3-5 word title for a session based on context."""
        system_prompt = "You are a session titler. Summarize the user's intent in exactly 3-5 words. No punctuation."
        user_history = "\n".join([f"{h.role}: {h.content[:100]}" for h in history[-4:]])
        user_prompt = f"History:\n{user_history}\nCurrent: {message}\n\nTitle:"
        
        title = self._call_gemini(system_prompt, user_prompt)
        if title:
            return title.strip().replace('"', '').replace('.', '')
        return None

    def _fallback_summary(self, query: str, sources) -> str:
        """Extractive fallback when Gemini API key is not configured."""
        top = sources[0]
        lines = [
            f"Based on the knowledge base, here is what I found regarding '{query}':",
            "",
            top.content,
        ]
        if len(sources) > 1:
            lines.append(
                f"\nAdditional context found in {len(sources) - 1} other source(s). See the Sources panel below."
            )
        lines.append(
            "\n⚠️ Gemini unavailable (no key configured, quota exceeded, or retries exhausted). "
            "Generate a new key at https://aistudio.google.com/apikey and update GOOGLE_API_KEY in .env"
        )
        return "\n".join(lines)


chat_service = ChatService(search_service)
