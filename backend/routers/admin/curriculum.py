import json
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ...auth.dependencies import require_permission
from ...database import get_db
from ...models import AuditEvent, Course, Lesson, User
from ...schemas import CourseCreate, CourseLifecycleUpdate, CourseResponse, CourseUpdate

router = APIRouter(prefix="/curriculum")

TRANSITIONS = {
    "draft": {"in_review", "archived"},
    "in_review": {"draft", "published", "archived"},
    "published": {"draft", "archived"},
    "archived": {"draft"},
}


def _course_or_404(db: Session, course_id: int) -> Course:
    course = db.query(Course).filter(Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@router.get("/courses", response_model=list[CourseResponse])
def list_courses(db: Session = Depends(get_db), _: User = Depends(require_permission("content.edit"))):
    return db.query(Course).order_by(Course.order, Course.id).all()


@router.post("/courses", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
def create_course(payload: CourseCreate, db: Session = Depends(get_db), admin: User = Depends(require_permission("content.edit"))):
    if db.query(Course.id).filter(Course.course_type == payload.course_type).first():
        raise HTTPException(status_code=409, detail="Course code already exists")
    course = Course(**payload.model_dump(), lifecycle_status="draft")
    db.add(course); db.flush()
    db.add(AuditEvent(actor_user_id=admin.id, action="course.created", target_type="course", target_id=str(course.id), result="success", metadata_json=json.dumps({"course_type": course.course_type})))
    db.commit(); db.refresh(course); return course


@router.patch("/courses/{course_id}", response_model=CourseResponse)
def update_course(course_id: int, payload: CourseUpdate, db: Session = Depends(get_db), admin: User = Depends(require_permission("content.edit"))):
    course = _course_or_404(db, course_id)
    if course.lifecycle_status == "published":
        raise HTTPException(status_code=409, detail="Return the course to draft before editing")
    changes = payload.model_dump(exclude_unset=True)
    for field, value in changes.items():
        setattr(course, field, value)
    db.add(AuditEvent(actor_user_id=admin.id, action="course.updated", target_type="course", target_id=str(course.id), result="success", metadata_json=json.dumps({"fields": sorted(changes)})))
    db.commit(); db.refresh(course); return course


@router.post("/courses/{course_id}/lifecycle", response_model=CourseResponse)
def change_lifecycle(course_id: int, payload: CourseLifecycleUpdate, db: Session = Depends(get_db), admin: User = Depends(require_permission("content.edit"))):
    course = _course_or_404(db, course_id)
    current = course.lifecycle_status or "published"
    if payload.status == current:
        return course
    if payload.status not in TRANSITIONS.get(current, set()):
        raise HTTPException(status_code=409, detail=f"Course cannot move from {current} to {payload.status}")
    if payload.status == "published":
        from ...services.access_control_service import user_has_permission
        if not user_has_permission(db, admin, "content.publish"):
            raise HTTPException(status_code=403, detail="Publishing permission is required")
        if not db.query(Lesson.id).filter(Lesson.course_id == course.id, Lesson.is_published.is_(True)).first():
            raise HTTPException(status_code=409, detail="At least one published lesson is required")
        course.published_at = datetime.now(timezone.utc)
    elif current == "published":
        course.published_at = None
    course.lifecycle_status = payload.status
    db.add(AuditEvent(actor_user_id=admin.id, action="course.lifecycle_changed", target_type="course", target_id=str(course.id), result="success", metadata_json=json.dumps({"from": current, "to": payload.status, "reason": payload.reason})))
    db.commit(); db.refresh(course); return course
