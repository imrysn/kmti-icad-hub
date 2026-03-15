from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func, cast, String
from typing import List, Dict
import os
import psutil

from ..database import get_db
from ..models import User, UserProgress, QuizScore, SystemLog, Broadcast
from ..schemas import UserCreateAdmin, UserUpdate, UserResponse
from ..auth.dependencies import require_role
from ..auth.security import hash_password
from ..rag_engine import rag_engine
from ..ingest_knowledge_base import ingest_directory

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


@router.post("/users", response_model=UserResponse)
def create_user_as_admin(
    user_data: UserCreateAdmin,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Admin-only endpoint to create users with direct role assignment."""
    # Check for existing user
    if db.query(User).filter(User.username == user_data.username).first():
        raise HTTPException(status_code=400, detail="Username already registered")
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
        full_name=user_data.full_name,
        role=user_data.role,
        is_active=True
    )
    
    db.add(new_user)
    
    # Log creation
    log_entry = SystemLog(
        level="INFO",
        message=f"Admin {admin.username} created user {new_user.username} as {new_user.role}",
        context="USER_MGMT",
        user_id=admin.id
    )
    db.add(log_entry)
    db.commit()
    db.refresh(new_user)
    
    return new_user


@router.put("/users/{user_id}", response_model=UserResponse)
def update_user_as_admin(
    user_id: int,
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Admin-only endpoint to update user details."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update basic fields
    if user_update.email is not None:
        user.email = user_update.email
    if user_update.full_name is not None:
        user.full_name = user_update.full_name
    if user_update.role is not None:
        # Restriction: admin cannot demote themselves to avoid locking out the system
        if user.id == admin.id and user_update.role != "admin":
             raise HTTPException(status_code=400, detail="Cannot demote yourself from Admin role")
        user.role = user_update.role
    if user_update.is_active is not None:
        if user.id == admin.id and user_update.is_active is False:
             raise HTTPException(status_code=400, detail="Cannot deactivate your own account")
        user.is_active = user_update.is_active
    
    # Handle password update separately (re-hash)
    if user_update.password:
        user.hashed_password = hash_password(user_update.password)

    # Log update
    log_entry = SystemLog(
        level="INFO",
        message=f"Admin {admin.username} updated user {user.username} details",
        context="USER_MGMT",
        user_id=admin.id
    )
    db.add(log_entry)
    db.commit()
    db.refresh(user)
    
    return user


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
    from datetime import datetime, timedelta
    one_hour_ago = datetime.utcnow() - timedelta(minutes=60)
    
    stats = db.query(
        UserProgress.course_id,
        func.count(UserProgress.id).label("active_count")
    ).filter(UserProgress.last_accessed >= one_hour_ago)\
     .group_by(UserProgress.course_id).all()
    
    return [{"course_id": s[0], "count": s[1]} for s in stats]


@router.get("/export/progress")
def export_trainee_progress(
    user_id: int = None,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Export granular trainee progress data as CSV"""
    import csv
    import io
    from fastapi.responses import StreamingResponse
    
    # Base query for progress
    query = db.query(UserProgress, User.username, User.full_name)\
        .join(User, UserProgress.user_id == cast(User.id, String))
        
    if user_id:
        query = query.filter(User.id == user_id)
        
    results = query.all()
    
    if not results:
        # If no progress yet, at least export user info if user_id is specified
        if user_id:
            user = db.query(User).filter(User.id == user_id).first()
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            results = [(None, user.username, user.full_name)]
        else:
            raise HTTPException(status_code=404, detail="No progress data found to export")
    
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "Trainee Username", "Full Name", "Course ID", "Status", 
        "Progress %", "Highest Quiz Score", "Last Activity"
    ])
    
    for progress, username, full_name in results:
        course_id = progress.course_id if progress else "N/A"
        progress_pct = progress.progress_percentage if progress else 0
        last_act = progress.last_accessed if progress else "N/A"
        
        # Get highest quiz score for this user-course pair
        uid_str = str(user_id) if user_id else None
        # If we are looping over all, we need the user_id from the join result... 
        # Wait, the join result should include the User object or its ID.
        
    # Re-writing for better performance and clarity
    query = db.query(UserProgress, User)\
        .join(User, UserProgress.user_id == cast(User.id, String))
    if user_id:
        query = query.filter(User.id == user_id)
    
    rows = query.all()
    
    for progress, user in rows:
        # Get best score
        best_score = db.query(func.max(QuizScore.score))\
            .filter(QuizScore.user_id == str(user.id))\
            .filter(QuizScore.course_id == progress.course_id).scalar() or 0
            
        status = "Completed" if progress.progress_percentage >= 100 else "In Progress"
        
        writer.writerow([
            user.username,
            user.full_name,
            progress.course_id,
            status,
            f"{progress.progress_percentage}%",
            f"{best_score}%",
            progress.last_accessed
        ])
    
    output.seek(0)
    filename = f"trainee_granular_report_{user_id if user_id else 'all'}.csv"
    return StreamingResponse(
        io.BytesIO(output.getvalue().encode()),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )


@router.post("/reindex")
def trigger_kb_reindex(
    admin: User = Depends(require_role("admin"))
):
    """Manually trigger re-indexing of the knowledge base directory"""
    kb_dir = "knowledge_base/"
    if not os.path.exists(kb_dir):
        # Check relative to backend or root
        kb_dir = os.path.join(os.getcwd(), "knowledge_base")
        
    try:
        ingest_directory(kb_dir)
        return {"message": "Knowledge base re-indexing triggered successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Re-indexing failed: {str(e)}")
