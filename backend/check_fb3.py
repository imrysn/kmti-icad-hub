import os
import sys

from database import get_db
from models import AssessmentFeedback
from routers.assessments import resolve_uploaded_file_path

def check():
    db = next(get_db())
    try:
        fb = db.query(AssessmentFeedback).filter(AssessmentFeedback.id == 169).first()
        if fb:
            print(f"Feedback 169 FOUND! Sub ID: {fb.submission_id}")
            print(f"checkback_file_path: {fb.checkback_file_path}")
            if fb.checkback_file_path:
                full_path = resolve_uploaded_file_path(fb.checkback_file_path)
                print(f"Resolved full_path: {full_path}")
                print(f"Exists? {os.path.exists(full_path)}")
        else:
            print("Feedback 169 NOT found.")
            
    finally:
        db.close()

if __name__ == '__main__':
    check()
