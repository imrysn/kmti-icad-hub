"""
Initialize Database for KMTI iCAD Hub

This script:
1. Creates the database schema (tables) based on SQLAlchemy models.
2. Populates the database with initial testing users.
"""

import sys
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.database import engine, Base, SessionLocal
from backend.models import User # Ensures models are registered
from backend.create_test_users import create_test_users

def init_db():
    print("="*60)
    print("Initializing Database")
    print("="*60)
    
    try:
        # Create all tables
        print("\n[INFO] Creating database schema...")
        Base.metadata.create_all(bind=engine)
        print("✅ Database schema created successfully!")
        
        # Create initial test users
        print("\n[INFO] Creating initial users...")
        create_test_users()
        
        print("\n" + "="*60)
        print("✅ Database initialization complete!")
        print("="*60)
        
    except Exception as e:
        print(f"\n❌ Error during initialization: {e}")
        return False
    
    return True

if __name__ == "__main__":
    init_db()
