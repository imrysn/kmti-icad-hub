r"""
Quotations Router v2 (Database-First)
─────────────────────────────────────────────────────────────────
Handles centralized quotation management using MySQL:
  - Persistent storage in 'quotations' table.
  - Version history in 'quotation_history' table.
  - Real-time collaborative editing via Socket.IO.
  - Automatic session recovery on server restart.

File Persistence Policy:
  - The database is the primary source of truth.
  - Backups to NAS can be triggered periodically (configurable).
"""

import os
import json
import asyncio
from datetime import datetime, timezone
from typing import Any, List, Optional
from pydantic import BaseModel

from fastapi import APIRouter, HTTPException, Depends, status, Request
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from sqlalchemy import select, update, delete, desc, or_
from sqlalchemy.orm import selectinload

from ..database import get_db, APP_PATH
from ..models import Quotation, QuotationHistory
from ..models import User
from ..auth.dependencies import get_current_user
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def cache_get(*args, **kwargs): return None
def cache_set(*args, **kwargs): pass
def cache_delete(*args, **kwargs): pass
def log_activity(*args, **kwargs): pass

router = APIRouter(prefix="/quotations", tags=["quotations"])

def _get_audit_label(path: str, full_state: dict = None) -> str:
    """Map a technical JSON path to a human-readable field name."""
    if not path: return "Document"
    p = path.lower()
    field = path.split('.')[-1].replace('_', ' ').title()
    
    if "companyinfo" in p: return f"Company {field}"
    if "clientinfo" in p: return f"Client {field}"
    if "quotationdetails" in p: return f"Quotation {field.replace('No', '#')}"
    if "billingdetails" in p: return f"Billing {field}"
    
    if "task" in p:
        parts = path.split('.')
        if len(parts) >= 2:
            task_id_str = parts[1]
            assembly_name = f"Task #{task_id_str}"
            if full_state and "tasks" in full_state:
                try:
                    target_id = int(task_id_str)
                    for t in full_state["tasks"]:
                        if t.get("id") == target_id:
                            desc = t.get('description', '').strip()
                            assembly_name = f"'{desc}'" if desc else f"Task #{target_id}"
                            break
                except: pass
            
            # Map manual override fields
            if "manual" in field.lower():
                field = field.replace("manual", "").strip()
                return f"{assembly_name}'s {field} (Override)"
                
            return f"{assembly_name}'s {field}"
        return "Tasks"
    if "signatures" in p: return "Signatures"
    if "footer" in p: return f"Footer {field}"
    return path

def safe_json_loads(val: Optional[str]) -> dict:
    if not val:
        return {}
    try:
        return json.loads(val)
    except Exception as e:
        print(f"Error decoding JSON: {e}")
        return {}

@router.get("/templates/{template_name}")
def get_template(template_name: str):
    """Serve an Excel template file from backend/data/.
    
    Used by the frontend Excel export to load a pixel-perfect base template
    rather than building layout from scratch with ExcelJS.
    template_name: 'quotation' | 'billing'
    """
    filename = _TEMPLATE_MAP.get(template_name)
    if not filename:
        raise HTTPException(status_code=404, detail=f"Unknown template: '{template_name}'")
    
    file_path = os.path.join(BASE_DIR, "data", filename)
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail=f"Template file not found on disk: {filename}")
    
    return FileResponse(
        path=file_path,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename=filename,
    )

