"""iCAD Professional curriculum registry. Uses the Foundations registry shape so lessons render the same way."""
import json
from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from ..models import Course, QuizScore
from .foundations_curriculum import reading_text

COURSE_TYPE = "iCAD_Professional"
REGISTRY = json.loads((Path(__file__).resolve().parents[2] / "data" / "professional-curriculum.json").read_text(encoding="utf-8"))
MODULES = REGISTRY["modules"]
LESSONS = [lesson for module in MODULES for lesson in module["lessons"]]
LESSON_IDS = {lesson["id"] for lesson in LESSONS}


def ensure_professional_course(db: Session) -> Course:
    """Create the published iCAD Professional course once. Which plans include it is still an admin choice."""
    course = db.query(Course).filter(Course.course_type == COURSE_TYPE).first()
    if course is None:
        course = Course(
            title="iCAD Professional",
            title_ja="iCAD プロフェッショナル",
            description="Advanced iCAD SX modeling and detailing lessons.",
            description_ja="iCAD SX の応用モデリングと詳細設計を学ぶレッスンです。",
            course_type=COURSE_TYPE,
            order=1,
            lifecycle_status="published",
            published_at=datetime.now(timezone.utc).replace(tzinfo=None),
        )
        db.add(course)
        db.flush()
    return course


def find_professional_course(db, course_reference):
    course = db.query(Course).filter(Course.course_type == COURSE_TYPE).first()
    return course if course and str(course_reference) in {str(course.id), course.course_type} else None


def progress_percentage(db, user_id, course):
    if not LESSONS:
        return 0.0
    scores = db.query(QuizScore).filter(
        QuizScore.user_id == user_id,
        QuizScore.course_id.in_([str(course.id), course.course_type]),
        QuizScore.score >= 80.0,
    ).all()
    scored_ids = {score.lesson_id for score in scores}
    completed = {lesson['id'] for lesson in LESSONS if lesson['id'] in scored_ids
                 or scored_ids.intersection(lesson.get('completionAliases', []))}
    return round(len(completed) / len(LESSONS) * 100, 1)


def lesson_tree(language="en"):
    lang = "ja" if language == "ja" else "en"
    return [{"id": module["id"], "title": f'{module["id"]} {module["title"][lang]}', "order": i + 1,
             "children": [{"id": lesson["id"], "title": f'{lesson["id"]} {lesson["title"][lang]}',
                           "order": j + 1, "content": reading_text(lesson["content"][lang]), "children": []}
                          for j, lesson in enumerate(module["lessons"])]}
            for i, module in enumerate(MODULES)]
