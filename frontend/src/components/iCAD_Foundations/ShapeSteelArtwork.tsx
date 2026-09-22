import { useId } from 'react';

/** Extruded cross-sections, projected consistently so each flange and web is visible. */
export function SteelProfileArtwork({index,title}:{index:number;title:string}) {
  const id=useId();
  if(index===6) return <svg className="steel-profile-artwork" viewBox="0 0 155 175" role="img" aria-label={title}>
    <defs><linearGradient id={`${id}-pipe`} x2="1" y2="1"><stop stopColor="#ffffff"/><stop offset="1" stopColor="#e2e5e8"/></linearGradient></defs>
    <path d="M19 73 100 20 142 43 61 96Z" fill="#ffffff" stroke="#969da4" strokeWidth=".8"/>
    <path d="M61 96 142 43v57l-81 53Z" fill={`url(#${id}-pipe)`} stroke="#969da4" strokeWidth=".8"/>
    <path d="M25 83 100 34v43l-75 49Z" fill="#9da5ad" stroke="#7c858e" strokeWidth=".8"/>
    <path d="m25 126 75-49 36 20-81 53Z" fill="#e6e9ec" stroke="#969da4" strokeWidth=".8"/>
    <path d="M19 73 61 96v57l-42-23Z M25 84v42l30 17v-43Z" fill="#f4f5f6" fillRule="evenodd" stroke="#858e97" strokeWidth=".8" strokeLinejoin="round"/>
  </svg>;
  const sections:number[][][]=[
    [[0,0],[38,0],[38,5],[6,5],[6,66],[38,66],[38,72],[0,72]],
    [[0,0],[48,0],[48,6],[27,6],[27,66],[48,66],[48,72],[0,72],[0,66],[21,66],[21,6],[0,6]],
    [[0,0],[40,0],[40,7],[24,10],[24,62],[40,65],[40,72],[0,72],[0,65],[16,62],[16,10],[0,7]],
    [[0,0],[6,0],[6,56],[56,56],[56,62],[0,62]],
    [[0,0],[6,0],[6,78],[43,78],[43,84],[0,84]],
    [[0,0],[5,0],[5,78],[35,78],[35,87],[0,87]],
  ];
  const section=sections[index];
  const point=([x,y]:number[],back=false)=>[19+x*.65+(back?87:0),68+y*.9+x*.36-(back?53:0)];
  const polygon=(points:number[][])=>points.map(p=>p.join(',')).join(' ');
  return <svg className="steel-profile-artwork" viewBox="0 0 155 175" role="img" aria-label={title}>
    <defs><linearGradient id={`${id}-metal`} x2=".8" y2="1"><stop stopColor="#f8f8f8"/><stop offset=".45" stopColor="#e8e8e8"/><stop offset="1" stopColor="#dddddd"/></linearGradient></defs>
    <polygon points={polygon(section.map(p=>point(p,true)))} fill="#dddddd" stroke="#a5a5a5" strokeWidth=".7"/>
    {section.map((p,i)=>{const q=section[(i+1)%section.length];return <polygon key={i} points={polygon([point(p),point(p,true),point(q,true),point(q)])} fill={p[1]===q[1]?(q[0]>p[0]?'#ffffff':'#fafafa'):`url(#${id}-metal)`} stroke="#b0b0b0" strokeWidth=".7" strokeLinejoin="round"/>;})}
    <polygon points={polygon(section.map(p=>point(p)))} fill="#c6c6c6" stroke="#a0a0a0" strokeWidth=".8" strokeLinejoin="round"/>
  </svg>;
}

export function MachinePartMenuArtwork({title}:{title:string}) {
  const id=useId();
  const gear=(cx:number,cy:number,r:number)=>Array.from({length:48},(_,i)=>{const a=i*Math.PI/24;const radius=i%4<2?r:r*.82;return `${cx+Math.cos(a)*radius},${cy+Math.sin(a)*radius}`;}).join(' ');
  return <svg className="foundation-shape-steel-menu" viewBox="0 0 264 116" role="img" aria-label={title}>
    <defs><linearGradient id={`${id}-bar`} x2="0" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#bfc2c3"/></linearGradient><radialGradient id={`${id}-gear`}><stop stopColor="#e5edf6"/><stop offset=".6" stopColor="#9db3d1"/><stop offset="1" stopColor="#536a88"/></radialGradient></defs>
    <path d="M1 1h262v114H1Z" fill="#eee" stroke="#999"/>
    <path d="M3 3h258v37H3Z" fill={`url(#${id}-bar)`}/><text x="12" y="29" fontSize="22" fontFamily="Meiryo,sans-serif" fill="#111">部品配置▼</text>
    <rect x="7" y="46" width="59" height="61" fill="none" stroke="#0087ef" strokeWidth="4"/>
    <g stroke="#52657e" strokeWidth="1.5"><polygon points={gear(36,76,23)} fill={`url(#${id}-gear)`}/><ellipse cx="36" cy="76" rx="10" ry="9" fill="#dae5f2"/><polygon points={gear(49,89,12)} fill="#71849e"/><ellipse cx="49" cy="89" rx="4" ry="4" fill="#dae5f2"/>
    <path d="M87 70v22q18 14 36 0V70" fill="#899eb9"/><ellipse cx="105" cy="70" rx="19" ry="18" fill={`url(#${id}-gear)`}/><ellipse cx="105" cy="69" rx="7" ry="6" fill="#e6eaf0"/><path d="M92 93v8m26-8v8" strokeWidth="4"/>
    <path d="m150 65 20-13 22 13v26l-22 13-20-13Z" fill="#cad8e0"/><path d="m150 65 20 13 22-13M170 78v26" fill="none"/><path d="M161 62v15q10 10 19 0V62" fill="#35ab55"/><ellipse cx="170" cy="62" rx="9" ry="6" fill="#78db87"/>
    <ellipse cx="228" cy="91" rx="24" ry="11" fill="#839ebc"/>{[215,240].map(x=><g key={x}><path d={`M${x-5} 55v33q5 6 10 0V55`} fill="#c5d7e5"/><ellipse cx={x} cy="55" rx="5" ry="3" fill="#edf6ff"/><ellipse cx={x} cy="88" rx="6" ry="4" fill="#e5cb54"/></g>)}<ellipse cx="228" cy="94" rx="5" ry="3" fill="#e8d369"/></g>
  </svg>;
}

