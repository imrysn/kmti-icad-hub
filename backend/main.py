import os
from dotenv import load_dotenv

# This branch is an isolated online LMS. Never fall back to the legacy desktop
# application's backend/.env when it is started without the batch launcher.
backend_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.getenv("ENV_FILE_PATH", os.path.join(backend_dir, ".env.lms-development"))
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
            if "users" in table_names:
                user_columns = {c["name"] for c in inspector.get_columns("users")}
                if "email_normalized" not in user_columns:
                    conn.execute(text("ALTER TABLE users ADD COLUMN email_normalized VARCHAR(255)"))
                conn.execute(text(
                    "UPDATE users SET email_normalized = LOWER(TRIM(email)) "
                    "WHERE email_normalized IS NULL "
                    "OR email_normalized <> LOWER(TRIM(email))"
                ))
                duplicate_email = conn.execute(text(
                    "SELECT email_normalized FROM users "
                    "GROUP BY email_normalized HAVING COUNT(*) > 1 LIMIT 1"
                )).first()
                if duplicate_email:
                    raise RuntimeError(
                        "Duplicate user emails differ only by capitalization. "
                        "Resolve them before starting the LMS."
                    )
                user_indexes = {index["name"] for index in inspect(db_engine).get_indexes("users")}
                if "ix_users_email_normalized" not in user_indexes:
                    conn.execute(text(
                        "CREATE UNIQUE INDEX ix_users_email_normalized "
                        "ON users (email_normalized)"
                    ))
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
            
            # Bilingual translation fields migrations
            migrations_map = {
                "courses": {
                    "title_ja": "VARCHAR(200) NULL",
                    "description_ja": "VARCHAR(500) NULL",
                    "lifecycle_status": "VARCHAR(30) NOT NULL DEFAULT 'published'",
                    "published_at": "DATETIME NULL",
                    "updated_at": "DATETIME NULL"
                },
                "lessons": {
                    "title_ja": "VARCHAR(200) NULL"
                },
                "lesson_contents": {
                    "data_ja": "TEXT NULL"
                },
                "assessment_tasks": {
                    "title_ja": "VARCHAR(200) NULL",
                    "description_ja": "TEXT NULL"
                },
                "quizzes": {
                    "title_ja": "VARCHAR(200) NULL",
                    "description_ja": "VARCHAR(500) NULL"
                },
                "questions": {
                    "text_ja": "VARCHAR(1000) NULL",
                    "options_json_ja": "VARCHAR(2000) NULL",
                    "explanation_ja": "VARCHAR(1000) NULL"
                }
            }
            for tbl, cols_dict in migrations_map.items():
                if tbl in table_names:
                    existing = {c["name"] for c in inspector.get_columns(tbl)}
                    for col_name, col_def in cols_dict.items():
                        if col_name not in existing:
                            conn.execute(text(f"ALTER TABLE {tbl} ADD COLUMN {col_name} {col_def}"))
            conn.commit()
except Exception as e:
    print(f"[!] Warning: Could not create tables or run startup migrations: {e}")

app = FastAPI(title="KMTI iCAD Hub API")


@app.on_event("startup")
def start_optional_email_worker():
    from .services.email_delivery_service import start_email_delivery_worker
    start_email_delivery_worker()

# Enable CORS for Electron app and dev servers
cors_origins_env = os.getenv("CORS_ORIGINS", "")
origins = [origin.strip() for origin in cors_origins_env.split(",") if origin.strip()] if cors_origins_env else []
is_production = os.getenv("ENVIRONMENT", "development").strip().lower() == "production"

if not origins:
    if is_production:
        raise RuntimeError("CRITICAL CONFIGURATION ERROR: CORS_ORIGINS must be set in production.")
    # Fallback only for local dev if not specified
    origins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:3000",
        "app://.", # Custom Electron protocol
        "null",    # Electron renderer loaded from a packaged file
        "file://"  # Explicit file origin used by some Electron versions
    ]

cors_options = {
    "allow_origins": origins,
    "allow_credentials": True,
    "allow_methods": ["*"],
    "allow_headers": ["*"],
}

# A configured allowlist must be exact. The development-only regex is retained
# solely for a local API server accessed through a LAN development address.
if not cors_origins_env and not is_production:
    cors_options["allow_origin_regex"] = r"https?://(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)(:\d+)?"

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

from .routers import auth, admin, lessons, quizzes, assessments, notifications, settings, tts, plans, registrations, invitations

# Include Modular Routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1")
app.include_router(lessons.router, prefix="/api/v1")
app.include_router(quizzes.router, prefix="/api/v1")
app.include_router(assessments.router, prefix="/api/v1")
app.include_router(notifications.router, prefix="/api/v1")
app.include_router(settings.router, prefix="/api/v1")
app.include_router(tts.router, prefix="/api/v1")

app.include_router(plans.router, prefix="/api/v1")
app.include_router(registrations.router, prefix="/api/v1")
app.include_router(invitations.router, prefix="/api/v1")

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
