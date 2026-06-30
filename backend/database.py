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
load_dotenv(env_path, override=True)

Base = declarative_base()

# Configuration
USE_MYSQL = os.getenv("USE_MYSQL", "false").lower() == "true"
SQLITE_URL = f"sqlite:///{os.path.join(APP_PATH, 'kmti_icad.db')}"
DB_MODE = "sqlite" # Default/Fallback mode

# Initialize SQLite engine & session maker
sqlite_engine = create_engine(
    SQLITE_URL, 
    connect_args={"check_same_thread": False}
)

@event.listens_for(sqlite_engine, "connect")
def set_sqlite_pragma(dbapi_connection, _connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA journal_mode=WAL")
    cursor.close()

SQLiteSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=sqlite_engine)

# Initialize MySQL engine & session maker (if enabled)
mysql_engine = None
MySQLSessionLocal = None

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "kmtihub")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")

if USE_MYSQL:

    
    mysql_url = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    try:
        mysql_engine = create_engine(
            mysql_url,
            poolclass=QueuePool,
            pool_size=5,
            max_overflow=10,
            pool_timeout=5,
            pool_recycle=1800,
            pool_pre_ping=True,
            connect_args={
                "charset": "utf8",
                "connect_timeout": 5,
            }
        )
        # Test connection immediately
        with mysql_engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        
        MySQLSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=mysql_engine)
        DB_MODE = "mysql"
        logger.info(f"[+] Connected to MySQL database at {DB_HOST}")
        try:
            Base.metadata.create_all(bind=mysql_engine)
            logger.info("[+] MySQL tables created/verified successfully on startup connection.")
        except Exception as startup_err:
            logger.warning(f"[!] MySQL table creation failed on startup: {startup_err}")
    except Exception as e:
        logger.warning(f"[!] MySQL connection failed on startup: {e}. Falling back to SQLite.")
        DB_MODE = "sqlite"

# Expose a default 'engine' variable for migrations and backwards compatibility
engine = mysql_engine if DB_MODE == "mysql" else sqlite_engine

class DynamicSessionmaker:
    def __call__(self, *args, **kwargs):
        global DB_MODE
        if DB_MODE == "sqlite" and USE_MYSQL:
            check_mysql_recovery()
        if DB_MODE == "mysql" and MySQLSessionLocal is not None:
            try:
                db = MySQLSessionLocal(*args, **kwargs)
                db.execute(text("SELECT 1"))
                return db
            except Exception as e:
                logger.warning(f"[!] MySQL session failed at runtime (DynamicSessionmaker): {e}. Falling back to SQLite.")
                DB_MODE = "sqlite"
                try:
                    if db:
                        db.close()
                except Exception:
                    pass
        return SQLiteSessionLocal(*args, **kwargs)

    def configure(self, **kwargs):
        if MySQLSessionLocal:
            MySQLSessionLocal.configure(**kwargs)
        SQLiteSessionLocal.configure(**kwargs)

SessionLocal = DynamicSessionmaker()

import time
last_mysql_check = 0

def check_mysql_recovery():
    global DB_MODE, last_mysql_check
    if USE_MYSQL and DB_MODE == "sqlite" and mysql_engine is not None:
        now = time.time()
        if now - last_mysql_check > 10: # Check at most once every 10 seconds
            last_mysql_check = now
            try:
                with mysql_engine.connect() as conn:
                    conn.execute(text("SELECT 1"))
                DB_MODE = "mysql"
                logger.info("[+] MySQL has recovered! Switching database mode to MySQL.")
                try:
                    Base.metadata.create_all(bind=mysql_engine)
                    logger.info("[+] MySQL tables created/verified successfully on recovery.")
                except Exception as recovery_err:
                    logger.warning(f"[!] MySQL table creation failed on recovery: {recovery_err}")
            except Exception:
                pass

def get_db():
    global DB_MODE
    
    # Check if MySQL has recovered if we're currently down
    if DB_MODE == "sqlite" and USE_MYSQL:
        check_mysql_recovery()
        
    db = None
    if DB_MODE == "mysql" and MySQLSessionLocal is not None:
        try:
            # pool_pre_ping=True on the engine already pings on checkout;
            # just open the session and let SQLAlchemy handle dead connections.
            db = MySQLSessionLocal()
            # Validate by making a lightweight call
            db.execute(text("SELECT 1"))
        except Exception as e:
            logger.warning(f"[!] MySQL session failed at runtime: {e}. Falling back to SQLite.")
            DB_MODE = "sqlite"
            if db:
                db.close()
            db = None
            
    if db is None:
        db = SQLiteSessionLocal()
        
    try:
        yield db
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def get_db_mode():
    return DB_MODE


