from backend.services.abuse_protection_service import clear_rate_limits


def test_login_uses_generic_failure_for_unknown_and_wrong_password(client, trainee_user):
    unknown = client.post("/api/v1/auth/login", json={"username": "missing-user", "password": "WrongPass@123"})
    wrong = client.post("/api/v1/auth/login", json={"username": trainee_user.username, "password": "WrongPass@123"})
    assert unknown.status_code == wrong.status_code == 401
    assert unknown.json()["detail"] == wrong.json()["detail"] == "Incorrect username or password."


def test_login_rate_limit_returns_retry_after(client, trainee_user):
    for _ in range(5):
        assert client.post("/api/v1/auth/login", json={"username": trainee_user.username, "password": "WrongPass@123"}).status_code == 401
    blocked = client.post("/api/v1/auth/login", json={"username": trainee_user.username, "password": "WrongPass@123"})
    assert blocked.status_code == 429 and int(blocked.headers["Retry-After"]) > 0


def test_rate_limit_is_scoped_by_identifier(client, trainee_user, employee_user):
    for _ in range(5):
        client.post("/api/v1/auth/login", json={"username": trainee_user.username, "password": "WrongPass@123"})
    response = client.post("/api/v1/auth/login", json={"username": employee_user.username, "password": "Employee@12345"})
    assert response.status_code == 200


def test_captcha_is_disabled_in_local_profile(client, trainee_user):
    clear_rate_limits()
    response = client.post("/api/v1/auth/login", json={"username": trainee_user.username, "password": "Trainee@12345"})
    assert response.status_code == 200
