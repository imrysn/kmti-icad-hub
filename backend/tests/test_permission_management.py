from backend.models import AdminAreaGrant, AuditEvent, UserPermissionGrant
from backend.services.access_control_service import get_effective_permissions, seed_access_foundation, sync_legacy_user_access


def _headers(token):
    return {"Authorization": f"Bearer {token}"}


def _organization_target(db, admin_user, trainee_user):
    sync_legacy_user_access(db, admin_user)
    trainee_user.role = "admin"
    db.add(AdminAreaGrant(user_id=trainee_user.id, area_code="organization", reason="Permission test"))
    db.commit()


def test_permission_catalog_and_password_confirmed_deny(client, db, admin_user, admin_token, trainee_user):
    _organization_target(db, admin_user, trainee_user)
    listed = client.get(f"/api/v1/admin/users/{trainee_user.id}/permissions", headers=_headers(admin_token))
    assert listed.status_code == 200
    enabled = [item["code"] for item in listed.json()["permissions"] if item["enabled"]]
    assert "invitation.manage" in enabled and all(item["area"] == "organization" for item in listed.json()["permissions"])
    enabled.remove("invitation.manage")
    updated = client.put(f"/api/v1/admin/users/{trainee_user.id}/permissions", headers=_headers(admin_token), json={"enabled_codes": enabled, "reason": "Remove invitation authority", "reauth_password": "Admin@12345"})
    assert updated.status_code == 200
    assert "invitation.manage" not in get_effective_permissions(db, trainee_user)
    assert db.query(UserPermissionGrant).filter(UserPermissionGrant.user_id == trainee_user.id, UserPermissionGrant.effect == "deny", UserPermissionGrant.revoked_at.is_(None)).count() == 1
    assert db.query(AuditEvent).filter(AuditEvent.action == "user.permissions_updated").count() == 1


def test_reenabling_base_permission_revokes_deny_override(client, db, admin_user, admin_token, trainee_user):
    _organization_target(db, admin_user, trainee_user)
    permission = client.get(f"/api/v1/admin/users/{trainee_user.id}/permissions", headers=_headers(admin_token)).json()["permissions"]
    enabled = [item["code"] for item in permission if item["enabled"] and item["code"] != "user.manage"]
    client.put(f"/api/v1/admin/users/{trainee_user.id}/permissions", headers=_headers(admin_token), json={"enabled_codes": enabled, "reason": "Temporarily restrict user changes", "reauth_password": "Admin@12345"})
    enabled.append("user.manage")
    response = client.put(f"/api/v1/admin/users/{trainee_user.id}/permissions", headers=_headers(admin_token), json={"enabled_codes": enabled, "reason": "Restore user management", "reauth_password": "Admin@12345"})
    assert response.status_code == 200 and "user.manage" in get_effective_permissions(db, trainee_user)


def test_admin_cannot_change_own_permissions(client, db, admin_user, admin_token):
    sync_legacy_user_access(db, admin_user); db.commit()
    response = client.put(f"/api/v1/admin/users/{admin_user.id}/permissions", headers=_headers(admin_token), json={"enabled_codes": [], "reason": "Unsafe self change", "reauth_password": "Admin@12345"})
    assert response.status_code == 400


def test_organization_admin_cannot_change_platform_permissions(client, db, admin_user, admin_token, trainee_user):
    _organization_target(db, admin_user, trainee_user)
    db.add(AdminAreaGrant(user_id=trainee_user.id, area_code="platform", reason="Platform target")); db.commit()
    items = client.get(f"/api/v1/admin/users/{trainee_user.id}/permissions", headers=_headers(admin_token)).json()["permissions"]
    enabled = [item["code"] for item in items if item["enabled"] and item["code"] != "platform.configure"]
    response = client.put(f"/api/v1/admin/users/{trainee_user.id}/permissions", headers=_headers(admin_token), json={"enabled_codes": enabled, "reason": "Unauthorized Platform change", "reauth_password": "Admin@12345"})
    assert response.status_code == 403


def test_permission_change_rejects_wrong_password(client, db, admin_user, admin_token, trainee_user):
    _organization_target(db, admin_user, trainee_user)
    response = client.put(f"/api/v1/admin/users/{trainee_user.id}/permissions", headers=_headers(admin_token), json={"enabled_codes": [], "reason": "Wrong password attempt", "reauth_password": "WrongPassword"})
    assert response.status_code == 403
    assert db.query(AuditEvent).filter(AuditEvent.action == "user.permission_reauthentication_failed").count() == 1
