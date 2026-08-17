from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import datetime
from typing import List, Literal, Optional

class SystemSettingResponse(BaseModel):
    key: str
    value: str
    description: Optional[str] = None

class SystemSettingUpdate(BaseModel):
    value: str

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
    seconds_spent: int = 0

class QuizSubmission(BaseModel):
    course_id: str
    lesson_id: str
    score: float  # Percentage 0-100
    answers: Optional[List[QuestionAttemptCreate]] = []

# Authentication Schemas



class UserCreate(BaseModel):
    """Schema for user registration"""
    username: str
    email: Optional[EmailStr] = None
    password: str
    full_name: str
    # Admin accounts can only be created directly in the DB — never via API
    role: Literal["trainee", "employee"] = "trainee"

    @field_validator("username")
    @classmethod
    def username_min_length(cls, v: str) -> str:
        if len(v.strip()) < 2:
            raise ValueError("Username must be at least 2 characters")
        return v.strip()

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 4:
            raise ValueError("Password must be at least 4 characters")
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
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    role: Optional[Literal["trainee", "employee", "admin"]] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    custom_comments: Optional[List[str]] = None

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: Optional[str]) -> Optional[str]:
        if v and len(v) < 4:
            raise ValueError("Password must be at least 4 characters")
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

class PasswordResetRequest(BaseModel):
    token: str = Field(min_length=20, max_length=500)
    password: str = Field(min_length=8, max_length=128)

class RefreshTokenRequest(BaseModel):
    refresh_token: str = Field(min_length=20, max_length=500)

class LogoutRequest(BaseModel):
    refresh_token: Optional[str] = Field(default=None, min_length=20, max_length=500)

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
    custom_comments: Optional[List[str]] = []
    account_status: str = "active"
    
    class Config:
        from_attributes = True


class UserAccessResponse(BaseModel):
    """Effective authorization data used to construct protected navigation."""
    roles: List[str]
    admin_areas: List[str]
    permissions: List[str]


class AdminUserAccessResponse(BaseModel):
    user_id: int
    role_code: str
    admin_areas: List[str] = Field(default_factory=list)
    account_status: str
    is_active: bool


class AdminUserAccessUpdate(BaseModel):
    role_code: Literal["learner", "instructor", "admin"]
    admin_areas: List[Literal["content", "organization", "platform"]] = Field(default_factory=list)
    account_status: Literal["active", "suspended", "deactivated"]
    reason: str = Field(min_length=3, max_length=500)

    @field_validator("admin_areas")
    @classmethod
    def unique_admin_areas(cls, value: List[str]):
        if len(value) != len(set(value)):
            raise ValueError("Admin areas must be unique")
        return value


class RegistrationCreate(BaseModel):
    username: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    full_name: str = Field(min_length=1, max_length=200)
    requested_plan_id: int
    company_name: Optional[str] = Field(default=None, max_length=200)
    department: Optional[str] = Field(default=None, max_length=200)
    job_title: Optional[str] = Field(default=None, max_length=200)
    country_code: Optional[str] = Field(default=None, min_length=2, max_length=2)
    reason_for_access: Optional[str] = Field(default=None, max_length=2000)
    preferred_language: Literal["en", "ja"] = "en"
    timezone: str = Field(default="Asia/Manila", max_length=100)
    privacy_policy_version: str = Field(min_length=1, max_length=50)
    terms_version: str = Field(min_length=1, max_length=50)
    privacy_accepted: bool
    terms_accepted: bool


class RegistrationSubmissionResponse(BaseModel):
    message: str
    application_id: Optional[int] = None
    verification_token: Optional[str] = None


class EmailVerificationRequest(BaseModel):
    token: str = Field(min_length=20, max_length=500)


class VerificationResendRequest(BaseModel):
    email: EmailStr


class RegistrationReviewRequest(BaseModel):
    version: int
    assigned_plan_id: Optional[int] = None
    internal_reason: Optional[str] = Field(default=None, max_length=2000)
    applicant_message: Optional[str] = Field(default=None, max_length=2000)


