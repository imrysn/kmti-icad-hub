"""Seed and serialize configurable learner access plans."""

from sqlalchemy.orm import Session
from ..models import AccessPlan, PlanEntitlement

DEFAULT_ACCESS_PLANS = (
    ("icad-foundations", "iCAD Foundations", "Beginner lessons, quizzes, and selected basic practical tasks.", 10),
    ("icad-professional", "iCAD Professional", "Foundations plus intermediate content, additional practical sets, and configured trainer services.", 20),
    ("icad-complete", "iCAD Complete", "All entitled training levels, practical sets, assessments, and configured trainer services.", 30),
)

def seed_access_plans(db: Session) -> None:
    for code, name, description, display_order in DEFAULT_ACCESS_PLANS:
        if db.query(AccessPlan).filter(AccessPlan.code == code).first() is None:
            db.add(AccessPlan(code=code, name=name, description=description, display_order=display_order, is_active=True, is_publicly_requestable=True))
    db.flush()

def serialize_plan(db: Session, plan: AccessPlan) -> dict:
    entitlements = db.query(PlanEntitlement).filter(PlanEntitlement.plan_id == plan.id).order_by(PlanEntitlement.resource_type, PlanEntitlement.resource_id).all()
    return {
        "id": plan.id, "code": plan.code, "name": plan.name, "description": plan.description,
        "display_order": plan.display_order, "is_active": plan.is_active,
        "is_publicly_requestable": plan.is_publicly_requestable,
        "created_at": plan.created_at, "updated_at": plan.updated_at,
        "entitlements": entitlements,
    }
