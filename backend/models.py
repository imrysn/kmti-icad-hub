from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, Text, JSON, CheckConstraint, UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
try:
    from .database import Base
except ImportError:
    from database import Base

class SystemSettings(Base):
    __tablename__ = "system_settings"

    key = Column(String(100), primary_key=True, index=True)
    value = Column(String(500))
    description = Column(String(200))

class UserActivity(Base):
    """Tracks real-time user activity across the app"""
    __tablename__ = "user_activities"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True, nullable=False)
    current_activity = Column(String(500))
    last_updated = Column(DateTime, default=func.now(), onupdate=func.now())

class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    course_id = Column(String(100), index=True)
    progress_percentage = Column(Float, default=0.0)
    last_accessed = Column(DateTime, nullable=True)

class QuizScore(Base):
    __tablename__ = "quiz_scores"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    course_id = Column(String(100), index=True)
    lesson_id = Column(String(100), index=True)
    score = Column(Float)  # Best score achieved
    first_attempt_score = Column(Float, nullable=True)
    attempts_count = Column(Integer, default=1)
    completed_at = Column(DateTime, nullable=True) # Time of best score
    first_attempt_at = Column(DateTime, nullable=True)

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
    # LMS access-foundation fields. The legacy role/is_active columns remain
    # authoritative during the compatibility rollout.
    account_status = Column(String(50), default="active", nullable=False, index=True)
    email_verified_at = Column(DateTime, nullable=True)
    approved_at = Column(DateTime, nullable=True)
    approved_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    preferred_language = Column(String(10), default="en", nullable=False)
    timezone = Column(String(100), default="Asia/Manila", nullable=False)
    created_at = Column(DateTime, nullable=True)
    last_login = Column(DateTime, nullable=True)
    custom_comments = Column(JSON, default=list)


class Role(Base):
    """Stable platform roles: learner, instructor, and admin."""
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True)
    code = Column(String(50), unique=True, nullable=False, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(500), nullable=True)
    is_system = Column(Boolean, default=True, nullable=False)


class Permission(Base):
    """Named server-side capability used by authorization policies."""
    __tablename__ = "permissions"

    id = Column(Integer, primary_key=True)
    code = Column(String(100), unique=True, nullable=False, index=True)
    description = Column(String(500), nullable=True)


class RolePermission(Base):
    __tablename__ = "role_permissions"

    role_id = Column(Integer, ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True)
    permission_id = Column(Integer, ForeignKey("permissions.id", ondelete="CASCADE"), primary_key=True)


class UserRole(Base):
    """Append-friendly role grant history; revoked rows are retained."""
    __tablename__ = "user_roles"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    role_id = Column(Integer, ForeignKey("roles.id", ondelete="CASCADE"), nullable=False, index=True)
    granted_at = Column(DateTime, default=func.now(), nullable=False)
    granted_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    revoked_at = Column(DateTime, nullable=True, index=True)
    reason = Column(String(500), nullable=True)


class AdminAreaGrant(Base):
    """Controls visibility and base access for the three Admin Panel pages."""
    __tablename__ = "admin_area_grants"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    area_code = Column(String(50), nullable=False, index=True)  # content, organization, platform
    granted_at = Column(DateTime, default=func.now(), nullable=False)
    granted_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    revoked_at = Column(DateTime, nullable=True, index=True)
    reason = Column(String(500), nullable=True)


class UserPermissionGrant(Base):
    """Granular allow/deny exception within an assigned Admin area."""
    __tablename__ = "user_permission_grants"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    permission_id = Column(Integer, ForeignKey("permissions.id", ondelete="CASCADE"), nullable=False)
    effect = Column(String(10), nullable=False, default="allow")  # allow or deny
    granted_at = Column(DateTime, default=func.now(), nullable=False)
    granted_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    revoked_at = Column(DateTime, nullable=True, index=True)
    reason = Column(String(500), nullable=True)


class AuditEvent(Base):
    """Append-only security and administration audit record."""
    __tablename__ = "audit_events"

    id = Column(Integer, primary_key=True)
    occurred_at = Column(DateTime, default=func.now(), nullable=False, index=True)
    actor_user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    action = Column(String(100), nullable=False, index=True)
    target_type = Column(String(100), nullable=False)
    target_id = Column(String(100), nullable=True)
    request_id = Column(String(100), nullable=True, index=True)
    result = Column(String(50), nullable=False, default="success")
    # Text-encoded JSON keeps compatibility with the deployed MySQL/MariaDB
    # version, which does not support a native JSON column for this table.
    metadata_json = Column(Text, nullable=True)


