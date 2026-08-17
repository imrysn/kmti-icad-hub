from backend.models import AdminAreaGrant, AuditEvent, Course, Lesson, UserPermissionGrant
from backend.services.access_control_service import seed_access_foundation, sync_legacy_user_access


def _headers(token):
    return {"Authorization": f"Bearer {token}"}


def _content_admin(db, admin_user):
    seed_access_foundation(db); sync_legacy_user_access(db, admin_user)
    db.add(AdminAreaGrant(user_id=admin_user.id, area_code="content", reason="Curriculum owner")); db.commit()


def test_course_moves_through_review_and_publish(client, db, admin_user, admin_token):
    _content_admin(db, admin_user)
    created = client.post("/api/v1/admin/curriculum/courses", headers=_headers(admin_token), json={"title": "Lifecycle course", "course_type": "lifecycle_course"})
    assert created.status_code == 201 and created.json()["lifecycle_status"] == "draft"
    course_id = created.json()["id"]
    db.add(Lesson(course_id=course_id, title="Introduction", slug="lifecycle-intro", is_published=True)); db.commit()
    review = client.post(f"/api/v1/admin/curriculum/courses/{course_id}/lifecycle", headers=_headers(admin_token), json={"status": "in_review", "reason": "Ready for review"})
    published = client.post(f"/api/v1/admin/curriculum/courses/{course_id}/lifecycle", headers=_headers(admin_token), json={"status": "published", "reason": "Review passed"})
    assert review.status_code == 200
    assert published.status_code == 200 and published.json()["published_at"]
    assert db.query(AuditEvent).filter(AuditEvent.action == "course.lifecycle_changed").count() == 2


def test_publishing_requires_published_lesson(client, db, admin_user, admin_token):
    _content_admin(db, admin_user)
    course = Course(title="Empty course", course_type="empty_course", lifecycle_status="in_review")
    db.add(course); db.commit()
    response = client.post(f"/api/v1/admin/curriculum/courses/{course.id}/lifecycle", headers=_headers(admin_token), json={"status": "published", "reason": "Try publish"})
    assert response.status_code == 409


def test_editor_without_publish_permission_cannot_publish(client, db, admin_user, admin_token):
    _content_admin(db, admin_user)
    from backend.models import Permission
    publish = db.query(Permission).filter(Permission.code == "content.publish").one()
    db.add(UserPermissionGrant(user_id=admin_user.id, permission_id=publish.id, effect="deny", reason="Editor only"))
    course = Course(title="Reviewed course", course_type="reviewed_course", lifecycle_status="in_review")
    db.add(course); db.flush(); db.add(Lesson(course_id=course.id, title="Lesson", slug="reviewed-lesson", is_published=True)); db.commit()
    response = client.post(f"/api/v1/admin/curriculum/courses/{course.id}/lifecycle", headers=_headers(admin_token), json={"status": "published", "reason": "Try publish"})
    assert response.status_code == 403


def test_catalog_excludes_drafts_even_for_learning_operator(client, db, admin_user, admin_token):
    _content_admin(db, admin_user)
    db.add_all([
        Course(title="Published", course_type="public_course", lifecycle_status="published"),
        Course(title="Draft", course_type="draft_course", lifecycle_status="draft"),
    ]); db.commit()
    response = client.get("/api/v1/courses/", headers=_headers(admin_token))
    assert response.status_code == 200
    types = {item["course_type"] for item in response.json()["courses"]}
    assert "public_course" in types and "draft_course" not in types
