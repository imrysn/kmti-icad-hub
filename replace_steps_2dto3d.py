import sys

file_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/components/3D_Modeling/3D_2Dto3D.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

replacements = {
    # TwoDTo3D1
    '"2D to 3D",': 't(\'2dto3d.tab1\'),',
    '"3D modeling can be done by sketching on 2D sketch using a plane on the 3D Dimension. To create 2D plane on the 3D Dimension, use Open Work Plane from the toolbar.",': 't(\'2dto3d.intro\'),',
    '"Use to rotate the work plane to X-Y Plane, X-Z Plane or Y-Z Plane."': 't(\'2dto3d.rotate\')',
    
    '"COMMAND MENU",': 't(\'2dto3d.commandMenu.title\'),',
    '"Most tools use for sketching on the work plane can be found on the command menu."': 't(\'2dto3d.commandMenu.desc\')',

    # TwoDTo3D2
    '"Step 1: Select Extrude from the icon menu.",': 't(\'2dto3d.extrude.step1\'),',
    '"Step 2: Pick the cross-section to be extruded. A hatch will appear to show that the sketch is an enclosed figure > GO",': 't(\'2dto3d.extrude.step2\') + " " + t(\'2dto3d.extrude.step2hatch\'),',
    '"Step 3: Specify the height of extrusion on the item entry then Press Enter then GO",': 't(\'2dto3d.extrude.step3\'),',
    '"A dialog box will appear asking if after extrusion, the work plane will be deleted or not. Select OK to delete the work plane. ",': 't(\'2dto3d.extrude.dialog\'),',
    '"Note: Deleting the work plane will delete all the sketch made on the plane. Be careful, this process cannot be undone.",': 't(\'2dto3d.extrude.dialogNote\'),',
    '"Select Cancel to keep the work plane together with all the 2D sketches.",': 't(\'2dto3d.extrude.dialogCancel\'),',
    '"RESULT"': 't(\'lesson.result\')',
    
    '"Step 1: Select Revolve from the icon menu.",': 't(\'2dto3d.revolve.step1\'),',
    '"Step 2: Pick the cross section to be revolved then GO. A hatch will appear to show that the sketch is an enclosed figure",': 't(\'2dto3d.revolve.step2\') + " " + t(\'2dto3d.revolve.step2hatch\'),',
    '"Step 3: Select the axis of rotation then GO",': 't(\'2dto3d.revolve.step3\'),',
    '"PROCESS OVERVIEW"': 't(\'2dto3d.processOverview\')',

    '"Step 1: First do the sketch",': 't(\'2dto3d.spiral.step1\'),',
    '"Step 2: Select Spiral Form from the icon menu. Pick the cross section to be revolved. Hatch will appear to show that the sketch is an enclosed figure then GO",': 't(\'2dto3d.spiral.step2\') + " " + t(\'2dto3d.spiral.step2hatch\'),',
    '"Step 3: Specify the pitch of the spiral on the item entry then Press Enter then GO. Note: Pitch must be greater than Thickness",': 't(\'2dto3d.spiral.step3\') + " " + t(\'2dto3d.spiral.step3note\'),',
    '"Step 4: Select the ends of the length of the spiral along the axis of rotation then GO",': 't(\'2dto3d.spiral.step4\'),',
}

for k, v in replacements.items():
    code = code.replace(k, v)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Done")
