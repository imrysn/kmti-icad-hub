import sys
import os

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import Quiz, Question

def list_quizzes():
    db = SessionLocal()
    try:
        quizzes = db.query(Quiz).all()
        for q in quizzes:
            print(f"ID: {q.id}, Slug: {q.slug}, Title: {q.title}, Course: {q.course_type}")
            questions = db.query(Question).filter(Question.quiz_id == q.id).order_by(Question.order).all()
            for i, question in enumerate(questions):
                print(f"  Q{i+1}: {question.text[:50]}...")
        
    finally:
        db.close()

if __name__ == "__main__":
    list_quizzes()
