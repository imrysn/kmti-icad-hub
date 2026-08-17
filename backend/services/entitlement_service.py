"""Calculate and enforce dated learner-plan entitlements."""

from datetime import datetime, timezone

from fastapi import HTTPException, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from ..models import AccessPlan, AssessmentTask, Course, PlanEntitlement, Quiz, User, UserEntitlementOverride, UserPlanAssignment
from .access_control_service import get_active_role_codes


def utc_now() -> datetime:
    # Database timestamps are currently stored as naive UTC for SQLite/MySQL compatibility.
    return datetime.now(timezone.utc).replace(tzinfo=None)


def get_effective_plan_assignment(db: Session, user: User, at: datetime | None = None):
    at = (at or utc_now()).replace(tzinfo=None)
    return (
        db.query(UserPlanAssignment)
        .join(AccessPlan, AccessPlan.id == UserPlanAssignment.plan_id)
        .filter(
            UserPlanAssignment.user_id == user.id,
            UserPlanAssignment.status.in_(("active", "scheduled")),
            UserPlanAssignment.starts_at <= at,
            or_(UserPlanAssignment.ends_at.is_(None), UserPlanAssignment.ends_at > at),
            AccessPlan.is_active.is_(True),
        )
        .order_by(UserPlanAssignment.starts_at.desc(), UserPlanAssignment.id.desc())
        .first()
    )


def get_effective_entitlements(db: Session, user: User) -> list[PlanEntitlement]:
    assignment = get_effective_plan_assignment(db, user)
    if assignment is None:
        return []
    return db.query(PlanEntitlement).filter(PlanEntitlement.plan_id == assignment.plan_id).all()


def is_learning_operator(db: Session, user: User) -> bool:
    """Instructors/admins need curriculum access to teach and administer it."""
    return bool(get_active_role_codes(db, user) & {"instructor", "admin"})


def has_entitlement(db: Session, user: User, resource_type: str, resource_id: str, permission: str = "view") -> bool:
    if is_learning_operator(db, user):
        return True
    now = utc_now()
    overrides = db.query(UserEntitlementOverride).filter(
        UserEntitlementOverride.user_id == user.id,
        UserEntitlementOverride.resource_type == resource_type,
        UserEntitlementOverride.resource_id.in_((str(resource_id), "*")),
        UserEntitlementOverride.permission_code.in_((permission, "*")),
        UserEntitlementOverride.starts_at <= now,
        or_(UserEntitlementOverride.ends_at.is_(None), UserEntitlementOverride.ends_at > now),
        UserEntitlementOverride.revoked_at.is_(None),
    ).all()
    if any(item.effect == "deny" for item in overrides):
        return False
    if any(item.effect == "allow" for item in overrides):
        return True
    assignment = get_effective_plan_assignment(db, user)
    if assignment is None:
        return False
    return db.query(PlanEntitlement.id).filter(
        PlanEntitlement.plan_id == assignment.plan_id,
        PlanEntitlement.resource_type == resource_type,
        PlanEntitlement.resource_id == str(resource_id),
        PlanEntitlement.permission_code.in_((permission, "*")),
    ).first() is not None


def resolve_course(db: Session, course_reference: str) -> Course | None:
    query = db.query(Course)
    if str(course_reference).isdigit():
        course = query.filter(Course.id == int(course_reference)).first()
        if course:
            return course
    return query.filter(Course.course_type == str(course_reference)).first()


def require_course_access(db: Session, user: User, course_reference: str) -> Course | None:
    # Practical assessments are represented as a virtual course.
    if course_reference == "practical-assessment":
        allowed = has_entitlement(db, user, "course", course_reference) or has_entitlement(db, user, "practical_set", "*")
        if not allowed:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Your access plan does not include this course")
        return None
    course = resolve_course(db, course_reference)
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    if not has_entitlement(db, user, "course", course.course_type):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Your access plan does not include this course")
    return course


def require_lesson_access(db: Session, user: User, lesson_slug: str):
    from ..models import Lesson
    lesson = db.query(Lesson).filter(Lesson.slug == lesson_slug).first()
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    course = resolve_course(db, str(lesson.course_id))
    if has_entitlement(db, user, "lesson", lesson_slug) or (course and has_entitlement(db, user, "course", course.course_type)) or is_learning_operator(db, user):
        return lesson
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Your access plan does not include this lesson")


def require_quiz_access(db: Session, user: User, quiz: Quiz) -> None:
    if has_entitlement(db, user, "quiz", quiz.slug) or has_entitlement(db, user, "course", quiz.course_type) or is_learning_operator(db, user):
        return
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Your access plan does not include this assessment")


def practical_set_resource_id(task: AssessmentTask) -> str:
    return f"{task.assessment_type or '3D'}:{task.set_number}"


def has_practical_set_access(db: Session, user: User, task: AssessmentTask) -> bool:
    assessment_type = task.assessment_type or "3D"
    return (
        is_learning_operator(db, user)
        or has_entitlement(db, user, "practical_set", practical_set_resource_id(task))
        or has_entitlement(db, user, "practical_set", f"{assessment_type}:*")
        or has_entitlement(db, user, "practical_set", "*")
    )


def require_practical_task_access(db: Session, user: User, task: AssessmentTask) -> None:
    if has_practical_set_access(db, user, task):
        return
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Your access plan does not include this practical assessment set")


def serialize_effective_access(db: Session, user: User) -> dict:
    assignment = get_effective_plan_assignment(db, user)
    entitlements = get_effective_entitlements(db, user)
    now = utc_now()
    overrides = db.query(UserEntitlementOverride).filter(
        UserEntitlementOverride.user_id == user.id,
        UserEntitlementOverride.starts_at <= now,
        or_(UserEntitlementOverride.ends_at.is_(None), UserEntitlementOverride.ends_at > now),
        UserEntitlementOverride.revoked_at.is_(None),
    ).all()
    effective = {(item.resource_type, item.resource_id, item.permission_code): {"resource_type": item.resource_type, "resource_id": item.resource_id, "permission_code": item.permission_code, "source": "plan"} for item in entitlements}
    for item in (candidate for candidate in overrides if candidate.effect == "allow"):
        key = (item.resource_type, item.resource_id, item.permission_code)
        effective[key] = {"resource_type": item.resource_type, "resource_id": item.resource_id, "permission_code": item.permission_code, "source": "override"}
    for item in (candidate for candidate in overrides if candidate.effect == "deny"):
        key = (item.resource_type, item.resource_id, item.permission_code)
        if item.resource_id == "*":
            effective = {candidate: value for candidate, value in effective.items() if candidate[0] != item.resource_type}
        else:
            effective.pop(key, None)
    plan = db.query(AccessPlan).filter(AccessPlan.id == assignment.plan_id).first() if assignment else None
    return {
        "plan": ({"id": plan.id, "code": plan.code, "name": plan.name} if plan else None),
        "starts_at": assignment.starts_at if assignment else None,
        "ends_at": assignment.ends_at if assignment else None,
        "entitlements": list(effective.values()),
    }