class RegistrationApplicationResponse(BaseModel):
    id: int
    user_id: int
    email: str
    full_name: str
    company_name: Optional[str] = None
    department: Optional[str] = None
    job_title: Optional[str] = None
    country_code: Optional[str] = None
    reason_for_access: Optional[str] = None
    requested_plan_id: int
    assigned_plan_id: Optional[int] = None
    requested_plan_name: Optional[str] = None
    assigned_plan_name: Optional[str] = None
    status: str
    submitted_at: datetime
    email_verified_at: Optional[datetime] = None
    reviewed_at: Optional[datetime] = None
    internal_review_notes: Optional[str] = None
    applicant_message: Optional[str] = None
    version: int


class InvitationCreate(BaseModel):
    email: EmailStr
    full_name: str = Field(min_length=1, max_length=200)
    role_code: Literal["learner", "instructor", "admin"]
    preferred_language: Literal["en", "ja"] = "en"
    plan_id: Optional[int] = None
    starts_at: Optional[datetime] = None
    ends_at: Optional[datetime] = None
    admin_areas: List[Literal["content", "organization", "platform"]] = []
    expires_in_days: int = Field(default=7, ge=1, le=30)


class InvitationResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role_code: str
    preferred_language: str
    status: str
    plan_id: Optional[int] = None
    plan_name: Optional[str] = None
    admin_areas: List[str] = []
    expires_at: datetime
    accepted_at: Optional[datetime] = None
    created_at: datetime
    acceptance_token: Optional[str] = None


class InvitationValidateResponse(BaseModel):
    email: str
    full_name: str
    role_code: str
    plan_name: Optional[str] = None
    admin_areas: List[str] = []
    expires_at: datetime


class InvitationAcceptRequest(BaseModel):
    token: str = Field(min_length=20, max_length=500)
    username: str = Field(min_length=2, max_length=100)
    password: str = Field(min_length=8, max_length=128)
    privacy_policy_version: str = Field(min_length=1, max_length=50)
    terms_version: str = Field(min_length=1, max_length=50)
    privacy_accepted: bool
    terms_accepted: bool

class Token(BaseModel):
    """Schema for JWT token response"""
    access_token: str
    refresh_token: Optional[str] = None
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

    class Config:
        from_attributes = True


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

# --- Practical Assessment Schemas ---

class AssessmentTaskBase(BaseModel):
    set_number: int
    set_name: Optional[str] = None
    unit_name: Optional[str] = None
    task_code: Optional[str] = None
    title: str
    description: Optional[str] = None
    order: int = 0
    file_name: Optional[str] = None
    is_assembly: bool = False
    assessment_type: Optional[str] = "3D"

class AssessmentTaskCreate(AssessmentTaskBase):
    pass

class AssessmentTaskResponse(AssessmentTaskBase):
    id: int
    master_file_path: Optional[str] = None
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class AssessmentFeedbackBase(BaseModel):
    submission_id: int
    checkback_file_path: Optional[str] = None
    comments: Optional[str] = None
    trainee_reply: Optional[str] = None
    replied_at: Optional[datetime] = None

class AssessmentFeedbackCreate(AssessmentFeedbackBase):
    pass

