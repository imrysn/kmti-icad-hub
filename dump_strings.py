import re
with open(r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/components/3D_Modeling/3D_2Dto3D.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

strings = re.findall(r'"([^"\\]*)"|\'([^\'\\]*)\'|`([^`\\]*)`', text)
unique_strings = set()
for t in strings:
    s = t[0] or t[1] or t[2]
    if len(s) > 10 and ' ' in s and not s.startswith('.') and not s.startswith('/'):
        unique_strings.add(s)

print('\n'.join(unique_strings))
