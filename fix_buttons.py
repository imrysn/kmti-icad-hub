import sys

en_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/config/translations/en/common.ts'
ja_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/config/translations/ja/common.ts'
comp_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/components/3D_Modeling/3D_2Dto3D.tsx'

with open(en_path, 'r', encoding='utf-8') as f:
    en_code = f.read()
en_code = en_code.replace('"common.next": "Next",', '"common.next": "Next",\n  "common.previous": "Previous",')
with open(en_path, 'w', encoding='utf-8') as f:
    f.write(en_code)

with open(ja_path, 'r', encoding='utf-8') as f:
    ja_code = f.read()
ja_code = ja_code.replace('"common.next": "次へ",', '"common.next": "次へ",\n  "common.previous": "前へ",')
with open(ja_path, 'w', encoding='utf-8') as f:
    f.write(ja_code)

with open(comp_path, 'r', encoding='utf-8') as f:
    comp_code = f.read()

# Fix next/prev buttons
comp_code = comp_code.replace('> Previous</button>', '>{t(\'common.previous\')}</button>')
comp_code = comp_code.replace("nextLabel || 'Next Lesson'", "nextLabel || t('common.next')")

with open(comp_path, 'w', encoding='utf-8') as f:
    f.write(comp_code)

print("Done")
