import sys
import os
from sqlalchemy import text
sys.path.append(os.getcwd())
from backend.database import engine

def migrate():
    with engine.connect() as conn:
        print(f"Checking database: {engine.url}")
        try:
            # Try to add column to question_attempts
            conn.execute(text("ALTER TABLE question_attempts ADD COLUMN seconds_spent INTEGER DEFAULT 0"))
            conn.commit()
            print("Successfully added 'seconds_spent' column to question_attempts.")
        except Exception as e:
            if "duplicate column name" in str(e).lower() or "already exists" in str(e).lower():
                print("Column 'seconds_spent' already exists. Skipping.")
            else:
                print(f"Error during migration: {e}")

if __name__ == "__main__":
    migrate()
