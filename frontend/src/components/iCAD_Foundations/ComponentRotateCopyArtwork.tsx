import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import { useId } from 'react';
import InterfaceIconPreview from './InterfaceIconPreview';
import command from '../../assets/icad-foundations/modeling/component-move-command.png';
import selected from '../../assets/icad-foundations/modeling/component-rotate-copy-selected.png';
import axis from '../../assets/icad-foundations/modeling/component-rotate-copy-axis.png';
import angle from '../../assets/icad-foundations/modeling/component-rotate-copy-angle.png';
import result from '../../assets/icad-foundations/modeling/component-rotate-copy-result.png';

export function componentRotateComparisonIcons() {
  return (["component-rotate","component-rotate-copy"] as const).map(command=><svg key={command} width="36" height="36" viewBox="0 0 76 76"><FoundationOperationCommandIcon command={command} title={command}/></svg>);
}

function AxisPoints() {
  return <g fill="#d71920" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="28">
    <path d="M795 728 1406 376" stroke="#d71920" strokeWidth="2" strokeDasharray="7 6"/>
    <circle cx="795" cy="728" r="7"/><text x="750" y="711">P1</text>
    <circle cx="1406" cy="376" r="7"/><text x="1371" y="351">P2</text>
  </g>;
}

function FlangeArtwork({step,title}:{step:number;title:string}) {
  const id=useId();
  // Contours and hole centers follow the supplied selected and final screenshots.
  // The final screenshot is shifted left/down relative to the selection screenshot.
  const final=step===4;
  const holes=final?[[981,514],[890,567],[1073,672],[981,725]]:[[981,514]];
  return <svg className="stretch-vector" viewBox="730 315 720 525" role="img" aria-label={title}>
    <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#aaa"/><stop offset=".4" stopColor="#fff"/><stop offset=".7" stopColor="#fff"/><stop offset="1" stopColor="#bbb"/></linearGradient></defs>
    <g transform={final?'translate(-44 36)':undefined} stroke="#858a91" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M1040 462 1225 352 C1272 326 1324 387 1346 438 C1370 491 1360 526 1341 543L1148 654Z" fill={`url(#${id})`}/>
      <path d="M896 458 954 431 C1026 425 1115 521 1143 622 C1167 699 1135 756 1091 776L1046 787Z" fill="#fafafa"/>
      <path d="M896 458 C957 424 1046 496 1090 595 C1137 697 1113 771 1060 786 C995 803 910 724 870 634 C836 553 853 481 896 458Z" fill="#aaa"/>
      <path d="M953 554 C982 546 1017 579 1031 621 C1046 662 1027 691 1005 686 C978 682 948 648 936 616 C927 588 935 562 953 554Z" fill={`url(#${id})`}/>
      {holes.map(([x,y])=><ellipse key={`${x}-${y}`} cx={x} cy={y} rx="9" ry="14" transform={`rotate(-30 ${x} ${y})`} fill="#20ce37" stroke="#398348"/>)}
      {!final&&<g stroke="#efa626" fill="none"><path d="M973 503 1013 480M987 526 1025 504"/><ellipse cx="1019" cy="492" rx="9" ry="14" transform="rotate(-30 1019 492)"/><ellipse cx="978" cy="517" rx="13" ry="17" transform="rotate(-30 978 517)"/></g>}
    </g>
    {step===2&&<AxisPoints/>}
  </svg>;
}

export default function ComponentRotateCopyArtwork({step,japanese}:{step:number;japanese:boolean}) {
  const titles=japanese?['一部の形状を回転コピーする','構成要素を選ぶ','回転軸を設定する','回転角度を指定する','回転コピーの結果']:['Rotate Copy Component「一部の形状を回転コピーする」','Select the Component','Set the Axis of Rotation','Specify the Rotation Angle','Final Result'];
  const screens=[command,selected,axis,angle,result];
  const regions:[number,number,number,number][]=[[1784,505,28,29],[830,325,550,480],[730,315,720,525],[136,1025,175,30],[780,360,560,485]];
  const artwork=step===0?<div className="stretch-vector" style={{display:'grid',placeItems:'center'}}><FoundationOperationCommandIcon command="component-rotate-copy" title={titles[step]}/></div>:step===3?<svg className="stretch-vector stretch-vector--entry" viewBox="0 0 220 40" role="img" aria-label={titles[step]}><rect x="1" y="1" width="218" height="38" fill="#eee" stroke="#aaa"/><text x="8" y="26" fontSize="15">回転角度</text><rect x="84" y="6" width="122" height="28" fill="white" stroke="#0788ed"/><text x="91" y="26" fontSize="17">90</text></svg>:<FlangeArtwork step={step} title={titles[step]}/>;
  return <InterfaceIconPreview index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,screen:screens[step],screenOverlay:step===2?<AxisPoints/>:undefined,region:{bounds:regions[step],landing:regions[step]},highlightColor:'#0087ef'}}/>;
}
