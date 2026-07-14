import os
from sqlalchemy import create_engine, text

app_path = os.path.dirname(os.path.abspath(__file__))
sqlite_url = f"sqlite:///{os.path.join(app_path, '../kmti_icad.db')}"
engine = create_engine(sqlite_url)
with engine.connect() as conn:
    result = conn.execute(text("SELECT id, task_id, time_spent_seconds, submitted_at FROM assessment_submissions ORDER BY id DESC LIMIT 5")).fetchall()
    print("Latest Submissions in SQLite:", result)
