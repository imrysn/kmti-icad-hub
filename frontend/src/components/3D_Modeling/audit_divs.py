import re

file_path = r'g:\APP DEVELOPMENT\kmti-icad-hub\kmti-icad-hub\frontend\src\components\3D_Modeling\3D_Standard.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

stack = []
for i, line in enumerate(lines):
    tokens = re.findall(r'<div|</div', line)
    for token in tokens:
        if token == '<div':
            stack.append(i + 1)
        else:
            if stack:
                opened_at = stack.pop()
                if opened_at == 213:
                    print(f"L{i+1}: Popped 213")
                if opened_at == 212:
                    print(f"L{i+1}: Popped 212")
            else:
                print(f"L{i+1}: Extra closing tag!")

if stack:
    print(f"Unclosed tags at lines: {stack}")
else:
    print("All divs balanced.")
