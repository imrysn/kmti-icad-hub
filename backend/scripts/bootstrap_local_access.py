"""Repair/seed the local SQLite access foundation for development.

This is intentionally scoped to the repository's local ``kmti_icad.db``. It is
not a production migration or a MySQL administration utility.
"""

import argparse
import sqlite3
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT))


USER_COLUMNS = {
    "account_status": "ALTER TABLE users ADD COLUMN account_status VARCHAR(50) NOT NULL DEFAULT 'active'",
    "email_verified_at": "ALTER TABLE users ADD COLUMN email_verified_at DATETIME",
    "approved_at": "ALTER TABLE users ADD COLUMN approved_at DATETIME",
    "approved_by_user_id": "ALTER TABLE users ADD COLUMN approved_by_user_id INTEGER",
    "preferred_language": "ALTER TABLE users ADD COLUMN preferred_language VARCHAR(10) NOT NULL DEFAULT 'en'",
    "timezone": "ALTER TABLE users ADD COLUMN timezone VARCHAR(100) NOT NULL DEFAULT 'Asia/Manila'",
}


def ensure_compatibility_columns(database_path: Path) -> None:
    connection = sqlite3.connect(database_path)
    try:
        existing = {row[1] for row in connection.execute("PRAGMA table_info(users)")}
        if not existing:
            raise RuntimeError("The local users table does not exist.")
        for name, statement in USER_COLUMNS.items():
            if name not in existing:
                connection.execute(statement)
        connection.execute(
            "CREATE INDEX IF NOT EXISTS ix_users_account_status ON users (account_status)"
        )
        connection.commit()
    finally:
        connection.close()


def grant_full_access(username: str) -> list[str]:
    from backend.database import SQLiteSessionLocal
    from backend.models import AdminAreaGrant, Base, User
    from backend.database import sqlite_engine
    from backend.services.access_control_service import seed_access_foundation, sync_legacy_user_access

    Base.metadata.create_all(bind=sqlite_engine)
    db = SQLiteSessionLocal()
    try:
        user = db.query(User).filter(User.username == username).one_or_none()
        if user is None:
            raise RuntimeError(f"Local user '{username}' was not found.")
        if user.role != "admin":
            raise RuntimeError(f"Local user '{username}' is not a legacy admin.")

        seed_access_foundation(db)
        sync_legacy_user_access(db, user)
        existing = {
            row[0]
            for row in db.query(AdminAreaGrant.area_code).filter(
                AdminAreaGrant.user_id == user.id,
                AdminAreaGrant.revoked_at.is_(None),
            ).all()
        }
        for area in {"content", "organization", "platform"} - existing:
            db.add(AdminAreaGrant(
                user_id=user.id,
                area_code=area,
                reason="Local development full-access grant",
            ))
        db.commit()
        return sorted({
            row[0]
            for row in db.query(AdminAreaGrant.area_code).filter(
                AdminAreaGrant.user_id == user.id,
                AdminAreaGrant.revoked_at.is_(None),
            ).all()
        })
    finally:
        db.close()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--username", default="admin")
    args = parser.parse_args()

    database_path = PROJECT_ROOT / "kmti_icad.db"
    ensure_compatibility_columns(database_path)
    areas = grant_full_access(args.username)
    print(f"Local user '{args.username}' Admin areas: {', '.join(areas)}")


if __name__ == "__main__":
    main()
