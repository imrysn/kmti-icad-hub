import os
import sys

def resolve_uploaded_file_path(stored_path: str, upload_root: str, app_path: str) -> str:
    """Resolve persisted upload paths after server, drive, or upload-root changes."""
    if not stored_path:
        return ""
    if os.path.exists(stored_path):
        return stored_path

    normalized = stored_path.replace("\\", "/")
    relative_path = None
    for marker in ("submissions/", "feedback/"):
        marker_index = normalized.lower().find(marker)
        if marker_index >= 0:
            relative_path = normalized[marker_index:]
            break
    if not relative_path:
        return stored_path
    relative_parts = relative_path.split("/")
    if any(part in ("", ".", "..") for part in relative_parts):
        return stored_path

    candidates = [
        os.path.join(upload_root, *relative_parts),
        os.path.join(app_path, "uploads", *relative_parts),
        os.path.join(os.path.dirname(app_path), "uploads", *relative_parts),
    ]
    for candidate in candidates:
        if os.path.exists(candidate):
            return candidate
    return candidates[0]

def check():
    stored_path = r"C:\Users\Administrator\Desktop\KMTI Training Hub\dist\uploads\feedback\36\feedback_718_4th Set Feedback.xlsx"
    upload_root = r"I:\KMTI_MG_APP_DEVELOPMENT\kmti-icad-hub\uploads"
    app_path = r"i:\MG_DATA\@Recycle\App Development\kmti-icad-hub"
    
    resolved = resolve_uploaded_file_path(stored_path, upload_root, app_path)
    
    print(f"Stored Path: {stored_path}")
    print(f"Resolved Path: {resolved}")
    print(f"Exists? {os.path.exists(resolved)}")

if __name__ == '__main__':
    check()
