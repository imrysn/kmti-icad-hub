from backend.models import AccountInvitation, AdminAreaGrant, EmailOutbox, Permission, User, UserPermissionGrant, UserPlanAssignment
from backend.services.access_control_service import seed_access_foundation, sync_legacy_user_access
from backend.services.access_plan_service import seed_access_plans


def _setup(db, admin_user):
    seed_access_foundation(db); seed_access_plans(db); sync_legacy_user_access(db, admin_user); db.commit()


def test_admin_invites_learner_with_plan_and_recipient_accepts(client, db, admin_user, admin_token):
    _setup(db, admin_user)
    from backend.models import AccessPlan
    plan = db.query(AccessPlan).filter(AccessPlan.code == "icad-professional").one()
    created = client.post("/api/v1/admin/invitations", json={"email":"invited@example.com","full_name":"Invited Learner","role_code":"learner","plan_id":plan.id,"preferred_language":"en","admin_areas":[],"expires_in_days":7}, headers={"Authorization":f"Bearer {admin_token}"})
    assert created.status_code == 201
    token = created.json()["acceptance_token"]
    assert token and db.query(EmailOutbox).filter(EmailOutbox.message_type == "invitation.created").count() == 1
    validated = client.get("/api/v1/invitations/validate", params={"token":token})
    assert validated.status_code == 200 and validated.json()["plan_name"] == plan.name
    accepted = client.post("/api/v1/invitations/accept", json={"token":token,"username":"invited_learner","password":"Invited@123","privacy_policy_version":"2026-08","terms_version":"2026-08","privacy_accepted":True,"terms_accepted":True})
    assert accepted.status_code == 200
    user = db.query(User).filter(User.email == "invited@example.com").one()
    assert user.account_status == "active" and user.role == "trainee"
    assert db.query(UserPlanAssignment).filter(UserPlanAssignment.user_id == user.id, UserPlanAssignment.plan_id == plan.id).count() == 1
    assert client.post("/api/v1/invitations/accept", json={"token":token,"username":"again","password":"Invited@123","privacy_policy_version":"2026-08","terms_version":"2026-08","privacy_accepted":True,"terms_accepted":True}).status_code == 400


def test_organization_admin_cannot_invite_first_platform_admin(client, db, admin_user, admin_token):
    _setup(db, admin_user)
    response = client.post("/api/v1/admin/invitations", json={"email":"platform@example.com","full_name":"Platform Admin","role_code":"admin","preferred_language":"en","admin_areas":["platform"],"expires_in_days":7}, headers={"Authorization":f"Bearer {admin_token}"})
    assert response.status_code == 403


def test_explicit_platform_grant_permission_allows_platform_admin_invitation(client, db, admin_user, admin_token):
    _setup(db, admin_user)
    permission = db.query(Permission).filter(Permission.code == "admin.area.platform.assign").one()
    db.add(UserPermissionGrant(user_id=admin_user.id, permission_id=permission.id, effect="allow", reason="Platform owner bootstrap"))
    db.commit()
    response = client.post("/api/v1/admin/invitations", json={"email":"platform@example.com","full_name":"Platform Admin","role_code":"admin","preferred_language":"en","admin_areas":["platform"],"expires_in_days":7}, headers={"Authorization":f"Bearer {admin_token}"})
    assert response.status_code == 201


def test_content_admin_invitation_grants_only_predetermined_area(client, db, admin_user, admin_token):
    _setup(db, admin_user)
    created = client.post("/api/v1/admin/invitations", json={"email":"editor@example.com","full_name":"Content Editor","role_code":"admin","preferred_language":"en","admin_areas":["content"],"expires_in_days":7}, headers={"Authorization":f"Bearer {admin_token}"})
    assert created.status_code == 201
    accepted = client.post("/api/v1/invitations/accept", json={"token":created.json()["acceptance_token"],"username":"content_editor","password":"Editor@123","privacy_policy_version":"2026-08","terms_version":"2026-08","privacy_accepted":True,"terms_accepted":True})
    assert accepted.status_code == 200
    user = db.query(User).filter(User.email == "editor@example.com").one()
    assert [row.area_code for row in db.query(AdminAreaGrant).filter(AdminAreaGrant.user_id == user.id).all()] == ["content"]


def test_resend_invalidates_old_token_and_cancel_blocks_acceptance(client, db, admin_user, admin_token):
    _setup(db, admin_user)
    created = client.post("/api/v1/admin/invitations", json={"email":"instructor@example.com","full_name":"Instructor","role_code":"instructor","preferred_language":"en","admin_areas":[],"expires_in_days":7}, headers={"Authorization":f"Bearer {admin_token}"})
    old = created.json()["acceptance_token"]
    resent = client.post(f"/api/v1/admin/invitations/{created.json()['id']}/resend", headers={"Authorization":f"Bearer {admin_token}"})
    assert resent.status_code == 200 and resent.json()["acceptance_token"] != old
    assert client.get("/api/v1/invitations/validate", params={"token":old}).status_code == 400
    cancelled = client.post(f"/api/v1/admin/invitations/{created.json()['id']}/cancel", headers={"Authorization":f"Bearer {admin_token}"})
    assert cancelled.status_code == 200 and cancelled.json()["status"] == "cancelled"
    assert client.get("/api/v1/invitations/validate", params={"token":resent.json()["acceptance_token"]}).status_code == 400


def test_duplicate_pending_invitation_is_rejected(client, db, admin_user, admin_token):
    _setup(db, admin_user)
    payload={"email":"duplicate@example.com","full_name":"Duplicate","role_code":"instructor","preferred_language":"en","admin_areas":[],"expires_in_days":7}
    assert client.post("/api/v1/admin/invitations", json=payload, headers={"Authorization":f"Bearer {admin_token}"}).status_code == 201
    assert client.post("/api/v1/admin/invitations", json=payload, headers={"Authorization":f"Bearer {admin_token}"}).status_code == 409
    assert db.query(AccountInvitation).filter(AccountInvitation.email_normalized == "duplicate@example.com").count() == 1
