import os

def find_file(filename, search_path):
    ignored = {"node_modules", "venv", ".git", "dist", "build"}
    for root, dirs, files in os.walk(search_path):
        # modify dirs in place to ignore them
        dirs[:] = [d for d in dirs if d not in ignored]
        if filename in files:
            print(f"Found: {os.path.abspath(os.path.join(root, filename))}")
            return True
    return False

print("Fast searching workspace...")
if not find_file("FH2A114N01.dwg", "."):
    print("Not found in workspace.")
