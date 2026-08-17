from backend.models import AdminAreaGrant, AuditEvent, MfaRecoveryCode
from backend.services.access_control_service import sync_legacy_user_access
from backend.services.mfa_service import totp_code


def _platform_admin(db, admin_user):
    sync_legacy_user_access(db, admin_user)
    db.add(AdminAreaGrant(user_id=admin_user.id, area_code="platform", reason="MFA test"))
    db.commit()


def _enroll(client, db, admin_user):
    _platform_admin(db, admin_user)
    login = client.post("/api/v1/auth/login", json={"username": admin_user.username, "password": "Admin@12345"})
    assert login.status_code == 403
    token = login.json()["detail"]["enrollment_token"]
    enrollment = client.post("/api/v1/auth/mfa/enroll", json={"enrollment_token": token})
    assert enrollment.status_code == 200
    confirmation = client.post("/api/v1/auth/mfa/confirm", json={"enrollment_token": token, "code": totp_code(enrollment.json()["secret"])})
    assert confirmation.status_code == 200
    return confirmation.json()["recovery_codes"]


def test_platform_admin_must_enroll_and_use_totp(client, db, admin_user):
    _platform_admin(db, admin_user)
    first = client.post("/api/v1/auth/login", json={"username": admin_user.username, "password": "Admin@12345"})
    token = first.json()["detail"]["enrollment_token"]
    enrollment = client.post("/api/v1/auth/mfa/enroll", json={"enrollment_token": token}).json()
    confirmed = client.post("/api/v1/auth/mfa/confirm", json={"enrollment_token": token, "code": totp_code(enrollment["secret"])})
    assert confirmed.status_code == 200 and len(confirmed.json()["recovery_codes"]) == 8
    missing = client.post("/api/v1/auth/login", json={"username": admin_user.username, "password": "Admin@12345"})
    assert missing.status_code == 403 and missing.json()["detail"]["code"] == "mfa_required"
    success = client.post("/api/v1/auth/login", json={"username": admin_user.username, "password": "Admin@12345", "mfa_code": totp_code(enrollment["secret"])})
    assert success.status_code == 200 and success.json()["access_token"]


def test_recovery_code_is_single_use(client, db, admin_user):
    codes = _enroll(client, db, admin_user)
    first = client.post("/api/v1/auth/login", json={"username": admin_user.username, "password": "Admin@12345", "mfa_code": codes[0]})
    assert first.status_code == 200
    reused = client.post("/api/v1/auth/login", json={"username": admin_user.username, "password": "Admin@12345", "mfa_code": codes[0]})
    assert reused.status_code == 401
    assert db.query(MfaRecoveryCode).filter(MfaRecoveryCode.user_id == admin_user.id, MfaRecoveryCode.used_at.isnot(None)).count() == 1
    assert db.query(AuditEvent).filter(AuditEvent.action == "mfa.login_failed").count() == 1
