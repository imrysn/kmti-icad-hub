from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Dict
import os
import psutil

from ..database import get_db
from ..models import User, UserProgress, QuizScore, SystemLog
from ..auth.dependencies import require_role
from ..rag_engine import rag_engine

router = APIRouter(prefix="/admin", tags=["Administration"])

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
            "cpu": cpu_usage,
            "memory": memory_usage,
            "disk": disk_usage
        }
    }

@router.get("/progress")
def get_all_trainee_progress(
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Get aggregated and detailed progress for all trainees"""
    users = db.query(User).filter(User.role != "admin").all()
    
    results = []
    for user in users:
        # Detailed lesson progress
        progress_entries = db.query(UserProgress).filter(UserProgress.user_id == str(user.id)).all()
        lessons = [
            {
                "course_id": p.course_id,
                "percentage": p.progress_percentage,
                "last_accessed": p.last_accessed
            } for p in progress_entries
        ]
        
        # Detailed quiz scores
        quiz_entries = db.query(QuizScore).filter(QuizScore.user_id == str(user.id)).all()
        quizzes = [
            {
                "course_id": q.course_id,
                "score": q.score,
                "completed_at": q.completed_at
            } for q in quiz_entries
        ]
        
        # Average score
        avg_score = db.query(func.avg(QuizScore.score)).filter(QuizScore.user_id == str(user.id)).scalar() or 0
        
        results.append({
            "id": user.id,
            "username": user.username,
            "full_name": user.full_name,
            "last_login": user.last_login,
            "completed_lessons": len(progress_entries),
            "average_score": round(float(avg_score), 1),
            "lessons_history": lessons,
            "quizzes_history": quizzes
        })
        
    return results

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

@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Permanently delete a user. Admin only."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.id == admin.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
        
    # Log the deletion
    log_entry = SystemLog(
        level="WARNING",
        message=f"Admin {admin.username} deleted user {user.username}",
        context="USER_MGMT",
        user_id=admin.id
    )
    db.add(log_entry)
    
    db.delete(user)
    db.commit()
    
    return {"message": f"User {user_id} deleted successfully"}
