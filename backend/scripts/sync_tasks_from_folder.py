import os
import sys
from pathlib import Path
import re

# Add backend directory to sys.path so we can import from database and models
sys.path.insert(0, str(Path(__file__).parent.parent))

from database import SessionLocal
from models import AssessmentTask

UPLOAD_DIR_BASE = os.getenv("UPLOAD_DIR")
if UPLOAD_DIR_BASE:
    base_path = Path(UPLOAD_DIR_BASE)
else:
    base_path = Path(__file__).parent.parent.parent / "uploads"

UPLOAD_DIR = base_path / "Units & Tasks"
if not UPLOAD_DIR.exists():
    UPLOAD_DIR = base_path / "Unts & Tasks"

def sync_tasks():
    if not UPLOAD_DIR.exists():
        print(f"Directory not found: {UPLOAD_DIR}")
        return

    db = SessionLocal()
    
    # Optional: Clear existing tasks or keep them?
    # We will clear existing tasks to avoid duplicates if re-running
    db.query(AssessmentTask).delete()
    
    print(f"Scanning directory: {UPLOAD_DIR}")
    
    # Expected Set Folders: "1st Set Parts", "10th Set Parts And Assembly"
    set_pattern = re.compile(r"^(\d+)(?:st|nd|rd|th)\s+Set", re.IGNORECASE)
    
    tasks_to_add = []
    
    for set_folder in UPLOAD_DIR.iterdir():
        if not set_folder.is_dir():
            continue
            
        match = set_pattern.match(set_folder.name)
        if not match:
            continue
            
        set_number = int(match.group(1))
        set_name = set_folder.name
        
        # Traverse the set folder
        for root, dirs, files in os.walk(set_folder):
            for file in files:
                if not file.lower().endswith(".dwg"):
                    continue
                    
                file_path = Path(root) / file
                rel_path = file_path.relative_to(UPLOAD_DIR.parent) # e.g. "Units & Tasks/1st Set Parts/FH26109N01.dwg"
                
                # Determine Unit Name and Is Assembly
                unit_name = None
                is_assembly = False
                
                # Base title without extension
                base_title = Path(file).stem
                
                # If the root is directly the set_folder, it's a standalone part (Sets 1-3)
                if Path(root) == set_folder:
                    title = base_title
                else:
                    # It's nested in a Unit (Sets 4-10)
                    # Example: Units & Tasks / 4th Set / 2655RCGR / Parts / file.dwg
                    rel_to_set = Path(root).relative_to(set_folder)
                    parts = rel_to_set.parts
                    
                    if len(parts) > 0:
                        unit_name = parts[0]
                        
                        # If it's directly inside the unit folder, it's likely the assembly
                        if len(parts) == 1:
                            is_assembly = True
                            title = f"Master Assembly: {base_title}"
                        else:
                            # It's inside "Parts" or similar
                            title = base_title
                    else:
                        title = base_title
                
                task = AssessmentTask(
                    set_number=set_number,
                    set_name=set_name,
                    unit_name=unit_name,
                    title=title,
                    master_file_path=str(rel_path).replace("\\", "/"),
                    file_name=file,
                    is_assembly=is_assembly
                )
                tasks_to_add.append(task)
                
                # Duplicate Sets 4-7 as 2D tasks (104-107)
                if 4 <= set_number <= 7:
                    task_2d = AssessmentTask(
                        set_number=set_number + 100,
                        set_name=set_name,
                        unit_name=unit_name,
                        title=title,
                        master_file_path=str(rel_path).replace("\\", "/"),
                        file_name=file,
                        is_assembly=is_assembly
                    )
                    tasks_to_add.append(task_2d)
                
    if tasks_to_add:
        db.add_all(tasks_to_add)
        db.commit()
        print(f"Successfully synced {len(tasks_to_add)} tasks to the database.")
        
        # Automatically assign task codes (A1/P1 format) to synced tasks
        all_tasks = db.query(AssessmentTask).order_by(AssessmentTask.set_number, AssessmentTask.id).all()
        sets = {}
        for t in all_tasks:
            if t.set_number not in sets:
                sets[t.set_number] = {'assemblies': [], 'parts': []}
            if t.is_assembly:
                sets[t.set_number]['assemblies'].append(t)
            else:
                sets[t.set_number]['parts'].append(t)
                
        count = 0
        for s, data in sets.items():
            for i, a in enumerate(data['assemblies']):
                a.task_code = f"A{i+1}"
                count += 1
            for i, p in enumerate(data['parts']):
                p.task_code = f"P{i+1}"
                count += 1
        db.commit()
        print(f"Assigned task codes (A1/P1) to {count} tasks.")
    else:
        print("No .dwg files found.")
        
    db.close()

if __name__ == "__main__":
    sync_tasks()
