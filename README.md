# KMTI iCAD Learning & Support Hub

## Project Overview
A local-first learning hub featuring a React+Electron frontend and a FastAPI backend with RAG (Retrieval Augmented Generation) capabilities.

## Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+

### Running the Application

**Option 1: Helper Scripts (Recommended)**
1.  Double-click `run_backend.bat` to start the API server.
2.  Double-click `run_frontend.bat` to launch the application.

**Option 2: Manual Startup**

**Backend** (Run from root directory):
```powershell
# Create venv if not exists
python -m venv backend/venv
# Activate
.\backend\venv\Scripts\activate
# Install deps
pip install -r backend/requirements.txt
# Run Server (Must be run from root due to package structure)
python -m uvicorn backend.main:app --reload
```

**Frontend**:
```powershell
cd frontend
npm install
npm run electron:dev
```

## Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md) for contribution guidelines.
