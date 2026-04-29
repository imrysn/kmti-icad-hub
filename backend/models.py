from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, text, ForeignKey
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
    lesson_id = Column(String(100), index=True)
    score = Column(Float)
    attempts_count = Column(Integer, default=1)
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
    suggestions = Column(String(2000), nullable=True)           # PHASE 3: Store suggestions in log
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


class SavedSnippet(Base):
    """Personal notebook entries for trainees to save key insights"""
    __tablename__ = "saved_snippets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False) # FK to users.id
    content = Column(String(8000), nullable=False)        # The clipped text
    source = Column(String(200), nullable=True)           # E.g. "AI Response", "2D Keyway Lesson"
    tags = Column(String(500), nullable=True)             # Optional tags for categorization
    created_at = Column(DateTime, default=func.now(), index=True)


class Quiz(Base):
    """Definition of a quiz associated with a lesson/course"""
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True)  # Links to curriculum lesson ID
    title = Column(String(200), nullable=False)
    description = Column(String(500))
    course_type = Column(String(50))  # e.g., "2D_Drawing", "3D_Modeling"
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


class Question(Base):
    """Individual quiz question"""
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id", ondelete="CASCADE"), nullable=False)
    text = Column(String(1000), nullable=False)
    options_json = Column(String(2000), nullable=False)  # JSON-encoded list of strings
    correct_answer = Column(Integer, nullable=False)     # Index (0-based)
    explanation = Column(String(1000))
    order = Column(Integer, default=0)                   # For manual sorting


class Course(Base):
    """Top-level curriculum categories (2D, 3D, etc.)"""
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(String(500))
    course_type = Column(String(50), unique=True) # e.g., "2D_Drawing", "3D_Modeling"
    order = Column(Integer, default=0)


class Lesson(Base):
    """Hierarchical curriculum lessons"""
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    parent_id = Column(Integer, ForeignKey("lessons.id", ondelete="CASCADE"), nullable=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(100), unique=True, index=True) # The ID used in the app routing
    order = Column(Integer, default=0)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())


class LessonContent(Base):
    """Modular content blocks within a lesson"""
    __tablename__ = "lesson_contents"

    id = Column(Integer, primary_key=True, index=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id", ondelete="CASCADE"), nullable=False)
    content_type = Column(String(50)) # "text", "image", "video", "bullet_list"
    data = Column(String(10000)) # Using large String for content
    order = Column(Integer, default=0)


class QuestionAttempt(Base):
    """Detailed logs of quiz attempts for learning analytics"""
    __tablename__ = "question_attempts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"), nullable=False)
    question_id = Column(Integer, ForeignKey("questions.id"), nullable=False)
    chosen_option = Column(Integer) # Index selected by user
    is_correct = Column(Boolean)
    attempted_at = Column(DateTime, default=func.now())


