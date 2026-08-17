import os
import sys

sys.path.append(os.path.abspath('backend'))
from database import get_db, SessionLocal
from models import AssessmentFeedback

def check():
    db = next(get_db())
    try:
        fb = db.query(AssessmentFeedback).filter(AssessmentFeedback.id == 169).first()
        if fb:
            print(f"Feedback 169 FOUND! Sub ID: {fb.submission_id}")
            print(f"checkback_file_path: {fb.checkback_file_path}")
        else:
            print("Feedback 169 NOT found.")
            
    finally:
        db.close()

if __name__ == '__main__':
    check()
