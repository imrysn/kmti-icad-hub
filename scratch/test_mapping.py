import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Setup path so we can import backend packages
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import SessionLocal
from backend.models import TraineeSetMapping, User

def test():
    db = SessionLocal()
    try:
        # Let's inspect trainee 17 and user role/existence
        trainee = db.query(User).filter(User.id == 17).first()
        print("Trainee 17 exists:", trainee is not None)
        if trainee:
            print("Trainee Name:", trainee.full_name, "Role:", trainee.role)
            
        # Let's inspect trainer (let's find any employee/admin)
        trainer = db.query(User).filter(User.role == 'employee').first()
        if not trainer:
            trainer = db.query(User).filter(User.role == 'admin').first()
        print("Trainer exists:", trainer is not None)
        if trainer:
            print("Trainer Name:", trainer.full_name, "ID:", trainer.id)
            
        if not trainee or not trainer:
            return
            
        print("Attempting to delete and insert mapping...")
        db.query(TraineeSetMapping).filter(TraineeSetMapping.trainee_id == 17).delete()
        
        new_map = TraineeSetMapping(
            trainee_id=17,
            trainer_id=trainer.id,
            display_set_number=1,
            actual_set_number=1
        )
        db.add(new_map)
        db.commit()
        print("Success!")
    except Exception as e:
        print("Error encountered:")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    test()
