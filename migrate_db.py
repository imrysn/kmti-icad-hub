import sqlite3
import os

db_path = 'kmti_icad.db'
if not os.path.exists(db_path):
    print(f"Database not found at {db_path}")
    exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    print("Adding first_attempt_score column...")
    cursor.execute("ALTER TABLE quiz_scores ADD COLUMN first_attempt_score FLOAT")
except sqlite3.OperationalError as e:
    print(f"first_attempt_score: {e}")

try:
    print("Adding first_attempt_at column...")
    cursor.execute("ALTER TABLE quiz_scores ADD COLUMN first_attempt_at DATETIME")
except sqlite3.OperationalError as e:
    print(f"first_attempt_at: {e}")

conn.commit()
conn.close()
print("Migration completed.")
