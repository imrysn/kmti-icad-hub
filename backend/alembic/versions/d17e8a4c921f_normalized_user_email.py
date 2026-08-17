"""Add canonical, case-insensitive user email uniqueness.

Revision ID: d17e8a4c921f
Revises: cf25a8301d42
"""
from alembic import op
import sqlalchemy as sa


revision = "d17e8a4c921f"
down_revision = "cf25a8301d42"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("users", sa.Column("email_normalized", sa.String(255), nullable=True))
    op.execute("UPDATE users SET email_normalized = LOWER(TRIM(email))")
    duplicate = op.get_bind().execute(sa.text(
        "SELECT email_normalized FROM users "
        "GROUP BY email_normalized HAVING COUNT(*) > 1 LIMIT 1"
    )).first()
    if duplicate:
        raise RuntimeError(
            "Duplicate user emails differ only by capitalization; resolve them before migration."
        )
    with op.batch_alter_table("users") as batch_op:
        batch_op.alter_column("email_normalized", existing_type=sa.String(255), nullable=False)
        batch_op.create_index("ix_users_email_normalized", ["email_normalized"], unique=True)


def downgrade() -> None:
    with op.batch_alter_table("users") as batch_op:
        batch_op.drop_index("ix_users_email_normalized")
        batch_op.drop_column("email_normalized")
