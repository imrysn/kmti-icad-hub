"""Provider-neutral transactional email creation.

Messages are stored in the database outbox. A provider adapter can deliver
them later without coupling account transactions to an external API.
"""

import html
import os
from sqlalchemy.orm import Session

from ..models import AccessPlan, AccountInvitation, EmailOutbox, RegistrationApplication, User


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


def queue_registration_decision_email(
    db: Session,
    user: User,
    application: RegistrationApplication,
    decision: str,
    plan: AccessPlan | None = None,
) -> EmailOutbox:
    """Queue applicant-facing approval/rejection email without internal notes."""
    app_url = os.getenv("PUBLIC_APP_URL", "http://127.0.0.1:5173").rstrip("/")
    login_url = f"{app_url}/#/login"
    name = user.full_name or user.username
    plan_name = plan.name if plan else ""
    applicant_message = (application.applicant_message or "").strip()

    if decision == "approved":
        message_type = "registration.approved"
        if user.preferred_language == "ja":
            subject = "KMTI Training Hub 登録承認のお知らせ"
            text_body = f"{name} 様\n\n登録が承認されました。\nアクセスプラン: {plan_name}\nログイン: {login_url}"
            heading = "登録が承認されました"
            summary = f"アクセスプラン: {plan_name}"
            button = "ログイン"
        else:
            subject = "Your KMTI Training Hub registration was approved"
            text_body = f"Hello {name},\n\nYour registration was approved.\nAccess plan: {plan_name}\nSign in: {login_url}"
            heading = "Your registration was approved"
            summary = f"Access plan: {plan_name}"
            button = "Sign in"
        html_body = (
            f"<h1>{html.escape(heading)}</h1><p>{html.escape(name)},</p>"
            f"<p>{html.escape(summary)}</p><p><a href=\"{html.escape(login_url, quote=True)}\">{html.escape(button)}</a></p>"
        )
    elif decision == "rejected":
        message_type = "registration.rejected"
        if user.preferred_language == "ja":
            subject = "KMTI Training Hub 登録申請について"
            heading = "登録申請の結果"
            default_message = "今回は登録申請を承認できませんでした。詳細についてはKMTIサポートへお問い合わせください。"
        else:
            subject = "Update on your KMTI Training Hub application"
            heading = "Registration application update"
            default_message = "We could not approve your registration at this time. Contact KMTI support if you need assistance."
        safe_message = applicant_message or default_message
        text_body = f"{name}\n\n{safe_message}"
        html_body = f"<h1>{html.escape(heading)}</h1><p>{html.escape(name)},</p><p>{html.escape(safe_message)}</p>"
    else:
        raise ValueError(f"Unsupported registration decision: {decision}")

    message = EmailOutbox(
        message_type=message_type,
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


def queue_invitation_email(db: Session, invitation: AccountInvitation, token: str, role_code: str, plan_name: str | None) -> EmailOutbox:
    app_url = os.getenv("PUBLIC_APP_URL", "http://127.0.0.1:5173").rstrip("/")
    acceptance_url = f"{app_url}/#/invitation/accept?token={token}"
    if invitation.preferred_language == "ja":
        subject = "KMTI Training Hub への招待"
        heading = "KMTI Training Hub への招待"
        detail = f"役割: {role_code}" + (f" / プラン: {plan_name}" if plan_name else "")
        button = "招待を受け入れる"
    else:
        subject = "You are invited to KMTI Training Hub"
        heading = "Your KMTI Training Hub invitation"
        detail = f"Role: {role_code}" + (f" / Plan: {plan_name}" if plan_name else "")
        button = "Accept invitation"
    text_body = f"{invitation.full_name}\n\n{detail}\n{acceptance_url}\n\nThis invitation expires on {invitation.expires_at}."
    html_body = f"<h1>{html.escape(heading)}</h1><p>{html.escape(invitation.full_name)},</p><p>{html.escape(detail)}</p><p><a href=\"{html.escape(acceptance_url, quote=True)}\">{html.escape(button)}</a></p>"
    message = EmailOutbox(
        message_type="invitation.created", recipient_email=invitation.email_normalized,
        recipient_name=invitation.full_name, preferred_language=invitation.preferred_language,
        subject=subject, text_body=text_body, html_body=html_body,
        related_type="account_invitation", related_id=str(invitation.id),
    )
    db.add(message)
    return message
