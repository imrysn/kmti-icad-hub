import { useId } from 'react';
import InterfaceIconPreview from './InterfaceIconPreview';
import screen from '../../assets/icad-foundations/modeling/professional/extrude.png';
import sketchScreen from '../../assets/icad-foundations/modeling/professional/sketch.png';
import oneSideOutput from '../../assets/icad-foundations/modeling/professional/extrude-one-output.png';
import bothSidesOutput from '../../assets/icad-foundations/modeling/professional/extrude-both-output.png';
import oneSideSelection from '../../assets/icad-foundations/modeling/professional/extrude-one-selection.png';
import bothSidesSelection from '../../assets/icad-foundations/modeling/professional/extrude-both-selection.png';
import revolveOutput from '../../assets/icad-foundations/modeling/professional/revolve-output.png';
import revolveScreen from '../../assets/icad-foundations/modeling/professional/revolve.png';

const regions: [number,number,number,number][] = [[1749,242,130,51],[917,630,279,189],[1100,540,118,92],[917,350,279,469]];
export default function FoundationExtrudePreview({index:stepIndex,title,japanese,bothSides=false,revolve=false}: {index:number;title:string;japanese:boolean;bothSides?:boolean;revolve?:boolean}) {
  const id=useId();
  if (!revolve && stepIndex===1) {
    const bounds: [number,number,number,number]=[782,398,518,404];
    const marker=<g><circle cx="984" cy="475" r="4" fill="#e00000"/><text x="969" y="459" fontSize="24" fontWeight="700" fill="#b40000">P1</text></g>;
    const artwork=<svg className="foundation-operation-thumbnail" viewBox="782 398 518 404" role="img" aria-label={title}>
      <rect x="782" y="398" width="518" height="404" fill="#db83e2"/>
      <path d="M798 535 1170 414 1284 736 1123 786 1060 602 844 670Z" fill="none" stroke="#373139" strokeWidth="1"/>
      {marker}
    </svg>;
    return <div className="foundation-file-menu-icon foundation-operation-preview"><InterfaceIconPreview index={stepIndex} toolbar={false} title={title} japanese={japanese} custom={{artwork,screen:sketchScreen,screenOverlay:marker,region:{bounds,landing:bounds}}}/></div>;
  }
  const index=!revolve && stepIndex>1 ? stepIndex-1 : stepIndex;
  const region: [number,number,number,number]=revolve ? index===0 ? [1815,263,30,29] : index===3 ? [875,324,408,506] : [858,448,436,298] : index===0 ? [bothSides ? 1783 : 1751,263,30,29] : index===1 ? [852,228,355,bothSides ? 720 : 481] : index===3 ? bothSides ? [858,295,355,551] : [910,399,290,425] : regions[index];
  const previewScreen=revolve ? index===3 ? revolveOutput : revolveScreen : index===0 ? sketchScreen : index===1 ? bothSides ? bothSidesSelection : oneSideSelection : index===3 ? bothSides ? bothSidesOutput : oneSideOutput : screen;
  const artwork=<svg className="foundation-operation-thumbnail" viewBox="0 0 180 96" role="img" aria-label={title}>
    <defs><linearGradient id={id} x2="0" y2="1"><stop stopColor="#dceafa"/><stop offset="1" stopColor="#9cbbda"/></linearGradient></defs>
    {index===0 ? <>
      <rect x="8" y="16" width="164" height="64" fill="#eee" stroke="#999"/>
      <rect x="11" y="19" width="158" height="20" fill={`url(#${id})`}/>
      <text x="16" y="34" fontFamily="Meiryo,sans-serif" fontSize="12" fill="#111">立体作成▼</text>
      {[32,72,112,150].map((x,n)=><g key={x} transform={`translate(${x} 44)`}>
        <path d="m-9 5 8-4 10 5v20l-9 4-9-5Z" fill={`url(#${id})`} stroke="#697e91"/>
        {n<2 ? <><path d="M0 22V5M-5 10 0 4 5 10" fill="none" stroke="#38669b" strokeWidth="3"/>{n===1 && <path d="m-5 18 5 6 5-6" fill="none" stroke="#38669b" strokeWidth="3"/>}</> : n===2 ? <path d="M-8 15Q13 23 9 7" fill="none" stroke="#38669b" strokeWidth="3"/> : <path d="M-12 30V0H12V30Z" fill="none" stroke="#38669b" strokeDasharray="2 2"/>}
      </g>)}
      <rect x={revolve ? 97 : bothSides ? 57 : 17} y="41" width="29" height="34" fill="none" stroke="#0087ef" strokeWidth="2"/>
    </> : revolve ? index===3 ? <>
      <g transform="translate(48 2)" stroke="#666" strokeWidth=".6">
        <path d="M30 8 43 2C81 0 114 81 80 90L66 94Z" fill="#fafafa"/>
        <ellipse cx="48" cy="51" rx="25" ry="47" transform="rotate(-25 48 51)" fill="#aaa"/>
        <path d="M25 41 48 31C66 29 83 60 68 69L43 79Z" fill="#fff"/>
        <ellipse cx="31" cy="61" rx="14" ry="23" transform="rotate(-25 31 61)" fill="#aaa"/>
      </g>
    </> : <>
      <rect x="15" width="150" height="96" fill="#db83e2"/>
      {index===2 && <>
        <defs><clipPath id={`${id}-revolve-profile`}><path d="M24 47 112 4 158 74 125 93 96 52 45 82Z"/></clipPath></defs>
        <g clipPath={`url(#${id}-revolve-profile)`}>{Array.from({length:10},(_,n)=><path key={n} d={`M15 ${n*10}H165`} stroke="#f877ec" strokeWidth="1"/>)}</g>
        <path d="M73 34C57 27 60 12 70 17" fill="none" stroke="#00bdc8" strokeWidth="1.5"/>
        <path d="m67 14 8 9-12-3Z" fill="#00cbd0"/>
      </>}
      <path d="M24 47 112 4 158 74 125 93 96 52 45 82Z" fill="none" stroke="#ffcf8b" strokeWidth="1"/>
      <path d="M24 47 112 4" stroke={index===2 ? "#ffe000" : "#2875bb"} strokeWidth={index===2 ? 2.5 : 1.5}/>
      {index===1 ? <><circle cx="68" cy="25.5" r="2" fill="red"/><text x="65" y="19" fill="#b40000" fontSize="10">P1</text></> : <><circle cx="24" cy="47" r="2" fill="red"/><circle cx="112" cy="4" r="2" fill="red"/></>}
    </> : index===1 ? <>
      <svg x="44" y="1" width="92" height="94" viewBox={`852 228 355 ${bothSides ? 720 : 481}`}>
        <defs><pattern id={`${id}-hatch`} width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 0 12 1" stroke="#ff78dd" strokeWidth="2"/></pattern></defs>
        <rect x="852" y="228" width="355" height="720" fill="#dd84df"/>
        <g fill="none" stroke="#4e394f" strokeWidth="1.5">
          <path d="M867 347 1079 243 1191 410 1111 455 1041 358 918 429Z"/>
          <path d="M867 347V585M918 429V666M1041 358V595M1111 455V693M1191 410V648"/>
          <path d="M867 585 1079 480 1191 648 1111 693 1041 595 918 666Z" fill={`url(#${id}-hatch)`}/>
          {bothSides && <><path d="M867 585V823M918 666V904M1041 595V833M1111 693V932M1191 648V886"/><path d="M867 823 1079 718 1191 886 1111 932 1041 833 918 904Z"/></>}
        </g>
        <path d="M1079 228V948" stroke="#ff446f"/>
        {Array.from({length:51},(_,n)=><path key={n} d={`M1079 ${228+n*14}h30`} stroke={n%5===3 ? '#e80018' : '#555'} strokeWidth="1.5"/>)}
        <circle cx="1079" cy="480" r="5" fill="red"/>
      </svg>
    </> : index===2 ? <>
      <g transform="translate(31 2)">
        <rect width="118" height="92" fill="#db83e2"/>
        <path d="M0 61 79 92H47L0 73ZM0 33 60 92H37L0 48Z" fill="#f0a0dc"/>
        <path d="M34 0 94 92M0 32 44 92" fill="none" stroke="#4e4854" strokeWidth=".8" strokeDasharray="1 2"/>
        <path d="M0 10H24M0 23H24M0 37H24M0 50H24M0 64H24M0 77H24M0 90H24" fill="none" stroke="#56505d"/>
        <path d="M0 10H24" stroke="#e4001b" strokeWidth="2"/>
        <rect x="24" y="39" width="75" height="21" fill="#fff" stroke="#888"/>
        <path d="M25 59H98V40" fill="none" stroke="#bbb"/>
        <text x="28" y="54" fontFamily="Arial,sans-serif" fontSize="12" fill="#111">50</text>
      </g>
    </> : <>
      <g transform="translate(57 3) scale(.2)" stroke="#555" strokeWidth="2" strokeLinejoin="round">
        <path d="M0 84 169 0 259 134 195 172 139 93 40 150Z" fill="#fff"/>
        <path d="M0 84 40 150V373L0 307Z" fill="#a2a2a2"/>
        <path d="M40 150 139 93V316L40 373Z" fill="#e3e3e3"/>
        <path d="M139 93 195 172V395L139 316Z" fill="#a2a2a2"/>
        <path d="M195 172 259 134V357L195 395Z" fill="#e3e3e3"/>
        {bothSides && <path d="M0 195 40 262 139 205 195 284 259 246" fill="none"/>}
      </g>
    </>}
  </svg>;
  return <div className="foundation-file-menu-icon foundation-operation-preview"><InterfaceIconPreview index={index} toolbar={false} title={title} japanese={japanese} custom={{artwork,screen:previewScreen,screenOverlay:revolve && (index===1 || index===2) ? <g>{index===1 ? <><circle cx="1007" cy="529" r="4" fill="red"/><text x="982" y="511" fontSize="25" fill="#b40000">P1</text></> : <><path d="M874 592 1138 463" stroke="#ffe000" strokeWidth="3"/><circle cx="874" cy="592" r="4" fill="red"/><circle cx="1138" cy="463" r="4" fill="red"/></>}</g> : undefined,region:{bounds:region,landing:region}}}/></div>;
}
