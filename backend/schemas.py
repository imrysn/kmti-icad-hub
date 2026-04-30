from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime
from typing import List, Literal, Optional

class MediaAsset(BaseModel):
    """Multimedia asset linked to a search result"""
    media_type: str  # "video", "image", "3d_model"
    media_url: str
    timestamp_start: Optional[float] = None
    timestamp_end: Optional[float] = None
    description: str

class SearchResult(BaseModel):
    id: str
    content: str
    source: str
    score: Optional[float] = None
    metadata: Optional[dict] = None
    media: Optional[List[MediaAsset]] = None  # Linked multimedia assets

class SearchResponse(BaseModel):
    query: str
    results: List[SearchResult]

class CourseResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    course_type: str
    order: int

    class Config:
        from_attributes = True

class CourseList(BaseModel):
    courses: List[CourseResponse]

class CourseProgress(BaseModel):
    course_id: str
    user_id: str
    progress_percentage: float

class LessonProgress(BaseModel):
    lesson_id: str
    course_id: str
    is_completed: bool = False
    score: Optional[float] = None
    completed_at: Optional[datetime] = None

class QuestionAttemptCreate(BaseModel):
    question_id: int
    chosen_option: int
    is_correct: bool

class QuizSubmission(BaseModel):
    course_id: str
    lesson_id: str
    score: float  # Percentage 0-100
    answers: Optional[List[QuestionAttemptCreate]] = []

# Authentication Schemas

# Chat / Intelligence Node Schemas

class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ImagePayload(BaseModel):
    data: str  # Base64 string
    mime: str = "image/jpeg"

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []
    session_id: Optional[str] = None
    images: Optional[List[ImagePayload]] = [] # Support up to 3 images
    language: Optional[str] = "en-US"
    is_regeneration: Optional[bool] = False # PHASE 3: Flag to bypass cache and vary response
    current_lesson_id: Optional[str] = None # Support contextual biasing for Mentor Mode
    
    # PHASE 1 FIX #5: Backend validation for image upload limit
    @field_validator("images")
    @classmethod
    def validate_image_limit(cls, v: Optional[List[ImagePayload]]) -> Optional[List[ImagePayload]]:
        if v and len(v) > 3:
            raise ValueError("Maximum 3 images allowed per request")
        return v

class ChatSource(BaseModel):
    id: str
    content: str
    source: str
    score: Optional[float] = None
    media: Optional[List[MediaAsset]] = None

class ChatResponse(BaseModel):
    answer: str
    sources: List[ChatSource]
    cached: bool = False
    log_id: Optional[int] = None
    suggestions: Optional[List[str]] = None  # PHASE 3: Smart follow-up suggestions


# PHASE 1 FIX #2: Updated feedback to accept null rating
class FeedbackRequest(BaseModel):
    chat_log_id: int
    rating: Optional[Literal["up", "down"]] = None  # Allow null for deletion


class UserCreate(BaseModel):
    """Schema for user registration"""
    username: str
    email: EmailStr
    password: str
    full_name: str
    # Admin accounts can only be created directly in the DB — never via API
    role: Literal["trainee", "employee"] = "trainee"

    @field_validator("username")
    @classmethod
    def username_min_length(cls, v: str) -> str:
        if len(v.strip()) < 3:
            raise ValueError("Username must be at least 3 characters")
        return v.strip()

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        return v

    @field_validator("full_name")
    @classmethod
    def full_name_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Full name cannot be empty")
        return v.strip()

class UserCreateAdmin(UserCreate):
    """Schema for user creation by an admin (allows setting any role)"""
    role: Literal["trainee", "employee", "admin"] = "trainee"

class UserUpdate(BaseModel):
    """Schema for updating user information"""
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    role: Optional[Literal["trainee", "employee", "admin"]] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: Optional[str]) -> Optional[str]:
        if v and len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        return v

class UserLogin(BaseModel):
    """Schema for user login"""
    username: str
    password: str
    remember_me: bool = False
    required_role: Optional[Literal["trainee", "employee", "admin", "user"]] = None

class ForgotPasswordRequest(BaseModel):
    """Schema for forgot password request"""
    username_or_email: str

class UserResponse(BaseModel):
    """Schema for user information response"""
    id: int
    username: str
    email: str
    full_name: str
    role: str
    is_active: bool
    created_at: Optional[datetime] = None
    last_login: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    """Schema for JWT token response"""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# Curriculum / Assessment Schemas

class QuestionBase(BaseModel):
    text: str
    options_json: str  # JSON list of strings
    correct_answer: int
    explanation: Optional[str] = None
    order: int = 0

class QuestionCreate(QuestionBase):
    pass

class QuestionUpdate(BaseModel):
    text: Optional[str] = None
    options_json: Optional[str] = None
    correct_answer: Optional[int] = None
    explanation: Optional[str] = None
    order: Optional[int] = None

class QuestionResponse(QuestionBase):
    id: int
    quiz_id: int

    class Config:
        from_attributes = True

class QuizBase(BaseModel):
    slug: str
    title: str
    description: Optional[str] = None
    course_type: str

class QuizCreate(QuizBase):
    pass

class QuizUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    course_type: Optional[str] = None

class QuizResponse(QuizBase):
    id: int
    created_at: datetime
    updated_at: datetime
    questions: Optional[List[QuestionResponse]] = []


# --- Curriculum Management ---

class CourseCreate(BaseModel):
    title: str
    description: Optional[str] = None
    course_type: str
    order: int = 0

class LessonBase(BaseModel):
    course_id: int
    parent_id: Optional[int] = None
    title: str
    slug: str
    order: int = 0
    is_published: bool = True

class LessonCreate(LessonBase):
    pass

class LessonResponse(LessonBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class LessonContentBase(BaseModel):
    lesson_id: int
    content_type: str # "text", "image", "video", "bullet_list"
    data: str
    order: int = 0

class LessonContentCreate(LessonContentBase):
    pass

class LessonContentResponse(LessonContentBase):
    id: int
    class Config:
        from_attributes = True

# --- Analytics ---

class QuestionAttemptResponse(BaseModel):
    id: int
    user_id: int
    quiz_id: int
    question_id: int
    chosen_option: int
    is_correct: bool
    attempted_at: datetime

    class Config:
        from_attributes = True
