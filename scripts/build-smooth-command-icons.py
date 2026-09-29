"""Build smooth SVG silhouettes from the reviewed iCAD command references."""
import json, math
from pathlib import Path
target=Path('frontend/src/components/iCAD_Foundations/foundationCommandPaths.json')
data=json.loads(target.read_text(encoding='utf-8'));art={}
def p(fill,d,stroke='',width='0.65'):return [fill,d,stroke,width]
navy='#344975';edge='#477b5f'
plate=[p('#159e50','M12 9H28L23 27H8V20Z',edge),p('#25c66d','M12 8H28L23 25H8V19Z',edge),p('#55dd87','M13 9H26L24 14H11Z'),p('#35cd73','M10 18H24L22 24H9Z')]
def hole(x,y):return [p('#91e2b3',f'M{x-3} {y}a3 1.8 0 1 0 6 0a3 1.8 0 1 0-6 0',edge,'0.6'),p('#43b77c',f'M{x-3} {y}q3-1.6 6 0q-3 2.2-6 0Z')]
badge=[p('#578fc5','M30 6a4.3 4.3 0 1 1-8.6 0a4.3 4.3 0 1 1 8.6 0','#416f9f','0.7'),p('#b2d4ee','M23 4.5q2.2-2.6 5.2-.1l-.6 1q-2-1.3-4.1.4Z'),p('#fff','M25 3.3h1.5v2h2v1.5h-2v2H25v-2h-2V5.3h2Z')]
move=[p(navy,'M3 24 7.8 11.5 5.7 12.4 9.4 5.8 10.1 13 8.7 12.4 5 25Z')]
copy_arrow=[p(navy,'M9 6 4 19 2 18 2 25 7 20 5.8 20 11 7Z')]
rotate=[p(navy,'M3 12C2.8 8.2 7.1 6.3 10.8 7.6 14.4 8.9 14.5 12.8 11.3 14.8 8.9 16.3 6.5 16 4.4 14.7L2 16.3 1.5 11 6.7 11.6 4.8 13C7.1 14.9 11.4 13.4 11.3 11 11.3 8.6 6 8.5 5.7 11.5Z')]
mirror=[p('#d9e0dc','M7 8H17V15H7Z','#5f7169'),p('#fff','M8 8H12V15H8Z','#87958e','0.5'),p(navy,'M5 19C1 17 1.4 7.8 5.8 5.8L9 5V2.5L14 6.4 8.7 10V7.5C4.6 7.6 3.7 13.9 5.7 16.8Z'),p('#a4bbb1','M12 8H15V15H12Z','#5f7169','0.5')]
for name,mark in [('move',move),('copy',copy_arrow),('mirror',mirror),('rotate',rotate),('repeat-copy',copy_arrow),('rotate-copy',rotate),('mirror-copy',mirror),('delete',[])]:
 paths=list(plate)
 if name=='move':paths+=hole(12,15)
 elif name=='repeat-copy':paths+=hole(15,10)+hole(12,15)+hole(9,20)
 elif name in ['mirror','mirror-copy']:paths+=hole(9,19)
 elif name!='delete':paths+=hole(15,10)+hole(9,20)
 if name=='delete':paths+=[p('none','M8 16C4 14 2 18 3 21 4 24 8 23 9 20','#bdc8bf','1'),p('#c2ead2','M8 14C13 14 14 18 10 20L7 20Z')]
 paths+=mark
 if name in ['copy','repeat-copy','rotate-copy','mirror-copy']:paths+=badge
 art['component-'+name]=paths