class AccessPlan(Base):
    """Configurable learner access level; not a billing subscription."""
    __tablename__ = "access_plans"

    id = Column(Integer, primary_key=True)
    code = Column(String(50), unique=True, nullable=False, index=True)
    name = Column(String(150), nullable=False)
    description = Column(String(1000), nullable=True)
    display_order = Column(Integer, nullable=False, default=0)
    is_active = Column(Boolean, nullable=False, default=True, index=True)
    is_publicly_requestable = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, nullable=False, default=func.now())
    updated_at = Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())


class PlanEntitlement(Base):
    """A resource or service made available through an access plan."""
    __tablename__ = "plan_entitlements"
    __table_args__ = (UniqueConstraint("plan_id", "resource_type", "resource_id", "permission_code", name="uq_plan_entitlement_resource"),)

    id = Column(Integer, primary_key=True)
    plan_id = Column(Integer, ForeignKey("access_plans.id", ondelete="CASCADE"), nullable=False, index=True)
    resource_type = Column(String(50), nullable=False, index=True)
    resource_id = Column(String(150), nullable=False)
    permission_code = Column(String(100), nullable=False, default="view")
    limits_json = Column(Text, nullable=True)


class UserPlanAssignment(Base):
    """Append-friendly learner plan history."""
    __tablename__ = "user_plan_assignments"
    __table_args__ = (
        CheckConstraint("status IN ('scheduled','active','expired','cancelled')", name="ck_user_plan_assignment_status"),
        CheckConstraint("ends_at IS NULL OR ends_at > starts_at", name="ck_user_plan_assignment_dates"),
    )

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    plan_id = Column(Integer, ForeignKey("access_plans.id"), nullable=False, index=True)
    starts_at = Column(DateTime, nullable=False, default=func.now())
    ends_at = Column(DateTime, nullable=True, index=True)
    status = Column(String(30), nullable=False, default="active", index=True)
    assigned_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    reason = Column(String(500), nullable=True)
    created_at = Column(DateTime, nullable=False, default=func.now())


class RegistrationApplication(Base):
    """Public learner application reviewed by an Organization administrator."""
    __tablename__ = "registration_applications"
    __table_args__ = (
        CheckConstraint(
            "status IN ('email_verification_pending','pending_approval','approved','rejected','clarification_required','cancelled','duplicate')",
            name="ck_registration_application_status",
        ),
    )

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True, index=True)
    email_normalized = Column(String(255), nullable=False, index=True)
    company_name = Column(String(200), nullable=True)
    department = Column(String(200), nullable=True)
    job_title = Column(String(200), nullable=True)
    country_code = Column(String(2), nullable=True)
    reason_for_access = Column(String(2000), nullable=True)
    requested_plan_id = Column(Integer, ForeignKey("access_plans.id"), nullable=False, index=True)
    assigned_plan_id = Column(Integer, ForeignKey("access_plans.id"), nullable=True)
    status = Column(String(50), nullable=False, default="email_verification_pending", index=True)
    submitted_at = Column(DateTime, nullable=False, default=func.now())
    email_verified_at = Column(DateTime, nullable=True)
    reviewed_at = Column(DateTime, nullable=True)
    reviewed_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    internal_review_notes = Column(Text, nullable=True)
    applicant_message = Column(Text, nullable=True)
    privacy_policy_version = Column(String(50), nullable=False)
    privacy_consented_at = Column(DateTime, nullable=False)
    terms_version = Column(String(50), nullable=False)
    terms_accepted_at = Column(DateTime, nullable=False)
    version = Column(Integer, nullable=False, default=1)


class EmailVerificationToken(Base):
    __tablename__ = "email_verification_tokens"

    id = Column(Integer, primary_key=True)
    application_id = Column(Integer, ForeignKey("registration_applications.id", ondelete="CASCADE"), nullable=False, index=True)
    token_hash = Column(String(64), nullable=False, unique=True, index=True)
    expires_at = Column(DateTime, nullable=False, index=True)
    used_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=func.now())


class EmailOutbox(Base):
    """Transactional email queued in the same database transaction as its event."""
    __tablename__ = "email_outbox"
    __table_args__ = (
        CheckConstraint("status IN ('pending','processing','sent','failed','cancelled')", name="ck_email_outbox_status"),
    )

    id = Column(Integer, primary_key=True)
    message_type = Column(String(100), nullable=False, index=True)
    recipient_email = Column(String(255), nullable=False, index=True)
    recipient_name = Column(String(200), nullable=True)
    preferred_language = Column(String(10), nullable=False, default="en")
    subject = Column(String(500), nullable=False)
    text_body = Column(Text, nullable=False)
    html_body = Column(Text, nullable=False)
    status = Column(String(20), nullable=False, default="pending", index=True)
    attempts = Column(Integer, nullable=False, default=0)
    next_attempt_at = Column(DateTime, nullable=False, default=func.now(), index=True)
    last_attempt_at = Column(DateTime, nullable=True)
    sent_at = Column(DateTime, nullable=True)
    provider_message_id = Column(String(255), nullable=True)
    last_error = Column(String(1000), nullable=True)
    related_type = Column(String(100), nullable=True)
    related_id = Column(String(100), nullable=True)
    created_at = Column(DateTime, nullable=False, default=func.now())


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





