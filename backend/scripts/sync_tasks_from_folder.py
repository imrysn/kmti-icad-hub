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
    UPLOAD_DIR = Path(UPLOAD_DIR_BASE) / "Unts & Tasks"
else:
    UPLOAD_DIR = Path(__file__).parent.parent.parent / "uploads" / "Unts & Tasks"

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
                rel_path = file_path.relative_to(UPLOAD_DIR.parent) # e.g. "Unts & Tasks/1st Set Parts/FH26109N01.dwg"
                
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
                    # Example: Unts & Tasks / 4th Set / 2655RCGR / Parts / file.dwg
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
                
    if tasks_to_add:
        db.add_all(tasks_to_add)
        db.commit()
        print(f"Successfully synced {len(tasks_to_add)} tasks to the database.")
    else:
        print("No .dwg files found.")
        
    db.close()

if __name__ == "__main__":
    sync_tasks()
