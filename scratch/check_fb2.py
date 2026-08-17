import os
import sys

sys.path.append(os.path.abspath('backend'))
from database import SessionLocal
from models import AssessmentFeedback

def check():
    db = SessionLocal()
    try:
        fb = db.query(AssessmentFeedback).filter(AssessmentFeedback.id == 169).first()
        if fb:
            print(f"Feedback 169 FOUND! Sub ID: {fb.submission_id}, checkback: {fb.checkback_file_path}")
        else:
            print("Feedback 169 NOT found.")
            
        print("\nAll Feedbacks in DB:")
        for fb in db.query(AssessmentFeedback).all():
            print(f" FB ID: {fb.id}, Sub ID: {fb.submission_id}, checkback: {fb.checkback_file_path}")
            
    finally:
        db.close()

if __name__ == '__main__':
    check()
