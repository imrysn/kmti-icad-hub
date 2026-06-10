"""
test_security.py — Unit tests for backend/auth/security.py

Tests password hashing, verification, and JWT token lifecycle.
No database or HTTP calls needed — pure function tests.
"""

import time
import pytest
from datetime import timedelta
from jose import jwt, JWTError

from backend.auth.security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_token,
    SECRET_KEY,
    ALGORITHM,
)


# ══════════════════════════════════════════════════════════════════
# Password hashing
# ══════════════════════════════════════════════════════════════════

class TestPasswordHashing:
    def test_hash_returns_string(self):
        hashed = hash_password("MySecret123")
        assert isinstance(hashed, str)

    def test_hash_is_not_plaintext(self):
        plain = "MySecret123"
        assert hash_password(plain) != plain

    def test_same_password_produces_different_hashes(self):
        """bcrypt uses random salt — same input should yield different hashes."""
        h1 = hash_password("SamePassword!")
        h2 = hash_password("SamePassword!")
        assert h1 != h2

    def test_verify_correct_password(self):
        plain = "CorrectHorseBattery"
        hashed = hash_password(plain)
        assert verify_password(plain, hashed) is True

    def test_verify_wrong_password(self):
        hashed = hash_password("RightPassword")
        assert verify_password("WrongPassword", hashed) is False

    def test_verify_empty_password_fails(self):
        hashed = hash_password("ActualPassword")
        assert verify_password("", hashed) is False

    def test_verify_case_sensitive(self):
        hashed = hash_password("Password")
        assert verify_password("password", hashed) is False


# ══════════════════════════════════════════════════════════════════
# JWT token creation
# ══════════════════════════════════════════════════════════════════

class TestTokenCreation:
    def test_create_token_returns_string(self):
        token = create_access_token({"sub": "alice", "role": "trainee"})
        assert isinstance(token, str)
        assert len(token) > 0

    def test_token_contains_subject(self):
        token = create_access_token({"sub": "alice"})
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        assert payload["sub"] == "alice"

    def test_token_contains_role(self):
        token = create_access_token({"sub": "bob", "role": "admin"})
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        assert payload["role"] == "admin"

    def test_token_has_expiry(self):
        token = create_access_token({"sub": "charlie"})
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        assert "exp" in payload

    def test_custom_expiry_delta(self):
        """Token with a 7-day expiry should not expire immediately."""
        token = create_access_token({"sub": "dave"}, expires_delta=timedelta(days=7))
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        assert payload["sub"] == "dave"

    def test_token_signed_with_correct_algorithm(self):
        """Decoding with the wrong algorithm must fail."""
        token = create_access_token({"sub": "eve"})
        with pytest.raises(JWTError):
            jwt.decode(token, SECRET_KEY, algorithms=["RS256"])


# ══════════════════════════════════════════════════════════════════
# JWT token decoding
# ══════════════════════════════════════════════════════════════════

class TestTokenDecoding:
    def test_decode_valid_token(self):
        token = create_access_token({"sub": "frank", "role": "employee"})
        payload = decode_token(token)
        assert payload["sub"] == "frank"
        assert payload["role"] == "employee"

    def test_decode_expired_token_raises(self):
        """A token with -1 second TTL should be already expired."""
        expired_token = create_access_token(
            {"sub": "grace"}, expires_delta=timedelta(seconds=-1)
        )
        with pytest.raises(JWTError):
            decode_token(expired_token)

    def test_decode_tampered_token_raises(self):
        token = create_access_token({"sub": "harry"})
        tampered = token[:-5] + "XXXXX"  # corrupt the signature
        with pytest.raises(JWTError):
            decode_token(tampered)

    def test_decode_random_string_raises(self):
        with pytest.raises(JWTError):
            decode_token("not.a.valid.jwt.token")

    def test_decode_wrong_secret_raises(self):
        token = create_access_token({"sub": "ivan"})
        with pytest.raises(JWTError):
            jwt.decode(token, "wrong-secret", algorithms=[ALGORITHM])
