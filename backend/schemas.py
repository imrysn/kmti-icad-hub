from pydantic import BaseModel, EmailStr, field_validator
from typing import List, Literal, Optional

class MediaAsset(BaseModel):
    """Multimedia asset linked to a search result"""
    media_type: str  # "video", "image", "3d_model"
    media_url: str
    timestamp_start: Optional[float] = None
    timestamp_end: Optional[float] = None
    description: str

class SearchResult(BaseModel):
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

class UserLogin(BaseModel):
    """Schema for user login"""
    username: str
    password: str

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
    
    class Config:
        from_attributes = True

