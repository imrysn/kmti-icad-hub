import os
import sys
from pathlib import Path
from sqlalchemy import text

sys.path.insert(0, str(Path(__file__).parent))
from database import engine

def run_migration():
    with engine.connect() as conn:
        try:
            conn.execute(text("ALTER TABLE assessment_tasks ADD COLUMN set_name VARCHAR(200)"))
        except Exception as e:
            print("set_name already exists or error:", e)

        try:
            conn.execute(text("ALTER TABLE assessment_tasks ADD COLUMN unit_name VARCHAR(200)"))
        except Exception as e:
            print("unit_name already exists or error:", e)

        try:
            conn.execute(text("ALTER TABLE assessment_tasks ADD COLUMN file_name VARCHAR(200)"))
        except Exception as e:
            print("file_name already exists or error:", e)

        try:
            conn.execute(text("ALTER TABLE assessment_tasks ADD COLUMN is_assembly BOOLEAN DEFAULT 0"))
        except Exception as e:
            print("is_assembly already exists or error:", e)
            
        try:
            conn.execute(text("ALTER TABLE assessment_tasks MODIFY COLUMN task_code VARCHAR(10) NULL"))
        except Exception as e:
            print("task_code nullable modification error:", e)

        conn.commit()
    print("MySQL migration completed.")

if __name__ == "__main__":
    run_migration()
