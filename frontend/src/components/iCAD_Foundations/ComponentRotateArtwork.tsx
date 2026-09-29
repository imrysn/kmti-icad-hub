import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import { useId } from 'react';
import InterfaceIconPreview from './InterfaceIconPreview';
import command from '../../assets/icad-foundations/modeling/component-move-command.png';
import selected from '../../assets/icad-foundations/modeling/component-rotate-selected.png';
import axis from '../../assets/icad-foundations/modeling/component-rotate-axis.png';
import angle from '../../assets/icad-foundations/modeling/component-rotate-angle.png';
import result from '../../assets/icad-foundations/modeling/component-rotate-result.png';

function AxisPoints() {
  return <g fill="#d71920" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="28">
    <path d="M841 717 1302 452" stroke="#d71920" strokeWidth="2" strokeDasharray="7 6"/>
    <circle cx="841" cy="717" r="7"/><text x="795" y="702">P1</text>
    <circle cx="1302" cy="452" r="7"/><text x="1312" y="440">P2</text>
  </g>;
}

function RingArtwork({step,title}:{step:number;title:string}) {
  const id=useId();
  // Contours follow the supplied ring screenshots; Step 5 is the supplied copy reference.
  const bore='M960 494 C1004 482 1061 529 1092 601 C1122 669 1114 724 1079 740 C1037 763 976 712 943 647 C909 580 905 520 960 494Z';
  return <svg className="stretch-vector" viewBox="775 330 590 530" role="img" aria-label={title}>
    <defs><mask id={id}><rect x="775" y="330" width="590" height="530" fill="white"/><path d={bore} fill="black"/></mask></defs>
    <g stroke="#858a91" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M905 418 1001 358 C1080 321 1183 425 1239 536 C1294 647 1282 733 1221 773 L1127 817Z" fill="#fafafa"/>
      <path d="M905 418 C982 376 1092 478 1144 590 C1197 701 1184 788 1127 817 C1052 860 939 762 882 649 C827 539 845 451 905 418Z" fill="#aaa" mask={`url(#${id})`}/>
      <path d={bore} fill="none"/>
      <ellipse cx="1062" cy="402" rx="20" ry="11" fill="#16ad32" stroke="#398348"/>
      {step===4?<ellipse cx="1225" cy="684" rx="12" ry="19" transform="rotate(28 1225 684)" fill="#16ad32" stroke="#398348"/>:<g stroke="#efa626" fill="none"><path d="M1047 402V473M1077 402V473"/><ellipse cx="1062" cy="473" rx="20" ry="11"/></g>}
    </g>
    {step===2&&<AxisPoints/>}
  </svg>;
}

export default function ComponentRotateArtwork({step,japanese}:{step:number;japanese:boolean}) {
  const titles=japanese?['一部の形状を回転する','構成要素を選ぶ','回転軸を設定する','回転角度を指定する','参考：回転コピーの結果']:['Rotate Component「一部の形状を回転する」','Select the Component','Set the Axis of Rotation','Specify the Rotation Angle','Reference: Rotate Copy result'];
  const screens=[command,selected,axis,angle,result];
  const regions:[number,number,number,number][]=[[1752,505,28,29],[825,330,510,515],[780,330,585,530],[136,1025,173,30],[825,330,510,515]];
  const artwork=step===0?<div className="stretch-vector" style={{display:'grid',placeItems:'center'}}><FoundationOperationCommandIcon command="component-rotate" title={titles[step]}/></div>:step===3?<svg className="stretch-vector stretch-vector--entry" viewBox="0 0 220 40" role="img" aria-label={titles[step]}><rect x="1" y="1" width="218" height="38" fill="#eee" stroke="#aaa"/><text x="8" y="26" fontSize="15">回転角度</text><rect x="84" y="6" width="122" height="28" fill="white" stroke="#0788ed"/><text x="91" y="26" fontSize="17">90</text></svg>:<RingArtwork step={step} title={titles[step]}/>;
  return <InterfaceIconPreview index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,screen:screens[step],screenOverlay:step===2?<AxisPoints/>:undefined,region:{bounds:regions[step],landing:regions[step]},highlightColor:'#0087ef'}}/>;
}
