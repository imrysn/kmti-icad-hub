"""
test_auth_routes.py — Integration tests for all /api/v1/auth/* endpoints.

Uses the TestClient + in-memory SQLite DB from conftest.py.
Tests registration, login, RBAC, quiz submission, and progress retrieval.
"""

import pytest
from .conftest import auth_headers


# ══════════════════════════════════════════════════════════════════
# POST /api/v1/auth/register
# ══════════════════════════════════════════════════════════════════

class TestRegister:
    ENDPOINT = "/api/v1/auth/register"
    VALID_PAYLOAD = {
        "username": "newuser",
        "email": "newuser@test.kmti",
        "password": "NewUser@123",
        "full_name": "New User",
        "role": "trainee",
    }

    def test_register_success(self, client):
        response = client.post(self.ENDPOINT, json=self.VALID_PAYLOAD)
        assert response.status_code == 201
        data = response.json()
        assert data["username"] == "newuser"
        assert data["role"] == "trainee"
        assert data["is_active"] is True
        assert "hashed_password" not in data  # Must never be exposed

    def test_register_duplicate_username(self, client, trainee_user):
        payload = {**self.VALID_PAYLOAD, "username": trainee_user.username, "email": "other@test.kmti"}
        response = client.post(self.ENDPOINT, json=payload)
        assert response.status_code == 400
        assert "already registered" in response.json()["detail"].lower()

    def test_register_duplicate_email(self, client, trainee_user):
        payload = {**self.VALID_PAYLOAD, "username": "uniqueuser", "email": trainee_user.email}
        response = client.post(self.ENDPOINT, json=payload)
        assert response.status_code == 400
        assert "already registered" in response.json()["detail"].lower()

    def test_register_short_username_rejected(self, client):
        payload = {**self.VALID_PAYLOAD, "username": "ab"}  # < 3 chars
        response = client.post(self.ENDPOINT, json=payload)
        assert response.status_code == 422  # Pydantic validation error

    def test_register_short_password_rejected(self, client):
        payload = {**self.VALID_PAYLOAD, "username": "validuser3", "email": "v3@test.kmti", "password": "sh"}
        response = client.post(self.ENDPOINT, json=payload)
        assert response.status_code == 422

    def test_register_cannot_create_admin_via_api(self, client):
        """The API only accepts 'trainee' or 'employee' roles."""
        payload = {**self.VALID_PAYLOAD, "username": "hacker", "email": "hacker@test.kmti", "role": "admin"}
        response = client.post(self.ENDPOINT, json=payload)
        assert response.status_code == 422  # 'admin' is not a valid literal


# ══════════════════════════════════════════════════════════════════
# POST /api/v1/auth/login
# ══════════════════════════════════════════════════════════════════

