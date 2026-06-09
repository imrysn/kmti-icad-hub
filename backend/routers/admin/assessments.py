from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, cast, Integer
from typing import List
import io
import csv
import json
from datetime import datetime
from fastapi.responses import StreamingResponse

from ...database import get_db
from ...models import User, UserProgress, QuizScore, SystemLog, Quiz, Question, Course, Lesson, LessonContent, QuestionAttempt
from ...schemas import (
    QuizCreate, QuizUpdate, QuizResponse, 
    QuestionCreate, QuestionUpdate, QuestionResponse,
    CourseResponse, LessonCreate, LessonResponse, 
    LessonContentCreate, LessonContentResponse
)
from ...auth.dependencies import require_role
from ...services.progress_service import calculate_all_trainee_progress

router = APIRouter()

@router.get("/progress")
def get_all_trainee_progress(
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Get aggregated and detailed progress for all trainees"""
    return calculate_all_trainee_progress(db)


@router.post("/reopen-assessment")
def reopen_assessment(
    user_id: int,
    quiz_slug: str,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """
    Delete a trainee's quiz score and question attempts for a specific assessment.
    This effectively 'reopens' the assessment for them to take again.
    """
    # 1. Find the Quiz to get its numeric ID (needed for QuestionAttempt)
    quiz = db.query(Quiz).filter(Quiz.slug == quiz_slug).first()
    
    # 2. Delete the QuizScore (uses user_id as integer and lesson_id as slug)
    score = db.query(QuizScore).filter(
        QuizScore.user_id == user_id,
        QuizScore.lesson_id == quiz_slug
    ).first()
    
    if score:
        db.delete(score)
        
    # 3. Delete QuestionAttempts (uses numeric IDs)
    if quiz:
        db.query(QuestionAttempt).filter(
            QuestionAttempt.user_id == user_id,
            QuestionAttempt.quiz_id == quiz.id
        ).delete()
    
    # 4. Log the action
    log_entry = SystemLog(
        level="WARNING",
        message=f"Admin {admin.username} reopened assessment '{quiz_slug}' for user ID {user_id}",
        context="ASSESSMENT_MGMT",
        user_id=admin.id
    )
    db.add(log_entry)
    db.commit()
    
    return {"message": f"Assessment '{quiz_slug}' has been reopened for user {user_id}"}


@router.post("/reopen-all-assessments")
def reopen_all_assessments(
    user_id: int,
    course_type: str = None,  # "2D_Drawing" or "3D_Modeling" or None for all
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """
    Delete quiz scores and question attempts for a trainee.
    Optionally filtered by course_type.
    """
    if course_type:
        # 1. Delete QuizScore entries for the specific course_id
        internal_course_id = "1" if course_type == "3D_Modeling" else "2"
        db.query(QuizScore).filter(
            QuizScore.user_id == user_id,
            QuizScore.course_id == internal_course_id
        ).delete()
        
        # 2. Delete QuestionAttempts for quizzes in that course
        quizzes = db.query(Quiz).filter(Quiz.course_type == course_type).all()
        quiz_ids = [q.id for q in quizzes]
        if quiz_ids:
            db.query(QuestionAttempt).filter(
                QuestionAttempt.user_id == user_id,
                QuestionAttempt.quiz_id.in_(quiz_ids)
            ).delete()
    else:
        # Delete all
        db.query(QuizScore).filter(QuizScore.user_id == user_id).delete()
        db.query(QuestionAttempt).filter(QuestionAttempt.user_id == user_id).delete()
    
    # 3. Log the action
    msg = f"Admin {admin.username} reset {'ALL' if not course_type else course_type} assessments for user ID {user_id}"
    log_entry = SystemLog(
        level="DANGER",
        message=msg,
        context="ASSESSMENT_MGMT",
        user_id=admin.id
    )
    db.add(log_entry)
    db.commit()
    
    return {"message": f"Assessments have been reopened for user {user_id}"}


@router.post("/close-all-assessments")
def close_all_assessments(
    user_id: int,
    course_type: str = None, # "2D_Drawing" or "3D_Modeling" or None for all
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """
    Mark assessments as completed with 100% score for a trainee.
    Optionally filtered by course_type.
    """
    # 1. Get relevant quizzes
    query = db.query(Quiz)
    if course_type:
        query = query.filter(Quiz.course_type == course_type)
    quizzes = query.all()
    
    # 2. For each quiz, upsert a QuizScore entry
    for quiz in quizzes:
        # Check if score exists
        score_entry = db.query(QuizScore).filter(
            QuizScore.user_id == user_id,
            QuizScore.lesson_id == quiz.slug
        ).first()
        
        if score_entry:
            score_entry.score = 100.0
            score_entry.attempts_count = max(score_entry.attempts_count, 1)
            score_entry.completed_at = datetime.utcnow()
        else:
            new_score = QuizScore(
                user_id=user_id,
                course_id="1" if quiz.course_type == "3D_Modeling" else "2",
                lesson_id=quiz.slug,
                score=100.0,
                attempts_count=1,
                completed_at=datetime.utcnow()
            )
            db.add(new_score)
            
    # 3. Log the action
    msg = f"Admin {admin.username} marked {'ALL' if not course_type else course_type} assessments as CLOSED (100%) for user ID {user_id}"
    log_entry = SystemLog(
        level="INFO",
        message=msg,
        context="ASSESSMENT_MGMT",
        user_id=admin.id
    )
    db.add(log_entry)
    db.commit()
    
    return {"message": f"Assessments have been marked as completed for user {user_id}"}


@router.get("/export/progress")
def export_trainee_progress(
    user_id: int = None,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Export granular trainee progress data as CSV"""
    # Optimized query: Fetch progress and join with users
    query = db.query(UserProgress, User)\
        .join(User, UserProgress.user_id == User.id)
        
    if user_id:
        query = query.filter(User.id == user_id)
        
    results = query.all()
    
    if not results and user_id:
        # If no progress entries, at least check if user exists
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        # Generate results for user with no progress
        results = [(None, user)]
    elif not results:
        raise HTTPException(status_code=404, detail="No progress data found to export")
    
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "Trainee Username", "Full Name", "Course ID", "Status", 
        "Progress %", "Highest Quiz Score", "Last Activity"
    ])
    
    for progress, user in results:
        username = user.username
        full_name = user.full_name
        course_id = progress.course_id if progress else "N/A"
        progress_pct = progress.progress_percentage if progress else 0
        last_act = progress.last_accessed if progress else "N/A"
        
        # Get highest quiz score for this user-course pair
        best_score = 0
        if progress:
            best_score = db.query(func.max(QuizScore.score))\
                .filter(QuizScore.user_id == user.id)\
                .filter(QuizScore.course_id == progress.course_id).scalar() or 0
            
        status = "Completed" if progress_pct >= 100 else "In Progress"
        
        writer.writerow([
            username,
            full_name,
            course_id,
            status,
            f"{progress_pct}%",
            f"{best_score}%",
            last_act
        ])
    
    output.seek(0)
    filename = f"trainee_granular_report_{user_id if user_id else 'all'}.csv"
    return StreamingResponse(
        io.BytesIO(output.getvalue().encode()),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )


