import InterfaceIconPreview from './InterfaceIconPreview';
import OperationMenuSvg from './OperationMenuSvg';
import moveScreen from '../../assets/icad-foundations/modeling/professional/move.png';
import pointsScreen from '../../assets/icad-foundations/modeling/professional/move-points.png';
import './FoundationFileMenuIcon.css';

// User-supplied 1920 × 1080 screenshots for numeric and point-to-point movement.
const regions: [number, number, number, number][] = [
  [1750, 420, 32, 33], [830, 404, 495, 403],
  [137, 1026, 526, 27], [704, 340, 706, 504],
];
const crops: [number, number, number, number][] = [
  [1748, 398, 133, 183], regions[1], regions[2], regions[3],
];
export default function FoundationMovePreview({index, japanese=false}: {index:number; japanese?:boolean}) {
  const screen=index===3?pointsScreen:moveScreen;
  const title=(japanese?['平行移動','対象を選択','移動量 X・Y・Z','基準点で移動']:['Select Move','Select the entity','Movement X, Y, Z','Move using a reference point'])[index];
  const region=regions[index];
  const artwork=index===0 ? <OperationMenuSvg topic="move"/> : index===2 ? <svg viewBox="0 0 180 78" role="img" aria-label={title}>
    {['X','Y','Z'].map((axis,n)=><g key={axis} transform={`translate(0 ${n*26})`}>
      <rect x="1" y="1" width="178" height="24" fill="#eee" stroke="#999"/>
      <text x="5" y="18" fontFamily="Meiryo,sans-serif" fontSize="13" fill="#111">移動量{axis}</text>
      <rect x="85" y="3" width="90" height="20" fill="white" stroke="#aaa"/>
      <text x="92" y="18" fontSize="13" fill="#111">{[10,60,10][n]}</text>
    </g>)}
  </svg> : <svg viewBox={crops[index].join(' ')} role="img" aria-label={title}>
    <image href={screen} width="1920" height="1080"/>
    {index===0 && <rect x={region[0]+1} y={region[1]+1} width={region[2]-2} height={region[3]-2} fill="none" stroke="#0087ef" strokeWidth="2"/>}
  </svg>;
  return <div className={`foundation-file-menu-icon foundation-move-preview foundation-move-preview--${index}`}>
    <InterfaceIconPreview index={index} toolbar={false} title={title} japanese={japanese} custom={{artwork,screen,region:{bounds:region,landing:region},highlightColor:'#0087ef'}}/>
  </div>;
}
