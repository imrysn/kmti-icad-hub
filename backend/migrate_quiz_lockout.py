import sqlite3
import os

db_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'kmti_icad.db')
if not os.path.exists(db_path):
    print(f"Database not found at {db_path}")
    exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    print("Adding consecutive_failures column...")
    cursor.execute("ALTER TABLE quiz_scores ADD COLUMN consecutive_failures INTEGER DEFAULT 0")
except sqlite3.OperationalError as e:
    print(f"consecutive_failures: {e}")

try:
    print("Adding locked_until column...")
    cursor.execute("ALTER TABLE quiz_scores ADD COLUMN locked_until DATETIME NULL")
except sqlite3.OperationalError as e:
    print(f"locked_until: {e}")

conn.commit()
conn.close()
print("Migration complete.")
