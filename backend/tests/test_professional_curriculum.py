import json
from pathlib import Path

from backend.models import AccessPlan, Course, PlanEntitlement, QuizScore, UserPlanAssignment, UserProgress
from backend.services.course_service import course_service
from backend.services.entitlement_service import has_entitlement
from backend.services.professional_curriculum import (
    COURSE_TYPE, LESSONS, MODULES, ensure_professional_course, lesson_tree, progress_percentage,
)
from backend.services.progress_service import update_user_course_progress

FOUNDATIONS = json.loads((Path(__file__).resolve().parents[2] / "data" / "foundations-curriculum.json").read_text(encoding="utf-8"))
FOUNDATION_LESSONS = {lesson["id"]: lesson for module in FOUNDATIONS["modules"] for lesson in module["lessons"]}
EXPECTED = [
    ("P1.1", "F1.2"), ("P1.2", "F1.3"), ("P1.3", "F1.6"), ("P2.1", "F2.1"), ("P2.2", "F2.9"),
    ("P3.1", "F3.1"), ("P3.2", "F3.5"), ("P3.3", "F3.6"),
    ("P4.1", "F4.1"), ("P4.2", "F4.6"), ("P4.3", "F4.12"),
    ("P5.1", "F5.1"), ("P5.2", "F5.4"), ("P5.3", "F5.6"),
    ("P6.1", "F8.1"), ("P6.2", "F8.3"), ("P6.3", "F8.5"),
    ("P7.1", "F9.5"), ("P7.2", "F9.6"), ("P7.3", "F9.7"), ("P7.4", None), ("P7.5", None),
]


def test_professional_registry_copies_the_foundations_lessons():
    assert [module["id"] for module in MODULES] == ["P1", "P2", "P3", "P4", "P5", "P6", "P7"]
    assert [(lesson["id"], lesson.get("sourceLessonId")) for lesson in LESSONS] == EXPECTED
    for lesson in LESSONS:
        assert lesson["moduleId"] == lesson["id"].split(".")[0]
        for language in ("en", "ja"):
            assert lesson["content"][language]["sections"]
        source = FOUNDATION_LESSONS.get(lesson.get("sourceLessonId"))
        if source and lesson["moduleId"] != "P7":
            assert lesson["title"] == source["title"]
            assert lesson["content"] == source["content"]
        elif source:
            # P7 copies keep the layout but point their cross-references at Professional lessons.
            assert [len(lesson["content"][lang]["sections"]) for lang in ("en", "ja")] == [len(source["content"][lang]["sections"]) for lang in ("en", "ja")]
            assert "F8." not in json.dumps(lesson["content"], ensure_ascii=False)
            assert "F9." not in json.dumps(lesson["content"], ensure_ascii=False)
    assert lesson_tree("en")[6]["children"][4]["title"] == "P7.5 Torus"
    assert [lesson["renderer"] for lesson in LESSONS[-2:]] == ["basic-op-cone", "basic-op-torus"]


def test_professional_course_is_created_once_and_lists_its_lessons(db):
    first = ensure_professional_course(db)
    db.commit()
    second = ensure_professional_course(db)
    db.commit()
    assert first.id == second.id
    assert db.query(Course).filter(Course.course_type == COURSE_TYPE).count() == 1
    assert first.lifecycle_status == "published"
    tree = course_service.get_course_lessons(db, str(first.id))
    assert [child["id"] for module in tree for child in module["children"]] == [lesson_id for lesson_id, _ in EXPECTED]


def test_professional_progress_counts_only_professional_lessons(db, trainee_user):
    course = ensure_professional_course(db)
    for lesson_id, score in [("P1.1", 100), ("P2.1", 79), ("F1.2", 100)]:
        db.add(QuizScore(user_id=trainee_user.id, course_id=str(course.id), lesson_id=lesson_id, score=score))
    db.commit()
    assert progress_percentage(db, trainee_user.id, course) == round(1 / len(EXPECTED) * 100, 1)
    update_user_course_progress(db, trainee_user.id, str(course.id))
    assert db.query(UserProgress).filter(UserProgress.user_id == trainee_user.id).one().progress_percentage == round(1 / len(EXPECTED) * 100, 1)


def test_professional_plan_opens_only_the_professional_course(db, trainee_user):
    ensure_professional_course(db)
    plan = AccessPlan(code="professional-test", name="Professional")
    db.add(plan)
    db.flush()
    db.add(PlanEntitlement(plan_id=plan.id, resource_type="course", resource_id=COURSE_TYPE, permission_code="view"))
    db.add(UserPlanAssignment(user_id=trainee_user.id, plan_id=plan.id, status="active"))
    db.commit()
    assert has_entitlement(db, trainee_user, "course", COURSE_TYPE)
    assert not has_entitlement(db, trainee_user, "course", "iCAD_Foundations")
