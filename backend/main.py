import os
from dotenv import load_dotenv

# Load environment variables from the backend directory
env_path = os.getenv("ENV_FILE_PATH", os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"))
load_dotenv(env_path, override=True)

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from .database import engine, sqlite_engine, mysql_engine, Base, get_db, get_db_mode
from .routers import auth, admin, lessons, quizzes, assessments
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi import Request
import json

# Create database tables on startup (only if SQLite, or MySQL is ready)
try:
    # Keep both the primary database and the SQLite failover schema compatible.
    from sqlalchemy import text, inspect
    migration_engines = list({id(db_engine): db_engine for db_engine in [engine, sqlite_engine, mysql_engine] if db_engine is not None}.values())
    for db_engine in migration_engines:
        Base.metadata.create_all(bind=db_engine)
        with db_engine.connect() as conn:
            inspector = inspect(db_engine)
            table_names = inspector.get_table_names()
            if "trainee_set_mappings" in table_names:
                columns = [c["name"] for c in inspector.get_columns("trainee_set_mappings")]
                if "assessment_type" not in columns:
                    conn.execute(text("ALTER TABLE trainee_set_mappings ADD COLUMN assessment_type VARCHAR(50) DEFAULT '3D'"))
            if "assessment_submissions" in table_names:
                submission_columns = {c["name"] for c in inspector.get_columns("assessment_submissions")}
                submission_migrations = {
                    "submission_kind": "VARCHAR(50) NOT NULL DEFAULT 'task'",
                    "source_quotation_id": "INTEGER NULL",
                    "display_label": "VARCHAR(200) NULL",
                }
                for column_name, column_definition in submission_migrations.items():
                    if column_name not in submission_columns:
                        conn.execute(text(
                            f"ALTER TABLE assessment_submissions ADD COLUMN {column_name} {column_definition}"
                        ))
            conn.commit()
except Exception as e:
    print(f"[!] Warning: Could not create tables or run startup migrations: {e}")

app = FastAPI(title="KMTI iCAD Hub API")

# Enable CORS for Electron app and dev servers
cors_origins_env = os.getenv("CORS_ORIGINS", "")
origins = [origin.strip() for origin in cors_origins_env.split(",") if origin.strip()] if cors_origins_env else []

if not origins:
    # Fallback only for local dev if not specified
    origins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:3000",
        "app://." # For Electron production
    ]

cors_options = {
    "allow_origins": origins,
    "allow_origin_regex": r"https?://(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)(:\d+)?",
    "allow_credentials": True,
    "allow_methods": ["*"],
    "allow_headers": ["*"],
}

app.add_middleware(
    CORSMiddleware,
    **cors_options,
)

from starlette.middleware.base import BaseHTTPMiddleware
from backend.websocket_manager import notification_manager
import asyncio

class GlobalRefreshMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        if request.method in ["POST", "PUT", "DELETE", "PATCH"]:
            if 200 <= response.status_code < 300:
                if request.url.path.startswith("/api/"):
                    # Fire and forget the broadcast so it doesn't block the response
                    asyncio.create_task(notification_manager.broadcast({"event": "GLOBAL_REFRESH"}))
        return response

app.add_middleware(GlobalRefreshMiddleware)

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

from .routers import auth, admin, lessons, quizzes, assessments, notifications, settings, tts, quotations, contacts

# Include Modular Routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1")
app.include_router(lessons.router, prefix="/api/v1")
app.include_router(quizzes.router, prefix="/api/v1")
app.include_router(assessments.router, prefix="/api/v1")
app.include_router(notifications.router, prefix="/api/v1")
app.include_router(settings.router, prefix="/api/v1")
app.include_router(tts.router, prefix="/api/v1")
app.include_router(quotations.router, prefix="/api/v1")
app.include_router(contacts.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to KMTI iCAD Hub API", "db_mode": get_db_mode()}

import socketio as _sio_module
from .socket_manager import sio as global_sio

# Keep the FastAPI instance available for dependency overrides and focused tests.
api_app = app

# CORS must be the outermost layer. FileResponse and Socket.IO can raise after
# FastAPI's middleware stack has returned, and those error responses must still
# include Access-Control-Allow-Origin for the renderer to read the real status.
socketio_app = _sio_module.ASGIApp(
    global_sio,
    api_app,
    static_files={},
    socketio_path='socket.io'
)
app = CORSMiddleware(app=socketio_app, **cors_options)
