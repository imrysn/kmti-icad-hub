import os
import sys

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from backend.database import engine, Base
from backend.models import Course, Lesson, LessonContent, Quiz, Question, User, UserProgress, QuizScore, SystemLog, MediaMetadata, TestResult, Broadcast, ChatLog, ChatFeedback, QueryCache, SavedSnippet, QuestionAttempt
from backend.scripts.seed_curriculum import seed_curriculum

def ensure_db():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created.")
    
    print("Seeding curriculum...")
    seed_curriculum()
    print("Seeding complete.")

if __name__ == "__main__":
    ensure_db()
