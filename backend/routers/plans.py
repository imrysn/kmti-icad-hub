from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import AccessPlan
from ..schemas import AccessPlanResponse
from ..services.access_plan_service import serialize_plan

router = APIRouter(prefix="/public/access-plans", tags=["public access plans"])

@router.get("", response_model=list[AccessPlanResponse])
def list_public_access_plans(db: Session = Depends(get_db)):
    plans = db.query(AccessPlan).filter(AccessPlan.is_active.is_(True), AccessPlan.is_publicly_requestable.is_(True)).order_by(AccessPlan.display_order, AccessPlan.id).all()
    return [serialize_plan(db, plan) for plan in plans]
