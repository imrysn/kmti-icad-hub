from backend.models import AccessPlan, Course, PlanEntitlement, QuizScore, UserPlanAssignment


def test_progress_accepts_stable_code_and_reads_legacy_numeric_records(client, db, trainee_user, trainee_token):
    course = Course(title="3D Modeling", course_type="3D_Modeling", lifecycle_status="published")
    plan = AccessPlan(code="progress-plan", name="Progress Plan")
    db.add_all([course, plan]); db.flush()
    db.add(PlanEntitlement(plan_id=plan.id, resource_type="course", resource_id="3D_Modeling", permission_code="view"))
    db.add(UserPlanAssignment(user_id=trainee_user.id, plan_id=plan.id, status="active"))
    db.add(QuizScore(user_id=trainee_user.id, course_id=str(course.id), lesson_id="intro", score=90))
    db.commit()
    response = client.get("/api/v1/auth/progress/3D_Modeling", headers={"Authorization": f"Bearer {trainee_token}"})
    assert response.status_code == 200
    assert response.json()[0]["lesson_id"] == "intro"


def test_builtin_course_progress_works_before_course_rows_are_migrated(client, db, employee_user, employee_token):
    db.add(QuizScore(user_id=employee_user.id, course_id="1", lesson_id="legacy-intro", score=85)); db.commit()
    response = client.get("/api/v1/auth/progress/3D_Modeling", headers={"Authorization": f"Bearer {employee_token}"})
    assert response.status_code == 200
    assert response.json()[0]["lesson_id"] == "legacy-intro"
