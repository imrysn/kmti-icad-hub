import os
import logging
import sys
import hashlib
import threading
import re
import tempfile
from contextlib import contextmanager
from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import FileResponse
import httpx
import soundfile as sf

def get_base_path():
    if getattr(sys, 'frozen', False):
        return os.path.dirname(sys.executable)
    # This file is in backend/routers/tts.py, so parent of parent of parent is base path
    return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

BASE_PATH = get_base_path()

# Determine writable and read-only cache directories
if getattr(sys, 'frozen', False):
    # Writable cache next to the executable
    WRITABLE_CACHE_DIR = os.path.join(BASE_PATH, "tts_cache")
    # Read-only bundled cache inside PyInstaller _MEIPASS
    BUNDLED_CACHE_DIR = os.path.join(getattr(sys, '_MEIPASS', BASE_PATH), "backend", "tts_cache")
else:
    WRITABLE_CACHE_DIR = os.path.join(BASE_PATH, "backend", "tts_cache")
    BUNDLED_CACHE_DIR = WRITABLE_CACHE_DIR

# Ensure writable cache directory exists
try:
    os.makedirs(WRITABLE_CACHE_DIR, exist_ok=True)
except Exception as e:
    logging.warning(f"Could not create writable cache directory: {e}")


# Explicitly load and configure espeak-ng on Windows
try:
    import espeakng_loader
    os.environ["PHONEMIZER_ESPEAK_LIBRARY"] = espeakng_loader.get_library_path()
    os.environ["ESPEAK_DATA_PATH"] = espeakng_loader.get_data_path()
    if hasattr(espeakng_loader, "make_library_available"):
        espeakng_loader.make_library_available()
    logging.info(f"espeakng-loader configured successfully. Lib: {os.environ['PHONEMIZER_ESPEAK_LIBRARY']}")
except Exception as e:
    logging.warning(f"Could not load espeakng-loader: {e}")

# Try importing kokoro-onnx
try:
    from kokoro_onnx import Kokoro
except ImportError:
    Kokoro = None

router = APIRouter(prefix="/tts", tags=["TTS"])
logger = logging.getLogger(__name__)

# Constants
MODEL_DIR = r"\\KMTI-NAS\Shared\data\models\tts"
ONNX_PATH = os.path.join(MODEL_DIR, "kokoro-v1.0.onnx")
VOICES_PATH = os.path.join(MODEL_DIR, "voices-v1.0.bin")

# Global instances and lock for lazy initialization
_kokoro_instance = None
_kokoro_lock = threading.Lock()
_cache_locks_guard = threading.Lock()
_cache_locks: dict[str, threading.Lock] = {}
_cache_lock_users: dict[str, int] = {}

KOKORO_VOICES = [
    {"id": "kokoro://af_sarah", "name": "Kokoro Sarah (US Female - Premium)", "lang": "en-US", "voice_code": "af_sarah"},
    {"id": "kokoro://af_bella", "name": "Kokoro Bella (US Female - Premium)", "lang": "en-US", "voice_code": "af_bella"},
    {"id": "kokoro://af_nicole", "name": "Kokoro Nicole (US Female - Premium)", "lang": "en-US", "voice_code": "af_nicole"},
    {"id": "kokoro://af_sky", "name": "Kokoro Sky (US Female - Premium)", "lang": "en-US", "voice_code": "af_sky"},
    {"id": "kokoro://am_adam", "name": "Kokoro Adam (US Male - Premium)", "lang": "en-US", "voice_code": "am_adam"},
    {"id": "kokoro://am_michael", "name": "Kokoro Michael (US Male - Premium)", "lang": "en-US", "voice_code": "am_michael"},
    {"id": "kokoro://bf_emma", "name": "Kokoro Emma (UK Female - Premium)", "lang": "en-GB", "voice_code": "bf_emma"},
    {"id": "kokoro://bf_isabella", "name": "Kokoro Isabella (UK Female - Premium)", "lang": "en-GB", "voice_code": "bf_isabella"},
    {"id": "kokoro://bm_george", "name": "Kokoro George (UK Male - Premium)", "lang": "en-GB", "voice_code": "bm_george"},
    {"id": "kokoro://bm_lewis", "name": "Kokoro Lewis (UK Male - Premium)", "lang": "en-GB", "voice_code": "bm_lewis"},
    {"id": "kokoro://jf_alpha", "name": "Kokoro Alpha (JP Female - Premium)", "lang": "ja-JP", "voice_code": "jf_alpha"},
    {"id": "kokoro://jf_glowing", "name": "Kokoro Glowing (JP Female - Premium)", "lang": "ja-JP", "voice_code": "jf_glowing"},
    {"id": "kokoro://jf_teatime", "name": "Kokoro Teatime (JP Female - Premium)", "lang": "ja-JP", "voice_code": "jf_teatime"},
    {"id": "kokoro://jm_kiko", "name": "Kokoro Kiko (JP Male - Premium)", "lang": "ja-JP", "voice_code": "jm_kiko"}
]

