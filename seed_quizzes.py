import json
import os
import sys
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Add project root to path so we can import backend package
sys.path.append(os.getcwd())

from backend.database import SessionLocal, engine, Base
from backend.models import Quiz, Question

def seed_database():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        if db.query(Quiz).count() > 0:
            print("Database already seeded with quizzes. Skipping.")
            return

        print("Seeding quizzes from quizzes_data.json...")
        with open('quizzes_data.json', 'r', encoding='utf-8') as f:
            quizzes_data = json.load(f)
            
        for q_data in quizzes_data:
            quiz = Quiz(
                slug=q_data['slug'],
                title=q_data['title'],
                description=q_data['description'],
                course_type=q_data['course_type']
            )
            db.add(quiz)
            db.flush() # To get quiz.id
            
            for i, qst_data in enumerate(q_data['questions']):
                question = Question(
                    quiz_id=quiz.id,
                    text=qst_data['text'],
                    options_json=json.dumps(qst_data['options']),
                    correct_answer=qst_data['correct_answer'],
                    explanation=qst_data.get('explanation', ''),
                    order=i
                )
                db.add(question)
        
        db.commit()
        print(f"Successfully seeded {len(quizzes_data)} quizzes.")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
