from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, text
from sqlalchemy.sql import func
from .database import Base

class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(100), index=True)
    course_id = Column(String(100), index=True)
    progress_percentage = Column(Float, default=0.0)
    last_accessed = Column(DateTime, nullable=True)

class QuizScore(Base):
    __tablename__ = "quiz_scores"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(100), index=True)
    course_id = Column(String(100), index=True)
    score = Column(Float)
    completed_at = Column(DateTime, nullable=True)

class MediaMetadata(Base):
    """Links Excel knowledge base entries to multimedia assets"""
    __tablename__ = "media_metadata"

    id = Column(Integer, primary_key=True, index=True)
    excel_row_id = Column(String(200), index=True)  # Reference to Excel row/concept
    media_type = Column(String(50))  # "video", "image", "3d_model"
    media_url = Column(String(500))  # Relative path to media file
    timestamp_start = Column(Float, nullable=True)  # For video deep-linking (seconds)
    timestamp_end = Column(Float, nullable=True)  # For video deep-linking (seconds)
    description = Column(String(500))  # What this media demonstrates
    created_at = Column(DateTime, nullable=True)

class TestResult(Base):
    """Stores active testing results for Mentor Mode"""
    __tablename__ = "test_results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(100), index=True)
    lesson_id = Column(String(100), index=True)
    question_text = Column(String(1000))
    user_answer = Column(String(1000))
    is_correct = Column(Integer)  # Boolean as int
    attempted_at = Column(DateTime, nullable=True)

class User(Base):
    """User model for authentication and authorization"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(200))
    role = Column(String(50), default="trainee")  # "trainee", "employee", "admin"
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, nullable=True)
    last_login = Column(DateTime, nullable=True)