@router.get("/quizzes", response_model=List[QuizResponse])
def get_all_quizzes(
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """List all quizzes with their metadata"""
    return db.query(Quiz).all()


@router.get("/quizzes/{quiz_id}", response_model=QuizResponse)
def get_quiz_detail(
    quiz_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Get full quiz details including all questions"""
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    # Manually attach questions sorted by order
    questions = db.query(Question).filter(Question.quiz_id == quiz_id).order_by(Question.order).all()
    quiz.questions = questions
    return quiz


@router.post("/quizzes", response_model=QuizResponse)
def create_quiz(
    quiz_data: QuizCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Create a new quiz definition"""
    if db.query(Quiz).filter(Quiz.slug == quiz_data.slug).first():
        raise HTTPException(status_code=400, detail="Quiz slug already exists")
    
    new_quiz = Quiz(**quiz_data.model_dump())
    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz)
    return new_quiz


@router.put("/quizzes/{quiz_id}", response_model=QuizResponse)
def update_quiz(
    quiz_id: int,
    quiz_update: QuizUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Update quiz metadata"""
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    for key, value in quiz_update.model_dump(exclude_unset=True).items():
        setattr(quiz, key, value)
    
    db.commit()
    db.refresh(quiz)
    return quiz


@router.delete("/quizzes/{quiz_id}")
def delete_quiz(
    quiz_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Delete a quiz and all its questions"""
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    db.delete(quiz)
    db.commit()
    return {"message": "Quiz deleted successfully"}


@router.post("/quizzes/{quiz_id}/questions", response_model=QuestionResponse)
def create_question(
    quiz_id: int,
    question_data: QuestionCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Add a question to a quiz"""
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    new_question = Question(quiz_id=quiz_id, **question_data.model_dump())
    db.add(new_question)
    db.commit()
    db.refresh(new_question)
    return new_question


@router.put("/questions/{question_id}", response_model=QuestionResponse)
def update_question(
    question_id: int,
    question_update: QuestionUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Update an existing question"""
    question = db.query(Question).filter(Question.id == question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    for key, value in question_update.model_dump(exclude_unset=True).items():
        setattr(question, key, value)
    
    db.commit()
    db.refresh(question)
    return question


@router.delete("/questions/{question_id}")
def delete_question(
    question_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Remove a question from a quiz"""
    question = db.query(Question).filter(Question.id == question_id).first()
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    db.delete(question)
    db.commit()
    return {"message": "Question deleted successfully"}


@router.get("/curriculum/courses", response_model=List[CourseResponse])
def admin_get_courses(db: Session = Depends(get_db), admin: User = Depends(require_role("admin"))):
    return db.query(Course).order_by(Course.order).all()


@router.get("/curriculum/courses/{course_id}/lessons", response_model=List[LessonResponse])
def admin_get_lessons(course_id: int, db: Session = Depends(get_db), admin: User = Depends(require_role("admin"))):
    return db.query(Lesson).filter(Lesson.course_id == course_id).order_by(Lesson.order).all()


@router.post("/curriculum/lessons", response_model=LessonResponse)
def create_lesson(lesson_data: LessonCreate, db: Session = Depends(get_db), admin: User = Depends(require_role("admin"))):
    new_lesson = Lesson(**lesson_data.model_dump())
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)
    return new_lesson


@router.get("/curriculum/lessons/{lesson_id}/content", response_model=List[LessonContentResponse])
def get_lesson_content(lesson_id: int, db: Session = Depends(get_db), admin: User = Depends(require_role("admin"))):
    return db.query(LessonContent).filter(LessonContent.lesson_id == lesson_id).order_by(LessonContent.order).all()


@router.post("/curriculum/lessons/{lesson_id}/content", response_model=LessonContentResponse)
def add_lesson_content(lesson_id: int, content_data: LessonContentCreate, db: Session = Depends(get_db), admin: User = Depends(require_role("admin"))):
    new_content = LessonContent(**content_data.model_dump())
    db.add(new_content)
    db.commit()
    db.refresh(new_content)
    return new_content


@router.get("/analytics/question-performance")
def get_question_performance(db: Session = Depends(get_db), admin: User = Depends(require_role("admin"))):
    """Analyze which questions trainees are failing most often"""
    # Use sqlalchemy func and cast
    
    perf = db.query(
        Question.text,
        Quiz.title.label("quiz_title"),
        func.count(QuestionAttempt.id).label("total_attempts"),
        func.sum(cast(QuestionAttempt.is_correct, Integer)).label("correct_count")
    ).join(QuestionAttempt, Question.id == QuestionAttempt.question_id)\
     .join(Quiz, Quiz.id == Question.quiz_id)\
     .group_by(Question.id, Quiz.id).all()
     
    results = []
    for p in perf:
        accuracy = (p.correct_count / p.total_attempts * 100) if p.total_attempts > 0 else 0
        results.append({
            "question": p.text,
            "quiz": p.quiz_title,
            "attempts": p.total_attempts,
            "accuracy": round(float(accuracy), 1),
            "is_critical": accuracy < 60 and p.total_attempts > 5
        })
    
    return sorted(results, key=lambda x: x["accuracy"])


@router.get("/trainee/{user_id}/attempts/{quiz_slug}")
def get_trainee_quiz_attempts(
    user_id: int,
    quiz_slug: str,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """Get detailed question-by-question attempts for a trainee in a specific quiz"""
    # 1. Find the quiz
    quiz = db.query(Quiz).filter(Quiz.slug == quiz_slug).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
        
    # 2. Get questions for this quiz
    questions = db.query(Question).filter(Question.quiz_id == quiz.id).order_by(Question.order).all()
    
    # 3. Get all attempts for this user and quiz
    attempts = db.query(QuestionAttempt).filter(
        QuestionAttempt.user_id == user_id,
        QuestionAttempt.quiz_id == quiz.id
    ).order_by(QuestionAttempt.attempted_at.desc()).all()
    
    # Map latest attempts to question IDs
    attempts_map = {}
    for a in attempts:
        if a.question_id not in attempts_map:
            attempts_map[a.question_id] = a
    
    results = []
    for q in questions:
        attempt = attempts_map.get(q.id)
        
        # Parse options safely
        try:
            options = json.loads(q.options_json) if q.options_json else []
        except:
            options = []
            
        results.append({
            "question_text": q.text,
            "explanation": q.explanation,
            "options": options,
            "correct_answer_index": q.correct_answer,
            "user_answer_index": attempt.chosen_option if attempt else None,
            "is_correct": attempt.is_correct if attempt else False,
            "seconds_spent": attempt.seconds_spent if attempt else 0,
            "attempted_at": attempt.attempted_at if attempt else None
        })
        
    return {
        "quiz_title": quiz.title,
        "attempts": results
    }
