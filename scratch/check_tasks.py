import sqlite3
import os

conn = sqlite3.connect('kmti_icad.db')
cursor = conn.cursor()

try:
    cursor.execute("SELECT id, set_number, task_code, title, master_file_path FROM assessment_tasks")
    rows = cursor.fetchall()
    print(f"Found {len(rows)} tasks:")
    for row in rows:
        tid, set_num, code, title, path = row
        exists = os.path.exists(path) if path else False
        print(f"ID={tid}, Set={set_num}, Code={code}, Path={path}, Exists={exists}")
except Exception as e:
    print(e)
finally:
    conn.close()
