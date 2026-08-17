"""Encrypted TOTP MFA and single-use recovery-code helpers."""
import base64
import hashlib
import hmac
import os
import secrets
import struct
import time
import urllib.parse

from cryptography.fernet import Fernet


def _fernet() -> Fernet:
    key = base64.urlsafe_b64encode(hashlib.sha256(os.environ["SECRET_KEY"].encode()).digest())
    return Fernet(key)


def new_totp_secret() -> str:
    return base64.b32encode(secrets.token_bytes(20)).decode().rstrip("=")


def encrypt_secret(secret: str) -> str:
    return _fernet().encrypt(secret.encode()).decode()


def decrypt_secret(value: str) -> str:
    return _fernet().decrypt(value.encode()).decode()


def totp_code(secret: str, at_time: int | None = None) -> str:
    counter = int((at_time or time.time()) // 30)
    padded = secret + "=" * ((8 - len(secret) % 8) % 8)
    digest = hmac.new(base64.b32decode(padded), struct.pack(">Q", counter), hashlib.sha1).digest()
    offset = digest[-1] & 15
    number = (struct.unpack(">I", digest[offset:offset + 4])[0] & 0x7fffffff) % 1_000_000
    return f"{number:06d}"


def verify_totp(secret: str, code: str) -> bool:
    now = int(time.time())
    clean = code.strip().replace(" ", "")
    return any(hmac.compare_digest(totp_code(secret, now + drift * 30), clean) for drift in (-1, 0, 1))


def provisioning_uri(secret: str, email: str) -> str:
    label = urllib.parse.quote(f"KMTI Training Hub:{email}")
    query = urllib.parse.urlencode({"secret": secret, "issuer": "KMTI Training Hub", "algorithm": "SHA1", "digits": 6, "period": 30})
    return f"otpauth://totp/{label}?{query}"


def hash_mfa_token(value: str) -> str:
    return hmac.new(os.environ["SECRET_KEY"].encode(), value.encode(), hashlib.sha256).hexdigest()


def new_recovery_codes(count: int = 8) -> list[str]:
    return [f"{secrets.token_hex(4).upper()}-{secrets.token_hex(4).upper()}" for _ in range(count)]
