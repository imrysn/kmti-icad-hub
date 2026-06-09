from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func, cast, Date as SqlDate
from typing import List, Dict
import os
import psutil
import json
from datetime import datetime, timedelta

from ...database import get_db
from ...models import User, UserProgress, SystemLog, Broadcast, ChatLog, ChatFeedback, QueryCache
from ...auth.dependencies import require_role
from ...rag_engine import rag_engine

router = APIRouter()

@router.get("/stats")
def get_system_stats(
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Get system-wide statistics for the dashboard"""
    total_users = db.query(User).count()
    active_users = db.query(User).filter(User.is_active == True).count()
    admin_users = db.query(User).filter(User.role == "admin").count()
    
    # ChromaDB stats
    kb_stats = rag_engine.get_collection_stats()
    
    # Simple "health" check
    try:
        cpu_usage = psutil.cpu_percent()
        memory_usage = psutil.virtual_memory().percent
        disk_usage = psutil.disk_usage('.').percent
        status_msg = "Operational"
        if cpu_usage > 90 or memory_usage > 90:
            status_msg = "High Load"
    except:
        cpu_usage = 0
        memory_usage = 0
        disk_usage = 0
        status_msg = "Unknown"

    return {
        "users": {
            "total": total_users,
            "active": active_users,
            "admins": admin_users
        },
        "knowledge_base": {
            "total_documents": kb_stats.get("total_documents", 0)
        },
        "system": {
            "status": status_msg,
            "cpu_load": cpu_usage,       # Aligned with frontend expectation
            "memory_usage": memory_usage, # Aligned with frontend expectation
            "disk": disk_usage
        }
    }


@router.get("/logs", response_model=List[Dict])
def get_system_logs(
    limit: int = 50,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Get recent system audit logs"""
    logs = db.query(SystemLog).order_by(SystemLog.created_at.desc()).limit(limit).all()
    return [
        {
            "id": log.id,
            "level": log.level,
            "message": log.message,
            "context": log.context,
            "created_at": log.created_at
        } for log in logs
    ]


@router.post("/broadcast")
def create_broadcast(
    message: str,
    level: str = "info",
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Create a new system-wide broadcast message"""
    broadcast = Broadcast(message=message, level=level, created_by=admin.id)
    db.add(broadcast)
    db.commit()
    return {"message": "Broadcast sent successfully"}


@router.get("/broadcasts/active")
def get_active_broadcasts(
    db: Session = Depends(get_db)
):
    """Get all currently active broadcasts with sender name"""
    broadcasts = db.query(Broadcast, User.full_name)\
        .join(User, Broadcast.created_by == User.id)\
        .filter(Broadcast.is_active == True)\
        .order_by(Broadcast.created_at.desc()).all()
    
    return [
        {
            "id": b[0].id,
            "message": b[0].message,
            "level": b[0].level,
            "created_at": b[0].created_at,
            "sender_name": b[1]
        } for b in broadcasts
    ]


@router.get("/heatmap")
def get_training_heatmap(
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Get activity counts per course for heatmap (Recent 60 mins)"""
    one_hour_ago = datetime.utcnow() - timedelta(minutes=60)
    
    stats = db.query(
        UserProgress.course_id,
        func.count(UserProgress.id).label("active_count")
    ).filter(UserProgress.last_accessed >= one_hour_ago)\
     .group_by(UserProgress.course_id).all()
    
    return [{"course_id": s[0], "count": s[1]} for s in stats]


@router.get("/chat-logs")
def get_chat_logs(
    limit: int = 50,
    offset: int = 0,
    username: str = None,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Paginated chat log list, optionally filtered by username."""
    query = db.query(ChatLog)
    if username:
        query = query.filter(ChatLog.username.ilike(f"%{username}%"))
    total = query.count()
    logs = query.order_by(ChatLog.created_at.desc()).offset(offset).limit(limit).all()
    return {
        "total": total,
        "offset": offset,
        "limit": limit,
        "logs": [
            {
                "id": l.id,
                "user_id": l.user_id,
                "username": l.username,
                "session_id": l.session_id,
                "message": l.message,
                "answer": l.answer,
                "sources_used": l.sources_used,
                "source_count": l.source_count,
                "tokens_estimated": l.tokens_estimated,
                "response_time_ms": l.response_time_ms,
                "had_media": l.had_media,
                "created_at": l.created_at.isoformat() if l.created_at else None,
            }
            for l in logs
        ]
    }


@router.get("/chat-logs/stats")
def get_chat_log_stats(
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Aggregate stats for the Intelligence dashboard."""
    total_queries = db.query(ChatLog).count()

    # Top 10 most active users
    top_users = (
        db.query(ChatLog.username, func.count(ChatLog.id).label("count"))
        .group_by(ChatLog.username)
        .order_by(func.count(ChatLog.id).desc())
        .limit(10)
        .all()
    )

    # Total estimated tokens used
    total_tokens = db.query(func.sum(ChatLog.tokens_estimated)).scalar() or 0

    # Average response time
    avg_response_ms = db.query(func.avg(ChatLog.response_time_ms)).scalar() or 0

    # Queries per day (last 14 days)
    fourteen_days_ago = datetime.utcnow() - timedelta(days=14)
    daily = (
        db.query(
            cast(ChatLog.created_at, SqlDate).label("day"),
            func.count(ChatLog.id).label("count")
        )
        .filter(ChatLog.created_at >= fourteen_days_ago)
        .group_by(cast(ChatLog.created_at, SqlDate))
        .order_by(cast(ChatLog.created_at, SqlDate))
        .all()
    )

    # Top 10 most queried sources
    source_counts: dict = {}
    all_sources = db.query(ChatLog.sources_used).filter(ChatLog.sources_used != None).all()
    for row in all_sources:
        for src in row[0].split(","):
            src = src.strip()
            if src:
                source_counts[src] = source_counts.get(src, 0) + 1
    top_sources = sorted(source_counts.items(), key=lambda x: x[1], reverse=True)[:10]

    return {
        "total_queries": total_queries,
        "total_tokens_estimated": int(total_tokens),
        "avg_response_ms": int(avg_response_ms),
        "top_users": [{"username": u, "count": c} for u, c in top_users],
        "queries_per_day": [{"day": str(d), "count": c} for d, c in daily],
        "top_sources": [{"source": s, "count": c} for s, c in top_sources],
    }


@router.delete("/chat-logs/{log_id}")
def delete_chat_log(
    log_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Delete a single chat log entry."""
    log = db.query(ChatLog).filter(ChatLog.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Log not found")
    db.delete(log)
    db.commit()
    return {"message": "Deleted"}


@router.get("/feedback/stats")
def get_feedback_stats(
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Aggregate feedback stats: up/down totals, worst-rated queries."""
    total_up = db.query(ChatFeedback).filter(ChatFeedback.rating == "up").count()
    total_down = db.query(ChatFeedback).filter(ChatFeedback.rating == "down").count()

    # Worst rated: log entries with most thumbs-down
    worst = (
        db.query(
            ChatFeedback.chat_log_id,
            func.count(ChatFeedback.id).label("down_count")
        )
        .filter(ChatFeedback.rating == "down")
        .group_by(ChatFeedback.chat_log_id)
        .order_by(func.count(ChatFeedback.id).desc())
        .limit(10)
        .all()
    )

    worst_with_messages = []
    for log_id, down_count in worst:
        log = db.query(ChatLog).filter(ChatLog.id == log_id).first()
        worst_with_messages.append({
            "log_id": log_id,
            "message": log.message if log else "(deleted)",
            "down_count": down_count
        })

    return {
        "total_up": total_up,
        "total_down": total_down,
        "satisfaction_rate": round(total_up / (total_up + total_down) * 100, 1) if (total_up + total_down) > 0 else None,
        "worst_rated": worst_with_messages
    }


@router.get("/cache/stats")
def get_cache_stats(
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Cache stats: total entries, total hits saved, top cached queries."""
    total_entries = db.query(QueryCache).count()
    active_entries = db.query(QueryCache).filter(QueryCache.expires_at > datetime.utcnow()).count()
    total_hits = db.query(func.sum(QueryCache.hit_count)).scalar() or 0

    top_cached = (
        db.query(QueryCache)
        .filter(QueryCache.expires_at > datetime.utcnow())
        .order_by(QueryCache.hit_count.desc())
        .limit(10)
        .all()
    )

    return {
        "total_entries": total_entries,
        "active_entries": active_entries,
        "total_hits_saved": int(total_hits),
        "top_cached_queries": [
            {
                "query": e.query_text,
                "hits": e.hit_count,
                "expires_at": e.expires_at.isoformat() if e.expires_at else None
            }
            for e in top_cached
        ]
    }


@router.delete("/cache")
def clear_cache(
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Clear all cache entries (force-refresh everything)."""
    deleted = db.query(QueryCache).delete()
    db.commit()
    return {"message": f"Cleared {deleted} cache entries"}
