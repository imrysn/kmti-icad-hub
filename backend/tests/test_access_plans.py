from backend.models import AccessPlan, AuditEvent, PlanEntitlement
from backend.services.access_control_service import sync_legacy_user_access
from backend.services.access_plan_service import seed_access_plans


def test_default_access_plans_are_seeded_idempotently(db):
    seed_access_plans(db); seed_access_plans(db); db.flush()
    assert [plan.code for plan in db.query(AccessPlan).order_by(AccessPlan.display_order).all()] == [
        "icad-foundations", "icad-professional", "icad-complete"
    ]


def test_public_plan_list_needs_no_auth_and_only_returns_public_active(client, db):
    seed_access_plans(db); db.flush()
    hidden = db.query(AccessPlan).filter(AccessPlan.code == "icad-professional").one()
    hidden.is_publicly_requestable = False; db.flush()
    response = client.get("/api/v1/public/access-plans")
    assert response.status_code == 200
    assert [item["code"] for item in response.json()] == ["icad-foundations", "icad-complete"]


def test_learner_cannot_list_admin_access_plans(client, trainee_token):
    response = client.get("/api/v1/admin/access-plans", headers={"Authorization": f"Bearer {trainee_token}"})
    assert response.status_code == 403


def test_organization_admin_can_list_and_update_plan(client, db, admin_user, admin_token):
    sync_legacy_user_access(db, admin_user); seed_access_plans(db); db.commit()
    plan = db.query(AccessPlan).filter(AccessPlan.code == "icad-foundations").one()
    response = client.patch(
        f"/api/v1/admin/access-plans/{plan.id}", json={"name": "iCAD Starter", "is_publicly_requestable": False},
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == 200
    assert response.json()["name"] == "iCAD Starter"
    assert response.json()["is_publicly_requestable"] is False
    assert db.query(AuditEvent).filter(AuditEvent.action == "plan.updated", AuditEvent.target_id == str(plan.id)).count() == 1


def test_admin_can_replace_entitlements_atomically(client, db, admin_user, admin_token):
    sync_legacy_user_access(db, admin_user); seed_access_plans(db); db.commit()
    plan = db.query(AccessPlan).filter(AccessPlan.code == "icad-complete").one()
    payload = [
        {"resource_type": "course", "resource_id": "3D_Modeling", "permission_code": "view"},
        {"resource_type": "course", "resource_id": "2D_Drawing", "permission_code": "view"},
    ]
    response = client.put(f"/api/v1/admin/access-plans/{plan.id}/entitlements", json=payload, headers={"Authorization": f"Bearer {admin_token}"})
    assert response.status_code == 200
    assert len(response.json()["entitlements"]) == 2
    assert db.query(PlanEntitlement).filter(PlanEntitlement.plan_id == plan.id).count() == 2


def test_duplicate_entitlement_is_rejected_without_replacing_existing(client, db, admin_user, admin_token):
    sync_legacy_user_access(db, admin_user); seed_access_plans(db); db.commit()
    plan = db.query(AccessPlan).filter(AccessPlan.code == "icad-complete").one()
    existing = PlanEntitlement(plan_id=plan.id, resource_type="course", resource_id="3D_Modeling", permission_code="view")
    db.add(existing); db.commit()
    duplicate = {"resource_type": "course", "resource_id": "2D_Drawing", "permission_code": "view"}
    response = client.put(f"/api/v1/admin/access-plans/{plan.id}/entitlements", json=[duplicate, duplicate], headers={"Authorization": f"Bearer {admin_token}"})
    assert response.status_code == 422
    assert db.query(PlanEntitlement).filter(PlanEntitlement.plan_id == plan.id).count() == 1
