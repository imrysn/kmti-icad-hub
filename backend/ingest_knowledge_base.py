"""
Excel Knowledge Base Ingestion Script

Reads Excel files from knowledge_base/ directory and ingests them into ChromaDB.
Each row becomes a searchable document in the vector store.

Usage:
    python ingest_knowledge_base.py knowledge_base/your_manual.xlsx
"""

import sys
import pandas as pd
from pathlib import Path
from rag_engine import rag_engine

def ingest_excel_file(excel_path: str, text_columns: list = None):
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
        # Combine specified columns or all columns into text
        if text_columns:
            text_parts = [str(row[col]) for col in text_columns if col in df.columns]
        else:
            text_parts = [str(val) for val in row.values if pd.notna(val)]
        
        text = " | ".join(text_parts)
        
        # Create unique ID
        doc_id = f"{filename}_row_{idx}"
        
        # Create document
        doc = {
            'id': doc_id,
            'text': text,
            'metadata': {
                'source': filename,
                'row': idx,
                'excel_path': excel_path
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

def ingest_directory(directory: str, pattern: str = "*.xlsx"):
    """Ingest all Excel files from a directory"""
    dir_path = Path(directory)
    excel_files = list(dir_path.glob(pattern))
    
    if not excel_files:
        print(f"⚠️  No Excel files found in {directory}")
        return
    
    print(f"Found {len(excel_files)} Excel files")
    
    for filepath in excel_files:
        try:
            ingest_excel_file(str(filepath))
        except Exception as e:
            print(f"❌ Error processing {filepath}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:")
        print("  Single file:  python ingest_knowledge_base.py knowledge_base/manual.xlsx")
        print("  Directory:    python ingest_knowledge_base.py knowledge_base/")
        sys.exit(1)
    
    path = sys.argv[1]
    
    if not Path(path).exists():
        print(f"❌ Error: Path not found: {path}")
        sys.exit(1)
    
    # Check if path is directory or file
    if Path(path).is_dir():
        print(f"📁 Ingesting all Excel files from directory: {path}")
        ingest_directory(path)
    else:
        print(f"📄 Ingesting single file: {path}")
        ingest_excel_file(path)
    
    print("\n✨ Done! You can now search the knowledge base via the API.")
