from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Quiz, Question, User
from ..schemas import QuizResponse
from ..auth.dependencies import get_current_user

router = APIRouter(prefix="/quizzes", tags=["Assessments"])

@router.get("/{slug}", response_model=QuizResponse)
def get_quiz_by_slug(
    slug: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Fetch a quiz by its slug (e.g., 'interface'). 
    Used by trainees when taking a quiz.
    """
    quiz = db.query(Quiz).filter(Quiz.slug == slug).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Assessment not found")
        
    # Get questions
    questions = db.query(Question).filter(Question.quiz_id == quiz.id).order_by(Question.order).all()
    quiz.questions = questions
    
    return quiz
