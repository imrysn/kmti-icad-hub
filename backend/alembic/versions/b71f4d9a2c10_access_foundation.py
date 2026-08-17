"""Add LMS access-foundation roles, Admin areas, and audit records.

Revision ID: b71f4d9a2c10
Revises: ea52b930dd73
Create Date: 2026-08-17

The repository's original baseline migration is intentionally empty and the
application historically created its schema with SQLAlchemy ``create_all``.
This migration therefore expects the legacy ``users`` table to exist. A full
schema baseline should be produced before hosted production deployment.
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "b71f4d9a2c10"
down_revision: Union[str, Sequence[str], None] = "ea52b930dd73"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


ROLE_ROWS = [
    {"code": "learner", "name": "Learner", "description": "Uses entitled training and submits own work.", "is_system": True},
    {"code": "instructor", "name": "Instructor", "description": "Teaches and reviews assigned learners.", "is_system": True},
    {"code": "admin", "name": "Admin", "description": "Uses explicitly granted Admin Panel areas.", "is_system": True},
]

PERMISSION_ROWS = [
    ("course.view_entitled", "View published learning resources granted by a plan."),
    ("submission.create_own", "Create and view the learner's own submissions."),
    ("submission.review_assigned", "Review submissions for assigned learners."),
    ("admin.area.content.access", "Open and use the Content Editor Admin page."),
    ("admin.area.organization.access", "Open and use the Organization Admin page."),
    ("admin.area.platform.access", "Open and use the Platform Admin page."),
    ("admin.area.platform.assign", "Grant or revoke Platform-area access."),
    ("registration.review", "Review registration applications."),
    ("registration.approve", "Approve or reject registration applications."),
    ("user.read", "View organization user records."),
    ("user.manage", "Create, update, suspend, or reactivate users."),
    ("role.assign", "Assign Learner, Instructor, or Admin roles."),
    ("plan.read", "View access plans and assignments."),
    ("plan.manage", "Configure access plans and entitlements."),
    ("plan.assign", "Assign an access plan to a learner."),
    ("content.edit", "Create or edit draft learning content."),
    ("content.publish", "Publish reviewed learning content."),
    ("audit.read_security", "View security audit events."),
    ("platform.configure", "Change platform-level technical configuration."),
]


def upgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    if "users" not in inspector.get_table_names():
        raise RuntimeError(
            "The legacy users table is missing. Stamp/apply the complete legacy "
            "schema baseline before running the access-foundation migration."
        )

    user_columns = {column["name"] for column in inspector.get_columns("users")}
    with op.batch_alter_table("users") as batch:
        if "account_status" not in user_columns:
            batch.add_column(sa.Column("account_status", sa.String(50), nullable=False, server_default="active"))
        if "email_verified_at" not in user_columns:
            batch.add_column(sa.Column("email_verified_at", sa.DateTime(), nullable=True))
        if "approved_at" not in user_columns:
            batch.add_column(sa.Column("approved_at", sa.DateTime(), nullable=True))
        if "approved_by_user_id" not in user_columns:
            batch.add_column(sa.Column("approved_by_user_id", sa.Integer(), nullable=True))
            batch.create_foreign_key("fk_users_approved_by", "users", ["approved_by_user_id"], ["id"])
        if "preferred_language" not in user_columns:
            batch.add_column(sa.Column("preferred_language", sa.String(10), nullable=False, server_default="en"))
        if "timezone" not in user_columns:
            batch.add_column(sa.Column("timezone", sa.String(100), nullable=False, server_default="Asia/Manila"))
    current_indexes = {index["name"] for index in sa.inspect(bind).get_indexes("users")}
    if "ix_users_account_status" not in current_indexes:
        op.create_index("ix_users_account_status", "users", ["account_status"])

    roles = op.create_table(
        "roles",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("code", sa.String(50), nullable=False),
        sa.Column("name", sa.String(100), nullable=False),
        sa.Column("description", sa.String(500)),
        sa.Column("is_system", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.UniqueConstraint("code", name="uq_roles_code"),
    )
    op.create_index("ix_roles_code", "roles", ["code"])

    permissions = op.create_table(
        "permissions",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("code", sa.String(100), nullable=False),
        sa.Column("description", sa.String(500)),
        sa.UniqueConstraint("code", name="uq_permissions_code"),
    )
    op.create_index("ix_permissions_code", "permissions", ["code"])

    op.create_table(
        "role_permissions",
        sa.Column("role_id", sa.Integer(), sa.ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True),
        sa.Column("permission_id", sa.Integer(), sa.ForeignKey("permissions.id", ondelete="CASCADE"), primary_key=True),
    )
    op.create_table(
        "user_roles",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("role_id", sa.Integer(), sa.ForeignKey("roles.id", ondelete="CASCADE"), nullable=False),
        sa.Column("granted_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("granted_by_user_id", sa.Integer(), sa.ForeignKey("users.id")),
        sa.Column("revoked_at", sa.DateTime()),
        sa.Column("reason", sa.String(500)),
    )
    op.create_index("ix_user_roles_user_id", "user_roles", ["user_id"])
    op.create_index("ix_user_roles_role_id", "user_roles", ["role_id"])
    op.create_index("ix_user_roles_revoked_at", "user_roles", ["revoked_at"])

    op.create_table(
        "admin_area_grants",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("area_code", sa.String(50), nullable=False),
        sa.Column("granted_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("granted_by_user_id", sa.Integer(), sa.ForeignKey("users.id")),
        sa.Column("revoked_at", sa.DateTime()),
        sa.Column("reason", sa.String(500)),
        sa.CheckConstraint("area_code IN ('content', 'organization', 'platform')", name="ck_admin_area_code"),
    )
    op.create_index("ix_admin_area_grants_user_id", "admin_area_grants", ["user_id"])
    op.create_index("ix_admin_area_grants_area_code", "admin_area_grants", ["area_code"])
    op.create_index("ix_admin_area_grants_revoked_at", "admin_area_grants", ["revoked_at"])

    op.create_table(
        "user_permission_grants",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("permission_id", sa.Integer(), sa.ForeignKey("permissions.id", ondelete="CASCADE"), nullable=False),
        sa.Column("effect", sa.String(10), nullable=False, server_default="allow"),
        sa.Column("granted_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("granted_by_user_id", sa.Integer(), sa.ForeignKey("users.id")),
        sa.Column("revoked_at", sa.DateTime()),
        sa.Column("reason", sa.String(500)),
        sa.CheckConstraint("effect IN ('allow', 'deny')", name="ck_user_permission_effect"),
    )
    op.create_index("ix_user_permission_grants_user_id", "user_permission_grants", ["user_id"])
    op.create_index("ix_user_permission_grants_revoked_at", "user_permission_grants", ["revoked_at"])

    op.create_table(
        "audit_events",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("occurred_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("actor_user_id", sa.Integer(), sa.ForeignKey("users.id")),
        sa.Column("action", sa.String(100), nullable=False),
        sa.Column("target_type", sa.String(100), nullable=False),
        sa.Column("target_id", sa.String(100)),
        sa.Column("request_id", sa.String(100)),
        sa.Column("result", sa.String(50), nullable=False, server_default="success"),
        sa.Column("metadata_json", sa.Text()),
    )
    op.create_index("ix_audit_events_occurred_at", "audit_events", ["occurred_at"])
    op.create_index("ix_audit_events_actor_user_id", "audit_events", ["actor_user_id"])
    op.create_index("ix_audit_events_action", "audit_events", ["action"])
    op.create_index("ix_audit_events_request_id", "audit_events", ["request_id"])

    op.bulk_insert(roles, ROLE_ROWS)
    op.bulk_insert(permissions, [{"code": code, "description": description} for code, description in PERMISSION_ROWS])

    # Backfill normalized role grants and default Organization access for legacy admins.
    role_ids = dict(bind.execute(sa.text("SELECT code, id FROM roles")).all())
    legacy_map = {"trainee": "learner", "employee": "instructor", "admin": "admin"}
    permission_ids = dict(bind.execute(sa.text("SELECT code, id FROM permissions")).all())
    for role_code, permission_codes in {
        "learner": {"course.view_entitled", "submission.create_own"},
        "instructor": {"course.view_entitled", "submission.review_assigned"},
    }.items():
        for permission_code in permission_codes:
            bind.execute(sa.text(
                "INSERT INTO role_permissions (role_id, permission_id) VALUES (:role_id, :permission_id)"
            ), {"role_id": role_ids[role_code], "permission_id": permission_ids[permission_code]})

    for legacy_code, normalized_code in legacy_map.items():
        bind.execute(sa.text(
            "INSERT INTO user_roles (user_id, role_id, granted_at, reason) "
            "SELECT id, :role_id, CURRENT_TIMESTAMP, :reason FROM users WHERE role = :legacy_code"
        ), {"role_id": role_ids[normalized_code], "reason": f"Compatibility migration from legacy role '{legacy_code}'", "legacy_code": legacy_code})
    bind.execute(sa.text(
        "INSERT INTO admin_area_grants (user_id, area_code, granted_at, reason) "
        "SELECT id, 'organization', CURRENT_TIMESTAMP, 'Default compatibility access for legacy admin' "
        "FROM users WHERE role = 'admin'"
    ))


def downgrade() -> None:
    op.drop_table("audit_events")
    op.drop_table("user_permission_grants")
    op.drop_table("admin_area_grants")
    op.drop_table("user_roles")
    op.drop_table("role_permissions")
    op.drop_table("permissions")
    op.drop_table("roles")
    op.drop_index("ix_users_account_status", table_name="users")
    with op.batch_alter_table("users") as batch:
        batch.drop_constraint("fk_users_approved_by", type_="foreignkey")
        batch.drop_column("timezone")
        batch.drop_column("preferred_language")
        batch.drop_column("approved_by_user_id")
        batch.drop_column("approved_at")
        batch.drop_column("email_verified_at")
        batch.drop_column("account_status")
