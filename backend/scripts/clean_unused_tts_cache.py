import os
import sys
import re
import hashlib

# Add the parent directory to sys.path to allow imports from backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal
from models import LessonContent

# Voices configuration matching routers/tts.py
KOKORO_VOICES = [
    "af_sarah", "af_bella", "af_nicole", "af_sky", "am_adam", "am_michael",
    "bf_emma", "bf_isabella", "bm_george", "bm_lewis", "jf_alpha", "jf_glowing",
    "jf_teatime", "jm_kiko"
]

# Current UI playback rates. Runtime sends these values unchanged.
SPEEDS = [0.8, 0.9, 1.0, 1.2, 1.5]
OPENAI_TTS_MODEL = os.getenv("OPENAI_TTS_MODEL", "tts-1").strip()
OPENAI_TTS_RESPONSE_FORMAT = os.getenv("OPENAI_TTS_RESPONSE_FORMAT", "mp3").strip().lower()
OPENAI_TTS_VOICE = "nova"
TTS_CACHE_PROFILE_VERSION = os.getenv("TTS_CACHE_PROFILE_VERSION", "foundations-v2").strip() or "foundations-v2"

def normalize_cache_text(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "").replace("\xa0", " ")).strip()

def build_cache_key(provider: str, model: str, voice: str, text: str, speed: float, lang: str, response_format: str, version: str = TTS_CACHE_PROFILE_VERSION) -> str:
    cache_string = f"{version}_{provider}_{model}_{voice}_{normalize_cache_text(text)}_{speed}_{lang}_{response_format}"
    return hashlib.sha256(cache_string.encode("utf-8")).hexdigest()

def build_legacy_cache_key(provider: str, model: str, voice: str, text: str, speed: float, lang: str, response_format: str) -> str:
    cache_string = f"{provider}_{model}_{voice}_{normalize_cache_text(text)}_{speed}_{lang}_{response_format}"
    return hashlib.sha256(cache_string.encode("utf-8")).hexdigest()

def is_japanese_text(text: str) -> bool:
    return bool(re.search(r"[\u3040-\u30ff\u3400-\u9fff\u3000-\u303f]", text))

def clean_text_for_espeak(text: str) -> str:
    text = text.replace("eyekad", "eye cad")
    text = text.replace("iCAD", "eye cad")
    text = text.replace("ICAD", "eye cad")
    text = text.replace("\xa0", " ")
    return text

def normalize_speech_text(text: str) -> str:
    if not text:
        return ''
    # Remove HTML
    text = re.sub(r'<[^>]*>?', '', text)
    # Remove Step prefixes
    text = re.sub(r'^Step\s+\d+[:.]?\s*', '', text, flags=re.IGNORECASE)
    # iCAD pronunciation
    text = re.sub(r'i\s*CAD', 'eyekad', text, flags=re.IGNORECASE)
    # Replace >
    text = text.replace('>', ' then ')
    # Clean spacing
    text = text.replace('&nbsp;', ' ')
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def split_into_sentences(text: str) -> list:
    if not text:
        return []
    clean_text = re.sub(r'<[^>]*>?', '', text)
    # Split on sentence ending punctuation followed by space or end
    sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z0-9])|(?<=[.!?])\s*$', clean_text)
    return [s.strip() for s in sentences if s.strip()]

def get_hashes_for_text(text: str, include_legacy: bool = True) -> set:
    hashes = set()
    sentences = split_into_sentences(text)
    for sentence in sentences:
        normalized = normalize_speech_text(sentence)
        if not normalized:
            continue
        
        # Strip/clean like the backend does
        clean_txt = clean_text_for_espeak(normalized)
        
        # Generate the OpenAI Nova keys used by current Foundations lessons.
        openai_lang = "ja-jp" if is_japanese_text(clean_txt) else "en-us"
        for speed in SPEEDS:
            cache_key = build_cache_key(
                "openai",
                OPENAI_TTS_MODEL,
                OPENAI_TTS_VOICE,
                clean_txt,
                speed,
                openai_lang,
                OPENAI_TTS_RESPONSE_FORMAT,
            )
            hashes.add(f"{cache_key}.{OPENAI_TTS_RESPONSE_FORMAT}")
            if include_legacy:
                legacy_key = build_legacy_cache_key(
                    "openai", OPENAI_TTS_MODEL, OPENAI_TTS_VOICE, clean_txt,
                    speed, openai_lang, OPENAI_TTS_RESPONSE_FORMAT,
                )
                hashes.add(f"{legacy_key}.{OPENAI_TTS_RESPONSE_FORMAT}")

        # Preserve valid fallback files using the runtime Kokoro key format.
        for voice in KOKORO_VOICES:
            lang = "ja" if voice.startswith("j") else "en-us"
            for speed in SPEEDS:
                cache_key = build_cache_key(
                    "kokoro",
                    "kokoro-v1.0.onnx",
                    voice,
                    clean_txt,
                    speed,
                    lang,
                    "wav",
                )
                hashes.add(f"{cache_key}.wav")
                if include_legacy:
                    legacy_key = build_legacy_cache_key(
                        "kokoro", "kokoro-v1.0.onnx", voice, clean_txt,
                        speed, lang, "wav",
                    )
                    hashes.add(f"{legacy_key}.wav")
    return hashes

