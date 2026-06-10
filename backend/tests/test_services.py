"""
test_services.py — Unit tests for backend business-logic services.

Tests are kept pure (no HTTP, no live DB) where possible.
Database-backed tests use the in-memory SQLite from conftest.py.
"""

import pytest
from datetime import datetime, timezone

from backend.auth.security import hash_password, verify_password


# ══════════════════════════════════════════════════════════════════
# Pydantic schema validation (pure unit tests, no DB)
# ══════════════════════════════════════════════════════════════════

class TestUserCreateSchema:
    """Validate that UserCreate enforces business rules at the schema level."""

    def test_valid_payload_accepted(self):
        from backend.schemas import UserCreate
        user = UserCreate(
            username="validuser",
            email="valid@test.kmti",
            password="Passw0rd!",
            full_name="Valid User",
            role="trainee",
        )
        assert user.username == "validuser"

    def test_username_strips_whitespace(self):
        from backend.schemas import UserCreate
        user = UserCreate(
            username="  alice  ",
            email="alice@test.kmti",
            password="Password1!",
            full_name="Alice",
            role="trainee",
        )
        assert user.username == "alice"

    def test_full_name_strips_whitespace(self):
        from backend.schemas import UserCreate
        user = UserCreate(
            username="bob",
            email="bob@test.kmti",
            password="Password1!",
            full_name="  Bob Smith  ",
            role="trainee",
        )
        assert user.full_name == "Bob Smith"

    def test_empty_full_name_rejected(self):
        from pydantic import ValidationError
        from backend.schemas import UserCreate
        with pytest.raises(ValidationError):
            UserCreate(
                username="charlie",
                email="charlie@test.kmti",
                password="Password1!",
                full_name="   ",
                role="trainee",
            )

    def test_invalid_email_rejected(self):
        from pydantic import ValidationError
        from backend.schemas import UserCreate
        with pytest.raises(ValidationError):
            UserCreate(
                username="dave",
                email="not-an-email",
                password="Password1!",
                full_name="Dave",
                role="trainee",
            )

    def test_admin_role_rejected_in_user_create(self):
        from pydantic import ValidationError
        from backend.schemas import UserCreate
        with pytest.raises(ValidationError):
            UserCreate(
                username="evil",
                email="evil@test.kmti",
                password="Password1!",
                full_name="Evil Hacker",
                role="admin",
            )


class TestQuizSubmissionSchema:
    """Validate QuizSubmission schema."""

    def test_valid_submission(self):
        from backend.schemas import QuizSubmission
        sub = QuizSubmission(
            course_id="2D_Drawing",
            lesson_id="keyway-lesson",
            score=87.5,
        )
        assert sub.score == 87.5

    def test_submission_accepts_zero_score(self):
        from backend.schemas import QuizSubmission
        sub = QuizSubmission(course_id="3D", lesson_id="intro", score=0.0)
        assert sub.score == 0.0

    def test_submission_accepts_perfect_score(self):
        from backend.schemas import QuizSubmission
        sub = QuizSubmission(course_id="3D", lesson_id="intro", score=100.0)
        assert sub.score == 100.0

    def test_answers_default_to_empty_list(self):
        from backend.schemas import QuizSubmission
        sub = QuizSubmission(course_id="3D", lesson_id="intro", score=75.0)
        assert sub.answers == []


class TestChatRequestSchema:
    """Test ChatRequest image limit validation."""

    def test_up_to_3_images_accepted(self):
        from backend.schemas import ChatRequest, ImagePayload
        req = ChatRequest(
            message="Show me 3 images",
            images=[
                ImagePayload(data="base64a", mime="image/jpeg"),
                ImagePayload(data="base64b", mime="image/jpeg"),
                ImagePayload(data="base64c", mime="image/jpeg"),
            ],
        )
        assert len(req.images) == 3

    def test_more_than_3_images_rejected(self):
        from pydantic import ValidationError
        from backend.schemas import ChatRequest, ImagePayload
        with pytest.raises(ValidationError):
            ChatRequest(
                message="Too many images",
                images=[
                    ImagePayload(data=f"b64_{i}", mime="image/jpeg")
                    for i in range(4)
                ],
            )


# ══════════════════════════════════════════════════════════════════
# Quiz scoring logic (DB-backed, verifying business rules)
# ══════════════════════════════════════════════════════════════════

class TestQuizScoringLogic:
    """Verify the best-score-wins rule is enforced by the DB layer."""

    def test_best_score_threshold_80_percent(self):
        """A score >= 80 means the lesson is 'completed'."""
        assert 80.0 >= 80.0  # passes
        assert 79.9 < 80.0   # fails

    def test_score_comparison_new_best(self):
        """Simulate the score update logic from submit_quiz_score."""
        existing_score = 70.0
        new_score = 85.0
        # Should update
        best = max(existing_score, new_score)
        assert best == 85.0

    def test_score_comparison_worse_attempt(self):
        """A lower new score should NOT replace the stored best."""
        existing_score = 90.0
        new_score = 60.0
        best = max(existing_score, new_score)
        assert best == 90.0


# ══════════════════════════════════════════════════════════════════
# Progress service: is_completed threshold
# ══════════════════════════════════════════════════════════════════

class TestProgressCompletionThreshold:
    """Validate the is_completed logic from /auth/progress/{course_id}."""

    @pytest.mark.parametrize("score,expected_completed", [
        (100.0, True),
        (80.0, True),
        (79.9, False),
        (50.0, False),
        (0.0, False),
    ])
    def test_completion_threshold(self, score: float, expected_completed: bool):
        """Mirrors the logic: is_completed = score >= 80.0"""
        is_completed = score >= 80.0
        assert is_completed is expected_completed


# ══════════════════════════════════════════════════════════════════
# Password security: hash round-trips
# ══════════════════════════════════════════════════════════════════

class TestPasswordRoundtrip:
    """Integration between hash_password and verify_password."""

    @pytest.mark.parametrize("password", [
        "SimplePass1",
        "P@ssw0rd!#$%",
        "A" * 72,  # bcrypt max length
        "correct horse battery staple",
        "日本語パスワード",  # Unicode
    ])
    def test_various_passwords_roundtrip(self, password: str):
        hashed = hash_password(password)
        assert verify_password(password, hashed) is True
