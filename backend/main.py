import os
from pathlib import Path
from dotenv import load_dotenv

_env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=_env_path)
from typing import Optional
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from .models import User, ChatLog, ChatFeedback
import time
from .services.search_service import search_service, chat_service
from .services.course_service import course_service
from .schemas import SearchResponse, CourseList, CourseProgress, ChatRequest, ChatResponse, FeedbackRequest
from .routers import auth, admin
from .auth.dependencies import get_current_user

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="KMTI iCAD Hub API")

from fastapi.staticfiles import StaticFiles

# Enable CORS for Electron app and dev servers
origins = os.getenv("CORS_ORIGINS", "").split(",")
if not origins or origins == ['']:
    # Fallback only for local dev if not specified
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

# Include routers
app.include_router(auth.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to KMTI iCAD Hub API"}

@app.get("/search", response_model=SearchResponse)
def search_knowledge_base(query: str, current_user: User = Depends(get_current_user)):
    """
    Search the RAG knowledge base. Requires authentication.
    """
    return search_service.search_knowledge_base(query)

@app.post("/chat", response_model=ChatResponse)
async def chat_with_intelligence_node(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    RAG-grounded AI chat. Retrieves context from ChromaDB, synthesizes an answer,
    and logs the interaction to chat_logs for admin monitoring.
    """
    t_start = time.time()
    result = await chat_service.chat(
        request.message, 
        request.history, 
        request.session_id,
        [{"data": img.data, "mime": img.mime} for img in request.images] if request.images else None,
        request.language
    )
    elapsed_ms = int((time.time() - t_start) * 1000)

    log_id: Optional[int] = None
    is_cached = result.get("cached", False)

    sources = result.get("sources", [])
    unique_sources = list({s["source"] for s in sources if "source" in s})
    had_media = any(bool(s.get("media")) for s in sources)
    tokens_est = (len(request.message) + len(result.get("answer", ""))) // 4
    try:
        log = ChatLog(
            user_id=current_user.id,
            username=current_user.username,
            session_id=request.session_id,
            message=request.message[:2000],
            answer=result.get("answer", "")[:8000],
            sources_used=",".join(unique_sources)[:1000] if unique_sources else None,
            source_count=len(sources),
            tokens_estimated=tokens_est,
            response_time_ms=elapsed_ms,
            had_media=had_media,
            is_cached=is_cached,
        )
        db.add(log)
        db.commit()
        db.refresh(log)
        log_id = log.id
    except Exception as log_err:
        db.rollback()
        print(f"[ChatLog] Failed to write log: {log_err}")

    if isinstance(result, dict):
        result["log_id"] = log_id
    return result

@app.post("/chat/name-session")
def name_session(
    request: ChatRequest,
    current_user: User = Depends(get_current_user)
):
    """Generate a high-quality session title using AI."""
    title = chat_service.summarize_session_title(request.message, request.history)
    return {"title": title or "New Chat"}

@app.post("/chat/feedback")
def submit_chat_feedback(
    request: FeedbackRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Submit thumbs up/down feedback for a chat log entry.
    Upserts — one feedback per user per log entry.
    """
    existing = db.query(ChatFeedback).filter(
        ChatFeedback.chat_log_id == request.chat_log_id,
        ChatFeedback.user_id == current_user.id
    ).first()
    if existing:
        existing.rating = request.rating
    else:
        fb = ChatFeedback(
            chat_log_id=request.chat_log_id,
            user_id=current_user.id,
            username=current_user.username,
            rating=request.rating
        )
        db.add(fb)
    db.commit()
    return {"ok": True}


@app.get("/courses", response_model=CourseList)
def get_courses(current_user: User = Depends(get_current_user)):
    """
    Get list of available courses. Requires authentication.
    """
    return course_service.get_available_courses()

@app.get("/courses/{course_id}/progress/{user_id}", response_model=CourseProgress)
def get_progress(course_id: str, user_id: str, db: Session = Depends(get_db),
                 current_user: User = Depends(get_current_user)):
    """
    Get user progress for a specific course. Requires authentication.
    """
    return course_service.get_user_progress(db, course_id, user_id)
