import sys
import datetime
from backend.database import SessionLocal
from backend.models import AccessPlan, User, UserPlanAssignment

def swap_plan(username, plan_code):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.username == username).first()
        if not user:
            print(f"User '{username}' not found.")
            return

        plan = db.query(AccessPlan).filter(AccessPlan.code == plan_code).first()
        if not plan:
            print(f"Plan '{plan_code}' not found. Available plans: foundations, professionals, complete")
            return

        # Deactivate current plans for the user
        current_assignments = db.query(UserPlanAssignment).filter(
            UserPlanAssignment.user_id == user.id,
            UserPlanAssignment.status.in_(("active", "scheduled"))
        ).all()
        for assignment in current_assignments:
            assignment.status = "cancelled"
            assignment.ends_at = datetime.datetime.utcnow()

        # Assign new plan
        new_assignment = UserPlanAssignment(
            user_id=user.id,
            plan_id=plan.id,
            assigned_by_user_id=user.id,
            starts_at=datetime.datetime.utcnow(),
            ends_at=datetime.datetime.utcnow() + datetime.timedelta(days=30),
            status="active"
        )
        db.add(new_assignment)
        db.commit()

        print(f"Successfully switched '{username}' to plan: {plan.name}")
        print("Refresh your browser to see the new dashboard!")

    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python swap_plan.py <username> <plan_code>")
        print("Example: python swap_plan.py emji complete")
    else:
        swap_plan(sys.argv[1], sys.argv[2])
