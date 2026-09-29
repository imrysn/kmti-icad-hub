import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import { useId } from 'react';
import InterfaceIconPreview from './InterfaceIconPreview';
import selected from '../../assets/icad-foundations/modeling/component-delete-selected.png';
import result from '../../assets/icad-foundations/modeling/component-delete-result.png';

function BracketArtwork({step,title}:{step:number;title:string}) {
  const id=useId();
  const right=[...(step===1?[[1083,552]]:[]),[1166,545],[1248,537],[1081,740],[1164,733],[1246,724]];
  const left=[[828,519],[910,511],[993,503],[826,707],[908,699],[991,692]];
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
    {step===1&&[[1083,552]].map(([x,y])=><g key={`${x}-${y}`} stroke="#efa626" strokeWidth="1.5" fill="none"><ellipse cx={x-23} cy={y-3} rx="14" ry="18"/><path d={`M${x-23} ${y-21} ${x} ${y-18}M${x-23} ${y+15} ${x} ${y+18}`}/></g>)}
  </svg>;
}

export default function ComponentDeleteArtwork({step,japanese}:{step:number;japanese:boolean}) {
  const titles=japanese?['一部の形状を削除する','削除する構成要素を選ぶ','削除後の結果']:['Delete Component「一部の形状を削除する」','Select the Components to be Deleted','Final Result'];
  const screens=[selected,selected,result];
  const bounds:[number,number,number,number]=step===0?[1848,472,28,29]:[740,380,600,485];
  const artwork=step===0?<div className="stretch-vector" style={{display:'grid',placeItems:'center'}}><FoundationOperationCommandIcon command="component-delete" title={titles[step]}/></div>:<BracketArtwork step={step} title={titles[step]}/>;
  return <InterfaceIconPreview index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,screen:screens[step],region:{bounds,landing:bounds},highlightColor:'#0087ef'}}/>;
}
