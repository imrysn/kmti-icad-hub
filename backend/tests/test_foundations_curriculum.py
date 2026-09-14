import pytest

from backend.models import AccessPlan, Course, PlanEntitlement, QuizScore, UserPlanAssignment
from backend.services.foundations_curriculum import (
    LESSONS, MODULES, completed_lesson_ids, lesson_tree, progress_percentage, resolve_lesson_id,
)
from backend.services.course_service import course_service
from backend.services.progress_service import update_user_course_progress


@pytest.fixture
def foundations(db, trainee_user):
    course = Course(title="iCAD Foundations", course_type="iCAD_Foundations", lifecycle_status="published")
    plan = AccessPlan(code="foundations-test", name="Foundations")
    db.add_all([course, plan])
    db.flush()
    db.add(PlanEntitlement(plan_id=plan.id, resource_type="course", resource_id=course.course_type, permission_code="view"))
    db.add(UserPlanAssignment(user_id=trainee_user.id, plan_id=plan.id, status="active"))
    db.commit()
    return course


def test_shared_registry_structure_and_conservative_aliases():
    assert [module["id"] for module in MODULES] == [f"F{i}" for i in range(1, 11)]
    assert len(LESSONS) == len({lesson["id"] for lesson in LESSONS}) == 37
    assert completed_lesson_ids(["lesson-3-1", "F3.3", "lesson-4-2", "lesson-13-1"]) == {"F4.6"}
    assert resolve_lesson_id("lesson-3-1") is None
    assert resolve_lesson_id("basic-op-cone") is None
    assert resolve_lesson_id("F10.7") is None
    assert lesson_tree("ja")[0]["children"][0]["title"] == "F1.1 iCAD SX とは？"


def test_progress_merges_course_references_without_destroying_records(db, trainee_user, foundations):
    for course_id, lesson_id, score in [
        (str(foundations.id), "lesson-4-2", 85), (foundations.course_type, "F4.6", 100),
        (str(foundations.id), "lesson-13-1", 100), (foundations.course_type, "F2.1", 79),
        ("unrelated", "F1.1", 100),
    ]:
        db.add(QuizScore(user_id=trainee_user.id, course_id=course_id, lesson_id=lesson_id, score=score))
    db.commit()
    assert progress_percentage(db, trainee_user.id, foundations) == round(1 / 37 * 100, 1)
    update_user_course_progress(db, trainee_user.id, str(foundations.id))
    assert db.query(QuizScore).count() == 5
    assert course_service.get_user_progress(db, foundations.course_type, str(trainee_user.id)).progress_percentage == round(1 / 37 * 100, 1)
    assert len(course_service.get_course_lessons(db, str(foundations.id))) == 10


@pytest.mark.parametrize("lesson_id,canonical", [("F9.5", "F9.5"), ("basic-op-box", "F9.5"), ("F10.6", "F10.6")])
def test_completion_accepts_curriculum_ids_without_database_lesson_rows(client, db, foundations, trainee_user, trainee_token, lesson_id, canonical):
    response = client.post("/api/v1/auth/submit-quiz", headers={"Authorization": f"Bearer {trainee_token}"},
                           json={"course_id": str(foundations.id), "lesson_id": lesson_id, "score": 100, "answers": []})
    assert response.status_code == 200, response.text
    score = db.query(QuizScore).filter(QuizScore.user_id == trainee_user.id).one()
    assert score.lesson_id == canonical
    assert progress_percentage(db, trainee_user.id, foundations) == round(1 / 37 * 100, 1)


@pytest.mark.parametrize("lesson_id", ["F11.1", "F1.99", "lesson-13-1", "basic-op-cone", "mirror"])
def test_completion_rejects_out_of_scope_lessons(client, db, foundations, trainee_token, lesson_id):
    response = client.post("/api/v1/auth/submit-quiz", headers={"Authorization": f"Bearer {trainee_token}"},
                           json={"course_id": foundations.course_type, "lesson_id": lesson_id, "score": 100})
    assert response.status_code == 404
    assert db.query(QuizScore).count() == 0


def test_course_access_still_required(client, foundations, trainee_token, db, trainee_user):
    assignments = db.query(UserPlanAssignment).filter(UserPlanAssignment.user_id == trainee_user.id).all()
    for assignment in assignments:
        assignment.status = "cancelled"
    db.commit()
    response = client.post("/api/v1/auth/submit-quiz", headers={"Authorization": f"Bearer {trainee_token}"},
                           json={"course_id": foundations.course_type, "lesson_id": "F1.1", "score": 100})
    assert response.status_code == 403


def test_lesson_api_exposes_only_new_bilingual_tree(client, foundations, trainee_token):
    headers = {"Authorization": f"Bearer {trainee_token}", "Accept-Language": "ja"}
    response = client.get(f"/api/v1/courses/{foundations.id}/lessons", headers=headers)
    assert response.status_code == 200
    tree = response.json()
    assert [item["id"] for item in tree] == [f"F{i}" for i in range(1, 11)]
    assert sum(len(item["children"]) for item in tree) == 37
    assert tree[0]["children"][0]["title"] == "F1.1 iCAD SX とは？"
