from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form, Body
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import shutil
import zipfile
from datetime import datetime
from pydantic import BaseModel

from fastapi.responses import FileResponse
from ..database import get_db
from sqlalchemy.orm import joinedload
from ..models import AssessmentTask, AssessmentSubmission, AssessmentFeedback, TrainerTraineeMapping, User, Notification, TraineeSetMapping, UserActivity
from ..schemas import (
    AssessmentTaskResponse, AssessmentSubmissionResponse, 
    AssessmentFeedbackResponse, AssessmentSubmissionCreate,
    AssessmentTaskCreate, TrainerTraineeMappingResponse,
    TrainerTraineeMappingCreate, TraineeSetMappingResponse,
    TraineeSetMappingCreate
)
from .auth import get_current_user
from ..websocket_manager import notification_manager
from pathlib import Path

from ..services.storage_service import get_safe_path, handle_task_upload
from ..services.assessment_service import resequence_set_task_codes
from ..services.progress_service import calculate_all_trainee_progress

router = APIRouter(prefix="/assessments", tags=["Assessments"])

# --- Trainee Endpoints ---

@router.get("/tasks", response_model=List[AssessmentTaskResponse])
def get_assessment_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all assessment tasks with sequential locking logic."""
    tasks = db.query(AssessmentTask).order_by(AssessmentTask.set_number, AssessmentTask.task_code).all()
    
    # If user is admin/employee, return all tasks without restriction
    if current_user.role in ["admin", "employee"]:
        return tasks

    # Get user's approved submissions
    approved_set_numbers = db.query(AssessmentTask.set_number).join(
        AssessmentSubmission, AssessmentTask.id == AssessmentSubmission.task_id
    ).filter(
        AssessmentSubmission.user_id == current_user.id,
        AssessmentSubmission.status == "approved"
    ).distinct().all()
    
    # Mapping Logic
    from ..models import TraineeSetMapping
    mappings = db.query(TraineeSetMapping).filter(TraineeSetMapping.trainee_id == current_user.id).all()
    
    if mappings:
        mapping_dict_3d = {m.actual_set_number: abs(m.display_set_number) for m in mappings if m.assessment_type != "2D"}
        mapping_dict_2d = {m.actual_set_number: abs(m.display_set_number) for m in mappings if m.assessment_type == "2D"}
        
        filtered_tasks = []
        for t in tasks:
            is_2d = (t.assessment_type == "2D")
            m_dict = mapping_dict_2d if is_2d else mapping_dict_3d
            has_mappings_of_type = len(m_dict) > 0
            
            if has_mappings_of_type:
                if t.set_number in m_dict:
                    db.expunge(t)
                    t.set_number = m_dict[t.set_number]
                    filtered_tasks.append(t)
            else:
                filtered_tasks.append(t)
                
        filtered_tasks.sort(key=lambda x: (x.set_number, x.order))
        return filtered_tasks

    return tasks

@router.get("/my-set-mappings", response_model=List[TraineeSetMappingResponse])
def get_my_set_mappings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get explicitly unlocked set mappings for the current trainee."""
    from ..models import TraineeSetMapping
    return db.query(TraineeSetMapping).filter(TraineeSetMapping.trainee_id == current_user.id).all()

@router.get("/my-submissions", response_model=List[AssessmentSubmissionResponse])
def get_my_submissions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all submissions for the currently logged-in user."""
    return db.query(AssessmentSubmission).options(
        joinedload(AssessmentSubmission.feedback),
        joinedload(AssessmentSubmission.task)
    ).filter(
        AssessmentSubmission.user_id == current_user.id,
        AssessmentSubmission.is_deleted == False
    ).order_by(AssessmentSubmission.submitted_at.desc()).all()

@router.get("/submissions/trash", response_model=List[AssessmentSubmissionResponse])
def get_trash_submissions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all soft-deleted submissions for the currently logged-in user."""
    return db.query(AssessmentSubmission).options(
        joinedload(AssessmentSubmission.feedback),
        joinedload(AssessmentSubmission.task)
    ).filter(
        AssessmentSubmission.user_id == current_user.id,
        AssessmentSubmission.is_deleted == True
    ).order_by(AssessmentSubmission.submitted_at.desc()).all()

# --- Admin Endpoints ---

