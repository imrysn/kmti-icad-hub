"""
test_assessments.py — Integration tests for /api/v1/assessments/* endpoints.

Covers:
- Trainee: get tasks, get my-submissions
- RBAC: trainee/employee/admin access guards
- Trainer: view & review submissions
- Admin-only endpoint protection
"""

import pytest
from datetime import datetime

from backend.models import AssessmentTask, AssessmentSubmission, TrainerTraineeMapping
from .conftest import auth_headers


@pytest.fixture()
def seed_task(db) -> AssessmentTask:
    """A ready-to-use assessment task (no file needed for most tests)."""
    task = AssessmentTask(
        set_number=1,
        task_code="A",
        title="Unit 1A — Front View",
        description="Draw the front orthographic view.",
        master_file_path=None,
        order=0,
        created_at=datetime.now(),
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


@pytest.fixture()
def seed_submission(db, trainee_user, seed_task) -> AssessmentSubmission:
    """A pending submission already in the DB (no real file needed)."""
    submission = AssessmentSubmission(
        user_id=trainee_user.id,
        task_id=seed_task.id,
        submission_file_path="uploads/submissions/1/dummy.dwg",
        status="pending",
        submitted_at=datetime.now(),
        updated_at=datetime.now(),
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission


@pytest.fixture()
def trainer_mapping(db, employee_user, trainee_user) -> TrainerTraineeMapping:
    """Assign employee as trainer of trainee."""
    mapping = TrainerTraineeMapping(
        trainer_id=employee_user.id,
        trainee_id=trainee_user.id,
        assigned_at=datetime.now(),
    )
    db.add(mapping)
    db.commit()
    db.refresh(mapping)
    return mapping


# ══════════════════════════════════════════════════════════════════
# GET /api/v1/assessments/tasks
# ══════════════════════════════════════════════════════════════════

class TestGetTasks:
    ENDPOINT = "/api/v1/assessments/tasks"

    def test_trainee_can_get_tasks(self, client, trainee_token, seed_task):
        response = client.get(self.ENDPOINT, headers=auth_headers(trainee_token))
        assert response.status_code == 200
        tasks = response.json()
        assert any(t["id"] == seed_task.id for t in tasks)

    def test_admin_can_get_tasks(self, client, admin_token, seed_task):
        response = client.get(self.ENDPOINT, headers=auth_headers(admin_token))
        assert response.status_code == 200

    def test_employee_can_get_tasks(self, client, employee_token, seed_task):
        response = client.get(self.ENDPOINT, headers=auth_headers(employee_token))
        assert response.status_code == 200

    def test_unauthenticated_cannot_get_tasks(self, client):
        response = client.get(self.ENDPOINT)
        assert response.status_code == 401


# ══════════════════════════════════════════════════════════════════
# GET /api/v1/assessments/my-submissions
# ══════════════════════════════════════════════════════════════════

class TestMySubmissions:
    ENDPOINT = "/api/v1/assessments/my-submissions"

    def test_trainee_sees_own_submissions(self, client, trainee_token, seed_submission):
        response = client.get(self.ENDPOINT, headers=auth_headers(trainee_token))
        assert response.status_code == 200
        subs = response.json()
        assert any(s["id"] == seed_submission.id for s in subs)

    def test_empty_for_user_with_no_submissions(self, client, employee_token):
        response = client.get(self.ENDPOINT, headers=auth_headers(employee_token))
        assert response.status_code == 200
        assert response.json() == []

    def test_user_cannot_see_other_users_submissions(self, client, employee_token, seed_submission):
        """Employee has no submissions; trainee's submission must not appear."""
        response = client.get(self.ENDPOINT, headers=auth_headers(employee_token))
        ids = [s["id"] for s in response.json()]
        assert seed_submission.id not in ids


# ══════════════════════════════════════════════════════════════════
# GET /api/v1/assessments/trainer/submissions
# ══════════════════════════════════════════════════════════════════

class TestTrainerSubmissions:
    ENDPOINT = "/api/v1/assessments/trainer/submissions"

    def test_employee_can_view_assigned_trainee_submissions(
        self, client, employee_token, trainer_mapping, seed_submission
    ):
        response = client.get(self.ENDPOINT, headers=auth_headers(employee_token))
        assert response.status_code == 200
        ids = [s["id"] for s in response.json()]
        assert seed_submission.id in ids

    def test_trainee_cannot_access_trainer_endpoint(self, client, trainee_token):
        response = client.get(self.ENDPOINT, headers=auth_headers(trainee_token))
        assert response.status_code == 403

    def test_admin_can_see_all_submissions(self, client, admin_token, seed_submission):
        response = client.get(f"{self.ENDPOINT}?status=all", headers=auth_headers(admin_token))
        assert response.status_code == 200
        ids = [s["id"] for s in response.json()]
        assert seed_submission.id in ids

    def test_employee_without_assigned_trainees_sees_empty(self, client, employee_token):
        """An employee with no trainee assignments should get an empty list."""
        response = client.get(self.ENDPOINT, headers=auth_headers(employee_token))
        assert response.status_code == 200
        assert response.json() == []


# ══════════════════════════════════════════════════════════════════
# Admin-only: POST /api/v1/assessments/admin/assign
# ══════════════════════════════════════════════════════════════════

class TestAssignTrainer:
    ENDPOINT = "/api/v1/assessments/admin/assign"

    def test_admin_can_assign_trainer(self, client, admin_token, employee_user, trainee_user):
        response = client.post(self.ENDPOINT, headers=auth_headers(admin_token), json={
            "trainer_id": employee_user.id,
            "trainee_id": trainee_user.id,
        })
        assert response.status_code == 200
        assert "assigned" in response.json()["message"].lower()

    def test_trainee_cannot_assign_trainer(self, client, trainee_token, employee_user, trainee_user):
        response = client.post(self.ENDPOINT, headers=auth_headers(trainee_token), json={
            "trainer_id": employee_user.id,
            "trainee_id": trainee_user.id,
        })
        assert response.status_code == 403

    def test_employee_cannot_assign_trainer(self, client, employee_token, employee_user, trainee_user):
        response = client.post(self.ENDPOINT, headers=auth_headers(employee_token), json={
            "trainer_id": employee_user.id,
            "trainee_id": trainee_user.id,
        })
        assert response.status_code == 403


# ══════════════════════════════════════════════════════════════════
# DELETE /api/v1/assessments/submissions/{id}
# ══════════════════════════════════════════════════════════════════

class TestDeleteSubmission:
    def test_trainee_can_delete_own_submission(self, client, trainee_token, seed_submission):
        response = client.delete(
            f"/api/v1/assessments/submissions/{seed_submission.id}",
            headers=auth_headers(trainee_token),
        )
        assert response.status_code == 200
        assert "deleted" in response.json()["message"].lower()

    def test_employee_cannot_delete_trainee_submission(self, client, employee_token, seed_submission):
        response = client.delete(
            f"/api/v1/assessments/submissions/{seed_submission.id}",
            headers=auth_headers(employee_token),
        )
        assert response.status_code == 403

    def test_admin_can_delete_any_submission(self, client, admin_token, seed_submission):
        response = client.delete(
            f"/api/v1/assessments/submissions/{seed_submission.id}",
            headers=auth_headers(admin_token),
        )
        assert response.status_code == 200

    def test_delete_nonexistent_submission(self, client, trainee_token):
        response = client.delete(
            "/api/v1/assessments/submissions/999999",
            headers=auth_headers(trainee_token),
        )
        assert response.status_code == 404
