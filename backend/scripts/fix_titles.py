import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))
from database import SessionLocal
from models import AssessmentTask

def fix_titles():
    db = SessionLocal()
    tasks = db.query(AssessmentTask).all()
    count = 0
    for task in tasks:
        if task.title and task.title.lower().endswith('.dwg'):
            task.title = task.title[:-4]
            count += 1
        elif task.title and "master assembly:" in task.title.lower() and task.title.lower().endswith('.dwg'):
            task.title = task.title[:-4]
            count += 1
            
    db.commit()
    print(f"Updated {count} task titles.")
    db.close()

if __name__ == "__main__":
    fix_titles()
