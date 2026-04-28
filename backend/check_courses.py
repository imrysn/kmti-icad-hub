import sys
import os

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
from models import Course

def check_courses():
    db = SessionLocal()
    try:
        courses = db.query(Course).all()
        print("Courses in Database:")
        for c in courses:
            print(f"ID: {c.id}, Title: {c.title}, Type: {c.course_type}")
    finally:
        db.close()

if __name__ == "__main__":
    check_courses()
