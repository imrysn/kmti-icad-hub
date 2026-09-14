import { useId } from 'react';

/** Vector reconstruction: no embedded screenshot or raster toolbar assets. */
export default function PartLayoutMenuIcon() {
  const id = useId();
  return <svg className="foundation-part-layout-menu-reference" width="184" height="210" viewBox="0 0 184 210" aria-label="パーツ menu with the part-layout command highlighted" role="img">
    <defs>
      <linearGradient id={`${id}-bar`} x2="0" y2="1"><stop stopColor="#e4edfb"/><stop offset="1" stopColor="#96b7df"/></linearGradient>
      <linearGradient id={`${id}-gold`} x2="1" y2="1"><stop stopColor="#ffffbf"/><stop offset="1" stopColor="#a7b343"/></linearGradient>
      <g id={`${id}-part`} stroke="#808367" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M2 5 8 1 14 5 14 12 8 16 2 12Z" fill={`url(#${id}-gold)`}/>
        <path d="M6 15V24Q9 28 12 24V14" fill={`url(#${id}-gold)`}/>
      </g>
      <g id={`${id}-document`} stroke="#8c9086" strokeWidth="1.2">
        <path d="M1 1H13L18 6V29H1Z" fill="#fffff4"/><path d="M13 1V6H18" fill="#ddd"/>
        <circle cx="8" cy="13" r="5" fill={`url(#${id}-gold)`}/><path d="m11 17 5 6" stroke="#aab158" strokeWidth="5"/>
      </g>
      <g id={`${id}-turn`} fill="none" stroke="#6376a4" strokeWidth="2.5">
        <path d="M12 5C28 6 28 23 12 24"/><path d="m15 1-4 4 5 3M15 20l-4 4 5 3"/>
      </g>
      <g id={`${id}-gear`} stroke="#727f93" strokeWidth="1.1">
        <path d="m3 8 2-4 3 1 2-4 3 2 3-2 2 4 3-1 2 4 3 1-1 4 2 3-3 3 1 4-4 1-2 3-4-1-3 2-3-3-4 1-1-4-3-2 1-4-2-3 3-3Z" fill="#d0ddeb"/>
        <path d="M8 11h11v15H8Z" fill="#fff"/><path d="M11 15h11v14H11Z" fill="#a9c8e5"/>
      </g>
    </defs>
    <rect x="2" y="2" width="180" height="206" fill="#efefef" stroke="#7c8999" strokeWidth="2"/>
    <path d="M5 205V5H180" fill="none" stroke="#fff" strokeWidth="2"/>
    <rect x="8" y="8" width="130" height="23" fill={`url(#${id}-bar)`}/>
    <path d="M140 3V207M6 34H140M6 153H140" stroke="#888"/>
    <g fontFamily="'MS Gothic','Yu Gothic',sans-serif" fontSize="13" fill="#111">
      <text x="12" y="25">パーツ▼</text>
      <text x="153" y="30">基</text><text x="153" y="44">本</text>
      <text x="153" y="87">応</text><text x="153" y="101">用</text>
      <text x="158" y="143">パ</text><text x="158" y="157">ー</text><text x="158" y="171">ツ</text>
      <text x="154" y="201">制</text>
    </g>
    <use href={`#${id}-document`} x="15" y="41"/>
    <g transform="translate(43 41)"><use href={`#${id}-part`} transform="scale(.7)"/><use href={`#${id}-part`} y="17" transform="scale(.7)"/><use href={`#${id}-turn`}/></g>
    <g transform="translate(77 41)"><use href={`#${id}-part`} transform="scale(.7)"/><use href={`#${id}-part`} y="17" transform="scale(.7)"/><use href={`#${id}-turn`}/></g>
    <use href={`#${id}-document`} x="112" y="43"/>
    <path d="m118 36-4 6h8Z" fill="#5a6894"/>
    <use href={`#${id}-document`} x="15" y="81"/>
    <use href={`#${id}-document`} x="46" y="81"/>
    <g stroke="#999" fill="none"><path d="M12 109h24l-3-7M44 109h24l-3-7M12 113h25M44 113h25"/></g>
    <path d="m20 115 4-6 4 6m23-6 4 6 4-6" fill="#6879a1"/>
    <rect x="76" y="84" width="27" height="15" fill="#fff" stroke="#92958a"/>
    <text x="79" y="96" fontFamily="sans-serif" fontWeight="bold" fontSize="13">abc</text>
    <path d="M84 104h19v8H84" fill={`url(#${id}-gold)`} stroke="#808367"/><ellipse cx="82" cy="108" rx="5" ry="8" fill={`url(#${id}-gold)`} stroke="#808367"/>
    <g transform="translate(111 79)"><use href={`#${id}-part`} x="3" y="1"/><path d="M12 20V3" stroke="#4385b8" strokeWidth="3"/><path d="m12 0-4 7h8Z" fill="#4385b8"/><path d="m12 20-11 8" stroke="#d8be28" strokeWidth="3"/><path d="m12 20 12 8" stroke="#d66539" strokeWidth="3"/><path d="m0 30 2-7 5 5Z" fill="#d8be28"/><path d="m26 30-7-2 4-5Z" fill="#d66539"/></g>
    <use href={`#${id}-part`} x="15" y="121"/><use href={`#${id}-part`} x="47" y="121"/>
    <use href={`#${id}-part`} x="76" y="123"/>
    <rect x="90" y="123" width="13" height="24" fill="#fff" stroke="#777"/><path d="M93 128h7m-7 5h7m-7 5h7m-7 5h7" stroke="#444"/>
    {[12,44,76,108].map((x,i)=><g key={x}><use href={`#${id}-gear`} x={x} y="165"/>{i>1 && <path d={`m${x+13} 190 10-4v8l-10 4Z`} fill={i===2?'#d5a327':'#dfd69b'} stroke="#8a7a45"/>}</g>)}
    <g fill="none" stroke="#ff1616" strokeWidth="3"><rect x="7" y="7" width="132" height="26"/><rect x="108" y="76" width="34" height="46"/><rect x="143" y="132" width="38" height="54"/></g>
  </svg>;
}
