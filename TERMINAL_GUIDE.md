# Terminal Commands Guide

## Quick Start (Recommended)

### Backend
Open a terminal in the **project root** (`kmti-icad-hub/`):
```powershell
cd C:\Users\Enduser\.gemini\antigravity\scratch\kmti-icad-hub
.\backend\venv\Scripts\python.exe -m uvicorn backend.main:app --reload
```

### Frontend
Open a **new** terminal in the **project root**:
```powershell
cd C:\Users\Enduser\.gemini\antigravity\scratch\kmti-icad-hub
cd frontend
npm run electron:dev
```

---

## Step-by-Step Setup

### 1. Backend Setup
```powershell
# Navigate to project root
cd C:\Users\Enduser\.gemini\antigravity\scratch\kmti-icad-hub

# Activate virtual environment (if needed)
.\backend\venv\Scripts\Activate.ps1

# Start backend server
python -m uvicorn backend.main:app --reload
```

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Started reloader process
```

### 2. Frontend Setup
Open a **new terminal** (keep backend running):
```powershell
# Navigate to frontend
cd C:\Users\Enduser\.gemini\antigravity\scratch\kmti-icad-hub\frontend

# Start Electron app
npm run electron:dev
```

---

## Data Ingestion

### Generate Sample Data
```powershell
cd backend
python generate_sample_excel.py
```

### Ingest Excel into ChromaDB
```powershell
# From backend directory
python -m backend.ingest_knowledge_base knowledge_base/sample_icad_manual.xlsx
```

### Ingest Media Mappings
```powershell
# From backend directory
python -m backend.ingest_media_mappings knowledge_base/media_mappings_sample.csv
```

---

## Troubleshooting

### "ModuleNotFoundError" or "ImportError"
Always run Python scripts **from the project root** using the `-m` flag:
```powershell
# ✅ Correct
python -m backend.ingest_knowledge_base knowledge_base/file.xlsx

# ❌ Wrong
cd backend
python ingest_knowledge_base.py knowledge_base/file.xlsx
```

### Backend won't start
Check if port 8000 is in use:
```powershell
# Change port
python -m uvicorn backend.main:app --reload --port 8001
```

### Frontend build errors
Clear and reinstall:
```powershell
cd frontend
rm -rf node_modules
npm install
```
