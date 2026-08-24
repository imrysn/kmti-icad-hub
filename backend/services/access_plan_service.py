"""Seed and serialize configurable learner access plans."""

from sqlalchemy.orm import Session
from ..models import AccessPlan, AccountInvitationPlan, PlanEntitlement, RegistrationApplication, UserPlanAssignment

DEFAULT_ACCESS_PLANS = (
    ("icad-foundations", "iCAD Foundations", "Beginner lessons, quizzes, and selected basic practical tasks.", 2900, 10),
    ("icad-professional", "iCAD Professional", "Foundations plus intermediate content, additional practical sets, and configured trainer services.", 9900, 20),
    ("icad-complete", "iCAD Complete", "All entitled training levels, practical sets, assessments, and configured trainer services.", 19900, 30),
)

LEGACY_PLAN_ALIASES = {
    "icad-foundations": ("foundations",),
    "icad-professional": ("professionals", "professional", "icad-professionals"),
    "icad-complete": ("complete",),
}

def seed_access_plans(db: Session) -> None:
    for code, name, description, price_minor_units, display_order in DEFAULT_ACCESS_PLANS:
        if db.query(AccessPlan).filter(AccessPlan.code == code).first() is None:
            db.add(AccessPlan(code=code, name=name, description=description, price_minor_units=price_minor_units,
                              currency_code="USD", billing_interval="month", display_order=display_order,
                              is_active=True, is_publicly_requestable=True))
    db.flush()


def canonicalize_access_plans(db: Session) -> None:
    """Merge legacy public-plan aliases without losing access history."""
    defaults = {row[0]: row for row in DEFAULT_ACCESS_PLANS}
    for canonical_code, aliases in LEGACY_PLAN_ALIASES.items():
        code, name, description, price_minor_units, display_order = defaults[canonical_code]
        canonical = db.query(AccessPlan).filter(AccessPlan.code == canonical_code).first()
        legacy_rows = db.query(AccessPlan).filter(AccessPlan.code.in_(aliases)).all()
        if canonical is None and legacy_rows:
            canonical = legacy_rows.pop(0)
            canonical.code = canonical_code
        if canonical is None:
            canonical = AccessPlan(code=code, name=name, description=description, price_minor_units=price_minor_units,
                                   currency_code="USD", billing_interval="month", display_order=display_order,
                                   is_active=True, is_publicly_requestable=True)
            db.add(canonical)
            db.flush()

        if canonical.name in ("iCAD Professionals", "ICAD Professionals"):
            canonical.name = name
        if canonical.price_minor_units is None:
            canonical.price_minor_units = price_minor_units
        canonical.currency_code = canonical.currency_code or "USD"
        canonical.billing_interval = canonical.billing_interval or "month"

        for legacy in legacy_rows:
            existing = {(item.resource_type, item.resource_id, item.permission_code) for item in db.query(PlanEntitlement).filter(PlanEntitlement.plan_id == canonical.id)}
            for entitlement in db.query(PlanEntitlement).filter(PlanEntitlement.plan_id == legacy.id).all():
                key = (entitlement.resource_type, entitlement.resource_id, entitlement.permission_code)
                if key not in existing:
                    entitlement.plan_id = canonical.id
                    existing.add(key)
                else:
                    db.delete(entitlement)
            db.query(UserPlanAssignment).filter(UserPlanAssignment.plan_id == legacy.id).update({UserPlanAssignment.plan_id: canonical.id}, synchronize_session=False)
            db.query(RegistrationApplication).filter(RegistrationApplication.requested_plan_id == legacy.id).update({RegistrationApplication.requested_plan_id: canonical.id}, synchronize_session=False)
            db.query(RegistrationApplication).filter(RegistrationApplication.assigned_plan_id == legacy.id).update({RegistrationApplication.assigned_plan_id: canonical.id}, synchronize_session=False)
            db.query(AccountInvitationPlan).filter(AccountInvitationPlan.plan_id == legacy.id).update({AccountInvitationPlan.plan_id: canonical.id}, synchronize_session=False)
            db.delete(legacy)
        db.flush()

def serialize_plan(db: Session, plan: AccessPlan) -> dict:
    entitlements = db.query(PlanEntitlement).filter(PlanEntitlement.plan_id == plan.id).order_by(PlanEntitlement.resource_type, PlanEntitlement.resource_id).all()
    return {
        "id": plan.id, "code": plan.code, "name": plan.name, "description": plan.description,
        "price_minor_units": plan.price_minor_units, "currency_code": plan.currency_code,
        "billing_interval": plan.billing_interval,
        "display_order": plan.display_order, "is_active": plan.is_active,
        "is_publicly_requestable": plan.is_publicly_requestable,
        "created_at": plan.created_at, "updated_at": plan.updated_at,
        "entitlements": entitlements,
    }
