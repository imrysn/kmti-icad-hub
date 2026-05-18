
import os
import pymysql
from dotenv import load_dotenv

load_dotenv()

def fix_schema():
    conn = pymysql.connect(
        host=os.getenv("DB_HOST", "KMTI-NAS"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME", "kmtihub"),
        charset="utf8"
    )
    
    try:
        with conn.cursor() as cursor:
            print("Checking assessment_feedback table...")
            cursor.execute("DESCRIBE assessment_feedback")
            columns = [c[0] for c in cursor.fetchall()]
            
            if "trainee_reply" not in columns:
                print("Adding trainee_reply column to assessment_feedback...")
                cursor.execute("ALTER TABLE assessment_feedback ADD COLUMN trainee_reply TEXT NULL")
            
            if "replied_at" not in columns:
                print("Adding replied_at column to assessment_feedback...")
                cursor.execute("ALTER TABLE assessment_feedback ADD COLUMN replied_at DATETIME NULL")
            
            conn.commit()
            print("Successfully updated assessment_feedback schema.")
            
    except Exception as e:
        print(f"Error updating schema: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    fix_schema()
