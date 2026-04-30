import os
import logging
from sqlalchemy import create_engine, event, text
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool
from dotenv import load_dotenv, find_dotenv

import sys
# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Path helper for PyInstaller
def get_app_path():
    if getattr(sys, 'frozen', False):
        return os.path.dirname(sys.executable)
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

APP_PATH = get_app_path()

# Load environment variables from the project root
env_path = os.getenv("ENV_FILE_PATH", os.path.join(APP_PATH, ".env"))
load_dotenv(env_path)

# Configuration
USE_MYSQL = os.getenv("USE_MYSQL", "false").lower() == "true"
SQLITE_URL = f"sqlite:///{os.path.join(APP_PATH, 'kmti_icad.db')}"
DB_MODE = "sqlite" # Default fallback

def create_db_engine():
    global DB_MODE
    
    if USE_MYSQL:
        # MySQL Configuration
        DB_HOST = os.getenv("DB_HOST", "localhost")
        DB_PORT = os.getenv("DB_PORT", "3306")
        DB_NAME = os.getenv("DB_NAME", "kmtihub")
        DB_USER = os.getenv("DB_USER", "root")
        DB_PASSWORD = os.getenv("DB_PASSWORD", "")
        
        mysql_url = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
        
        try:
            # Attempt to create engine with short timeout to detect if NAS is online
            engine = create_engine(
                mysql_url,
                poolclass=QueuePool,
                pool_size=5,
                max_overflow=10,
                pool_timeout=5, # Short timeout for initial detection
                pool_recycle=1800,
                pool_pre_ping=True,
                connect_args={
                    "charset": "utf8",
                    "connect_timeout": 5, # 5 seconds to decide if NAS is there
                }
            )
            
            # Test connection immediately
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            
            logger.info(f"✅ Connected to MySQL at {DB_HOST}")
            DB_MODE = "mysql"
            return engine
            
        except Exception as e:
            logger.warning(f"⚠️ MySQL connection failed: {e}. Falling back to SQLite.")
    
    # SQLite Fallback
    DB_MODE = "sqlite"
    engine = create_engine(
        SQLITE_URL, 
        connect_args={"check_same_thread": False}
    )

    # Enable WAL journal mode for better concurrency
    @event.listens_for(engine, "connect")
    def set_sqlite_pragma(dbapi_connection, _connection_record):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA journal_mode=WAL")
        cursor.close()
        
    logger.info("ℹ️ Using SQLite local database")
    return engine

engine = create_db_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_db_mode():
    return DB_MODE

