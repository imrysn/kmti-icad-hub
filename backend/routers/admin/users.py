from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...database import get_db
from datetime import datetime
import json
from ...models import AdminAreaGrant, AuditEvent, Permission, Role, User, UserPermissionGrant, UserRole, SystemLog
from ...schemas import AdminPermissionItem, AdminUserAccessResponse, AdminUserAccessUpdate, AdminUserPermissionsResponse, AdminUserPermissionsUpdate, UserCreateAdmin, UserUpdate, UserResponse
from ...auth.dependencies import require_permission
from ...auth.security import hash_password, verify_password
from ...identity import normalize_email_address
from ...services.access_control_service import AREA_PERMISSION_CODES, PERMISSION_DEFINITIONS, can_assign_platform_area, get_active_admin_areas, get_active_role_codes, get_effective_permissions, manageable_permissions_for_areas, permission_area, seed_access_foundation, sync_legacy_user_access

router = APIRouter()

LEGACY_ROLE_BY_CODE = {"learner": "trainee", "instructor": "employee", "admin": "admin"}


def _user_or_404(db: Session, user_id: int) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def _access_response(db: Session, user: User) -> AdminUserAccessResponse:
    roles = get_active_role_codes(db, user)
    role_code = next(iter(sorted(roles)), "learner")
    return AdminUserAccessResponse(user_id=user.id, role_code=role_code, admin_areas=sorted(get_active_admin_areas(db, user)), account_status=user.account_status, is_active=user.is_active)


@router.get("/users/{user_id}/access", response_model=AdminUserAccessResponse)
def get_user_access(user_id: int, db: Session = Depends(get_db), _: User = Depends(require_permission("user.read"))):
    user = _user_or_404(db, user_id); sync_legacy_user_access(db, user); db.commit()
    return _access_response(db, user)


@router.put("/users/{user_id}/access", response_model=AdminUserAccessResponse)
def update_user_access(user_id: int, payload: AdminUserAccessUpdate, db: Session = Depends(get_db), admin: User = Depends(require_permission("role.assign"))):
    target = _user_or_404(db, user_id); seed_access_foundation(db); sync_legacy_user_access(db, target)
    before_roles = get_active_role_codes(db, target); before_areas = get_active_admin_areas(db, target)
    before_status = target.account_status
    desired_areas = set(payload.admin_areas)
    if payload.role_code != "admin" and desired_areas:
        raise HTTPException(status_code=422, detail="Only Admin accounts may receive Admin Panel areas")
    if target.id == admin.id and ({payload.role_code} != before_roles or desired_areas != before_areas or payload.account_status != before_status):
        raise HTTPException(status_code=400, detail="You cannot change your own role, Admin areas, or account status")
    if not verify_password(payload.reauth_password, admin.hashed_password):
        db.add(AuditEvent(
            actor_user_id=admin.id,
            action="user.access_reauthentication_failed",
            target_type="user",
            target_id=str(target.id),
            result="denied",
            metadata_json=json.dumps({"reason": payload.reason}),
        ))
        db.commit()
        raise HTTPException(status_code=403, detail="Re-authentication failed")
    if ("platform" in desired_areas) != ("platform" in before_areas) and not can_assign_platform_area(db, admin):
        raise HTTPException(status_code=403, detail="Platform-area grant authority is required")
    if "platform" in before_areas and "platform" not in desired_areas:
        other_platform_admins = db.query(AdminAreaGrant.id).filter(AdminAreaGrant.area_code == "platform", AdminAreaGrant.revoked_at.is_(None), AdminAreaGrant.user_id != target.id).count()
        if other_platform_admins == 0:
            raise HTTPException(status_code=409, detail="The final Platform administrator cannot be removed")

    now = datetime.utcnow()
    desired_role = db.query(Role).filter(Role.code == payload.role_code).one()
    for grant in db.query(UserRole).filter(UserRole.user_id == target.id, UserRole.revoked_at.is_(None)).all():
        if grant.role_id != desired_role.id:
            grant.revoked_at = now; grant.reason = payload.reason
    if db.query(UserRole).filter(UserRole.user_id == target.id, UserRole.role_id == desired_role.id, UserRole.revoked_at.is_(None)).first() is None:
        db.add(UserRole(user_id=target.id, role_id=desired_role.id, granted_at=now, granted_by_user_id=admin.id, reason=payload.reason))

    active_area_rows = db.query(AdminAreaGrant).filter(AdminAreaGrant.user_id == target.id, AdminAreaGrant.revoked_at.is_(None)).all()
    active_area_codes = {row.area_code for row in active_area_rows}
    for grant in active_area_rows:
        if grant.area_code not in desired_areas:
            grant.revoked_at = now; grant.reason = payload.reason
    for area in desired_areas - active_area_codes:
        db.add(AdminAreaGrant(user_id=target.id, area_code=area, granted_at=now, granted_by_user_id=admin.id, reason=payload.reason))

    target.role = LEGACY_ROLE_BY_CODE[payload.role_code]
    target.account_status = payload.account_status
    target.is_active = payload.account_status == "active"
    db.add(AuditEvent(actor_user_id=admin.id, action="user.access_updated", target_type="user", target_id=str(target.id), result="success", metadata_json=json.dumps({
        "before": {"roles": sorted(before_roles), "admin_areas": sorted(before_areas), "account_status": before_status},
        "after": {"roles": [payload.role_code], "admin_areas": sorted(desired_areas), "account_status": payload.account_status},
        "reason": payload.reason,
    })))
    db.commit(); db.refresh(target); return _access_response(db, target)


