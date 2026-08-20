import sys
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.database import SessionLocal, engine, Base
from backend.models import AccessPlan, Course, PlanEntitlement, User, UserPlanAssignment
import datetime

def seed_public_plans():
    db = SessionLocal()
    try:
        print("Seeding Public Plans and Courses...")

        # 1. Create the new Beginner Course
        foundations_course = db.query(Course).filter(Course.course_type == "iCAD_Foundations").first()
        if not foundations_course:
            foundations_course = Course(
                title="iCAD Foundations",
                description="Beginner-friendly introduction to iCAD layout and basic navigation.",
                course_type="iCAD_Foundations",
                order=0,
                lifecycle_status="published",
                published_at=datetime.datetime.utcnow()
            )
            db.add(foundations_course)
            db.commit()
            db.refresh(foundations_course)
            print("Created Course: iCAD Foundations")
        else:
            print("Foundations course already exists.")

        # Let's ensure the traditional courses exist
        advanced_3d = db.query(Course).filter(Course.course_type == "3D_Modeling").first()
        advanced_2d = db.query(Course).filter(Course.course_type == "2D_Drawing").first()

        # 2. Create the Access Plans
        plans_data = [
            {
                "code": "foundations",
                "name": "iCAD Foundations",
                "description": "Perfect for career shifters and absolute beginners.",
                "is_publicly_requestable": True,
                "entitlements": [foundations_course.id]
            },
            {
                "code": "professionals",
                "name": "iCAD Professionals",
                "description": "For advanced users needing technical 3D modeling skills.",
                "is_publicly_requestable": True,
                "entitlements": [foundations_course.id] + ([advanced_3d.id] if advanced_3d else []) + ([advanced_2d.id] if advanced_2d else [])
            },
            {
                "code": "complete",
                "name": "iCAD Complete",
                "description": "The ultimate package for full corporate training.",
                "is_publicly_requestable": True,
                "entitlements": [foundations_course.id] + ([advanced_3d.id] if advanced_3d else []) + ([advanced_2d.id] if advanced_2d else [])
            }
        ]

        for plan_info in plans_data:
            plan = db.query(AccessPlan).filter(AccessPlan.code == plan_info["code"]).first()
            if not plan:
                plan = AccessPlan(
                    code=plan_info["code"],
                    name=plan_info["name"],
                    description=plan_info["description"],
                    is_publicly_requestable=plan_info["is_publicly_requestable"],
                )
                db.add(plan)
                db.commit()
                db.refresh(plan)
                print(f"Created Plan: {plan.name}")
            else:
                print(f"Plan already exists: {plan.name}")
            
            # Sync Entitlements
            current_entitlements = db.query(PlanEntitlement).filter(PlanEntitlement.plan_id == plan.id).all()
            current_course_ids = [e.resource_id for e in current_entitlements if e.resource_type == "course"]
            
            for cid in plan_info["entitlements"]:
                if str(cid) not in current_course_ids:
                    db.add(PlanEntitlement(plan_id=plan.id, resource_type="course", resource_id=str(cid)))
                    print(f"Added entitlement for course ID {cid} to Plan {plan.name}")
            
            db.commit()

        # Fix the user 'emji' if they already have the Foundations plan but it was created manually without entitlements
        user = db.query(User).filter(User.username == "emji").first()
        if user:
            foundations_plan = db.query(AccessPlan).filter(AccessPlan.code == "foundations").first()
            if foundations_plan:
                assignment = db.query(UserPlanAssignment).filter(
                    UserPlanAssignment.user_id == user.id,
                    UserPlanAssignment.plan_id == foundations_plan.id
                ).first()
                if not assignment:
                    # Give them the new seeded one
                    db.add(UserPlanAssignment(
                        user_id=user.id,
                        plan_id=foundations_plan.id,
                        assigned_by_user_id=user.id, # Self granted for test
                        starts_at=datetime.datetime.utcnow(),
                        ends_at=datetime.datetime.utcnow() + datetime.timedelta(days=30)
                    ))
                    db.commit()
                    print("Assigned iCAD Foundations to 'emji'")

        print("Seeding complete.")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_public_plans()