OPENAI_VOICES = [
    {"id": "openai://alloy", "name": "OpenAI Alloy (Neutral)", "lang": "en-US", "voice_code": "alloy"},
    {"id": "openai://echo", "name": "OpenAI Echo (Male)", "lang": "en-US", "voice_code": "echo"},
    {"id": "openai://fable", "name": "OpenAI Fable (Male)", "lang": "en-US", "voice_code": "fable"},
    {"id": "openai://onyx", "name": "OpenAI Onyx (Male)", "lang": "en-US", "voice_code": "onyx"},
    {"id": "openai://nova", "name": "OpenAI Nova (Female)", "lang": "en-US", "voice_code": "nova"},
    {"id": "openai://shimmer", "name": "OpenAI Shimmer (Female)", "lang": "en-US", "voice_code": "shimmer"}
]

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()
OPENAI_TTS_MODEL = os.getenv("OPENAI_TTS_MODEL", "tts-1").strip()
OPENAI_TTS_VOICE_EN = os.getenv("OPENAI_TTS_VOICE_EN", "nova").strip()
OPENAI_TTS_VOICE_JA = os.getenv("OPENAI_TTS_VOICE_JA", "nova").strip()
OPENAI_TTS_RESPONSE_FORMAT = os.getenv("OPENAI_TTS_RESPONSE_FORMAT", "mp3").strip().lower()
TTS_PROVIDER = os.getenv("TTS_PROVIDER", "openai").strip().lower()
TTS_CACHE_PROFILE_VERSION = os.getenv("TTS_CACHE_PROFILE_VERSION", "foundations-v2").strip() or "foundations-v2"

def positive_int_env(name: str, default: int) -> int:
    try:
        return max(1, int(os.getenv(name, str(default))))
    except (TypeError, ValueError):
        logger.warning(f"Invalid {name}; using {default}.")
        return default

TTS_CACHE_MAX_MB = positive_int_env("TTS_CACHE_MAX_MB", 1024)
TTS_CACHE_MAX_BYTES = TTS_CACHE_MAX_MB * 1024 * 1024

def get_kokoro_model():
    global _kokoro_instance
    if Kokoro is None:
        raise HTTPException(status_code=500, detail="kokoro-onnx package is not installed on the server.")

    if _kokoro_instance is not None:
        return _kokoro_instance

    with _kokoro_lock:
        # Double-check locking pattern
        if _kokoro_instance is not None:
            return _kokoro_instance

        # 1. Try env variable
        model_dir = os.getenv("TTS_MODEL_DIR")

        # 2. Try default NAS path
        if not model_dir:
            model_dir = r"\\KMTI-NAS\Shared\data\models\tts"

        onnx_path = os.path.join(model_dir, "kokoro-v1.0.onnx")
        voices_path = os.path.join(model_dir, "voices-v1.0.bin")

        # 3. Try local fallback if not found
        if not os.path.exists(onnx_path) or not os.path.exists(voices_path):
            local_fallback = os.path.join(BASE_PATH, "backend", "models", "tts")
            local_onnx = os.path.join(local_fallback, "kokoro-v1.0.onnx")
            local_voices = os.path.join(local_fallback, "voices-v1.0.bin")
            if os.path.exists(local_onnx) and os.path.exists(local_voices):
                model_dir = local_fallback
                onnx_path = local_onnx
                voices_path = local_voices
            else:
                logger.error(f"Kokoro model files not found. Checked NAS: {onnx_path} and Local Fallback: {local_onnx}")
                raise HTTPException(
                    status_code=404,
                    detail=f"Kokoro model files not found. Please connect to KMTI-NAS or place the model files (kokoro-v1.0.onnx and voices-v1.0.bin) in '{local_fallback}'."
                )

        try:
            logger.info(f"Initializing Kokoro TTS from: {onnx_path}...")
            import onnxruntime as ort
            opts = ort.SessionOptions()
            opts.intra_op_num_threads = 4
            opts.inter_op_num_threads = 1
            opts.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL

            sess = ort.InferenceSession(onnx_path, sess_options=opts, providers=['CPUExecutionProvider'])

            # Fix kokoro-onnx package bug where from_session calls get_voice_names()
            # which does not exist in KoKoroConfig for this version.
            try:
                _kokoro_instance = Kokoro.from_session(sess, voices_path)
            except AttributeError as ae:
                if "get_voice_names" in str(ae):
                    logger.info("Applying custom instantiation fallback for Kokoro TTS...")
                    import numpy as np
                    from kokoro_onnx.config import KoKoroConfig
                    from kokoro_onnx.tokenizer import Tokenizer

                    instance = Kokoro.__new__(Kokoro)
                    instance.sess = sess
                    instance.config = KoKoroConfig(sess._model_path, voices_path, None)
                    instance.config.validate()
                    instance.voices = np.load(voices_path)
                    instance.tokenizer = Tokenizer(None)
                    _kokoro_instance = instance
                else:
                    raise ae

            logger.info("Kokoro TTS loaded successfully with CPU optimizations!")
            return _kokoro_instance
        except Exception as e:
            logger.exception("Failed to initialize Kokoro TTS model.")
            raise HTTPException(status_code=500, detail=f"Error initializing Kokoro TTS: {str(e)}")

