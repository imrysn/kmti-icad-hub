import json
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from ...auth.dependencies import require_permission
from ...database import get_db
from ...models import AccessPlan, AuditEvent, RegistrationApplication, Role, User, UserPlanAssignment, UserRole
from ...schemas import RegistrationApplicationResponse, RegistrationReviewRequest


router = APIRouter()


def _serialize(db: Session, application: RegistrationApplication) -> RegistrationApplicationResponse:
    user = db.query(User).filter(User.id == application.user_id).one()
    requested = db.query(AccessPlan).filter(AccessPlan.id == application.requested_plan_id).first()
    assigned = db.query(AccessPlan).filter(AccessPlan.id == application.assigned_plan_id).first() if application.assigned_plan_id else None
    return RegistrationApplicationResponse(
        id=application.id, user_id=user.id, email=user.email, full_name=user.full_name,
        company_name=application.company_name, department=application.department,
        job_title=application.job_title, country_code=application.country_code,
        reason_for_access=application.reason_for_access,
        requested_plan_id=application.requested_plan_id, assigned_plan_id=application.assigned_plan_id,
        requested_plan_name=requested.name if requested else None,
        assigned_plan_name=assigned.name if assigned else None,
        status=application.status, submitted_at=application.submitted_at,
        email_verified_at=application.email_verified_at, reviewed_at=application.reviewed_at,
        internal_review_notes=application.internal_review_notes,
        applicant_message=application.applicant_message, version=application.version,
    )


def _pending_application(db: Session, application_id: int, version: int) -> RegistrationApplication:
    application = db.query(RegistrationApplication).filter(RegistrationApplication.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Registration application not found")
    if application.status != "pending_approval":
        raise HTTPException(status_code=409, detail="Registration application is no longer pending")
    if application.version != version:
        raise HTTPException(status_code=409, detail="Registration application was updated by another administrator")
    return application


@router.get("/registration-applications", response_model=list[RegistrationApplicationResponse])
def list_registration_applications(
    application_status: str | None = Query(default=None, alias="status"),
    db: Session = Depends(get_db),
    _: User = Depends(require_permission("registration.review")),
):
    query = db.query(RegistrationApplication)
    if application_status:
        query = query.filter(RegistrationApplication.status == application_status)
    return [_serialize(db, item) for item in query.order_by(RegistrationApplication.submitted_at.desc()).all()]


@router.get("/registration-applications/{application_id}", response_model=RegistrationApplicationResponse)
def get_registration_application(
    application_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(require_permission("registration.review")),
):
    application = db.query(RegistrationApplication).filter(RegistrationApplication.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Registration application not found")
    return _serialize(db, application)


@router.post("/registration-applications/{application_id}/approve", response_model=RegistrationApplicationResponse)
def approve_registration(
    application_id: int,
    payload: RegistrationReviewRequest,
    db: Session = Depends(get_db),
    admin: User = Depends(require_permission("registration.approve")),
):
    application = _pending_application(db, application_id, payload.version)
    plan_id = payload.assigned_plan_id or application.requested_plan_id
    plan = db.query(AccessPlan).filter(AccessPlan.id == plan_id, AccessPlan.is_active.is_(True)).first()
    if not plan:
        raise HTTPException(status_code=400, detail="Assigned access plan is unavailable")
    now = datetime.now(timezone.utc)
    user = db.query(User).filter(User.id == application.user_id).one()
    user.is_active = True
    user.account_status = "active"
    user.approved_at = now
    user.approved_by_user_id = admin.id
    application.status = "approved"
    application.assigned_plan_id = plan.id
    application.reviewed_at = now
    application.reviewed_by_user_id = admin.id
    application.internal_review_notes = payload.internal_reason
    application.applicant_message = payload.applicant_message
    application.version += 1
    db.add(UserPlanAssignment(user_id=user.id, plan_id=plan.id, starts_at=now, status="active", assigned_by_user_id=admin.id, reason=payload.internal_reason or "Registration approved"))
    learner_role = db.query(Role).filter(Role.code == "learner").first()
    if learner_role and not db.query(UserRole).filter(UserRole.user_id == user.id, UserRole.role_id == learner_role.id, UserRole.revoked_at.is_(None)).first():
        db.add(UserRole(user_id=user.id, role_id=learner_role.id, granted_by_user_id=admin.id, reason="Registration approved"))
    db.add(AuditEvent(actor_user_id=admin.id, action="registration.approved", target_type="registration_application", target_id=str(application.id), metadata_json=json.dumps({"assigned_plan_id": plan.id})))
    db.commit()
    return _serialize(db, application)


@router.post("/registration-applications/{application_id}/reject", response_model=RegistrationApplicationResponse)
def reject_registration(
    application_id: int,
    payload: RegistrationReviewRequest,
    db: Session = Depends(get_db),
    admin: User = Depends(require_permission("registration.approve")),
):
    application = _pending_application(db, application_id, payload.version)
    now = datetime.now(timezone.utc)
    user = db.query(User).filter(User.id == application.user_id).one()
    user.is_active = False
    user.account_status = "rejected"
    application.status = "rejected"
    application.reviewed_at = now
    application.reviewed_by_user_id = admin.id
    application.internal_review_notes = payload.internal_reason
    application.applicant_message = payload.applicant_message
    application.version += 1
    db.add(AuditEvent(actor_user_id=admin.id, action="registration.rejected", target_type="registration_application", target_id=str(application.id)))
    db.commit()
    return _serialize(db, application)
