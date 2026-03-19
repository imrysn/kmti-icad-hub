import sqlite3
import os

db_path = "backend/kmti_icad.db"
if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("PRAGMA table_info(chat_logs)")
    columns = [row[1] for row in cursor.fetchall()]
    print(f"Columns in chat_logs: {columns}")
    
    if "is_cached" not in columns:
        print("is_cached column missing. Attempting to add...")
        try:
            cursor.execute("ALTER TABLE chat_logs ADD COLUMN is_cached BOOLEAN DEFAULT 0")
            conn.commit()
            print("is_cached column added successfully.")
        except Exception as e:
            print(f"Failed to add column: {e}")
    else:
        print("is_cached column already exists.")
    conn.close()
else:
    print(f"Database not found at {db_path}")
