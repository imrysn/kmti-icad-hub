from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv, find_dotenv

# Load environment variables from the project root
load_dotenv(find_dotenv())

USE_MYSQL = os.getenv("USE_MYSQL", "false").lower() == "true"

if USE_MYSQL:
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = os.getenv("DB_PORT", "3306")
    DB_NAME = os.getenv("DB_NAME", "kmtifms")
    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "")
    
    SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        connect_args={"charset": "utf8"}
    )
else:
    SQLALCHEMY_DATABASE_URL = "sqlite:///./kmti_icad.db"
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

def migrate():
    print(f"Connecting to {SQLALCHEMY_DATABASE_URL}...")
    with engine.connect() as conn:
        try:
            # Check if column exists
            print("Checking for 'lesson_id' column in 'quiz_scores' table...")
            if USE_MYSQL:
                result = conn.execute(text("SHOW COLUMNS FROM quiz_scores LIKE 'lesson_id'"))
                exists = result.fetchone()
            else:
                result = conn.execute(text("PRAGMA table_info(quiz_scores)"))
                exists = any(row[1] == 'lesson_id' for row in result.fetchall())

            if not exists:
                print("Column 'lesson_id' missing. Adding it now...")
                conn.execute(text("ALTER TABLE quiz_scores ADD COLUMN lesson_id VARCHAR(100) AFTER course_id"))
                conn.execute(text("CREATE INDEX ix_quiz_scores_lesson_id ON quiz_scores (lesson_id)"))
                print("Migration successful: added 'lesson_id' to 'quiz_scores'.")
            else:
                print("Column 'lesson_id' already exists. No migration needed.")
            
            conn.commit()
        except Exception as e:
            print(f"Migration error: {e}")

if __name__ == "__main__":
    migrate()
