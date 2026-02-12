from sqlalchemy.orm import Session
from ..models import UserProgress
from ..schemas import Course, CourseList, CourseProgress

class CourseService:
    def get_available_courses(self) -> CourseList:
        # In a real app, this might fetch from a DB
        courses = [
            Course(id="1", title="Introduction to iCAD", description="Basic functions and tools."),
            Course(id="2", title="Advanced Surfacing", description="Complex 3D modeling techniques.")
        ]
        return CourseList(courses=courses)

    def get_user_progress(self, db: Session, course_id: str, user_id: str) -> CourseProgress:
        progress = db.query(UserProgress).filter(
            UserProgress.user_id == user_id, 
            UserProgress.course_id == course_id
        ).first()
        
        percentage = progress.progress_percentage if progress else 0.0
        
        return CourseProgress(
            course_id=course_id,
            user_id=user_id,
            progress_percentage=percentage
        )

course_service = CourseService()
