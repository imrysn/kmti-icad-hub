import os
import sys

# Add root directory to sys.path so we can import backend as a package
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.database import SessionLocal
from backend.models import User
from backend.routers.assessments import get_trainer_trainees_progress

db = SessionLocal()
try:
    # Find any trainer
    trainer = db.query(User).filter(User.role.in_(["employee", "admin"])).first()
    if not trainer:
        print("No trainer user found in DB!")
        sys.exit(1)
        
    print(f"Testing with Trainer: {trainer.username} (ID: {trainer.id})")
    
    # Run the function directly
    res = get_trainer_trainees_progress(db=db, current_user=trainer)
    print("API Result:", res)
except Exception as e:
    import traceback
    print("Error occurred:")
    traceback.print_exc()
finally:
    db.close()
