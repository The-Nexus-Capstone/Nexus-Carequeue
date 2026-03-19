import os
os.environ.setdefault("FLASK_ENV", "testing")
os.environ.setdefault("DATABASE_URL", "sqlite:///test_carequeue.db")
os.environ.setdefault("JWT_SECRET", "test-secret")
os.environ.setdefault("SECRET_KEY", "test-secret")

import pytest
from app.main import create_app


@pytest.fixture
def client():
    app = create_app()
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_health(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json["status"] == "ok"


def test_login_missing_fields(client):
    response = client.post("/api/auth/login",
                           json={"email": "test@test.com"})
    assert response.status_code == 400


def test_get_hospitals(client):
    response = client.get("/api/hospitals/")
    assert response.status_code == 200
    assert isinstance(response.json, list)
