import os
import sys

# Add backend directory to sys.path
sys.path.append(os.path.abspath('backend'))

from database import SessionLocal
from models import AssessmentFeedback

def check_feedback():
    db = SessionLocal()
    try:
        feedback = db.query(AssessmentFeedback).filter(AssessmentFeedback.id == 169).first()
        if not feedback:
            print("Feedback 169 NOT FOUND in DB.")
            return

        print(f"Feedback 169 FOUND:")
        print(f"  Submission ID: {feedback.submission_id}")
        print(f"  Checkback File Path: {feedback.checkback_file_path}")
        
        if feedback.checkback_file_path:
            exists = os.path.exists(feedback.checkback_file_path)
            print(f"  Path exists directly? {exists}")
            
            from routers.assessments import resolve_uploaded_file_path
            resolved = resolve_uploaded_file_path(feedback.checkback_file_path)
            print(f"  Resolved path: {resolved}")
            print(f"  Resolved path exists? {os.path.exists(resolved)}")
            
    finally:
        db.close()

if __name__ == '__main__':
    check_feedback()
