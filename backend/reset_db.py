import os
import pymysql
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def reset_database():
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = int(os.getenv("DB_PORT", "3306"))
    DB_NAME = os.getenv("DB_NAME", "kmti_icad_hub")
    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "")

    print(f"--- Resetting Database: {DB_NAME} ---")
    
    try:
        # 1. Connect to MySQL server
        connection = pymysql.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            charset='utf8'
        )
        
        with connection.cursor() as cursor:
            # 2. Drop the existing database
            print(f"Dropping database '{DB_NAME}'...")
            cursor.execute(f"DROP DATABASE IF EXISTS `{DB_NAME}`")
            
            # 3. Create it fresh with UTF8
            print(f"Creating fresh database with utf8 encoding...")
            cursor.execute(f"CREATE DATABASE `{DB_NAME}` CHARACTER SET utf8 COLLATE utf8_unicode_ci")
            
        connection.commit()
        connection.close()
        print("✅ Database recreated successfully.")

        # 4. Initialize tables
        print("\nInitializing tables...")
        import init_db
        init_db.init_db()
        print("✅ All tables initialized.")
        
        print("\n" + "="*40)
        print("DONE! You can now re-ingest your data.")
        print("="*40)

    except Exception as e:
        print(f"\n❌ Error during reset: {e}")

if __name__ == "__main__":
    reset_database()
