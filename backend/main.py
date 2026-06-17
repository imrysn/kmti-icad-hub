import os
from pathlib import Path
from dotenv import load_dotenv, find_dotenv

# Load environment variables from the project root
env_path = os.getenv("ENV_FILE_PATH", os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env"))
load_dotenv(env_path, override=True)

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from .database import engine, Base, get_db, get_db_mode
from .routers import auth, admin, lessons, quizzes, assessments
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi import Request
import json

# Create database tables on startup (only if SQLite, or MySQL is ready)
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"[!] Warning: Could not create tables on startup: {e}")

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
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # Pydantic v2 validation errors can contain ValueError or other non-serializable objects inside ctx.
    # We serialize them to JSON format with default=str and load them back to ensure all components are primitives.
    try:
        serialized_errors = json.loads(json.dumps(exc.errors(), default=str))
    except Exception:
        serialized_errors = exc.errors()

    error_details = {
        "detail": serialized_errors,
        "body": str(exc.body) if hasattr(exc, "body") else "No body"
    }
    with open("scratch/error_log.txt", "w") as f:
        json.dump(error_details, f, default=str)
    return JSONResponse(status_code=422, content={"detail": serialized_errors})

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
    print(f"[!] Warning: Static assets path not found: {assets_path}")

from .routers import auth, admin, lessons, quizzes, assessments, notifications, settings

# Include Modular Routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1")
app.include_router(lessons.router, prefix="/api/v1")
app.include_router(quizzes.router, prefix="/api/v1")
app.include_router(assessments.router, prefix="/api/v1")
app.include_router(notifications.router, prefix="/api/v1")
app.include_router(settings.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to KMTI iCAD Hub API", "db_mode": get_db_mode()}

