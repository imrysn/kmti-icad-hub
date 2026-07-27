from fastapi import APIRouter, Depends, HTTPException, Header
from typing import Optional
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Quiz, Question, User
from ..schemas import QuizResponse
from ..auth.dependencies import get_current_user

router = APIRouter(prefix="/quizzes", tags=["Assessments"])

@router.get("/{slug}", response_model=QuizResponse)
def get_quiz_by_slug(
    slug: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    accept_language: Optional[str] = Header(None)
):
    """
    Fetch a quiz by its slug (e.g., 'interface').
    Used by trainees when taking a quiz.
    """
    lang = "ja" if accept_language and "ja" in accept_language.lower() else "en"
    quiz = db.query(Quiz).filter(Quiz.slug == slug).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Assessment not found")

    # Get questions
    questions = db.query(Question).filter(Question.quiz_id == quiz.id).order_by(Question.order).all()
    
    # Apply translation mappings on-the-fly for serialization
    for q in questions:
        if lang == "ja" and q.text_ja:
            q.text = q.text_ja
        if lang == "ja" and q.options_json_ja:
            q.options_json = q.options_json_ja
        if lang == "ja" and q.explanation_ja:
            q.explanation = q.explanation_ja

    if lang == "ja" and quiz.title_ja:
        quiz.title = quiz.title_ja
    if lang == "ja" and quiz.description_ja:
        quiz.description = quiz.description_ja

    quiz.questions = questions
    return quiz
