from datetime import datetime, timedelta

from backend.models import AccessPlan, AuditEvent, Course, Lesson, PlanEntitlement, Quiz, UserPlanAssignment
from backend.services.access_control_service import sync_legacy_user_access
from backend.services.access_plan_service import seed_access_plans


def _grant_course(db, user, course_type="3D_Modeling", *, starts=None, ends=None):
    seed_access_plans(db)
    plan = db.query(AccessPlan).filter(AccessPlan.code == "icad-foundations").one()
    db.add(PlanEntitlement(plan_id=plan.id, resource_type="course", resource_id=course_type, permission_code="view"))
    db.add(UserPlanAssignment(user_id=user.id, plan_id=plan.id, starts_at=starts or datetime.utcnow() - timedelta(minutes=1), ends_at=ends, status="active", reason="test"))
    db.commit()
    return plan


def _curriculum(db):
    allowed = Course(title="3D", course_type="3D_Modeling", order=1)
    denied = Course(title="2D", course_type="2D_Drawing", order=2)
    db.add_all([allowed, denied]); db.flush()
    lesson = Lesson(course_id=allowed.id, title="Interface", slug="interface", order=1, is_published=True)
    quiz = Quiz(slug="interface", title="Interface Quiz", course_type="3D_Modeling")
    db.add_all([lesson, quiz]); db.commit()
    return allowed, denied, lesson, quiz


def test_learner_catalog_is_filtered_and_direct_bypass_is_denied(client, db, trainee_user, trainee_token):
    allowed, denied, _, _ = _curriculum(db)
    _grant_course(db, trainee_user)
    headers = {"Authorization": f"Bearer {trainee_token}"}
    catalog = client.get("/api/v1/courses/", headers=headers)
    assert catalog.status_code == 200
    assert [course["course_type"] for course in catalog.json()["courses"]] == ["3D_Modeling"]
    assert client.get(f"/api/v1/courses/{allowed.id}/lessons", headers=headers).status_code == 200
    denied_response = client.get(f"/api/v1/courses/{denied.id}/lessons", headers=headers)
    assert denied_response.status_code == 403


def test_lesson_and_quiz_require_authentication_and_entitlement(client, db, trainee_token):
    _curriculum(db)
    assert client.get("/api/v1/courses/lesson/interface/content").status_code in (401, 403)
    headers = {"Authorization": f"Bearer {trainee_token}"}
    assert client.get("/api/v1/courses/lesson/interface/content", headers=headers).status_code == 403
    assert client.get("/api/v1/quizzes/interface", headers=headers).status_code == 403


def test_expired_or_future_plan_is_not_effective(client, db, trainee_user, trainee_token):
    _curriculum(db)
    _grant_course(db, trainee_user, starts=datetime.utcnow() - timedelta(days=2), ends=datetime.utcnow() - timedelta(days=1))
    headers = {"Authorization": f"Bearer {trainee_token}"}
    assert client.get("/api/v1/courses/", headers=headers).json()["courses"] == []
    summary = client.get("/api/v1/auth/me/entitlements", headers=headers)
    assert summary.status_code == 200
    assert summary.json()["plan"] is None


def test_admin_assignment_closes_previous_plan_and_preserves_history(client, db, admin_user, admin_token, trainee_user):
    sync_legacy_user_access(db, admin_user); seed_access_plans(db); db.commit()
    old_plan = db.query(AccessPlan).filter(AccessPlan.code == "icad-foundations").one()
    new_plan = db.query(AccessPlan).filter(AccessPlan.code == "icad-professional").one()
    old = UserPlanAssignment(user_id=trainee_user.id, plan_id=old_plan.id, starts_at=datetime.utcnow() - timedelta(days=2), status="active", reason="initial")
    db.add(old); db.commit()
    starts = datetime.utcnow() - timedelta(minutes=1)
    response = client.post(
        f"/api/v1/admin/users/{trainee_user.id}/plan-assignments",
        json={"plan_id": new_plan.id, "starts_at": starts.isoformat(), "reason": "upgrade"},
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == 201
    db.refresh(old)
    assert old.status == "expired" and old.ends_at is not None
    history = client.get(f"/api/v1/admin/users/{trainee_user.id}/plan-history", headers={"Authorization": f"Bearer {admin_token}"})
    assert history.status_code == 200 and len(history.json()) == 2
    assert db.query(AuditEvent).filter(AuditEvent.action == "plan.assigned").count() == 1


def test_instructor_retains_curriculum_access_without_learner_plan(client, db, employee_token):
    allowed, _, _, _ = _curriculum(db)
    headers = {"Authorization": f"Bearer {employee_token}"}
    assert client.get(f"/api/v1/courses/{allowed.id}/lessons", headers=headers).status_code == 200
