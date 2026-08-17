"""Process-local abuse controls; replace storage with Redis for multi-instance production."""
import os
import threading
import time
import urllib.parse
import urllib.request
import json
from collections import defaultdict, deque
from fastapi import HTTPException, Request

_lock = threading.Lock()
_attempts = defaultdict(deque)
_blocked_until = {}
_violations = defaultdict(int)

def clear_rate_limits() -> None:
    with _lock:
        _attempts.clear(); _blocked_until.clear(); _violations.clear()

def client_key(request: Request, scope: str, identifier: str = "") -> str:
    host = request.client.host if request.client else "unknown"
    return f"{scope}:{host}:{identifier.strip().lower()}"

def enforce_rate_limit(key: str, limit: int, window_seconds: int) -> None:
    now = time.time()
    with _lock:
        blocked = _blocked_until.get(key, 0)
        if blocked > now:
            retry = max(1, int(blocked - now))
            raise HTTPException(status_code=429, detail="Too many requests. Please try again later.", headers={"Retry-After": str(retry)})
        bucket = _attempts[key]
        while bucket and bucket[0] <= now - window_seconds:
            bucket.popleft()
        if len(bucket) >= limit:
            _violations[key] += 1
            penalty = min(window_seconds * (2 ** (_violations[key] - 1)), 3600)
            _blocked_until[key] = now + penalty
            raise HTTPException(status_code=429, detail="Too many requests. Please try again later.", headers={"Retry-After": str(penalty)})
        bucket.append(now)

def verify_captcha(token: str | None, remote_ip: str) -> None:
    if os.getenv("CAPTCHA_ENABLED", "false").lower() != "true":
        return
    secret = os.getenv("CAPTCHA_SECRET", "")
    verify_url = os.getenv("CAPTCHA_VERIFY_URL", "")
    if not secret or not verify_url:
        raise HTTPException(status_code=503, detail="Bot protection is not configured")
    if not token:
        raise HTTPException(status_code=422, detail="Bot verification is required")
    body = urllib.parse.urlencode({"secret": secret, "response": token, "remoteip": remote_ip}).encode()
    try:
        with urllib.request.urlopen(verify_url, body, timeout=5) as response:
            valid = bool(json.loads(response.read().decode()).get("success"))
    except Exception:
        raise HTTPException(status_code=503, detail="Bot verification is temporarily unavailable")
    if not valid:
        raise HTTPException(status_code=422, detail="Bot verification failed")
