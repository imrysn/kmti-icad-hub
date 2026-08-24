"""Canonicalize public access plans and add pricing metadata.

Revision ID: a19d4e2c7b31
Revises: fa31c8d4e702
"""

from alembic import op
import sqlalchemy as sa


revision = "a19d4e2c7b31"
down_revision = "fa31c8d4e702"
branch_labels = None
depends_on = None


CANONICAL_PLANS = (
    ("icad-foundations", "iCAD Foundations", 2900, 10, ("foundations",)),
    ("icad-professional", "iCAD Professional", 9900, 20, ("professionals", "professional", "icad-professionals")),
    ("icad-complete", "iCAD Complete", 19900, 30, ("complete",)),
)


def _plan_id(connection, code):
    return connection.execute(sa.text("SELECT id FROM access_plans WHERE code = :code"), {"code": code}).scalar()


def _merge_plan(connection, source_id, target_id, tables):
    if "plan_entitlements" in tables:
        connection.execute(sa.text("""
            INSERT INTO plan_entitlements (plan_id, resource_type, resource_id, permission_code, limits_json)
            SELECT :target_id, source.resource_type, source.resource_id, source.permission_code, source.limits_json
            FROM plan_entitlements AS source
            WHERE source.plan_id = :source_id
              AND NOT EXISTS (
                SELECT 1 FROM plan_entitlements AS target
                WHERE target.plan_id = :target_id
                  AND target.resource_type = source.resource_type
                  AND target.resource_id = source.resource_id
                  AND target.permission_code = source.permission_code
              )
        """), {"source_id": source_id, "target_id": target_id})
        connection.execute(sa.text("DELETE FROM plan_entitlements WHERE plan_id = :source_id"), {"source_id": source_id})

    reference_columns = (
        ("user_plan_assignments", "plan_id"),
        ("registration_applications", "requested_plan_id"),
        ("registration_applications", "assigned_plan_id"),
        ("account_invitation_plans", "plan_id"),
    )
    for table, column in reference_columns:
        if table in tables:
            connection.execute(
                sa.text(f"UPDATE {table} SET {column} = :target_id WHERE {column} = :source_id"),
                {"source_id": source_id, "target_id": target_id},
            )
    connection.execute(sa.text("DELETE FROM access_plans WHERE id = :source_id"), {"source_id": source_id})


def upgrade():
    op.add_column("access_plans", sa.Column("price_minor_units", sa.Integer(), nullable=True))
    op.add_column("access_plans", sa.Column("currency_code", sa.String(length=3), nullable=False, server_default="USD"))
    op.add_column("access_plans", sa.Column("billing_interval", sa.String(length=20), nullable=False, server_default="month"))

    connection = op.get_bind()
    tables = set(sa.inspect(connection).get_table_names())
    for canonical_code, name, price, display_order, aliases in CANONICAL_PLANS:
        canonical_id = _plan_id(connection, canonical_code)
        if canonical_id is None:
            first_legacy_id = None
            for alias in aliases:
                first_legacy_id = _plan_id(connection, alias)
                if first_legacy_id is not None:
                    break
            if first_legacy_id is not None:
                connection.execute(
                    sa.text("UPDATE access_plans SET code = :code WHERE id = :plan_id"),
                    {"code": canonical_code, "plan_id": first_legacy_id},
                )
                canonical_id = first_legacy_id
            else:
                result = connection.execute(sa.text("""
                    INSERT INTO access_plans
                        (code, name, description, price_minor_units, currency_code, billing_interval,
                         display_order, is_active, is_publicly_requestable, created_at, updated_at)
                    VALUES
                        (:code, :name, :description, :price, 'USD', 'month', :display_order, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                """), {
                    "code": canonical_code,
                    "name": name,
                    "description": "Public KMTI iCAD training access plan.",
                    "price": price,
                    "display_order": display_order,
                })
                canonical_id = result.lastrowid or _plan_id(connection, canonical_code)

        for alias in aliases:
            legacy_id = _plan_id(connection, alias)
            if legacy_id is not None and legacy_id != canonical_id:
                _merge_plan(connection, legacy_id, canonical_id, tables)

        connection.execute(sa.text("""
            UPDATE access_plans
            SET name = :name, price_minor_units = :price, currency_code = 'USD',
                billing_interval = 'month', display_order = :display_order
            WHERE id = :plan_id
        """), {"name": name, "price": price, "display_order": display_order, "plan_id": canonical_id})


def downgrade():
    op.drop_column("access_plans", "billing_interval")
    op.drop_column("access_plans", "currency_code")
    op.drop_column("access_plans", "price_minor_units")
