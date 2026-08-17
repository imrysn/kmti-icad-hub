from datetime import datetime, timedelta, timezone
from backend.models import AdminAreaGrant, AuditEvent, Course, CourseEnrollment, User
from backend.services.access_control_service import sync_legacy_user_access

def h(token): return {"Authorization":f"Bearer {token}"}

def setup_org(db,admin):
    sync_legacy_user_access(db,admin);db.commit()

def test_create_cohort_run_assign_and_enroll(client,db,admin_user,admin_token,employee_user,trainee_user):
    setup_org(db,admin_user)
    course=Course(title="Published delivery",course_type="delivery_course",lifecycle_status="published");db.add(course);db.commit()
    cohort=client.post('/api/v1/admin/course-delivery/cohorts',headers=h(admin_token),json={"code":"pilot-1","name":"Pilot One"})
    assert cohort.status_code==201
    start=datetime.now(timezone.utc)+timedelta(days=1)
    run=client.post('/api/v1/admin/course-delivery/runs',headers=h(admin_token),json={"course_id":course.id,"cohort_id":cohort.json()["id"],"title":"September Pilot","starts_at":start.isoformat(),"instructor_user_id":employee_user.id})
    assert run.status_code==201 and run.json()["instructor_name"]==employee_user.full_name
    enrolled=client.post(f'/api/v1/admin/course-delivery/runs/{run.json()["id"]}/enrollments',headers=h(admin_token),json={"learner_user_id":trainee_user.id,"reason":"Pilot enrollment"})
    assert enrolled.status_code==201
    assert db.query(CourseEnrollment).count()==1
    actions={event.action for event in db.query(AuditEvent).all()}
    assert {'cohort.created','course_run.created','course_run.learner_enrolled'}<=actions

def test_run_rejects_draft_course(client,db,admin_user,admin_token):
    setup_org(db,admin_user)
    course=Course(title="Draft",course_type="draft_delivery",lifecycle_status="draft");db.add(course);db.commit()
    cohort=client.post('/api/v1/admin/course-delivery/cohorts',headers=h(admin_token),json={"code":"pilot-2","name":"Pilot Two"}).json()
    response=client.post('/api/v1/admin/course-delivery/runs',headers=h(admin_token),json={"course_id":course.id,"cohort_id":cohort["id"],"title":"Invalid run","starts_at":datetime.now(timezone.utc).isoformat()})
    assert response.status_code==422

def test_role_boundaries_for_instructor_and_learner(client,db,admin_user,admin_token,trainee_user,employee_user):
    setup_org(db,admin_user)
    course=Course(title="Published",course_type="role_delivery",lifecycle_status="published");db.add(course);db.commit()
    cohort=client.post('/api/v1/admin/course-delivery/cohorts',headers=h(admin_token),json={"code":"pilot-3","name":"Pilot Three"}).json()
    run=client.post('/api/v1/admin/course-delivery/runs',headers=h(admin_token),json={"course_id":course.id,"cohort_id":cohort["id"],"title":"Role run","starts_at":datetime.now(timezone.utc).isoformat()}).json()
    bad_instructor=client.put(f'/api/v1/admin/course-delivery/runs/{run["id"]}/instructor',headers=h(admin_token),json={"instructor_user_id":trainee_user.id,"reason":"Wrong role"})
    bad_learner=client.post(f'/api/v1/admin/course-delivery/runs/{run["id"]}/enrollments',headers=h(admin_token),json={"learner_user_id":employee_user.id,"reason":"Wrong role"})
    assert bad_instructor.status_code==422 and bad_learner.status_code==422
