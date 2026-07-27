from fastapi import APIRouter, Depends, Header
from typing import Optional
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, Lesson, LessonContent
from ..services.course_service import course_service
from ..schemas import CourseList, CourseProgress
from ..auth.dependencies import get_current_user

router = APIRouter(prefix="/courses", tags=["Curriculum & Progress"])

@router.get("/", response_model=CourseList)
def get_courses(db: Session = Depends(get_db), current_user: User = Depends(get_current_user), accept_language: Optional[str] = Header(None)):
    """
    Get list of available courses. Requires authentication.
    """
    lang = "ja" if accept_language and "ja" in accept_language.lower() else "en"
    return course_service.get_available_courses(db, lang=lang)

@router.get("/{course_id}/progress/{user_id}", response_model=CourseProgress)
def get_progress(course_id: str, user_id: str, db: Session = Depends(get_db),
                 current_user: User = Depends(get_current_user)):
    """
    Get user progress for a specific course. Requires authentication.
    """
    return course_service.get_user_progress(db, course_id, user_id)

@router.get("/{course_id}/lessons")
def get_course_lessons(course_id: str, db: Session = Depends(get_db), accept_language: Optional[str] = Header(None)):
    """
    Fetch hierarchical lesson list for a specific course.
    """
    lang = "ja" if accept_language and "ja" in accept_language.lower() else "en"
    return course_service.get_course_lessons(db, course_id, lang=lang)

@router.get("/lesson/{slug}/content")
def get_lesson_content(slug: str, db: Session = Depends(get_db), accept_language: Optional[str] = Header(None)):
    """
    Fetch modular content for a lesson by its slug.
    Used for dynamically managed curriculum.
    """
    lang = "ja" if accept_language and "ja" in accept_language.lower() else "en"
    lesson = db.query(Lesson).filter(Lesson.slug == slug).first()
    if not lesson:
        return []
    
    contents = db.query(LessonContent).filter(LessonContent.lesson_id == lesson.id).order_by(LessonContent.order).all()
    return [
        {
            "id": c.id,
            "lesson_id": c.lesson_id,
            "content_type": c.content_type,
            "data": c.data_ja if (lang == "ja" and c.data_ja) else c.data,
            "order": c.order
        } for c in contents
    ]
