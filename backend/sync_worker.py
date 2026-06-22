import threading
import time
import logging
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text, inspect

try:
    from .database import USE_MYSQL, sqlite_engine, mysql_engine, SQLiteSessionLocal, MySQLSessionLocal, get_db_mode
except ImportError:
    from database import USE_MYSQL, sqlite_engine, mysql_engine, SQLiteSessionLocal, MySQLSessionLocal, get_db_mode

logger = logging.getLogger(__name__)

# Tables to sync in order of dependency
TABLES_TO_SYNC = [
    "users",
    "system_settings",
    "user_progress",
    "quiz_scores",
    "media_metadata",
    "test_results",
    "system_logs",
    "broadcasts",
    "chat_logs",
    "chat_feedback",
    "query_cache",
    "saved_snippets",
    "assessment_tasks",
    "assessment_submissions",
    "assessment_feedback",
    "trainer_trainee_mappings",
    "trainee_set_mappings",
    "notifications"
]

def sync_table_data(table_name: str, sqlite_conn, mysql_conn):
    """Sync data for a single table from SQLite to MySQL."""
    try:
        # Get SQLite records
        sqlite_result = sqlite_conn.execute(text(f"SELECT * FROM {table_name}"))
        columns = list(sqlite_result.keys())
        sqlite_rows = [dict(zip(columns, row)) for row in sqlite_result.fetchall()]
        
        if not sqlite_rows:
            return
            
        # Get existing MySQL keys (primary key check)
        # We assume first column is 'id' unless it's system_settings ('key')
        pk_col = "key" if table_name == "system_settings" else "id"
        
        # Determine timestamp column beforehand
        time_col = None
        if "updated_at" in columns:
            time_col = "updated_at"
        elif "submitted_at" in columns:
            time_col = "submitted_at"

        # Batch query MySQL for primary keys and timestamps (if time_col exists)
        if time_col:
            mysql_result = mysql_conn.execute(text(f"SELECT {pk_col}, {time_col} FROM {table_name}"))
            mysql_data = {row[0]: row[1] for row in mysql_result.fetchall()}
            existing_pks = set(mysql_data.keys())
        else:
            mysql_result = mysql_conn.execute(text(f"SELECT {pk_col} FROM {table_name}"))
            existing_pks = {row[0] for row in mysql_result.fetchall()}
            mysql_data = {}
        
        # Check for existing usernames to prevent IntegrityErrors (case-insensitive check)
        existing_usernames = set()
        if table_name == "users":
            uname_result = mysql_conn.execute(text("SELECT username FROM users"))
            existing_usernames = {row[0].lower() for row in uname_result.fetchall() if row[0]}
        
        for row in sqlite_rows:
            pk_val = row[pk_col]
            if pk_val not in existing_pks:
                # If username already exists in MySQL (with a different id), skip to avoid unique constraint conflict
                if table_name == "users" and row.get("username") and row.get("username").lower() in existing_usernames:
                    continue
                
                # Insert missing record
                cols = ", ".join(row.keys())
                placeholders = ", ".join([f":{col}" for col in row.keys()])
                mysql_conn.execute(
                    text(f"INSERT INTO {table_name} ({cols}) VALUES ({placeholders})"),
                    row
                )
            else:
                # Update if there is a timestamp column and the SQLite record is newer
                if time_col and row[time_col]:
                    sqlite_time = row[time_col]
                    mysql_time = mysql_data.get(pk_val)
                    
                    if not mysql_time or str(sqlite_time) > str(mysql_time):
                        set_clause = ", ".join([f"{col} = :{col}" for col in row.keys() if col != pk_col])
                        mysql_conn.execute(
                            text(f"UPDATE {table_name} SET {set_clause} WHERE {pk_col} = :key_val"),
                            {**row, "key_val": pk_val}
                        )
        
    except Exception as e:
        # Sanitize error message to prevent data leakage (e.g. hashed passwords or emails) in logs
        err_msg = str(e)
        if hasattr(e, 'orig') and e.orig:
            # log underlying driver DB error only, which describes the constraint but excludes SQL parameter dumps
            err_msg = f"DB Error: {e.orig}"
        else:
            # Fallback sanitation: strip out parameters if they look like SQL dump
            import re
            err_msg = re.sub(r"\[parameters:.*\]", "[parameters: <REDACTED>]", err_msg, flags=re.DOTALL)
            err_msg = re.sub(r"hashed_password.*", "hashed_password: [REDACTED]", err_msg)
            
        logger.error(f"Error syncing table {table_name}: {err_msg}")
        raise  # Let caller handle transaction rollback

def run_sync():
    """Main loop for synchronization worker."""
    if not USE_MYSQL or mysql_engine is None:
        logger.info("Sync worker disabled (MySQL not enabled).")
        return
        
    logger.info("Sync worker thread started.")
    while True:
        try:
            # Only sync if we are back in MySQL mode (meaning MySQL is online)
            if get_db_mode() == "mysql":
                sqlite_inspector = inspect(sqlite_engine)
                mysql_inspector = inspect(mysql_engine)
                
                with sqlite_engine.connect() as sqlite_conn:
                    with mysql_engine.connect() as mysql_conn:
                        with mysql_conn.begin():  # Explicit transaction for all table syncs
                            for table in TABLES_TO_SYNC:
                                if sqlite_inspector.has_table(table) and mysql_inspector.has_table(table):
                                    sync_table_data(table, sqlite_conn, mysql_conn)
            
        except Exception as e:
            logger.error(f"Error in sync cycle: {e}")
            
        time.sleep(30) # Run every 30 seconds

def start_sync_worker():
    """Start the sync worker in a background thread."""
    if USE_MYSQL and mysql_engine is not None:
        t = threading.Thread(target=run_sync, daemon=True, name="DBSyncWorker")
        t.start()