@router.get("/")
def list_quotations(
    q: Optional[str] = None, 
    designer: Optional[str] = None,
    limit: int = 100, 
    offset: int = 0,
    trash_only: bool = False,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List quotations from DB with filtering."""
    is_admin = current_user.role in ['admin', 'it']
    cache_key = f"{q or ''}:{designer or ''}:{limit}:{offset}:{is_admin}:{trash_only}"
    cached_val = cache_get("quot_list", cache_key)
    if cached_val is not None:
        return cached_val

    stmt = select(Quotation).order_by(desc(Quotation.updated_at))
    
    if trash_only:
        if not is_admin:
            raise HTTPException(status_code=403, detail="Access Denied: Only administrators can access the trash bin.")
        stmt = stmt.where(Quotation.is_deleted == True)
    else:
        stmt = stmt.where(Quotation.is_deleted == False)
        
    if q:
        stmt = stmt.where(or_(
            Quotation.quotation_no.ilike(f"%{q}%"),
            Quotation.client_name.ilike(f"%{q}%")
        ))
    if designer:
        stmt = stmt.where(Quotation.designer_name.ilike(f"%{designer}%"))
    
    stmt = stmt.limit(limit).offset(offset)
    result = db.execute(stmt)
    items = result.scalars().all()
    
    res_dict = {
        "quotations": [
            {
                "id": i.id,
                "quotationNo": i.quotation_no,
                "clientName": i.client_name,
                "designerName": i.designer_name,
                "workstation": i.workstation,
                "date": i.date.strftime("%Y-%m-%d") if i.date else None,
                "modifiedAt": i.updated_at.isoformat() + "Z" if i.updated_at else None,
                "isActive": i.is_active,
                "hasPassword": bool(i.password),
                "password": i.password if is_admin else None, # Elevated view for recovery
                "displayName": i.display_name or i.quotation_no,
                
                # New fields for Billing Monitoring
                "grandTotal": float(i.grand_total or 0.0),
                "customerIncharge": i.customer_incharge or "",
                "quotationStatus": i.quotation_status or "DRAFT",
                "projectStatus": i.project_status or "On Going",
                "submittedToAdminAt": i.submitted_to_admin_at.strftime("%Y-%m-%d") if i.submitted_to_admin_at else None,
                "billTo": (
                    (safe_json_loads(i.data).get("clientInfo", {}).get("company", "") if i.data else "") or 
                    i.bill_to or 
                    ""
                ),
                "datePaid": i.date_paid.strftime("%Y-%m-%d") if i.date_paid else None,
                "updatedBy": i.updated_by or "",
                "lastUpdatedAt": i.last_updated_at.strftime("%Y-%m-%d %H:%M") if i.last_updated_at else None,
                "updateDetail": i.update_detail or "",
                "billingStatus": i.billing_status or None,
                "data": safe_json_loads(i.data) if i.data else {}
            } for i in items
        ]
    }
    cache_set("quot_list", cache_key, res_dict)
    return res_dict
 
@router.get("/sessions")
def list_active_sessions(db: Session = Depends(get_db)):
    """Returns list of quotations that are currently active.
    
    Cross-references the database 'is_active' flag with the live Socket.IO presence.
    This provides a resilient list that doesn't disappear if the socket hasn't 
    finished handshaking or if the server recently restarted.
    """
    cached_val = cache_get("quot_sessions", "all")
    if cached_val is not None:
        return cached_val
 
    # 1. Start with all quotations marked active in DB
    stmt = select(Quotation).where(Quotation.is_active == True, Quotation.is_deleted == False).order_by(desc(Quotation.updated_at))
    result = db.execute(stmt)
    items = result.scalars().all()

    sessions = []
    for i in items:
        # 2. Add live user info from memory
        users = _active_users.get(i.id, {})
        sessions.append({
            "id": i.id,
            "quotNo": i.quotation_no,
            "displayName": i.display_name or i.quotation_no,
            "userCount": len(users),
            "users": list(users.values()),
            "hasPassword": bool(i.password),
            "workstation": i.workstation
        })
    
    res_sessions = {"sessions": sessions}
    cache_set("quot_sessions", "all", res_sessions)
    return res_sessions

@router.post("/")
def create_quotation(data: dict, request: Request, db: Session = Depends(get_db)):
    """Create a new quotation record in the database.
    
    Supports two modes:
      Lightweight:  { quot_no, display_name?, password? }  — workspace-first creation
      Full:         { quotationDetails, clientInfo, ... }  — save from within editor
    """
    workstation = data.get("workstation")
    
    # Try to extract authenticated username if available in Bearer token header
    user_label = None
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        try:
            token = auth_header.split(" ")[1]
            from core.auth import decode_token
            payload = decode_token(token)
            user_label = payload.get("sub")
        except Exception:
            pass
    if not user_label:
        user_label = workstation or "unknown_workstation"
    
    # ── Lightweight workspace-first creation ──────────────────────
    if "quot_no" in data:
        q_no = data["quot_no"]
        display = data.get("display_name") or q_no
        password = data.get("password")
        
        # Check for duplicate
        stmt = select(Quotation).where(Quotation.quotation_no == q_no)
        res = db.execute(stmt)
        if res.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="Quotation number already exists")
        
        is_direct = any(k in data for k in ["client_name", "designer_name", "grand_total", "customer_incharge", "quotation_status", "project_status", "billing_status", "bill_to"])
        
        # Create a blank/prefilled record
        new_q = Quotation(
            quotation_no=q_no,
            display_name=display,
            password=password,
            workstation=workstation,
            is_active=False if is_direct else True,  # Set to true immediately only if not direct billing insert
            client_name=data.get("client_name") or "",
            designer_name=data.get("designer_name") or "",
            grand_total=data.get("grand_total") or 0.0,
            customer_incharge=data.get("customer_incharge") or "",
            quotation_status=data.get("quotation_status") or "DRAFT",
            project_status=data.get("project_status") or "On Going",
            billing_status=data.get("billing_status") or None,
            bill_to=data.get("bill_to") or "",
            update_detail=data.get("update_detail") or "",
            data=json.dumps({}, ensure_ascii=False),  # empty, will be filled on first save
        )
        if "date" in data and data["date"]:
            try:
                new_q.date = datetime.strptime(data["date"][:10], "%Y-%m-%d").replace(tzinfo=timezone.utc)
            except Exception:
                pass
        db.add(new_q)
        db.commit()
        db.refresh(new_q)
        cache_delete("quot_list")
        cache_delete("quot_sessions")
        
        log_activity(
            username=user_label,
            action="CREATE_QUOTATION",
            details=f"Created lightweight quotation '{q_no}' (DisplayName: '{display}')",
            ip_address=request.client.host
        )
        return {"success": True, "id": new_q.id, "quotNo": q_no, "displayName": display}

    # ── Full document save (from within editor) ───────────────────
    qd = data.get("quotationDetails", {})
    ci = data.get("clientInfo", {})
    sig = data.get("signatures", {}).get("quotation", {}).get("preparedBy", {})
    
    q_no = qd.get("quotationNo")
    if not q_no:
        raise HTTPException(status_code=400, detail="Quotation number is required")
        
    # Check if exists
    stmt = select(Quotation).where(Quotation.quotation_no == q_no)
    res = db.execute(stmt)
    if res.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Quotation number already exists")
    
    client_contact = ci.get("contact", "")
    g_total = calculate_grand_total(data)

    doc_date_str = qd.get("date")
    doc_date = datetime.now(timezone.utc)
    if doc_date_str:
        try:
            doc_date = datetime.strptime(doc_date_str[:10], "%Y-%m-%d").replace(tzinfo=timezone.utc)
        except Exception:
            pass

    new_q = Quotation(
        quotation_no=q_no,
        client_name=ci.get("company", ""),
        designer_name=sig.get("name", ""),
        workstation=workstation,
        date=doc_date,
        data=json.dumps(data, ensure_ascii=False),
        display_name=q_no,
        grand_total=g_total,
        customer_incharge=client_contact
    )
    db.add(new_q)
    db.commit()
    db.refresh(new_q)
    cache_delete("quot_list")
    cache_delete("quot_sessions")
    
    log_activity(
        username=user_label,
        action="CREATE_QUOTATION",
        details=f"Created and saved full quotation '{q_no}' (Grand Total: {g_total})",
        ip_address=request.client.host
    )
    return {"success": True, "id": new_q.id}



class VerifyPasswordRequest(BaseModel):
    password: str

@router.post("/{q_id}/verify")
def verify_password(q_id: int, req: VerifyPasswordRequest, db: Session = Depends(get_db)):
    stmt = select(Quotation).where(Quotation.id == q_id)
    result = db.execute(stmt)
    quot = result.scalar_one_or_none()
    if not quot:
        raise HTTPException(status_code=404, detail="Quotation not found")
    
    if not quot.password:
        return {"success": True}
        
    if req.password != quot.password:
        raise HTTPException(status_code=401, detail="Invalid password")
        
    return {"success": True}

@router.get("/{q_id}")
def get_quotation(q_id: int, db: Session = Depends(get_db)):
    stmt = select(Quotation).where(Quotation.id == q_id)
    result = db.execute(stmt)
    quot = result.scalar_one_or_none()
    if not quot:
        raise HTTPException(status_code=404, detail="Quotation not found")
    
    data = safe_json_loads(quot.data) if quot.data else {}
    if "billingDetails" not in data:
        data["billingDetails"] = {}
        
    data["billingDetails"]["quotationStatus"] = quot.quotation_status or "For Approval"
    data["billingDetails"]["projectStatus"] = quot.project_status or "On Going"
    data["billingDetails"]["submittedToAdminAt"] = (
        quot.submitted_to_admin_at.isoformat()[:10] if quot.submitted_to_admin_at else None
    )
    data["billingDetails"]["updateDetail"] = quot.update_detail or ""
    data["billingDetails"]["projectInCharge"] = quot.designer_name or data.get("signatures", {}).get("quotation", {}).get("preparedBy", {}).get("name", "")
    data["billingDetails"]["billTo"] = data.get("clientInfo", {}).get("company", "") or ""
    
    return data

@router.patch("/{q_id}")
def update_quotation(
    q_id: int, 
    data: dict, 
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Full update of quotation data."""
    stmt = select(Quotation).where(Quotation.id == q_id)
    res = db.execute(stmt)
    quot = res.scalar_one_or_none()
    q_no = quot.quotation_no if quot else f"ID {q_id}"
    
    _sync_metadata(q_id, data, db, current_user.username)
    
    log_activity(
        username=current_user.username,
        action="UPDATE_QUOTATION",
        details=f"Updated quotation '{q_no}' (ID: {q_id})",
        ip_address=request.client.host
    )
    return {"success": True}

@router.patch("/{q_id}/billing")
def update_billing_monitoring(
    q_id: int,
    payload: dict,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update billing tracking fields for admin roles."""
    if current_user.role not in ['admin', 'it']:
        raise HTTPException(status_code=403, detail="Access Denied")
        
    stmt = select(Quotation).where(Quotation.id == q_id)
    res = db.execute(stmt)
    quot = res.scalar_one_or_none()
    if not quot:
        raise HTTPException(status_code=404, detail="Quotation not found")
        
    # Editable billing tracking fields
    if "quotationNo" in payload:
        new_no = payload["quotationNo"]
        if new_no != quot.quotation_no:
            # Check duplicate
            dup_stmt = select(Quotation).where(Quotation.quotation_no == new_no, Quotation.id != q_id)
            dup_res = db.execute(dup_stmt)
            if dup_res.scalar_one_or_none():
                raise HTTPException(status_code=400, detail=f"Quotation number '{new_no}' already exists.")
            quot.quotation_no = new_no
            if not quot.display_name or quot.display_name == quot.quotation_no:
                quot.display_name = new_no
    if "displayName" in payload:
        new_display = (payload["displayName"] or "").strip()
        if new_display:  # Never allow blank display name
            quot.display_name = new_display
    if "grandTotal" in payload:
        try:
            quot.grand_total = float(payload["grandTotal"])
        except (ValueError, TypeError):
            pass
    if "customerIncharge" in payload:
        quot.customer_incharge = payload["customerIncharge"]
    if "quotationStatus" in payload:
        quot.quotation_status = payload["quotationStatus"]
    if "projectStatus" in payload:
        quot.project_status = payload["projectStatus"]
    if "submittedToAdminAt" in payload:
        val = payload["submittedToAdminAt"]
        if val:
            try:
                quot.submitted_to_admin_at = datetime.strptime(val[:10], "%Y-%m-%d")
            except ValueError:
                quot.submitted_to_admin_at = None
        else:
            quot.submitted_to_admin_at = None
    if "billTo" in payload:
        quot.bill_to = payload["billTo"]
    if "clientName" in payload:
        quot.client_name = payload["clientName"]
    if "projectInCharge" in payload:
        quot.designer_name = payload["projectInCharge"]
    if "designerName" in payload:
        quot.designer_name = payload["designerName"]
    if "datePaid" in payload:
        val = payload["datePaid"]
        if val:
            try:
                quot.date_paid = datetime.strptime(val[:10], "%Y-%m-%d")
            except ValueError:
                quot.date_paid = None
        else:
            quot.date_paid = None
    if "date" in payload:
        val = payload["date"]
        if val:
            try:
                # We retain utc timezone so it's consistent
                quot.date = datetime.strptime(val[:10], "%Y-%m-%d").replace(tzinfo=timezone.utc)
            except ValueError:
                pass
        else:
            quot.date = None
    if "updateDetail" in payload:
        quot.update_detail = payload["updateDetail"]
    if "billingStatus" in payload:
        quot.billing_status = payload["billingStatus"] or None
        
    # Enforce cascade logic
    if quot.quotation_status == "CANCELLED":
        quot.project_status = "CANCELLED"
        quot.update_detail = "CANCELLED"

    if "updatedBy" in payload:
        quot.updated_by = payload["updatedBy"]
    else:
        quot.updated_by = current_user.username
    quot.last_updated_at = datetime.now(timezone.utc)
    quot.updated_at = datetime.now(timezone.utc)
    
    # Sync with inner JSON
    try:
        data = safe_json_loads(quot.data) if quot.data else {}
        if "billingDetails" not in data:
            data["billingDetails"] = {}
        data["billingDetails"]["quotationStatus"] = quot.quotation_status
        data["billingDetails"]["projectStatus"] = quot.project_status
        data["billingDetails"]["submittedToAdminAt"] = (
            quot.submitted_to_admin_at.isoformat()[:10] if quot.submitted_to_admin_at else None
        )
        data["billingDetails"]["updateDetail"] = quot.update_detail
        data["billingDetails"]["projectInCharge"] = quot.designer_name or data.get("signatures", {}).get("quotation", {}).get("preparedBy", {}).get("name", "")
        data["billingDetails"]["billTo"] = quot.bill_to or ""
        data["billingDetails"]["clientName"] = quot.client_name or ""
        data["billingDetails"]["updatedBy"] = quot.updated_by
        data["billingDetails"]["lastUpdatedAt"] = quot.last_updated_at.strftime("%Y-%m-%d %H:%M")
        
        if "clientInfo" not in data:
            data["clientInfo"] = {}
        data["clientInfo"]["company"] = quot.bill_to or ""
        data["clientInfo"]["contact"] = quot.customer_incharge or ""
        
        if "quotationDetails" not in data:
            data["quotationDetails"] = {}
        data["quotationDetails"]["quotationNo"] = quot.quotation_no
        if "date" in payload or quot.date:
            data["quotationDetails"]["date"] = quot.date.isoformat()[:10] if quot.date else None
            
        quot.data = json.dumps(data, ensure_ascii=False)
    except Exception as e:
        print(f"Error syncing JSON in update_billing_monitoring: {e}")

    db.commit()
    cache_delete("quot_list")
    cache_delete("quot_sessions")

    # Emit Socket.IO patches for active editors to update live
    room_name = f"quot_{q_id}"
    patches = [
        {"path": "quotationDetails.quotationNo", "value": quot.quotation_no},
        {"path": "clientInfo.contact", "value": quot.customer_incharge},
        {"path": "billingDetails.quotationStatus", "value": quot.quotation_status},
        {"path": "billingDetails.projectStatus", "value": quot.project_status},
        {"path": "billingDetails.submittedToAdminAt", "value": (quot.submitted_to_admin_at.isoformat()[:10] if quot.submitted_to_admin_at else None)},
        {"path": "billingDetails.updateDetail", "value": quot.update_detail},
        {"path": "billingDetails.projectInCharge", "value": quot.designer_name},
        {"path": "billingDetails.billTo", "value": quot.bill_to},
        {"path": "billingDetails.clientName", "value": quot.client_name},
        {"path": "clientInfo.company", "value": quot.bill_to},
        {"path": "quotationDetails.date", "value": quot.date.isoformat()[:10] if quot.date else None}
    ]
    for patch in patches:
        pass
        # sio.emit("remote_patch", {"sid": "system", "patch": patch}, room=room_name)

    log_activity(
        username=current_user.username,
        action="UPDATE_BILLING",
        details=f"Updated billing details for quotation '{quot.quotation_no}' (ID: {q_id})",
        ip_address=request.client.host
    )
    return {"success": True}

@router.get("/{q_id}/history")
def get_history(q_id: int, db: Session = Depends(get_db)):
    stmt = select(QuotationHistory).where(QuotationHistory.quotation_id == q_id).order_by(desc(QuotationHistory.created_at))
    result = db.execute(stmt)
    items = result.scalars().all()
    
    return {
        "history": [
            {
                "id": h.id,
                "label": h.label or "System Snapshot",
                "author": h.author,
                "timestamp": h.created_at.isoformat() + "Z"
            } for h in items
        ]
    }

@router.get("/{q_id}/history/{h_id}")
def restore_history(q_id: int, h_id: int, db: Session = Depends(get_db)):
    stmt = select(QuotationHistory).where(QuotationHistory.id == h_id, QuotationHistory.quotation_id == q_id)
    result = db.execute(stmt)
    history = result.scalar_one_or_none()
    if not history:
        raise HTTPException(status_code=404, detail="History entry not found")
    return safe_json_loads(history.data)

@router.delete("/{q_id}")
def delete_quotation(
    q_id: int, 
    request: Request,
    workstation: Optional[str] = None,
    computer_name: Optional[str] = None,
    permanent: bool = False,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a quotation (soft delete by default, permanent delete if requested or already soft-deleted).
    
    Authorization:
    - Admin/IT roles can delete any record.
    - Regular users can only delete records owned by their current workstation.
    - Permanent deletion is restricted to Admin/IT roles only.
    """
    # 1. Fetch quotation to check ownership
    stmt = select(Quotation).where(Quotation.id == q_id)
    res = db.execute(stmt)
    quot = res.scalar_one_or_none()
    
    if not quot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quotation not found")
        
    # 2. Authorization Check
    is_admin = current_user.role in ['admin', 'it']
    # Match workstation hostname or fullName for ownership
    is_owner = (
        (workstation and quot.workstation == workstation) or
        (computer_name and quot.workstation == computer_name) or
        (current_user.username and quot.workstation == current_user.username) or
        (current_user.full_name and quot.workstation == current_user.full_name) or
        (getattr(current_user, 'display_name', None) and quot.workstation == current_user.display_name)
    )
    print(f"DEBUG: Delete requested for q_id={q_id}, quot.workstation='{quot.workstation}', req_workstation='{workstation}', req_computer_name='{computer_name}'")
    print(f"DEBUG: current_user.username='{current_user.username}', full_name='{current_user.full_name}', display_name='{getattr(current_user, 'display_name', None)}'")
    print(f"DEBUG: is_admin={is_admin}, is_owner={is_owner}")

    if not is_admin and not is_owner:
        owner_label = quot.workstation if quot.workstation else "Legacy/Unknown"
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Deletion Denied: This record belongs to workstation '{owner_label}'. Only the owner or an administrator can delete it."
        )

    # 3. Perform Deletion
    q_no = quot.quotation_no
    is_soft = not (quot.is_deleted or permanent)
    if quot.is_deleted or permanent:
        # Permanent delete is restricted to admins only
        if not is_admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access Denied: Only administrators can permanently delete records from the trash bin."
            )
        db.execute(delete(QuotationHistory).where(QuotationHistory.quotation_id == q_id))
        db.execute(delete(Quotation).where(Quotation.id == q_id))
    else:
        # Soft delete
        quot.is_deleted = True
        quot.is_active = False

    db.commit()
    cache_delete("quot_list")
    cache_delete("quot_sessions")
    
    log_activity(
        username=current_user.username,
        action="PERMANENT_DELETE_QUOTATION" if not is_soft else "DELETE_QUOTATION",
        details=f"Permanently deleted quotation '{q_no}' (ID: {q_id}) from Trash" if not is_soft else f"Moved quotation '{q_no}' (ID: {q_id}) to Trash",
        ip_address=request.client.host
    )
    return {"success": True}

@router.post("/{q_id}/restore")
def restore_quotation(
    q_id: int,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Restore a soft-deleted quotation from the trash bin."""
    is_admin = current_user.role in ['admin', 'it']
    if not is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access Denied: Only administrators can restore records from the trash bin."
        )

    stmt = select(Quotation).where(Quotation.id == q_id)
    res = db.execute(stmt)
    quot = res.scalar_one_or_none()
    
    if not quot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quotation not found")

    quot.is_deleted = False
    db.commit()
    cache_delete("quot_list")
    cache_delete("quot_sessions")
    
    log_activity(
        username=current_user.username,
        action="RESTORE_QUOTATION",
        details=f"Restored quotation '{quot.quotation_no}' (ID: {q_id}) from Trash",
        ip_address=request.client.host
    )
    return {"success": True}
