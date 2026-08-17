import hashlib
import json
import os
import secrets
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from ..auth.security import hash_password
from ..database import get_db
from ..models import AccessPlan, AuditEvent, EmailVerificationToken, RegistrationApplication, User
from ..schemas import EmailVerificationRequest, RegistrationCreate, RegistrationSubmissionResponse
from ..schemas import VerificationResendRequest
from ..services.email_service import queue_verification_email


router = APIRouter(prefix="/registrations", tags=["Registrations"])
GENERIC_SUBMISSION_MESSAGE = "If the application can be accepted, verification instructions will be sent to the supplied email address."


def _token_hash(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


@router.post("", response_model=RegistrationSubmissionResponse, status_code=status.HTTP_202_ACCEPTED)
def submit_registration(payload: RegistrationCreate, db: Session = Depends(get_db)):
    if not payload.privacy_accepted or not payload.terms_accepted:
        raise HTTPException(status_code=422, detail="Privacy policy and terms must be accepted")

    email = str(payload.email).strip().lower()
    duplicate = db.query(User).filter(or_(User.username == payload.username.strip(), User.email == email)).first()
    if duplicate:
        return RegistrationSubmissionResponse(message=GENERIC_SUBMISSION_MESSAGE)

    plan = db.query(AccessPlan).filter(
        AccessPlan.id == payload.requested_plan_id,
        AccessPlan.is_active.is_(True),
        AccessPlan.is_publicly_requestable.is_(True),
    ).first()
    if not plan:
        raise HTTPException(status_code=400, detail="The selected access plan is unavailable")

    now = datetime.now(timezone.utc)
    user = User(
        username=payload.username.strip(),
        email=email,
        hashed_password=hash_password(payload.password),
        full_name=payload.full_name.strip(),
        role="trainee",
        is_active=False,
        account_status="email_verification_pending",
        preferred_language=payload.preferred_language,
        timezone=payload.timezone,
        created_at=now,
    )
    db.add(user)
    db.flush()
    application = RegistrationApplication(
        user_id=user.id,
        email_normalized=email,
        company_name=payload.company_name,
        department=payload.department,
        job_title=payload.job_title,
        country_code=payload.country_code.upper() if payload.country_code else None,
        reason_for_access=payload.reason_for_access,
        requested_plan_id=plan.id,
        status="email_verification_pending",
        submitted_at=now,
        privacy_policy_version=payload.privacy_policy_version,
        privacy_consented_at=now,
        terms_version=payload.terms_version,
        terms_accepted_at=now,
    )
    db.add(application)
    db.flush()
    raw_token = secrets.token_urlsafe(32)
    db.add(EmailVerificationToken(
        application_id=application.id,
        token_hash=_token_hash(raw_token),
        expires_at=now + timedelta(hours=24),
    ))
    queue_verification_email(db, user, application, raw_token)
    db.add(AuditEvent(
        action="registration.submitted",
        target_type="registration_application",
        target_id=str(application.id),
        metadata_json=json.dumps({"requested_plan_id": plan.id}),
    ))
    db.commit()

    # Until transactional email is connected, local development exposes the
    # token so the verification workflow can be tested. Production never does.
    is_development = os.getenv("ENVIRONMENT", "development").lower() == "development"
    return RegistrationSubmissionResponse(
        message=GENERIC_SUBMISSION_MESSAGE,
        application_id=application.id if is_development else None,
        verification_token=raw_token if is_development else None,
    )


@router.post("/resend-verification", response_model=RegistrationSubmissionResponse, status_code=status.HTTP_202_ACCEPTED)
def resend_verification(payload: VerificationResendRequest, db: Session = Depends(get_db)):
    email = str(payload.email).strip().lower()
    application = db.query(RegistrationApplication).filter(
        RegistrationApplication.email_normalized == email,
        RegistrationApplication.status == "email_verification_pending",
    ).order_by(RegistrationApplication.submitted_at.desc()).first()
    if not application:
        return RegistrationSubmissionResponse(message=GENERIC_SUBMISSION_MESSAGE)

    now = datetime.now(timezone.utc)
    recent_count = db.query(EmailVerificationToken).filter(
        EmailVerificationToken.application_id == application.id,
        EmailVerificationToken.created_at >= now - timedelta(hours=1),
    ).count()
    if recent_count >= 3:
        return RegistrationSubmissionResponse(message=GENERIC_SUBMISSION_MESSAGE)

    user = db.query(User).filter(User.id == application.user_id).one()
    db.query(EmailVerificationToken).filter(
        EmailVerificationToken.application_id == application.id,
        EmailVerificationToken.used_at.is_(None),
    ).update({EmailVerificationToken.used_at: now}, synchronize_session=False)
    raw_token = secrets.token_urlsafe(32)
    db.add(EmailVerificationToken(
        application_id=application.id,
        token_hash=_token_hash(raw_token),
        expires_at=now + timedelta(hours=24),
    ))
    queue_verification_email(db, user, application, raw_token)
    db.add(AuditEvent(action="registration.verification_resent", target_type="registration_application", target_id=str(application.id)))
    db.commit()
    is_development = os.getenv("ENVIRONMENT", "development").lower() == "development"
    return RegistrationSubmissionResponse(
        message=GENERIC_SUBMISSION_MESSAGE,
        application_id=application.id if is_development else None,
        verification_token=raw_token if is_development else None,
    )


@router.post("/verify-email")
def verify_registration_email(payload: EmailVerificationRequest, db: Session = Depends(get_db)):
    now = datetime.now(timezone.utc)
    verification = db.query(EmailVerificationToken).filter(
        EmailVerificationToken.token_hash == _token_hash(payload.token),
        EmailVerificationToken.used_at.is_(None),
    ).first()
    if not verification or verification.expires_at.replace(tzinfo=timezone.utc) <= now:
        raise HTTPException(status_code=400, detail="Verification link is invalid or expired")

    application = db.query(RegistrationApplication).filter(RegistrationApplication.id == verification.application_id).first()
    if not application or application.status != "email_verification_pending":
        raise HTTPException(status_code=400, detail="Verification link is invalid or expired")
    user = db.query(User).filter(User.id == application.user_id).one()
    verification.used_at = now
    application.email_verified_at = now
    application.status = "pending_approval"
    application.version += 1
    user.email_verified_at = now
    user.account_status = "pending_approval"
    db.add(AuditEvent(action="registration.email_verified", target_type="registration_application", target_id=str(application.id)))
    db.commit()
    return {"message": "Email verified. Your application is pending administrator approval."}
