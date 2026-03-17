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

    def _make_cache_key(self, message: str, language: str) -> str:
        """SHA-256 of lowercased, stripped message + language code."""
        normalized = f"{language.lower()}:{message.strip().lower()}"
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
                    return {"answer": entry.answer, "sources": sources, "cached": True}
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
                   images: List[dict] = None, language: str = "en-US") -> dict:
        """
        RAG-grounded chat.
        1. Check query cache — return instantly if hit.
        2. Retrieve relevant context from ChromaDB.
        3. Call Gemini, cache result, return.
        """
        # Step 1: Cache check (only for standalone queries, not mid-conversation)
        query_hash = self._make_cache_key(message, language)
        if not history:  # Only cache first-turn queries
            cached = self._get_cache(query_hash)
            if cached:
                print(f"[Cache] HIT for: {message[:60]}")
                return cached

        # Step 2: Retrieve context
        search_response = self.search.search_knowledge_base(message)
        sources = search_response.results

        if not sources:
            return {
                "answer": "I couldn't find any relevant information in the knowledge base for your question. Try re-indexing or uploading related files.",
                "sources": [],
                "cached": False
            }

        # Step 3: Build Context Text & Prompts
        context_text = "\n\n".join([f"[{idx+1}] Source: {s.source}\nContent: {s.content}" for idx, s in enumerate(sources[:5])])
        
        history_text = ""
        if history:
            history_text = "Recent conversation flow:\n"
            for turn in history[-6:]: # Keep last 3 turns
                role_label = "User" if turn.role == "user" else "Assistant"
                history_text += f"{role_label}: {turn.content}\n"

        # Step 4: Full prompt
        lang_map = {
            "en-US": "ENGLISH",
            "ja-JP": "JAPANESE",
            "fil-PH": "FILIPINO (TAGALOG)"
        }
        target_lang = lang_map.get(language, "ENGLISH")

        system_prompt = (
            "You are the iCAD Intelligence Node — an expert AI training assistant for the KMTI iCAD system. "
            "Your role is to provide technically precise, RAG-grounded guidance based ONLY on the provided context.\n\n"
            "STRICT GUIDELINES:\n"
            "1. GROUNDED: Answer based strictly on the provided context. If the information is not present, explicitly state: 'I couldn't find specific information on this topic in the knowledge base.'\n"
            "2. STRUCTURE: Use Markdown for clarity. Use bold for key terms, lists for procedures, and code blocks for technical parameters or commands.\n"
            "3. EXPANSION: Explain the 'why' behind technical steps if mentioned in context to help the user learn.\n"
            "4. SUGGESTIONS: Conclude naturally by mentioning 1-2 related iCAD concepts the user might want to explore next (e.g., 'To learn more, you could look into X or Y'). Do not use a bullet list for this.\n"
            "5. NO FABRICATION: Do not hallucinate URLs, part numbers, or procedures not found in the documents.\n"
            f"6. LANGUAGE: YOU MUST RESPOND IN {target_lang}. Even if the user asks in a different language, your reply must be in {target_lang}."
        )

        user_prompt = (
            f"Context from knowledge base:\n{context_text}\n\n"
            f"{history_text}"
            f"User: {message}\n\nAssistant:"
        )

        # Step 5: Call Gemini, fall back to extractive summary
        answer = self._call_gemini(system_prompt, user_prompt, images)
        if answer is None:
            answer = self._fallback_summary(message, sources)

        serialized_sources = [s.model_dump() for s in sources[:5]]

        # Step 6: Write to cache (only standalone queries without history)
        if not history and answer:
            self._set_cache(query_hash, message, answer, serialized_sources)

        return {
            "answer": answer,
            "sources": serialized_sources,
            "cached": False
        }

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
