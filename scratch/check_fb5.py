import os
import sys

sys.path.append(os.path.abspath('backend'))
from database import get_db, SessionLocal
from models import AssessmentSubmission, AssessmentFeedback
from sqlalchemy.orm import joinedload

def check():
    db = next(get_db())
    try:
        subs = db.query(AssessmentSubmission).options(joinedload(AssessmentSubmission.feedback)).order_by(AssessmentSubmission.id.desc()).limit(20).all()
        for sub in subs:
            if sub.feedback:
                print(f"Sub ID: {sub.id}, Task ID: {sub.task_id}, Feedback IDs: {[f.id for f in sub.feedback]}")
                for fb in sub.feedback:
                    if fb.checkback_file_path:
                        print(f"  FB ID: {fb.id}, Path: {fb.checkback_file_path}")
            
    finally:
        db.close()

if __name__ == '__main__':
    check()
