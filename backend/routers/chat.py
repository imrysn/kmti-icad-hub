import os
import json
import time
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.responses import StreamingResponse

from ..database import get_db
from ..models import User, ChatLog, ChatFeedback
from ..services.search_service import search_service, chat_service
from ..schemas import SearchResponse, ChatRequest, ChatResponse, FeedbackRequest
from ..auth.dependencies import get_current_user

router = APIRouter(prefix="/chat", tags=["Intelligence Chat"])

@router.get("/search", response_model=SearchResponse)
def search_knowledge_base(query: str, current_user: User = Depends(get_current_user)):
    """
    Search the RAG knowledge base. Requires authentication.
    """
    return search_service.search_knowledge_base(query)

@router.post("/", response_model=ChatResponse)
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
        request.language,
        request.is_regeneration
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
            suggestions=json.dumps(result.get("suggestions", [])) if result.get("suggestions") else None,
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

@router.post("/stream")
async def chat_stream_with_intelligence_node(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Streaming RAG-grounded AI chat.
    Yields Server-Sent Events (SSE) for real-time token delivery.
    """
    async def event_generator():
        t_start = time.time()
        full_answer = ""
        sources = []
        suggestions = []
        
        try:
            async for chunk in chat_service.chat_stream(
                request.message, 
                request.history, 
                [{"data": img.data, "mime": img.mime} for img in request.images] if request.images else None,
                request.language,
                request.is_regeneration
            ):
                if chunk["type"] == "content":
                    full_answer += chunk["delta"]
                    yield f"data: {json.dumps({'type': 'content', 'delta': chunk['delta']})}\n\n"
                elif chunk["type"] == "end":
                    sources = chunk.get("sources", [])
                    suggestions = chunk.get("suggestions", [])
                    yield f"data: {json.dumps({'type': 'end', 'sources': sources, 'suggestions': suggestions})}\n\n"
            
            # Post-stream logging
            elapsed_ms = int((time.time() - t_start) * 1000)
            unique_sources = list({s["source"] for s in sources if "source" in s})
            had_media = any(bool(s.get("media")) for s in sources)
            tokens_est = (len(request.message) + len(full_answer)) // 4
            
            try:
                log = ChatLog(
                    user_id=current_user.id,
                    username=current_user.username,
                    session_id=request.session_id,
                    message=request.message[:2000],
                    answer=full_answer[:8000],
                    sources_used=",".join(unique_sources)[:1000] if unique_sources else None,
                    source_count=len(sources),
                    tokens_estimated=tokens_est,
                    response_time_ms=elapsed_ms,
                    had_media=had_media,
                    is_cached=False,
                    suggestions=json.dumps(suggestions) if suggestions else None
                )
                db.add(log)
                db.commit()
                db.refresh(log)
                yield f"data: {json.dumps({'type': 'metadata', 'log_id': log.id})}\n\n"
            except Exception as log_err:
                db.rollback()
                print(f"[ChatLog Stream] Failed to write log: {log_err}")

        except Exception as e:
            print(f"[Stream Endpoint] Error: {e}")
            yield f"data: {json.dumps({'type': 'error', 'message': str(e)})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

@router.post("/name-session")
def name_session(
    request: ChatRequest,
    current_user: User = Depends(get_current_user)
):
    """Generate a high-quality session title using AI."""
    title = chat_service.summarize_session_title(request.message, request.history)
    return {"title": title or "New Chat"}

@router.post("/feedback")
def submit_chat_feedback(
    request: FeedbackRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Submit thumbs up/down feedback for a chat log entry.
    """
    existing = db.query(ChatFeedback).filter(
        ChatFeedback.chat_log_id == request.chat_log_id,
        ChatFeedback.user_id == current_user.id
    ).first()
    
    if request.rating is None:
        if existing:
            db.delete(existing)
            db.commit()
    else:
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
