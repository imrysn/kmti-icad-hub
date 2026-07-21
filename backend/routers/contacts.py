"""
Contacts Router
──────────────
Provides persistent preset lists for:
  - /api/v1/clients            → ClientPreset
  - /api/v1/project-incharges  → ProjectInchargePreset

These are used by the Quotation PrintPreviewModal to offer
autocomplete suggestions for client and project in-charge fields.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from pydantic import BaseModel
from typing import Optional, List

from ..database import get_db
from ..models import ClientPreset, ProjectInchargePreset
from ..auth.dependencies import get_current_user
from ..models import User

router = APIRouter(tags=["contacts"])


# ─── Schemas ────────────────────────────────────────────────────────────────

class ContactCreate(BaseModel):
    englishName: str
    japaneseName: Optional[str] = ""
    email: Optional[str] = ""
    category: Optional[str] = None  # used by project-incharges only


class ContactResponse(BaseModel):
    id: int
    englishName: str
    japaneseName: Optional[str] = ""
    email: Optional[str] = ""

    class Config:
        from_attributes = True


# ─── Clients ────────────────────────────────────────────────────────────────

@router.get("/clients", response_model=List[ContactResponse])
def list_clients(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Return all saved client presets."""
    rows = db.query(ClientPreset).order_by(ClientPreset.english_name).all()
    return [
        ContactResponse(id=r.id, englishName=r.english_name, japaneseName=r.japanese_name or "", email=r.email or "")
        for r in rows
    ]


@router.post("/clients", response_model=ContactResponse, status_code=201)
def create_client(
    body: ContactCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create or return an existing client preset (upsert by englishName)."""
    name = body.englishName.strip()
    if not name:
        raise HTTPException(status_code=400, detail="englishName cannot be empty")

    existing = db.query(ClientPreset).filter(ClientPreset.english_name == name).first()
    if existing:
        return ContactResponse(id=existing.id, englishName=existing.english_name, japaneseName=existing.japanese_name or "", email=existing.email or "")

    record = ClientPreset(
        english_name=name,
        japanese_name=body.japaneseName or "",
        email=body.email or "",
    )
    db.add(record)
    try:
        db.commit()
        db.refresh(record)
    except IntegrityError:
        db.rollback()
        existing = db.query(ClientPreset).filter(ClientPreset.english_name == name).first()
        return ContactResponse(id=existing.id, englishName=existing.english_name, japaneseName=existing.japanese_name or "", email=existing.email or "")

    return ContactResponse(id=record.id, englishName=record.english_name, japaneseName=record.japanese_name or "", email=record.email or "")


# ─── Project In-Charges ──────────────────────────────────────────────────────

@router.get("/project-incharges", response_model=List[ContactResponse])
def list_project_incharges(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Return all saved project in-charge presets."""
    rows = db.query(ProjectInchargePreset).order_by(ProjectInchargePreset.english_name).all()
    return [
        ContactResponse(id=r.id, englishName=r.english_name, japaneseName=r.japanese_name or "", email=r.email or "")
        for r in rows
    ]


@router.post("/project-incharges", response_model=ContactResponse, status_code=201)
def create_project_incharge(
    body: ContactCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create or return an existing project in-charge preset (upsert by englishName)."""
    name = body.englishName.strip()
    if not name:
        raise HTTPException(status_code=400, detail="englishName cannot be empty")

    existing = db.query(ProjectInchargePreset).filter(ProjectInchargePreset.english_name == name).first()
    if existing:
        return ContactResponse(id=existing.id, englishName=existing.english_name, japaneseName=existing.japanese_name or "", email=existing.email or "")

    record = ProjectInchargePreset(
        english_name=name,
        japanese_name=body.japaneseName or "",
        email=body.email or "",
        category=body.category or "INCHARGE",
    )
    db.add(record)
    try:
        db.commit()
        db.refresh(record)
    except IntegrityError:
        db.rollback()
        existing = db.query(ProjectInchargePreset).filter(ProjectInchargePreset.english_name == name).first()
        return ContactResponse(id=existing.id, englishName=existing.english_name, japaneseName=existing.japanese_name or "", email=existing.email or "")

    return ContactResponse(id=record.id, englishName=record.english_name, japaneseName=record.japanese_name or "", email=record.email or "")
