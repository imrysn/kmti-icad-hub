"""Add account invitations with predetermined roles and learner plans.

Revision ID: f15b9d2a634c
Revises: e04a8c1f523b
Create Date: 2026-08-17
"""
from alembic import op
import sqlalchemy as sa

revision = "f15b9d2a634c"
down_revision = "e04a8c1f523b"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "account_invitations",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("email_normalized", sa.String(255), nullable=False),
        sa.Column("full_name", sa.String(200), nullable=False),
        sa.Column("preferred_language", sa.String(10), nullable=False, server_default="en"),
        sa.Column("status", sa.String(30), nullable=False, server_default="pending"),
        sa.Column("token_hash", sa.String(64), nullable=False, unique=True),
        sa.Column("admin_area_codes_json", sa.Text()),
        sa.Column("invited_by_user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("expires_at", sa.DateTime(), nullable=False),
        sa.Column("accepted_at", sa.DateTime()),
        sa.Column("cancelled_at", sa.DateTime()),
        sa.Column("superseded_by_id", sa.Integer(), sa.ForeignKey("account_invitations.id")),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.CheckConstraint("status IN ('pending','accepted','expired','cancelled','superseded')", name="ck_account_invitation_status"),
    )
    op.create_index("ix_account_invitations_email", "account_invitations", ["email_normalized"])
    op.create_index("ix_account_invitations_status", "account_invitations", ["status"])
    op.create_index("ix_account_invitations_token", "account_invitations", ["token_hash"], unique=True)
    op.create_index("ix_account_invitations_expires", "account_invitations", ["expires_at"])
    op.create_table("account_invitation_roles", sa.Column("invitation_id", sa.Integer(), sa.ForeignKey("account_invitations.id", ondelete="CASCADE"), primary_key=True), sa.Column("role_id", sa.Integer(), sa.ForeignKey("roles.id"), primary_key=True))
    op.create_table("account_invitation_plans", sa.Column("invitation_id", sa.Integer(), sa.ForeignKey("account_invitations.id", ondelete="CASCADE"), primary_key=True), sa.Column("plan_id", sa.Integer(), sa.ForeignKey("access_plans.id"), nullable=False), sa.Column("starts_at", sa.DateTime(), nullable=False, server_default=sa.func.now()), sa.Column("ends_at", sa.DateTime()))


def downgrade() -> None:
    op.drop_table("account_invitation_plans")
    op.drop_table("account_invitation_roles")
    op.drop_table("account_invitations")
