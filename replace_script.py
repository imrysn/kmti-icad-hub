import sys

file_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/components/3D_Modeling/3D_Component.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

replacements = {
    'text="MOVE COMPONENT"': 'text={t(\'basicOp2.move.title\')}',
    'text="COPY COMPONENT"': 'text={t(\'basicOp2.copy.title\')}',
    'text="MIRROR COMPONENT"': 'text={t(\'basicOp2.mirror.title\')}',
    'text="ROTATE COMPONENT"': 'text={t(\'basicOp2.rotate.title\')}',
    'text="REPEAT COPY COMPONENT"': 'text={t(\'component.repeat.title\')}',
    'text="ROTATE COPY COMPONENT"': 'text={t(\'basicOp2.rotateCopy.title\')}',
    'text="MIRROR COPY COMPONENT"': 'text={t(\'basicOp2.mirrorCopy.title\')}',
    'text="DELETE COMPONENT"': 'text={t(\'basicOp2.delete.title\')}',
    'text="RESULT"': 'text={t(\'lesson.result\')}',
    'text="PROCESS OVERVIEW"': 'text={t(\'lesson.process_overview\')}',
    'text="Select Move Component from the icon menu"': 'text={t(\'basicOp2.move.step1\')}',
    'text="Select the component to move &gt; GO"': 'text={t(\'basicOp2.move.step2\')}',
    'text="Specify the movement distance on the X,Y and Z-axis on the item entry. Press Enter"': 'text={t(\'basicOp2.move.step3\')}',
    'text="Select Copy Component from the icon menu"': 'text={t(\'basicOp2.copy.step1\')}',
    'text="Select the component to copy &gt; GO"': 'text={t(\'basicOp2.copy.step2\')}',
    'text="Specify the distance on the X,Y and Z-axis and the number of copies needed &gt; Press Enter"': 'text={t(\'basicOp2.copy.step3\')}',
    'text="Use to move/relocate a component by mirror movement"': 'text={t(\'basicOp2.mirror.desc\')}',
    'text="Select Mirror Component from the icon menu"': 'text={t(\'basicOp2.mirror.step1\')}',
    'text="Select the components to be mirror &gt; GO"': 'text={t(\'basicOp2.mirror.step2\')}',
    'text="Select 3-points to set the plane where the entity will be mirrored or left-click on the face where the entity will be mirrored"': 'text={t(\'basicOp2.mirror.step3\')}',
    'text="Use to move/relocate a component by rotating on an axis"': 'text={t(\'basicOp2.rotate.desc\')}',
    'text="Select Rotate Component from the icon menu"': 'text={t(\'basicOp2.rotate.step1\')}',
    'text="Select the component to rotate &gt; GO"': 'text={t(\'basicOp2.rotate.step2\')}',
    'text="Select 2 points to set the axis of rotation"': 'text={t(\'basicOp2.rotate.step3\')}',
    'text="Specify the desired angle of rotation on the item entry then press Enter"': 'text={t(\'basicOp2.rotate.step4\')}',
    'text="Use for continuous duplication of component"': 'text={t(\'component.repeat.desc\')}',
    'text="Use to create a duplicate of a component by rotating on an axis."': 'text={t(\'basicOp2.rotateCopy.desc\')}',
    'text="Select the component to be rotated &gt; GO"': 'text={t(\'basicOp2.rotateCopy.step2\')}',
    'text="Use to create a duplicate of a component by mirror movement"': 'text={t(\'basicOp2.mirrorCopy.desc\')}',
    'text="Same procedure with Mirror Component."': 'text={t(\'basicOp2.mirrorCopy.step1\')}',
    'text="Select Delete Component from the icon menu"': 'text={t(\'basicOp2.delete.step1\')}',
    'text="Select components to be deleted"': 'text={t(\'basicOp2.delete.step2\')}'
}

for k, v in replacements.items():
    code = code.replace(k, v)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)
print('Done!')
