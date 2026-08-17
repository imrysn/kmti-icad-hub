"""Idempotently bootstrap access-foundation schema on the active database."""

import argparse
import sys
from pathlib import Path

from sqlalchemy import inspect, text

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT))

from backend.database import Base, SessionLocal, engine, get_db_mode
from backend.models import AdminAreaGrant, User
from backend.services.access_control_service import seed_access_foundation, sync_legacy_user_access
from backend.services.access_plan_service import seed_access_plans


USER_COLUMNS = {
    "account_status": "VARCHAR(50) NOT NULL DEFAULT 'active'",
    "email_verified_at": "DATETIME NULL",
    "approved_at": "DATETIME NULL",
    "approved_by_user_id": "INTEGER NULL",
    "preferred_language": "VARCHAR(10) NOT NULL DEFAULT 'en'",
    "timezone": "VARCHAR(100) NOT NULL DEFAULT 'Asia/Manila'",
}


def ensure_user_columns() -> None:
    existing = {column["name"] for column in inspect(engine).get_columns("users")}
    with engine.begin() as connection:
        for name, definition in USER_COLUMNS.items():
            if name not in existing:
                connection.execute(text(f"ALTER TABLE users ADD COLUMN {name} {definition}"))
    indexes = {index["name"] for index in inspect(engine).get_indexes("users")}
    if "ix_users_account_status" not in indexes:
        with engine.begin() as connection:
            connection.execute(text("CREATE INDEX ix_users_account_status ON users (account_status)"))


def grant_full_access(username: str) -> list[str]:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.username == username).one_or_none()
        if user is None:
            raise RuntimeError(f"User '{username}' was not found in the active database.")
        if user.role != "admin":
            raise RuntimeError(f"User '{username}' is not a legacy admin.")
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
                reason="Development full-access grant",
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
    parser.add_argument("--grant-full-access", action="store_true")
    args = parser.parse_args()

    Base.metadata.create_all(bind=engine)
    ensure_user_columns()
    db = SessionLocal()
    try:
        seed_access_foundation(db)
        seed_access_plans(db)
        db.commit()
    finally:
        db.close()
    if args.grant_full_access:
        areas = grant_full_access(args.username)
        print(f"{get_db_mode()} user '{args.username}' Admin areas: {', '.join(areas)}")
    else:
        print(f"{get_db_mode()} access-foundation schema is ready")


if __name__ == "__main__":
    main()
