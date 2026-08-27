import os
import threading
import time

import numpy as np
import pytest

from backend.routers import tts


def configure_cache(monkeypatch, tmp_path):
    monkeypatch.setattr(tts, "WRITABLE_CACHE_DIR", str(tmp_path))
    monkeypatch.setattr(tts, "BUNDLED_CACHE_DIR", str(tmp_path))
    monkeypatch.setattr(tts, "TTS_CACHE_MAX_BYTES", 1024 * 1024)
    monkeypatch.setattr(tts, "OPENAI_TTS_RESPONSE_FORMAT", "mp3")
    monkeypatch.setattr(tts, "OPENAI_TTS_MODEL", "tts-1")
    tts._cache_locks.clear()
    tts._cache_lock_users.clear()


def test_repeated_normalized_narration_calls_provider_once(monkeypatch, tmp_path):
    configure_cache(monkeypatch, tmp_path)
    calls = []

    def fake_openai(text, voice, speed, lang):
        calls.append((text, voice, speed, lang))
        return b"synthetic-audio", "mp3"

    monkeypatch.setattr(tts, "openai_tts_synthesize", fake_openai)

    first = tts.synthesize("Repeat   narration", "openai://nova", 1.0, "en-US")
    second = tts.synthesize(" Repeat narration ", "openai://nova", 1.0, "en-US")

    assert len(calls) == 1
    assert first.headers["x-tts-cache"] == "MISS"
    assert second.headers["x-tts-cache"] == "HIT"
    assert first.headers["x-tts-cache-detail"] == "MISS"
    assert second.headers["x-tts-cache-detail"] == "HIT"
    assert first.headers["x-tts-cache-profile"] == tts.TTS_CACHE_PROFILE_VERSION
    assert os.path.exists(first.path)
    assert not list(tmp_path.glob("*.tmp"))


def test_concurrent_identical_requests_do_not_duplicate_generation(monkeypatch, tmp_path):
    configure_cache(monkeypatch, tmp_path)
    call_count = 0
    call_guard = threading.Lock()

    def fake_openai(text, voice, speed, lang):
        nonlocal call_count
        with call_guard:
            call_count += 1
        time.sleep(0.05)
        return b"concurrent-audio", "mp3"

    monkeypatch.setattr(tts, "openai_tts_synthesize", fake_openai)
    responses = []

    def request_audio():
        responses.append(tts.synthesize("Concurrent narration", "openai://nova", 1.0, "en-US"))

    threads = [threading.Thread(target=request_audio) for _ in range(2)]
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()

    assert call_count == 1
    assert sorted(response.headers["x-tts-cache"] for response in responses) == ["HIT", "MISS"]
    assert sorted(response.headers["x-tts-cache-detail"] for response in responses) == ["HIT-AFTER-WAIT", "MISS"]
    assert not tts._cache_locks
    assert not tts._cache_lock_users


def test_legacy_cache_is_reused_without_provider_call(monkeypatch, tmp_path):
    configure_cache(monkeypatch, tmp_path)
    text = "Previously cached narration"
    legacy_key = tts.build_legacy_cache_key(
        "openai", "tts-1", "nova", text, 1.0, "en-us", "mp3"
    )
    legacy_file = tmp_path / f"{legacy_key}.mp3"
    legacy_file.write_bytes(b"legacy-audio")

    def unexpected_provider_call(*args, **kwargs):
        raise AssertionError("Legacy cache should prevent a provider request")

    monkeypatch.setattr(tts, "openai_tts_synthesize", unexpected_provider_call)
    response = tts.synthesize(text, "openai://nova", 1.0, "en-US")

    assert response.path == str(legacy_file)
    assert response.headers["x-tts-cache"] == "HIT"
    assert response.headers["x-tts-cache-detail"] == "HIT-LEGACY"
    assert response.headers["x-tts-cache-location"] == "BUNDLED-LEGACY"


def test_profile_version_changes_current_key_but_not_legacy_key():
    inputs = ("openai", "tts-1", "nova", "Versioned narration", 1.0, "en-us", "mp3")

    assert tts.build_cache_key(*inputs, version="profile-a") != tts.build_cache_key(*inputs, version="profile-b")
    assert tts.build_legacy_cache_key(*inputs) == tts.build_legacy_cache_key(*inputs)


def test_changed_narration_creates_a_new_cache_entry(monkeypatch, tmp_path):
    configure_cache(monkeypatch, tmp_path)
    provider_calls = []

    def fake_openai(text, voice, speed, lang):
        provider_calls.append(text)
        return text.encode("utf-8"), "mp3"

    monkeypatch.setattr(tts, "openai_tts_synthesize", fake_openai)
    first = tts.synthesize("Original narration", "openai://nova", 1.0, "en-US")
    changed = tts.synthesize("Changed narration", "openai://nova", 1.0, "en-US")

    assert provider_calls == ["Original narration", "Changed narration"]
    assert first.path != changed.path
    assert len(list(tmp_path.glob("*.mp3"))) == 2


