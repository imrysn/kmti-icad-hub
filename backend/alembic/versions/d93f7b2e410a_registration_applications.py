"""Add public registration applications and email verification tokens.

Revision ID: d93f7b2e410a
Revises: c82e6a1f4b20
Create Date: 2026-08-17
"""

from alembic import op
import sqlalchemy as sa


revision = "d93f7b2e410a"
down_revision = "c82e6a1f4b20"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "registration_applications",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("email_normalized", sa.String(255), nullable=False),
        sa.Column("company_name", sa.String(200)),
        sa.Column("department", sa.String(200)),
        sa.Column("job_title", sa.String(200)),
        sa.Column("country_code", sa.String(2)),
        sa.Column("reason_for_access", sa.String(2000)),
        sa.Column("requested_plan_id", sa.Integer(), sa.ForeignKey("access_plans.id"), nullable=False),
        sa.Column("assigned_plan_id", sa.Integer(), sa.ForeignKey("access_plans.id")),
        sa.Column("status", sa.String(50), nullable=False, server_default="email_verification_pending"),
        sa.Column("submitted_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("email_verified_at", sa.DateTime()),
        sa.Column("reviewed_at", sa.DateTime()),
        sa.Column("reviewed_by_user_id", sa.Integer(), sa.ForeignKey("users.id")),
        sa.Column("internal_review_notes", sa.Text()),
        sa.Column("applicant_message", sa.Text()),
        sa.Column("privacy_policy_version", sa.String(50), nullable=False),
        sa.Column("privacy_consented_at", sa.DateTime(), nullable=False),
        sa.Column("terms_version", sa.String(50), nullable=False),
        sa.Column("terms_accepted_at", sa.DateTime(), nullable=False),
        sa.Column("version", sa.Integer(), nullable=False, server_default="1"),
        sa.CheckConstraint(
            "status IN ('email_verification_pending','pending_approval','approved','rejected','clarification_required','cancelled','duplicate')",
            name="ck_registration_application_status",
        ),
        sa.UniqueConstraint("user_id", name="uq_registration_applications_user_id"),
    )
    op.create_index("ix_registration_applications_email", "registration_applications", ["email_normalized"])
    op.create_index("ix_registration_applications_status", "registration_applications", ["status"])
    op.create_index("ix_registration_applications_requested_plan", "registration_applications", ["requested_plan_id"])
    op.create_table(
        "email_verification_tokens",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("application_id", sa.Integer(), sa.ForeignKey("registration_applications.id", ondelete="CASCADE"), nullable=False),
        sa.Column("token_hash", sa.String(64), nullable=False),
        sa.Column("expires_at", sa.DateTime(), nullable=False),
        sa.Column("used_at", sa.DateTime()),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.UniqueConstraint("token_hash", name="uq_email_verification_tokens_hash"),
    )
    op.create_index("ix_email_verification_tokens_application", "email_verification_tokens", ["application_id"])
    op.create_index("ix_email_verification_tokens_hash", "email_verification_tokens", ["token_hash"])
    op.create_index("ix_email_verification_tokens_expires", "email_verification_tokens", ["expires_at"])


def downgrade() -> None:
    op.drop_table("email_verification_tokens")
    op.drop_table("registration_applications")
