import os
from pathlib import Path
from dotenv import load_dotenv, find_dotenv

# Load environment variables from the project root
load_dotenv(find_dotenv())

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from .database import engine, Base, get_db, get_db_mode
from .routers import auth, admin, chat, lessons, quizzes

# Create database tables on startup (only if SQLite, or MySQL is ready)
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"⚠️ Warning: Could not create tables on startup: {e}")

app = FastAPI(title="KMTI iCAD Hub API")

# Enable CORS for Electron app and dev servers
cors_origins_env = os.getenv("CORS_ORIGINS", "")
origins = cors_origins_env.split(",") if cors_origins_env else []

if not origins:
    # Fallback only for local dev if not specified
    origins = [
        "http://localhost:5173", 
        "http://localhost:5174", 
        "http://localhost:5175", 
        "http://localhost:3000",
        "app://." # For Electron production
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# System Status Endpoint
@app.get("/api/v1/system/status")
def get_system_status(db: Session = Depends(get_db)):
    return {
        "status": "online",
        "db_mode": get_db_mode(),
        "nas_reachable": get_db_mode() == "mysql",
        "version": "1.0.0"
    }

# Mount static assets (configurable)
# Default to frontend/src if not specified
default_src_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend", "src")
assets_path = os.getenv("STATIC_ASSETS_PATH", default_src_path)

if os.path.exists(assets_path):
    app.mount("/src", StaticFiles(directory=assets_path), name="src")
else:
    print(f"⚠️ Warning: Static assets path not found: {assets_path}")

# Include Modular Routers
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(chat.router)
app.include_router(lessons.router)
app.include_router(quizzes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to KMTI iCAD Hub API", "db_mode": get_db_mode()}