export function SteelDialogArtwork({title}:{title:string}) {
  const tree=['管用テーパねじ_KEM','管用平行ねじ_KEM','02_締結(略号)部品_KEM','ピン','スプリングピン_SP','テーパピン','六角ナット','六角ボルト','十字穴付小ねじ','座金','止めねじ','ねじ','03_軸受_KEM','DUブシュ','04_キー_KEM','平行キー_KEM','05_止め輪','06_形鋼_KEM','H形鋼','I形鋼','不等辺不等厚山形鋼','不等辺山形鋼','溝形鋼','等辺山形鋼','角パイプ','07_配管','08_吊り具_KEM'];
  const sizes=['75×40×5','100×50×5','125×65×6','150×75×6.5','150×75×9','180×75×7','200×80×7.5','200×90×8','250×90×9','250×90×11','300×90×9','300×90×10','300×90×12','380×100×10.5'];
  return <svg className="foundation-shape-steel-dialog-icon" viewBox="0 0 804 643" role="img" aria-label={title} fontFamily="Meiryo,sans-serif" fontSize="12" fill="#111">
    <path d="M1 1h802v641H1Z" fill="#f0f0f0" stroke="#8b8b8b"/><path d="M2 2h800v22H2Z" fill="#fff"/><text x="8" y="16">部品配置（機械部品）</text>
    <rect x="11" y="35" width="232" height="599" fill="#fff" stroke="#92979c"/>
    <path d="M60 48v555M78 58v535M98 389v140" fill="none" stroke="#888" strokeDasharray="1 2"/>
    {tree.map((label,i)=>{const y=49+i*20;const child=i>=18&&i<=24;const x=child?100:78;return <g key={i}><rect x={x-19} y={y-8} width="7" height="7" fill="#fff" stroke="#9ca6b3"/><path d={`M${x-18} ${y-4.5}h5`} stroke="#627d9a"/><path d={`M${x} ${y-9}h5l2 2h7v10h-14Z`} fill={child?'#e4eaf3':'#ffec85'} stroke="#818c7d"/>{i===22&&<rect x={x+16} y={y-11} width="43" height="17" fill="#0078d7"/>}<text x={x+17} y={y+2} fill={i===22?'white':'#111'}>{label}</text></g>;})}
    <text x="250" y="51">パーツ名／グループ名</text><rect x="411" y="35" width="254" height="19" fill="white" stroke="#888"/><text x="416" y="49">75×40×5-4000</text><text x="251" y="75">コメント</text><rect x="411" y="59" width="380" height="18" fill="white" stroke="#888"/>
    <rect x="250" y="85" width="153" height="109" fill="white" stroke="#888"/><rect x="252" y="87" width="149" height="17" fill="#0078d7"/><text x="257" y="101" fill="white">3D</text>
    <rect x="412" y="85" width="350" height="247" fill="#000" stroke="#888"/><path d="M520 319V97h118q-1 18-18 21l-61 4q-27 2-27 24v124q0 25 27 27l61 5q17 2 18 17Z" fill="none" stroke="#fff" strokeWidth="1"/><path d="m513 313 13 13m-13 0 13-13" stroke="#e2cd38"/>
    {['+','再','全','前','−'].map((s,i)=><g key={s}><rect x="767" y={88+i*49} width="22" height="45" fill="#e2e2e2" stroke="#aaa"/><text x="772" y={115+i*49}>{s}</text></g>)}
    <text x="251" y="385">呼び</text><rect x="250" y="390" width="154" height="215" fill="white" stroke="#999"/>{sizes.map((s,i)=><g key={s}>{i===0&&<rect x="252" y="392" width="135" height="15" fill="#0078d7"/>}<text x="255" y={404+i*15} fill={i===0?'white':'#111'}>{s}</text></g>)}
    <text x="423" y="386">長さ(l)</text><text x="423" y="400" fill="#00378c">(0.0 ≤ l)</text><rect x="423" y="404" width="91" height="20" fill="white" stroke="#888"/><text x="428" y="419">4000.0</text><path d="m501 412 4 4 4-4" fill="none" stroke="#333"/>
    {['OK','キャンセル','詳細','属性'].map((s,i)=><g key={s}><rect x={367+i*110} y="615" width="92" height="20" fill="#e1e1e1" stroke={i===0?'#0087ef':'#999'}/><text x={405+i*110} y="630" textAnchor="middle">{s}</text></g>)}
  </svg>;
}
