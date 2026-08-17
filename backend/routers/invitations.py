import hashlib
import json
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session

from ..auth.security import hash_password
from ..database import get_db
from ..models import AccountInvitation, AccountInvitationPlan, AccountInvitationRole, AccessPlan, AdminAreaGrant, AuditEvent, Role, User, UserPlanAssignment, UserRole
from ..schemas import InvitationAcceptRequest, InvitationValidateResponse

router = APIRouter(prefix="/invitations", tags=["Invitations"])


def _invitation(db: Session, token: str) -> tuple[AccountInvitation, Role, AccountInvitationPlan | None, AccessPlan | None]:
    invitation = db.query(AccountInvitation).filter(AccountInvitation.token_hash == hashlib.sha256(token.encode()).hexdigest()).first()
    now = datetime.now(timezone.utc)
    if not invitation or invitation.status != "pending":
        raise HTTPException(status_code=400, detail="Invitation is invalid or no longer available")
    expires = invitation.expires_at.replace(tzinfo=timezone.utc) if invitation.expires_at.tzinfo is None else invitation.expires_at
    if expires <= now:
        invitation.status = "expired"; db.commit()
        raise HTTPException(status_code=400, detail="Invitation is invalid or no longer available")
    role = db.query(Role).join(AccountInvitationRole, AccountInvitationRole.role_id == Role.id).filter(AccountInvitationRole.invitation_id == invitation.id).one()
    plan_row = db.query(AccountInvitationPlan).filter(AccountInvitationPlan.invitation_id == invitation.id).first()
    plan = db.query(AccessPlan).filter(AccessPlan.id == plan_row.plan_id).first() if plan_row else None
    return invitation, role, plan_row, plan


@router.get("/validate", response_model=InvitationValidateResponse)
def validate_invitation(token: str = Query(min_length=20), db: Session = Depends(get_db)):
    invitation, role, _, plan = _invitation(db, token)
    return InvitationValidateResponse(email=invitation.email_normalized, full_name=invitation.full_name, role_code=role.code, plan_name=plan.name if plan else None, admin_areas=json.loads(invitation.admin_area_codes_json or "[]"), expires_at=invitation.expires_at)


@router.post("/accept")
def accept_invitation(payload: InvitationAcceptRequest, db: Session = Depends(get_db)):
    if not payload.privacy_accepted or not payload.terms_accepted:
        raise HTTPException(status_code=422, detail="Privacy policy and terms must be accepted")
    invitation, role, plan_row, plan = _invitation(db, payload.token)
    if db.query(User).filter(or_(User.email == invitation.email_normalized, User.username == payload.username.strip())).first():
        raise HTTPException(status_code=409, detail="The invitation cannot be accepted with these account details")
    now = datetime.now(timezone.utc)
    legacy_role = {"learner": "trainee", "instructor": "employee", "admin": "admin"}[role.code]
    user = User(username=payload.username.strip(), email=invitation.email_normalized, hashed_password=hash_password(payload.password), full_name=invitation.full_name, role=legacy_role, is_active=True, account_status="active", email_verified_at=now, approved_at=now, approved_by_user_id=invitation.invited_by_user_id, preferred_language=invitation.preferred_language, created_at=now)
    db.add(user); db.flush()
    db.add(UserRole(user_id=user.id, role_id=role.id, granted_by_user_id=invitation.invited_by_user_id, reason="Accepted administrator invitation"))
    for area in json.loads(invitation.admin_area_codes_json or "[]"):
        db.add(AdminAreaGrant(user_id=user.id, area_code=area, granted_by_user_id=invitation.invited_by_user_id, reason="Accepted administrator invitation"))
    if plan_row and plan:
        db.add(UserPlanAssignment(user_id=user.id, plan_id=plan.id, starts_at=plan_row.starts_at, ends_at=plan_row.ends_at, status="active", assigned_by_user_id=invitation.invited_by_user_id, reason="Accepted administrator invitation"))
    invitation.status = "accepted"; invitation.accepted_at = now
    db.add(AuditEvent(actor_user_id=user.id, action="invitation.accepted", target_type="account_invitation", target_id=str(invitation.id), metadata_json=json.dumps({"role": role.code})))
    db.commit()
    return {"message": "Invitation accepted. You can now sign in.", "username": user.username}
