import os
import shutil
import zipfile
from pathlib import Path
from fastapi import HTTPException, UploadFile

def get_safe_path(base_dir: str, req_path: str) -> str:
    resolved_base = Path(base_dir).resolve()
    normalized_req = req_path.lstrip("/\\")
    resolved_target = Path(resolved_base).joinpath(normalized_req).resolve()
    try:
        resolved_target.relative_to(resolved_base)
    except ValueError:
        raise HTTPException(status_code=400, detail="Directory traversal detected")
    return str(resolved_target)

def handle_task_upload(file: UploadFile, set_number: int, task_code: str) -> str:
    upload_base = os.getenv("UPLOAD_DIR")
    if upload_base:
        base = Path(upload_base) / "master_units"
    else:
        # Resolve to backend root path if UPLOAD_DIR is not set
        base = Path(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) / "master_units"
    
    master_dir = base / f"set{set_number}"
    master_dir.mkdir(parents=True, exist_ok=True)
    
    safe_filename = os.path.basename(file.filename)
    file_extension = os.path.splitext(safe_filename)[1].lower()
    
    if file_extension == '.zip':
        temp_zip_path = master_dir / f"temp_{task_code}_{safe_filename}"
        with open(temp_zip_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        extract_dir = master_dir / f"{task_code}_{os.path.splitext(safe_filename)[0]}"
        extract_dir.mkdir(parents=True, exist_ok=True)
        
        # Zip slip protection: validate all member paths before extracting
        with zipfile.ZipFile(temp_zip_path, 'r') as zip_ref:
            for member in zip_ref.namelist():
                member_path = (extract_dir / member).resolve()
                if not str(member_path).startswith(str(extract_dir.resolve())):
                    raise HTTPException(status_code=400, detail=f"Unsafe zip entry: {member}")
            zip_ref.extractall(extract_dir)
            
        os.remove(temp_zip_path)
        return str(extract_dir)
    else:
        file_path = master_dir / f"{task_code}_{safe_filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        return str(file_path)
