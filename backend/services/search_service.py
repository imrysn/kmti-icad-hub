from ..rag_engine import rag_engine
from ..schemas import SearchResponse, SearchResult, MediaAsset
from ..models import MediaMetadata
from ..database import SessionLocal
from sqlalchemy import or_


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
