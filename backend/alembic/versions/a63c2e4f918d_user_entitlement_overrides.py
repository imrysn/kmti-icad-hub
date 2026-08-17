"""Add dated learner entitlement overrides.

Revision ID: a63c2e4f918d
Revises: f15b9d2a634c
Create Date: 2026-08-17
"""
from alembic import op
import sqlalchemy as sa

revision = "a63c2e4f918d"
down_revision = "f15b9d2a634c"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "user_entitlement_overrides",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("resource_type", sa.String(50), nullable=False),
        sa.Column("resource_id", sa.String(150), nullable=False),
        sa.Column("permission_code", sa.String(100), nullable=False, server_default="view"),
        sa.Column("effect", sa.String(10), nullable=False),
        sa.Column("starts_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("ends_at", sa.DateTime()),
        sa.Column("granted_by_user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("reason", sa.String(500), nullable=False),
        sa.Column("revoked_at", sa.DateTime()),
        sa.Column("revoked_by_user_id", sa.Integer(), sa.ForeignKey("users.id")),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.CheckConstraint("effect IN ('allow','deny')", name="ck_user_entitlement_override_effect"),
        sa.CheckConstraint("ends_at IS NULL OR ends_at > starts_at", name="ck_user_entitlement_override_dates"),
    )
    op.create_index("ix_user_entitlement_overrides_user_id", "user_entitlement_overrides", ["user_id"])
    op.create_index("ix_user_entitlement_overrides_resource_type", "user_entitlement_overrides", ["resource_type"])
    op.create_index("ix_user_entitlement_overrides_ends_at", "user_entitlement_overrides", ["ends_at"])
    op.create_index("ix_user_entitlement_overrides_revoked_at", "user_entitlement_overrides", ["revoked_at"])


def downgrade() -> None:
    op.drop_table("user_entitlement_overrides")
