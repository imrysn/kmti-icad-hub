import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError

def run_migration():
    # Try local SQLite first
    app_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    sqlite_url = f"sqlite:///{os.path.join(app_path, 'kmti_icad.db')}"
    
    engines = []
    engines.append(create_engine(sqlite_url))

    # Try MySQL if configured
    load_dotenv(os.path.join(app_path, '.env'), override=True)
    if os.getenv("USE_MYSQL", "false").lower() == "true":
        db_user = os.getenv("DB_USER", "root")
        db_password = os.getenv("DB_PASSWORD", "")
        db_host = os.getenv("DB_HOST", "localhost")
        db_port = os.getenv("DB_PORT", "3306")
        db_name = os.getenv("DB_NAME", "kmtihub")
        mysql_url = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}?charset=utf8"
        engines.append(create_engine(mysql_url))

    for engine in engines:
        try:
            with engine.connect() as conn:
                try:
                    conn.execute(text("ALTER TABLE assessment_submissions ADD COLUMN time_spent_seconds INTEGER DEFAULT 0"))
                    conn.commit()
                    print(f"Added time_spent_seconds to {engine.name}")
                except OperationalError as e:
                    print(f"Column might already exist in {engine.name} or error: {e}")
        except Exception as e:
            print(f"Could not connect to {engine.name}: {e}")

if __name__ == "__main__":
    run_migration()
