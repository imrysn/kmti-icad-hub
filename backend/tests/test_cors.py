from fastapi.testclient import TestClient

from backend.main import app


def test_authenticated_download_preflight_allows_vite_origin():
    with TestClient(app) as client:
        response = client.options(
            "/api/v1/assessments/submissions/916/download",
            headers={
                "Origin": "http://localhost:5173",
                "Access-Control-Request-Method": "GET",
                "Access-Control-Request-Headers": "authorization",
            },
        )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:5173"
    assert "authorization" in response.headers["access-control-allow-headers"].lower()