class SavedSnippet(Base):
    """Personal notebook entries for trainees to save key insights"""
    __tablename__ = "saved_snippets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False) # FK to users.id
    content = Column(Text, nullable=False)        # The clipped text
    source = Column(String(200), nullable=True)           # E.g. "AI Response", "2D Keyway Lesson"
    tags = Column(String(500), nullable=True)             # Optional tags for categorization
    created_at = Column(DateTime, default=func.now(), index=True)


class Quiz(Base):
    """Definition of a quiz associated with a lesson/course"""
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True)  # Links to curriculum lesson ID
    title = Column(String(200), nullable=False)
    title_ja = Column(String(200), nullable=True)
    description = Column(String(500))
    description_ja = Column(String(500), nullable=True)
    course_type = Column(String(50))  # e.g., "2D_Drawing", "3D_Modeling"
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


class Question(Base):
    """Individual quiz question"""
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id", ondelete="CASCADE"), nullable=False)
    text = Column(String(1000), nullable=False)
    text_ja = Column(String(1000), nullable=True)
    options_json = Column(String(2000), nullable=False)  # JSON-encoded list of strings
    options_json_ja = Column(String(2000), nullable=True)
    correct_answer = Column(Integer, nullable=False)     # Index (0-based)
    explanation = Column(String(1000))
    explanation_ja = Column(String(1000), nullable=True)
    order = Column(Integer, default=0)                   # For manual sorting


class Course(Base):
    """Top-level curriculum categories (2D, 3D, etc.)"""
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    title_ja = Column(String(200), nullable=True)
    description = Column(String(500))
    description_ja = Column(String(500), nullable=True)
    course_type = Column(String(50), unique=True) # e.g., "2D_Drawing", "3D_Modeling"
    order = Column(Integer, default=0)


class Lesson(Base):
    """Hierarchical curriculum lessons"""
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    parent_id = Column(Integer, ForeignKey("lessons.id", ondelete="CASCADE"), nullable=True)
    title = Column(String(200), nullable=False)
    title_ja = Column(String(200), nullable=True)
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
    data = Column(Text) # Using large String for content
    data_ja = Column(Text, nullable=True)
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
    seconds_spent = Column(Integer, default=0) # Time taken to answer
    attempted_at = Column(DateTime, default=func.now())



class AssessmentTask(Base):
    """Definition of a practical assessment task (Set 1-10)"""
    __tablename__ = "assessment_tasks"

    id = Column(Integer, primary_key=True, index=True)
    set_number = Column(Integer, nullable=False, index=True) # 1-10
    set_name = Column(String(200), nullable=True) # Custom name for the set (e.g., "Bonus Set")
    unit_name = Column(String(200), nullable=True) # e.g., "2655RCGR"
    task_code = Column(String(10), nullable=True) # e.g., "A", "B"
    title = Column(String(200), nullable=False)
    title_ja = Column(String(200), nullable=True)
    description = Column(Text)
    description_ja = Column(Text, nullable=True)
    master_file_path = Column(String(500)) # Path to master .dwg
    file_name = Column(String(200), nullable=True) # Name of the file
    is_assembly = Column(Boolean, default=False) # True if it's the master assembly
    assessment_type = Column(String(50), default="3D") # "3D" or "2D"
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=func.now())

    submissions = relationship("AssessmentSubmission", back_populates="task")

class AssessmentSubmission(Base):
    """Trainee submission for a practical assessment task"""
    __tablename__ = "assessment_submissions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    task_id = Column(Integer, ForeignKey("assessment_tasks.id"), nullable=False)
    submission_file_path = Column(String(500)) # Path to uploaded .dwg
    status = Column(String(50), default="pending") # "pending", "approved", "rejected"
    assessment_type = Column(String(50), default="3D") # "3D" or "2D"
    submission_kind = Column(String(50), default="task", nullable=False) # "task" or "quotation"
    source_quotation_id = Column(Integer, nullable=True, index=True)
    display_label = Column(String(200), nullable=True)
    trainer_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Trainer who reviewed it
    is_deleted = Column(Boolean, default=False) # Soft delete flag
    time_spent_seconds = Column(Integer, default=0) # Trainee time tracking
    submitted_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    user = relationship("User", foreign_keys=[user_id])
    task = relationship("AssessmentTask", back_populates="submissions")
    feedback = relationship("AssessmentFeedback", back_populates="submission", cascade="all, delete-orphan")

