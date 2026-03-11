import sys
from pathlib import Path
from typing import List, Dict, Optional

# Handle imports whether run as script or module
if __name__ == "__main__":
    sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.models import MediaMetadata
from backend.database import SessionLocal


class IngestionService:
    """
    Handles ingestion of Excel data and linking to multimedia assets.
    This is the 'Unified Data Map' that connects knowledge base entries to videos/images.

    NOTE: All methods open and close their own DB session via context managers to
    prevent connection leaks (same pattern as search_service.py).
    """

    def link_media_to_concept(
        self,
        excel_row_id: str,
        media_type: str,
        media_url: str,
        description: str,
        timestamp_start: Optional[float] = None,
        timestamp_end: Optional[float] = None,
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
        with SessionLocal() as db:
            media = MediaMetadata(
                excel_row_id=excel_row_id,
                media_type=media_type,
                media_url=media_url,
                timestamp_start=timestamp_start,
                timestamp_end=timestamp_end,
                description=description,
            )
            db.add(media)
            db.commit()
            db.refresh(media)
            return media

    def get_media_for_concept(self, excel_row_id: str) -> List[MediaMetadata]:
        """Retrieve all media assets linked to a specific concept"""
        with SessionLocal() as db:
            return db.query(MediaMetadata).filter(
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
        media_objects = [MediaMetadata(**m) for m in mappings]
        with SessionLocal() as db:
            # bulk_save_objects is deprecated — use add_all instead
            db.add_all(media_objects)
            db.commit()
        return len(media_objects)


ingestion_service = IngestionService()