def _permissions_response(db: Session, target: User) -> AdminUserPermissionsResponse:
    manageable = manageable_permissions_for_areas(get_active_admin_areas(db, target))
    effective = get_effective_permissions(db, target)
    items = [AdminPermissionItem(code=code, description=PERMISSION_DEFINITIONS[code], area=permission_area(code), enabled=code in effective) for code in sorted(manageable)]
    return AdminUserPermissionsResponse(user_id=target.id, permissions=items)


@router.get("/users/{user_id}/permissions", response_model=AdminUserPermissionsResponse)
def get_user_permissions(user_id: int, db: Session = Depends(get_db), _: User = Depends(require_permission("user.read"))):
    target = _user_or_404(db, user_id); seed_access_foundation(db); sync_legacy_user_access(db, target); db.commit()
    return _permissions_response(db, target)


@router.put("/users/{user_id}/permissions", response_model=AdminUserPermissionsResponse)
def update_user_permissions(user_id: int, payload: AdminUserPermissionsUpdate, db: Session = Depends(get_db), admin: User = Depends(require_permission("role.assign"))):
    target = _user_or_404(db, user_id); seed_access_foundation(db); sync_legacy_user_access(db, target); db.flush()
    if target.id == admin.id:
        raise HTTPException(status_code=400, detail="You cannot change your own permissions")
    if not verify_password(payload.reauth_password, admin.hashed_password):
        db.add(AuditEvent(actor_user_id=admin.id, action="user.permission_reauthentication_failed", target_type="user", target_id=str(target.id), result="denied", metadata_json=json.dumps({"reason": payload.reason})))
        db.commit(); raise HTTPException(status_code=403, detail="Re-authentication failed")
    target_areas = get_active_admin_areas(db, target)
    manageable = manageable_permissions_for_areas(target_areas)
    requested = set(payload.enabled_codes)
    unknown = requested - manageable
    if unknown:
        raise HTTPException(status_code=422, detail=f"Permissions are outside the target's assigned Admin areas: {', '.join(sorted(unknown))}")
    actor_manageable = manageable_permissions_for_areas(get_active_admin_areas(db, admin))
    changed = {code for code in manageable if (code in get_effective_permissions(db, target)) != (code in requested)}
    if changed - actor_manageable:
        raise HTTPException(status_code=403, detail="You cannot manage permissions outside your own Admin areas")
    now = datetime.utcnow()
    active = db.query(UserPermissionGrant).filter(UserPermissionGrant.user_id == target.id, UserPermissionGrant.revoked_at.is_(None)).all()
    for grant in active:
        permission = db.query(Permission).filter(Permission.id == grant.permission_id).one()
        if permission.code in changed:
            grant.revoked_at = now; grant.reason = payload.reason
    base = set().union(*(AREA_PERMISSION_CODES.get(area, set()) for area in target_areas))
    for code in changed:
        effect = "allow" if code in requested and code not in base else "deny"
        if code in requested and code in base:
            continue
        permission = db.query(Permission).filter(Permission.code == code).one()
        db.add(UserPermissionGrant(user_id=target.id, permission_id=permission.id, effect=effect, granted_by_user_id=admin.id, reason=payload.reason))
    db.add(AuditEvent(actor_user_id=admin.id, action="user.permissions_updated", target_type="user", target_id=str(target.id), result="success", metadata_json=json.dumps({"enabled_codes": sorted(requested), "changed_codes": sorted(changed), "reason": payload.reason})))
    db.commit(); return _permissions_response(db, target)

