"""Add Platform administrator MFA storage.

Revision ID: e28f9b5d032a
Revises: d17e8a4c921f
"""
from alembic import op
import sqlalchemy as sa

revision = "e28f9b5d032a"
down_revision = "d17e8a4c921f"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("users", sa.Column("mfa_enabled", sa.Boolean(), nullable=False, server_default=sa.false()))
    op.add_column("users", sa.Column("mfa_secret_encrypted", sa.Text(), nullable=True))
    op.create_table("mfa_enrollment_challenges",
        sa.Column("id", sa.Integer(), primary_key=True), sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("token_hash", sa.String(64), nullable=False, unique=True), sa.Column("expires_at", sa.DateTime(), nullable=False),
        sa.Column("used_at", sa.DateTime()), sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()))
    op.create_index("ix_mfa_enrollment_challenges_user_id", "mfa_enrollment_challenges", ["user_id"])
    op.create_index("ix_mfa_enrollment_challenges_token_hash", "mfa_enrollment_challenges", ["token_hash"], unique=True)
    op.create_table("mfa_recovery_codes",
        sa.Column("id", sa.Integer(), primary_key=True), sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("code_hash", sa.String(64), nullable=False, unique=True), sa.Column("used_at", sa.DateTime()),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()))
    op.create_index("ix_mfa_recovery_codes_user_id", "mfa_recovery_codes", ["user_id"])
    op.create_index("ix_mfa_recovery_codes_code_hash", "mfa_recovery_codes", ["code_hash"], unique=True)


def downgrade() -> None:
    op.drop_table("mfa_recovery_codes"); op.drop_table("mfa_enrollment_challenges")
    op.drop_column("users", "mfa_secret_encrypted"); op.drop_column("users", "mfa_enabled")
