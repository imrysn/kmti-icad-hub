"""Add configurable access plans and learner plan history.

Revision ID: c82e6a1f4b20
Revises: b71f4d9a2c10
Create Date: 2026-08-17
"""

from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = "c82e6a1f4b20"
down_revision: Union[str, Sequence[str], None] = "b71f4d9a2c10"
branch_labels = None
depends_on = None

PLAN_ROWS = [
    {"code": "icad-foundations", "name": "iCAD Foundations", "description": "Beginner lessons, quizzes, and selected basic practical tasks.", "display_order": 10, "is_active": True, "is_publicly_requestable": True},
    {"code": "icad-professional", "name": "iCAD Professional", "description": "Foundations plus intermediate content, additional practical sets, and configured trainer services.", "display_order": 20, "is_active": True, "is_publicly_requestable": True},
    {"code": "icad-complete", "name": "iCAD Complete", "description": "All entitled training levels, practical sets, assessments, and configured trainer services.", "display_order": 30, "is_active": True, "is_publicly_requestable": True},
]

def upgrade() -> None:
    plans = op.create_table(
        "access_plans",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("code", sa.String(50), nullable=False),
        sa.Column("name", sa.String(150), nullable=False),
        sa.Column("description", sa.String(1000)),
        sa.Column("display_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("is_publicly_requestable", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.UniqueConstraint("code", name="uq_access_plans_code"),
    )
    op.create_index("ix_access_plans_code", "access_plans", ["code"])
    op.create_index("ix_access_plans_is_active", "access_plans", ["is_active"])
    op.create_table(
        "plan_entitlements",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("plan_id", sa.Integer(), sa.ForeignKey("access_plans.id", ondelete="CASCADE"), nullable=False),
        sa.Column("resource_type", sa.String(50), nullable=False),
        sa.Column("resource_id", sa.String(150), nullable=False),
        sa.Column("permission_code", sa.String(100), nullable=False, server_default="view"),
        sa.Column("limits_json", sa.Text()),
        sa.UniqueConstraint("plan_id", "resource_type", "resource_id", "permission_code", name="uq_plan_entitlement_resource"),
    )
    op.create_index("ix_plan_entitlements_plan_id", "plan_entitlements", ["plan_id"])
    op.create_index("ix_plan_entitlements_resource_type", "plan_entitlements", ["resource_type"])
    op.create_table(
        "user_plan_assignments",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("plan_id", sa.Integer(), sa.ForeignKey("access_plans.id"), nullable=False),
        sa.Column("starts_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("ends_at", sa.DateTime()),
        sa.Column("status", sa.String(30), nullable=False, server_default="active"),
        sa.Column("assigned_by_user_id", sa.Integer(), sa.ForeignKey("users.id")),
        sa.Column("reason", sa.String(500)),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.CheckConstraint("status IN ('scheduled','active','expired','cancelled')", name="ck_user_plan_assignment_status"),
        sa.CheckConstraint("ends_at IS NULL OR ends_at > starts_at", name="ck_user_plan_assignment_dates"),
    )
    op.create_index("ix_user_plan_assignments_user_id", "user_plan_assignments", ["user_id"])
    op.create_index("ix_user_plan_assignments_plan_id", "user_plan_assignments", ["plan_id"])
    op.create_index("ix_user_plan_assignments_ends_at", "user_plan_assignments", ["ends_at"])
    op.create_index("ix_user_plan_assignments_status", "user_plan_assignments", ["status"])
    op.bulk_insert(plans, PLAN_ROWS)

def downgrade() -> None:
    op.drop_table("user_plan_assignments")
    op.drop_table("plan_entitlements")
    op.drop_table("access_plans")
