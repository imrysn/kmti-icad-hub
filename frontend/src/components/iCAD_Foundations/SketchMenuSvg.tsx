import { useId } from 'react';

/** Native vector tracing of the supplied iCAD Sketch palette. */
export default function SketchMenuSvg({title,toolsOnly=false,lineOnly=false}: {title:string;toolsOnly?:boolean;lineOnly?:boolean}) {
  const id=useId();
  const point=(x:number,y:number)=><circle cx={x} cy={y} r="1.5" fill="#7891bd" stroke="#4a5261" strokeWidth=".5"/>;
  if (lineOnly) return <svg className="foundation-operation-thumbnail" viewBox="0 0 32 32" role="img" aria-label={title}>
    <rect x=".5" y=".5" width="31" height="31" fill="#eee" stroke="#858585"/>
    <path d="M1 31V1H31" fill="none" stroke="#fff"/>
    <rect x="2.5" y="2.5" width="27" height="27" fill="#f8f8f8" stroke="#b9b9b9"/>
    <path d="M6 26 25 5" fill="none" stroke="#59606b" strokeWidth="1.5" strokeLinecap="round"/>
    {point(6,26)}{point(25,5)}
  </svg>;
  return <svg className="foundation-operation-thumbnail" viewBox={lineOnly ? '7 28 31 32' : toolsOnly ? '7 29 129 60' : '0 0 143 91'} role="img" aria-label={title}>
    <defs>
      <linearGradient id={`${id}-header`} x2="0" y2="1"><stop stopColor="#d3e4f8"/><stop offset="1" stopColor="#a1bddf"/></linearGradient>
      <linearGradient id={`${id}-eraser`} x2="0" y2="1"><stop stopColor="#6c81d6"/><stop offset="1" stopColor="#263c98"/></linearGradient>
    </defs>
    <path d="M3 0H140V91H3Z" fill="#eee" stroke="#909090"/>
    <path d="M5 1V89H138" fill="none" stroke="#fff"/>
    <rect x="7" y="6" width="129" height="21" fill={`url(#${id}-header)`} stroke="#a7b5c5" strokeWidth=".6"/>
    <text x="13" y="21" fontFamily="'MS UI Gothic',Meiryo,sans-serif" fontSize="12" fill="#111">スケッチ</text>
    <path d="m50 14 7 0-3.5 6Z" fill="#111"/>
    <path d="M7 28H137V90M8 29H136" fill="none" stroke="#858585"/>
    <path d="M9 30H37V59H9Z" fill="#f8f8f8" stroke="#b9b9b9"/>
    <g fill="none" stroke="#59606b" strokeWidth="1.5" strokeLinecap="round">
      <path d="M13 55 32 34"/>
      <circle cx="55" cy="45" r="10"/>
      <path d="M82 54A10 10 0 1 1 92 36"/>
      <path d="M110 46Q118 31 129 39Q133 42 128 49"/>
      <path d="M15 85 22 74Q17 67 25 65Q33 64 31 71"/>
    </g>
    {point(13,55)}{point(32,34)}{point(55,45)}{point(82,54)}{point(92,36)}
    {point(110,46)}{point(128,49)}{point(15,85)}{point(22,74)}{point(31,71)}
    <path d="m43 77 11-13 11 7-11 14Z" fill={`url(#${id}-eraser)`} stroke="#344b82"/>
    <path d="m43 77 6-7 11 7-6 8Z" fill="#e5e7ed" stroke="#596680" strokeWidth=".7"/>
    <path d="m54 64 11 7-5 6-11-7Z" fill="#7285d2" stroke="#435b9b" strokeWidth=".6"/>
  </svg>;
}
