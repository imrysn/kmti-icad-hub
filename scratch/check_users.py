import sqlite3
import os

db_path = "kmti_icad.db"
if not os.path.exists(db_path):
    print(f"Database not found at {db_path}")
else:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id, username, role, is_active FROM users")
        users = cursor.fetchall()
        print("Users in database:")
        for user in users:
            print(user)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        conn.close()
