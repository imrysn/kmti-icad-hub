"""
Test MySQL Database Connection

Run this script to verify MySQL connection is working before proceeding.
"""

import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.database import engine, SQLALCHEMY_DATABASE_URL, USE_MYSQL
from backend.models import Base

def test_connection():
    """Test database connection and display info"""
    
    print("="*60)
    print("MySQL Connection Test")
    print("="*60)
    
    print(f"\nDatabase Mode: {'MySQL' if USE_MYSQL else 'SQLite'}")
    print(f"Connection URL: {SQLALCHEMY_DATABASE_URL.replace(':Ph15IcadRs@', ':****@')}")  # Hide password
    
    try:
        # Test connection
        with engine.connect() as conn:
            print("\n✅ Connection successful!")
            
            # Create tables
            print("\nCreating tables...")
            Base.metadata.create_all(bind=engine)
            print("✅ Tables created successfully!")
            
            # List tables
            from sqlalchemy import inspect
            inspector = inspect(engine)
            tables = inspector.get_table_names()
            
            print(f"\n📊 Database Tables ({len(tables)}):")
            for table in tables:
                print(f"   - {table}")
            
            print("\n" + "="*60)
            print("✅ MySQL migration successful! Ready to proceed.")
            print("="*60)
            
    except Exception as e:
        print(f"\n❌ Connection failed: {e}")
        print("\nTroubleshooting:")
        print("1. Verify MySQL server is running on KMTI-NAS")
        print("2. Check credentials in .env file")
        print("3. Ensure database 'kmtifms' exists")
        print("4. Verify network connectivity to KMTI-NAS")
        sys.exit(1)

if __name__ == "__main__":
    test_connection()
