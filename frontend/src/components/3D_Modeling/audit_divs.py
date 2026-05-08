import re

file_path = r'g:\APP DEVELOPMENT\kmti-icad-hub\kmti-icad-hub\frontend\src\components\3D_Modeling\3D_MirroredPart.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

stack = []
for i, line in enumerate(lines):
    # Match self-closing divs, opening divs, and closing divs
    tokens = re.findall(r'<div[^>]*/>|<div|</div', line)
    for token in tokens:
        if token.endswith('/>'):
            continue  # Ignore self-closing tags
        if token == '<div':
            stack.append(i + 1)
        else:
            if stack:
                opened_at = stack.pop()
            else:
                print(f"L{i+1}: Extra closing tag!")

if stack:
    print(f"Unclosed tags at lines: {stack}")
else:
    print("All divs balanced.")
