import os
import pymysql
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", "3306"))
DB_NAME = os.getenv("DB_NAME", "kmtihub")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")

print(f"Connecting to {DB_HOST}:{DB_PORT}/{DB_NAME} as {DB_USER}...")

try:
    conn = pymysql.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        charset='utf8',
        cursorclass=pymysql.cursors.DictCursor
    )
    with conn.cursor() as cursor:
        print("Checking chat_logs schema...")
        cursor.execute("DESCRIBE chat_logs")
        columns = [row['Field'] for row in cursor.fetchall()]
        print(f"Columns in chat_logs: {columns}")
        
        if "is_cached" not in columns:
            print("is_cached column missing. Adding it...")
            cursor.execute("ALTER TABLE chat_logs ADD COLUMN is_cached BOOLEAN DEFAULT 0")
            print("is_cached column added.")
            conn.commit()
        else:
            print("is_cached column already exists.")
            
    conn.close()
    print("Success.")
except Exception as e:
    print(f"Error: {e}")
