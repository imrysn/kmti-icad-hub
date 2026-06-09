from sqlalchemy.orm import Session
from ..models import User, UserProgress, QuizScore

def calculate_all_trainee_progress(db: Session):
    """Get aggregated and detailed progress for all trainees (WMI calculation)"""
    # Fetch all trainees
    users = db.query(User).filter(User.role != "admin").all()
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
