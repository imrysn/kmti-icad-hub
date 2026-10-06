from pathlib import Path
import json,re,struct
root=Path('frontend/src/components/iCAD_Foundations'); assets=Path('frontend/src/assets/icad-foundations/annotation')
# Import the decoder only (not the previous asset-generation side effects).
src=Path('tmp/information-icon-masks.py').read_text(); ns={};exec(src[:src.index('out=[]')],ns);read=ns['read_png']
tmp=Path('C:/Users/Cat/AppData/Local/Temp')
items=[('LinearDimension','linear-dimension','c45317ad-a7a9-40d6-91c6-3474ea20ef1a',(12,33,38,60),'長さ寸法を作成する'),('DiameterDimension','diameter-dimension','a5362c66-7926-46c4-97a7-5d9910530aca',(43,30,69,55),'径寸法を作成する'),('AngularDimension','angular-dimension',None,(7,3,32,28),'角度寸法'),('NotesLeaderLines','notes-leader-lines','2e19b2d3-f516-4d8f-b74f-d8e169d52801',(44,26,66,48),'注記を作成する'),('CharacterStrings','character-strings','bdd2be45-d246-4c6a-b726-4814c87b04dd',(8,31,32,49),'文字を作成する'),('EditCharacters','edit-characters','e721a21a-61e6-4a6d-bcd6-aaaf19e06320',(45,25,67,50),'製図文字を編集する'),('ChangeAttributes','change-attributes','43131774-160c-4c23-841a-4c4ec3900777',(74,23,98,48),'製図属性を編集する'),('ChangePosition','change-position','5be14ae0-f834-4ee2-a610-6e79ff1a376d',(3,24,28,50),'製図位置を編集する')]
out={}
for component,key,uid,rect,label in items:
 p=tmp/f'codex-clipboard-{uid}.png' if uid else assets/f'{key}-icon-ref.png'
 w,h,pixels=read(p); x0,y0,x1,y1=rect;colors={}
 for y in range(y0,y1):
  for x in range(x0,x1):
   rgb=pixels[y][x][:3]
   if min(rgb)>=210:continue
   color='#'+''.join(f'{v:02x}' for v in rgb)
   colors.setdefault(color,[]).append(f'M{x-x0} {y-y0}h1v1h-1Z')
 out[key]={'label':label,'source':p.name,'crop':list(rect),'viewBox':f'-2 -2 {x1-x0+4} {y1-y0+4}','paths':[[c,''.join(v)] for c,v in colors.items()]}
 path=root/f'{component}Artwork.tsx';s=path.read_text(encoding='utf-8')
 s=s.replace("import InterfaceIconPreview from './InterfaceIconPreview';", "import AnnotationStepPreview from './AnnotationStepPreview';\nimport AnnotationCommandIcon from './AnnotationCommandIcon';")
 a=s.index('export function');b=s.index('export default')
 reference={'edit-characters':'edit-drafting-entity-characters','change-attributes':'change-drafting-entity-attributes','change-position':'change-drafting-entity-position'}.get(key,key)
 s=s[:a]+f'export function {component}Icon({{ title }}: {{ title?: string }}) {{\n  return <AnnotationCommandIcon command="{key}" title={{title}} reference="{reference}" />;\n}}\n\n'+s[b:]
 # Centralize the shared preview to keep geometry, native sizing, and icon backgrounds consistent.
 a=s.index('  const artwork =');s=s[:a]+f'''  return <AnnotationStepPreview step={{step}} japanese={{japanese}} title={{titles[step] || titles[0]}}
    screen={{screens[step] || screens[0]}} bounds={{bounds}} command="{key}"
    icon={{<{component}Icon title={{titles[0]}} />}} />;
}}
'''
 path.write_text(s,encoding='utf-8')
(root/'annotationCommandPaths.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
sizes={p.name:list(struct.unpack('>II',p.read_bytes()[16:24])) for p in assets.glob('*.png')}
(root/'annotationScreenSizes.json').write_text(json.dumps(sizes,indent=2)+'\n')
# Only edit F25's content. Keep stable IDs and unrelated curriculum intact.
p=Path('data/foundations-curriculum.json');data=json.loads(p.read_text(encoding='utf-8'));mod=next(m for m in data['modules'] if m['id']=='F25')
for i,lesson in enumerate(mod['lessons']):
 label=items[i][4]
 if i!=2:lesson['title']['ja']=label
 for lang,c in lesson['content'].items():
  c['sections']=[s for s in c['sections'] if s['title'] not in ['Important Reminder','覚えておきましょう']]
  s=c['sections'][0];parts=re.split(r'\n\n(?=\*\*(?:Step|ステップ) \d+)',s['text'])
  parts=[part for part in parts if '— Check the Final Result**' not in part and '— 完了結果の確認**' not in part]
  head,body=parts[0].split('\n',1)
  menu='寸法' if i<3 else '製図文字' if i<5 else '製図要素編集'
  parts[0]=head+'\n'+(f'Select **{label}** from **{menu}**.' if lang=='en' else f'「{menu}」から「{label}」を選択します。')
  s['text']='\n\n'.join(parts)
  c['explanation']=c['explanation'].split('\n\n')[0]
  if i==6:
   s['text']=re.sub(r'\n\n• .*?(?=\n\n\*\*)','',s['text'],flags=re.S)
  if i==7:c['practice']='Identify the command used to reposition drafting entities.' if lang=='en' else '製図要素の位置を変更するコマンドを確認します。'
p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
