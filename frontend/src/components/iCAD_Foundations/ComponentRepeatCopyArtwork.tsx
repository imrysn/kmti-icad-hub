import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import selected from '../../assets/icad-foundations/modeling/component-repeat-copy-selected.png';
import settings from '../../assets/icad-foundations/modeling/component-repeat-copy-settings.png';
import result from '../../assets/icad-foundations/modeling/component-repeat-copy-result.png';

export function componentCopyComparisonIcons() {
  return (["component-copy","component-repeat-copy"] as const).map(command=><svg key={command} width="36" height="36" viewBox="0 0 76 76"><FoundationOperationCommandIcon command={command} title={command}/></svg>);
}

function PlateArtwork({final,title}:{final:boolean;title:string}) {
  // Trace the supplied plate, its edge steps, and the visible hole positions.
  const holes=final?[[795,693],[874,739],[952,602],[1030,647],[1109,512],[1187,557],[1265,422],[1344,467]]:[[795,693],[874,739]];
  return <svg className="stretch-vector" viewBox="710 370 720 475" role="img" aria-label={title}>
    <g stroke="#858a91" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M744 694 1265 392 1396 468 874 770Z" fill="#fff"/>
      <path d="M874 770 1396 468V480L874 782Z" fill="#ddd"/>
      <path d="M874 782 1396 480 1410 492 887 794Z" fill="#fff"/>
      <path d="M887 794 1410 492V522L887 824Z" fill="#e5e5e5"/>
      <path d="M744 694V706L731 704V734L887 824V794L874 782V770Z" fill="#aaa"/>
      {holes.map(([x,y])=><g key={`${x}-${y}`}>
        <ellipse cx={x} cy={y} rx="14" ry="8" fill="#16ad32" stroke="#398348"/>
        {!final&&<g stroke="#efa626" fill="none"><path d={`M${x-11} ${y}v49m22 -49v49`}/><ellipse cx={x} cy={y+49} rx="14" ry="8"/><ellipse cx={x} cy={y+58} rx="10" ry="7"/></g>}
      </g>)}
    </g>
  </svg>;
}

function CopySettings({title}:{title:string}) {
  return <svg className="stretch-vector stretch-vector--entry" viewBox="0 0 700 40" role="img" aria-label={title}>
    <rect x="1" y="1" width="698" height="38" fill="#eee" stroke="#aaa"/>
    {['移動量X','移動量Y','移動量Z','個数'].map((label,index)=><g key={label} transform={`translate(${index*175} 0)`}>
      <text x="5" y="26" fontSize="15">{label}</text><rect x="70" y="6" width="95" height="28" fill="white" stroke={index===3?'#0788ed':'#aaa'}/><text x="77" y="26" fontSize="17">{['0.0','0.0','-30.0','3'][index]}</text>
    </g>)}
  </svg>;
}

export default function ComponentRepeatCopyArtwork({step,japanese}:{step:number;japanese:boolean}) {
  const titles=japanese?['一部の形状を連続コピーする','構成要素を選ぶ','X・Y・Zの移動量と個数を指定する','連続コピーの結果']:['Repeat Copy Component「一部の形状を連続コピーする」','Select the Component','Specify X/Y/Z Distances and Number of Copies','Final Result'];
  const screens=[selected,selected,settings,result];
  const regions:[number,number,number,number][]=[[1816,472,28,29],[710,370,720,475],[136,1025,650,29],[710,370,720,475]];
  const artwork=step===0?<div className="stretch-vector" style={{display:'grid',placeItems:'center'}}><FoundationOperationCommandIcon command="component-repeat-copy" title={titles[step]}/></div>:step===2?<CopySettings title={titles[step]}/>:<PlateArtwork final={step===3} title={titles[step]}/>;
  return <InterfaceIconPreview index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,screen:screens[step],region:{bounds:regions[step],landing:regions[step]},highlightColor:'#0087ef'}}/>;
}
