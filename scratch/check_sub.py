import os
import sys

sys.path.append(os.path.abspath('backend'))
from database import SessionLocal
from models import AssessmentSubmission, AssessmentFeedback

def check():
    db = SessionLocal()
    try:
        sub = db.query(AssessmentSubmission).filter(AssessmentSubmission.id == 169).first()
        if sub:
            print(f"Submission 169 exists! User: {sub.user_id}, Task: {sub.task_id}")
            fb = db.query(AssessmentFeedback).filter(AssessmentFeedback.submission_id == 169).first()
            if fb:
                print(f"Feedback for submission 169 exists! Feedback ID: {fb.id}")
            else:
                print(f"No feedback for submission 169.")
        else:
            print("Submission 169 NOT found.")
            
        print("\nAll Feedbacks:")
        for fb in db.query(AssessmentFeedback).all():
            print(f" FB ID: {fb.id}, Sub ID: {fb.submission_id}, checkback: {fb.checkback_file_path}")
            
    finally:
        db.close()

if __name__ == '__main__':
    check()
