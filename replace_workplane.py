import sys

en_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/config/translations/en/3d/2d_to_3d.ts'
ja_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/config/translations/ja/3d/2d_to_3d.ts'
comp_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/components/3D_Modeling/3D_2Dto3D.tsx'

with open(en_path, 'r', encoding='utf-8') as f:
    en_code = f.read()
en_code = en_code.replace('"2dto3d.tab1": "2D > 3D",', '"2dto3d.tab1": "2D > 3D",\n  "2dto3d.workPlane": "Work Plane",')
with open(en_path, 'w', encoding='utf-8') as f:
    f.write(en_code)

with open(ja_path, 'r', encoding='utf-8') as f:
    ja_code = f.read()
ja_code = ja_code.replace('"2dto3d.tab1": "2D > 3D",', '"2dto3d.tab1": "2D > 3D",\n  "2dto3d.workPlane": "作業平面",')
with open(ja_path, 'w', encoding='utf-8') as f:
    f.write(ja_code)

with open(comp_path, 'r', encoding='utf-8') as f:
    comp_code = f.read()
comp_code = comp_code.replace('label: "Work Plane"', 'label: t(\'2dto3d.workPlane\')')
with open(comp_path, 'w', encoding='utf-8') as f:
    f.write(comp_code)

print("Done")
