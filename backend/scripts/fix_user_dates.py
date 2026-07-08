import sys
import os
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

# Set up env path for backend
backend_dir = Path(__file__).parent.parent
env_path = backend_dir / '.env'
os.environ["ENV_FILE_PATH"] = str(env_path)
load_dotenv(env_path, override=True)

# Add backend to path
sys.path.insert(0, str(backend_dir))

from database import SessionLocal
from models import User

def fix_user_dates():
    db = SessionLocal()
    
    # July 1, 2026
    july_1_date = datetime(2026, 7, 1, 0, 0, 0)
    july_1_names = ['janzen', 'lito', 'jenie', 'shela', 'michael', 'erik', 'admin']
    
    # July 6, 2026
    july_6_date = datetime(2026, 7, 6, 0, 0, 0)
    july_6_names = ['joyce', 'nyl', 'san cai', 'mariz']
    
    users = db.query(User).filter(User.created_at == None).all()
    
    updates = 0
    for u in users:
        # Check by username or full_name lowercase
        username_lower = u.username.lower() if u.username else ""
        fullname_lower = u.full_name.lower() if u.full_name else ""
        
        assigned = False
        
        # Check July 1
        for name in july_1_names:
            if name in username_lower or name in fullname_lower:
                u.created_at = july_1_date
                assigned = True
                updates += 1
                break
                
        if assigned:
            continue
            
        # Check July 6
        for name in july_6_names:
            if name in username_lower or name in fullname_lower:
                u.created_at = july_6_date
                updates += 1
                break

    db.commit()
    print(f"Updated {updates} users successfully.")
    db.close()

if __name__ == "__main__":
    fix_user_dates()
