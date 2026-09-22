import { useId } from 'react';
import { SelectionPointer } from './CurrentOriginIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import OperationMenuSvg, { type OperationTopic } from './OperationMenuSvg';
import './FoundationFileMenuIcon.css';
import copyInput from '../../assets/icad-foundations/modeling/professional/copy-input.png';
import copy2 from '../../assets/icad-foundations/modeling/professional/copy-2.png';
import copy3 from '../../assets/icad-foundations/modeling/professional/copy-3.png';
import rotate2 from '../../assets/icad-foundations/modeling/professional/rotate-2.png';
import rotate3 from '../../assets/icad-foundations/modeling/professional/rotate-3.png';
import rotateCopyInput from '../../assets/icad-foundations/modeling/professional/rotateCopy-input.png';
import rotateCopy2 from '../../assets/icad-foundations/modeling/professional/rotateCopy-2.png';
import rotateCopy3 from '../../assets/icad-foundations/modeling/professional/rotateCopy-3.png';
import mirrorInput from '../../assets/icad-foundations/modeling/professional/mirror-input.png';
import mirror2 from '../../assets/icad-foundations/modeling/professional/mirror-2.png';
import mirror3 from '../../assets/icad-foundations/modeling/professional/mirror-3.png';
import mirrorCopy1 from '../../assets/icad-foundations/modeling/professional/mirrorCopy-1.png';
import mirrorCopy2 from '../../assets/icad-foundations/modeling/professional/mirrorCopy-2.png';
import mirrorCopy3 from '../../assets/icad-foundations/modeling/professional/mirrorCopy-3.png';
import delete1 from '../../assets/icad-foundations/modeling/professional/delete-1.png';
import delete2 from '../../assets/icad-foundations/modeling/professional/delete-2.png';
import delete3 from '../../assets/icad-foundations/modeling/professional/delete-3.png';
type Topic = Exclude<OperationTopic, 'move'>;
type Region = [number,number,number,number];
const screens: Record<Topic,string[]> = {
  copy: [copy2,copyInput,copyInput,copy3],
  rotate: [rotate2,rotate2,rotate2,rotate3],
  rotateCopy: [rotateCopy2,rotateCopyInput,rotateCopyInput,rotateCopy3],
  mirror: [mirror2,mirrorInput,mirrorInput,mirror3],
  mirrorCopy: [mirrorCopy2,mirrorCopy1,mirrorCopy2,mirrorCopy3],
  delete: [delete2,delete1,delete2,delete3],
};
// Highlight coordinates use the shared 1920 × 1080 reference space, including 720p captures.
const commandRegions: Record<Topic,Region> = {
 copy:[1776,325,36,34], rotate:[1750,451,32,33], mirror:[2,806,128,26],
 rotateCopy:[3,726,124,25], mirrorCopy:[3,744,124,27], delete:[1848,414,38,35],
};
const workspaces: Record<Topic,Region> = {
 copy:[637,270,854,666], rotate:[508,315,438,315], mirror:[570,350,1160,670],
 rotateCopy:[700,470,540,300], mirrorCopy:[560,260,950,650], delete:[550,260,980,660],
};
export default function FoundationOperationPreview({topic,index,title,japanese=false}: {
 topic:Topic;index:number;title:string;japanese?:boolean;
}) {
 const clipId=useId();
 const screen=screens[topic][index];
 const showAxisPoints=(topic==='rotate' || topic==='rotateCopy') && index===2;
 const showMirrorPoints=topic==='mirror' && index===2;
 const axisPoints=topic==='rotateCopy' ? [[1054,466],[1054,702]] : [[726,617],[907,515]];
 const region: Region=showAxisPoints
  ? topic==='rotateCopy' ? [680,430,555,415] : [508,315,555,435]
  : index===0 ? commandRegions[topic]
  : topic==='rotateCopy' ? index===3 ? [746,363,621,435] : [688,455,495,259]
  : topic==='rotate' && index===3 ? [714,262,276,422]
  : showMirrorPoints ? [725,380,650,510]
  : topic==='mirror' && index===1 ? [725,380,550,395]
  : topic==='mirror' && index===3 ? [985,530,552,395]
  : index===2 && topic==='copy' ? [137,1025,653,29]
  : index===1 && topic==='copy' ? [638,270,185,279]
  : workspaces[topic];
 const [x,y,width,height]=region;
 const mirrorCopyMarkers=topic==='mirrorCopy' && index===2 && [[803,744],[803,698],[1260,422]].map(([px,py],n)=><g key={n} transform={`translate(${px} ${py}) scale(1.4)`}>
   <circle r="4" fill="#ff1616" stroke="#fff" strokeWidth="1"/>
   <text x={n===0 ? -12 : 10} y={n===0 ? 25 : -12} textAnchor={n===0 ? 'end' : 'start'} fontSize="28" fontWeight="700" fill="#e00000" stroke="#fff" strokeWidth="1.5" paintOrder="stroke">P{n+1}</text>
  </g>);
 const artwork=index===0 ? <OperationMenuSvg topic={topic}/> : topic==='copy' && index===2 ? <svg className="foundation-operation-thumbnail" viewBox="0 0 180 104" role="img" aria-label={title}>
  {['移動量X','移動量Y','移動量Z','個数'].map((label,n)=><g key={label} transform={`translate(0 ${n*26})`}>
   <rect x="1" y="1" width="178" height="24" fill="#eee" stroke="#999"/>
   <text x="5" y="18" fontFamily="Meiryo,sans-serif" fontSize="13" fill="#111">{label}</text>
   <rect x="85" y="3" width="90" height="20" fill="white" stroke="#aaa"/>
   <text x="92" y="18" fontSize="13" fill="#111">{[0,0,50,3][n]}</text>
  </g>)}
 </svg> : <svg className="foundation-operation-thumbnail" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
  <defs><clipPath id={clipId}><rect width={width} height={height}/></clipPath></defs>
  <g clipPath={`url(#${clipId})`}><image href={screen} x={-x} y={-y} width="1920" height="1080"/></g>
  {showAxisPoints && axisPoints.map(([px,py],n)=><g key={n} transform={`translate(${px-x} ${py-y}) scale(1.4)`}>
   <circle r="18" fill="#ff1616" stroke="#fff" strokeWidth="5"/>
   <SelectionPointer x={0} y={0}/>
  </g>)}
  {showMirrorPoints && [[1000,694],[1000,759],[1226,629]].map(([px,py],n)=><g key={n} transform={`translate(${px-x} ${py-y}) scale(1.4)`}>
   <circle r="18" fill="#ff1616" stroke="#fff" strokeWidth="5"/>
   <text x="-25" y="8" textAnchor="end" fontSize="28" fontWeight="700" fill="#e00000" stroke="#fff" strokeWidth="3" paintOrder="stroke">P{n+1}</text>
   <SelectionPointer x={0} y={0} above={n===0}/>
  </g>)}
  <g transform={`translate(${-x} ${-y})`}>{mirrorCopyMarkers}</g>
 </svg>;
 return <div className="foundation-file-menu-icon foundation-operation-preview">
  <InterfaceIconPreview index={index} toolbar={false} title={title} japanese={japanese}
   custom={{artwork,screen,screenOverlay:mirrorCopyMarkers,region:{bounds:region,landing:region},highlightColor:'#0087ef'}}/>
 </div>;
}
