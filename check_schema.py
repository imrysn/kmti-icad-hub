import sqlite3
import os

db_path = "kmti_icad.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("PRAGMA table_info(quiz_scores)")
columns = cursor.fetchall()

print("Columns in quiz_scores:")
for col in columns:
    print(col)

conn.close()
