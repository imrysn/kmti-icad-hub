import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from database import SessionLocal
from models import AssessmentTask

def migrate_task_codes():
    db = SessionLocal()
    tasks = db.query(AssessmentTask).order_by(AssessmentTask.set_number, AssessmentTask.id).all()

    sets = {}
    for t in tasks:
        if t.set_number not in sets:
            sets[t.set_number] = {'assemblies': [], 'parts': []}
        if t.is_assembly:
            sets[t.set_number]['assemblies'].append(t)
        else:
            sets[t.set_number]['parts'].append(t)

    count = 0
    for s, data in sets.items():
        for i, a in enumerate(data['assemblies']):
            a.task_code = f"A{i+1}"
            count += 1
        for i, p in enumerate(data['parts']):
            p.task_code = f"P{i+1}"
            count += 1

    db.commit()
    print(f"Updated {count} task codes to A1/P1 format.")
    db.close()

if __name__ == "__main__":
    migrate_task_codes()
