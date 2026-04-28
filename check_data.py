import sqlite3
import os

db_path = "kmti_icad.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("SELECT id, lesson_id, course_id, score FROM quiz_scores")
rows = cursor.fetchall()

print("Data in quiz_scores:")
for row in rows:
    print(row)

conn.close()