art['intersect']=[p('none','M3 5 17 10V27L3 22Z','#a0a6a3','0.75'),p('none','M17 10C17 6 29 6 29 11V23C29 28 17 28 17 24Z','#929b97','0.75'),p('none','M17 10C20 14 27 14 29 10M3 17 17 12M3 22 17 17M17 24C20 20 27 20 29 23','#a0a6a3','0.65'),p('#28cf71','M14 11 20 13V23L14 25Z','#489367','0.7'),p('#58e494','M14 11 20 13V16L14 14Z'),p('none','M17 10C20 14 27 14 29 10M17 24C20 20 27 20 29 23','#8e9691','0.65')]
for key,colored in [('separateSelected',True),('separateAll',False)]:
 art[key]=[p('#27b862' if colored else '#c7cbc9','M3 19 15 13 29 19V23L17 30 3 23Z','#7a8c81','0.7'),p('#42db7a' if colored else '#f3f5f3','M3 19 15 13 29 19 17 26Z','#7a8c81','0.7'),p('#1eac57' if colored else '#d5d9d6','M17 26 29 19V23L17 30Z'),p('#e8ece9','M11 8C11 4 21 4 21 8V18C21 22 11 22 11 18Z','#87968e','0.8'),p('#bcc8c0','M18 8H21V18Q20 20 18 20Z'),p('#fafcfb','M11 8C11 4 21 4 21 8C21 12 11 12 11 8Z','#87968e','0.7')]
plane=[p('#fff','M3 25 15 20 29 25 17 30Z','#7e8589','1')]
art['sectionExtrude']=plane+[p('#436d9f','M12 24V10H8L16 2 23 10H19V25Z','#4d6785','0.65'),p('#6c91bd','M12 24V10H10L16 4V24Z'),p('#315882','M16 4 21 10H18V25L16 24Z')]
art['sectionRevolve']=plane+[p('#375f96','M5 24C6 13 9 4 17 3 23 2 27 6 28 10L31 9 27 17 21 11 24 11C23 5 16 5 13 9 9 13 8 20 8 25Z','#426485','0.55'),p('#5d83b2','M6 22C8 9 12 4 18 4 23 4 25 7 25 10L24 10C22 5 16 6 13 9 9 14 8 20 8 23Z')]
art['spiral']=[p('#617c92','M5 4 25 1Q30 1 30 5Q30 8 26 9L8 14 26 11Q30 11 30 15Q30 18 26 19L8 24 26 21Q30 21 30 25Q30 28 26 29L8 31Q2 31 2 27Q2 24 6 23L22 19 7 21Q2 21 2 17Q2 14 6 13L22 9 7 11Q2 11 2 7Q2 5 5 4Z','#4d6274','0.8'),p('#a7bdd0','M6 5 25 2Q28 2 28 5Q28 6 25 7L7 10Q4 10 4 7Q4 6 6 5Z'),p('#abc0d1','M7 15 25 12Q28 12 28 15Q28 16 25 17L7 20Q4 20 4 17Q4 16 7 15Z'),p('#abc0d1','M7 25 25 22Q28 22 28 25Q28 26 25 27L8 30Q4 30 4 27Q4 26 7 25Z')]
def gear(cx,cy,r,fill,stroke,teeth):
 points=[]
 for i in range(teeth*4):
  a=i*math.tau/(teeth*4);radius=r if i%4 in (1,2) else r*.82
  points.append((cx+math.cos(a)*radius,cy+math.sin(a)*radius))
 return p(fill,'M'+' '.join(f'{x:.2f},{y:.2f}' for x,y in points)+'Z',stroke,'0.7')
art['referenceMachinePart']=[gear(13,14,12,'#b4cce0','#566d84',14),p('#dce7ed','M4 11Q6 3 14 4Q21 4 23 11L19 10Q14 6 8 12Z'),p('#6f8da8','M8 14a5 5 0 1 0 10 0a5 5 0 1 0-10 0'),p('#e1edf1','M10 14a3 3 0 1 0 6 0a3 3 0 1 0-6 0'),gear(23,23,8,'#315879','#254962',10),p('#7fa8c6','M20 23a3 3 0 1 0 6 0a3 3 0 1 0-6 0'),p('#d7eaf3','M21 23a2 2 0 1 0 4 0a2 2 0 1 0-4 0')]
for key,paths in art.items():data[key].update(viewBox='0 0 32 32',paths=paths)
target.write_text(json.dumps(data,separators=(',',':'))+'\n',encoding='utf-8')
print('Built',len(art),'smooth command vectors')
