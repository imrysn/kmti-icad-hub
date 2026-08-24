"""Add persisted learner billing profiles.

Revision ID: fa31c8d4e702
Revises: f28c4a7d910e
"""

from alembic import op
import sqlalchemy as sa


revision = "fa31c8d4e702"
down_revision = "f28c4a7d910e"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("users", sa.Column("billing_name", sa.String(length=200), nullable=True))
    op.add_column("users", sa.Column("billing_country", sa.String(length=100), nullable=True))
    op.add_column("users", sa.Column("billing_address_line1", sa.String(length=300), nullable=True))
    op.add_column("users", sa.Column("billing_address_line2", sa.String(length=300), nullable=True))
    op.add_column("users", sa.Column("billing_city", sa.String(length=100), nullable=True))
    op.add_column("users", sa.Column("billing_postal_code", sa.String(length=30), nullable=True))
    op.add_column("users", sa.Column("billing_province", sa.String(length=100), nullable=True))


def downgrade():
    op.drop_column("users", "billing_province")
    op.drop_column("users", "billing_postal_code")
    op.drop_column("users", "billing_city")
    op.drop_column("users", "billing_address_line2")
    op.drop_column("users", "billing_address_line1")
    op.drop_column("users", "billing_country")
    op.drop_column("users", "billing_name")
