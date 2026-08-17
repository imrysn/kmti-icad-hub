from backend.models import AuditEvent, RegistrationApplication, User, UserPlanAssignment
from backend.services.access_control_service import sync_legacy_user_access
from backend.services.access_plan_service import seed_access_plans


def _payload(plan_id: int, suffix: str = "one") -> dict:
    return {
        "username": f"applicant_{suffix}",
        "email": f"applicant_{suffix}@example.com",
        "password": "Applicant@123",
        "full_name": "Public Applicant",
        "requested_plan_id": plan_id,
        "company_name": "Example Company",
        "department": "Engineering",
        "job_title": "Designer",
        "country_code": "PH",
        "reason_for_access": "Professional development",
        "preferred_language": "en",
        "timezone": "Asia/Manila",
        "privacy_policy_version": "2026-08",
        "terms_version": "2026-08",
        "privacy_accepted": True,
        "terms_accepted": True,
    }


def _submit_and_verify(client, db, suffix="one"):
    seed_access_plans(db); db.commit()
    from backend.models import AccessPlan
    plan = db.query(AccessPlan).filter(AccessPlan.code == "icad-foundations").one()
    submitted = client.post("/api/v1/registrations", json=_payload(plan.id, suffix))
    assert submitted.status_code == 202
    token = submitted.json()["verification_token"]
    verified = client.post("/api/v1/registrations/verify-email", json={"token": token})
    assert verified.status_code == 200
    application = db.query(RegistrationApplication).filter(RegistrationApplication.id == submitted.json()["application_id"]).one()
    return application, plan


def test_registration_requires_policy_consent(client, db):
    seed_access_plans(db); db.commit()
    from backend.models import AccessPlan
    plan = db.query(AccessPlan).first()
    payload = _payload(plan.id)
    payload["terms_accepted"] = False
    response = client.post("/api/v1/registrations", json=payload)
    assert response.status_code == 422
    assert db.query(RegistrationApplication).count() == 0


def test_public_registration_verifies_then_waits_for_approval(client, db):
    application, _ = _submit_and_verify(client, db)
    user = db.query(User).filter(User.id == application.user_id).one()
    assert application.status == "pending_approval"
    assert user.account_status == "pending_approval"
    assert user.is_active is False
    login = client.post("/api/v1/auth/login", json={"username": user.username, "password": "Applicant@123"})
    assert login.status_code == 400
    assert db.query(AuditEvent).filter(AuditEvent.action == "registration.email_verified").count() == 1


def test_duplicate_submission_has_generic_response(client, db):
    application, plan = _submit_and_verify(client, db)
    duplicate = client.post("/api/v1/registrations", json=_payload(plan.id))
    assert duplicate.status_code == 202
    assert duplicate.json()["application_id"] is None
    assert db.query(RegistrationApplication).count() == 1


def test_organization_admin_approves_application_and_assigns_plan(client, db, admin_user, admin_token):
    application, plan = _submit_and_verify(client, db, "approve")
    sync_legacy_user_access(db, admin_user); db.commit()
    listed = client.get("/api/v1/admin/registration-applications?status=pending_approval", headers={"Authorization": f"Bearer {admin_token}"})
    assert listed.status_code == 200
    assert [item["id"] for item in listed.json()] == [application.id]
    approved = client.post(
        f"/api/v1/admin/registration-applications/{application.id}/approve",
        json={"version": application.version, "assigned_plan_id": plan.id, "internal_reason": "Approved for pilot"},
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert approved.status_code == 200
    assert approved.json()["status"] == "approved"
    user = db.query(User).filter(User.id == application.user_id).one()
    assert user.is_active is True and user.account_status == "active"
    assert db.query(UserPlanAssignment).filter(UserPlanAssignment.user_id == user.id, UserPlanAssignment.plan_id == plan.id).count() == 1
    login = client.post("/api/v1/auth/login", json={"username": user.username, "password": "Applicant@123"})
    assert login.status_code == 200


def test_stale_or_repeated_admin_decision_is_rejected(client, db, admin_user, admin_token):
    application, plan = _submit_and_verify(client, db, "stale")
    sync_legacy_user_access(db, admin_user); db.commit()
    payload = {"version": application.version, "assigned_plan_id": plan.id}
    first = client.post(f"/api/v1/admin/registration-applications/{application.id}/approve", json=payload, headers={"Authorization": f"Bearer {admin_token}"})
    second = client.post(f"/api/v1/admin/registration-applications/{application.id}/approve", json=payload, headers={"Authorization": f"Bearer {admin_token}"})
    assert first.status_code == 200
    assert second.status_code == 409
