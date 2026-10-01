from pathlib import Path
import json
p=Path('data/foundations-curriculum.json');d=json.loads(p.read_text(encoding='utf-8'))
l=next(l for m in d['modules'] for l in m['lessons'] if l['id']=='foundation-properties-part-layer-designation')
for lang in ['en','ja']:
 s=l['content'][lang]['sections'];blocks=s[0]['text'].split('\n\n')
 for i,layer in enumerate([1,1,2,2,3]):blocks[i]=(f'Layer {layer} — ' if lang=='en' else f'レイヤ {layer} — ')+blocks[i]
 if lang=='en':
  blocks[0]='Layer 1 — Common Fabricated or Machined Parts\n**All parts must be WHITE.**\nAll common parts that need to be fabricated or machined.\nParts that undergo Annealing, Shot Blasting, or Annealing and Shot Blasting.\nCovers for purchase parts with no mechanism.'
 else:
  blocks[0]='レイヤ 1 — 一般的な製作・機械加工パーツ\n**すべてのパーツを白にします。**\n一般的な製作・機械加工が必要なパーツ。\n焼なまし（Annealing）、ショットブラスト、または焼なましとショットブラストの両方を行うパーツ。\n機構のない購入品カバー。'
 s[0]['text']='\n\n'.join(blocks)
 for i in [1,2,3]:s[i]['title']=('Layer 2 — ' if lang=='en' else 'レイヤ 2 — ')+s[i]['title']
 if lang=='en':
  s[5]['text']='Part Category / Layer|Color Rule\nLayer 1 — Common fabricated/machined parts|White\nLayer 1 — Fabricated/machined parts with color/paint|Required paint; safety covers: Yellow (No. 4)\nLayer 2 — Stainless Steel and Acrylic|White (No. 1)\nLayer 2 — Pointer|Red paint only on the pointer area\nLayer 2 — Materials with assigned color codes|MC Nylon: Blue (No. 5); Urethane: No. 18; Rubber: Black (No. 16); New Light: White (No. 1)\nLayer 2 — Heat-treated parts|Preheat / heated surface coating part: White (No. 1); Isonite, Ionite, Parsonite: Gray (No. 8); Parkerizing, Manganese Phosphate: Black (No. 16)\nLayer 3 — Purchase parts, including stud bolts and additional processing|Manufacturer standard color'
 else:
  s[5]['text']='パーツの分類・レイヤ|色のルール\nレイヤ 1 — 一般的な製作・機械加工パーツ|白\nレイヤ 1 — 塗装が必要な製作・機械加工パーツ|指定の塗装色。安全カバー：黄色（No. 4）\nレイヤ 2 — ステンレス鋼・アクリル|白（No. 1）\nレイヤ 2 — 指針|指針部分だけ赤く塗装\nレイヤ 2 — 色番号が指定された材料|MC Nylon：青（No. 5）、Urethane：No. 18、Rubber：黒（No. 16）、New Light：白（No. 1）\nレイヤ 2 — 熱処理を行うパーツ|Preheat / heated surface coating part：白（No. 1）、Isonite, Ionite, Parsonite：グレー（No. 8）、Parkerizing, Manganese Phosphate：黒（No. 16）\nレイヤ 3 — スタッドボルト・追加加工品を含む購入品|メーカー標準色'
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
p=Path('frontend/src/components/iCAD_Foundations/__tests__/layerDesignation.test.tsx');s=p.read_text(encoding='utf-8').replace("expect(container.querySelectorAll('.foundation-view-comparison__card')).toHaveLength(5);", "expect(container.querySelectorAll('.foundation-view-comparison__card')).toHaveLength(5);\n const headings=screen.getAllByRole('heading').map(h=>h.textContent);\n [1,1,2,2,3].forEach((layer,i)=>expect(headings[i]).toContain(`${lang==='ja'?'レイヤ':'Layer'} ${layer}`));");p.write_text(s,encoding='utf-8')
p=Path('docs/references/f23-3-layer-designation.md');p.write_text(p.read_text(encoding='utf-8')+'\nLatest user correction supersedes the earlier exclusion of layer assignments: Layer 1 common and painted fabricated/machined parts; Layer 2 unpainted/material-code/heat-treated parts; Layer 3 purchased parts. Both languages now display these assignments in category headings, detailed-table headings, and quick reference.\n',encoding='utf-8')
