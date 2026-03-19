import os
import sys
# Add backend to sys.path so we can import from it
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.database import engine, Base
from backend.models import User, ChatLog, ChatFeedback, QueryCache, MediaMetadata

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created.")

import sqlite3
db_path = "backend/kmti_icad.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("PRAGMA table_info(chat_logs)")
columns = [row[1] for row in cursor.fetchall()]
print(f"Columns in chat_logs: {columns}")
conn.close()
