"""
conftest.py — Shared pytest fixtures for the KMTI iCAD Hub backend test suite.

Strategy:
- Each test session gets a fresh in-memory SQLite database (no file on disk).
- FastAPI's dependency injection is overridden so no real DB is ever touched.
- Seeded fixtures (admin_user, trainee_user, employee_user, seed_quiz) provide
  ready-made data for tests without repetitive setup code.
"""

import os
import pytest
from datetime import datetime, timezone
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# ── Set a dummy SECRET_KEY so security.py doesn't raise on import ─────────────
os.environ.setdefault("SECRET_KEY", "test-secret-key-for-pytest-do-not-use-in-production")
os.environ.setdefault("USE_MYSQL", "false")

from backend.database import Base, get_db
from backend.main import app
from backend.models import User, Quiz, Question
from backend.auth.security import hash_password, create_access_token

# ── In-memory SQLite engine — isolated per test session ──────────────────────
SQLALCHEMY_TEST_URL = "sqlite://"  # :memory:

engine = create_engine(
    SQLALCHEMY_TEST_URL,
    connect_args={"check_same_thread": False},
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="session", autouse=True)
def create_tables():
    """Create all tables once for the entire test session."""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture()
def db():
    """Provide a transactional DB session that rolls back after each test."""
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    yield session
    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture()
def client(db):
    """TestClient with the DB dependency overridden to use the test session."""
    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app, raise_server_exceptions=True) as c:
        yield c
    app.dependency_overrides.clear()


# ── User seed fixtures ────────────────────────────────────────────────────────

@pytest.fixture()
def admin_user(db) -> User:
    user = User(
        username="admin_test",
        email="admin@test.kmti",
        hashed_password=hash_password("Admin@12345"),
        full_name="Admin Tester",
        role="admin",
        is_active=True,
        created_at=datetime.now(timezone.utc),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@pytest.fixture()
def trainee_user(db) -> User:
    user = User(
        username="trainee_test",
        email="trainee@test.kmti",
        hashed_password=hash_password("Trainee@12345"),
        full_name="Trainee Tester",
        role="trainee",
        is_active=True,
        created_at=datetime.now(timezone.utc),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@pytest.fixture()
def employee_user(db) -> User:
    user = User(
        username="employee_test",
        email="employee@test.kmti",
        hashed_password=hash_password("Employee@12345"),
        full_name="Employee Tester",
        role="employee",
        is_active=True,
        created_at=datetime.now(timezone.utc),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


# ── Token helpers ──────────────────────────────────────────────────────────────

@pytest.fixture()
def admin_token(admin_user) -> str:
    return create_access_token({"sub": admin_user.username, "role": admin_user.role})


@pytest.fixture()
def trainee_token(trainee_user) -> str:
    return create_access_token({"sub": trainee_user.username, "role": trainee_user.role})


@pytest.fixture()
def employee_token(employee_user) -> str:
    return create_access_token({"sub": employee_user.username, "role": employee_user.role})


def auth_headers(token: str) -> dict:
    """Helper: build Authorization header dict from a token string."""
    return {"Authorization": f"Bearer {token}"}


# ── Quiz seed fixture ─────────────────────────────────────────────────────────

@pytest.fixture()
def seed_quiz(db) -> Quiz:
    quiz = Quiz(
        slug="test-keyway-lesson",
        title="Test Keyway Quiz",
        description="A quiz for testing purposes",
        course_type="2D_Drawing",
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
    )
    db.add(quiz)
    db.flush()  # Get the ID without committing

    q1 = Question(
        quiz_id=quiz.id,
        text="What is a keyway?",
        options_json='["A slot", "A fastener", "A bearing", "A shaft"]',
        correct_answer=0,
        explanation="A keyway is a slot cut into a shaft or hub.",
        order=0,
    )
    q2 = Question(
        quiz_id=quiz.id,
        text="Which standard governs keyway dimensions?",
        options_json='["ISO 773", "ASME B18", "DIN 6885", "ISO 286"]',
        correct_answer=2,
        explanation="DIN 6885 covers parallel keys and keyways.",
        order=1,
    )
    db.add_all([q1, q2])
    db.commit()
    db.refresh(quiz)
    return quiz
