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

# Common user playback rates (speeds) scaled by 1.25
SPEEDS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0]

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

def get_hashes_for_text(text: str) -> set:
    hashes = set()
    sentences = split_into_sentences(text)
    for sentence in sentences:
        normalized = normalize_speech_text(sentence)
        if not normalized:
            continue
        
        # Strip/clean like the backend does
        clean_txt = clean_text_for_espeak(normalized)
        
        # Generate hash for each voice and speed
        for voice in KOKORO_VOICES:
            lang = "ja" if voice.startswith("j") else "en-us"
            for speed in SPEEDS:
                synthesis_speed = speed * 1.25
                cache_string = f"{clean_txt}_{voice}_{synthesis_speed}_{lang}"
                cache_key = hashlib.sha256(cache_string.encode('utf-8')).hexdigest()
                hashes.add(f"{cache_key}.wav")
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

def clean_cache(dry_run=True):
    print("====================================================")
    print("      KMTI iCAD Hub - TTS Cache Cleanup Tool")
    print("====================================================")
    
    # 1. Determine Cache Directory
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    cache_dir = os.path.join(base_path, "tts_cache")
    if not os.path.exists(cache_dir):
        print(f"Cache directory not found at: {cache_dir}")
        return

    print(f"Scanning cache directory: {cache_dir}")
    cached_files = [f for f in os.listdir(cache_dir) if f.endswith(".wav")]
    print(f"Found {len(cached_files)} cached WAV files.")
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
        valid_hashes.update(get_hashes_for_text(text))
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
    dry_run = True
    if len(sys.argv) > 1 and sys.argv[1] == "--force":
        dry_run = False
    clean_cache(dry_run=dry_run)
