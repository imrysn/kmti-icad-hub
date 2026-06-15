import os
import shutil

local_uploads = "uploads"
nas_uploads = "\\\\KMTI-NAS\\Shared\\data\\trainingApp\\uploads"

print(f"Syncing local '{local_uploads}' to NAS '{nas_uploads}'...")

if not os.path.exists(local_uploads):
    print("Local uploads folder does not exist!")
    exit(1)

# Ensure NAS uploads folder exists
os.makedirs(nas_uploads, exist_ok=True)

copied_count = 0
for root, dirs, files in os.walk(local_uploads):
    # Determine destination subfolder
    rel_path = os.path.relpath(root, local_uploads)
    dest_dir = nas_uploads if rel_path == "." else os.path.join(nas_uploads, rel_path)
    os.makedirs(dest_dir, exist_ok=True)
    
    for file in files:
        src_file = os.path.join(root, file)
        dest_file = os.path.join(dest_dir, file)
        if not os.path.exists(dest_file):
            print(f"Copying: {src_file} -> {dest_file}")
            shutil.copy2(src_file, dest_file)
            copied_count += 1

print(f"Sync complete. Copied {copied_count} files.")
