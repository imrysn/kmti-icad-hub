import sqlite3
import os

db_path = "kmti_icad.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    cursor.execute("ALTER TABLE quiz_scores ADD COLUMN lesson_id VARCHAR(100);")
    conn.commit()
    print("Migration successful: Added lesson_id to quiz_scores")
except sqlite3.OperationalError as e:
    print(f"Error or already exists: {e}")

conn.close()
