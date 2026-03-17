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
    media: Optional[List[MediaAsset]] = None  # Linked multimedia assets

class SearchResponse(BaseModel):
    query: str
    results: List[SearchResult]

class Course(BaseModel):
    id: str
    title: str
    description: str

class CourseList(BaseModel):
    courses: List[Course]

class CourseProgress(BaseModel):
    course_id: str
    user_id: str
    progress_percentage: float

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


class FeedbackRequest(BaseModel):
    chat_log_id: int
    rating: Literal["up", "down"]


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

class Token(BaseModel):
    """Schema for JWT token response"""
    access_token: str
    token_type: str = "bearer"

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

