import os
import re

dir_path = r'i:\MG_DATA\@Recycle\App Development\kmti-icad-hub\frontend\src\components'

results = []

for root, _, files in os.walk(dir_path):
    for f in files:
        if f.endswith('.tsx') and ('3D_' in f or '2D_' in f):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            starts = [m.start() for m in re.finditer(r'className=["\'][^"\']*lesson-card[^"\']*["\']', content)]
            
            for start in starts:
                div_start = content.rfind('<div', 0, start)
                if div_start == -1:
                    continue
                
                div_count = 1
                i = content.find('>', div_start) + 1
                while i < len(content) and div_count > 0:
                    next_open = content.find('<div', i)
                    next_close = content.find('</div', i)
                    
                    if next_open != -1 and (next_close == -1 or next_open < next_close):
                        end_bracket = content.find('>', next_open)
                        if end_bracket != -1 and content[end_bracket-1] != '/':
                            div_count += 1
                        i = end_bracket + 1
                    elif next_close != -1:
                        div_count -= 1
                        i = next_close + 6
                    else:
                        break
                
                block = content[div_start:i]
                
                inner_cards = len(re.findall(r'className=["\'][^"\']*lesson-card[^"\']*["\']', block))
                if inner_cards > 1:
                    continue
                
                if 'lesson-navigation' not in block:
                    line_no = content[:div_start].count('\n') + 1
                    results.append(f"{f}:{line_no} - Missing navigation")

for r in results:
    print(r)
print(f"Total missing: {len(results)}")
