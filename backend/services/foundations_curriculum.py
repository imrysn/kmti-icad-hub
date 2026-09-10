"""Read-only curriculum/progress projection shared with the frontend. Never rewrites old scores."""
import json
from pathlib import Path

from ..models import Course, QuizScore

REGISTRY = json.loads((Path(__file__).resolve().parents[2] / "data" / "foundations-curriculum.json").read_text(encoding="utf-8"))
MODULES = REGISTRY["modules"]
LESSONS = [lesson for module in MODULES for lesson in module["lessons"]]
LESSON_IDS = {lesson["id"] for lesson in LESSONS}
ROUTE_ALIASES = {alias: lesson["id"] for lesson in LESSONS for alias in lesson["routeAliases"]}


def resolve_lesson_id(lesson_id):
    return lesson_id if lesson_id in LESSON_IDS else ROUTE_ALIASES.get(lesson_id)


def completed_lesson_ids(ids):
    completed = set(ids)
    return {lesson["id"] for lesson in LESSONS if lesson["id"] in completed
            or completed.intersection(lesson["completionAliases"])}


def find_foundations_course(db, course_reference):
    course = db.query(Course).filter(Course.course_type == "iCAD_Foundations").first()
    return course if course and str(course_reference) in {str(course.id), course.course_type} else None


def progress_percentage(db, user_id, course):
    scores = db.query(QuizScore).filter(
        QuizScore.user_id == user_id,
        QuizScore.course_id.in_([str(course.id), course.course_type]),
        QuizScore.score >= 80.0,
    ).all()
    return round(len(completed_lesson_ids(score.lesson_id for score in scores)) / len(LESSONS) * 100, 1)


def lesson_tree(language="en"):
    lang = "ja" if language == "ja" else "en"
    return [{"id": module["id"], "title": f'{module["id"]} {module["title"][lang]}', "order": i + 1,
             "children": [{"id": lesson["id"], "title": f'{lesson.get("displayId", lesson["id"])} {lesson["title"][lang]}',
                           "order": j + 1, "content": reading_text(lesson["content"][lang]), "children": []}
                          for j, lesson in enumerate(module["lessons"])]}
            for i, module in enumerate(MODULES)]


def reading_text(content):
    sections = [text for section in content.get("sections", []) for text in (section["title"], section["text"])]
    return [text.replace("**", "") for text in [content["explanation"], content.get("description2"), content["practice"],
                                               *sections, content.get("quickReview")] if text]
