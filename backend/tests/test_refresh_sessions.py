from jose import jwt

from backend.auth.security import ALGORITHM, SECRET_KEY
from backend.models import RefreshSession


def _login(client, user, password="Trainee@12345", remember=False):
    return client.post("/api/v1/auth/login", json={"username": user.username, "password": password, "remember_me": remember})


def test_login_issues_short_access_and_hashed_refresh_session(client, db, trainee_user):
    response = _login(client, trainee_user)
    assert response.status_code == 200 and response.json()["refresh_token"]
    raw = response.json()["refresh_token"]
    session = db.query(RefreshSession).filter(RefreshSession.user_id == trainee_user.id).one()
    assert raw not in session.token_hash
    payload = jwt.decode(response.json()["access_token"], SECRET_KEY, algorithms=[ALGORITHM])
    assert payload["sid"] == session.id and payload["exp"] - payload["iat"] <= 15 * 60 + 1


def test_refresh_rotates_token_and_old_token_reuse_revokes_family(client, db, trainee_user):
    first = _login(client, trainee_user).json()
    second_response = client.post("/api/v1/auth/refresh", json={"refresh_token": first["refresh_token"]})
    assert second_response.status_code == 200
    second = second_response.json()
    assert second["refresh_token"] != first["refresh_token"]
    assert client.post("/api/v1/auth/refresh", json={"refresh_token": first["refresh_token"]}).status_code == 401
    assert client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {second['access_token']}"}).status_code == 401
    assert db.query(RefreshSession).filter(RefreshSession.user_id == trainee_user.id, RefreshSession.revoked_at.is_(None)).count() == 0


def test_logout_revokes_only_presented_session(client, db, trainee_user):
    one = _login(client, trainee_user).json(); two = _login(client, trainee_user).json()
    response = client.post("/api/v1/auth/logout", json={"refresh_token": one["refresh_token"]}, headers={"Authorization": f"Bearer {one['access_token']}"})
    assert response.status_code == 200
    assert client.post("/api/v1/auth/refresh", json={"refresh_token": one["refresh_token"]}).status_code == 401
    assert client.post("/api/v1/auth/refresh", json={"refresh_token": two["refresh_token"]}).status_code == 200


def test_logout_all_revokes_every_session(client, db, trainee_user):
    one = _login(client, trainee_user).json(); two = _login(client, trainee_user).json()
    assert client.post("/api/v1/auth/logout-all", headers={"Authorization": f"Bearer {one['access_token']}"}).status_code == 200
    assert client.post("/api/v1/auth/refresh", json={"refresh_token": one["refresh_token"]}).status_code == 401
    assert client.post("/api/v1/auth/refresh", json={"refresh_token": two["refresh_token"]}).status_code == 401


def test_password_reset_revokes_active_sessions(client, trainee_user):
    session = _login(client, trainee_user).json()
    reset = client.post("/api/v1/auth/forgot-password", json={"username_or_email": trainee_user.email}).json()
    assert client.post("/api/v1/auth/reset-password", json={"token": reset["reset_token"], "password": "ChangedPass@123"}).status_code == 200
    assert client.post("/api/v1/auth/refresh", json={"refresh_token": session["refresh_token"]}).status_code == 401
