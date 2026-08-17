import os
import sys
from dotenv import load_dotenv

sys.path.append(os.path.abspath('backend'))
load_dotenv(os.path.abspath('backend/.env'), override=True)

from routers.assessments import resolve_uploaded_file_path

def check():
    stored_path = r"C:\Users\Administrator\Desktop\KMTI Training Hub\dist\uploads\feedback\36\feedback_718_4th Set Feedback.xlsx"
    resolved = resolve_uploaded_file_path(stored_path)
    
    print(f"Stored Path: {stored_path}")
    print(f"Resolved Path: {resolved}")
    print(f"Exists? {os.path.exists(resolved)}")
    
    # Also check if it exists in the main workspace
    alt_path = os.path.abspath(r"uploads\feedback\36\feedback_718_4th Set Feedback.xlsx")
    print(f"Alt Path: {alt_path}")
    print(f"Exists? {os.path.exists(alt_path)}")

if __name__ == '__main__':
    check()
