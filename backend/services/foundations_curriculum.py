"""Read-only curriculum/progress projection shared with the frontend. Never rewrites old scores."""
import json
import re
from types import SimpleNamespace
from pathlib import Path

from ..models import Course, QuizScore

REGISTRY = json.loads((Path(__file__).resolve().parents[2] / "data" / "foundations-curriculum.json").read_text(encoding="utf-8"))
PROFESSIONAL_REGISTRY = json.loads((Path(__file__).resolve().parents[2] / "data" / "professional-curriculum.json").read_text(encoding="utf-8"))
PROFESSIONAL_SOURCES = {lesson["id"]: lesson for module in PROFESSIONAL_REGISTRY["modules"] for lesson in module["lessons"]}


def foundation_reference_text(text):
    def replace(match):
        if match.group(0) == "P6.2":
            return "F8.2"
        number = int(match.group(1))
        # P1/P2/P3 denote geometric points in the authored instructions.
        return f'F{number + 2}{match.group(2) or ""}' if 7 <= number <= 13 else match.group(0)
    return re.sub(r"\bP(\d+)(\.\d+)?\b", replace, text)


MODULES = [{**module, "lessons": [
    {**PROFESSIONAL_SOURCES[lesson["sourceProfessionalLessonId"]], **lesson,
     "content": json.loads(foundation_reference_text(json.dumps(PROFESSIONAL_SOURCES[lesson["sourceProfessionalLessonId"]]["content"], ensure_ascii=False)))}
    if "sourceProfessionalLessonId" in lesson else lesson
    for lesson in module["lessons"]]} for module in REGISTRY["modules"]]
LESSONS = [lesson for module in MODULES for lesson in module["lessons"]]
LESSON_IDS = {lesson["id"] for lesson in LESSONS}
ROUTE_ALIASES = {alias: lesson["id"] for lesson in LESSONS for alias in lesson["routeAliases"]}


def resolve_lesson_id(lesson_id):
    return lesson_id if lesson_id in LESSON_IDS else ROUTE_ALIASES.get(lesson_id)


def completed_lesson_ids(ids):
    completed = set(ids)
    return {lesson["id"] for lesson in LESSONS if lesson.get("completionId", lesson["id"]) in completed
            or completed.intersection(lesson["completionAliases"])}


def completion_storage_id(lesson_id):
    """Keep reused F9/F10 numbers separate from historical score identities."""
    canonical = resolve_lesson_id(lesson_id)
    lesson = next((lesson for lesson in LESSONS if lesson["id"] == canonical), None)
    return lesson.get("completionId", canonical) if lesson else None


def find_foundations_course(db, course_reference):
    course = db.query(Course).filter(Course.course_type == "iCAD_Foundations").first()
    return course if course and str(course_reference) in {str(course.id), course.course_type} else None


def inherited_professional_scores(scores, professional_references):
    """Read-only credit for the exact source lesson, including its historical aliases."""
    mapping = {}
    for lesson in LESSONS:
        source_id = lesson.get("sourceProfessionalLessonId")
        if source_id:
            for alias in [source_id, *PROFESSIONAL_SOURCES[source_id].get("completionAliases", [])]:
                mapping[alias] = lesson["completionId"]
    return [SimpleNamespace(lesson_id=mapping[score.lesson_id], score=score.score,
                            course_id=score.course_id, completed_at=score.completed_at)
            for score in scores if score.course_id in professional_references and score.lesson_id in mapping]


def foundation_scores(db, user_id, course):
    professional = db.query(Course).filter(Course.course_type == "iCAD_Professional").first()
    own_refs = {str(course.id), course.course_type}
    source_refs = {str(professional.id), professional.course_type} if professional else set()
    scores = db.query(QuizScore).filter(QuizScore.user_id == user_id,
                                      QuizScore.course_id.in_(own_refs | source_refs)).all()
    return [score for score in scores if score.course_id in own_refs] + inherited_professional_scores(scores, source_refs)


def progress_percentage(db, user_id, course):
    scores = foundation_scores(db, user_id, course)
    return round(len(completed_lesson_ids(score.lesson_id for score in scores if score.score >= 80)) / len(LESSONS) * 100, 1)


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
