import sqlite3

conn = sqlite3.connect('../kmti_icad.db')
cursor = conn.cursor()

try:
    cursor.execute("ALTER TABLE assessment_tasks ADD COLUMN unit_name VARCHAR(200)")
except sqlite3.OperationalError as e:
    print(f"unit_name error: {e}")

try:
    cursor.execute("ALTER TABLE assessment_tasks ADD COLUMN file_name VARCHAR(200)")
except sqlite3.OperationalError as e:
    print(f"file_name error: {e}")

try:
    cursor.execute("ALTER TABLE assessment_tasks ADD COLUMN is_assembly BOOLEAN DEFAULT 0")
except sqlite3.OperationalError as e:
    print(f"is_assembly error: {e}")

conn.commit()
conn.close()
print("Migration complete.")
