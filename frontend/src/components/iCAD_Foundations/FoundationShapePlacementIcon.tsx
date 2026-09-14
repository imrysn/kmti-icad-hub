import { useId } from 'react';

export default function FoundationShapePlacementIcon({shape,title}:{shape:'box'|'cylinder'|'polygon';title:string}) {
 const id=useId().replace(/:/g,'');
 return <svg viewBox="0 0 174 62" role="img" aria-label={title} fontFamily="Meiryo, sans-serif">
  <defs><linearGradient id={id} x2="0" y2="1"><stop stopColor="#dce9f5"/><stop offset="1" stopColor="#8ea8c2"/></linearGradient></defs>
  <path d="M1 1H173V53H137V61H1Z" fill="#efefef" stroke="#999"/>
  <path d="M3 7H131V27H3Z" fill="#adc4e2"/><text x="8" y="22" fontSize="12" fill="#111">形状配置▼</text>
  <path d="M135 8H172V53H135" fill="#f5f5f5" stroke="#999"/><text x="151" y="27" textAnchor="middle" fontSize="13" fill="#111">基</text><text x="151" y="42" textAnchor="middle" fontSize="13" fill="#111">本</text>
  <g stroke="#73879e" strokeWidth="1.2" fill={'url(#'+id+')'}>
   <path d="M10 36V49C10 57 27 57 27 49V36"/><ellipse cx="18.5" cy="36" rx="8.5" ry="5"/>
   <path d="M39 41L50 33L63 41L52 49Z M39 41V46L52 54L63 46V41L52 49"/>
   <path d="M75 35L82 31L91 35V50L83 56L75 51Z"/><path d="M75 35L83 39L91 35M83 39V56" fill="none"/>
   <path d="M104 53L110 32H119L126 53L115 56Z"/>
  </g>
  <rect x={shape==='cylinder'?6:shape==='box'?35:71} y="29" width="31" height="29" fill="none" stroke="#0087ef" strokeWidth="2"/>
 </svg>;
}
