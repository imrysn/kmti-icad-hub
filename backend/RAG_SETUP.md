# RAG Engine Setup & Testing Guide

## Overview
This guide walks you through setting up and testing the ChromaDB-powered RAG engine for semantic search over your iCAD knowledge base.

## Prerequisites
Ensure ChromaDB is installed (already in `requirements.txt`):
```bash
pip install chromadb
```

## Step 1: Generate Sample Data
Create a sample Excel file for testing:
```bash
cd backend
python generate_sample_excel.py
```

This creates `knowledge_base/sample_icad_manual.xlsx` with 8 sample topics.

## Step 2: Ingest Knowledge Base
Load the Excel file into ChromaDB:
```bash
python ingest_knowledge_base.py knowledge_base/sample_icad_manual.xlsx
```

Expected output:
```
📖 Reading Excel file: knowledge_base/sample_icad_manual.xlsx
✅ Ingested 8 documents into ChromaDB
✅ Ingested 8 rows from sample_icad_manual.xlsx

📊 Collection Stats:
   Total documents: 8
   Vector DB: ./vector_db
```

## Step 3: Test via Python
Test the RAG engine directly:
```python
from rag_engine import rag_engine

# Search for relevant content
results = rag_engine.search("how do I create orthographic views?")

for result in results:
    print(f"Content: {result['content']}")
    print(f"Source: {result['source']}")
    print(f"Score: {result['score']:.3f}")
    print("---")
```

## Step 4: Test via API
Start the backend server:
```bash
# From project root
.\run_backend.bat

# Or manually
python -m uvicorn backend.main:app --reload
```

Test the search endpoint:
```bash
curl "http://localhost:8000/search?query=orthographic+view"
```

Expected response:
```json
{
  "query": "orthographic view",
  "results": [
    {
      "content": "orthographic_view_intro | Orthographic Projection | A method of...",
      "source": "sample_icad_manual.xlsx",
      "score": 0.85
    }
  ]
}
```

## Step 5: Ingest Your Actual Manuals
Replace the sample with your real iCAD Excel manuals:
```bash
# Single file
python ingest_knowledge_base.py knowledge_base/your_manual.xlsx

# Entire directory
python ingest_knowledge_base.py knowledge_base/
```

## Troubleshooting

### "No module named 'chromadb'"
Install dependencies:
```bash
pip install -r requirements.txt
```

### "Collection is empty"
Re-run the ingestion script:
```bash
python ingest_knowledge_base.py knowledge_base/sample_icad_manual.xlsx
```

### "Poor search results"
- Check that Excel columns contain descriptive text
- Ensure concept IDs match your media mappings
- Try rephrasing queries to be more specific

## Tips
- **Semantic Search**: ChromaDB uses embeddings, so queries like "how to dimension" will match "dimensioning tools"
- **Batch Ingestion**: Process all Excel files at once for efficiency
- **Vector DB Location**: ChromaDB stores data in `./vector_db` by default
- **Re-ingestion**: Clear collection first if re-ingesting same data
