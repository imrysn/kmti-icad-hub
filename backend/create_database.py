"""
Create New Database for KMTI iCAD Hub

This script creates the database specified in .env file.
Run this before running the connection test.
"""

import os
import pymysql
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_database():
    """Create the database if it doesn't exist"""
    
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = int(os.getenv("DB_PORT", "3306"))
    DB_NAME = os.getenv("DB_NAME", "kmti_icad_hub")
    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "")
    
    print("="*60)
    print("Creating Database")
    print("="*60)
    print(f"\nHost: {DB_HOST}:{DB_PORT}")
    print(f"Database: {DB_NAME}")
    print(f"User: {DB_USER}")
    
    try:
        # Connect to MySQL server (without specifying database)
        connection = pymysql.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            charset='latin1'
        )
        
        print("\n✅ Connected to MySQL server!")
        
        with connection.cursor() as cursor:
            # Create database if it doesn't exist
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{DB_NAME}` CHARACTER SET latin1 COLLATE latin1_swedish_ci")
            print(f"✅ Database '{DB_NAME}' created successfully!")
            
            # Grant privileges (if needed)
            try:
                cursor.execute(f"GRANT ALL PRIVILEGES ON `{DB_NAME}`.* TO '{DB_USER}'@'%'")
                cursor.execute("FLUSH PRIVILEGES")
                print(f"✅ Privileges granted to user '{DB_USER}'")
            except Exception as e:
                print(f"⚠️  Could not grant privileges (may already exist): {e}")
        
        connection.commit()
        connection.close()
        
        print("\n" + "="*60)
        print("✅ Database setup complete!")
        print("="*60)
        print(f"\nYou can now run: python test_mysql_connection.py")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nTroubleshooting:")
        print("1. Verify MySQL server is running on", DB_HOST)
        print("2. Check credentials in .env file")
        print("3. Ensure user has CREATE DATABASE privileges")
        return False
    
    return True

if __name__ == "__main__":
    create_database()
