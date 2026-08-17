from backend.models import AdminAreaGrant, AuditEvent, Permission, UserPermissionGrant
from backend.services.access_control_service import get_active_admin_areas, get_active_role_codes, seed_access_foundation, sync_legacy_user_access


def _headers(token):
    return {"Authorization": f"Bearer {token}"}


def _seed_admin(db, admin_user):
    sync_legacy_user_access(db, admin_user); db.commit()


def test_organization_admin_can_change_learner_to_instructor_with_audit(client, db, admin_user, admin_token, trainee_user):
    _seed_admin(db, admin_user)
    response = client.put(
        f"/api/v1/admin/users/{trainee_user.id}/access",
        json={"role_code": "instructor", "admin_areas": [], "account_status": "active", "reason": "Promoted to instructor"},
        headers=_headers(admin_token),
    )
    assert response.status_code == 200
    assert response.json()["role_code"] == "instructor"
    db.refresh(trainee_user)
    assert trainee_user.role == "employee" and get_active_role_codes(db, trainee_user) == {"instructor"}
    assert db.query(AuditEvent).filter(AuditEvent.action == "user.access_updated", AuditEvent.target_id == str(trainee_user.id)).count() == 1


def test_suspension_blocks_authentication_without_deleting_access_history(client, db, admin_user, admin_token, trainee_user, trainee_token):
    _seed_admin(db, admin_user); sync_legacy_user_access(db, trainee_user); db.commit()
    response = client.put(
        f"/api/v1/admin/users/{trainee_user.id}/access",
        json={"role_code": "learner", "admin_areas": [], "account_status": "suspended", "reason": "Temporary policy review"},
        headers=_headers(admin_token),
    )
    assert response.status_code == 200
    db.refresh(trainee_user)
    assert trainee_user.account_status == "suspended" and trainee_user.is_active is False
    assert get_active_role_codes(db, trainee_user) == {"learner"}
    assert client.get("/api/v1/auth/me", headers=_headers(trainee_token)).status_code == 400


def test_admin_cannot_change_own_access(client, db, admin_user, admin_token):
    _seed_admin(db, admin_user)
    response = client.put(
        f"/api/v1/admin/users/{admin_user.id}/access",
        json={"role_code": "learner", "admin_areas": [], "account_status": "active", "reason": "Unsafe self change"},
        headers=_headers(admin_token),
    )
    assert response.status_code == 400


def test_organization_admin_cannot_grant_platform_area(client, db, admin_user, admin_token, trainee_user):
    _seed_admin(db, admin_user)
    response = client.put(
        f"/api/v1/admin/users/{trainee_user.id}/access",
        json={"role_code": "admin", "admin_areas": ["content", "platform"], "account_status": "active", "reason": "Unauthorized platform grant"},
        headers=_headers(admin_token),
    )
    assert response.status_code == 403


def test_authorized_platform_admin_can_grant_platform_area(client, db, admin_user, admin_token, trainee_user):
    _seed_admin(db, admin_user); seed_access_foundation(db)
    permission = db.query(Permission).filter(Permission.code == "admin.area.platform.assign").one()
    db.add(UserPermissionGrant(user_id=admin_user.id, permission_id=permission.id, effect="allow", reason="Bootstrap platform owner")); db.commit()
    response = client.put(
        f"/api/v1/admin/users/{trainee_user.id}/access",
        json={"role_code": "admin", "admin_areas": ["platform"], "account_status": "active", "reason": "Platform operations assignment"},
        headers=_headers(admin_token),
    )
    assert response.status_code == 200
    assert response.json()["admin_areas"] == ["platform"]
    assert get_active_admin_areas(db, trainee_user) == {"platform"}


def test_last_platform_admin_cannot_be_removed(client, db, admin_user, admin_token, trainee_user):
    _seed_admin(db, admin_user); seed_access_foundation(db); sync_legacy_user_access(db, trainee_user)
    permission = db.query(Permission).filter(Permission.code == "admin.area.platform.assign").one()
    db.add(UserPermissionGrant(user_id=admin_user.id, permission_id=permission.id, effect="allow", reason="Bootstrap platform owner"))
    db.add(AdminAreaGrant(user_id=trainee_user.id, area_code="platform", granted_by_user_id=admin_user.id, reason="Only platform admin"));
    trainee_user.role = "admin"; db.commit()
    response = client.put(
        f"/api/v1/admin/users/{trainee_user.id}/access",
        json={"role_code": "admin", "admin_areas": ["content"], "account_status": "active", "reason": "Would remove final platform admin"},
        headers=_headers(admin_token),
    )
    assert response.status_code == 409
