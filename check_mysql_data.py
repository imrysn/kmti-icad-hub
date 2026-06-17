import os
import sys
from pathlib import Path

# Add backend directory to sys.path
sys.path.insert(0, str(Path(__file__).parent / "backend"))

from backend.database import SessionLocal, get_db_mode
from backend.models import AssessmentTask

def main():
    print(f"DB Mode: {get_db_mode()}")
    db = SessionLocal()
    try:
        tasks = db.query(AssessmentTask).order_by(AssessmentTask.set_number, AssessmentTask.task_code).all()
        print(f"Total tasks: {len(tasks)}")
        
        # Group by set
        sets = {}
        for t in tasks:
            sets.setdefault(t.set_number, []).append(t)
            
        for set_num, set_tasks in sorted(sets.items()):
            first_task = set_tasks[0]
            print(f"Set {set_num}: Name='{first_task.set_name}', Units Count={len(set_tasks)}")
            for t in set_tasks[:3]:
                print(f"  - Unit {t.task_code}: Title='{t.title}'")
            if len(set_tasks) > 3:
                print(f"  - ... and {len(set_tasks) - 3} more units")
    finally:
        db.close()

if __name__ == "__main__":
    main()
