from pydantic import BaseModel
from typing import List, Optional

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
    email: str
    password: str
    full_name: str
    role: str = "trainee"  # "trainee", "employee", "admin"

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

