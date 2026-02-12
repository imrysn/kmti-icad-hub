"""
Data Ingestion Script for Media Mappings

This script reads media mappings from CSV and populates the media_metadata table.
Run this after you've prepared your Excel knowledge base and organized media files.

Usage:
    python ingest_media_mappings.py knowledge_base/media_mappings.csv
"""

import sys
import csv
from pathlib import Path
from services.ingestion_service import ingestion_service
from database import Base, engine

def ingest_from_csv(csv_path: str):
    """Read CSV and bulk ingest media mappings"""
    
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    mappings = []
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            mapping = {
                'excel_row_id': row['excel_row_id'],
                'media_type': row['media_type'],
                'media_url': row['media_url'],
                'description': row['description'],
            }
            
            # Handle optional timestamp fields
            if row.get('timestamp_start') and row['timestamp_start'].strip():
                mapping['timestamp_start'] = float(row['timestamp_start'])
            
            if row.get('timestamp_end') and row['timestamp_end'].strip():
                mapping['timestamp_end'] = float(row['timestamp_end'])
            
            mappings.append(mapping)
    
    # Bulk insert
    count = ingestion_service.bulk_ingest_mappings(mappings)
    print(f"✅ Successfully ingested {count} media mappings!")
    
    # Show sample
    print("\nSample mappings:")
    for mapping in mappings[:3]:
        print(f"  - {mapping['excel_row_id']} → {mapping['media_url']}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python ingest_media_mappings.py <path_to_csv>")
        print("\nExample:")
        print("  python ingest_media_mappings.py knowledge_base/media_mappings.csv")
        sys.exit(1)
    
    csv_path = sys.argv[1]
    
    if not Path(csv_path).exists():
        print(f"❌ Error: File not found: {csv_path}")
        sys.exit(1)
    
    print(f"Starting ingestion from: {csv_path}")
    ingest_from_csv(csv_path)
