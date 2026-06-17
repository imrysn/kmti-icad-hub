import sys
import os
from dotenv import load_dotenv
import pymysql

# Add backend to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.database import Base
# Import all models to ensure they are registered with Base.metadata
import backend.models

load_dotenv()

def main():
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

    # Compare SQLAlchemy Metadata to MySQL
    for table_name, table_obj in Base.metadata.tables.items():
        if table_name not in mysql_tables:
            print(f"Missing table in MySQL: {table_name}")
            continue
            
        mysql_cols = mysql_tables[table_name]
        model_cols = table_obj.columns.keys()
        
        missing_in_mysql = [col for col in model_cols if col not in mysql_cols]
        if missing_in_mysql:
            print(f"Table {table_name}: columns in model but missing in MySQL: {missing_in_mysql}")
            for col in missing_in_mysql:
                col_obj = table_obj.columns[col]
                print(f"  - {col}: type={col_obj.type}, nullable={col_obj.nullable}, default={col_obj.default}")

if __name__ == '__main__':
    main()
