from sqlalchemy.orm import Session
from ..models import UserProgress
from ..schemas import CourseList, CourseProgress, CourseResponse

class CourseService:
    def get_available_courses(self) -> CourseList:
        # In a real app, this might fetch from a DB
        courses = [
            CourseResponse(id=1, title="3D Modeling", description="Basic functions and tools.", course_type="3D_Modeling", order=0),
            CourseResponse(id=2, title="2D Drawing", description="Precision drafting.", course_type="2D_Drawing", order=1)
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
