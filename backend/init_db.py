"""
Initialize Database for KMTI iCAD Hub

This script:
1. Creates the database schema (tables) based on SQLAlchemy models.
2. Populates the database with initial testing users.
"""

import sys
import argparse
from pathlib import Path

# Add project root to path to allow both direct and module execution
sys.path.insert(0, str(Path(__file__).parent.parent))

try:
    # Try importing as a package first (works when run from root)
    from backend.database import engine, Base, SessionLocal # type: ignore
    from backend import models # type: ignore
    from backend.create_test_users import create_test_users # type: ignore
except ImportError:
    # Fallback for direct execution from the backend directory
    from database import engine, Base, SessionLocal # type: ignore
    import models # type: ignore
    from create_test_users import create_test_users # type: ignore

def init_db(reset=False, seed_only=False):
    """
    Initialize the database.
    :param reset: If True, drops all tables before creating them.
    :param seed_only: If True, skips table creation and only seeds data.
    """
    print("="*60)
    print(f"Initializing Database {'(RESET)' if reset else ''}")
    print("="*60)
    
    try:
        if not seed_only:
            if reset:
                print("\n[INFO] Dropping existing database schema...")
                Base.metadata.drop_all(bind=engine)
                print("[SUCCESS] Database schema dropped.")

            # Create all tables
            print("\n[INFO] Creating database schema...")
            Base.metadata.create_all(bind=engine)
            print("[SUCCESS] Database schema created successfully!")
        
        # Create initial test users
        print("\n[INFO] Seeding initial users...")
        create_test_users()
        
        print("\n" + "="*60)
        print("[SUCCESS] Database initialization complete!")
        print("="*60)
        
    except Exception as e:
        print(f"\n[ERROR] Error during initialization: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Initialize Database for KMTI iCAD Hub")
    parser.add_argument("--reset", action="store_true", help="Drop all tables before creating them")
    parser.add_argument("--seed-only", action="store_true", help="Only seed test data, skip table creation")
    
    args = parser.parse_args()
    init_db(reset=args.reset, seed_only=args.seed_only)

