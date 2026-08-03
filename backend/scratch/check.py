import os
import re

dir_path = r'i:\MG_DATA\@Recycle\App Development\kmti-icad-hub\frontend\src\components'

results = []
for root, _, files in os.walk(dir_path):
    for f in files:
        if f.endswith('.tsx'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                lines = file.readlines()
            
            for i, line in enumerate(lines):
                if 'className="lesson-navigation"' in line or "className='lesson-navigation'" in line:
                    nav_indent = len(line) - len(line.lstrip())
                    
                    # Search backwards for lesson-card
                    card_indent = -1
                    for j in range(i-1, -1, -1):
                        if 'className="lesson-card' in lines[j] or "className='lesson-card" in lines[j]:
                            card_indent = len(lines[j]) - len(lines[j].lstrip())
                            break
                    
                    if card_indent != -1 and nav_indent <= card_indent:
                        results.append(f"{f}:{i+1} - nav_indent={nav_indent}, card_indent={card_indent}")

for r in results:
    print(r)
print(f"Total found: {len(results)}")
