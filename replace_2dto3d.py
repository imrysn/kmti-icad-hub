import sys

file_path = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/components/3D_Modeling/3D_2Dto3D.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

replacements = {
    'const introTitle = "Extrude, Revolve, Spiral";': 'const introTitle = t(\'2dto3d.introTitle\');',
    'const introSubtitle = "These are the tools use for extruding 2D sketches to 3D Solid Entities";': 'const introSubtitle = t(\'2dto3d.introSubtitle\');',
    'const introSubtitle2 = "Most commonly used tools are the following:";': 'const introSubtitle2 = t(\'2dto3d.introSubtitle2\');',
    
    '"EXTRUDE"': 't(\'2dto3d.extrude.title\')',
    '"Creates a solid entity from a section form created on a work plane or 2D drawing, by performing vertical projection."': 't(\'2dto3d.extrude.desc\')',
    'text="EXTRUDE"': 'text={t(\'2dto3d.extrude.title\')}',
    'text="Creates a solid entity from a section form created on a work plane or 2D drawing, by performing vertical projection."': 'text={t(\'2dto3d.extrude.desc\')}',
    'text="Select Extrude from the icon menu"': 'text={t(\'2dto3d.extrude.step1\')}',
    'text="Pick the cross-section to be extruded."': 'text={t(\'2dto3d.extrude.step2\')}',
    'text="A hatch will appear to show that the sketch is an enclosed figure > GO"': 'text={t(\'2dto3d.extrude.step2hatch\')}',
    'text="Specify the height of extrusion on the item entry > Press Enter > GO"': 'text={t(\'2dto3d.extrude.step3\')}',
    'text="A dialog box will appear asking if after extrusion, the work plane will be deleted or not. Select OK to delete the work plane"': 'text={t(\'2dto3d.extrude.dialog\')}',
    'text="Note: Deleting the work plane will delete all the sketch made on the plane. Be careful, this process cannot be undone"': 'text={t(\'2dto3d.extrude.dialogNote\')}',
    'text="Select Cancel to keep the work plane together with all the 2D sketches"': 'text={t(\'2dto3d.extrude.dialogCancel\')}',

    '"REVOLVE"': 't(\'2dto3d.revolve.title\')',
    '"Creates a solid entity from a section form created on a work plane or 2D drawing, by performing rotation projection."': 't(\'2dto3d.revolve.desc\')',
    'text="REVOLVE"': 'text={t(\'2dto3d.revolve.title\')}',
    'text="Creates a solid entity from a section form created on a work plane or 2D drawing, by performing rotation projection."': 'text={t(\'2dto3d.revolve.desc\')}',
    'text="Select Revolve from the icon menu"': 'text={t(\'2dto3d.revolve.step1\')}',
    'text="Pick the cross section to be revolved > GO"': 'text={t(\'2dto3d.revolve.step2\')}',
    'text="A hatch will appear to show that the sketch is an enclosed figure"': 'text={t(\'2dto3d.revolve.step2hatch\')}',
    'text="Select the axis of rotation > GO"': 'text={t(\'2dto3d.revolve.step3\')}',
    'text="PROCESS OVERVIEW"': 'text={t(\'2dto3d.processOverview\')}',

    '"SPIRAL FORM"': 't(\'2dto3d.spiral.title\')',
    '"Creates a 3D spiral form from a section form created on a 2D sketch."': 't(\'2dto3d.spiral.desc\')',
    'text="SPIRAL FORM"': 'text={t(\'2dto3d.spiral.title\')}',
    'text="Creates a 3D spiral form from a section form created on a 2D sketch."': 'text={t(\'2dto3d.spiral.desc\')}',
    'text="First do the sketch"': 'text={t(\'2dto3d.spiral.step1\')}',
    'text="Select Spiral Form from the icon menu"': 'text={t(\'2dto3d.spiral.step2\')}',
    'text="Pick the cross section to be revolved. Hatch will appear to show that the sketch is an enclosed figure > GO"': 'text={t(\'2dto3d.spiral.step2hatch\')}',
    'text="Specify the pitch of the spiral on the item entry > Press Enter > GO"': 'text={t(\'2dto3d.spiral.step3\')}',
    'text="Note: Pitch must be greater than Thickness."': 'text={t(\'2dto3d.spiral.step3note\')}',
    'text="Select the ends of the length of the spiral along the axis of rotation then GO"': 'text={t(\'2dto3d.spiral.step4\')}',
    
    # Also adding `t` to TwoDTo3D2
    'const TwoDTo3D2: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {\n  const [activeTab, setActiveTab] = useState<"extrude" | "revolve" | "spiral">(() => {': 
    'const TwoDTo3D2: React.FC<SubLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {\n  const { t } = useTranslation();\n  const [activeTab, setActiveTab] = useState<"extrude" | "revolve" | "spiral">(() => {',

    'label: "Extrude"': 'label: t(\'2dto3d.extrude.tab\')',
    'label: "Revolve"': 'label: t(\'2dto3d.revolve.tab\')',
    'label: "Spiral"': 'label: t(\'2dto3d.spiral.tab\')',
}

for k, v in replacements.items():
    code = code.replace(k, v)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Done")
