from pathlib import Path
import runpy,json,re
read_png=runpy.run_path('tmp/information-icon-masks.py')['read_png']
r=Path('frontend/src/components/iCAD_Foundations');clips=json.loads((r/'informationIconClips.json').read_text());out=[]
for index,name in enumerate(['coordinates','length','distance','angle']):
 w,h,pixels=read_png(Path('frontend/src/assets/icad-foundations/information')/(name+'-exact.png'))
 allowed=set()
 for x,y,n in re.findall(r'M(\d+) (\d+)h(\d+)v1h-\d+Z',clips[index]['path']):
  allowed.update((xx,int(y)) for xx in range(int(x),int(x)+int(n)))
 colors={}
 for y in range(h):
  x=0
  while x<w:
   if (x,y) not in allowed:x+=1;continue
   color='#'+''.join(f'{v:02x}' for v in pixels[y][x][:3]);start=x;x+=1
   while x<w and (x,y) in allowed and pixels[y][x][:3]==pixels[y][start][:3]:x+=1
   colors.setdefault(color,[]).append(f'M{start} {y}h{x-start}v1h{start-x}Z')
 assert sum(len(v) for v in colors.values())>20
 out.append({'name':name,'viewBox':clips[index]['viewBox'],'paths':[[c,''.join(paths)] for c,paths in colors.items()]})
 print(name,len(allowed),'foreground pixels',len(colors),'colors')
(r/'informationReferencePaths.json').write_text(json.dumps(out,indent=2)+'\n')
