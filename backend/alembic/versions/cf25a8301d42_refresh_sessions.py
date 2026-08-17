"""Add rotating refresh sessions.

Revision ID: cf25a8301d42
Revises: bc14e7290f31
"""
from alembic import op
import sqlalchemy as sa

revision = "cf25a8301d42"
down_revision = "bc14e7290f31"
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table("refresh_sessions",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("family_id", sa.String(36), nullable=False),
        sa.Column("token_hash", sa.String(64), nullable=False, unique=True),
        sa.Column("expires_at", sa.DateTime(), nullable=False), sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("last_used_at", sa.DateTime()), sa.Column("revoked_at", sa.DateTime()),
        sa.Column("replaced_by_id", sa.Integer(), sa.ForeignKey("refresh_sessions.id")))
    for column in ("user_id", "family_id", "expires_at", "revoked_at"):
        op.create_index(f"ix_refresh_sessions_{column}", "refresh_sessions", [column])
    op.create_index("ix_refresh_sessions_token_hash", "refresh_sessions", ["token_hash"], unique=True)

def downgrade() -> None:
    op.drop_table("refresh_sessions")
