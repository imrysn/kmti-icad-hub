from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, text
from sqlalchemy.sql import func
try:
    from .database import Base
except ImportError:
    from database import Base

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


class SystemLog(Base):
    """Stores system events for audit trail"""
    __tablename__ = "system_logs"

    id = Column(Integer, primary_key=True, index=True)
    level = Column(String(20))  # "INFO", "WARNING", "ERROR"
    message = Column(String(500))
    context = Column(String(100))  # "AUTH", "KB", "USER_MGMT"
    user_id = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=func.now())


class Broadcast(Base):
    """System-wide announcements from admins"""
    __tablename__ = "broadcasts"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String(1000), nullable=False)
    level = Column(String(20), default="info")  # "info", "warning", "critical"
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())
    created_by = Column(Integer)  # Admin user ID


class ChatLog(Base):
    """Logs every user interaction with the Intelligence Chatbot"""
    __tablename__ = "chat_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)       # FK to users.id
    username = Column(String(100), index=True, nullable=False)  # Denormalized for fast queries
    session_id = Column(String(100), index=True, nullable=True) # Client session identifier
    message = Column(String(2000), nullable=False)              # User's question
    answer = Column(String(8000), nullable=False)               # AI response
    sources_used = Column(String(1000), nullable=True)          # Comma-separated source filenames
    source_count = Column(Integer, default=0)                   # How many KB chunks were retrieved
    tokens_estimated = Column(Integer, default=0)               # Rough token count (chars / 4)
    response_time_ms = Column(Integer, default=0)               # End-to-end latency
    had_media = Column(Boolean, default=False)                  # Whether images were returned
    is_cached = Column(Boolean, default=False)                  # Whether this was a cache hit
    created_at = Column(DateTime, default=func.now(), index=True)


class ChatFeedback(Base):
    """Thumbs up/down feedback on individual AI responses"""
    __tablename__ = "chat_feedback"

    id = Column(Integer, primary_key=True, index=True)
    chat_log_id = Column(Integer, index=True, nullable=False)  # FK to chat_logs.id
    user_id = Column(Integer, index=True, nullable=False)
    username = Column(String(100), nullable=False)
    rating = Column(String(10), nullable=False)                # "up" or "down"
    created_at = Column(DateTime, default=func.now())


class QueryCache(Base):
    """Caches AI responses for identical queries to avoid redundant Gemini calls"""
    __tablename__ = "query_cache"

    id = Column(Integer, primary_key=True, index=True)
    query_hash = Column(String(64), unique=True, index=True, nullable=False)  # SHA-256 of normalized query
    query_text = Column(String(2000), nullable=False)          # Original query for debugging
    answer = Column(String(8000), nullable=False)
    sources_json = Column(String(16000), nullable=True)        # JSON-serialized sources
    hit_count = Column(Integer, default=0)                     # Times this cache entry was served
    created_at = Column(DateTime, default=func.now(), index=True)
    expires_at = Column(DateTime, nullable=False, index=True)  # TTL expiry

