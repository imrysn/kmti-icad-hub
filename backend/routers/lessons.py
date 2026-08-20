from fastapi import APIRouter, Depends, Header
from typing import Optional
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, Lesson, LessonContent
from ..services.course_service import course_service
from ..schemas import CourseList, CourseProgress
from ..auth.dependencies import get_current_user
from ..services.entitlement_service import require_course_access, require_lesson_access

router = APIRouter(prefix="/courses", tags=["Curriculum & Progress"])

@router.get("/", response_model=CourseList)
def get_courses(db: Session = Depends(get_db), current_user: User = Depends(get_current_user), accept_language: Optional[str] = Header(None)):
    """
    Get list of available courses. Requires authentication.
    """
    lang = "ja" if accept_language and "ja" in accept_language.lower() else "en"
    from ..services.entitlement_service import has_entitlement, is_learning_operator
    result = course_service.get_available_courses(db, lang=lang)
    if is_learning_operator(db, current_user):
        return result
    result.courses = [course for course in result.courses if has_entitlement(db, current_user, "course", course.course_type) or has_entitlement(db, current_user, "course", str(course.id))]
    return result

@router.get("/{course_id}/progress/{user_id}", response_model=CourseProgress)
def get_progress(course_id: str, user_id: str, db: Session = Depends(get_db),
                 current_user: User = Depends(get_current_user)):
    """
    Get user progress for a specific course. Requires authentication.
    """
    require_course_access(db, current_user, course_id)
    if str(current_user.id) != str(user_id) and current_user.role not in ("employee", "admin"):
        from fastapi import HTTPException
        raise HTTPException(status_code=403, detail="You may only view your own progress")
    return course_service.get_user_progress(db, course_id, user_id)

@router.get("/{course_id}/lessons")
def get_course_lessons(course_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user), accept_language: Optional[str] = Header(None)):
    """
    Fetch hierarchical lesson list for a specific course.
    """
    require_course_access(db, current_user, course_id)
    lang = "ja" if accept_language and "ja" in accept_language.lower() else "en"
    return course_service.get_course_lessons(db, course_id, lang=lang)

@router.get("/lesson/{slug}/content")
def get_lesson_content(slug: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user), accept_language: Optional[str] = Header(None)):
    """
    Fetch modular content for a lesson by its slug.
    Used for dynamically managed curriculum.
    """
    lang = "ja" if accept_language and "ja" in accept_language.lower() else "en"
    lesson = require_lesson_access(db, current_user, slug)
    
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
