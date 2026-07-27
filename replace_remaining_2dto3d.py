import sys

file_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/components/3D_Modeling/3D_2Dto3D.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

replacements = {
    'text="A hatch will appear to show that the sketch is an enclosed figure &gt; GO"': 'text={t(\'2dto3d.extrude.step2hatch\')}',
    'text="Specify the height of extrusion on the item entry &gt; Press Enter &gt; GO"': 'text={t(\'2dto3d.extrude.step3\')}',
    'text="Pick the cross section to be revolved &gt; GO"': 'text={t(\'2dto3d.revolve.step2\')}',
    'text="Select the axis of rotation &gt; GO"': 'text={t(\'2dto3d.revolve.step3\')}',
    'text="Pick the cross section to be revolved. Hatch will appear to show that the sketch is an enclosed figure &gt; GO"': 'text={t(\'2dto3d.spiral.step2hatch\')}',
    'text="Specify the pitch of the spiral on the item entry &gt; Press Enter &gt; GO"': 'text={t(\'2dto3d.spiral.step3\')}',
    'text="RESULT"': 'text={t(\'lesson.result\')}',
    'text={introTitle}': 'text={t(\'2dto3d.introTitle\')}',
    'text={introSubtitle}': 'text={t(\'2dto3d.introSubtitle\')}',
    'text={introSubtitle2}': 'text={t(\'2dto3d.introSubtitle2\')}',
}

for k, v in replacements.items():
    code = code.replace(k, v)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Done")