@router.get("/voices")
def list_voices():
    """Expose the single approved narration voice in TTS settings."""
    return [voice for voice in OPENAI_VOICES if voice["voice_code"] == "nova"]

def clean_text_for_espeak(text: str) -> str:
    # Replace project terms with phonetically clear English words that espeak knows
    text = text.replace("eyekad", "eye cad")
    text = text.replace("iCAD", "eye cad")
    text = text.replace("ICAD", "eye cad")
    # Strip non-breaking spaces or weird formatting
    text = text.replace("\xa0", " ")
    return text

def is_japanese_text(text: str) -> bool:
    return bool(re.search(r"[\u3040-\u30ff\u3400-\u9fff\u3000-\u303f]", text))

def normalize_voice_input(voice: str) -> str:
    voice = (voice or "").strip()
    if voice.startswith("kokoro://") or voice.startswith("openai://"):
        return voice
    return f"kokoro://{voice}"

def get_openai_voice_for_lang(lang: str, requested_voice: str = "") -> str:
    requested_voice = (requested_voice or "").strip()
    if requested_voice.startswith("openai://"):
        return requested_voice.replace("openai://", "")
    if requested_voice in {v["voice_code"] for v in OPENAI_VOICES}:
        return requested_voice

    lang = (lang or "").lower()
    if lang.startswith("ja"):
        return OPENAI_TTS_VOICE_JA
    return OPENAI_TTS_VOICE_EN

def get_kokoro_voice_for_lang(lang: str, requested_voice: str = "") -> str:
    requested_voice = (requested_voice or "").strip()
    kokoro_voices = {v["voice_code"] for v in KOKORO_VOICES}
    if requested_voice in kokoro_voices:
        return requested_voice

    lang = (lang or "").lower()
    if lang.startswith("ja"):
        return "jf_teatime"
    return "af_sarah"

def normalize_cache_text(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "").replace("\xa0", " ")).strip()

def build_cache_key(provider: str, model: str, voice: str, text: str, speed: float, lang: str, response_format: str, version: str = TTS_CACHE_PROFILE_VERSION) -> str:
    normalized_text = normalize_cache_text(text)
    cache_string = f"{version}_{provider}_{model}_{voice}_{normalized_text}_{speed}_{lang}_{response_format}"
    return hashlib.sha256(cache_string.encode("utf-8")).hexdigest()

def build_legacy_cache_key(provider: str, model: str, voice: str, text: str, speed: float, lang: str, response_format: str) -> str:
    normalized_text = normalize_cache_text(text)
    cache_string = f"{provider}_{model}_{voice}_{normalized_text}_{speed}_{lang}_{response_format}"
    return hashlib.sha256(cache_string.encode("utf-8")).hexdigest()

