import re, os, glob

folder = r"D:\kmti-icad-hub\kmti-icad-hub\frontend\src\components\3D_Modeling"

for filepath in glob.glob(os.path.join(folder, "3D_*.tsx")):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Remove <ProTip ...>...</ProTip> blocks (multiline, including surrounding whitespace/newlines)
    content = re.sub(r'\s*<ProTip[^>]*>[\s\S]*?</ProTip>\s*', '\n', content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned: {os.path.basename(filepath)}")
    else:
        print(f"No ProTip found: {os.path.basename(filepath)}")
