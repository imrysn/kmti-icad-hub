import hashlib
import json
import os
import secrets
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ...auth.dependencies import require_permission
from ...database import get_db
from ...models import AccountInvitation, AccountInvitationPlan, AccountInvitationRole, AccessPlan, AuditEvent, Role, User
from ...schemas import InvitationCreate, InvitationResponse
from ...services.access_control_service import can_assign_platform_area
from ...services.email_service import queue_invitation_email

router = APIRouter()


def _hash(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def _serialize(db: Session, invitation: AccountInvitation, token: str | None = None) -> InvitationResponse:
    role = db.query(Role).join(AccountInvitationRole, AccountInvitationRole.role_id == Role.id).filter(AccountInvitationRole.invitation_id == invitation.id).one()
    plan_row = db.query(AccountInvitationPlan).filter(AccountInvitationPlan.invitation_id == invitation.id).first()
    plan = db.query(AccessPlan).filter(AccessPlan.id == plan_row.plan_id).first() if plan_row else None
    return InvitationResponse(
        id=invitation.id, email=invitation.email_normalized, full_name=invitation.full_name,
        role_code=role.code, preferred_language=invitation.preferred_language, status=invitation.status,
        plan_id=plan.id if plan else None, plan_name=plan.name if plan else None,
        admin_areas=json.loads(invitation.admin_area_codes_json or "[]"), expires_at=invitation.expires_at,
        accepted_at=invitation.accepted_at, created_at=invitation.created_at,
        acceptance_token=token if os.getenv("ENVIRONMENT", "development").lower() == "development" else None,
    )


def _validate_payload(db: Session, payload: InvitationCreate, admin: User) -> tuple[Role, AccessPlan | None]:
    role = db.query(Role).filter(Role.code == payload.role_code).first()
    if not role:
        raise HTTPException(status_code=400, detail="Requested role is unavailable")
    plan = None
    if payload.role_code == "learner":
        if not payload.plan_id:
            raise HTTPException(status_code=422, detail="Learner invitations require an access plan")
        plan = db.query(AccessPlan).filter(AccessPlan.id == payload.plan_id, AccessPlan.is_active.is_(True)).first()
        if not plan:
            raise HTTPException(status_code=400, detail="Selected access plan is unavailable")
    elif payload.plan_id:
        raise HTTPException(status_code=422, detail="Only learner invitations may include an access plan")
    areas = set(payload.admin_areas)
    if payload.role_code == "admin" and not areas:
        raise HTTPException(status_code=422, detail="Admin invitations require at least one Admin Panel area")
    if payload.role_code != "admin" and areas:
        raise HTTPException(status_code=422, detail="Admin Panel areas require the Admin role")
    if "platform" in areas and not can_assign_platform_area(db, admin):
        raise HTTPException(status_code=403, detail="Platform-area invitations require explicit Platform grant permission")
    if payload.ends_at and payload.starts_at and payload.ends_at <= payload.starts_at:
        raise HTTPException(status_code=422, detail="Invitation plan end date must be after its start date")
    return role, plan


@router.get("/invitations", response_model=list[InvitationResponse])
def list_invitations(db: Session = Depends(get_db), _: User = Depends(require_permission("invitation.manage"))):
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    db.query(AccountInvitation).filter(AccountInvitation.status == "pending", AccountInvitation.expires_at <= now).update({AccountInvitation.status: "expired"}, synchronize_session=False)
    db.commit()
    return [_serialize(db, item) for item in db.query(AccountInvitation).order_by(AccountInvitation.created_at.desc()).all()]


@router.post("/invitations", response_model=InvitationResponse, status_code=201)
def create_invitation(payload: InvitationCreate, db: Session = Depends(get_db), admin: User = Depends(require_permission("invitation.manage"))):
    email = str(payload.email).strip().lower()
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=409, detail="An account already exists for this email")
    if db.query(AccountInvitation).filter(AccountInvitation.email_normalized == email, AccountInvitation.status == "pending").first():
        raise HTTPException(status_code=409, detail="A pending invitation already exists for this email")
    role, plan = _validate_payload(db, payload, admin)
    now = datetime.now(timezone.utc)
    raw = secrets.token_urlsafe(32)
    invitation = AccountInvitation(
        email_normalized=email, full_name=payload.full_name.strip(), preferred_language=payload.preferred_language,
        status="pending", token_hash=_hash(raw), admin_area_codes_json=json.dumps(sorted(set(payload.admin_areas))),
        invited_by_user_id=admin.id, expires_at=now + timedelta(days=payload.expires_in_days), created_at=now,
    )
    db.add(invitation); db.flush()
    db.add(AccountInvitationRole(invitation_id=invitation.id, role_id=role.id))
    if plan:
        db.add(AccountInvitationPlan(invitation_id=invitation.id, plan_id=plan.id, starts_at=payload.starts_at or now, ends_at=payload.ends_at))
    queue_invitation_email(db, invitation, raw, role.code, plan.name if plan else None)
    db.add(AuditEvent(actor_user_id=admin.id, action="invitation.created", target_type="account_invitation", target_id=str(invitation.id), metadata_json=json.dumps({"role": role.code, "plan_id": plan.id if plan else None, "admin_areas": payload.admin_areas})))
    db.commit(); db.refresh(invitation)
    return _serialize(db, invitation, raw)


@router.post("/invitations/{invitation_id}/resend", response_model=InvitationResponse)
def resend_invitation(invitation_id: int, db: Session = Depends(get_db), admin: User = Depends(require_permission("invitation.manage"))):
    invitation = db.query(AccountInvitation).filter(AccountInvitation.id == invitation_id).first()
    if not invitation or invitation.status != "pending":
        raise HTTPException(status_code=409, detail="Only pending invitations can be resent")
    raw = secrets.token_urlsafe(32)
    invitation.token_hash = _hash(raw)
    invitation.expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    role = db.query(Role).join(AccountInvitationRole, AccountInvitationRole.role_id == Role.id).filter(AccountInvitationRole.invitation_id == invitation.id).one()
    plan_row = db.query(AccountInvitationPlan).filter(AccountInvitationPlan.invitation_id == invitation.id).first()
    plan = db.query(AccessPlan).filter(AccessPlan.id == plan_row.plan_id).first() if plan_row else None
    queue_invitation_email(db, invitation, raw, role.code, plan.name if plan else None)
    db.add(AuditEvent(actor_user_id=admin.id, action="invitation.resent", target_type="account_invitation", target_id=str(invitation.id)))
    db.commit(); return _serialize(db, invitation, raw)


@router.post("/invitations/{invitation_id}/cancel", response_model=InvitationResponse)
def cancel_invitation(invitation_id: int, db: Session = Depends(get_db), admin: User = Depends(require_permission("invitation.manage"))):
    invitation = db.query(AccountInvitation).filter(AccountInvitation.id == invitation_id).first()
    if not invitation or invitation.status != "pending":
        raise HTTPException(status_code=409, detail="Only pending invitations can be cancelled")
    invitation.status = "cancelled"; invitation.cancelled_at = datetime.now(timezone.utc)
    db.add(AuditEvent(actor_user_id=admin.id, action="invitation.cancelled", target_type="account_invitation", target_id=str(invitation.id)))
    db.commit(); return _serialize(db, invitation)
