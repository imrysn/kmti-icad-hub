import pytest
from sqlalchemy.exc import IntegrityError

from backend.models import PasswordResetToken, RegistrationApplication, User


def test_registration_rejects_email_with_different_capitalization(client, db):
    existing = User(
        username="existing_case_user",
        email="Existing.Person@Example.com",
        hashed_password="not-used",
        full_name="Existing Person",
    )
    db.add(existing)
    db.flush()
    response = client.post("/api/v1/registrations", json={
        "username": "case_duplicate",
        "email": "EXISTING.PERSON@example.COM",
        "password": "StrongPassword123!",
        "full_name": "Case Duplicate",
        "requested_plan_id": 1,
        "preferred_language": "en",
        "timezone": "Asia/Manila",
        "privacy_policy_version": "v1",
        "terms_version": "v1",
        "privacy_accepted": True,
        "terms_accepted": True,
    })
    assert response.status_code == 202
    assert db.query(User).filter(User.username == "case_duplicate").count() == 0
    assert db.query(RegistrationApplication).filter(
        RegistrationApplication.email_normalized == "existing.person@example.com"
    ).count() == 0


def test_password_recovery_email_lookup_is_case_insensitive(client, db, trainee_user):
    response = client.post("/api/v1/auth/forgot-password", json={
        "username_or_email": trainee_user.email.upper(),
    })
    assert response.status_code == 200
    assert db.query(PasswordResetToken).filter(
        PasswordResetToken.user_id == trainee_user.id
    ).count() == 1


def test_user_email_is_automatically_normalized(db):
    user = User(
        username="normalized_user",
        email="  Mixed.Case@Example.COM  ",
        hashed_password="not-used",
        full_name="Normalized User",
    )
    db.add(user)
    db.flush()
    assert user.email == "Mixed.Case@Example.COM"
    assert user.email_normalized == "mixed.case@example.com"


def test_database_rejects_case_insensitive_email_duplicate(db):
    db.add(User(
        username="email_first",
        email="Person@Example.com",
        hashed_password="not-used",
        full_name="First Person",
    ))
    db.flush()
    db.add(User(
        username="email_second",
        email="person@example.COM",
        hashed_password="not-used",
        full_name="Second Person",
    ))
    with pytest.raises(IntegrityError):
        db.flush()
