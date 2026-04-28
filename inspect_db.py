import sqlite3
import os

db_path = "kmti_icad.db"
if not os.path.exists(db_path):
    print(f"Error: {db_path} not found")
    exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

print("Quiz Scores Sample:")
cursor.execute("SELECT course_id, lesson_id, score FROM quiz_scores LIMIT 10;")
for row in cursor.fetchall():
    print(row)

conn.close()