@router.post("/admin/tasks", response_model=AssessmentTaskResponse)
async def create_task(
    set_number: int = Form(...),
    task_code: str = Form(...),
    title: str = Form(...),
    description: Optional[str] = Form(None),
    is_assembly: bool = Form(False),
    file: UploadFile = File(...),
    set_name: Optional[str] = Form(None),
    assessment_type: str = Form("3D"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Admin only: Create a new assessment task with file upload."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    
    # Save the master file
    file_path = handle_task_upload(file, set_number, task_code)
    
    # If set_name not passed, try to look up existing set_name in DB for this set
    if not set_name:
        existing = db.query(AssessmentTask).filter(AssessmentTask.set_number == set_number, AssessmentTask.set_name.isnot(None)).first()
        if existing:
            set_name = existing.set_name

    db_task = AssessmentTask(
        set_number=set_number,
        set_name=set_name,
        task_code=task_code,
        title=title,
        description=description,
        master_file_path=file_path,
        is_assembly=is_assembly,
        assessment_type=assessment_type
    )
    db.add(db_task)
    db.commit()
    resequence_set_task_codes(db, set_number)
    db.refresh(db_task)
    return db_task

@router.post("/admin/tasks/sync")
async def trigger_folder_sync(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Admin only: Trigger the script to sync tasks from local Units & Tasks folder."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    
    import subprocess
    import sys
    try:
        script_path = os.path.join("backend", "scripts", "sync_tasks_from_folder.py")
        subprocess.run([sys.executable, script_path], check=True)
        return {"message": "Successfully synced tasks from the server folder."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sync failed: {str(e)}")

@router.post("/admin/tasks/bulk")
async def bulk_create_tasks(
    set_number: int = Form(...),
    files: List[UploadFile] = File(...),
    set_name: Optional[str] = Form(None),
    is_assembly: bool = Form(False),
    assessment_type: str = Form("3D"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Admin only: Bulk create assessment units from multiple .dwg files."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    
    created_tasks = []
    # Start task code based on existing count of the same unit type (Part/Assembly)
    existing_count = db.query(AssessmentTask).filter(
        AssessmentTask.set_number == set_number,
        AssessmentTask.is_assembly == is_assembly,
        AssessmentTask.assessment_type == assessment_type
    ).count()
    
    total_existing = db.query(AssessmentTask).filter(
        AssessmentTask.set_number == set_number,
        AssessmentTask.assessment_type == assessment_type
    ).count()
    
    # If set_name not passed, try to look up existing
    if not set_name:
        existing = db.query(AssessmentTask).filter(
            AssessmentTask.set_number == set_number,
            AssessmentTask.assessment_type == assessment_type,
            AssessmentTask.set_name.isnot(None)
        ).first()
        if existing:
            set_name = existing.set_name
    prefix = "A" if is_assembly else "P"
    for i, file in enumerate(files):
        task_code = f"{prefix}{existing_count + i + 1}"
        
        file_path = handle_task_upload(file, set_number, task_code)
        
        # Strip extension for title
        safe_filename = os.path.basename(file.filename)
        title = os.path.splitext(safe_filename)[0].replace('_', ' ').title()
        
        db_task = AssessmentTask(
            set_number=set_number,
            set_name=set_name,
            task_code=task_code,
            title=title,
            master_file_path=file_path,
            is_assembly=is_assembly,
            assessment_type=assessment_type,
            order=total_existing + i
        )
        db.add(db_task)
        created_tasks.append(db_task)
    
    db.commit()
    resequence_set_task_codes(db, set_number, assessment_type)
    return {"message": f"Successfully created {len(created_tasks)} units for Set {set_number}"}

@router.get("/admin/mappings", response_model=List[TrainerTraineeMappingResponse])
def get_trainer_mappings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Admin only: Get all trainer-trainee assignments."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return db.query(TrainerTraineeMapping).all()

@router.post("/admin/assign")
def assign_trainer(
    mapping: TrainerTraineeMappingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Admin only: Assign a trainee to a trainer."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    
    # Remove existing mapping for this trainee if any
    db.query(TrainerTraineeMapping).filter(TrainerTraineeMapping.trainee_id == mapping.trainee_id).delete()
    
    db_mapping = TrainerTraineeMapping(**mapping.dict())
    db.add(db_mapping)
    db.commit()
    return {"message": "Trainer assigned successfully"}

@router.patch("/admin/tasks/reorder")
def reorder_tasks(
    updates: List[dict] = Body(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Admin only: Bulk-update task_code, set_number and order for drag-and-drop reordering."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    affected_sets_and_types = set()
    for item in updates:
        task = db.query(AssessmentTask).filter(AssessmentTask.id == int(item["id"])).first()
        if task:
            affected_sets_and_types.add((task.set_number, task.assessment_type))
            affected_sets_and_types.add((int(item["set_number"]), task.assessment_type))
            task.set_number = int(item["set_number"])
            task.order = int(item["order"])
    db.commit()
    for set_num, task_type in affected_sets_and_types:
        resequence_set_task_codes(db, set_num, task_type)
    return {"message": "Tasks reordered successfully"}

@router.delete("/admin/tasks/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Admin only: Delete an assessment task."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    
    task = db.query(AssessmentTask).filter(AssessmentTask.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    set_num = task.set_number
    task_type = task.assessment_type or "3D"
    db.delete(task)
    db.commit()
    resequence_set_task_codes(db, set_num, task_type)
    return {"message": "Task deleted successfully"}

class BulkTasksDeleteRequest(BaseModel):
    task_ids: List[int]

@router.post("/admin/tasks/bulk-delete")
def bulk_delete_tasks(
    req: BulkTasksDeleteRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    
    tasks = db.query(AssessmentTask).filter(AssessmentTask.id.in_(req.task_ids)).all()
    affected = set((t.set_number, t.assessment_type or "3D") for t in tasks)
    
    db.query(AssessmentTask).filter(AssessmentTask.id.in_(req.task_ids)).delete(synchronize_session=False)
    db.commit()
    
    for set_num, task_type in affected:
        resequence_set_task_codes(db, set_num, task_type)
        
    return {"message": f"Successfully deleted {len(req.task_ids)} tasks"}

@router.put("/admin/sets/{set_number}/rename")
def rename_set(
    set_number: int,
    set_name: str = Body(..., embed=True),
    assessment_type: str = "3D",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    tasks = db.query(AssessmentTask).filter(
        AssessmentTask.set_number == set_number,
        AssessmentTask.assessment_type == assessment_type
    ).all()
    for task in tasks:
        task.set_name = set_name
    db.commit()
    return {"message": "Set renamed successfully"}

@router.delete("/admin/sets/{set_number}")
def delete_set(
    set_number: int,
    assessment_type: str = "3D",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    db.query(AssessmentTask).filter(
        AssessmentTask.set_number == set_number,
        AssessmentTask.assessment_type == assessment_type
    ).delete()
    db.commit()
    return {"message": "Set deleted successfully"}

@router.put("/admin/tasks/{task_id}", response_model=AssessmentTaskResponse)
async def update_task(
    task_id: int,
    set_number: int = Form(...),
    task_code: str = Form(...),
    title: str = Form(...),
    description: Optional[str] = Form(None),
    is_assembly: bool = Form(False),
    assessment_type: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Admin only: Update an existing assessment task, optionally replacing the file."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    
    db_task = db.query(AssessmentTask).filter(AssessmentTask.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db_task.set_number = set_number
    db_task.task_code = task_code
    db_task.title = title
    db_task.description = description
    db_task.is_assembly = is_assembly
    if assessment_type:
        db_task.assessment_type = assessment_type
    
    if file:
        # Save new file
        file_path = handle_task_upload(file, set_number, task_code)
        db_task.master_file_path = file_path
    
    db.commit()
    resequence_set_task_codes(db, set_number, db_task.assessment_type or "3D")
    db.refresh(db_task)
    return db_task

@router.get("/admin/tasks/{task_id}/files")
def get_task_file_tree(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    
    task = db.query(AssessmentTask).filter(AssessmentTask.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    master_path = task.master_file_path
    if not master_path or not os.path.exists(master_path):
        return {"tree": []}
        
    # If it's a file, the "folder" is its directory. But we only manage if it's a directory.
    # To support this properly, let's ensure we are dealing with a directory.
    base_dir = master_path if os.path.isdir(master_path) else os.path.dirname(master_path)
    
    def build_tree(dir_path):
        tree = []
        for item in os.listdir(dir_path):
            full_path = os.path.join(dir_path, item)
            rel_path = os.path.relpath(full_path, base_dir)
            is_dir = os.path.isdir(full_path)
            node = {
                "name": item,
                "path": rel_path.replace("\\", "/"),
                "is_dir": is_dir
            }
            if is_dir:
                node["children"] = build_tree(full_path)
            tree.append(node)
        return sorted(tree, key=lambda x: (not x["is_dir"], x["name"].lower()))
        
    return {"tree": build_tree(base_dir), "base_dir": base_dir}

class FolderCreateRequest(BaseModel):
    path: str

@router.post("/admin/tasks/{task_id}/folders")
def create_task_subfolder(
    task_id: int,
    req: FolderCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
        
    task = db.query(AssessmentTask).filter(AssessmentTask.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    base_dir = task.master_file_path if os.path.isdir(task.master_file_path) else os.path.dirname(task.master_file_path)
    
    # Secure path boundary check
    new_dir = get_safe_path(base_dir, req.path)
    os.makedirs(new_dir, exist_ok=True)
    
    return {"message": "Folder created"}

@router.post("/admin/tasks/{task_id}/files")
async def upload_task_file(
    task_id: int,
    path: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
        
    task = db.query(AssessmentTask).filter(AssessmentTask.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    base_dir = task.master_file_path if os.path.isdir(task.master_file_path) else os.path.dirname(task.master_file_path)
    
    # Secure path boundary check
    target_dir = get_safe_path(base_dir, path if path and path != "/" else "")
    os.makedirs(target_dir, exist_ok=True)
    
    safe_filename = os.path.basename(file.filename)
    file_path = os.path.join(target_dir, safe_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {"message": "File uploaded"}

@router.delete("/admin/tasks/{task_id}/files")
def delete_task_file(
    task_id: int,
    req: FolderCreateRequest, # reuse the schema for path
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
        
    task = db.query(AssessmentTask).filter(AssessmentTask.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    base_dir = task.master_file_path if os.path.isdir(task.master_file_path) else os.path.dirname(task.master_file_path)
    
    # Secure path boundary check
    target_path = get_safe_path(base_dir, req.path)
    
    if os.path.exists(target_path):
        if os.path.isdir(target_path):
            shutil.rmtree(target_path)
        else:
            os.remove(target_path)
            
    return {"message": "Item deleted"}


@router.delete("/admin/mappings/{mapping_id}")
def delete_mapping(
    mapping_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Admin only: Remove a trainer-trainee assignment."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    
    mapping = db.query(TrainerTraineeMapping).filter(TrainerTraineeMapping.id == mapping_id).first()
    if not mapping:
        raise HTTPException(status_code=404, detail="Mapping not found")
    
    db.delete(mapping)
    db.commit()
    return {"message": "Mapping removed successfully"}

@router.get("/tasks/{task_id}/download")
def download_master_file(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Download the master .dwg file for a unit."""
    task = db.query(AssessmentTask).filter(AssessmentTask.id == task_id).first()
    if not task or not task.master_file_path:
        raise HTTPException(status_code=404, detail="Master file not found")
    
    # Prepend dynamic 'uploads' path if missing, since path from sync is relative to uploads directory
    base_upload_dir = os.getenv("UPLOAD_DIR", "uploads")
    full_path = task.master_file_path
    if not os.path.isabs(full_path) and not os.path.exists(full_path) and not full_path.startswith(base_upload_dir):
        if full_path.startswith("uploads/"):
            full_path = full_path.replace("uploads/", "", 1)
        elif full_path.startswith("uploads\\"):
            full_path = full_path.replace("uploads\\", "", 1)
        full_path = os.path.join(base_upload_dir, full_path)
        
    if not os.path.exists(full_path):
        raise HTTPException(status_code=404, detail="File does not exist on server")
        
    return FileResponse(
        path=full_path, 
        filename=task.file_name or os.path.basename(full_path),
        media_type="application/octet-stream"
    )

@router.post("/submit/{task_id}", response_model=AssessmentSubmissionResponse)
async def submit_task(
    task_id: int,
    file: UploadFile = File(...),
    assessment_type: str = Form("3D"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Submit a .dwg file for a specific task."""
    # Check if task exists
    task = db.query(AssessmentTask).filter(AssessmentTask.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Define upload directory mirroring the master structure
    # e.g., master path: "Units & Tasks/4th Set Parts And Assembly/2655RCGR/Parts/part.dwg"
    master_dir = os.path.dirname(task.master_file_path) if task.master_file_path else ""
    base_upload_dir = os.getenv("UPLOAD_DIR", "uploads")
    upload_dir = os.path.join(base_upload_dir, "submissions", str(current_user.id), master_dir)
    os.makedirs(upload_dir, exist_ok=True)
    
    safe_filename = os.path.basename(file.filename) if file.filename else "submission"
    file_path = os.path.join(upload_dir, safe_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Create a new submission record for every attempt (Work History)
    # However, if the user re-uploads while the status is still 'pending', we replace the file for that specific record.
    # For CAD files, we match by extension. For .zip/.rar folders, we match by the exact filename so multiple folders can exist.
    pending_submissions = db.query(AssessmentSubmission).filter(
        AssessmentSubmission.user_id == current_user.id,
        AssessmentSubmission.task_id == task_id,
        AssessmentSubmission.assessment_type == assessment_type,
        AssessmentSubmission.status == "pending",
        AssessmentSubmission.is_deleted == False
    ).all()

    target_submission = None
    file_ext = os.path.splitext(file.filename)[1].lower()
    
    for sub in pending_submissions:
        if sub.submission_file_path:
            existing_name = os.path.basename(sub.submission_file_path)
            existing_ext = os.path.splitext(existing_name)[1].lower()
            if file_ext in ['.zip', '.rar']:
                if existing_name == file.filename:
                    target_submission = sub
                    break
            else:
                if existing_ext == file_ext:
                    target_submission = sub
                    break

    if target_submission:
        # Update current pending submission
        target_submission.submission_file_path = file_path
        target_submission.submitted_at = datetime.now()
        submission = target_submission
    else:
        # Create a new attempt
        submission = AssessmentSubmission(
            user_id=current_user.id,
            task_id=task_id,
            submission_file_path=file_path,
            assessment_type=assessment_type,
            status="pending"
        )
        db.add(submission)
    
    db.commit()
    db.refresh(submission)

    # --- Notification Logic ---
    # Check if this submission completes the SET
    set_tasks = db.query(AssessmentTask).filter(AssessmentTask.set_number == task.set_number).all()
    set_task_ids = [t.id for t in set_tasks]
    
    # Count UNIQUE tasks submitted in this set to avoid double-counting attempts
    user_submissions_count = db.query(AssessmentSubmission.task_id).filter(
        AssessmentSubmission.user_id == current_user.id,
        AssessmentSubmission.task_id.in_(set_task_ids)
    ).distinct().count()

    if user_submissions_count == len(set_tasks):
        # Set is finished! Find the assigned trainer
        mapping = db.query(TrainerTraineeMapping).filter(TrainerTraineeMapping.trainee_id == current_user.id).first()
        if mapping:
            notification_msg = f"Trainee {current_user.full_name or current_user.username} finished Set {task.set_number}. You can now review their submissions."
            new_notif = Notification(
                recipient_id=mapping.trainer_id,
                sender_id=current_user.id,
                message=notification_msg,
                type="assessment_completion"
            )
            db.add(new_notif)
            db.commit()

    # --- Real-Time Trainer Notification ---
    mapping = db.query(TrainerTraineeMapping).filter(TrainerTraineeMapping.trainee_id == current_user.id).first()
    if mapping:
        try:
            notification_msg = f"Trainee {current_user.full_name or current_user.username} submitted Set {task.set_number} Unit {task.task_code} for review."
            new_notif = Notification(
                recipient_id=mapping.trainer_id,
                sender_id=current_user.id,
                message=notification_msg,
                type="new_submission"
            )
            db.add(new_notif)
            db.commit()

            import asyncio
            asyncio.create_task(notification_manager.send_personal_message(
                {
                    "event": "NEW_SUBMISSION", 
                    "trainee_name": current_user.full_name or current_user.username,
                    "task_code": task.task_code,
                    "set_number": task.set_number,
                    "message": notification_msg
                }, 
                mapping.trainer_id
            ))
        except Exception as e:
            print(f"Error sending trainer submission notification: {e}")

    return submission

# --- Trainer (Employee) Endpoints ---

from ..models import TraineeSetMapping

@router.get("/trainer/trainees/{trainee_id}/set-mappings", response_model=List[TraineeSetMappingResponse])
def get_trainee_set_mappings(
    trainee_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in ["employee", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(TraineeSetMapping).filter(TraineeSetMapping.trainee_id == trainee_id).all()

@router.post("/trainer/trainees/{trainee_id}/set-mappings")
def update_trainee_set_mappings(
    trainee_id: int,
    mappings: List[TraineeSetMappingCreate] = Body(...),
    assessment_type: str = "3D",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in ["employee", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    db.query(TraineeSetMapping).filter(
        TraineeSetMapping.trainee_id == trainee_id,
        TraineeSetMapping.assessment_type == assessment_type
    ).delete()
    
    for m in mappings:
        new_map = TraineeSetMapping(
            trainee_id=trainee_id,
            trainer_id=current_user.id,
            display_set_number=m.display_set_number,
            actual_set_number=m.actual_set_number,
            assessment_type=assessment_type
        )
        db.add(new_map)
    db.commit()
    
    # Notify trainee to refresh sets
    db_notification = Notification(
        recipient_id=trainee_id,
        sender_id=current_user.id,
        message="A new assessment set has been unlocked by your trainer.",
        type="assessment_unlocked"
    )
    db.add(db_notification)
    db.commit()
    
    import asyncio
    from ..websocket_manager import notification_manager
    try:
        asyncio.create_task(notification_manager.send_personal_message(
            {
                "event": "ASSESSMENT_UNLOCKED",
                "message": "A new assessment set has been unlocked by your trainer."
            },
            trainee_id
        ))
    except Exception as e:
        print(f"Error sending WebSocket message: {e}")
    
    return {"message": "Mappings updated"}

@router.get("/trainer/submissions", response_model=List[AssessmentSubmissionResponse])
def get_trainer_submissions(
    status: str = "pending", # "pending", "approved", "rejected", or "all"
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List submissions assigned to this trainer with optional status filter."""
    if current_user.role not in ["employee", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Get trainees assigned to this trainer
    trainee_ids = [m.trainee_id for m in db.query(TrainerTraineeMapping).filter(TrainerTraineeMapping.trainer_id == current_user.id).all()]
    
    if not trainee_ids and current_user.role != "admin":
        return []

    query = db.query(AssessmentSubmission).options(
        joinedload(AssessmentSubmission.user),
        joinedload(AssessmentSubmission.task),
        joinedload(AssessmentSubmission.feedback)
    ).filter(AssessmentSubmission.is_deleted == False)
    
    if status == "reviewed":
        query = query.filter(AssessmentSubmission.status.in_(["approved", "rejected"]))
    elif status != "all":
        query = query.filter(AssessmentSubmission.status == status)
    
    if current_user.role != "admin":
        query = query.filter(AssessmentSubmission.user_id.in_(trainee_ids))
    
    return query.order_by(AssessmentSubmission.submitted_at.desc()).all()

@router.get("/submissions/{submission_id}/download")
def download_trainee_submission(
    submission_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Download a trainee's .dwg submission for review."""
    if current_user.role not in ["employee", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")

    submission = db.query(AssessmentSubmission).filter(AssessmentSubmission.id == submission_id).first()
    if not submission or not submission.submission_file_path:
        raise HTTPException(status_code=404, detail="Submission file not found")
    
    if not os.path.exists(submission.submission_file_path):
        raise HTTPException(status_code=404, detail="File does not exist on server")
        
    return FileResponse(
        path=submission.submission_file_path, 
        filename=os.path.basename(submission.submission_file_path),
        media_type="application/octet-stream"
    )

@router.post("/feedback/{submission_id}")
async def provide_feedback(
    submission_id: int,
    status: str = Form(...), # "approved" or "rejected"
    file: Optional[UploadFile] = File(None),
    comments: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Review a submission and provide an Excel checkback file."""
    if current_user.role not in ["employee", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")

    submission = db.query(AssessmentSubmission).filter(AssessmentSubmission.id == submission_id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    submission.status = status
    submission.trainer_id = current_user.id
    
    file_path = None
    if file:
        base_upload_dir = os.getenv("UPLOAD_DIR", "uploads")
        feedback_dir = os.path.join(base_upload_dir, "feedback", str(submission.user_id))
        os.makedirs(feedback_dir, exist_ok=True)
        safe_fb_filename = os.path.basename(file.filename) if file.filename else "feedback"
        file_path = os.path.join(feedback_dir, f"feedback_{submission_id}_{safe_fb_filename}")
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    
    # Create feedback record if there's either a file OR comments
    if file or comments:
        # Check if feedback already exists for this submission
        feedback = db.query(AssessmentFeedback).filter(AssessmentFeedback.submission_id == submission_id).first()
        if feedback:
            if file_path:
                feedback.checkback_file_path = file_path
            if comments:
                feedback.comments = comments
        else:
            feedback = AssessmentFeedback(
                submission_id=submission_id,
                checkback_file_path=file_path,
                comments=comments
            )
            db.add(feedback)

    db.commit()

    # Save Notification record in database and trigger real-time WebSocket push
    try:
        notification_msg = ""
        if status == "approved":
            notification_msg = f"Trainer {current_user.full_name or current_user.username} approved your Set {submission.task.set_number} Unit {submission.task.task_code} assessment!"
        else:
            notification_msg = f"Your Set {submission.task.set_number} Unit {submission.task.task_code} assessment has been rejected by {current_user.full_name or current_user.username}. Please check comments."

        db_notification = Notification(
            recipient_id=submission.user_id,
            sender_id=current_user.id,
            message=notification_msg,
            type="assessment_reviewed"
        )
        db.add(db_notification)
        db.commit()

        import asyncio
        asyncio.create_task(notification_manager.send_personal_message(
            {
                "event": "ASSESSMENT_REVIEWED",
                "status": status,
                "trainer_name": current_user.full_name or current_user.username,
                "set_number": submission.task.set_number,
                "task_code": submission.task.task_code,
                "message": notification_msg
            },
            submission.user_id
        ))
    except Exception as e:
        print(f"Error sending trainee feedback notification: {e}")

    return {"message": f"Submission {status}"}

@router.get("/feedback/{feedback_id}/download")
def download_feedback_file(
    feedback_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Download the trainer's Excel checkback file."""
    feedback = db.query(AssessmentFeedback).filter(AssessmentFeedback.id == feedback_id).first()
    if not feedback or not feedback.checkback_file_path:
        raise HTTPException(status_code=404, detail="Feedback file not found")
    
    if not os.path.exists(feedback.checkback_file_path):
        raise HTTPException(status_code=404, detail="File does not exist on server")
        
    return FileResponse(
        path=feedback.checkback_file_path, 
        filename=os.path.basename(feedback.checkback_file_path),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

@router.post("/feedback/{feedback_id}/reply")
async def reply_to_feedback(
    feedback_id: int,
    reply: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Allow a trainee to reply to a trainer's feedback comment."""
    feedback = db.query(AssessmentFeedback).filter(AssessmentFeedback.id == feedback_id).first()
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    
    # Ensure only the trainee who owns the submission can reply
    submission = db.query(AssessmentSubmission).filter(AssessmentSubmission.id == feedback.submission_id).first()
    if not submission or (submission.user_id != current_user.id and current_user.role != "admin"):
        raise HTTPException(status_code=403, detail="Not authorized to reply to this feedback")
    
    feedback.trainee_reply = reply
    feedback.replied_at = datetime.now()
    db.commit()

    # --- Real-Time Trainer Notification ---
    mapping = db.query(TrainerTraineeMapping).filter(TrainerTraineeMapping.trainee_id == current_user.id).first()
    if mapping:
        try:
            notification_msg = f"Trainee {current_user.full_name or current_user.username} replied to your feedback."
            new_notif = Notification(
                recipient_id=mapping.trainer_id,
                sender_id=current_user.id,
                message=notification_msg,
                type="feedback_reply"
            )
            db.add(new_notif)
            db.commit()

            import asyncio
            asyncio.create_task(notification_manager.send_personal_message(
                {
                    "event": "NEW_REPLY", 
                    "trainee_name": current_user.full_name or current_user.username,
                    "message": notification_msg
                }, 
                mapping.trainer_id
            ))
        except Exception as e:
            print(f"Error sending trainer reply notification: {e}")

    return {"message": "Reply saved successfully"}

@router.delete("/submissions/trash/empty")
def empty_trash(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Permanently delete all soft-deleted submissions for the current user."""
    try:
        submissions = db.query(AssessmentSubmission).filter(
            AssessmentSubmission.user_id == current_user.id,
            AssessmentSubmission.is_deleted == True
        ).all()
        
        count = 0
        for sub in submissions:
            file_to_delete = sub.submission_file_path
            db.delete(sub)
            if file_to_delete and os.path.exists(file_to_delete):
                try:
                    os.remove(file_to_delete)
                except Exception as e:
                    print(f"Cleanup Warning: Could not delete physical file {file_to_delete}: {e}")
            count += 1
            
        db.commit()
        return {"message": f"Successfully emptied {count} files from trash"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/submissions/{submission_id}")
def delete_submission(
    submission_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Allow a trainee to delete their own submission."""
    try:
        submission = db.query(AssessmentSubmission).filter(AssessmentSubmission.id == submission_id).first()
        if not submission:
            raise HTTPException(status_code=404, detail="Submission record not found in database.")
        
        # Ownership check with explicit int casting for safety
        if int(submission.user_id) != int(current_user.id) and current_user.role != "admin":
            raise HTTPException(status_code=403, detail="You do not have permission to delete this submission.")
        
        # Store file path before deleting record
        file_to_delete = submission.submission_file_path

        # 1. Soft Delete from Database (mark as deleted)
        submission.is_deleted = True
        db.commit()

        return {"message": "Submission moved to trash"}
        
    except HTTPException as he:
        raise he
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

class BulkDeleteRequest(BaseModel):
    task_ids: List[int]

@router.post("/submissions/bulk-delete")
def bulk_delete_submissions(
    request: BulkDeleteRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Soft-delete multiple submissions for a set of tasks."""
    try:
        submissions = db.query(AssessmentSubmission).filter(
            AssessmentSubmission.user_id == current_user.id,
            AssessmentSubmission.task_id.in_(request.task_ids),
            AssessmentSubmission.is_deleted == False
        ).all()
        
        count = 0
        for sub in submissions:
            sub.is_deleted = True
            count += 1
            
        db.commit()
        return {"message": f"{count} submissions moved to trash"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/submissions/{submission_id}/restore")
def restore_submission(
    submission_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Restore a soft-deleted submission."""
    try:
        submission = db.query(AssessmentSubmission).filter(
            AssessmentSubmission.id == submission_id,
            AssessmentSubmission.user_id == current_user.id
        ).first()
        
        if not submission:
            raise HTTPException(status_code=404, detail="Submission not found")
            
        submission.is_deleted = False
        db.commit()
        return {"message": "Submission restored successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/submissions/{submission_id}/permanent")
def permanent_delete_submission(
    submission_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Permanently delete a submission and its physical file."""
    try:
        submission = db.query(AssessmentSubmission).filter(
            AssessmentSubmission.id == submission_id,
            AssessmentSubmission.user_id == current_user.id
        ).first()
        
        if not submission:
            raise HTTPException(status_code=404, detail="Submission not found")
            
        file_to_delete = submission.submission_file_path
        db.delete(submission)
        db.commit()
        
        if file_to_delete and os.path.exists(file_to_delete):
            try:
                os.remove(file_to_delete)
            except Exception as e:
                print(f"Cleanup Warning: Could not delete physical file {file_to_delete}: {e}")
                
        return {"message": "Submission permanently deleted"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/trainer/progress")
def get_trainer_progress(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get the standard Performance Directory progress for assigned trainees."""
    if current_user.role not in ["employee", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # If admin, fetch all, otherwise pass trainer_id
    trainer_id = current_user.id if current_user.role == "employee" else None
    return calculate_all_trainee_progress(db, trainer_id=trainer_id)



@router.get("/trainer/trainees-progress")
def get_trainer_trainees_progress(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get detailed curriculum & assessment progress for all assigned trainees."""
    try:
        from ..models import QuizScore, Quiz
    except ImportError:
        from models import QuizScore, Quiz

    if current_user.role not in ["employee", "admin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # 1. Fetch trainees based on role
    if current_user.role == "admin":
        trainees = db.query(User).filter(User.role == "trainee").all()
    else:
        mappings = db.query(TrainerTraineeMapping).filter(TrainerTraineeMapping.trainer_id == current_user.id).all()
        trainee_ids = [m.trainee_id for m in mappings]
        trainees = db.query(User).filter(User.id.in_(trainee_ids)).all()
    
    results = []
    for trainee in trainees:
        # Fetch Quiz Scores (Lessons completed/passed)
        scores = db.query(QuizScore).filter(QuizScore.user_id == str(trainee.id)).all()
        
        # Calculate completion metrics
        # Course 1 is 3D Modeling, Course 2 is 2D Drawing
        completed_3d = [s for s in scores if s.course_id == "1" and s.score >= 80.0]
        completed_2d = [s for s in scores if s.course_id == "2" and s.score >= 80.0]
        
        # Total quizzes in DB per course type
        total_3d = db.query(Quiz).filter(Quiz.course_type == "3D_Modeling").count()
        total_2d = db.query(Quiz).filter(Quiz.course_type == "2D_Drawing").count()
        
        # Fetch assessment submissions for this trainee
        submissions = db.query(AssessmentSubmission).filter(AssessmentSubmission.user_id == trainee.id).all()
        approved_submissions = [s for s in submissions if s.status == "approved"]
        pending_submissions = [s for s in submissions if s.status == "pending"]
        rejected_submissions = [s for s in submissions if s.status == "rejected"]
        
        # Practical Assessment (3D) Progress
        trainee_mappings = db.query(TraineeSetMapping).filter(TraineeSetMapping.trainee_id == trainee.id).all()
        total_3d_practical = len(trainee_mappings)
        completed_3d_practical = 0
        if total_3d_practical > 0:
            assigned_actual_sets = [m.actual_set_number for m in trainee_mappings]
            for set_num in assigned_actual_sets:
                is_completed = db.query(AssessmentSubmission).join(AssessmentTask).filter(
                    AssessmentSubmission.user_id == trainee.id,
                    AssessmentSubmission.status == 'approved',
                    AssessmentTask.set_number == set_num,
                    (AssessmentSubmission.assessment_type == '3D') | (AssessmentSubmission.assessment_type == None)
                ).first()
                if is_completed:
                    completed_3d_practical += 1
                    
        # Practical Assessment (2D) Progress
        total_2d_practical = db.query(AssessmentTask).filter(AssessmentTask.is_assembly == True).count()
        completed_2d_practical = db.query(AssessmentSubmission).join(AssessmentTask).filter(
            AssessmentSubmission.user_id == trainee.id,
            AssessmentSubmission.status == 'approved',
            AssessmentSubmission.assessment_type == '2D',
            AssessmentTask.is_assembly == True
        ).group_by(AssessmentTask.id).count()

        # Determine current activity (from realtime tracker or fallback to most recent quiz/submission)
        current_activity = "Not started yet"
        
        realtime_activity = db.query(UserActivity).filter(UserActivity.user_id == trainee.id).first()
        last_updated = None
        if realtime_activity and realtime_activity.current_activity:
            current_activity = realtime_activity.current_activity
            last_updated = realtime_activity.last_updated
        else:
            recent_quiz = db.query(QuizScore).filter(QuizScore.user_id == str(trainee.id)).order_by(QuizScore.completed_at.desc()).first()
            recent_submission = db.query(AssessmentSubmission).filter(AssessmentSubmission.user_id == trainee.id).order_by(AssessmentSubmission.submitted_at.desc()).first()
            last_quiz_time = recent_quiz.completed_at if recent_quiz and recent_quiz.completed_at else None
            last_sub_time = recent_submission.submitted_at if recent_submission and recent_submission.submitted_at else None
            if last_quiz_time and last_sub_time:
                last_updated = max(last_quiz_time, last_sub_time)
                if last_quiz_time > last_sub_time:
                    activity_str = recent_quiz.lesson_id.replace('-', ' ').title() if recent_quiz.lesson_id else "Quiz"
                    current_activity = f"Course: {activity_str}"
                else:
                    task_title = recent_submission.task.title if recent_submission.task else "Task"
                    current_activity = f"Practical: {task_title}"
            elif last_quiz_time:
                last_updated = last_quiz_time
                activity_str = recent_quiz.lesson_id.replace('-', ' ').title() if recent_quiz.lesson_id else "Quiz"
                current_activity = f"Course: {activity_str}"
            elif last_sub_time:
                last_updated = last_sub_time
                task_title = recent_submission.task.title if recent_submission.task else "Task"
                current_activity = f"Practical: {task_title}"

        last_updated_str = last_updated.isoformat() if last_updated else None
        online_since = notification_manager.get_online_since(trainee.id)
        online_since_str = online_since.isoformat() if online_since else None

        results.append({
            "id": trainee.id,
            "username": trainee.username,
            "full_name": trainee.full_name,
            "email": trainee.email,
            "current_activity": current_activity,
            "is_online": notification_manager.is_user_online(trainee.id),
            "online_since": online_since_str,
            "last_updated": last_updated_str,
            "progress": {
                "course_3d": {
                    "completed": len(completed_3d),
                    "total": total_3d,
                    "percentage": round((len(completed_3d) / total_3d * 100), 1) if total_3d > 0 else 0.0
                },
                "course_2d": {
                    "completed": len(completed_2d),
                    "total": total_2d,
                    "percentage": round((len(completed_2d) / total_2d * 100), 1) if total_2d > 0 else 0.0
                },
                "practical_3d": {
                    "completed": completed_3d_practical,
                    "total": total_3d_practical,
                    "percentage": round((completed_3d_practical / total_3d_practical * 100), 1) if total_3d_practical > 0 else 0.0
                },
                "practical_2d": {
                    "completed": completed_2d_practical,
                    "total": total_2d_practical,
                    "percentage": round((completed_2d_practical / total_2d_practical * 100), 1) if total_2d_practical > 0 else 0.0
                },
                "assessments": {
                    "approved": len(approved_submissions),
                    "pending": len(pending_submissions),
                    "rejected": len(rejected_submissions),
                    "total_submitted": len(submissions)
                }
            }
        })
        
    return results
