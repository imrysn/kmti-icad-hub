import os
import io
import logging
import threading
from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import StreamingResponse
import soundfile as sf

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

        if not os.path.exists(ONNX_PATH) or not os.path.exists(VOICES_PATH):
            logger.error(f"Kokoro model files not found on NAS. ONNX: {ONNX_PATH}, Voices: {VOICES_PATH}")
            raise HTTPException(
                status_code=404, 
                detail=f"Kokoro model files not found on NAS at {MODEL_DIR}. Please check the NAS path."
            )

        try:
            logger.info(f"Initializing Kokoro TTS from ONNX: {ONNX_PATH}...")
            import onnxruntime as ort
            opts = ort.SessionOptions()
            opts.intra_op_num_threads = 4
            opts.inter_op_num_threads = 1
            opts.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
            
            sess = ort.InferenceSession(ONNX_PATH, sess_options=opts, providers=['CPUExecutionProvider'])
            _kokoro_instance = Kokoro.from_session(sess, VOICES_PATH)
            logger.info("Kokoro TTS loaded successfully with CPU optimizations!")
            return _kokoro_instance
        except Exception as e:
            logger.exception("Failed to initialize Kokoro TTS model.")
            raise HTTPException(status_code=500, detail=f"Error initializing Kokoro TTS: {str(e)}")

@router.get("/voices")
def list_voices():
    """List available premium Kokoro voices."""
    return KOKORO_VOICES

def clean_text_for_espeak(text: str) -> str:
    # Replace project terms with phonetically clear English words that espeak knows
    text = text.replace("eyekad", "eye cad")
    text = text.replace("iCAD", "eye cad")
    text = text.replace("ICAD", "eye cad")
    # Strip non-breaking spaces or weird formatting
    text = text.replace("\xa0", " ")
    return text

@router.get("/synthesize")
def synthesize(
    text: str = Query(..., description="Text to convert to speech"),
    voice: str = Query("af_sarah", description="Voice ID to use"),
    speed: float = Query(1.0, ge=0.5, le=2.0, description="Speech speed rate"),
    lang: str = Query(None, description="Language code (defaults to US English or Japanese depending on voice)")
):
    """Synthesize text to speech on-the-fly and return a WAV stream."""
    if not text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    # Strip URI prefix if passed from frontend
    if voice.startswith("kokoro://"):
        voice = voice.replace("kokoro://", "")

    # Ensure voice is valid
    valid_voices = [v["voice_code"] for v in KOKORO_VOICES]
    if voice not in valid_voices:
        logger.warning(f"Requested voice '{voice}' not in predefined list. Attempting to use default.")
        voice = "af_sarah"

    # Auto-detect language if not explicitly provided
    if lang is None:
        lang = "ja" if voice.startswith("j") else "en-us"

    # Clean text to prevent espeak / phonemizer crashes
    clean_text = clean_text_for_espeak(text)
    
    # Scale speed slightly to remove the slow-mo audiobook effect
    synthesis_speed = speed * 1.25

    try:
        kokoro = get_kokoro_model()
        try:
            samples, sample_rate = kokoro.create(
                clean_text,
                voice=voice,
                speed=synthesis_speed,
                lang=lang
            )
        except Exception as inner_err:
            logger.warning(f"Primary phonemization failed for: '{clean_text}'. Error: {inner_err}. Attempting ASCII fallback.")
            # Fallback: Strip to basic alphanumeric characters to bypass phonemizer line mismatch bugs
            fallback_text = "".join(c for c in clean_text if c.isalnum() or c.isspace() or c in ".,!?")
            samples, sample_rate = kokoro.create(
                fallback_text,
                voice=voice,
                speed=synthesis_speed,
                lang=lang
            )

        # Apply Pre-emphasis filter to reduce breathiness/whispering and boost vocal clarity
        import numpy as np
        if len(samples) > 1:
            samples = np.append(samples[0], samples[1:] - 0.85 * samples[:-1])

        # High-quality resampling from 24000Hz to 44100Hz to eliminate browser resampling hiss
        try:
            import scipy.signal
            num_target_samples = int(len(samples) * 44100 / sample_rate)
            samples = scipy.signal.resample(samples, num_target_samples)
            sample_rate = 44100
        except Exception as resample_err:
            logger.warning(f"Resampling to 44100Hz failed: {resample_err}")

        # Apply Peak Volume Normalization to prevent the quiet/whispering effect
        max_val = np.max(np.abs(samples))
        if max_val > 0:
            samples = (samples / max_val) * 0.98

        # Write samples to an in-memory buffer in WAV format
        wav_buffer = io.BytesIO()
        sf.write(wav_buffer, samples, sample_rate, format="WAV")
        wav_buffer.seek(0)

        return StreamingResponse(
            wav_buffer, 
            media_type="audio/wav",
            headers={"Content-Disposition": "inline; filename=speech.wav"}
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Error generating speech with Kokoro TTS")
        raise HTTPException(status_code=500, detail=f"Speech synthesis failed: {str(e)}")
