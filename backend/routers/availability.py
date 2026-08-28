from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..auth.dependencies import get_current_user, require_role
from ..database import get_db
from ..models import ContentAvailability, SystemLog, User
from ..schemas import ContentAvailabilityResponse, ContentAvailabilityUpdate

router = APIRouter(prefix="/availability", tags=["Course Availability"])

DEFAULT_RESOURCES = (
    ("icad_commands", "iCAD Commands", "coming_soon", "This course is currently being prepared and is not yet available."),
    ("icad_guide", "iCAD Guide", "available", None),
    ("icad_menu_setup", "iCAD Menu Setup", "available", None),
    ("solidworks_introduction", "SOLIDWORKS Introduction", "available", None),
    ("solidworks_3d_operation", "SOLIDWORKS 3D Operation", "available", None),
    ("solidworks_2d_operation", "SOLIDWORKS 2D Operation", "available", None),
)


def ensure_defaults(db: Session) -> None:
    existing = {row.resource_key for row in db.query(ContentAvailability.resource_key).all()}
    missing = [
        ContentAvailability(resource_key=key, display_name=name, status=status, message=message)
        for key, name, status, message in DEFAULT_RESOURCES
        if key not in existing
    ]
    if missing:
        db.add_all(missing)
        db.commit()


@router.get("", response_model=List[ContentAvailabilityResponse])
def list_availability(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ensure_defaults(db)
    return db.query(ContentAvailability).order_by(ContentAvailability.display_name).all()


@router.put("/{resource_key}", response_model=ContentAvailabilityResponse)
def update_availability(
    resource_key: str,
    payload: ContentAvailabilityUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(require_role("admin")),
):
    ensure_defaults(db)
    resource = db.query(ContentAvailability).filter(ContentAvailability.resource_key == resource_key).first()
    if not resource:
        raise HTTPException(status_code=404, detail="Course resource not found")

    old_status = resource.status
    resource.status = payload.status
    resource.message = payload.message.strip() if payload.message and payload.message.strip() else None
    resource.updated_by = admin.id
    db.add(SystemLog(
        level="INFO",
        message=f"Admin {admin.username} changed {resource.display_name} from {old_status} to {payload.status}",
        context="COURSE_AVAILABILITY",
        user_id=admin.id,
    ))
    db.commit()
    db.refresh(resource)
    return resource
