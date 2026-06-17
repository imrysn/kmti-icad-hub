import sqlite3
import pymysql
import os
from dotenv import load_dotenv

load_dotenv()

def main():
    # Get SQLite tables/columns
    sqlite_conn = sqlite3.connect('kmti_icad.db')
    sqlite_cursor = sqlite_conn.cursor()
    sqlite_tables = {}
    sqlite_cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    for (table_name,) in sqlite_cursor.fetchall():
        sqlite_cursor.execute(f"PRAGMA table_info({table_name})")
        columns = {col[1]: col[2] for col in sqlite_cursor.fetchall()}
        sqlite_tables[table_name] = columns
    sqlite_conn.close()

    # Get MySQL tables/columns
    mysql_conn = pymysql.connect(
        host=os.getenv('DB_HOST', 'KMTI-NAS'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_NAME', 'kmtihub'),
        charset='utf8'
    )
    mysql_tables = {}
    try:
        with mysql_conn.cursor() as cursor:
            cursor.execute("SHOW TABLES")
            for (table_name,) in cursor.fetchall():
                cursor.execute(f"DESCRIBE `{table_name}`")
                columns = {col[0]: col[1] for col in cursor.fetchall()}
                mysql_tables[table_name] = columns
    finally:
        mysql_conn.close()

    # Compare schemas
    for table, sqlite_cols in sqlite_tables.items():
        if table not in mysql_tables:
            print(f'Missing table in MySQL: {table}')
            continue
        mysql_cols = mysql_tables[table]
        missing_in_mysql = [col for col in sqlite_cols if col not in mysql_cols]
        if missing_in_mysql:
            print(f'Table {table}: columns missing in MySQL: {missing_in_mysql}')

if __name__ == '__main__':
    main()
