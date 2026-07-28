"""Shared time helpers for database timestamps.

The current schema stores timezone-naive ``DateTime`` values. Keep those values
in UTC consistently, and add timezone information only at the API boundary.
"""

import os
from datetime import datetime, timezone
from zoneinfo import ZoneInfo


APP_TIMEZONE = ZoneInfo(os.getenv("APP_TIMEZONE", "Asia/Manila"))


def utc_now() -> datetime:
    """Return the actual current UTC time in the schema's naive DB format."""
    return datetime.now(timezone.utc).replace(tzinfo=None)


def local_now() -> datetime:
    """Return current application-local time in the schema's naive format."""
    return datetime.now(APP_TIMEZONE).replace(tzinfo=None)


def local_timestamp_iso(value: datetime) -> str:
    """Serialize a stored local timestamp with its real timezone offset."""
    if value.tzinfo is None:
        value = value.replace(tzinfo=APP_TIMEZONE)
    else:
        value = value.astimezone(APP_TIMEZONE)
    return value.isoformat()
