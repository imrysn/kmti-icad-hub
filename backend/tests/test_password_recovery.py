from datetime import datetime, timedelta

from backend.auth.security import verify_password
from backend.models import AuditEvent, EmailOutbox, PasswordResetToken


def test_forgot_password_queues_hashed_single_use_token(client, db, trainee_user):
    response = client.post("/api/v1/auth/forgot-password", json={"username_or_email": trainee_user.email})
    assert response.status_code == 200
    raw = response.json()["reset_token"]
    token = db.query(PasswordResetToken).filter(PasswordResetToken.user_id == trainee_user.id).one()
    assert raw not in token.token_hash
    assert db.query(EmailOutbox).filter(EmailOutbox.message_type == "account.password_reset").count() == 1


def test_forgot_password_response_does_not_disclose_unknown_account(client):
    known = client.post("/api/v1/auth/forgot-password", json={"username_or_email": "missing@example.invalid"})
    assert known.status_code == 200
    assert "reset_token" not in known.json()
    assert "eligible account" in known.json()["message"]


def test_reset_password_changes_password_and_consumes_token(client, db, trainee_user):
    raw = client.post("/api/v1/auth/forgot-password", json={"username_or_email": trainee_user.username}).json()["reset_token"]
    response = client.post("/api/v1/auth/reset-password", json={"token": raw, "password": "NewSecure@123"})
    assert response.status_code == 200
    db.refresh(trainee_user)
    assert verify_password("NewSecure@123", trainee_user.hashed_password)
    assert client.post("/api/v1/auth/reset-password", json={"token": raw, "password": "AnotherPass@123"}).status_code == 400
    assert db.query(AuditEvent).filter(AuditEvent.action == "account.password_reset_completed").count() == 1


def test_expired_reset_token_is_rejected(client, db, trainee_user):
    response = client.post("/api/v1/auth/forgot-password", json={"username_or_email": trainee_user.email})
    token = db.query(PasswordResetToken).filter(PasswordResetToken.user_id == trainee_user.id).one()
    token.expires_at = datetime.utcnow() - timedelta(seconds=1); db.commit()
    assert client.post("/api/v1/auth/reset-password", json={"token": response.json()["reset_token"], "password": "NewSecure@123"}).status_code == 400


def test_password_reset_requests_are_limited_per_hour(client, db, trainee_user):
    for _ in range(4):
        response = client.post("/api/v1/auth/forgot-password", json={"username_or_email": trainee_user.email})
    assert response.status_code == 429 and "Retry-After" in response.headers
    assert db.query(PasswordResetToken).filter(PasswordResetToken.user_id == trainee_user.id).count() == 3