class AssessmentFeedback(Base):
    """Detailed feedback for a submission, including Excel checkback"""
    __tablename__ = "assessment_feedback"

    id = Column(Integer, primary_key=True, index=True)
    submission_id = Column(Integer, ForeignKey("assessment_submissions.id", ondelete="CASCADE"), nullable=False)
    checkback_file_path = Column(String(500)) # Path to Excel checkback file
    comments = Column(Text)
    trainee_reply = Column(Text, nullable=True)
    replied_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=func.now())

    submission = relationship("AssessmentSubmission", back_populates="feedback")

class TrainerTraineeMapping(Base):
    """Relationship between a trainer (Employee) and a trainee"""
    __tablename__ = "trainer_trainee_mappings"

    id = Column(Integer, primary_key=True, index=True)
    trainer_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    trainee_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    assigned_at = Column(DateTime, default=func.now())

    trainee = relationship("User", foreign_keys=[trainee_id])
    trainer = relationship("User", foreign_keys=[trainer_id])

class TraineeSetMapping(Base):
    """Maps actual assessment sets to display sets for a specific trainee"""
    __tablename__ = "trainee_set_mappings"

    id = Column(Integer, primary_key=True, index=True)
    trainee_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    trainer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    display_set_number = Column(Integer, nullable=False)
    actual_set_number = Column(Integer, nullable=False)
    assessment_type = Column(String(50), default="3D", server_default="3D")
    created_at = Column(DateTime, default=func.now())

    trainee = relationship("User", foreign_keys=[trainee_id])
    trainer = relationship("User", foreign_keys=[trainer_id])

class Notification(Base):
    """System notifications for users (e.g. Trainers notified of submissions)"""
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    recipient_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    message = Column(String(1000), nullable=False)
    type = Column(String(50)) # "assessment_completion", "feedback_reply", etc.
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())

    recipient = relationship("User", foreign_keys=[recipient_id])
    sender = relationship("User", foreign_keys=[sender_id])


class QueryCache(Base):
    """Semantic search query cache for AI Instructor responses"""
    __tablename__ = "query_cache"

    query_hash = Column(String(64), primary_key=True, index=True)
    query_text = Column(String(2000))
    answer = Column(Text)
    sources_json = Column(Text)
    hit_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=func.now())
    expires_at = Column(DateTime, index=True)

class Quotation(Base):
    __tablename__ = "quotations"

    id = Column(Integer, primary_key=True, index=True)
    quotation_no = Column(String(50), unique=True, index=True, nullable=False)
    client_name = Column(String(255), index=True)
    designer_name = Column(String(255), index=True)
    workstation = Column(String(255), index=True)
    date = Column(DateTime, default=func.now())
    data = Column(Text, nullable=False)

    # Collaboration Session Metadata
    is_active = Column(Boolean, default=False)
    password = Column(String(255), nullable=True)
    display_name = Column(String(255), nullable=True)

    # Billing & Monitoring fields
    grand_total = Column(Float, default=0.0) # Changed to Float since Numeric requires imports we may not have
    customer_incharge = Column(String(255), nullable=True)
    quotation_status = Column(String(50), default="DRAFT")
    project_status = Column(String(50), default="On Going")
    submitted_to_admin_at = Column(DateTime, nullable=True)
    bill_to = Column(String(255), nullable=True)
    date_paid = Column(DateTime, nullable=True)
    updated_by = Column(String(255), nullable=True)
    last_updated_at = Column(DateTime, nullable=True)
    update_detail = Column(Text, nullable=True)
    billing_status = Column(String(50), nullable=True)
    is_deleted = Column(Boolean, default=False, nullable=False)

    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now())

    # Relationships
    history = relationship("QuotationHistory", back_populates="quotation", cascade="all, delete-orphan")

class QuotationHistory(Base):
    __tablename__ = "quotation_history"

    id = Column(Integer, primary_key=True, index=True)
    quotation_id = Column(Integer, ForeignKey("quotations.id"), nullable=False)
    label = Column(String(255))
    author = Column(String(255))
    data = Column(Text, nullable=False)
    created_at = Column(DateTime, default=func.now())

    # Relationships
    quotation = relationship("Quotation", back_populates="history")

class ClientPreset(Base):
    """Stores saved client names for quick selection in quotation forms"""
    __tablename__ = "client_presets"

    id = Column(Integer, primary_key=True, index=True)
    english_name = Column(String(255), unique=True, nullable=False, index=True)
    japanese_name = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=func.now())

class ProjectInchargePreset(Base):
    """Stores saved project in-charge names for quick selection in quotation forms"""
    __tablename__ = "project_incharge_presets"

    id = Column(Integer, primary_key=True, index=True)
    english_name = Column(String(255), unique=True, nullable=False, index=True)
    japanese_name = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    category = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=func.now())
