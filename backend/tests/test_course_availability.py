from .conftest import auth_headers


def test_authenticated_user_can_list_availability(client, trainee_token):
    response = client.get("/api/v1/availability", headers=auth_headers(trainee_token))
    assert response.status_code == 200
    items = {item["resource_key"]: item for item in response.json()}
    assert items["icad_commands"]["status"] == "coming_soon"
    assert items["icad_guide"]["status"] == "available"


def test_anonymous_user_cannot_list_availability(client):
    assert client.get("/api/v1/availability").status_code == 401


def test_admin_can_update_availability_and_creates_audit_log(client, admin_token, db):
    response = client.put(
        "/api/v1/availability/icad_commands",
        headers=auth_headers(admin_token),
        json={"status": "maintenance", "message": "Correcting lesson images."},
    )
    assert response.status_code == 200
    assert response.json()["status"] == "maintenance"
    assert response.json()["message"] == "Correcting lesson images."

    from backend.models import SystemLog
    log = db.query(SystemLog).filter(SystemLog.context == "COURSE_AVAILABILITY").first()
    assert log is not None
    assert "maintenance" in log.message


def test_non_admin_cannot_update_availability(client, trainee_token):
    response = client.put(
        "/api/v1/availability/icad_commands",
        headers=auth_headers(trainee_token),
        json={"status": "hidden", "message": "Not allowed"},
    )
    assert response.status_code == 403


def test_invalid_status_is_rejected(client, admin_token):
    response = client.put(
        "/api/v1/availability/icad_commands",
        headers=auth_headers(admin_token),
        json={"status": "broken", "message": "Invalid"},
    )
    assert response.status_code == 422


def test_unknown_resource_is_rejected(client, admin_token):
    response = client.put(
        "/api/v1/availability/not-a-course",
        headers=auth_headers(admin_token),
        json={"status": "maintenance", "message": "Unknown"},
    )
    assert response.status_code == 404
