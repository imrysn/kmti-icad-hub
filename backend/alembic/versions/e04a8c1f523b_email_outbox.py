"""Add provider-neutral transactional email outbox.

Revision ID: e04a8c1f523b
Revises: d93f7b2e410a
Create Date: 2026-08-17
"""

from alembic import op
import sqlalchemy as sa

revision = "e04a8c1f523b"
down_revision = "d93f7b2e410a"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "email_outbox",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("message_type", sa.String(100), nullable=False),
        sa.Column("recipient_email", sa.String(255), nullable=False),
        sa.Column("recipient_name", sa.String(200)),
        sa.Column("preferred_language", sa.String(10), nullable=False, server_default="en"),
        sa.Column("subject", sa.String(500), nullable=False),
        sa.Column("text_body", sa.Text(), nullable=False),
        sa.Column("html_body", sa.Text(), nullable=False),
        sa.Column("status", sa.String(20), nullable=False, server_default="pending"),
        sa.Column("attempts", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("next_attempt_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("last_attempt_at", sa.DateTime()),
        sa.Column("sent_at", sa.DateTime()),
        sa.Column("provider_message_id", sa.String(255)),
        sa.Column("last_error", sa.String(1000)),
        sa.Column("related_type", sa.String(100)),
        sa.Column("related_id", sa.String(100)),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.CheckConstraint("status IN ('pending','processing','sent','failed','cancelled')", name="ck_email_outbox_status"),
    )
    op.create_index("ix_email_outbox_type", "email_outbox", ["message_type"])
    op.create_index("ix_email_outbox_recipient", "email_outbox", ["recipient_email"])
    op.create_index("ix_email_outbox_status", "email_outbox", ["status"])
    op.create_index("ix_email_outbox_next_attempt", "email_outbox", ["next_attempt_at"])


def downgrade() -> None:
    op.drop_table("email_outbox")
