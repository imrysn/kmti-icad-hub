import os
import sys
from dotenv import load_dotenv, find_dotenv

# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load env
load_dotenv(find_dotenv(), override=True)

from backend.database import SessionLocal
from backend.models import AssessmentTask

db = SessionLocal()
try:
    tasks = db.query(AssessmentTask).filter(AssessmentTask.id.in_([463, 464, 465, 466, 467])).all()
    print(f"Loaded {len(tasks)} tasks.")
    upload_base = os.getenv("UPLOAD_DIR")
    print(f"UPLOAD_DIR from env: {repr(upload_base)}")
    
    for task in tasks:
        print(f"\nTask ID: {task.id}")
        print(f"  Title: {task.title}")
        print(f"  Code: {task.task_code}")
        print(f"  master_file_path in DB: {repr(task.master_file_path)}")
        
        # Prepend logic from endpoint
        full_path = task.master_file_path
        if not os.path.isabs(full_path) and not full_path.startswith(upload_base):
            if full_path.startswith("uploads/"):
                full_path = full_path.replace("uploads/", "", 1)
            elif full_path.startswith("uploads\\"):
                full_path = full_path.replace("uploads\\", "", 1)
            full_path = os.path.join(upload_base, full_path)
            
        print(f"  Resolved full_path: {repr(full_path)}")
        print(f"  File exists: {os.path.exists(full_path)}")
finally:
    db.close()
