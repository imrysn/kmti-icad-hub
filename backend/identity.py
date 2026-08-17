"""Canonical identity values shared by account creation and authentication."""


def normalize_email_address(email: str) -> str:
    """Return the canonical form used for email lookup and uniqueness."""
    return email.strip().casefold()
