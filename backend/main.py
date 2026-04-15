import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables early
_env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=_env_path)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .database import engine, Base
from .routers import auth, admin, chat, lessons

# Create database tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="KMTI iCAD Hub API")

# Enable CORS for Electron app and dev servers
origins = os.getenv("CORS_ORIGINS", "").split(",")
if not origins or origins == ['']:
    origins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount frontend/src directory to serve RAG multimedia links and other source assets
frontend_src_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend", "src")
if os.path.exists(frontend_src_path):
    app.mount("/src", StaticFiles(directory=frontend_src_path), name="src")

# Include Modular Routers
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(chat.router)
app.include_router(lessons.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to KMTI iCAD Hub API"}
