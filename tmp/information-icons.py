from pathlib import Path
import json
r=Path('frontend/src/components/iCAD_Foundations');p=r/'foundationCommandPaths.json';d=json.loads(p.read_text(encoding='utf-8'))
badge=[['#357cc4','M5 3Q1 3 1 6Q1 9 5 9H7L6 11 10 8Q12 3 5 3Z','#31558b','0.6'],['#ffffff','M6 4H7V5H6ZM5.5 6H7V8H5.5Z']]
shapes=[ [['none','M5 16A3 3 0 1 0 11 16A3 3 0 1 0 5 16','#52647a','1.5']], [['none','M2 24 24 10','#535c68','3']], [['none','M3 25 24 11','#535c68','1'],['#ffffff','M2 24H5V27H2ZM11 18H14V21H11ZM22 10H25V13H22Z','#535c68','1']], [['none','M3 26H27M3 26 21 9','#535c68','2'],['none','M12 26Q12 20 8 20','#535c68','1']], [['#3d9bea','M3 15 11 11 21 16 21 24 12 29 3 24Z','#245e9c','1'],['#86c5f2','M3 15 12 19 21 16 11 11Z','#245e9c','1'],['none','M12 19V29','#245e9c','1']] ]
for name,shape in zip(['coordinates','length','distance','angle','entity'],shapes):d['information-'+name]={'viewBox':'0 0 30 32','source':'Supplied measurement tooltip reference: '+name,'crop':[0,0,30,32],'paths':shape+badge}
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
p=r/'FoundationOperationCommandIcon.tsx';s=p.read_text(encoding='utf-8').replace("  | 'change-layer'","  | 'information-coordinates' | 'information-length' | 'information-distance' | 'information-angle' | 'information-entity'\n  | 'change-layer'",1);p.write_text(s,encoding='utf-8')
