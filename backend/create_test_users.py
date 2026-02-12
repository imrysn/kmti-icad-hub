"""
Create Test Users for KMTI iCAD Hub

Creates sample users for testing authentication:
- trainee: For testing Mentor Mode
- employee: For testing Assistant Mode  
- admin: For testing full access
"""

import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.database import SessionLocal
from backend.models import User
from backend.auth.security import hash_password
from datetime import datetime

def create_test_users():
    """Create test users for each role"""
    
    db = SessionLocal()
    
    test_users = [
        {
            "username": "trainee",
            "email": "trainee@kmti.com",
            "password": "trainee123",
            "full_name": "Test Trainee",
            "role": "trainee"
        },
        {
            "username": "employee",
            "email": "employee@kmti.com",
            "password": "employee123",
            "full_name": "Test Employee",
            "role": "employee"
        },
        {
            "username": "admin",
            "email": "admin@kmti.com",
            "password": "admin123",
            "full_name": "Test Administrator",
            "role": "admin"
        }
    ]
    
    print("="*60)
    print("Creating Test Users")
    print("="*60)
    
    for user_data in test_users:
        # Check if user already exists
        existing = db.query(User).filter(User.username == user_data["username"]).first()
        
        if existing:
            print(f"⚠️  User '{user_data['username']}' already exists, skipping...")
            continue
        
        # Create new user
        new_user = User(
            username=user_data["username"],
            email=user_data["email"],
            hashed_password=hash_password(user_data["password"]),
            full_name=user_data["full_name"],
            role=user_data["role"],
            is_active=True,
            created_at=datetime.utcnow()
        )
        
        db.add(new_user)
        print(f"✅ Created user: {user_data['username']} (Role: {user_data['role']})")
    
    db.commit()
    db.close()
    
    print("\n" + "="*60)
    print("Test Users Ready!")
    print("="*60)
    print("\nYou can now login with:")
    print("  Trainee:  username='trainee' password='trainee123'")
    print("  Employee: username='employee' password='employee123'")
    print("  Admin:    username='admin' password='admin123'")
    print("="*60)

if __name__ == "__main__":
    create_test_users()
