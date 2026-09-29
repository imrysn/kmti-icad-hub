import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import { useId } from 'react';
import InterfaceIconPreview from './InterfaceIconPreview';
import command from '../../assets/icad-foundations/modeling/component-move-command.png';
import selected from '../../assets/icad-foundations/modeling/component-mirror-copy-selected.png';
import plane from '../../assets/icad-foundations/modeling/component-mirror-copy-plane.png';
import result from '../../assets/icad-foundations/modeling/component-mirror-copy-result.png';

export function componentMirrorComparisonIcons() {
  return (["component-mirror","component-mirror-copy"] as const).map(command=><svg key={command} width="36" height="36" viewBox="0 0 76 76"><FoundationOperationCommandIcon command={command} title={command}/></svg>);
}

function PlanePoints() {
  return <g fill="#d71920" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="24">
    <path d="M902 449 900 794" stroke="#d71920" strokeWidth="1.5" strokeDasharray="5 5"/>
    {[[1175,421,'P1',14,-13],[902,449,'P2',-44,28],[900,794,'P3',-44,-12]].map(([x,y,label,dx,dy])=><g key={String(label)}><circle cx={Number(x)} cy={Number(y)} r="6"/><text x={Number(x)+Number(dx)} y={Number(y)+Number(dy)}>{label}</text></g>)}
  </g>;
}

function BracketArtwork({step,title}:{step:number;title:string}) {
  const id=useId();
  const right=[[1083,552],[1166,545],[1248,537],[1081,740],[1164,733],[1246,724]];
  const left=step===3?[[828,519],[910,511],[993,503],[826,707],[908,699],[991,692]]:[];
  const holes=[...right,...left];
  return <svg className="stretch-vector" viewBox="740 380 600 485" role="img" aria-label={title}>
    <defs><mask id={id} maskUnits="userSpaceOnUse" x="740" y="380" width="600" height="485"><rect x="740" y="380" width="600" height="485" fill="white"/>{holes.map(([x,y])=><ellipse key={`${x}-${y}`} cx={x} cy={y} rx="12" ry="18" fill="black"/>)}</mask></defs>
    {/* Faces and hole centers traced from the supplied bracket screenshots. */}
    <g stroke="#88802c" strokeWidth="1.2" strokeLinejoin="round" mask={`url(#${id})`}>
      <path d="M771 431 1043 404 1305 438 1030 465Z" fill="#f2db00"/>
      <path d="M774 437 1027 470 1023 781 768 806Z" fill="#ffe600"/>
      <path d="M771 431 774 437 768 806 767 801Z" fill="#cdb800"/>
      <path d="M1030 465 1305 438 1301 813 1023 840Z" fill="#ffe600"/>
      <path d="M1027 470 1030 465 1023 840 1022 834Z" fill="#bba700"/>
    </g>
    {holes.map(([x,y])=><ellipse key={`${x}-${y}`} cx={x} cy={y} rx="12" ry="18" fill="none" stroke="#88802c" strokeWidth="1.2"/>)}
    {step!==3&&right.map(([x,y])=><g key={`${x}-${y}`} stroke="#efa626" strokeWidth="1.5" fill="none"><ellipse cx={x-23} cy={y-3} rx="14" ry="18"/><path d={`M${x-23} ${y-21} ${x} ${y-18}M${x-23} ${y+15} ${x} ${y+18}`}/></g>)}
    {step===2&&<PlanePoints/>}
  </svg>;
}

export default function ComponentMirrorCopyArtwork({step,japanese}:{step:number;japanese:boolean}) {
  const titles=japanese?['一部の形状をミラーコピーする','構成要素を選ぶ','ミラー平面を指定する','ミラーコピーの結果']:['Mirror Copy Component「一部の形状をミラーコピーする」','Select the Component','Specify the Mirror Plane','Final Result'];
  const screens=[command,selected,plane,result];
  const regions:[number,number,number,number][]=[[1848,505,28,29],[740,380,600,485],[740,380,600,485],[740,380,600,485]];
  const artwork=step===0?<div className="stretch-vector" style={{display:'grid',placeItems:'center'}}><FoundationOperationCommandIcon command="component-mirror-copy" title={titles[step]}/></div>:<BracketArtwork step={step} title={titles[step]}/>;
  return <InterfaceIconPreview index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,screen:screens[step],screenOverlay:step===2?<PlanePoints/>:undefined,region:{bounds:regions[step],landing:regions[step]},highlightColor:'#0087ef'}}/>;
}
