from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..services.course_service import course_service
from ..schemas import CourseList, CourseProgress
from ..auth.dependencies import get_current_user

router = APIRouter(prefix="/courses", tags=["Curriculum & Progress"])

@router.get("/", response_model=CourseList)
def get_courses(current_user: User = Depends(get_current_user)):
    """
    Get list of available courses. Requires authentication.
    """
    return course_service.get_available_courses()

@router.get("/{course_id}/progress/{user_id}", response_model=CourseProgress)
def get_progress(course_id: str, user_id: str, db: Session = Depends(get_db),
                 current_user: User = Depends(get_current_user)):
    """
    Get user progress for a specific course. Requires authentication.
    """
    return course_service.get_user_progress(db, course_id, user_id)
