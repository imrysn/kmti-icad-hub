import os
import sys
import sqlite3
import pymysql
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
sys.path.insert(0, str(Path(__file__).parent.parent))
from database import USE_MYSQL, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, APP_PATH

def migrate_sqlite():
    db_path = os.path.join(APP_PATH, 'kmti_icad.db')
    if not os.path.exists(db_path):
        print(f"SQLite DB not found at {db_path}, skipping SQLite migration.")
        return

    print("Migrating SQLite...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if column exists
        cursor.execute("PRAGMA table_info(assessment_tasks)")
        columns = [c[1] for c in cursor.fetchall()]
        
        if 'assessment_type' not in columns:
            print("Adding assessment_type column to SQLite assessment_tasks table...")
            cursor.execute("ALTER TABLE assessment_tasks ADD COLUMN assessment_type VARCHAR(50) DEFAULT '3D'")
        
        # Update 2D tasks (set_number >= 100)
        cursor.execute("SELECT COUNT(*) FROM assessment_tasks WHERE set_number >= 100")
        count_2d = cursor.fetchone()[0]
        if count_2d > 0:
            print(f"Found {count_2d} tasks with set_number >= 100. Migrating them to 2D...")
            cursor.execute("UPDATE assessment_tasks SET assessment_type = '2D', set_number = set_number - 100 WHERE set_number >= 100")
            
        # Ensure remaining tasks have '3D' assessment_type
        cursor.execute("UPDATE assessment_tasks SET assessment_type = '3D' WHERE assessment_type IS NULL OR assessment_type = ''")
        
        conn.commit()
        print("SQLite migration completed successfully.")
    except Exception as e:
        print(f"SQLite migration failed: {e}")
        conn.rollback()
    finally:
        conn.close()

def migrate_mysql():
    if not USE_MYSQL:
        print("MySQL is not enabled, skipping MySQL migration.")
        return

    print("Migrating MySQL...")
    try:
        conn = pymysql.connect(
            host=DB_HOST,
            port=int(DB_PORT),
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            charset="utf8"
        )
    except Exception as e:
        print(f"Failed to connect to MySQL for migration: {e}")
        return

    try:
        with conn.cursor() as cursor:
            # Check if column exists
            cursor.execute("DESCRIBE assessment_tasks")
            columns = [c[0] for c in cursor.fetchall()]
            
            if 'assessment_type' not in columns:
                print("Adding assessment_type column to MySQL assessment_tasks table...")
                cursor.execute("ALTER TABLE assessment_tasks ADD COLUMN assessment_type VARCHAR(50) DEFAULT '3D'")
            
            # Update 2D tasks (set_number >= 100)
            cursor.execute("SELECT COUNT(*) FROM assessment_tasks WHERE set_number >= 100")
            count_2d = cursor.fetchone()[0]
            if count_2d > 0:
                print(f"Found {count_2d} tasks with set_number >= 100. Migrating them to 2D...")
                cursor.execute("UPDATE assessment_tasks SET assessment_type = '2D', set_number = set_number - 100 WHERE set_number >= 100")
                
            # Ensure remaining tasks have '3D'
            cursor.execute("UPDATE assessment_tasks SET assessment_type = '3D' WHERE assessment_type IS NULL OR assessment_type = ''")
            
            conn.commit()
            print("MySQL migration completed successfully.")
    except Exception as e:
        print(f"MySQL migration failed: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate_sqlite()
    migrate_mysql()
