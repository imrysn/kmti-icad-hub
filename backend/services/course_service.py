from sqlalchemy.orm import Session
from ..models import UserProgress, Course as CourseModel
from ..schemas import CourseList, CourseProgress, CourseResponse

class CourseService:
    def get_available_courses(self, db: Session) -> CourseList:
        """Fetch all available courses from the database."""
        courses = db.query(CourseModel).order_by(CourseModel.order).all()
        
        # If no courses in DB, return empty list
        course_responses = [
            CourseResponse(
                id=c.id, 
                title=c.title, 
                description=c.description, 
                course_type=c.course_type, 
                order=c.order
            ) for c in courses
        ]
        return CourseList(courses=course_responses)

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

    def get_course_lessons(self, db: Session, course_id: int):
        """Fetch lessons for a course in a hierarchical structure."""
        from ..models import Lesson, Quiz
        
        # Fetch all lessons for the course
        lessons = db.query(Lesson).filter(Lesson.course_id == course_id).order_by(Lesson.order).all()
        
        # Fetch all quiz slugs to identify which lessons have quizzes
        quiz_slugs = {q.slug for q in db.query(Quiz.slug).all()}
        
        # Build hierarchy
        lesson_map = {l.id: {
            "id": l.slug, # Use slug as ID for frontend compatibility
            "db_id": l.id,
            "title": l.title,
            "order": l.order,
            "quiz": {} if l.slug in quiz_slugs else None, # Restore quiz indicator for gating
            "children": []
        } for l in lessons}
        
        root_lessons = []
        for l in lessons:
            lesson_obj = lesson_map[l.id]
            if l.parent_id:
                if l.parent_id in lesson_map:
                    lesson_map[l.parent_id]["children"].append(lesson_obj)
            else:
                root_lessons.append(lesson_obj)
        
        return root_lessons

course_service = CourseService()
