import { useId } from 'react';

type Command = 'sketch' | 'extrude' | 'extrudeBoth' | 'revolve' | 'stretch' | 'machinePart';

/** Individual command artwork from the existing iCAD menu references, without menu chrome. */
export default function FoundationCreationCommandIcon({command,title}: {command:Command;title:string}) {
  const id=useId();
  const gear=(cx:number,cy:number,r:number)=>Array.from({length:48},(_,i)=>{
    const angle=i*Math.PI/24, radius=i%4<2?r:r*.82;
    return `${cx+Math.cos(angle)*radius},${cy+Math.sin(angle)*radius}`;
  }).join(' ');
  return <svg className="foundation-single-command" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" role="img" aria-label={title}>
    <defs>
      <linearGradient id={`${id}-solid`} x2="1" y2="1"><stop stopColor="#f4f8fb"/><stop offset="1" stopColor="#9fb7cc"/></linearGradient>
      <linearGradient id={`${id}-arrow`} x2="1" y2="0"><stop stopColor="#81a5d0"/><stop offset="1" stopColor="#274c81"/></linearGradient>
      <radialGradient id={`${id}-gear`}><stop stopColor="#e5edf6"/><stop offset=".6" stopColor="#9db3d1"/><stop offset="1" stopColor="#536a88"/></radialGradient>
    </defs>
    {command==='sketch' && <g><path d="M5 27 26 5" fill="none" stroke="#59606b" strokeWidth="1.5" strokeLinecap="round"/>{[[5,27],[26,5]].map(([cx,cy])=><circle key={cx} cx={cx} cy={cy} r="1.5" fill="#7891bd" stroke="#4a5261" strokeWidth=".5"/>)}</g>}
    {(command==='extrude'||command==='extrudeBoth') && <g stroke="#697e91" strokeWidth=".8" strokeLinejoin="round">
      <path d="m6 8 9-5 10 5-9 5Z" fill="#f4f8fb"/>
      <path d="m6 8 10 5v15L6 23Z" fill="#cfdeea"/>
      <path d="m16 13 9-5v15l-9 5Z" fill={`url(#${id}-solid)`}/>
      <path d={command==='extrudeBoth'?'M12 11 16 6l4 5h-3v10h3l-4 5-4-5h3V11Z':'M12 11 16 6l4 5h-3v14h-2V11Z'} fill={`url(#${id}-arrow)`} stroke="#385d8c" strokeWidth=".5"/>
    </g>}
    {command==='revolve' && <g strokeLinejoin="round">
      <path d="M7 7v17c0 6 18 6 18 0V7" fill={`url(#${id}-solid)`} stroke="#697e91" strokeWidth=".8"/>
      <ellipse cx="16" cy="7" rx="9" ry="4" fill="#e3edf6" stroke="#697e91" strokeWidth=".8"/>
      <path d="M6 18c-4 8 22 10 22 0v-4" fill="none" stroke="#38669b" strokeWidth="2.5"/>
      <path d="m24 16 4-7 3 8Z" fill="#38669b"/>
    </g>}
    {command==='stretch' && <g strokeLinejoin="round">
      <path d="M6.5 21 15.5 17 25 21 16 25.5Z" fill="#e5ece7" stroke="#8a9a91" strokeWidth=".75"/>
      <path d="M6.5 21V23.5L16 28V25.5Z" fill="#acb9b1" stroke="#8a9a91" strokeWidth=".65"/>
      <path d="M16 25.5 25 21V23.5L16 28Z" fill="#c4cec8" stroke="#8a9a91" strokeWidth=".65"/>
      <path d="M10 21 15.5 18.5 21 21 15.5 23.5Z" fill="#5ab879" stroke="#498b60" strokeWidth=".55"/>
      <path d="M13.5 21V12H10.5L16 6.5 21 12H18V21L15.8 22Z" fill="#205c33" stroke="#214e2b" strokeWidth=".65"/>
      <path d="M16 6.5 16 10.5 14.8 12V21.5L13.5 21V12H10.5Z" fill="#67ad6b" stroke="none"/>
      <path d="M16 10.5 18 12V21L15.8 22V12Z" fill="#348447" stroke="none"/>
      <path d="M16 6.5 21 12H18L16 10.5Z" fill="#163d23" stroke="none"/>
    </g>}
    {command==='machinePart' && <g transform="translate(-3 -22) scale(.5)" stroke="#52657e" strokeWidth="1.5">
      <polygon points={gear(36,76,23)} fill={`url(#${id}-gear)`}/><ellipse cx="36" cy="76" rx="10" ry="9" fill="#dae5f2"/>
      <polygon points={gear(49,89,12)} fill="#71849e"/><ellipse cx="49" cy="89" rx="4" ry="4" fill="#dae5f2"/>
    </g>}
  </svg>;
}
