import json
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...auth.dependencies import require_permission
from ...database import get_db
from ...models import AccessPlan, AssessmentTask, AuditEvent, Course, PlanEntitlement, User, UserPlanAssignment
from ...schemas import AccessPlanCreate, AccessPlanResponse, AccessPlanUpdate, CourseResponse, PlanAssignmentCreate, PlanAssignmentResponse, PlanEntitlementInput
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


@router.get("/access-plan-resources/courses", response_model=list[CourseResponse])
def list_course_resources(db: Session = Depends(get_db), _: User = Depends(require_permission("plan.read"))):
    """Course identifiers available to the entitlement editor."""
    return db.query(Course).order_by(Course.order, Course.id).all()


@router.get("/access-plan-resources/practical-sets")
def list_practical_set_resources(db: Session = Depends(get_db), _: User = Depends(require_permission("plan.read"))):
    rows = db.query(AssessmentTask.assessment_type, AssessmentTask.set_number, AssessmentTask.set_name).filter(
        (AssessmentTask.task_code != "QUOT") | (AssessmentTask.task_code.is_(None))
    ).distinct().order_by(AssessmentTask.assessment_type, AssessmentTask.set_number).all()
    return [{"resource_id": f"{kind or '3D'}:{number}", "assessment_type": kind or "3D", "set_number": number,
             "name": name or f"Set {number}"} for kind, number, name in rows]

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


def _serialize_assignment(db: Session, assignment: UserPlanAssignment) -> dict:
    plan = db.query(AccessPlan).filter(AccessPlan.id == assignment.plan_id).one()
    return {"id": assignment.id, "user_id": assignment.user_id, "plan_id": assignment.plan_id,
            "plan_code": plan.code, "plan_name": plan.name, "starts_at": assignment.starts_at,
            "ends_at": assignment.ends_at, "status": assignment.status, "reason": assignment.reason,
            "created_at": assignment.created_at}


@router.get("/users/{user_id}/plan-history", response_model=list[PlanAssignmentResponse])
def get_plan_history(user_id: int, db: Session = Depends(get_db), _: User = Depends(require_permission("plan.read"))):
    if db.query(User.id).filter(User.id == user_id).first() is None:
        raise HTTPException(status_code=404, detail="User not found")
    rows = db.query(UserPlanAssignment).filter(UserPlanAssignment.user_id == user_id).order_by(UserPlanAssignment.created_at.desc(), UserPlanAssignment.id.desc()).all()
    return [_serialize_assignment(db, row) for row in rows]


@router.post("/users/{user_id}/plan-assignments", response_model=PlanAssignmentResponse, status_code=status.HTTP_201_CREATED)
def assign_plan(user_id: int, payload: PlanAssignmentCreate, db: Session = Depends(get_db), admin: User = Depends(require_permission("plan.assign"))):
    learner = db.query(User).filter(User.id == user_id).first()
    if learner is None:
        raise HTTPException(status_code=404, detail="User not found")
    plan = _plan_or_404(db, payload.plan_id)
    if not plan.is_active:
        raise HTTPException(status_code=422, detail="Inactive access plans cannot be assigned")
    starts_at = payload.starts_at.replace(tzinfo=None)
    ends_at = payload.ends_at.replace(tzinfo=None) if payload.ends_at else None
    now = datetime.utcnow()
    new_status = "scheduled" if starts_at > now else "active"
    # Preserve immutable history by closing, rather than overwriting, prior assignments.
    current = db.query(UserPlanAssignment).filter(UserPlanAssignment.user_id == user_id, UserPlanAssignment.status.in_(("active", "scheduled"))).all()
    for row in current:
        row.status = "cancelled" if row.starts_at >= starts_at else "expired"
        if row.starts_at < starts_at and (row.ends_at is None or row.ends_at > starts_at):
            row.ends_at = starts_at
    assignment = UserPlanAssignment(user_id=user_id, plan_id=plan.id, starts_at=starts_at, ends_at=ends_at,
                                    status=new_status, assigned_by_user_id=admin.id, reason=payload.reason)
    db.add(assignment); db.flush()
    _audit(db, admin, "plan.assigned", plan, {"user_id": user_id, "assignment_id": assignment.id, "starts_at": starts_at.isoformat(), "ends_at": ends_at.isoformat() if ends_at else None})
    db.commit(); db.refresh(assignment)
    return _serialize_assignment(db, assignment)