def test_cleanup_tool_uses_runtime_cache_keys():
    from backend.scripts import clean_unused_tts_cache as cleanup

    inputs = ("openai", "tts-1", "nova", "Cache   alignment", 1.0, "en-us", "mp3")

    assert tts.build_cache_key(*inputs) == cleanup.build_cache_key(*inputs)
    assert tts.build_legacy_cache_key(*inputs) == cleanup.build_legacy_cache_key(*inputs)


def test_cleanup_preserves_legacy_by_default_and_can_drop_it():
    from backend.scripts import clean_unused_tts_cache as cleanup

    preserved = cleanup.get_hashes_for_text("Migration narration")
    current_only = cleanup.get_hashes_for_text("Migration narration", include_legacy=False)
    legacy_key = cleanup.build_legacy_cache_key(
        "openai", cleanup.OPENAI_TTS_MODEL, "nova", "Migration narration",
        1.0, "en-us", cleanup.OPENAI_TTS_RESPONSE_FORMAT,
    )
    current_key = cleanup.build_cache_key(
        "openai", cleanup.OPENAI_TTS_MODEL, "nova", "Migration narration",
        1.0, "en-us", cleanup.OPENAI_TTS_RESPONSE_FORMAT,
    )

    assert f"{legacy_key}.{cleanup.OPENAI_TTS_RESPONSE_FORMAT}" in preserved
    assert f"{legacy_key}.{cleanup.OPENAI_TTS_RESPONSE_FORMAT}" not in current_only
    assert f"{current_key}.{cleanup.OPENAI_TTS_RESPONSE_FORMAT}" in current_only


def test_openai_failure_uses_separate_wav_fallback_cache(monkeypatch, tmp_path):
    configure_cache(monkeypatch, tmp_path)
    openai_calls = 0

    def fail_openai(*args, **kwargs):
        nonlocal openai_calls
        openai_calls += 1
        raise RuntimeError("offline")

    monkeypatch.setattr(tts, "openai_tts_synthesize", fail_openai)
    monkeypatch.setattr(
        tts,
        "kokoro_tts_synthesize",
        lambda text, voice, speed, lang: (np.zeros(32, dtype=np.float32), 24000),
    )

    response = tts.synthesize("Fallback narration", "openai://nova", 1.0, "en-US")
    repeated = tts.synthesize("Fallback narration", "openai://nova", 1.0, "en-US")

    assert response.path.endswith(".wav")
    assert response.headers["x-tts-cache"] == "MISS"
    assert response.headers["x-tts-cache-detail"] == "MISS-FALLBACK"
    assert response.media_type == "audio/wav"
    assert repeated.path == response.path
    assert repeated.headers["x-tts-cache"] == "HIT"
    assert repeated.headers["x-tts-cache-detail"] == "HIT-FALLBACK"
    assert openai_calls == 1
    assert not list(tmp_path.glob("*.mp3"))


def test_http_endpoint_returns_cached_audio_and_rejects_empty_text(client, monkeypatch, tmp_path):
    configure_cache(monkeypatch, tmp_path)
    provider_calls = 0

    def fake_openai(*args, **kwargs):
        nonlocal provider_calls
        provider_calls += 1
        return b"endpoint-audio", "mp3"

    monkeypatch.setattr(tts, "openai_tts_synthesize", fake_openai)
    params = {"text": "Endpoint narration", "voice": "openai://nova", "speed": 1.0}
    first = client.get("/api/v1/tts/synthesize", params=params)
    repeated = client.get("/api/v1/tts/synthesize", params=params)
    empty = client.get("/api/v1/tts/synthesize", params={**params, "text": "   "})

    assert first.status_code == 200
    assert first.content == b"endpoint-audio"
    assert first.headers["content-type"].startswith("audio/mpeg")
    assert first.headers["x-tts-cache"] == "MISS"
    assert repeated.headers["x-tts-cache"] == "HIT"
    assert provider_calls == 1
    assert empty.status_code == 400
    assert empty.json()["detail"] == "Text cannot be empty."


def test_http_endpoint_defaults_to_nova_and_lists_only_nova(client, monkeypatch, tmp_path):
    configure_cache(monkeypatch, tmp_path)
    provider_calls = []

    def fake_openai(text, voice, speed, lang):
        provider_calls.append((text, voice, speed, lang))
        return b"default-nova-audio", "mp3"

    monkeypatch.setattr(tts, "openai_tts_synthesize", fake_openai)
    response = client.get("/api/v1/tts/synthesize", params={"text": "Default voice narration"})
    voices = client.get("/api/v1/tts/voices")

    assert response.status_code == 200
    assert provider_calls == [("Default voice narration", "nova", 1.0, "en-us")]
    assert voices.status_code == 200
    assert [voice["id"] for voice in voices.json()] == ["openai://nova"]


