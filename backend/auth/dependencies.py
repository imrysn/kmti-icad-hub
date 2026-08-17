"""
Authentication dependencies for FastAPI

Provides dependency functions for protecting routes and extracting current user.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import RefreshSession, User
from .security import decode_token
from ..services.access_control_service import user_has_admin_area, user_has_permission

# Security scheme for JWT bearer tokens
security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """
    Extract and validate the current user from JWT token.
    
    Args:
        credentials: HTTP Authorization header with Bearer token
        db: Database session
        
    Returns:
        Current authenticated user
        
    Raises:
        HTTPException: If token is invalid or user not found
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        token = credentials.credentials
        payload = decode_token(token)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    
    if not user.is_active or user.account_status != "active":
        raise HTTPException(status_code=400, detail="Inactive user")
    session_id = payload.get("sid")
    if session_id is not None:
        session = db.query(RefreshSession).filter(RefreshSession.id == session_id, RefreshSession.user_id == user.id, RefreshSession.revoked_at.is_(None)).first()
        if session is None:
            raise credentials_exception
    
    return user

# get_current_active_user is intentionally removed — get_current_user already
# validates is_active. Use get_current_user directly everywhere.

def require_role(required_role: str):
    """
    Dependency factory for role-based access control.
    
    Args:
        required_role: Required role ("trainee", "employee", "admin")
        
    Returns:
        Dependency function that checks user role
    """
    async def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role != required_role and current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required role: {required_role}"
            )
        return current_user
    
    return role_checker


def require_permission(permission_code: str):
    """Require a named permission from the normalized access model."""
    async def permission_checker(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db),
    ) -> User:
        if not user_has_permission(db, current_user, permission_code):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required permission: {permission_code}",
            )
        return current_user

    return permission_checker


def require_admin_area(area_code: str):
    """Require one of the Content, Organization, or Platform Admin areas."""
    async def area_checker(
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db),
    ) -> User:
        if not user_has_admin_area(db, current_user, area_code):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required Admin area: {area_code}",
            )
        return current_user

    return area_checker
