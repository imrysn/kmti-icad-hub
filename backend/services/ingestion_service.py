import sys
from pathlib import Path
from typing import List, Dict

# Handle imports whether run as script or module
if __name__ == "__main__":
    sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.models import MediaMetadata
from backend.database import SessionLocal

class IngestionService:
    """
    Handles ingestion of Excel data and linking to multimedia assets.
    This is the 'Unified Data Map' that connects knowledge base entries to videos/images.
    """
    
    def __init__(self):
        self.db = SessionLocal()
    
    def link_media_to_concept(
        self,
        excel_row_id: str,
        media_type: str,
        media_url: str,
        description: str,
        timestamp_start: float = None,
        timestamp_end: float = None
    ) -> MediaMetadata:
        """
        Create a link between an Excel row/concept and a media asset.
        
        Example:
            link_media_to_concept(
                excel_row_id="orthographic_view_intro",
                media_type="video",
                media_url="/media/ortho_explanation.mp4",
                description="Demonstrates orthographic projection",
                timestamp_start=15.0,
                timestamp_end=45.0
            )
        """
        media = MediaMetadata(
            excel_row_id=excel_row_id,
            media_type=media_type,
            media_url=media_url,
            timestamp_start=timestamp_start,
            timestamp_end=timestamp_end,
            description=description
        )
        self.db.add(media)
        self.db.commit()
        self.db.refresh(media)
        return media
    
    def get_media_for_concept(self, excel_row_id: str) -> List[MediaMetadata]:
        """Retrieve all media assets linked to a specific concept"""
        return self.db.query(MediaMetadata).filter(
            MediaMetadata.excel_row_id == excel_row_id
        ).all()
    
    def bulk_ingest_mappings(self, mappings: List[Dict]) -> int:
        """
        Bulk insert media mappings.
        
        mappings: List of dicts with keys:
            - excel_row_id
            - media_type
            - media_url
            - description
            - timestamp_start (optional)
            - timestamp_end (optional)
        """
        media_objects = [MediaMetadata(**mapping) for mapping in mappings]
        self.db.bulk_save_objects(media_objects)
        self.db.commit()
        return len(media_objects)

ingestion_service = IngestionService()
