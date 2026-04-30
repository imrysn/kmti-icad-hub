import sqlite3
import os

db_path = 'backend/kmti_icad.db'
print(f"DB_PATH: {db_path}")
print(f"Exists: {os.path.exists(db_path)}")

conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("PRAGMA table_info(quiz_scores)")
columns = [row[1] for row in cursor.fetchall()]
print(f"Columns in quiz_scores: {columns}")
conn.close()
