"""Provider-neutral transactional email creation.

Messages are stored in the database outbox. A provider adapter can deliver
them later without coupling account transactions to an external API.
"""

import html
import os
from sqlalchemy.orm import Session

from ..models import EmailOutbox, RegistrationApplication, User


def queue_verification_email(db: Session, user: User, application: RegistrationApplication, token: str) -> EmailOutbox:
    app_url = os.getenv("PUBLIC_APP_URL", "http://127.0.0.1:5173").rstrip("/")
    verification_url = f"{app_url}/#/register?token={token}"
    name = user.full_name or user.username
    if user.preferred_language == "ja":
        subject = "KMTI Training Hub メールアドレス確認"
        text_body = f"{name} 様\n\n次のリンクからメールアドレスを確認してください（24時間有効）:\n{verification_url}"
        heading = "メールアドレスを確認してください"
        button = "メールアドレスを確認"
    else:
        subject = "Verify your KMTI Training Hub email"
        text_body = f"Hello {name},\n\nVerify your email within 24 hours:\n{verification_url}"
        heading = "Verify your email address"
        button = "Verify email"
    html_body = (
        f"<h1>{html.escape(heading)}</h1><p>{html.escape(name)},</p>"
        f"<p><a href=\"{html.escape(verification_url, quote=True)}\">{html.escape(button)}</a></p>"
        "<p>This link expires in 24 hours.</p>"
    )
    message = EmailOutbox(
        message_type="registration.email_verification",
        recipient_email=user.email,
        recipient_name=name,
        preferred_language=user.preferred_language,
        subject=subject,
        text_body=text_body,
        html_body=html_body,
        related_type="registration_application",
        related_id=str(application.id),
    )
    db.add(message)
    return message
