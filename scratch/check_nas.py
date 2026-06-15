import os

nas_path = "\\\\KMTI-NAS\\Shared\\data\\trainingApp"
print(f"Checking {nas_path}...")
try:
    print(f"Exists: {os.path.exists(nas_path)}")
    print(f"Is dir: {os.path.isdir(nas_path)}")
    contents = os.listdir(nas_path)
    print(f"Contents: {contents}")
except Exception as e:
    print(f"Error: {e}")
