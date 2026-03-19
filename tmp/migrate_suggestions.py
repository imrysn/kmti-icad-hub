import os
import sys
from pathlib import Path
from sqlalchemy import text

# Add project root to sys.path
project_root = Path(__file__).resolve().parents[1]
sys.path.append(str(project_root))

from backend.database import engine

def migrate():
    print("Checking for 'suggestions' column in 'chat_logs' table...")
    
    with engine.connect() as conn:
        # Check if column exists
        try:
            # MySQL specific check
            result = conn.execute(text("SHOW COLUMNS FROM chat_logs LIKE 'suggestions'"))
            column_exists = result.fetchone() is not None
            
            if not column_exists:
                print("Column 'suggestions' is missing. Adding it now...")
                conn.execute(text("ALTER TABLE chat_logs ADD COLUMN suggestions VARCHAR(2000) NULL"))
                conn.commit()
                print("✅ Successfully added 'suggestions' column.")
            else:
                print("✅ 'suggestions' column already exists.")
                
        except Exception as e:
            print(f"❌ Error during migration: {e}")
            # Try SQLite check if MySQL fails (just in case)
            try:
                result = conn.execute(text("PRAGMA table_info(chat_logs)"))
                info = result.fetchall()
                column_exists = any(col[1] == 'suggestions' for col in info)
                if not column_exists:
                    print("SQLite: Column 'suggestions' missing. Adding...")
                    conn.execute(text("ALTER TABLE chat_logs ADD COLUMN suggestions VARCHAR(2000)"))
                    conn.commit()
            except:
                pass

if __name__ == "__main__":
    migrate()
