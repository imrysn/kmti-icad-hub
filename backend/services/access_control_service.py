"""Compatibility-safe role, Admin-area, and permission foundations.

The legacy ``users.role`` value remains supported while users are migrated to
the normalized access model. All writes in this module are idempotent.
"""

from datetime import datetime, timezone
from sqlalchemy.orm import Session

from ..models import (
    AdminAreaGrant,
    Permission,
    Role,
    RolePermission,
    User,
    UserPermissionGrant,
    UserRole,
)


ROLE_DEFINITIONS = {
    "learner": ("Learner", "Uses entitled training and submits own work."),
    "instructor": ("Instructor", "Teaches and reviews assigned learners."),
    "admin": ("Admin", "Uses explicitly granted Admin Panel areas."),
}

ADMIN_AREAS = {"content", "organization", "platform"}

PERMISSION_DEFINITIONS = {
    "course.view_entitled": "View published learning resources granted by a plan.",
    "submission.create_own": "Create and view the learner's own submissions.",
    "submission.review_assigned": "Review submissions for assigned learners.",
    "admin.area.content.access": "Open and use the Content Editor Admin page.",
    "admin.area.organization.access": "Open and use the Organization Admin page.",
    "admin.area.platform.access": "Open and use the Platform Admin page.",
    "admin.area.platform.assign": "Grant or revoke Platform-area access.",
    "registration.review": "Review registration applications.",
    "registration.approve": "Approve or reject registration applications.",
    "user.read": "View organization user records.",
    "user.manage": "Create, update, suspend, or reactivate users.",
    "role.assign": "Assign Learner, Instructor, or Admin roles.",
    "plan.read": "View access plans and assignments.",
    "plan.manage": "Configure access plans and entitlements.",
    "plan.assign": "Assign an access plan to a learner.",
    "content.edit": "Create or edit draft learning content.",
    "content.publish": "Publish reviewed learning content.",
    "audit.read_security": "View security audit events.",
    "platform.configure": "Change platform-level technical configuration.",
}

ROLE_PERMISSION_CODES = {
    "learner": {"course.view_entitled", "submission.create_own"},
    "instructor": {"course.view_entitled", "submission.review_assigned"},
    # Admin capabilities are intentionally supplied by area grants rather than
    # granting every administrator unrestricted access.
    "admin": set(),
}

AREA_PERMISSION_CODES = {
    "content": {"admin.area.content.access", "content.edit"},
    "organization": {
        "admin.area.organization.access",
        "registration.review",
        "registration.approve",
        "user.read",
        "user.manage",
        "role.assign",
        "plan.read",
        "plan.manage",
        "plan.assign",
    },
    "platform": {
        "admin.area.platform.access",
        "audit.read_security",
        "platform.configure",
    },
}

LEGACY_ROLE_MAP = {"trainee": "learner", "employee": "instructor", "admin": "admin"}


def seed_access_foundation(db: Session) -> None:
    """Seed stable roles, permissions, and role-permission mappings."""
    roles: dict[str, Role] = {}
    for code, (name, description) in ROLE_DEFINITIONS.items():
        role = db.query(Role).filter(Role.code == code).first()
        if role is None:
            role = Role(code=code, name=name, description=description, is_system=True)
            db.add(role)
            db.flush()
        roles[code] = role

    permissions: dict[str, Permission] = {}
    for code, description in PERMISSION_DEFINITIONS.items():
        permission = db.query(Permission).filter(Permission.code == code).first()
        if permission is None:
            permission = Permission(code=code, description=description)
            db.add(permission)
            db.flush()
        permissions[code] = permission

    for role_code, permission_codes in ROLE_PERMISSION_CODES.items():
        for permission_code in permission_codes:
            exists = db.query(RolePermission).filter(
                RolePermission.role_id == roles[role_code].id,
                RolePermission.permission_id == permissions[permission_code].id,
            ).first()
            if exists is None:
                db.add(RolePermission(
                    role_id=roles[role_code].id,
                    permission_id=permissions[permission_code].id,
                ))
    db.flush()


