import os
import sys

def get_app_path():
    if getattr(sys, 'frozen', False):
        return os.path.dirname(sys.executable)
    # This script is in root, but database.py is in backend/
    # So we simulate being in backend/
    dummy_file = os.path.join(os.getcwd(), 'backend', 'database.py')
    return os.path.dirname(os.path.dirname(os.path.abspath(dummy_file)))

app_path = get_app_path()
db_path = os.path.join(app_path, 'kmti_icad.db')
print(f"APP_PATH: {app_path}")
print(f"DB_PATH: {db_path}")
print(f"Exists: {os.path.exists(db_path)}")

import sqlite3
conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("PRAGMA table_info(quiz_scores)")
columns = [row[1] for row in cursor.fetchall()]
print(f"Columns in quiz_scores: {columns}")
conn.close()
