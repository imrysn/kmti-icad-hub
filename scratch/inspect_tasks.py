import sqlite3

def inspect_tasks():
    conn = sqlite3.connect('kmti_icad.db')
    cursor = conn.cursor()
    
    # Let's find out table names first
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [row[0] for row in cursor.fetchall()]
    print("Tables:", tables)
    
    task_table = 'assessment_tasks' if 'assessment_tasks' in tables else 'assessment_task'
    if task_table in tables:
        print(f"\n--- TASKS FROM {task_table.upper()} ---")
        cursor.execute(f"SELECT id, set_number, task_code, title, master_file_path FROM {task_table}")
        for row in cursor.fetchall():
            print(row)
    else:
        print("No task table found!")
        
    conn.close()

if __name__ == "__main__":
    inspect_tasks()
