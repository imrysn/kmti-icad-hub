"""
Authentication Router

Handles user registration, login, and user management endpoints.
"""

from datetime import datetime, timedelta, timezone
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User, SystemLog, QuizScore, UserProgress
from ..schemas import UserCreate, UserLogin, Token, UserResponse, ForgotPasswordRequest, QuizSubmission, LessonProgress
from ..auth.security import hash_password, verify_password, create_access_token
from ..auth.dependencies import get_current_user, require_role

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user.
    
    Args:
        user_data: User registration data
        db: Database session
        
    Returns:
        Created user information
        
    Raises:
        HTTPException: If username or email already exists
    """
    # Check if username already exists
    existing_user = db.query(User).filter(User.username == user_data.username).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Check if email already exists
    existing_email = db.query(User).filter(User.email == user_data.email).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
        full_name=user_data.full_name,
        role=user_data.role,
        created_at=datetime.now(timezone.utc)
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.post("/login", response_model=Token)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    """
    Login and receive access token.
    
    Args:
        login_data: Login credentials
        db: Database session
        
    Returns:
        Access token
        
    Raises:
        HTTPException: If credentials are invalid
    """
    # Find user by username
    user = db.query(User).filter(User.username == login_data.username).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account with this email not found.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password. Please try again.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user account"
        )
    
    # Check for required role if specified
    if login_data.required_role:
        if login_data.required_role == "admin":
            if user.role != "admin":
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="This account is not authorized for Administrator access."
                )
        elif login_data.required_role == "user":
            # PHASE 1 REMOVAL: Allow Administrators to log in through the main portal
            # This allows a unified login experience as requested.
            pass
        elif user.role != login_data.required_role:
             raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"This account is not authorized for {login_data.required_role} access."
            )
    
    # Update last login
    user.last_login = datetime.now(timezone.utc)
    db.commit()
    
    # Create access token with optional longer expiration
    expires_delta = None
    if login_data.remember_me:
        # 30 days for Remember Me
        expires_delta = timedelta(days=30)
    
    access_token = create_access_token(
        data={"sub": user.username, "role": user.role},
        expires_delta=expires_delta
    )
    
    # Log the login
    log_entry = SystemLog(
        level="INFO",
        message=f"User {user.username} logged in",
        context="AUTH",
        user_id=user.id
    )
    db.add(log_entry)
    db.commit()
    
    return {"access_token": access_token, "token_type": "bearer", "user": user}
    
@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """
    Handle forgot password request by logging it for admin review.
    """
    # Find user if possible (for logging context)
    user = db.query(User).filter(
        (User.username == request.username_or_email) | 
        (User.email == request.username_or_email)
    ).first()
    
    message = f"Password reset requested for: {request.username_or_email}"
    
    # Log the request
    log_entry = SystemLog(
        level="WARNING",
        message=message,
        context="AUTH_RESET",
        user_id=user.id if user else None
    )
    db.add(log_entry)
    db.commit()
    
    return {"message": "If an account exists for that username/email, a reset request has been sent to the administrator."}

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """
    Get current authenticated user information.
    
    Args:
        current_user: Current authenticated user
        
    Returns:
        User information
    """
    return current_user

@router.post("/logout")
async def logout(current_user: User = Depends(get_current_user)):
    """
    Logout (client-side token removal).

    Note: JWT tokens are stateless, so logout is handled client-side
    by removing the token from storage.
    """
    return {"message": "Successfully logged out"}


@router.get("/users", response_model=List[UserResponse])
def list_users(
    db: Session = Depends(get_db),
    _: User = Depends(require_role("admin"))
):
    """
    List all registered users. Admin only.
    """
    return db.query(User).order_by(User.created_at.desc()).all()


@router.patch("/users/{user_id}/status")
def toggle_user_status(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin"))
):
    """
    Enable or disable a user account. Admin only.
    Cannot disable your own account.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.id == admin.id:
        raise HTTPException(status_code=400, detail="Cannot disable your own account")
    user.is_active = not user.is_active
    
    # Log the status change
    log_entry = SystemLog(
        level="INFO",
        message=f"Admin {admin.username} {'enabled' if user.is_active else 'disabled'} user {user.username}",
        context="USER_MGMT",
        user_id=admin.id
    )
    db.add(log_entry)
    
    db.commit()
    db.refresh(user)
    return {"id": user.id, "username": user.username, "is_active": user.is_active}
@router.get("/progress/{course_id}", response_model=List[LessonProgress])
def get_course_progress(
    course_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all completed lessons and scores for a specific course for the current user.
    """
    scores = db.query(QuizScore).filter(
        QuizScore.user_id == str(current_user.id),
        QuizScore.course_id == course_id
    ).all()
    
    return [
        LessonProgress(
            lesson_id=score.lesson_id,
            course_id=score.course_id,
            is_completed=score.score >= 80.0,
            score=score.score,
            completed_at=score.completed_at
        ) for score in scores
    ]

@router.post("/submit-quiz")
def submit_quiz_score(
    submission: QuizSubmission,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Submit a quiz score for a lesson.
    If score >= 80%, the lesson is effectively marked as passed.
    """
    # Check if a score already exists for this lesson
    existing_score = db.query(QuizScore).filter(
        QuizScore.user_id == str(current_user.id),
        QuizScore.course_id == submission.course_id,
        QuizScore.lesson_id == submission.lesson_id
    ).first()
    
    if existing_score:
        # Increment attempt counter
        existing_score.attempts_count = (existing_score.attempts_count or 0) + 1
        
        # Update score only if the new one is higher
        if submission.score > existing_score.score:
            existing_score.score = submission.score
            existing_score.completed_at = datetime.now(timezone.utc)
    else:
        new_score = QuizScore(
            user_id=str(current_user.id),
            course_id=submission.course_id,
            lesson_id=submission.lesson_id,
            score=submission.score,
            completed_at=datetime.now(timezone.utc)
        )
        db.add(new_score)
    
    db.commit()
    
    # Optional: Update overall UserProgress percentage
    # (Implementation omitted for now, could calculate based on total lessons)
    
    return {"message": "Score submitted successfully", "score": submission.score, "passed": submission.score >= 80.0}
