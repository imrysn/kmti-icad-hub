import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.database import SessionLocal
from backend.models import AssessmentTask

def main():
    db = SessionLocal()
    try:
        tasks = db.query(AssessmentTask).all()
        for t in tasks:
            print(f"ID: {t.id} | Set: {t.set_number} | Code: {t.task_code} | Path: {t.master_file_path}")
    finally:
        db.close()

if __name__ == "__main__":
    main()
