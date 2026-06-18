from sqlalchemy.orm import Session
from ..models import AssessmentTask

def resequence_set_task_codes(db: Session, set_number: int):
    tasks = db.query(AssessmentTask).filter(AssessmentTask.set_number == set_number).order_by(AssessmentTask.order, AssessmentTask.id).all()
    assemblies = [t for t in tasks if t.is_assembly]
    parts = [t for t in tasks if not t.is_assembly]
    
    for i, a in enumerate(assemblies):
        a.task_code = f"A{i+1}"
    for i, p in enumerate(parts):
        p.task_code = f"P{i+1}"
    db.commit()
