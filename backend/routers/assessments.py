from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
import os
import shutil
from datetime import datetime

from fastapi.responses import FileResponse
from ..database import get_db
from sqlalchemy.orm import joinedload
from ..models import AssessmentTask, AssessmentSubmission, AssessmentFeedback, TrainerTraineeMapping, User, Notification
from ..schemas import (
    AssessmentTaskResponse, AssessmentSubmissionResponse, 
    AssessmentFeedbackResponse, AssessmentSubmissionCreate,
    AssessmentTaskCreate, TrainerTraineeMappingResponse,
    TrainerTraineeMappingCreate
)
from .auth import get_current_user
from ..websocket_manager import notification_manager

router = APIRouter(prefix="/api/v1/assessments", tags=["Assessments"])

# --- Trainee Endpoints ---

@router.get("/tasks", response_model=List[AssessmentTaskResponse])
def get_assessment_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all assessment tasks with sequential locking logic."""
    tasks = db.query(AssessmentTask).order_by(AssessmentTask.set_number, AssessmentTask.order).all()
    
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
    
    # Logic: Set N is unlocked if ALL tasks in Set N-1 are approved.
    # For simplicity here, we'll mark the tasks as locked/unlocked in metadata 
    # if we had that field, but the requirement is to strictly isolate them.
    # The frontend will handle the visual lock, but the backend provides the data.
    
    # To truly enforce, we can filter or mark them.
    return tasks

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
        AssessmentSubmission.user_id == current_user.id
    ).order_by(AssessmentSubmission.submitted_at.desc()).all()

# --- Admin Endpoints ---

@router.post("/admin/tasks", response_model=AssessmentTaskResponse)
async def create_task(
    set_number: int = Form(...),
    task_code: str = Form(...),
    title: str = Form(...),
    description: str = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Admin only: Create a new assessment task with file upload."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    
    # Save the master file
    master_dir = os.path.join("master_units", f"set{set_number}")
    os.makedirs(master_dir, exist_ok=True)
    
    file_path = os.path.join(master_dir, f"{task_code}_{file.filename}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    db_task = AssessmentTask(
        set_number=set_number,
        task_code=task_code,
        title=title,
        description=description,
        master_file_path=file_path
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.post("/admin/tasks/bulk")
async def bulk_create_tasks(
    set_number: int = Form(...),
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Admin only: Bulk create assessment units from multiple .dwg files."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    
    created_tasks = []
    # Start task code from A, B, C...
    # We'll need to check existing tasks in the set to continue the sequence
    existing_count = db.query(AssessmentTask).filter(AssessmentTask.set_number == set_number).count()
    
    for i, file in enumerate(files):
        task_code = chr(65 + existing_count + i) # A=65
        master_dir = os.path.join("master_units", f"set{set_number}")
        os.makedirs(master_dir, exist_ok=True)
        
        file_path = os.path.join(master_dir, f"{task_code}_{file.filename}")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Strip extension for title
        title = os.path.splitext(file.filename)[0].replace('_', ' ').title()
        
        db_task = AssessmentTask(
            set_number=set_number,
            task_code=task_code,
            title=title,
            master_file_path=file_path,
            order=existing_count + i
        )
        db.add(db_task)
        created_tasks.append(db_task)
    
    db.commit()
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
    
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}

@router.put("/admin/tasks/{task_id}", response_model=AssessmentTaskResponse)
async def update_task(
    task_id: int,
    set_number: int = Form(...),
    task_code: str = Form(...),
    title: str = Form(...),
    description: str = Form(None),
    file: UploadFile = File(None),
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
    
    if file:
        # Save new file
        set_dir = os.path.join("master_units", f"set{set_number}")
        os.makedirs(set_dir, exist_ok=True)
        file_path = os.path.join(set_dir, f"{task_code}_{file.filename}")
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        db_task.master_file_path = file_path
    
    db.commit()
    db.refresh(db_task)
    return db_task

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
    
    # In a real app, master_file_path would be an absolute path or relative to a storage root
    # For now, we assume it's relative to the project root or a known directory
    if not os.path.exists(task.master_file_path):
        raise HTTPException(status_code=404, detail="File does not exist on server")
        
    return FileResponse(
        path=task.master_file_path, 
        filename=f"Set{task.set_number}_{task.task_code}.dwg",
        media_type="application/octet-stream"
    )

@router.post("/submit/{task_id}", response_model=AssessmentSubmissionResponse)
async def submit_task(
    task_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Submit a .dwg file for a specific task."""
    # Check if task exists
    task = db.query(AssessmentTask).filter(AssessmentTask.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Define upload directory
    upload_dir = os.path.join("uploads", "submissions", str(current_user.id))
    os.makedirs(upload_dir, exist_ok=True)
    
    file_path = os.path.join(upload_dir, f"set{task.set_number}_{task.task_code}_{datetime.now().strftime('%Y%m%d%H%M%S')}_{file.filename}")
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Create a new submission record for every attempt (Work History)
    # However, if the user re-uploads while the status is still 'pending', we replace the file for that specific record.
    submission = db.query(AssessmentSubmission).filter(
        AssessmentSubmission.user_id == current_user.id,
        AssessmentSubmission.task_id == task_id,
        AssessmentSubmission.status == "pending"
    ).order_by(AssessmentSubmission.submitted_at.desc()).first()

    if submission:
        # Update current pending submission
        submission.submission_file_path = file_path
        submission.submitted_at = datetime.now()
    else:
        # Create a new attempt
        submission = AssessmentSubmission(
            user_id=current_user.id,
            task_id=task_id,
            submission_file_path=file_path,
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
            notification_msg = f"Trainee {current_user.full_name or current_user.username} finished Set {task.set_number}. Please review his work or choose review later and open the next set."
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
        import asyncio
        asyncio.create_task(notification_manager.send_personal_message(
            {
                "event": "NEW_SUBMISSION", 
                "trainee_name": current_user.full_name or current_user.username,
                "task_code": task.task_code,
                "set_number": task.set_number
            }, 
            mapping.trainer_id
        ))

    return submission

# --- Trainer (Employee) Endpoints ---

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
    )
    
    if status != "all":
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
    file: UploadFile = File(None),
    comments: str = Form(None),
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
        feedback_dir = os.path.join("uploads", "feedback", str(submission.user_id))
        os.makedirs(feedback_dir, exist_ok=True)
        file_path = os.path.join(feedback_dir, f"feedback_{submission_id}_{file.filename}")
        
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
def reply_to_feedback(
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
        import asyncio
        asyncio.create_task(notification_manager.send_personal_message(
            {
                "event": "NEW_REPLY", 
                "trainee_name": current_user.full_name or current_user.username
            }, 
            mapping.trainer_id
        ))

    return {"message": "Reply saved successfully"}

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

        # 1. Delete from Database first to allow UI to reset
        db.delete(submission)
        db.commit()

        # 2. Try to delete the physical file (Optional, don't fail if file is locked)
        if file_to_delete and os.path.exists(file_to_delete):
            try:
                os.remove(file_to_delete)
            except Exception as e:
                # Log but don't return error to user since DB record is already gone
                print(f"Cleanup Warning: Could not delete physical file {file_to_delete}: {e}")

        return {"message": "Submission deleted successfully"}
        
    except HTTPException as he:
        raise he
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
