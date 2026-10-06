from pathlib import Path
import shutil,json,struct
assets=Path('frontend/src/assets/icad-foundations/annotation');tmp=Path('C:/Users/Cat/AppData/Local/Temp')
mapping={
'annotation-command-interface.png':'fd83d312-d94d-4e27-9c9a-e79e605bbd0f',
'linear-dimension-selected.png':'c13c367d-76aa-429c-bf13-de6a9ad766df',
'linear-dimension-result.png':'3e94e562-676b-48ed-a5ea-299d667b079b',
'diameter-dimension-selected.png':'10bcb3a2-84f4-42e3-bdd0-19057f853092',
'diameter-dimension-result.png':'3e001f21-874b-4b52-90cc-b6c01246a4d5',
'angular-dimension-selected.png':'64c670df-8e60-4a47-a17d-6a49af80ba6c',
'angular-dimension-result.png':'72b6c511-632b-44b8-acc4-18b8480de6fb',
'notes-leader-lines-selected.png':'f0fd399e-2566-46f2-9b3f-8486dc9a3b60',
'notes-leader-lines-entry-window.png':'8b9def5a-41c6-4b2e-bb19-81d390ee14e6',
'notes-leader-lines-entry.png':'6cde4b9a-c7ab-484b-8916-c75f583cbd7a',
'notes-leader-lines-position.png':'9e911c5d-0904-47b2-b9f2-17f9ec90e1c4',
'character-strings-selection-reference.png':'e66fafaa-486d-42f7-86ca-95ac6700179d'}
for name,uid in mapping.items():
 src=tmp/f'codex-clipboard-{uid}.png';shutil.copyfile(src,assets/name)
 print(name,struct.unpack('>II',src.read_bytes()[16:24]))
root=Path('frontend/src/components/iCAD_Foundations')
components=['LinearDimension','DiameterDimension','AngularDimension','NotesLeaderLines','CharacterStrings','EditCharacters','ChangeAttributes','ChangePosition']
for name in components:
 p=root/f'{name}Artwork.tsx';s=p.read_text(encoding='utf-8');import re
 s=re.sub(r"import command from '../../assets/icad-foundations/annotation/[^']+';","import command from '../../assets/icad-foundations/annotation/annotation-command-interface.png';",s)
 if name=='NotesLeaderLines':
  s=s.replace("import entry from", "import entryWindow from '../../assets/icad-foundations/annotation/notes-leader-lines-entry-window.png';\nimport entry from")
  s=s.replace('[command, selected, entry, entry, position]', '[command, selected, entryWindow, entry, position]')
 p.write_text(s,encoding='utf-8')
 p=root/'__tests__'/f'{name[0].lower()+name[1:]}.test.tsx';s=p.read_text(encoding='utf-8');s=re.sub(r"[a-z-]+-command-interface.png",'annotation-command-interface.png',s)
 if name=='NotesLeaderLines':s=s.replace("['position', 'notes-leader-lines-entry.png']", "['position', 'notes-leader-lines-entry-window.png']")
 p.write_text(s,encoding='utf-8')
(root/'annotationScreenSizes.json').write_text(json.dumps({p.name:list(struct.unpack('>II',p.read_bytes()[16:24])) for p in assets.glob('*.png')},indent=2)+'\n')