@contextmanager
def cache_generation_lock(cache_key: str):
    """Serialize one cache key and discard the lock after its last user exits."""
    with _cache_locks_guard:
        cache_lock = _cache_locks.setdefault(cache_key, threading.Lock())
        _cache_lock_users[cache_key] = _cache_lock_users.get(cache_key, 0) + 1
    cache_lock.acquire()
    try:
        yield
    finally:
        cache_lock.release()
        with _cache_locks_guard:
            remaining_users = _cache_lock_users[cache_key] - 1
            if remaining_users == 0:
                _cache_lock_users.pop(cache_key, None)
                _cache_locks.pop(cache_key, None)
            else:
                _cache_lock_users[cache_key] = remaining_users

def media_type_for_format(response_format: str) -> str:
    return {
        "mp3": "audio/mpeg",
        "wav": "audio/wav",
        "ogg": "audio/ogg",
        "flac": "audio/flac",
        "pcm": "audio/L16",
    }.get(response_format.lower(), f"audio/{response_format.lower()}")

def cache_file_response(file_path: str, cache_status: str, cache_location: str) -> FileResponse:
    filename = os.path.basename(file_path)
    response_format = filename.rsplit(".", 1)[-1]
    try:
        if cache_location.startswith("LOCAL"):
            os.utime(file_path, None)
    except OSError:
        pass
    canonical_cache_status = "MISS" if cache_status.startswith("MISS") else "HIT"
    return FileResponse(
        file_path,
        media_type=media_type_for_format(response_format),
        headers={
            "Content-Disposition": f"inline; filename={filename}",
            "Cache-Control": "private, max-age=31536000, immutable",
            "ETag": f'"{filename}"',
            "X-TTS-Cache": canonical_cache_status,
            "X-TTS-Cache-Detail": cache_status,
            "X-TTS-Cache-Location": cache_location,
            "X-TTS-Cache-Profile": TTS_CACHE_PROFILE_VERSION,
        },
    )

def atomic_write_bytes(file_path: str, audio_bytes: bytes) -> None:
    fd, temp_path = tempfile.mkstemp(prefix="tts-", suffix=".tmp", dir=WRITABLE_CACHE_DIR)
    try:
        with os.fdopen(fd, "wb") as temp_file:
            temp_file.write(audio_bytes)
            temp_file.flush()
            os.fsync(temp_file.fileno())
        os.replace(temp_path, file_path)
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

def atomic_write_wav(file_path: str, samples, sample_rate: int) -> None:
    fd, temp_path = tempfile.mkstemp(prefix="tts-", suffix=".wav", dir=WRITABLE_CACHE_DIR)
    os.close(fd)
    try:
        sf.write(temp_path, samples, sample_rate, format="WAV")
        os.replace(temp_path, file_path)
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

def enforce_cache_size_limit(protected_path: str = "") -> None:
    try:
        files = [
            os.path.join(WRITABLE_CACHE_DIR, name)
            for name in os.listdir(WRITABLE_CACHE_DIR)
            if name.lower().endswith((".mp3", ".wav", ".ogg", ".flac", ".pcm"))
        ]
        total_size = sum(os.path.getsize(path) for path in files)
        if total_size <= TTS_CACHE_MAX_BYTES:
            return
        for path in sorted(files, key=os.path.getmtime):
            if os.path.abspath(path) == os.path.abspath(protected_path):
                continue
            try:
                size = os.path.getsize(path)
                os.remove(path)
                total_size -= size
            except OSError as cleanup_error:
                logger.warning(f"Failed to remove old TTS cache file {path}: {cleanup_error}")
            if total_size <= TTS_CACHE_MAX_BYTES:
                break
    except OSError as cache_error:
        logger.warning(f"Unable to enforce TTS cache size limit: {cache_error}")

def openai_tts_synthesize(text: str, voice: str, speed: float, lang: str) -> tuple[bytes, str]:
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=503, detail="OpenAI TTS is not configured. Missing OPENAI_API_KEY.")

    openai_voice = get_openai_voice_for_lang(lang, voice)
    response_format = OPENAI_TTS_RESPONSE_FORMAT
    if response_format not in {"mp3", "wav", "ogg", "flac", "pcm"}:
        response_format = "mp3"

    payload = {
        "model": OPENAI_TTS_MODEL,
        "voice": openai_voice,
        "input": text,
        "response_format": response_format,
        "speed": speed,
    }
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json",
    }

    with httpx.Client(timeout=90.0) as client:
        response = client.post("https://api.openai.com/v1/audio/speech", json=payload, headers=headers)
        response.raise_for_status()
        return response.content, response_format

