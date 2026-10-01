from pathlib import Path
import struct,zlib,json
# Read source PNGs and derive SVG clipping runs; source image pixels are unchanged.
def read_png(p):
 b=p.read_bytes();pos=8;raw=b''
 while pos<len(b):
  n=struct.unpack('>I',b[pos:pos+4])[0];tag=b[pos+4:pos+8];v=b[pos+8:pos+8+n];pos+=n+12
  if tag==b'IHDR':w,h,depth,kind,_,_,inter=struct.unpack('>IIBBBBB',v)
  if tag==b'IDAT':raw+=v
 assert depth==8 and kind in (2,6) and inter==0,(depth,kind,inter)
 channels=3 if kind==2 else 4;stride=w*channels;stream=zlib.decompress(raw);rows=[];prev=[0]*stride
 for y in range(h):
  f=stream[y*(stride+1)];row=list(stream[y*(stride+1)+1:(y+1)*(stride+1)])
  for i in range(stride):
   a=row[i-channels] if i>=channels else 0;c=prev[i-channels] if i>=channels else 0;bb=prev[i]
   if f==1:pred=a
   elif f==2:pred=bb
   elif f==3:pred=(a+bb)//2
   elif f==4:
    q=a+bb-c;ds=[abs(q-a),abs(q-bb),abs(q-c)];pred=[a,bb,c][ds.index(min(ds))]
   else:pred=0
   row[i]=(row[i]+pred)%256
  rows.append([row[i:i+channels] for i in range(0,stride,channels)]);prev=row
 return w,h,rows
out=[]
for name in ['coordinates','length','distance','angle']:
 w,h,pix=read_png(Path('frontend/src/assets/icad-foundations/information')/(name+'-exact.png'))
 bg=lambda x,y:min(pix[y][x][:3])>=215 and max(pix[y][x][:3])-min(pix[y][x][:3])<=18
 seen=set();todo=[(x,y) for y in range(h) for x in range(w) if x in (0,w-1) or y in (0,h-1)]
 while todo:
  x,y=todo.pop()
  if (x,y) in seen or not(0<=x<w and 0<=y<h) or not bg(x,y):continue
  seen.add((x,y));todo.extend([(x-1,y),(x+1,y),(x,y-1),(x,y+1)])
 # Remove enclosed background holes below the information bubble, retaining the white i.
 for y in range(16,h):
  for x in range(w):
   if bg(x,y):seen.add((x,y))
 limits={'coordinates':(7,2,23,27),'length':(6,5,31,31),'distance':(4,7,32,35),'angle':(5,4,33,31)}
 ax,ay,bx,by=limits[name]
 seen.update((x,y) for y in range(h) for x in range(w) if not(ax<=x<bx and ay<=y<by))
 fg=[(x,y) for y in range(h) for x in range(w) if (x,y) not in seen]
 x0=min(x for x,y in fg);x1=max(x for x,y in fg)+1;y0=min(y for x,y in fg);y1=max(y for x,y in fg)+1
 path=[]
 for y in range(h):
  x=0
  while x<w:
   if (x,y) in seen:x+=1;continue
   start=x
   while x<w and (x,y) not in seen:x+=1
   path.append(f'M{start} {y}h{x-start}v1h{start-x}Z')
 out.append({'width':w,'height':h,'viewBox':f'{x0-1} {y0-1} {x1-x0+2} {y1-y0+2}','path':''.join(path)})
 print(name,w,h,'bounds',out[-1]['viewBox'])
Path('frontend/src/components/iCAD_Foundations/informationIconClips.json').write_text(json.dumps(out,indent=2)+'\n')