def test_japanese_text_is_sent_unchanged_to_nova_with_japanese_language(monkeypatch, tmp_path):
    configure_cache(monkeypatch, tmp_path)
    provider_calls = []

    def fake_openai(text, voice, speed, lang):
        provider_calls.append((text, voice, speed, lang))
        return b"japanese-audio", "mp3"

    monkeypatch.setattr(tts, "openai_tts_synthesize", fake_openai)
    japanese_text = "正面図を選択してください。"
    response = tts.synthesize(japanese_text, "openai://nova", 1.0, None)

    assert provider_calls == [(japanese_text, "nova", 1.0, "ja-jp")]
    assert response.headers["x-tts-cache"] == "MISS"


def test_profile_change_intentionally_creates_a_new_cache_entry(monkeypatch, tmp_path):
    configure_cache(monkeypatch, tmp_path)
    inputs = ("openai", "tts-1", "nova", "Profile migration", 1.0, "en-us", "mp3")

    old_key = tts.build_cache_key(*inputs, version="foundations-v1")
    new_key = tts.build_cache_key(*inputs, version="foundations-v2")

    assert old_key != new_key
    (tmp_path / f"{old_key}.mp3").write_bytes(b"obsolete-profile")
    (tmp_path / f"{new_key}.mp3").write_bytes(b"current-profile")
    assert len(list(tmp_path.glob("*.mp3"))) == 2


def test_cache_size_limit_removes_oldest_unprotected_file(monkeypatch, tmp_path):
    configure_cache(monkeypatch, tmp_path)
    oldest = tmp_path / "old.mp3"
    protected = tmp_path / "new.mp3"
    oldest.write_bytes(b"12345")
    protected.write_bytes(b"67890")
    os.utime(oldest, (1, 1))
    os.utime(protected, (2, 2))
    monkeypatch.setattr(tts, "TTS_CACHE_MAX_BYTES", 5)

    tts.enforce_cache_size_limit(str(protected))

    assert not oldest.exists()
    assert protected.exists()


def test_atomic_byte_write_cleans_temp_file_when_replace_fails(monkeypatch, tmp_path):
    configure_cache(monkeypatch, tmp_path)
    target = tmp_path / "atomic.mp3"

    def fail_replace(*args, **kwargs):
        raise OSError("simulated replace failure")

    monkeypatch.setattr(tts.os, "replace", fail_replace)

    with pytest.raises(OSError, match="simulated replace failure"):
        tts.atomic_write_bytes(str(target), b"partial-audio")

    assert not target.exists()
    assert not list(tmp_path.glob("tts-*.tmp"))


def test_atomic_wav_write_cleans_temp_file_when_encoder_fails(monkeypatch, tmp_path):
    configure_cache(monkeypatch, tmp_path)
    target = tmp_path / "atomic.wav"

    def fail_write(*args, **kwargs):
        raise RuntimeError("simulated encoder failure")

    monkeypatch.setattr(tts.sf, "write", fail_write)

    with pytest.raises(RuntimeError, match="simulated encoder failure"):
        tts.atomic_write_wav(str(target), np.zeros(8, dtype=np.float32), 24000)

    assert not target.exists()
    assert not list(tmp_path.glob("tts-*.wav"))


@pytest.mark.parametrize(
    ("configured_value", "expected"),
    [("invalid", 1024), ("0", 1), ("-5", 1), ("32", 32)],
)
def test_cache_size_configuration_is_always_positive(monkeypatch, configured_value, expected):
    monkeypatch.setenv("TEST_TTS_CACHE_MAX_MB", configured_value)

    assert tts.positive_int_env("TEST_TTS_CACHE_MAX_MB", 1024) == expected


def test_all_public_cache_headers_are_canonical(monkeypatch, tmp_path):
    configure_cache(monkeypatch, tmp_path)
    monkeypatch.setattr(
        tts,
        "openai_tts_synthesize",
        lambda *args, **kwargs: (b"canonical-header-audio", "mp3"),
    )

    generated = tts.synthesize("Canonical header narration", "openai://nova", 1.0, "en-US")
    cached = tts.synthesize("Canonical header narration", "openai://nova", 1.0, "en-US")

    assert generated.headers["x-tts-cache"] == "MISS"
    assert cached.headers["x-tts-cache"] == "HIT"
    assert {
        generated.headers["x-tts-cache"],
        cached.headers["x-tts-cache"],
    } <= {"HIT", "MISS"}
