"""
Excel Knowledge Base Ingestion Script

Reads Excel files from knowledge_base/ directory and ingests them into ChromaDB.
Each row becomes a searchable document in the vector store.

Usage:
    python -m backend.ingest_knowledge_base backend/knowledge_base/your_manual.xlsx
"""

import sys
from typing import Optional, List
import pandas as pd
from datetime import datetime
from pathlib import Path
from backend.rag_engine import rag_engine
from backend.database import SessionLocal
from backend.models import MediaMetadata

def ingest_excel_file(excel_path: str, text_columns: Optional[List[str]] = None):
    """
    Read Excel file and ingest into ChromaDB.
    
    Args:
        excel_path: Path to Excel file
        text_columns: List of column names to combine for text content.
                     If None, uses all columns.
    """
    print(f"📖 Reading Excel file: {excel_path}")
    
    # Read Excel file
    df = pd.read_excel(excel_path)
    
    # Get filename for metadata
    filename = Path(excel_path).name
    
    documents = []
    
    for idx, row in df.iterrows():
        text_parts = []
        if text_columns is not None:
            for col in text_columns:
                if col in df.columns:
                    text_parts.append(str(row[col]))
        else:
            text_parts = [str(val) for val in row.values if pd.notna(val)]
        
        text = " | ".join(text_parts)
        
        # Create unique ID: Use 'Concept ID' column if it exists, otherwise fallback
        concept_id = row.get('Concept ID')
        if pd.notna(concept_id) and str(concept_id).strip():
            doc_id = str(concept_id).strip()
        else:
            doc_id = f"{filename}_row_{idx}"
        
        # Create document
        doc = {
            'id': doc_id,
            'text': text,
            'metadata': {
                'source': filename,
                'row': idx,
                'excel_path': excel_path,
                'original_id': str(concept_id) if pd.notna(concept_id) else ""
            }
        }
        
        documents.append(doc)
    
    # Ingest into ChromaDB
    rag_engine.ingest_documents(documents)
    
    print(f"✅ Ingested {len(documents)} rows from {filename}")
    
    # Show stats
    stats = rag_engine.get_collection_stats()
    print(f"\n📊 Collection Stats:")
    print(f"   Total documents: {stats['total_documents']}")
    print(f"   Vector DB: {stats['persist_directory']}")

def ingest_media_mappings(csv_path: str):
    """
    Read media mappings CSV and populate MediaMetadata table.
    """
    print(f"🖼️  Ingesting media mappings: {csv_path}")
    
    df = pd.read_csv(csv_path)
    
    with SessionLocal() as db:
        # Clear existing mappings to avoid duplicates on re-index
        # We only clear mappings referenced in this CSV or just all?
        # Usually re-index implies a fresh start for the controlled directory.
        db.query(MediaMetadata).delete()
        
        count = 0
        for _, row in df.iterrows():
            # Skip comments or empty rows
            if pd.isna(row['excel_row_id']) or str(row['excel_row_id']).startswith('#'):
                continue
                
            metadata = MediaMetadata(
                excel_row_id=str(row['excel_row_id']),
                media_type=str(row['media_type']),
                media_url=str(row['media_url']),
                timestamp_start=float(row['timestamp_start']) if pd.notna(row['timestamp_start']) else None,
                timestamp_end=float(row['timestamp_end']) if pd.notna(row['timestamp_end']) else None,
                description=str(row['description']) if pd.notna(row['description']) else "",
                created_at=datetime.utcnow()
            )
            db.add(metadata)
            count += 1
            
        db.commit()
    
    print(f"✅ Ingested {count} media mappings from {csv_path}")

def ingest_directory(directory: str):
    """Ingest all compatible files from a directory"""
    dir_path = Path(directory)
    
    # Ingest Excel files
    excel_files = list(dir_path.glob("*.xlsx"))
    print(f"Found {len(excel_files)} Excel files")
    for filepath in excel_files:
        try:
            ingest_excel_file(str(filepath))
        except Exception as e:
            print(f"❌ Error processing {filepath}: {e}")
            
    # Ingest Media Mappings CSV
    mapping_files = list(dir_path.glob("media_mappings*.csv"))
    print(f"Found {len(mapping_files)} mapping files")
    for filepath in mapping_files:
        try:
            ingest_media_mappings(str(filepath))
        except Exception as e:
            print(f"❌ Error processing {filepath}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:")
        print("  Single Excel:  python ingest_knowledge_base.py knowledge_base/manual.xlsx")
        print("  Mappings CSV:  python ingest_knowledge_base.py knowledge_base/media_mappings.csv")
        print("  Directory:    python ingest_knowledge_base.py knowledge_base/")
        sys.exit(1)
    
    path = sys.argv[1]
    
    if not Path(path).exists():
        print(f"❌ Error: Path not found: {path}")
        sys.exit(1)
    
    # Check if path is directory or file
    if Path(path).is_dir():
        print(f"📁 Ingesting all files from directory: {path}")
        ingest_directory(path)
    else:
        if path.endswith('.xlsx'):
            print(f"📄 Ingesting single Excel file: {path}")
            ingest_excel_file(path)
        elif path.endswith('.csv'):
            print(f"📊 Ingesting mapping CSV file: {path}")
            ingest_media_mappings(path)
    
    print("\n✨ Done! You can now search the knowledge base via the API.")
