"""Add learner avatars and bug report review queue.

Revision ID: f28c4a7d910e
Revises: d17e8a4c921f
Create Date: 2026-08-24
"""

from alembic import op
import sqlalchemy as sa

revision = "f28c4a7d910e"
down_revision = "d17e8a4c921f"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("users", sa.Column("avatar_code", sa.String(50), nullable=True))
    op.add_column("users", sa.Column("avatar_path", sa.String(500), nullable=True))
    op.create_table(
        "bug_reports",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("reporter_user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("page_url", sa.String(1000), nullable=True),
        sa.Column("screenshot_path", sa.String(500), nullable=True),
        sa.Column("status", sa.String(30), nullable=False, server_default="open"),
        sa.Column("admin_notes", sa.Text(), nullable=True),
        sa.Column("reviewed_by_user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("reviewed_at", sa.DateTime(), nullable=True),
    )
    op.create_index("ix_bug_reports_reporter_user_id", "bug_reports", ["reporter_user_id"])
    op.create_index("ix_bug_reports_status", "bug_reports", ["status"])


def downgrade() -> None:
    op.drop_table("bug_reports")
    op.drop_column("users", "avatar_code")
    op.drop_column("users", "avatar_path")
