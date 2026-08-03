import os
import re

dir_path = r'i:\MG_DATA\@Recycle\App Development\kmti-icad-hub\frontend\src\components'

results = []
for root, _, files in os.walk(dir_path):
    for f in files:
        if f.endswith('.tsx'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Count lesson-card or lesson-card-content
            # Specifically, look for things that are the main tab content container.
            # Usually they have 'lesson-card' or 'tab-content'
            
            cards = len(re.findall(r'className=["\'][^"\']*lesson-card[^"\']*["\']', content))
            navs = len(re.findall(r'className=["\'][^"\']*lesson-navigation[^"\']*["\']', content))
            
            if cards > 0 and cards != navs:
                results.append(f"{f}: {cards} lesson-cards, {navs} lesson-navigations")

for r in results:
    print(r)
print(f"Total files with mismatch: {len(results)}")