def kokoro_tts_synthesize(text: str, voice: str, speed: float, lang: str):
    kokoro = get_kokoro_model()
    try:
        samples, sample_rate = kokoro.create(
            text,
            voice=voice,
            speed=speed,
            lang=lang
        )
    except Exception as inner_err:
        logger.warning(f"Primary phonemization failed for: '{text}'. Error: {inner_err}. Attempting ASCII fallback.")
        fallback_text = "".join(c for c in text if c.isalnum() or c.isspace() or c in ".,!?")
        samples, sample_rate = kokoro.create(
            fallback_text,
            voice=voice,
            speed=speed,
            lang=lang
        )

    import numpy as np
    if len(samples) > 1:
        samples = np.append(samples[0], samples[1:] - 0.85 * samples[:-1])

    try:
        import scipy.signal
        num_target_samples = int(len(samples) * 44100 / sample_rate)
        samples = scipy.signal.resample(samples, num_target_samples)
        sample_rate = 44100
    except Exception as resample_err:
        logger.warning(f"Resampling to 44100Hz failed: {resample_err}")

    max_val = np.max(np.abs(samples))
    if max_val > 0:
        samples = (samples / max_val) * 0.98

    return samples, sample_rate

@router.get("/synthesize")
def synthesize(
    text: str = Query(..., description="Text to convert to speech"),
    voice: str = Query("openai://nova", description="Voice ID to use (defaults to the approved Nova profile)"),
    speed: float = Query(1.0, ge=0.5, le=2.0, description="Speech speed rate"),
    lang: str = Query(None, description="Language code (defaults to US English or Japanese depending on voice)")
):
    """Synthesize text to speech on-the-fly and return a cached audio file."""
    normalized_text = normalize_cache_text(text)
    if not normalized_text:
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    normalized_voice = normalize_voice_input(voice)
    provider = TTS_PROVIDER
    if normalized_voice.startswith("openai://"):
        provider = "openai"
    elif normalized_voice.startswith("kokoro://"):
        provider = "kokoro"

    synthesis_speed = float(speed)
    cache_lang = (lang or "").lower()
    cache_voice = normalized_voice.replace("kokoro://", "").replace("openai://", "")

    if provider == "openai":
        if not cache_lang:
            cache_lang = "ja-jp" if is_japanese_text(normalized_text) else "en-us"
        cache_format = OPENAI_TTS_RESPONSE_FORMAT if OPENAI_TTS_RESPONSE_FORMAT in {"mp3", "wav", "ogg", "flac", "pcm"} else "mp3"
        cache_key = build_cache_key(provider, OPENAI_TTS_MODEL, cache_voice, normalized_text, synthesis_speed, cache_lang, cache_format)
        legacy_cache_key = build_legacy_cache_key(provider, OPENAI_TTS_MODEL, cache_voice, normalized_text, synthesis_speed, cache_lang, cache_format)
        cache_filename = f"{cache_key}.{cache_format}"
        legacy_cache_filename = f"{legacy_cache_key}.{cache_format}"
    else:
        if not cache_lang:
            cache_lang = "ja" if cache_voice.startswith("j") else "en-us"
        clean_text = clean_text_for_espeak(normalized_text)
        cache_key = build_cache_key(provider, "kokoro-v1.0.onnx", cache_voice, clean_text, synthesis_speed, cache_lang, "wav")
        legacy_cache_key = build_legacy_cache_key(provider, "kokoro-v1.0.onnx", cache_voice, clean_text, synthesis_speed, cache_lang, "wav")
        cache_filename = f"{cache_key}.wav"
        legacy_cache_filename = f"{legacy_cache_key}.wav"

    def find_cached_response():
        candidates = (
            (os.path.join(BUNDLED_CACHE_DIR, cache_filename), "BUNDLED", "HIT"),
            (os.path.join(WRITABLE_CACHE_DIR, cache_filename), "LOCAL", "HIT"),
            (os.path.join(BUNDLED_CACHE_DIR, legacy_cache_filename), "BUNDLED-LEGACY", "HIT-LEGACY"),
            (os.path.join(WRITABLE_CACHE_DIR, legacy_cache_filename), "LOCAL-LEGACY", "HIT-LEGACY"),
        )
        for file_path, location, status in candidates:
            if os.path.exists(file_path):
                logger.info(f"TTS Cache {status} ({location}): '{normalized_text[:30]}...' -> {os.path.basename(file_path)}")
                return cache_file_response(file_path, status, location)
        return None

    def find_openai_fallback_response():
        fallback_voice = get_kokoro_voice_for_lang(cache_lang, cache_voice)
        fallback_lang = "ja" if cache_lang.startswith("ja") else "en-us"
        fallback_text = clean_text_for_espeak(normalized_text)
        fallback_key = build_cache_key(
            "kokoro", "kokoro-v1.0.onnx", fallback_voice, fallback_text,
            synthesis_speed, fallback_lang, "wav",
        )
        legacy_fallback_key = build_legacy_cache_key(
            "kokoro", "kokoro-v1.0.onnx", fallback_voice, fallback_text,
            synthesis_speed, fallback_lang, "wav",
        )
        candidates = (
            (os.path.join(BUNDLED_CACHE_DIR, f"{fallback_key}.wav"), "BUNDLED", "HIT-FALLBACK"),
            (os.path.join(WRITABLE_CACHE_DIR, f"{fallback_key}.wav"), "LOCAL", "HIT-FALLBACK"),
            (os.path.join(BUNDLED_CACHE_DIR, f"{legacy_fallback_key}.wav"), "BUNDLED-LEGACY", "HIT-FALLBACK-LEGACY"),
            (os.path.join(WRITABLE_CACHE_DIR, f"{legacy_fallback_key}.wav"), "LOCAL-LEGACY", "HIT-FALLBACK-LEGACY"),
        )
        for file_path, location, status in candidates:
            if os.path.exists(file_path):
                logger.info(f"TTS Cache {status} ({location}): '{normalized_text[:30]}...' -> {os.path.basename(file_path)}")
                return cache_file_response(file_path, status, location)
        return None

    cached_response = find_cached_response()
    if cached_response:
        return cached_response

    with cache_generation_lock(cache_key):
        # A concurrent request may have generated the file while this request waited.
        cached_response = find_cached_response()
        if cached_response:
            cached_response.headers["X-TTS-Cache-Detail"] = "HIT-AFTER-WAIT"
            return cached_response

        # During an OpenAI outage, reuse an already generated Kokoro fallback
        # without repeatedly calling the remote provider for identical speech.
        if provider == "openai":
            fallback_response = find_openai_fallback_response()
            if fallback_response:
                return fallback_response

        try:
            if provider == "openai":
                try:
                    audio_bytes, response_format = openai_tts_synthesize(
                        text=normalized_text,
                        voice=cache_voice,
                        speed=synthesis_speed,
                        lang=cache_lang,
                    )
                    local_file_path = os.path.join(WRITABLE_CACHE_DIR, cache_filename)
                    atomic_write_bytes(local_file_path, audio_bytes)
                    enforce_cache_size_limit(local_file_path)
                    logger.info(f"OpenAI TTS cache written atomically: {cache_filename}")
                    return cache_file_response(local_file_path, "MISS", "LOCAL")
                except Exception as openai_err:
                    logger.exception(f"OpenAI TTS failed, falling back to Kokoro. Error: {openai_err}")
                    provider = "kokoro"
                    cache_voice = get_kokoro_voice_for_lang(cache_lang, cache_voice)
                    cache_lang = "ja" if cache_lang.startswith("ja") else "en-us"

            clean_text = clean_text_for_espeak(normalized_text)
            fallback_key = build_cache_key("kokoro", "kokoro-v1.0.onnx", cache_voice, clean_text, synthesis_speed, cache_lang, "wav")
            fallback_filename = f"{fallback_key}.wav"
            fallback_path = os.path.join(WRITABLE_CACHE_DIR, fallback_filename)
            if os.path.exists(fallback_path):
                return cache_file_response(fallback_path, "HIT-FALLBACK", "LOCAL")

            samples, sample_rate = kokoro_tts_synthesize(clean_text, cache_voice, synthesis_speed, cache_lang)
            atomic_write_wav(fallback_path, samples, sample_rate)
            enforce_cache_size_limit(fallback_path)
            logger.info(f"Kokoro TTS cache written atomically: {fallback_filename}")
            return cache_file_response(fallback_path, "MISS-FALLBACK", "LOCAL")
        except HTTPException:
            raise
        except Exception as error:
            logger.exception("Error generating speech")
            raise HTTPException(status_code=500, detail=f"Speech synthesis failed: {str(error)}")
