export default function StretchArtwork({step,linear,title}:{step:number;linear:boolean;title:string}) {
  if(step===2 && linear) return <svg className="stretch-vector stretch-vector--scale-input" viewBox="0 0 110 44" role="img" aria-label={title}>
    <rect x="9" y="9" width="92" height="26" fill="#fff" stroke="#888"/>
    <path d="M10 34V10h90" fill="none" stroke="#bbb"/>
    <text x="15" y="28" fontFamily="Arial,sans-serif" fontSize="18" fill="#111">20</text>
    <path d="M37 13v17" stroke="#111"/>
  </svg>;
  if(step===0) return <svg className="stretch-vector" viewBox="0 0 140 160" role="img" aria-label={title}>
    <path d="M2 2h136v156H2Z" fill="#eee" stroke="#999"/><path d="M3 3h134v21H3Z" fill="#d4e5f7"/><text x="8" y="17" fontSize="10" fill="#111">伸縮・整形・切断▼</text>
    {Array.from({length:14},(_,i)=><g key={i} transform={`translate(${10+(i%4)*32} ${31+Math.floor(i/4)*31})`} stroke="#56816b" strokeWidth="1"><path d="m0 12 10-6 12 6-11 7Z" fill="#f9ffff"/><path d="M0 12v9l11 6v-8Z" fill="#bcc9c2"/><path d="m11 19 11-7v9l-11 6Z" fill="#36be68"/>{i===0?<path d="M8 17V7H4l7-7 7 7h-4v10Z" fill="#258c4d"/>:<path d={i%2?'M5 11 12 7l6 4-6 4Z':'M7 8v10l8-4V4Z'} fill="#19b954"/>}</g>)}
    <rect x="6" y="27" width="28" height="33" fill="none" stroke="#0087ef" strokeWidth="2"/>
  </svg>;
  if(step===2 && !linear) return <svg className="stretch-vector stretch-vector--entry" viewBox="0 0 330 45" role="img" aria-label={title}><path d="M1 1h328v43H1Z" fill="#eee" stroke="#999"/><text x="7" y="28" fontSize="14">面取り</text><rect x="58" y="9" width="99" height="27" fill="white" stroke="#888"/><text x="63" y="28" fontSize="14">0.0000</text><text x="167" y="28" fontSize="14">丸み</text><rect x="208" y="9" width="103" height="27" fill="white" stroke="#0087ef"/><text x="214" y="28" fontSize="14">20</text><path d="m315 20 5 6 5-6" fill="#333"/></svg>;
  const length=step===3?155:105;
  const p=(x:number,y:number,z:number)=>`${35+x+z*.62},${115+x*.55-z*.36-y}`;
  const face=(points:number[][])=>points.map(([x,y,z])=>p(x,y,z)).join(' ');
  // Center the visible geometry, including the scale, rather than its old padded canvas.
  // The upper face reaches y=-11, so the viewport must include negative coordinates.
  const viewBox=step===3?'25 -21 237 231':linear?'-15 -21 285 255':'25 -21 187 204';
  return <svg className="stretch-vector" viewBox={viewBox} preserveAspectRatio="xMidYMid meet" role="img" aria-label={title}>
    <g stroke="#858a91" strokeWidth=".7" strokeLinejoin="round">
      <polygon points={face([[0,0,0],[length,0,0],[length,45,0],[0,45,0]])} fill="#aaa"/>
      <polygon points={face([[0,45,0],[length,45,0],[length,45,55],[0,45,55]])} fill="#fff"/>
      <polygon points={face([[0,45,55],[length,45,55],[length,90,55],[0,90,55]])} fill="#aaa"/>
      <polygon points={face([[0,90,55],[length,90,55],[length,90,100],[0,90,100]])} fill="#fff"/>
      <polygon points={face([[length,0,0],[length,0,100],[length,90,100],[length,90,55],[length,45,55],[length,45,0]])} fill="#e5e5e5" stroke={step===3?'#858a91':'#7670ff'}/>
    </g>
    {linear && step!==3 && <g transform="translate(5 73) rotate(29)" fontFamily="Arial" fontSize="9"><path d="M0 0h275" stroke="#f24b50"/>{Array.from({length:46},(_,i)=><g key={i} transform={`translate(${i*6} 0)`}><path d={`M0 ${i%5===0?-12:0}v${i%5===0?32:16}`} stroke={i%5===0?'#f12d42':'#333'} strokeWidth=".7"/>{i%5===0&&<text x="-3" y="-16">{i-25}</text>}</g>)}<circle cx="150" r="3" fill="red"/>{step===2&&<g transform="translate(132 30) rotate(-29)"><rect width="45" height="18" fill="white" stroke="#888"/><text x="4" y="13" fontSize="12">20</text></g>}</g>}
    {!linear && step===1 && <path d="m152 155-42-24 10 2-5 7-5-9" fill="#1e3283" stroke="#1e3283"/>}
  </svg>;
}
