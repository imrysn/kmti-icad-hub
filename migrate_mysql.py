import pymysql
import os
from dotenv import load_dotenv

# Load .env
load_dotenv()

# MySQL Configuration
db_host = os.getenv("DB_HOST", "KMTI-NAS")
db_port = int(os.getenv("DB_PORT", "3306"))
db_name = os.getenv("DB_NAME", "kmtihub")
db_user = os.getenv("DB_USER", "kmtifms_user")
db_password = os.getenv("DB_PASSWORD", "Ph15IcadRs")

try:
    conn = pymysql.connect(
        host=db_host,
        port=db_port,
        user=db_user,
        password=db_password,
        database=db_name,
        charset='utf8'
    )
    cursor = conn.cursor()

    print("Checking MySQL Columns in quiz_scores...")
    cursor.execute("DESCRIBE quiz_scores")
    columns = cursor.fetchall()
    for col in columns:
        print(col)

    # ADD COLUMNS IF MISSING
    column_names = [col[0] for col in columns]
    
    if 'lesson_id' not in column_names:
        print("Adding lesson_id...")
        cursor.execute("ALTER TABLE quiz_scores ADD COLUMN lesson_id VARCHAR(100) AFTER course_id")
    
    if 'attempts_count' not in column_names:
        print("Adding attempts_count...")
        cursor.execute("ALTER TABLE quiz_scores ADD COLUMN attempts_count INT DEFAULT 1 AFTER score")

    conn.commit()
    print("MySQL Migration successful!")

except Exception as e:
    print(f"MySQL Error: {e}")
finally:
    if 'conn' in locals():
        conn.close()
