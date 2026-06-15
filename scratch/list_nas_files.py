import os
import sys

def list_files(path, depth=0, max_depth=3):
    if depth > max_depth:
        return
    try:
        if os.path.isdir(path):
            print("  " * depth + f"[DIR] {path}")
            for item in os.listdir(path):
                list_files(os.path.join(path, item), depth + 1, max_depth)
        else:
            print("  " * depth + f"[FILE] {path} ({os.path.getsize(path)} bytes)")
    except Exception as e:
        print("  " * depth + f"[ERROR] {path}: {e}")

print("Listing trainingApp folder structure:")
list_files("\\\\KMTI-NAS\\Shared\\data\\trainingApp", max_depth=2)
