from datetime import datetime, timedelta

from backend.models import AccessPlan, AssessmentTask, AuditEvent, Course, Lesson, PlanEntitlement, Quiz, UserPlanAssignment
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


def test_future_upgrade_keeps_current_plan_active_until_start(client, db, admin_user, admin_token, trainee_user):
    sync_legacy_user_access(db, admin_user); seed_access_plans(db); db.commit()
    old_plan = db.query(AccessPlan).filter(AccessPlan.code == "icad-foundations").one()
    new_plan = db.query(AccessPlan).filter(AccessPlan.code == "icad-professional").one()
    old = UserPlanAssignment(user_id=trainee_user.id, plan_id=old_plan.id, starts_at=datetime.utcnow() - timedelta(days=2), status="active", reason="initial")
    db.add(old); db.commit()
    future = datetime.utcnow() + timedelta(days=5)
    response = client.post(
        f"/api/v1/admin/users/{trainee_user.id}/plan-assignments",
        json={"plan_id": new_plan.id, "starts_at": future.isoformat(), "reason": "scheduled upgrade"},
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == 201 and response.json()["status"] == "scheduled"
    db.refresh(old)
    assert old.status == "active"
    assert old.ends_at is not None and abs((old.ends_at - future).total_seconds()) < 1


def test_plan_cannot_be_assigned_to_instructor(client, db, admin_user, admin_token, employee_user):
    sync_legacy_user_access(db, admin_user); seed_access_plans(db); db.commit()
    plan = db.query(AccessPlan).filter(AccessPlan.code == "icad-foundations").one()
    response = client.post(
        f"/api/v1/admin/users/{employee_user.id}/plan-assignments",
        json={"plan_id": plan.id, "starts_at": (datetime.utcnow() - timedelta(minutes=1)).isoformat(), "reason": "invalid"},
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == 422


def test_instructor_retains_curriculum_access_without_learner_plan(client, db, employee_token):
    allowed, _, _, _ = _curriculum(db)
    headers = {"Authorization": f"Bearer {employee_token}"}
    assert client.get(f"/api/v1/courses/{allowed.id}/lessons", headers=headers).status_code == 200


def _practical_tasks(db):
    first = AssessmentTask(set_number=1, task_code="P1", title="Foundation Part", assessment_type="3D", order=1)
    second = AssessmentTask(set_number=2, task_code="P1", title="Advanced Part", assessment_type="3D", order=1)
    drawing = AssessmentTask(set_number=1, task_code="P1", title="Foundation Drawing", assessment_type="2D", order=1)
    db.add_all([first, second, drawing]); db.commit()
    return first, second, drawing


def _grant_practical_set(db, user, resource_id="3D:1"):
    seed_access_plans(db)
    plan = db.query(AccessPlan).filter(AccessPlan.code == "icad-foundations").one()
    db.add(PlanEntitlement(plan_id=plan.id, resource_type="practical_set", resource_id=resource_id, permission_code="view"))
    db.add(UserPlanAssignment(user_id=user.id, plan_id=plan.id, starts_at=datetime.utcnow() - timedelta(minutes=1), status="active", reason="test"))
    db.commit()


def test_practical_task_list_is_filtered_by_type_and_set(client, db, trainee_user, trainee_token):
    first, second, drawing = _practical_tasks(db)
    _grant_practical_set(db, trainee_user, "3D:1")
    response = client.get("/api/v1/assessments/tasks", headers={"Authorization": f"Bearer {trainee_token}"})
    assert response.status_code == 200
    assert [item["id"] for item in response.json()] == [first.id]
    assert second.id not in [item["id"] for item in response.json()]
    assert drawing.id not in [item["id"] for item in response.json()]


def test_practical_download_and_submission_bypass_are_denied_before_file_access(client, db, trainee_token):
    first, _, _ = _practical_tasks(db)
    first.master_file_path = "missing/master.dwg"; db.commit()
    headers = {"Authorization": f"Bearer {trainee_token}"}
    assert client.get(f"/api/v1/assessments/tasks/{first.id}/download", headers=headers).status_code == 403
    response = client.post(
        f"/api/v1/assessments/submit/{first.id}", headers=headers,
        files={"file": ("attempt.dwg", b"cad")}, data={"assessment_type": "3D", "time_spent_seconds": "10"},
    )
    assert response.status_code == 403


def test_instructor_can_view_practical_tasks_but_cannot_submit_as_learner(client, db, employee_token):
    first, _, _ = _practical_tasks(db)
    headers = {"Authorization": f"Bearer {employee_token}"}
    assert client.get("/api/v1/assessments/tasks", headers=headers).status_code == 200
    response = client.post(f"/api/v1/assessments/submit/{first.id}", headers=headers, files={"file": ("attempt.dwg", b"cad")})
    assert response.status_code == 403


def test_admin_can_list_practical_resources(client, db, admin_user, admin_token):
    sync_legacy_user_access(db, admin_user); _practical_tasks(db); db.commit()
    response = client.get("/api/v1/admin/access-plan-resources/practical-sets", headers={"Authorization": f"Bearer {admin_token}"})
    assert response.status_code == 200
    assert {item["resource_id"] for item in response.json()} == {"3D:1", "3D:2", "2D:1"}
