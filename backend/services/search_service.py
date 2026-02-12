from ..rag_engine import rag_engine
from ..schemas import SearchResponse, SearchResult, MediaAsset
from ..models import MediaMetadata
from ..database import SessionLocal

class SearchService:
    def __init__(self, engine):
        self.engine = engine
        self.db = SessionLocal()

    def search_knowledge_base(self, query: str) -> SearchResponse:
        """
        Search knowledge base and attach multimedia assets.
        This implements the Multimedia RAG concept.
        """
        # Get text results from RAG engine
        raw_results = self.engine.search(query)
        
        # Collect all source IDs for batch query
        source_ids = []
        for r in raw_results:
            # Assuming source format allows partial matching like "excel_row_5"
            source_ids.append(r['source'])
            
        # Batch query for media metadata
        # We use a LIKE query for each source OR-ed together, or if ID is exact, use IN
        # Given the original code used LIKE, we'll try to be efficient but cover the same logic.
        # If source is "excel_row_5", and DB has "excel_row_5", IN is better. 
        # But original used .like(f"%{result.source}%"), implying source might be a substring.
        # Let's assume for optimization that we can match on the ID directly or use a more efficient filter.
        # For now, we'll replicate the logic but in a single query if possible, or at least optimize.
        
        # If the RAG source is the exact ID in the DB, we can use IN.
        # Let's try to fetch all potentially relevant media in one go.
        media_map = {}
        if source_ids:
            # We'll fetch all media where excel_row_id is in our list of sources
            # To support the LIKE behavior efficiently is hard in one query without many ORs.
            # However, usually RAG source = DB ID. Let's assume standard ID matching for performance.
            # If fuzzy matching is strictly required, this needs a different approach (e.g. FTS).
            # For this fix, we will use the IN operator which is much faster, assuming exact ID match or 
            # that the source field equals the excel_row_id.
            
            # If we must preserve LIKE %...%:
            # filters = [MediaMetadata.excel_row_id.like(f"%{s}%") for s in source_ids]
            # media_records = self.db.query(MediaMetadata).filter(or_(*filters)).all()
            
            # But standardizing on exact match is better for a "fix". 
            # Let's use strict filtering for now to demonstrate the N+1 fix pattern.
            
            from sqlalchemy import or_
            filters = [MediaMetadata.excel_row_id.like(f"%{s}%") for s in source_ids]
            if filters:
                media_records = self.db.query(MediaMetadata).filter(or_(*filters)).all()
            else:
                media_records = []

            # Group by excel_row_id (or match back to source)
            for m in media_records:
                # We need to map back to the search result. 
                # Since we used LIKE, one media could match multiple sources (theoretically).
                for s in source_ids:
                    if s in m.excel_row_id: # Reverse check of the LIKE logic
                        if s not in media_map:
                            media_map[s] = []
                        media_map[s].append(m)

        # Enrich results with multimedia assets
        enriched_results = []
        for r in raw_results:
            # Convert to SearchResult schema
            result = SearchResult(**r)
            
            # Find matching media from our pre-fetched map
            # existing logic: excel_row_id LIKE %source%
            # Our batch fetch got all possible matches.
            
            related_media = media_map.get(result.source, [])
            
            if related_media:
                result.media = [
                    MediaAsset(
                        media_type=m.media_type,
                        media_url=m.media_url,
                        timestamp_start=m.timestamp_start,
                        timestamp_end=m.timestamp_end,
                        description=m.description
                    )
                    for m in related_media
                ]
            
            enriched_results.append(result)
        
        return SearchResponse(query=query, results=enriched_results)

# Singleton instance
search_service = SearchService(rag_engine)
