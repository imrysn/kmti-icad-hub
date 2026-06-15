import os

def find_file(filename, search_path):
    for root, dirs, files in os.walk(search_path):
        if filename in files:
            print(f"Found: {os.path.join(root, filename)}")
            return True
    return False

print("Searching workspace...")
if not find_file("FH2A114N01.dwg", "."):
    print("Not found in workspace.")
