import { useId } from 'react';
import OriginReferenceIcon from './OriginReferenceIcon';
import './FoundationOriginViews.css';

function Projection({view}: {view:number}) {
  const id=useId();
  return <svg viewBox="0 0 200 240" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-metal`}><stop stopColor="#b9bdbf"/><stop offset=".18" stopColor="#e2e4e5"/><stop offset=".45" stopColor="#fff"/><stop offset=".7" stopColor="#fafafa"/><stop offset="1" stopColor="#cdd0d1"/></linearGradient>
      <linearGradient id={`${id}-side`} x2="0" y2="1"><stop stopColor="#cdd0d1"/><stop offset=".25" stopColor="#fff"/><stop offset=".5" stopColor="#fafafa"/><stop offset=".8" stopColor="#e2e4e5"/><stop offset="1" stopColor="#b9bdbf"/></linearGradient>
      <linearGradient id={`${id}-plate`} x2=".8" y2="1"><stop stopColor="#fafafa"/><stop offset="1" stopColor="#dedfdf"/></linearGradient>
      <linearGradient id={`${id}-holes`} x2="0" y2="1"><stop stopColor="#b7bafa"/><stop offset="1" stopColor="#80d8f6"/></linearGradient>
      <radialGradient id={`${id}-bore`} cx="65%" cy="70%"><stop stopColor="#fff"/><stop offset=".55" stopColor="#e6e6e6"/><stop offset="1" stopColor="#a4a4a4"/></radialGradient>
    </defs>
    {view===0 || view===4 ? <g stroke="#a5abb2" strokeWidth="1.5">
      <rect x="23" y="20" width="154" height="196" fill={`url(#${id}-plate)`}/>
      <path d="M25 214V22H175" fill="none" stroke="#fff" strokeWidth="2"/>
      <path d="M25 214H175V22" fill="none" stroke="#bec1c2" strokeWidth="2"/>
      {[[45,43],[155,43],[45,192],[155,192]].map(([x,y])=><g key={`${x}-${y}`}>
        <circle cx={x} cy={y} r="10" fill={`url(#${id}-holes)`}/>
        <path d={`M${x-8} ${y+4}A9 9 0 0 1 ${x+6} ${y-7}`} fill="none" stroke="#858b97" strokeWidth="2"/>
        <path d={`M${x+8} ${y-4}A9 9 0 0 1 ${x-6} ${y+7}`} fill="none" stroke="#fff" strokeWidth="1.5"/>
      </g>)}
      <circle cx="100" cy="118" r={view===0?48:32} fill="#e9e9e9" stroke="#999"/>
      {view===0 && <>
        <circle cx="100" cy="118" r="46" fill="none" stroke="#c5c5c5" strokeWidth="1"/>
        <circle cx="100" cy="118" r="24" fill={`url(#${id}-bore)`} stroke="#b5b5b5" strokeWidth="2"/>
        <path d="M100 118 81 103Q88 93 100 94Z" fill="#999" opacity=".3" stroke="none"/>
      </>}
    </g> : view===2 || view===5 ? <g stroke="#a5abb2" strokeWidth="1.5">
      <rect x="48" y={view===2?40:22} width="104" height="176" fill={`url(#${id}-metal)`}/>
      <rect x="20" y={view===2?20:198} width="160" height="23" fill="#fff"/>
      <path d={`M22 ${view===2?22:200}H178`} stroke="#fff" strokeWidth="2"/>
      <path d={`M21 ${view===2?41:219}H179`} stroke="#b8bcbe" strokeWidth="2"/>
      <path d={`M50 ${view===2?45:195}H150`} stroke="#94999b" strokeWidth="2" opacity=".45"/>
      <path d={`M52 ${view===2?48:27}V${view===2?211:192}`} stroke="#fff" opacity=".65"/>
    </g> : <g stroke="#a5abb2" strokeWidth="1.5">
      <rect x="27" y="77" width="146" height="86" fill={`url(#${id}-side)`}/>
      <rect x={view===1?15:165} y="23" width="20" height="194" fill="#fff"/>
      <path d={`M${view===1?17:167} 25V215`} stroke="#fff" strokeWidth="2"/>
      <path d={`M${view===1?33:183} 25V215`} stroke="#b8bcbe" strokeWidth="2"/>
      <path d={`M${view===1?37:163} 79V161`} stroke="#94999b" strokeWidth="2" opacity=".45"/>
      <path d="M39 80H160" stroke="#fff" opacity=".65"/>
    </g>}
    <g transform={`translate(${view===1?35:view===3?165:100} 218)`} strokeWidth="2.5">
      <path d="M0 0V-21" stroke="#245ddd"/><path d="m0-26-3 7h6Z" fill="#245ddd"/>
      <path d="M0 0H21" stroke="#e83c35"/><path d="m26 0-7-3v6Z" fill="#e83c35"/>
      <circle r="2.5" fill="#eac600"/>
    </g>
  </svg>;
}

export default function FoundationOriginViews({japanese=false}: {japanese?:boolean}) {
  const names=japanese?['平面図','左側面図','正面図','右側面図','背面図','下面図']:['Top View','Left Side View','Front View','Right Side View','Back View','Bottom View'];
  const positions=['top','left','front','right','back','bottom'];
  return <figure className="foundation-origin-projections">
    <div className="foundation-origin-projections__grid">
      {names.map((name,i)=><div className={`foundation-origin-projections__panel foundation-origin-projections__panel--${positions[i]}`} key={name}>
        <div className="foundation-origin-projections__drawing"><Projection view={i === 0 ? 2 : i === 2 ? 0 : i}/></div>
        <div className="foundation-origin-projections__label">{name}</div>
      </div>)}
      <div className="foundation-origin-projections__panel foundation-origin-projections__panel--reference">
        <div className="foundation-origin-projections__drawing"><OriginReferenceIcon/></div>
      </div>
    </div>
  </figure>;
}
