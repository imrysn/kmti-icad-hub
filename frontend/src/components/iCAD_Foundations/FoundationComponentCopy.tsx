import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import { useId } from 'react';
import selected from '../../assets/icad-foundations/modeling/component-copy-selected.png';
import distance from '../../assets/icad-foundations/modeling/component-copy-distance.png';
import result from '../../assets/icad-foundations/modeling/component-copy-result.png';
import FoundationStretchSteps from './FoundationStretchSteps';
import InterfaceIconPreview from './InterfaceIconPreview';
import './FoundationStretchSteps.css';

function CopyArtwork({step,title}:{step:number;title:string}) {
  const id=useId();
  if(step===2) return <svg className="stretch-vector stretch-vector--entry" viewBox="0 0 700 40" role="img" aria-label={title}>
    <rect x="1" y="1" width="698" height="38" fill="#eee" stroke="#aaa"/>
    {['X','Y','Z','個数'].map((axis,i)=><g key={axis} transform={`translate(${i*175} 0)`} fontFamily="Arial,sans-serif" fontSize="14" fill="#111">
      <text x="5" y="25">{i===3?'個数':`移動量${axis}`} </text><rect x="69" y="7" width="94" height="26" fill="white" stroke={i===1?'#168bff':'#999'}/>
      {i===1&&<rect x="73" y="10" width="40" height="20" fill="#168bff"/>}<text x="74" y="25" fill={i===1?'white':'#111'}>{i===1?'-44.0':i===3?'1':'0.0'}</text>
      <path d="m166 18 6 0-3 5Z"/>
    </g>)}
  </svg>;
  // Visible faces and hole contours traced from the supplied selected/result views.
  const hole='M1091 556 C1122 550 1137 585 1116 631 C1095 676 1060 704 1036 690 C1007 677 1014 638 1033 605 C1053 574 1076 555 1091 556Z';
  return <svg className="stretch-vector" viewBox="890 335 310 555" role="img" aria-label={title}>
    <defs>
      <mask id={`${id}-hole`} maskUnits="userSpaceOnUse" x="890" y="335" width="310" height="555"><rect x="890" y="335" width="310" height="555" fill="white"/><path d={hole} fill="black"/></mask>
      <clipPath id={`${id}-inner`}><path d={hole}/></clipPath>
      <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#999"/><stop offset="1" stopColor="#fff"/></linearGradient>
    </defs>
    <g stroke="#858a91" strokeWidth="1" strokeLinejoin="round">
      <path d="M940 474 1136 360 1169 379 974 493Z" fill="#fff"/>
      <path d="M940 474 974 493V870L940 851Z" fill="#aaa"/>
      <path d="M974 493 1169 379V757L974 870Z" fill="#e5e5e5" mask={`url(#${id}-hole)`}/>
      <path d="M1091 550 C1102 590 1072 657 1019 670 L1028 707 1138 692 1145 552Z" fill={`url(#${id}-wall)`} clipPath={`url(#${id}-inner)`}/>
      <path d={hole} fill="none"/>
      {step===3?<><ellipse cx="992" cy="504" rx="10" ry="16" transform="rotate(27 992 504)" fill="#16ad32" stroke="#398348"/><ellipse cx="992" cy="836" rx="10" ry="16" transform="rotate(27 992 836)" fill="#16ad32" stroke="#398348"/></>:<g stroke="#efa626" transform="translate(0 0)">
        <path d="M939 463 995 490 990 517 936 489Z" fill="#e5e5e5"/>
        <path d="M939 463 949 463 1002 492 995 490Z" fill="#fff"/>
        <ellipse cx="992" cy="504" rx="10" ry="15" transform="rotate(25 992 504)" fill="#16ad32"/>
        <ellipse cx="939" cy="475" rx="11" ry="16" transform="rotate(25 939 475)" fill="none"/>
        <path d="M930 462 948 488M926 477 950 474" fill="none"/>
      </g>}
    </g>
  </svg>;
}

function StepPreview({step,japanese}:{step:number;japanese:boolean}) {
  const screens=[selected,selected,distance,result];
  const titles=japanese?['一部の形状をコピーする','構成要素を選ぶ','X・Y・Zの移動量と個数を入力する','コピー後の構成要素']:['Copy Component「一部の形状をコピーする」','Select the Component','Enter Copy Distances and Number','Final Result'];
  const regions:[number,number,number,number][]=[[1784,472,28,29],[915,347,268,537],[136,1025,650,29],[915,347,268,537]];
  const artwork=step===0?<div className="stretch-vector" style={{display:'grid',placeItems:'center'}}><FoundationOperationCommandIcon command="component-copy" title={titles[step]}/></div>:<CopyArtwork step={step} title={titles[step]}/>;
  return <InterfaceIconPreview index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,screen:screens[step],region:{bounds:regions[step],landing:regions[step]},highlightColor:'#0087ef'}}/>;
}
export default function FoundationComponentCopy({text,japanese=false}:{text:string;japanese?:boolean}) {
  const steps=text.split('\n').filter(line=>line.startsWith('- ')).map((line,index)=>{
    const match=line.match(/^- \*\*(.*?)\*\*\s*—\s*(.*)$/);
    return match ? `**${japanese?'ステップ':'Step'} ${index+1} — ${match[1]}**\n${match[2]}` : line;
  }).join('\n\n');
  return <FoundationStretchSteps text={steps} method={1} japanese={japanese} customIcons={[0,1,2,3].map(step=><StepPreview key={step} step={step} japanese={japanese}/>)}/>;
}
