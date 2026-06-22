import sys
import os
from backend.database import SessionLocal
from backend.models import Broadcast

def trigger(message: str, level: str = "info"):
    db = SessionLocal()
    try:
        broadcast = Broadcast(
            message=message,
            level=level,
            created_by=1  # System/Admin default
        )
        db.add(broadcast)
        db.commit()
        print(f"Successfully triggered {level} broadcast: '{message}'")
    except Exception as e:
        db.rollback()
        print(f"Error triggering broadcast: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    msg = sys.argv[1] if len(sys.argv) > 1 else "Test Broadcast from Console"
    lvl = sys.argv[2] if len(sys.argv) > 2 else "info"
    trigger(msg, lvl)
