import os
import sys

def search_files(dir_path, query, extensions):
    results = []
    query_lower = query.lower()
    for root, dirs, files in os.walk(dir_path):
        if "venv" in root or "node_modules" in root or ".git" in root or "dist" in root:
            continue
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        for line_num, line in enumerate(f, 1):
                            if query_lower in line.lower():
                                results.append((file_path, line_num, line.strip()))
                except Exception as e:
                    pass
    return results

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python search_codebase.py <query> <dir> [ext1 ext2...]")
        sys.exit(1)
    
    query = sys.argv[1]
    search_dir = sys.argv[2]
    exts = sys.argv[3:] if len(sys.argv) > 3 else ['.py', '.ts', '.tsx']
    
    print(f"Searching for '{query}' in {search_dir} with extensions {exts}...")
    matches = search_files(search_dir, query, exts)
    print(f"Found {len(matches)} matches:")
    for file_path, line_num, line in matches[:100]:
        print(f"{file_path}:{line_num}: {line}")
    if len(matches) > 100:
        print(f"... and {len(matches) - 100} more matches.")