def extract_strings_from_file(file_path: str) -> list:
    texts = []
    try:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except UnicodeDecodeError:
            with open(file_path, 'r', encoding='latin-1') as f:
                content = f.read()
            
        # Extract double-quoted string literals
        double_quotes = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"', content)
        texts.extend(double_quotes)
        
        # Extract single-quoted string literals
        single_quotes = re.findall(r"'([^'\\]*(?:\\.[^'\\]*)*)'", content)
        texts.extend(single_quotes)
        
        # Extract backtick template literals
        backticks = re.findall(r"`([^`\\]*(?:\\.[^`\\]*)*)`", content)
        texts.extend(backticks)
        
        # Extract text inside JSX tags (e.g. <p>Text Here</p>)
        jsx_texts = re.findall(r'>([^<>{}\r\n]+)<', content)
        texts.extend(jsx_texts)
    except Exception as e:
        print(f"Warning: Failed to read file {file_path}: {e}")
    return [t.strip() for t in texts if len(t.strip()) > 5]

def clean_cache(dry_run=True, include_legacy=True):
    print("====================================================")
    print("      KMTI iCAD Hub - TTS Cache Cleanup Tool")
    print("====================================================")
    print(f"Legacy cache policy: {'preserve' if include_legacy else 'eligible for cleanup'}")
    
    # 1. Determine Cache Directory
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    cache_dir = os.path.join(base_path, "tts_cache")
    if not os.path.exists(cache_dir):
        print(f"Cache directory not found at: {cache_dir}")
        return

    print(f"Scanning cache directory: {cache_dir}")
    cache_extensions = (".mp3", ".wav", ".ogg", ".flac", ".pcm")
    cached_files = [f for f in os.listdir(cache_dir) if f.lower().endswith(cache_extensions)]
    print(f"Found {len(cached_files)} cached audio files.")
    if not cached_files:
        print("Nothing to clean.")
        return

    # 2. Collect all active texts
    active_texts = set()

    # A. Scan Database
    print("\n[1/2] Scanning Database...")
    db = SessionLocal()
    try:
        contents = db.query(LessonContent).all()
        for c in contents:
            if c.data:
                active_texts.add(c.data)
        print(f"Fetched {len(contents)} lesson content records from DB.")
    except Exception as db_err:
        print(f"Warning: Failed to query database: {db_err}")
    finally:
        db.close()

    # B. Scan Frontend TSX/TS Files
    print("\n[2/2] Scanning Frontend TSX/TS files...")
    frontend_dir = os.path.join(os.path.dirname(base_path), "frontend", "src")
    if os.path.exists(frontend_dir):
        tsx_files_count = 0
        for root, dirs, files in os.walk(frontend_dir):
            for file in files:
                if file.endswith(('.tsx', '.ts')):
                    file_path = os.path.join(root, file)
                    extracted = extract_strings_from_file(file_path)
                    active_texts.update(extracted)
                    tsx_files_count += 1
        print(f"Scanned {tsx_files_count} TSX/TS files and extracted content.")
    else:
        print(f"Warning: Frontend directory not found at {frontend_dir}")

    # 3. Compute Valid Hashes
    print("\nComputing expected TTS cache hashes...")
    valid_hashes = set()
    for text in active_texts:
        valid_hashes.update(get_hashes_for_text(text, include_legacy=include_legacy))
    print(f"Generated {len(valid_hashes)} valid cache keys.")

    # 4. Compare and Identify Unused Files
    unused_files = []
    total_saved_bytes = 0
    for file in cached_files:
        if file not in valid_hashes:
            file_path = os.path.join(cache_dir, file)
            unused_files.append(file_path)
            total_saved_bytes += os.path.getsize(file_path)

    mb_saved = total_saved_bytes / (1024 * 1024)
    print(f"\nResult:")
    print(f"  - Active Files to keep: {len(cached_files) - len(unused_files)}")
    print(f"  - Unused Files to delete: {len(unused_files)}")
    print(f"  - Space to reclaim: {mb_saved:.2f} MB")

    if not unused_files:
        print("\nNo unused cache files found. Cache is fully optimized!")
        return

    # 5. Perform Deletion
    if dry_run:
        print("\n[DRY RUN] No files were deleted. Run with '--force' to clean up.")
    else:
        print(f"\nDeleting {len(unused_files)} files...")
        deleted_count = 0
        for path in unused_files:
            try:
                os.remove(path)
                deleted_count += 1
            except Exception as e:
                print(f"Failed to delete {path}: {e}")
        print(f"Cleanup complete. Successfully deleted {deleted_count} files.")

if __name__ == "__main__":
    arguments = set(sys.argv[1:])
    clean_cache(
        dry_run="--force" not in arguments,
        include_legacy="--drop-legacy" not in arguments,
    )