@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(require_permission("user.manage"))
):
    """Permanently delete a user. Admin only."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.id == admin.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
        
    # Log the deletion
    log_entry = SystemLog(
        level="WARNING",
        message=f"Admin {admin.username} deleted user {user.username}",
        context="USER_MGMT",
        user_id=admin.id
    )
    db.add(log_entry)
    
    db.delete(user)
    db.commit()
    
    return {"message": f"User {user_id} deleted successfully"}


@router.post("/users", response_model=UserResponse)
def create_user_as_admin(
    user_data: UserCreateAdmin,
    db: Session = Depends(get_db),
    admin: User = Depends(require_permission("user.manage"))
):
    """Admin-only endpoint to create users with direct role assignment."""
    # Check for existing user
    if db.query(User).filter(User.username == user_data.username).first():
        raise HTTPException(status_code=400, detail="Username already registered")
    user_email = str(user_data.email) if user_data.email else f"{user_data.username.lower().replace(' ', '')}@kmtihub.local"
    normalized_email = normalize_email_address(user_email)
    if db.query(User).filter(User.email_normalized == normalized_email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        username=user_data.username,
        email=user_email.strip(),
        email_normalized=normalized_email,
        hashed_password=hash_password(user_data.password),
        full_name=user_data.full_name,
        role=user_data.role,
        is_active=True
    )
    
    db.add(new_user)
    db.flush()
    sync_legacy_user_access(db, new_user)
    
    # Log creation
    log_entry = SystemLog(
        level="INFO",
        message=f"Admin {admin.username} created user {new_user.username} as {new_user.role}",
        context="USER_MGMT",
        user_id=admin.id
    )
    db.add(log_entry)
    db.commit()
    db.refresh(new_user)
    
    return new_user


@router.put("/users/{user_id}", response_model=UserResponse)
def update_user_as_admin(
    user_id: int,
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_permission("user.manage"))
):
    """Admin-only endpoint to update user details."""
    print("DEBUG UserUpdate:", user_update.model_dump())
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update basic fields
    if user_update.username is not None and user_update.username != user.username:
        if db.query(User).filter(User.username == user_update.username).first():
            raise HTTPException(status_code=400, detail="Username already registered")
        user.username = user_update.username
    if user_update.email is not None:
        normalized_email = normalize_email_address(str(user_update.email))
        duplicate_email = db.query(User).filter(
            User.email_normalized == normalized_email,
            User.id != user.id,
        ).first()
        if duplicate_email:
            raise HTTPException(status_code=400, detail="Email already registered")
        user.email = str(user_update.email).strip()
        user.email_normalized = normalized_email
    if user_update.full_name is not None:
        user.full_name = user_update.full_name
    if user_update.role is not None and user_update.role != user.role:
        raise HTTPException(status_code=422, detail="Use the access-management control to change roles")
    if user_update.is_active is not None and user_update.is_active != user.is_active:
        raise HTTPException(status_code=422, detail="Use the access-management control to suspend or reactivate accounts")
    
    # Handle password update separately (re-hash)
    if user_update.password:
        user.hashed_password = hash_password(user_update.password)

    # Log update
    log_entry = SystemLog(
        level="INFO",
        message=f"Admin {admin.username} updated user {user.username} details",
        context="USER_MGMT",
        user_id=admin.id
    )
    db.add(log_entry)
    db.commit()
    db.refresh(user)
    
    return user
