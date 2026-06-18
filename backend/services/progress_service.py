from sqlalchemy.orm import Session
from ..models import User, UserProgress, QuizScore, TrainerTraineeMapping

def calculate_all_trainee_progress(db: Session, trainer_id: int = None):
    """Get aggregated and detailed progress for all trainees (WMI calculation)"""
    # Fetch all trainees
    query = db.query(User).filter(User.role != "admin")
    
    if trainer_id:
        # Filter by trainees mapped to this trainer
        mappings = db.query(TrainerTraineeMapping).filter(TrainerTraineeMapping.trainer_id == trainer_id).all()
        trainee_ids = [m.trainee_id for m in mappings]
        query = query.filter(User.id.in_(trainee_ids))
        
    users = query.all()
    user_ids = [u.id for u in users]
    
    # Batch fetch all progress and scores to avoid N+1 problem
    all_progress = db.query(UserProgress).filter(UserProgress.user_id.in_(user_ids)).all()
    all_scores = db.query(QuizScore).filter(QuizScore.user_id.in_(user_ids)).all()
    
    # Organize data by user_id
    progress_map = {}
    for p in all_progress:
        if p.user_id not in progress_map:
            progress_map[p.user_id] = []
        progress_map[p.user_id].append(p)
        
    scores_map = {}
    for s in all_scores:
        if s.user_id not in scores_map:
            scores_map[s.user_id] = []
        scores_map[s.user_id].append(s)
    
    results = []
    for user in users:
        user_progress = progress_map.get(user.id, [])
        user_scores = scores_map.get(user.id, [])
        
        lessons = [
            {
                "course_id": p.course_id,
                "percentage": p.progress_percentage,
                "last_accessed": p.last_accessed
            } for p in user_progress
        ]
        
        quizzes = [
            {
                "course_id": q.course_id,
                "lesson_id": q.lesson_id,
                "score": q.score,
                "first_attempt_score": q.first_attempt_score,
                "attempts_count": q.attempts_count,
                "completed_at": q.completed_at,
                "first_attempt_at": q.first_attempt_at
            } for q in user_scores
        ]
        
        # Calculate Weighted Mastery Index
        # Formula: (Best Score) * Efficiency Factor
        # Efficiency Factor: 1.0 (1-2 attempts), 0.9 (3-5), 0.75 (6-9), 0.6 (10+)
        weighted_scores = []
        for q in user_scores:
            efficiency_factor = 1.0
            if q.attempts_count > 9: efficiency_factor = 0.6
            elif q.attempts_count >= 6: efficiency_factor = 0.75
            elif q.attempts_count >= 3: efficiency_factor = 0.9
            
            weighted_scores.append(q.score * efficiency_factor)
            
        avg_score = 0
        if weighted_scores:
            avg_score = sum(weighted_scores) / len(weighted_scores)
        
        results.append({
            "id": user.id,
            "username": user.username,
            "full_name": user.full_name,
            "last_login": user.last_login,
            "completed_lessons": len(user_progress),
            "average_score": round(float(avg_score), 1), # This is now the Weighted Mastery Index
            "raw_average_score": round(float(sum(q.score for q in user_scores) / len(user_scores)), 1) if user_scores else 0,
            "lessons_history": lessons,
            "quizzes_history": quizzes
        })
        
    return results

def update_user_course_progress(db: Session, user_id: int, course_id: str):
    """Recalculate overall course progress percentage and update/create UserProgress (milestone) entry."""
    from ..models import Quiz, QuizScore, UserProgress
    from datetime import datetime, timezone
    
    course_type = "3D_Modeling" if course_id == "1" else "2D_Drawing"
    total_quizzes = db.query(Quiz).filter(Quiz.course_type == course_type).count()
    
    passed_quizzes = db.query(QuizScore).filter(
        QuizScore.user_id == user_id,
        QuizScore.course_id == course_id,
        QuizScore.score >= 80.0
    ).count()
    
    progress_pct = 0.0
    if total_quizzes > 0:
        progress_pct = round((passed_quizzes / total_quizzes) * 100.0, 1)
        
    progress_record = db.query(UserProgress).filter(
        UserProgress.user_id == user_id,
        UserProgress.course_id == course_id
    ).first()
    
    if progress_pct > 0.0:
        if not progress_record:
            progress_record = UserProgress(
                user_id=user_id,
                course_id=course_id,
                progress_percentage=progress_pct,
                last_accessed=datetime.now(timezone.utc)
            )
            db.add(progress_record)
        else:
            progress_record.progress_percentage = progress_pct
            progress_record.last_accessed = datetime.now(timezone.utc)
    else:
        if progress_record:
            db.delete(progress_record)
            
    db.commit()
