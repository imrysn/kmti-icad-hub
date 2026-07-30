import os
import logging
import sys
import hashlib
import threading
import re
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
    {"id": "openai://marin", "name": "OpenAI Marin", "lang": "ja-JP", "voice_code": "marin"},
    {"id": "openai://cedar", "name": "OpenAI Cedar", "lang": "en-US", "voice_code": "cedar"},
]

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()
OPENAI_TTS_MODEL = os.getenv("OPENAI_TTS_MODEL", "gpt-4o-mini-tts").strip()
OPENAI_TTS_VOICE_EN = os.getenv("OPENAI_TTS_VOICE_EN", "cedar").strip()
OPENAI_TTS_VOICE_JA = os.getenv("OPENAI_TTS_VOICE_JA", "marin").strip()
OPENAI_TTS_RESPONSE_FORMAT = os.getenv("OPENAI_TTS_RESPONSE_FORMAT", "mp3").strip().lower()
TTS_PROVIDER = os.getenv("TTS_PROVIDER", "openai").strip().lower()

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
    """List available voices for the configured TTS provider."""
    if TTS_PROVIDER == "openai":
        return OPENAI_VOICES + KOKORO_VOICES
    return KOKORO_VOICES

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

def build_cache_key(provider: str, model: str, voice: str, text: str, speed: float, lang: str, response_format: str) -> str:
    cache_string = f"{provider}_{model}_{voice}_{text}_{speed}_{lang}_{response_format}"
    return hashlib.sha256(cache_string.encode("utf-8")).hexdigest()

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
    voice: str = Query("af_sarah", description="Voice ID to use"),
    speed: float = Query(1.0, ge=0.5, le=2.0, description="Speech speed rate"),
    lang: str = Query(None, description="Language code (defaults to US English or Japanese depending on voice)")
):
    """Synthesize text to speech on-the-fly and return a cached audio file."""
    if not text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    normalized_voice = normalize_voice_input(voice)
    provider = TTS_PROVIDER
    if normalized_voice.startswith("openai://"):
        provider = "openai"
    elif normalized_voice.startswith("kokoro://"):
        provider = "kokoro"

    synthesis_speed = speed * 1.25
    cache_lang = (lang or "").lower()
    cache_voice = normalized_voice.replace("kokoro://", "").replace("openai://", "")

    if provider == "openai":
        if not cache_lang:
            cache_lang = "ja-jp" if is_japanese_text(text) else "en-us"
        cache_format = OPENAI_TTS_RESPONSE_FORMAT if OPENAI_TTS_RESPONSE_FORMAT in {"mp3", "wav", "ogg", "flac", "pcm"} else "mp3"
        cache_key = build_cache_key(provider, OPENAI_TTS_MODEL, cache_voice, text.strip(), synthesis_speed, cache_lang, cache_format)
        cache_filename = f"{cache_key}.{cache_format}"
    else:
        if not cache_lang:
            cache_lang = "ja" if cache_voice.startswith("j") else "en-us"
        clean_text = clean_text_for_espeak(text)
        cache_key = build_cache_key(provider, "kokoro-v1.0.onnx", cache_voice, clean_text, synthesis_speed, cache_lang, "wav")
        cache_filename = f"{cache_key}.wav"

    # 1. Check read-only bundled cache first
    bundled_file_path = os.path.join(BUNDLED_CACHE_DIR, cache_filename)
    if os.path.exists(bundled_file_path):
        logger.info(f"TTS Cache Hit (Bundled): '{text[:30]}...' -> {cache_filename}")
        media_type = "audio/mpeg" if cache_filename.endswith(".mp3") else "audio/wav"
        return FileResponse(
            bundled_file_path,
            media_type=media_type,
            headers={"Content-Disposition": f"inline; filename={cache_filename}"}
        )

    # 2. Check writable local cache
    local_file_path = os.path.join(WRITABLE_CACHE_DIR, cache_filename)
    if os.path.exists(local_file_path):
        logger.info(f"TTS Cache Hit (Local): '{text[:30]}...' -> {cache_filename}")
        media_type = "audio/mpeg" if cache_filename.endswith(".mp3") else "audio/wav"
        return FileResponse(
            local_file_path,
            media_type=media_type,
            headers={"Content-Disposition": f"inline; filename={cache_filename}"}
        )

    try:
        if provider == "openai":
            try:
                audio_bytes, response_format = openai_tts_synthesize(
                    text=text.strip(),
                    voice=cache_voice,
                    speed=synthesis_speed,
                    lang=cache_lang
                )
                try:
                    with open(local_file_path, "wb") as f:
                        f.write(audio_bytes)
                    logger.info(f"OpenAI TTS cache written: {cache_filename}")
                except Exception as cache_write_err:
                    logger.warning(f"Failed to write OpenAI TTS cache file: {cache_write_err}")

                media_type = "audio/mpeg" if response_format == "mp3" else f"audio/{response_format}"
                return FileResponse(
                    local_file_path,
                    media_type=media_type,
                    headers={"Content-Disposition": f"inline; filename={cache_filename}"}
                )
            except Exception as openai_err:
                logger.exception(f"OpenAI TTS failed, falling back to Kokoro. Error: {openai_err}")
                provider = "kokoro"
                cache_voice = get_kokoro_voice_for_lang(cache_lang, cache_voice)

        clean_text = clean_text_for_espeak(text)
        samples, sample_rate = kokoro_tts_synthesize(clean_text, cache_voice, synthesis_speed, cache_lang)

        try:
            sf.write(local_file_path, samples, sample_rate, format="WAV")
            logger.info(f"Kokoro TTS cache written: {cache_filename}")
        except Exception as cache_write_err:
            logger.warning(f"Failed to write TTS cache file: {cache_write_err}")

        return FileResponse(
            local_file_path,
            media_type="audio/wav",
            headers={"Content-Disposition": f"inline; filename={cache_filename}"}
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Error generating speech")
        raise HTTPException(status_code=500, detail=f"Speech synthesis failed: {str(e)}")