def sync_legacy_user_access(db: Session, user: User) -> None:
    """Create normalized grants matching a legacy user without broadening access."""
    seed_access_foundation(db)
    role_code = LEGACY_ROLE_MAP.get(user.role)
    if role_code is None:
        return

    role = db.query(Role).filter(Role.code == role_code).one()
    active_role = db.query(UserRole).filter(
        UserRole.user_id == user.id,
        UserRole.role_id == role.id,
        UserRole.revoked_at.is_(None),
    ).first()
    if active_role is None:
        db.add(UserRole(
            user_id=user.id,
            role_id=role.id,
            granted_at=datetime.now(timezone.utc),
            reason=f"Compatibility migration from legacy role '{user.role}'",
        ))

    # Legacy admins receive Organization only. Platform access is never seeded.
    if role_code == "admin":
        active_area = db.query(AdminAreaGrant).filter(
            AdminAreaGrant.user_id == user.id,
            AdminAreaGrant.area_code == "organization",
            AdminAreaGrant.revoked_at.is_(None),
        ).first()
        if active_area is None:
            db.add(AdminAreaGrant(
                user_id=user.id,
                area_code="organization",
                granted_at=datetime.now(timezone.utc),
                reason="Default compatibility access for legacy admin",
            ))
    db.flush()


def sync_all_legacy_users(db: Session) -> None:
    seed_access_foundation(db)
    for user in db.query(User).all():
        sync_legacy_user_access(db, user)


def get_active_role_codes(db: Session, user: User) -> set[str]:
    rows = db.query(Role.code).join(UserRole, UserRole.role_id == Role.id).filter(
        UserRole.user_id == user.id,
        UserRole.revoked_at.is_(None),
    ).all()
    codes = {row[0] for row in rows}
    if not codes and user.role in LEGACY_ROLE_MAP:
        codes.add(LEGACY_ROLE_MAP[user.role])
    return codes


def get_active_admin_areas(db: Session, user: User) -> set[str]:
    rows = db.query(AdminAreaGrant.area_code).filter(
        AdminAreaGrant.user_id == user.id,
        AdminAreaGrant.revoked_at.is_(None),
    ).all()
    areas = {row[0] for row in rows if row[0] in ADMIN_AREAS}
    # Read-only compatibility fallback until the migration has synchronized a
    # legacy admin. It intentionally grants Organization, never Platform.
    if not areas and user.role == "admin":
        areas.add("organization")
    return areas


def get_effective_permissions(db: Session, user: User) -> set[str]:
    permissions: set[str] = set()
    role_codes = get_active_role_codes(db, user)
    persisted_role_permissions = db.query(Permission.code).join(
        RolePermission, RolePermission.permission_id == Permission.id
    ).join(Role, Role.id == RolePermission.role_id).filter(
        Role.code.in_(role_codes)
    ).all() if role_codes else []
    permissions.update(row[0] for row in persisted_role_permissions)
    # Compatibility for a database that has legacy users but has not yet run
    # the access seed/migration. Once seeded, the persisted mapping is used.
    if not persisted_role_permissions:
        for role_code in role_codes:
            permissions.update(ROLE_PERMISSION_CODES.get(role_code, set()))
    for area_code in get_active_admin_areas(db, user):
        permissions.update(AREA_PERMISSION_CODES.get(area_code, set()))

    overrides = db.query(UserPermissionGrant, Permission.code).join(
        Permission, Permission.id == UserPermissionGrant.permission_id
    ).filter(
        UserPermissionGrant.user_id == user.id,
        UserPermissionGrant.revoked_at.is_(None),
    ).order_by(UserPermissionGrant.granted_at.asc()).all()
    for grant, code in overrides:
        if grant.effect == "deny":
            permissions.discard(code)
        elif grant.effect == "allow":
            permissions.add(code)
    return permissions


def user_has_permission(db: Session, user: User, permission_code: str) -> bool:
    return permission_code in get_effective_permissions(db, user)


def user_has_admin_area(db: Session, user: User, area_code: str) -> bool:
    return area_code in get_active_admin_areas(db, user)
