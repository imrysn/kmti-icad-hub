import pymysql
import os
from dotenv import load_dotenv

load_dotenv()

db_host = os.getenv("DB_HOST", "KMTI-NAS")
db_port = int(os.getenv("DB_PORT", "3306"))
db_name = os.getenv("DB_NAME", "kmtihub")
db_user = os.getenv("DB_USER", "kmtifms_user")
db_password = os.getenv("DB_PASSWORD", "Ph15IcadRs")

conn = pymysql.connect(
    host=db_host,
    port=db_port,
    user=db_user,
    password=db_password,
    database=db_name,
    charset='utf8'
)
cursor = conn.cursor()
cursor.execute("SELECT course_id, lesson_id, score FROM quiz_scores WHERE lesson_id IS NOT NULL LIMIT 20")
rows = cursor.fetchall()
for row in rows:
    print(f"Course: {row[0]}, Lesson: {row[1]}, Score: {row[2]}")
conn.close()
