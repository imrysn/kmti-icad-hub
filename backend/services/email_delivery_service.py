"""Optional SMTP delivery worker for transactional outbox messages."""

import logging
import os
import smtplib
import threading
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage

from ..database import SessionLocal
from ..models import EmailOutbox

logger = logging.getLogger(__name__)
_worker_started = False
_worker_lock = threading.Lock()


def _smtp_settings() -> dict[str, str | int | bool]:
    return {
        "host": os.getenv("SMTP_HOST", "").strip(),
        "port": int(os.getenv("SMTP_PORT", "587")),
        "username": os.getenv("SMTP_USERNAME", "").strip(),
        "password": os.getenv("SMTP_PASSWORD", ""),
        "from_email": os.getenv("EMAIL_FROM_ADDRESS", "").strip(),
        "from_name": os.getenv("EMAIL_FROM_NAME", "KMTI Training Hub").strip(),
        "use_tls": os.getenv("SMTP_USE_TLS", "true").lower() == "true",
        "use_ssl": os.getenv("SMTP_USE_SSL", "false").lower() == "true",
    }


def _send_smtp(message: EmailOutbox, settings: dict[str, str | int | bool]) -> str | None:
    email = EmailMessage()
    email["Subject"] = message.subject
    email["From"] = f"{settings['from_name']} <{settings['from_email']}>"
    email["To"] = message.recipient_email
    email.set_content(message.text_body)
    email.add_alternative(message.html_body, subtype="html")
    smtp_class = smtplib.SMTP_SSL if settings["use_ssl"] else smtplib.SMTP
    with smtp_class(str(settings["host"]), int(settings["port"]), timeout=20) as smtp:
        if settings["use_tls"] and not settings["use_ssl"]:
            smtp.starttls()
        if settings["username"]:
            smtp.login(str(settings["username"]), str(settings["password"]))
        smtp.send_message(email)
    return email.get("Message-ID")


def process_email_outbox_once(limit: int = 10) -> int:
    settings = _smtp_settings()
    if not settings["host"] or not settings["from_email"]:
        return 0
    db = SessionLocal()
    processed = 0
    try:
        now = datetime.now(timezone.utc)
        messages = db.query(EmailOutbox).filter(
            EmailOutbox.status.in_(["pending", "failed"]),
            EmailOutbox.next_attempt_at <= now,
            EmailOutbox.attempts < 5,
        ).order_by(EmailOutbox.created_at).limit(limit).all()
        for message in messages:
            message.status = "processing"
            message.attempts += 1
            message.last_attempt_at = now
            db.commit()
            try:
                message.provider_message_id = _send_smtp(message, settings)
                message.status = "sent"
                message.sent_at = datetime.now(timezone.utc)
                message.last_error = None
            except Exception as exc:
                logger.warning("Transactional email delivery failed for outbox %s: %s", message.id, exc)
                message.status = "failed"
                message.last_error = str(exc)[:1000]
                message.next_attempt_at = now + timedelta(minutes=min(60, 2 ** message.attempts))
            db.commit()
            processed += 1
        return processed
    finally:
        db.close()


def start_email_delivery_worker() -> bool:
    global _worker_started
    if os.getenv("EMAIL_DELIVERY_MODE", "outbox").lower() != "smtp":
        return False
    settings = _smtp_settings()
    if not settings["host"] or not settings["from_email"]:
        logger.warning("EMAIL_DELIVERY_MODE=smtp but SMTP_HOST or EMAIL_FROM_ADDRESS is missing; queued emails will remain pending.")
        return False
    with _worker_lock:
        if _worker_started:
            return True
        _worker_started = True

    def run() -> None:
        while True:
            try:
                process_email_outbox_once()
            except Exception as exc:
                logger.exception("Email outbox worker error: %s", exc)
            threading.Event().wait(30)

    threading.Thread(target=run, name="email-outbox-worker", daemon=True).start()
    logger.info("Transactional email SMTP worker started.")
    return True
