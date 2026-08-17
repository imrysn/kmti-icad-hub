import json
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...auth.dependencies import require_permission
from ...database import get_db
from ...models import AccessPlan, AuditEvent, PlanEntitlement, User
from ...schemas import AccessPlanCreate, AccessPlanResponse, AccessPlanUpdate, PlanEntitlementInput
from ...services.access_plan_service import serialize_plan

router = APIRouter()

def _plan_or_404(db: Session, plan_id: int) -> AccessPlan:
    plan = db.query(AccessPlan).filter(AccessPlan.id == plan_id).first()
    if plan is None: raise HTTPException(status_code=404, detail="Access plan not found")
    return plan

def _audit(db: Session, actor: User, action: str, plan: AccessPlan, metadata: dict) -> None:
    db.add(AuditEvent(actor_user_id=actor.id, action=action, target_type="access_plan", target_id=str(plan.id), metadata_json=json.dumps(metadata), result="success"))

@router.get("/access-plans", response_model=list[AccessPlanResponse])
def list_access_plans(db: Session = Depends(get_db), _: User = Depends(require_permission("plan.read"))):
    return [serialize_plan(db, plan) for plan in db.query(AccessPlan).order_by(AccessPlan.display_order, AccessPlan.id).all()]

@router.post("/access-plans", response_model=AccessPlanResponse, status_code=status.HTTP_201_CREATED)
def create_access_plan(payload: AccessPlanCreate, db: Session = Depends(get_db), admin: User = Depends(require_permission("plan.manage"))):
    if db.query(AccessPlan).filter(AccessPlan.code == payload.code).first(): raise HTTPException(status_code=409, detail="Access plan code already exists")
    plan = AccessPlan(**payload.model_dump()); db.add(plan); db.flush(); _audit(db, admin, "plan.created", plan, payload.model_dump()); db.commit(); db.refresh(plan)
    return serialize_plan(db, plan)

@router.patch("/access-plans/{plan_id}", response_model=AccessPlanResponse)
def update_access_plan(plan_id: int, payload: AccessPlanUpdate, db: Session = Depends(get_db), admin: User = Depends(require_permission("plan.manage"))):
    plan = _plan_or_404(db, plan_id); before = {key: getattr(plan, key) for key in payload.model_dump(exclude_unset=True)}
    for key, value in payload.model_dump(exclude_unset=True).items(): setattr(plan, key, value)
    _audit(db, admin, "plan.updated", plan, {"before": before, "after": payload.model_dump(exclude_unset=True)}); db.commit(); db.refresh(plan)
    return serialize_plan(db, plan)

@router.put("/access-plans/{plan_id}/entitlements", response_model=AccessPlanResponse)
def replace_entitlements(plan_id: int, payload: list[PlanEntitlementInput], db: Session = Depends(get_db), admin: User = Depends(require_permission("plan.manage"))):
    plan = _plan_or_404(db, plan_id)
    unique_keys = {(item.resource_type, item.resource_id, item.permission_code) for item in payload}
    if len(unique_keys) != len(payload): raise HTTPException(status_code=422, detail="Duplicate entitlement")
    db.query(PlanEntitlement).filter(PlanEntitlement.plan_id == plan.id).delete(synchronize_session=False)
    for item in payload: db.add(PlanEntitlement(plan_id=plan.id, **item.model_dump()))
    _audit(db, admin, "plan.entitlements_replaced", plan, {"count": len(payload)}); db.commit(); db.refresh(plan)
    return serialize_plan(db, plan)
