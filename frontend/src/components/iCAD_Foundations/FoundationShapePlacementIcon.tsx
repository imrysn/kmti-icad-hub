import { useId } from 'react';

export type PlacementShape = 'box' | 'cylinder' | 'polygon' | 'cone' | 'torus';

export default function FoundationShapePlacementIcon({shape,title}:{shape:PlacementShape;title:string}) {
 const id=useId().replace(/:/g,'');
 // Cone and Torus are only visible after expanding Shape Placement (▼), so draw the second row for them.
 const expanded=shape==='cone'||shape==='torus';
 const h=expanded?92:62;
 const highlight:Record<PlacementShape,[number,number]>={cylinder:[6,29],box:[35,29],polygon:[71,29],cone:[6,60],torus:[35,60]};
 return <svg viewBox={`0 0 174 ${h}`} role="img" aria-label={title} fontFamily="Meiryo, sans-serif">
  <defs><linearGradient id={id} x2="0" y2="1"><stop stopColor="#dce9f5"/><stop offset="1" stopColor="#8ea8c2"/></linearGradient></defs>
  <path d={`M1 1H173V${h-9}H137V${h-1}H1Z`} fill="#efefef" stroke="#999"/>
  <path d="M3 7H131V27H3Z" fill="#adc4e2"/><text x="8" y="22" fontSize="12" fill="#111">形状配置▼</text>
  <path d={`M135 8H172V${h-9}H135`} fill="#f5f5f5" stroke="#999"/><text x="151" y="27" textAnchor="middle" fontSize="13" fill="#111">基</text><text x="151" y="42" textAnchor="middle" fontSize="13" fill="#111">本</text>
  <g stroke="#73879e" strokeWidth="1.2" fill={'url(#'+id+')'}>
   <path d="M10 36V49C10 57 27 57 27 49V36"/><ellipse cx="18.5" cy="36" rx="8.5" ry="5"/>
   <path d="M39 41L50 33L63 41L52 49Z M39 41V46L52 54L63 46V41L52 49"/>
   <path d="M75 35L82 31L91 35V50L83 56L75 51Z"/><path d="M75 35L83 39L91 35M83 39V56" fill="none"/>
   <path d="M104 53L110 32H119L126 53L115 56Z"/>
   {expanded && <>
    <path d="M13 84L16 66H21L24 84Z"/><ellipse cx="18.5" cy="84" rx="5.5" ry="2.5"/>
    <path d="M58 64C46 64 42 76 48 83C53 89 62 88 64 84L59 80C56 83 52 82 51 78C50 73 54 70 58 71Z"/>
   </>}
  </g>
  <rect x={highlight[shape][0]} y={highlight[shape][1]} width="31" height="29" fill="none" stroke="#0087ef" strokeWidth="2"/>
 </svg>;
}
