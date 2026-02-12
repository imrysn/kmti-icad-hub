# Data Ingestion Guide

## Overview
This guide shows you how to populate the `media_metadata` table with links between your Excel knowledge base and multimedia assets (videos, images, 3D models).

## Step-by-Step Process

### 1. Organize Your Media Files
Place all media files in the `backend/media/` directory:
```
backend/media/
├── orthographic_basics.mp4
├── isometric_demo.mp4
├── diagrams/
│   ├── ortho_diagram.png
│   └── tolerance_chart.png
└── 3d_models/
    └── sample_part.step
```

### 2. Identify Excel Concept IDs
Review your Excel knowledge base and assign unique IDs to each concept:
- `orthographic_view_intro` → Row 5: Introduction to Orthographic Views
- `isometric_view_basics` → Row 12: Isometric Projection Basics
- `tolerance_specs` → Row 23: Tolerance Specifications

### 3. Create Media Mapping CSV
Use the template at `backend/knowledge_base/media_mappings_sample.csv`:

| excel_row_id | media_type | media_url | timestamp_start | timestamp_end | description |
|--------------|------------|-----------|-----------------|---------------|-------------|
| orthographic_view_intro | video | /media/orthographic_basics.mp4 | 0 | 30 | Intro to orthographic projection |
| isometric_view_basics | video | /media/isometric_demo.mp4 | 8.5 | 22.0 | 30-degree axis demo |

**Fields:**
- `excel_row_id`: Unique identifier for the concept (matches your Excel data)
- `media_type`: `video`, `image`, or `3d_model`
- `media_url`: Relative path from project root
- `timestamp_start`: (Optional) For video deep-linking in seconds
- `timestamp_end`: (Optional) End timestamp
- `description`: What this media demonstrates

### 4. Run the Ingestion Script
```bash
# Navigate to backend folder
cd backend

# Run ingestion script
python ingest_media_mappings.py knowledge_base/media_mappings.csv
```

Expected output:
```
✅ Successfully ingested 8 media mappings!

Sample mappings:
  - orthographic_view_intro → /media/orthographic_basics.mp4
  - isometric_view_basics → /media/isometric_demo.mp4
  - tolerance_specs → /media/diagrams/tolerance_chart.png
```

### 5. Verify Database
Check that data was inserted:
```python
from models import MediaMetadata
from database import SessionLocal

db = SessionLocal()
count = db.query(MediaMetadata).count()
print(f"Total media mappings: {count}")
```

## Testing the Integration

### Test Search with Media
```bash
# Start the backend
python -m uvicorn backend.main:app --reload

# Test the search endpoint
curl "http://localhost:8000/search?query=orthographic"
```

Expected response should include `media` array:
```json
{
  "results": [{
    "content": "...",
    "media": [{
      "media_type": "video",
      "media_url": "/media/orthographic_basics.mp4",
      "timestamp_start": 0,
      "description": "Intro to orthographic projection"
    }]
  }]
}
```

## Tips
- **Keep IDs consistent**: Use the same `excel_row_id` across your knowledge base
- **Organize media**: Group by type (videos/, diagrams/, models/)
- **Test timestamps**: Verify video deep-linking works in your player
- **Incremental updates**: Re-run the script to add new mappings