class TestLogin:
    ENDPOINT = "/api/v1/auth/login"

    def test_login_success_trainee(self, client, trainee_user):
        response = client.post(self.ENDPOINT, json={
            "username": trainee_user.username,
            "password": "Trainee@12345",
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        assert data["user"]["username"] == trainee_user.username

    def test_login_success_admin(self, client, admin_user):
        response = client.post(self.ENDPOINT, json={
            "username": admin_user.username,
            "password": "Admin@12345",
        })
        assert response.status_code == 200
        assert response.json()["user"]["role"] == "admin"

    def test_login_wrong_password(self, client, trainee_user):
        response = client.post(self.ENDPOINT, json={
            "username": trainee_user.username,
            "password": "WrongPassword!",
        })
        assert response.status_code == 401
        assert "incorrect password" in response.json()["detail"].lower()

    def test_login_nonexistent_user(self, client):
        response = client.post(self.ENDPOINT, json={
            "username": "ghost_user_xyz",
            "password": "DoesNotMatter",
        })
        assert response.status_code == 401

    def test_login_inactive_user(self, client, db, trainee_user):
        trainee_user.is_active = False
        db.commit()
        response = client.post(self.ENDPOINT, json={
            "username": trainee_user.username,
            "password": "Trainee@12345",
        })
        assert response.status_code == 400
        assert "inactive" in response.json()["detail"].lower()

    def test_login_role_mismatch_admin_portal(self, client, trainee_user):
        """A trainee trying to access the admin portal should be rejected."""
        response = client.post(self.ENDPOINT, json={
            "username": trainee_user.username,
            "password": "Trainee@12345",
            "required_role": "admin",
        })
        assert response.status_code == 401

    def test_login_admin_can_use_admin_portal(self, client, admin_user):
        response = client.post(self.ENDPOINT, json={
            "username": admin_user.username,
            "password": "Admin@12345",
            "required_role": "admin",
        })
        assert response.status_code == 200


# ══════════════════════════════════════════════════════════════════
# GET /api/v1/auth/me
# ══════════════════════════════════════════════════════════════════

class TestGetMe:
    ENDPOINT = "/api/v1/auth/me"

    def test_get_me_authenticated(self, client, trainee_user, trainee_token):
        response = client.get(self.ENDPOINT, headers=auth_headers(trainee_token))
        assert response.status_code == 200
        data = response.json()
        assert data["username"] == trainee_user.username
        assert data["role"] == "trainee"

    def test_get_me_unauthenticated(self, client):
        response = client.get(self.ENDPOINT)
        assert response.status_code == 401  # No Authorization header

    def test_get_me_invalid_token(self, client):
        response = client.get(self.ENDPOINT, headers={"Authorization": "Bearer invalid.token.here"})
        assert response.status_code == 401


# ══════════════════════════════════════════════════════════════════
# GET /api/v1/auth/users  (Admin only)
# ══════════════════════════════════════════════════════════════════

class TestListUsers:
    ENDPOINT = "/api/v1/auth/users"

    def test_admin_can_list_users(self, client, admin_user, trainee_user, admin_token):
        response = client.get(self.ENDPOINT, headers=auth_headers(admin_token))
        assert response.status_code == 200
        usernames = [u["username"] for u in response.json()]
        assert admin_user.username in usernames
        assert trainee_user.username in usernames

    def test_trainee_cannot_list_users(self, client, trainee_token):
        response = client.get(self.ENDPOINT, headers=auth_headers(trainee_token))
        assert response.status_code == 403

    def test_employee_cannot_list_users(self, client, employee_token):
        response = client.get(self.ENDPOINT, headers=auth_headers(employee_token))
        assert response.status_code == 403

    def test_unauthenticated_cannot_list_users(self, client):
        response = client.get(self.ENDPOINT)
        assert response.status_code == 401


# ══════════════════════════════════════════════════════════════════
# PATCH /api/v1/auth/users/{id}/status  (Admin only)
# ══════════════════════════════════════════════════════════════════

class TestToggleUserStatus:
    def test_admin_can_disable_user(self, client, admin_token, trainee_user):
        response = client.patch(
            f"/api/v1/auth/users/{trainee_user.id}/status",
            headers=auth_headers(admin_token),
        )
        assert response.status_code == 200
        assert response.json()["is_active"] is False

    def test_admin_can_re_enable_user(self, client, admin_token, db, trainee_user):
        trainee_user.is_active = False
        db.commit()
        response = client.patch(
            f"/api/v1/auth/users/{trainee_user.id}/status",
            headers=auth_headers(admin_token),
        )
        assert response.status_code == 200
        assert response.json()["is_active"] is True

    def test_admin_cannot_disable_self(self, client, admin_user, admin_token):
        response = client.patch(
            f"/api/v1/auth/users/{admin_user.id}/status",
            headers=auth_headers(admin_token),
        )
        assert response.status_code == 400
        assert "own account" in response.json()["detail"].lower()

    def test_disable_nonexistent_user(self, client, admin_token):
        response = client.patch(
            "/api/v1/auth/users/999999/status",
            headers=auth_headers(admin_token),
        )
        assert response.status_code == 404

    def test_trainee_cannot_toggle_status(self, client, trainee_token, trainee_user):
        response = client.patch(
            f"/api/v1/auth/users/{trainee_user.id}/status",
            headers=auth_headers(trainee_token),
        )
        assert response.status_code == 403


# ══════════════════════════════════════════════════════════════════
# POST /api/v1/auth/submit-quiz
# ══════════════════════════════════════════════════════════════════

class TestSubmitQuiz:
    ENDPOINT = "/api/v1/auth/submit-quiz"

    def test_submit_passing_score(self, client, trainee_token, seed_quiz):
        response = client.post(self.ENDPOINT, headers=auth_headers(trainee_token), json={
            "course_id": "2D_Drawing",
            "lesson_id": seed_quiz.slug,
            "score": 85.0,
        })
        assert response.status_code == 200
        data = response.json()
        assert data["passed"] is True
        assert data["score"] == 85.0

    def test_submit_failing_score(self, client, trainee_token, seed_quiz):
        response = client.post(self.ENDPOINT, headers=auth_headers(trainee_token), json={
            "course_id": "2D_Drawing",
            "lesson_id": seed_quiz.slug,
            "score": 60.0,
        })
        assert response.status_code == 200
        assert response.json()["passed"] is False

    def test_best_score_is_kept(self, client, trainee_token, seed_quiz):
        """Second submission with a lower score should not overwrite the best score."""
        # First attempt: 90%
        client.post(self.ENDPOINT, headers=auth_headers(trainee_token), json={
            "course_id": "2D_Drawing", "lesson_id": seed_quiz.slug, "score": 90.0,
        })
        # Second attempt: 70% — should not replace 90%
        client.post(self.ENDPOINT, headers=auth_headers(trainee_token), json={
            "course_id": "2D_Drawing", "lesson_id": seed_quiz.slug, "score": 70.0,
        })
        # Progress should still show 90%
        progress_response = client.get(
            "/api/v1/auth/progress/2D_Drawing",
            headers=auth_headers(trainee_token),
        )
        assert progress_response.status_code == 200
        scores = [p["score"] for p in progress_response.json() if p["lesson_id"] == seed_quiz.slug]
        assert scores[0] == 90.0

    def test_submit_quiz_unauthenticated(self, client, seed_quiz):
        response = client.post(self.ENDPOINT, json={
            "course_id": "2D_Drawing", "lesson_id": seed_quiz.slug, "score": 80.0,
        })
        assert response.status_code == 401


# ══════════════════════════════════════════════════════════════════
# GET /api/v1/auth/progress/{course_id}
# ══════════════════════════════════════════════════════════════════

class TestCourseProgress:
    def test_get_progress_empty(self, client, trainee_token):
        response = client.get("/api/v1/auth/progress/2D_Drawing", headers=auth_headers(trainee_token))
        assert response.status_code == 200
        assert response.json() == []

    def test_get_progress_after_submission(self, client, trainee_token, seed_quiz):
        client.post("/api/v1/auth/submit-quiz", headers=auth_headers(trainee_token), json={
            "course_id": "2D_Drawing", "lesson_id": seed_quiz.slug, "score": 85.0,
        })
        response = client.get("/api/v1/auth/progress/2D_Drawing", headers=auth_headers(trainee_token))
        assert response.status_code == 200
        entries = response.json()
        assert len(entries) == 1
        assert entries[0]["lesson_id"] == seed_quiz.slug
        assert entries[0]["is_completed"] is True  # 85 >= 80

    def test_progress_isolation_between_users(self, client, trainee_token, employee_token, seed_quiz):
        """One user's submissions must not appear in another user's progress."""
        client.post("/api/v1/auth/submit-quiz", headers=auth_headers(trainee_token), json={
            "course_id": "2D_Drawing", "lesson_id": seed_quiz.slug, "score": 90.0,
        })
        response = client.get("/api/v1/auth/progress/2D_Drawing", headers=auth_headers(employee_token))
        assert response.json() == []
