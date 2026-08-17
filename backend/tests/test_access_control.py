"""Tests for the compatibility-safe LMS access foundation."""

from backend.models import AdminAreaGrant, Permission, Role, UserPermissionGrant, UserRole
from backend.services.access_control_service import (
    ADMIN_AREAS,
    get_active_admin_areas,
    get_active_role_codes,
    get_effective_permissions,
    seed_access_foundation,
    sync_legacy_user_access,
    user_has_admin_area,
    user_has_permission,
)


def test_seed_creates_exactly_three_roles_and_is_idempotent(db):
    seed_access_foundation(db)
    seed_access_foundation(db)
    db.flush()

    assert {role.code for role in db.query(Role).all()} == {"learner", "instructor", "admin"}
    assert db.query(Role).count() == 3
    assert db.query(Permission).count() > 0


def test_legacy_trainee_maps_to_learner(db, trainee_user):
    sync_legacy_user_access(db, trainee_user)
    db.flush()

    assert get_active_role_codes(db, trainee_user) == {"learner"}
    assert user_has_permission(db, trainee_user, "course.view_entitled")
    assert not get_active_admin_areas(db, trainee_user)


def test_legacy_employee_maps_to_instructor(db, employee_user):
    sync_legacy_user_access(db, employee_user)
    db.flush()

    assert get_active_role_codes(db, employee_user) == {"instructor"}
    assert user_has_permission(db, employee_user, "submission.review_assigned")
    assert not user_has_admin_area(db, employee_user, "organization")


def test_legacy_admin_receives_organization_but_never_platform(db, admin_user):
    sync_legacy_user_access(db, admin_user)
    db.flush()

    assert get_active_role_codes(db, admin_user) == {"admin"}
    assert get_active_admin_areas(db, admin_user) == {"organization"}
    assert user_has_permission(db, admin_user, "registration.approve")
    assert not user_has_permission(db, admin_user, "platform.configure")
    assert not user_has_permission(db, admin_user, "admin.area.platform.assign")


def test_admin_areas_are_independently_granted(db, admin_user):
    sync_legacy_user_access(db, admin_user)
    db.add(AdminAreaGrant(user_id=admin_user.id, area_code="content", reason="Content owner"))
    db.flush()

    assert get_active_admin_areas(db, admin_user) == {"content", "organization"}
    assert user_has_permission(db, admin_user, "content.edit")
    assert not user_has_permission(db, admin_user, "platform.configure")


def test_permission_deny_override_wins(db, admin_user):
    sync_legacy_user_access(db, admin_user)
    permission = db.query(Permission).filter(Permission.code == "user.manage").one()
    db.add(UserPermissionGrant(
        user_id=admin_user.id,
        permission_id=permission.id,
        effect="deny",
        reason="Read-only organization administrator",
    ))
    db.flush()

    assert "user.read" in get_effective_permissions(db, admin_user)
    assert "user.manage" not in get_effective_permissions(db, admin_user)


def test_sync_is_idempotent(db, admin_user):
    sync_legacy_user_access(db, admin_user)
    sync_legacy_user_access(db, admin_user)
    db.flush()

    assert db.query(UserRole).filter(UserRole.user_id == admin_user.id).count() == 1
    assert db.query(AdminAreaGrant).filter(AdminAreaGrant.user_id == admin_user.id).count() == 1


def test_pending_account_cannot_authenticate(client, db, trainee_user):
    trainee_user.account_status = "pending_approval"
    db.commit()

    response = client.post("/api/v1/auth/login", json={
        "username": trainee_user.username,
        "password": "Trainee@12345",
    })

    assert response.status_code == 400
    assert "inactive" in response.json()["detail"].lower()


def test_access_endpoint_returns_legacy_admin_organization_only(client, admin_token):
    response = client.get(
        "/api/v1/auth/me/access",
        headers={"Authorization": f"Bearer {admin_token}"},
    )

    assert response.status_code == 200
    assert response.json()["roles"] == ["admin"]
    assert response.json()["admin_areas"] == ["organization"]
    assert "user.manage" in response.json()["permissions"]
    assert "platform.configure" not in response.json()["permissions"]


def test_access_endpoint_returns_no_admin_area_for_learner(client, trainee_token):
    response = client.get(
        "/api/v1/auth/me/access",
        headers={"Authorization": f"Bearer {trainee_token}"},
    )

    assert response.status_code == 200
    assert response.json()["roles"] == ["learner"]
    assert response.json()["admin_areas"] == []
    assert "course.view_entitled" in response.json()["permissions"]


def test_content_admin_api_rejects_organization_only_admin(client, admin_token):
    response = client.get(
        "/api/v1/admin/kb/files",
        headers={"Authorization": f"Bearer {admin_token}"},
    )

    assert response.status_code == 403


def test_content_admin_api_accepts_explicit_content_grant(client, db, admin_user, admin_token):
    sync_legacy_user_access(db, admin_user)
    db.add(AdminAreaGrant(user_id=admin_user.id, area_code="content", reason="Content editor"))
    db.commit()

    response = client.get(
        "/api/v1/admin/kb/files",
        headers={"Authorization": f"Bearer {admin_token}"},
    )

    assert response.status_code == 200


def test_platform_admin_api_rejects_organization_only_admin(client, admin_token):
    response = client.get(
        "/api/v1/admin/stats",
        headers={"Authorization": f"Bearer {admin_token}"},
    )

    assert response.status_code == 403


def test_platform_admin_api_accepts_explicit_platform_grant(client, db, admin_user, admin_token):
    sync_legacy_user_access(db, admin_user)
    db.add(AdminAreaGrant(user_id=admin_user.id, area_code="platform", reason="Platform operator"))
    db.commit()

    response = client.get(
        "/api/v1/admin/stats",
        headers={"Authorization": f"Bearer {admin_token}"},
    )

    assert response.status_code == 200
