from datetime import datetime, timezone
from pathlib import Path
import secrets

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy import or_
from sqlalchemy.orm import Session

from ..auth.dependencies import get_current_user, require_role
from ..database import get_db
from ..models import AccessPlan, BugReport, User, UserPlanAssignment
from ..schemas import BillingProfile, BillingProfileUpdate

router = APIRouter(tags=["account and support"])
UPLOAD_DIR = Path(__file__).resolve().parents[1] / "uploads" / "bug_reports"
AVATAR_DIR = Path(__file__).resolve().parents[1] / "uploads" / "avatars"
ALLOWED_IMAGES = {"image/png": ".png", "image/jpeg": ".jpg", "image/webp": ".webp"}


def _billing_profile(user: User) -> BillingProfile:
    return BillingProfile(
        billing_email=user.email,
        full_name=user.billing_name or user.full_name,
        country=user.billing_country,
        address_line1=user.billing_address_line1,
        address_line2=user.billing_address_line2,
        city=user.billing_city,
        postal_code=user.billing_postal_code,
        province=user.billing_province,
    )


@router.get("/account/billing-profile", response_model=BillingProfile)
def get_billing_profile(current_user: User = Depends(get_current_user)):
    return _billing_profile(current_user)


@router.put("/account/billing-profile", response_model=BillingProfile)
def update_billing_profile(payload: BillingProfileUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    values = payload.model_dump()
    current_user.billing_name = (values["full_name"] or "").strip() or None
    current_user.billing_country = (values["country"] or "").strip() or None
    current_user.billing_address_line1 = (values["address_line1"] or "").strip() or None
    current_user.billing_address_line2 = (values["address_line2"] or "").strip() or None
    current_user.billing_city = (values["city"] or "").strip() or None
    current_user.billing_postal_code = (values["postal_code"] or "").strip() or None
    current_user.billing_province = (values["province"] or "").strip() or None
    db.commit(); db.refresh(current_user)
    return _billing_profile(current_user)


@router.post("/account/avatar")
async def upload_avatar(avatar: UploadFile = File(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    suffix = ALLOWED_IMAGES.get(avatar.content_type or "")
    if not suffix: raise HTTPException(status_code=400, detail="Profile picture must be PNG, JPG, or WebP")
    data = await avatar.read(2 * 1024 * 1024 + 1)
    if len(data) > 2 * 1024 * 1024: raise HTTPException(status_code=400, detail="Profile picture must be 2 MB or smaller")
    AVATAR_DIR.mkdir(parents=True, exist_ok=True)
    target = AVATAR_DIR / f"user-{current_user.id}-{secrets.token_hex(8)}{suffix}"
    target.write_bytes(data)
    old_path = Path(current_user.avatar_path) if current_user.avatar_path else None
    current_user.avatar_path = str(target); db.commit(); db.refresh(current_user)
    if old_path and old_path.exists() and old_path.parent == AVATAR_DIR:
        old_path.unlink(missing_ok=True)
    return {"avatar_url": current_user.avatar_url}


def _serialize_bug(row: BugReport):
    return {
        "id": row.id,
        "reporter_user_id": row.reporter_user_id,
        "reporter_name": row.reporter.full_name or row.reporter.username,
        "description": row.description,
        "page_url": row.page_url,
        "screenshot_url": f"/uploads/bug-reports/{Path(row.screenshot_path).name}" if row.screenshot_path else None,
        "status": row.status,
        "admin_notes": row.admin_notes,
        "created_at": row.created_at,
        "reviewed_at": row.reviewed_at,
    }


@router.post("/support/bug-reports")
async def create_bug_report(
    description: str = Form(..., min_length=10, max_length=5000),
    page_url: str | None = Form(default=None, max_length=1000),
    screenshot: UploadFile | None = File(default=None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    screenshot_path = None
    if screenshot:
        suffix = ALLOWED_IMAGES.get(screenshot.content_type or "")
        if not suffix:
            raise HTTPException(status_code=400, detail="Screenshot must be PNG, JPG, or WebP")
        data = await screenshot.read(5 * 1024 * 1024 + 1)
        if len(data) > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Screenshot must be 5 MB or smaller")
        UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
        target = UPLOAD_DIR / f"{secrets.token_hex(16)}{suffix}"
        target.write_bytes(data)
        screenshot_path = str(target)

    row = BugReport(reporter_user_id=current_user.id, description=description.strip(), page_url=page_url, screenshot_path=screenshot_path)
    db.add(row); db.commit(); db.refresh(row)
    return _serialize_bug(row)


@router.get("/admin/support/bug-reports")
def list_bug_reports(admin: User = Depends(require_role("admin")), db: Session = Depends(get_db)):
    rows = db.query(BugReport).order_by(BugReport.created_at.desc()).all()
    return [_serialize_bug(row) for row in rows]


@router.patch("/admin/support/bug-reports/{report_id}")
def review_bug_report(report_id: int, status: str = Form(...), admin_notes: str = Form(default=""), admin: User = Depends(require_role("admin")), db: Session = Depends(get_db)):
    if status not in {"open", "in_review", "resolved", "closed"}:
        raise HTTPException(status_code=400, detail="Invalid report status")
    row = db.query(BugReport).filter(BugReport.id == report_id).first()
    if not row: raise HTTPException(status_code=404, detail="Bug report not found")
    row.status = status; row.admin_notes = admin_notes.strip() or None; row.reviewed_by_user_id = admin.id
    row.reviewed_at = datetime.now(timezone.utc).replace(tzinfo=None)
    db.commit(); db.refresh(row)
    return _serialize_bug(row)


@router.post("/account/billing/cancel")
def cancel_current_plan(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    assignment = db.query(UserPlanAssignment).filter(
        UserPlanAssignment.user_id == current_user.id,
        UserPlanAssignment.status == "active",
        UserPlanAssignment.starts_at <= now,
        or_(UserPlanAssignment.ends_at.is_(None), UserPlanAssignment.ends_at > now),
    ).order_by(UserPlanAssignment.starts_at.desc()).first()
    if not assignment: raise HTTPException(status_code=404, detail="No active plan to cancel")
    assignment.status = "cancelled"; assignment.ends_at = now; assignment.reason = "Cancelled by learner"
    db.commit()
    return {"status": "cancelled", "ends_at": now}
