import threading
import time
import logging
import os
import shutil
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
        for cand in ["updated_at", "submitted_at", "last_accessed", "completed_at", "last_updated", "created_at"]:
            if cand in columns:
                time_col = cand
                break

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
            
        logger.error(f"Error syncing table {table_name} up: {err_msg}")
        raise  # Let caller handle transaction rollback

def sync_table_down(table_name: str, sqlite_conn, mysql_conn):
    """Sync data for a single table from MySQL to SQLite (Sync-Down), and prune deleted items."""
    try:
        # Get MySQL (Source) records
        mysql_result = mysql_conn.execute(text(f"SELECT * FROM {table_name}"))
        columns = list(mysql_result.keys())
        mysql_rows = [dict(zip(columns, row)) for row in mysql_result.fetchall()]
        
        # Get SQLite (Target) keys
        pk_col = "key" if table_name == "system_settings" else "id"
        time_col = None
        for cand in ["updated_at", "submitted_at", "last_accessed", "completed_at", "last_updated", "created_at"]:
            if cand in columns:
                time_col = cand
                break
                
        if time_col:
            sqlite_result = sqlite_conn.execute(text(f"SELECT {pk_col}, {time_col} FROM {table_name}"))
            sqlite_data = {row[0]: row[1] for row in sqlite_result.fetchall()}
            existing_pks = set(sqlite_data.keys())
        else:
            sqlite_result = sqlite_conn.execute(text(f"SELECT {pk_col} FROM {table_name}"))
            sqlite_data = {}
            existing_pks = {row[0] for row in sqlite_result.fetchall()}
            
        existing_usernames = set()
        if table_name == "users":
            uname_result = sqlite_conn.execute(text("SELECT username FROM users"))
            existing_usernames = {row[0].lower() for row in uname_result.fetchall() if row[0]}
            
        mysql_pks = set()
        for row in mysql_rows:
            pk_val = row[pk_col]
            mysql_pks.add(pk_val)
            if pk_val not in existing_pks:
                if table_name == "users" and row.get("username") and row.get("username").lower() in existing_usernames:
                    continue
                cols = ", ".join(row.keys())
                placeholders = ", ".join([f":{col}" for col in row.keys()])
                sqlite_conn.execute(text(f"INSERT INTO {table_name} ({cols}) VALUES ({placeholders})"), row)
            else:
                if time_col and row[time_col]:
                    mysql_time = row[time_col]
                    sqlite_time = sqlite_data.get(pk_val)
                    if not sqlite_time or str(mysql_time) > str(sqlite_time):
                        set_clause = ", ".join([f"{col} = :{col}" for col in row.keys() if col != pk_col])
                        sqlite_conn.execute(text(f"UPDATE {table_name} SET {set_clause} WHERE {pk_col} = :key_val"), {**row, "key_val": pk_val})
        
        # Prune local records that were deleted on MySQL
        missing_pks = existing_pks - mysql_pks
        if missing_pks:
            # We can't safely bulk delete if there are foreign keys that restrict, but since this is an offline cache, we try
            for mpk in missing_pks:
                sqlite_conn.execute(text(f"DELETE FROM {table_name} WHERE {pk_col} = :key_val"), {"key_val": mpk})
                
    except Exception as e:
        err_msg = str(e)
        logger.error(f"Error syncing table {table_name} down: {err_msg}")
        raise

def sync_local_files_to_nas():
    """Sync files uploaded during Local Mode back to the NAS."""
    from backend.database import APP_PATH
    
    upload_base = os.getenv("UPLOAD_DIR")
    if not upload_base:
        return
        
    local_uploads = os.path.join(APP_PATH, "uploads")
    if not os.path.exists(local_uploads):
        return
        
    # Check if NAS is reachable
    drive = os.path.splitdrive(upload_base)[0]
    nas_reachable = False
    if drive:
        nas_reachable = os.path.exists(drive + "\\")
    elif upload_base.startswith("\\\\"):
        parts = upload_base.strip("\\").split("\\")
        share_root = "\\\\" + "\\".join(parts[:2]) if len(parts) >= 2 else upload_base
        nas_reachable = os.path.exists(share_root)
    else:
        nas_reachable = True # It's a local path anyway
        
    if not nas_reachable:
        return
        
    # Walk through local uploads and copy to NAS
    local_submissions = os.path.join(local_uploads, "submissions")
    if os.path.exists(local_submissions):
        for root, dirs, files in os.walk(local_submissions):
            for file in files:
                local_file_path = os.path.join(root, file)
                rel_path = os.path.relpath(local_file_path, local_uploads)
                target_file_path = os.path.join(upload_base, rel_path)
                
                try:
                    if not os.path.exists(target_file_path):
                        os.makedirs(os.path.dirname(target_file_path), exist_ok=True)
                        shutil.copy2(local_file_path, target_file_path)
                    else:
                        # Copy if local is newer or different size
                        local_stat = os.stat(local_file_path)
                        target_stat = os.stat(target_file_path)
                        if local_stat.st_mtime > target_stat.st_mtime or local_stat.st_size != target_stat.st_size:
                            shutil.copy2(local_file_path, target_file_path)
                except Exception as e:
                    logger.warning(f"File sync timeout/error for {file}: {e}")

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
                                    # Phase 1: Sync Up
                                    sync_table_data(table, sqlite_conn, mysql_conn)
                                    
                            # Phase 2: Sync Down (Users & Mappings only)
                            tables_to_sync_down = ["users", "trainer_trainee_mappings", "trainee_set_mappings", "system_settings"]
                            for table in tables_to_sync_down:
                                if sqlite_inspector.has_table(table) and mysql_inspector.has_table(table):
                                    sync_table_down(table, sqlite_conn, mysql_conn)
                
                # Phase 3: File Sync Up
                sync_local_files_to_nas()
            
        except Exception as e:
            logger.error(f"Error in sync cycle: {e}")
            
        time.sleep(30) # Run every 30 seconds

def start_sync_worker():
    """Start the sync worker in a background thread."""
    if USE_MYSQL and mysql_engine is not None:
        t = threading.Thread(target=run_sync, daemon=True, name="DBSyncWorker")
        t.start()
