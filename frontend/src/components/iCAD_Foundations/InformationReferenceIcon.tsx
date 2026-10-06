import { useId } from 'react';

const names = ['coordinates', 'length', 'distance', 'angle', 'entity'];

/** Continuous vector geometry based on the five iCAD measurement references. */
export default function InformationReferenceIcon({index,title}:{index:number;title:string}) {
 const id=useId();
 const bubbleX=index===0?16:index===3?18:16;
 return <svg className="foundation-single-command information-reference-icon" width="76" height="76" viewBox="0 0 34 34" preserveAspectRatio="xMidYMid meet" role="img" aria-label={title} data-command-reference={`information-${names[index]}`} data-vector-construction="geometry">
  <defs>
   <radialGradient id={`${id}-info`} cx="30%" cy="20%" r="85%"><stop stopColor="#b3dcff"/><stop offset=".36" stopColor="#438bdb"/><stop offset="1" stopColor="#254c9f"/></radialGradient>
   <linearGradient id={`${id}-cube`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7bd6f6"/><stop offset="1" stopColor="#2b85bb"/></linearGradient>
  </defs>
  <g fill="none" stroke="#494c54" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
   {index===0 && <path d="M16 18a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" stroke="#657087"/>}
   {index===1 && <path d="M5 29 29 9" strokeWidth="2.1"/>}
   {index===2 && <>
    <path d="m8 27 17-15" strokeDasharray=".6 3.7" strokeWidth="2"/>
    <path d="M6.5 27a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM27 8a1.7 1.7 0 1 0 0 3.4A1.7 1.7 0 0 0 27 8Z" strokeWidth="1.2"/>
   </>}
   {index===3 && <>
    <path d="M23 12 5 29h25 M11 23a8 8 0 0 1 3 6" strokeWidth="2"/>
    <path d="m21 18-4 6h6 M21 18v10 M28 18h-4v5c6-2 5 6 0 4" strokeWidth="1.2"/>
    <path d="M30 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" strokeWidth=".8"/>
   </>}
   {index===4 && <g stroke="#2e7da9" strokeWidth="1.1">
    <path d="m6 19 10-6 11 6-11 7Z" fill="#9de1f6"/>
    <path d="m6 19 10 7v7L6 26Z" fill={`url(#${id}-cube)`}/>
    <path d="m16 26 11-7v7l-11 7Z" fill="#348fbf"/>
   </g>}
  </g>
  <g transform={`translate(${bubbleX} 8)`}>
   <path d="M-5 0c0-6 11-6 11 0S-5 6-5 0Z" fill={`url(#${id}-info)`} stroke="#365b9f" strokeWidth=".6"/>
   <path d="m.3-1.1-1 4h1.6l1-4Zm1-2.8a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z" fill="#fff"/>
   <path d="M2 4.5.5 7 4 4" fill="#315799"/>
  </g>
 </svg>;
}