class AssessmentFeedbackResponse(AssessmentFeedbackBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class AssessmentSubmissionBase(BaseModel):
    task_id: int
    submission_file_path: str
    status: str = "pending"
    assessment_type: str = "3D"
    submission_kind: str = "task"
    source_quotation_id: Optional[int] = None
    display_label: Optional[str] = None

class AssessmentSubmissionCreate(AssessmentSubmissionBase):
    user_id: int

class AssessmentSubmissionResponse(AssessmentSubmissionBase):
    id: int
    user_id: int
    trainer_id: Optional[int] = None
    is_deleted: bool = False
    time_spent_seconds: int = 0
    submitted_at: datetime
    updated_at: datetime
    user: Optional[UserResponse] = None
    task: Optional[AssessmentTaskResponse] = None
    feedback: List[AssessmentFeedbackResponse] = []
    class Config:
        from_attributes = True

class TrainerTraineeMappingBase(BaseModel):
    trainer_id: int
    trainee_id: int

class TrainerTraineeMappingCreate(TrainerTraineeMappingBase):
    pass

class TrainerTraineeMappingResponse(TrainerTraineeMappingBase):
    id: int
    assigned_at: datetime
    class Config:
        from_attributes = True

class TraineeSetMappingBase(BaseModel):
    trainee_id: int
    display_set_number: int
    actual_set_number: int
    assessment_type: Optional[str] = "3D"

class TraineeSetMappingCreate(TraineeSetMappingBase):
    pass

class TraineeSetMappingResponse(TraineeSetMappingBase):
    id: int
    trainer_id: int
    created_at: datetime
    class Config:
        from_attributes = True

class NotificationResponse(BaseModel):
    id: int
    recipient_id: int
    sender_id: Optional[int] = None
    message: str
    type: Optional[str] = None
    is_read: bool
    created_at: datetime
    sender: Optional[UserResponse] = None

    class Config:
        from_attributes = True

class ChatMessage(BaseModel):
    role: str
    content: str

class ImagePayload(BaseModel):
    data: str
    mime: str

class ChatRequest(BaseModel):
    message: str
    images: Optional[List[ImagePayload]] = None

    @field_validator("images")
    @classmethod
    def limit_images(cls, v: Optional[List[ImagePayload]]) -> Optional[List[ImagePayload]]:
        if v and len(v) > 3:
            raise ValueError("Cannot upload more than 3 images")
        return v


class PlanEntitlementInput(BaseModel):
    resource_type: str
    resource_id: str
    permission_code: str = "view"
    limits_json: Optional[str] = None


class PlanEntitlementResponse(PlanEntitlementInput):
    id: int
    plan_id: int
    class Config:
        from_attributes = True


class AccessPlanCreate(BaseModel):
    code: str
    name: str
    description: Optional[str] = None
    display_order: int = 0
    is_active: bool = True
    is_publicly_requestable: bool = True


class AccessPlanUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None
    is_publicly_requestable: Optional[bool] = None


class AccessPlanResponse(AccessPlanCreate):
    id: int
    created_at: datetime
    updated_at: datetime
    entitlements: List[PlanEntitlementResponse] = Field(default_factory=list)
    class Config:
        from_attributes = True


class PlanAssignmentCreate(BaseModel):
    plan_id: int
    starts_at: datetime
    ends_at: Optional[datetime] = None
    reason: str = Field(min_length=1, max_length=500)

    @field_validator("ends_at")
    @classmethod
    def valid_assignment_range(cls, value: Optional[datetime], info):
        starts_at = info.data.get("starts_at")
        if value is not None and starts_at is not None and value <= starts_at:
            raise ValueError("ends_at must be later than starts_at")
        return value


class PlanAssignmentResponse(BaseModel):
    id: int
    user_id: int
    plan_id: int
    plan_code: str
    plan_name: str
    starts_at: datetime
    ends_at: Optional[datetime] = None
    status: str
    reason: Optional[str] = None
    created_at: datetime


class EffectiveEntitlementResponse(BaseModel):
    plan: Optional[dict] = None
    starts_at: Optional[datetime] = None
    ends_at: Optional[datetime] = None
    entitlements: List[dict] = Field(default_factory=list)


class EntitlementOverrideCreate(BaseModel):
    resource_type: Literal["course", "practical_set"]
    resource_id: str = Field(min_length=1, max_length=150)
    effect: Literal["allow", "deny"] = "allow"
    starts_at: datetime
    ends_at: datetime
    reason: str = Field(min_length=1, max_length=500)

    @field_validator("ends_at")
    @classmethod
    def valid_override_range(cls, value: datetime, info):
        starts_at = info.data.get("starts_at")
        if starts_at is not None and value <= starts_at:
            raise ValueError("ends_at must be later than starts_at")
        return value


class EntitlementOverrideResponse(BaseModel):
    id: int
    user_id: int
    resource_type: str
    resource_id: str
    permission_code: str
    effect: str
    starts_at: datetime
    ends_at: Optional[datetime]
    reason: str
    revoked_at: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True

