import json
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...auth.dependencies import require_permission
from ...database import get_db
from ...models import AuditEvent, Cohort, Course, CourseEnrollment, CourseRun, User
from ...schemas import CohortCreate, CohortResponse, CourseEnrollmentCreate, CourseRunCreate, CourseRunInstructorUpdate, CourseRunResponse
from ...services.access_control_service import get_active_role_codes, sync_legacy_user_access

router = APIRouter(prefix="/course-delivery")

def _run_response(db, run):
    course=db.query(Course).filter(Course.id==run.course_id).one(); cohort=db.query(Cohort).filter(Cohort.id==run.cohort_id).one()
    instructor=db.query(User).filter(User.id==run.instructor_user_id).first() if run.instructor_user_id else None
    count=db.query(CourseEnrollment).filter(CourseEnrollment.course_run_id==run.id,CourseEnrollment.status!='withdrawn').count()
    return CourseRunResponse(id=run.id,course_id=course.id,course_title=course.title,cohort_id=cohort.id,cohort_name=cohort.name,title=run.title,instructor_user_id=run.instructor_user_id,instructor_name=instructor.full_name if instructor else None,starts_at=run.starts_at,ends_at=run.ends_at,status=run.status,enrollment_count=count)

def _require_role(db,user_id,role):
    user=db.query(User).filter(User.id==user_id).first()
    if not user: raise HTTPException(404,"User not found")
    sync_legacy_user_access(db,user); db.flush()
    if role not in get_active_role_codes(db,user): raise HTTPException(422,f"Selected user is not a {role}")
    return user

@router.get("/cohorts",response_model=list[CohortResponse])
def cohorts(db:Session=Depends(get_db),_:User=Depends(require_permission("user.read"))): return db.query(Cohort).order_by(Cohort.name).all()

@router.post("/cohorts",response_model=CohortResponse,status_code=status.HTTP_201_CREATED)
def create_cohort(payload:CohortCreate,db:Session=Depends(get_db),admin:User=Depends(require_permission("user.manage"))):
    if db.query(Cohort.id).filter(Cohort.code==payload.code).first(): raise HTTPException(409,"Cohort code already exists")
    item=Cohort(**payload.model_dump());db.add(item);db.flush();db.add(AuditEvent(actor_user_id=admin.id,action="cohort.created",target_type="cohort",target_id=str(item.id),result="success",metadata_json=json.dumps({"code":item.code})));db.commit();db.refresh(item);return item

@router.get("/runs",response_model=list[CourseRunResponse])
def runs(db:Session=Depends(get_db),_:User=Depends(require_permission("user.read"))): return [_run_response(db,r) for r in db.query(CourseRun).order_by(CourseRun.starts_at.desc()).all()]

@router.post("/runs",response_model=CourseRunResponse,status_code=status.HTTP_201_CREATED)
def create_run(payload:CourseRunCreate,db:Session=Depends(get_db),admin:User=Depends(require_permission("user.manage"))):
    course=db.query(Course).filter(Course.id==payload.course_id).first();cohort=db.query(Cohort).filter(Cohort.id==payload.cohort_id,Cohort.is_active.is_(True)).first()
    if not course or course.lifecycle_status!='published': raise HTTPException(422,"A published course is required")
    if not cohort: raise HTTPException(422,"An active cohort is required")
    if payload.instructor_user_id: _require_role(db,payload.instructor_user_id,"instructor")
    run=CourseRun(**payload.model_dump(),status="scheduled",created_by_user_id=admin.id);db.add(run);db.flush();db.add(AuditEvent(actor_user_id=admin.id,action="course_run.created",target_type="course_run",target_id=str(run.id),result="success",metadata_json=json.dumps({"course_id":course.id,"cohort_id":cohort.id})));db.commit();return _run_response(db,run)

@router.put("/runs/{run_id}/instructor",response_model=CourseRunResponse)
def assign_instructor(run_id:int,payload:CourseRunInstructorUpdate,db:Session=Depends(get_db),admin:User=Depends(require_permission("user.manage"))):
    run=db.query(CourseRun).filter(CourseRun.id==run_id).first()
    if not run: raise HTTPException(404,"Course run not found")
    _require_role(db,payload.instructor_user_id,"instructor");run.instructor_user_id=payload.instructor_user_id;db.add(AuditEvent(actor_user_id=admin.id,action="course_run.instructor_assigned",target_type="course_run",target_id=str(run.id),result="success",metadata_json=json.dumps({"instructor_user_id":payload.instructor_user_id,"reason":payload.reason})));db.commit();return _run_response(db,run)

@router.post("/runs/{run_id}/enrollments",status_code=status.HTTP_201_CREATED)
def enroll(run_id:int,payload:CourseEnrollmentCreate,db:Session=Depends(get_db),admin:User=Depends(require_permission("user.manage"))):
    run=db.query(CourseRun).filter(CourseRun.id==run_id).first()
    if not run: raise HTTPException(404,"Course run not found")
    learner=_require_role(db,payload.learner_user_id,"learner")
    if db.query(CourseEnrollment.id).filter(CourseEnrollment.course_run_id==run_id,CourseEnrollment.learner_user_id==learner.id).first(): raise HTTPException(409,"Learner is already enrolled")
    item=CourseEnrollment(course_run_id=run.id,learner_user_id=learner.id,enrolled_by_user_id=admin.id);db.add(item);db.flush();db.add(AuditEvent(actor_user_id=admin.id,action="course_run.learner_enrolled",target_type="course_enrollment",target_id=str(item.id),result="success",metadata_json=json.dumps({"course_run_id":run.id,"learner_user_id":learner.id,"reason":payload.reason})));db.commit();return {"id":item.id,"course_run_id":run.id,"learner_user_id":learner.id,"status":item.status}
