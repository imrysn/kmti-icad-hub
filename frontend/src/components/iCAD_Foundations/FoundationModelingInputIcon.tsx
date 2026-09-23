import polygonScreen from '../../assets/icad-foundations/modeling/polygon-input-areas.jpg';
import cylinderScreen from '../../assets/icad-foundations/modeling/cylinder-input-areas.png';
import FoundationShapePlacementIcon, { type PlacementShape } from './FoundationShapePlacementIcon';
import boxScreen from '../../assets/icad-foundations/modeling/box-input-areas.png';
import InterfaceSvgIcon from './InterfaceSvgIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import screen from '../../assets/icad-foundations/modeling/modeling-input-areas.png';
import { PROFESSIONAL_SHAPE_SCREENS } from './professionalShapeScreens';
import './FoundationInterfaceCards.css';
import './FoundationFileMenuIcon.css';

const SHAPE_TITLES: Record<PlacementShape, string> = { box: 'Box (直方体)', cylinder: 'Cylinder (円柱)', polygon: 'Polygonal Prism (正多角柱)', cone: 'Cone (円錐台)', torus: 'Torus (トーラス)' };
const SIZE_FIELDS: Record<PlacementShape, string[][]> = {
  box: [['奥行き','20'],['幅','30'],['高さ','10']],
  cylinder: [['直径','10'],['高さ','10']],
  polygon: [['頂点数','6'],['直径','10'],['高さ','10']],
  cone: [['底面直径','20'],['上面直径','10'],['高さ','20']],
  torus: [['断面直径','10'],['経路半径','50'],['回転角','180']],
};
// Foundations regions on each screen: [Shape Placement icon, Item Entry, Key Entry]. Cone and Torus are iCAD Professional
// only and always use PROFESSIONAL_SHAPE_SCREENS.
const SHAPE_REGIONS: Record<Exclude<PlacementShape, 'cone' | 'torus'>, number[][]> = {
  box: [[1783,165,29,29],[137,1027,438,25],[1753,1027,161,27]],
  cylinder: [[1752,164,27,30],[137,1027,294,27],[1753,1027,161,27]],
  // polygon-input-areas.jpg is 1920 × 1050; y values are scaled to the 1080-high space used by regionStyle.
  polygon: [[1816,164,27,30],[137,1026,397,26],[1753,1028,161,26]],
};

export default function FoundationModelingInputIcon({index,japanese=false,box=false,cylinder=false,polygon=false,cone=false,torus=false,professional=false,previewScreen}:{index:number;japanese?:boolean;box?:boolean;cylinder?:boolean;polygon?:boolean;cone?:boolean;torus?:boolean;professional?:boolean;previewScreen?:string}) {
  const shape: PlacementShape | null = box?'box':cylinder?'cylinder':polygon?'polygon':cone?'cone':torus?'torus':null;
  const pro=shape && (professional || cone || torus) ? PROFESSIONAL_SHAPE_SCREENS[shape] : null;
  const titles=japanese?['アイコンメニュー — 形状配置','項目入力','キー入力','キーボードの Enter']:['Icon Menu — Shape Placement','Item Entry','Key Entry','Enter on the keyboard'];
  const rectangles:number[][]=[[1783,165,29,29],[104,803,1258,24],[1366,803,132,24],[1366,803,132,24]];
  const region=rectangles[index].map((v,i)=>v*(i%2===0?1920/1500:1080/844)) as [number,number,number,number];
  if(shape && index<3) region.splice(0,4,...(pro?[pro.placement,pro.itemEntry,pro.keyEntry][index]:SHAPE_REGIONS[shape as keyof typeof SHAPE_REGIONS][index]));
  const enterKeySvg='<svg xmlns="http://www.w3.org/2000/svg" width="865" height="350" viewBox="0 0 865 350"><rect x="1" y="1" width="863" height="348" rx="24" fill="#4b4b4b"/><path d="M26 27H839V323H26Z" fill="#252525"/><text x="84" y="239" font-family="Arial,sans-serif" font-size="182" fill="white">Enter</text><path d="M762 153V192H619" fill="none" stroke="white" stroke-width="14"/><path d="M584 192L632 165V219Z" fill="white"/></svg>';
  const keyboardScreen='data:image/svg+xml,'+encodeURIComponent(enterKeySvg);
  if(index===3) region.splice(0,4,0,0,1920,1080);
  const fields=shape?SIZE_FIELDS[shape]:[];
  const artwork=shape && index===0 ? <FoundationShapePlacementIcon shape={shape} title={SHAPE_TITLES[shape]}/> : shape && index===1 ? <svg className="foundation-modeling-size-fields" viewBox={`0 0 160 ${fields.length*26+2}`} role="img" aria-label={`Item Entry: ${fields.map(([label,value])=>`${label} ${value}`).join(', ')}`} fontFamily="Meiryo, sans-serif" fontSize="13" fill="#111">
    {fields.map(([label,value],n)=><g key={label} transform={`translate(0 ${n*26})`}><rect x="1" y="1" width="158" height="24" fill="#eee" stroke="#999"/><text x="5" y="18">{label}</text><rect x="65" y="3" width="91" height="20" fill="white" stroke="#999"/><text x="70" y="18">{value}</text><path d="M144 11l4 4 4-4" fill="none" stroke="#777"/></g>)}
  </svg> : shape && index===2 ? <svg viewBox="0 0 144 24" role="img" aria-label="Key Entry: 0 0 0"><rect x="1" y="1" width="142" height="22" fill="white" stroke="#999"/><text x="6" y="17" fontFamily="Arial, sans-serif" fontSize="13" fill="#111">0 0 0</text></svg> : index<3 ? <InterfaceSvgIcon index={index+5} toolbar={false} title={titles[index]}/> : <svg viewBox="0 0 865 350" role="img" aria-label={titles[index]}><rect x="1" y="1" width="863" height="348" rx="24" fill="#4b4b4b"/><path d="M26 27H839V323H26Z" fill="#252525"/><text x="84" y="239" fontFamily="Arial,sans-serif" fontSize="182" fill="white">Enter</text><path d="M762 153V192H619" fill="none" stroke="white" strokeWidth="14"/><path d="M584 192L632 165V219Z" fill="white"/></svg>;
  if(index===3) return <div className="foundation-modeling-input-static foundation-modeling-input-static--enter">{artwork}</div>;
  const shapeScreen=previewScreen ?? (pro?pro.src:polygon?polygonScreen:cylinder?cylinderScreen:box?boxScreen:screen);
  const previewTitle = shape && index === 0 ? (japanese ? (shape === 'box' ? '直方体' : shape === 'cylinder' ? '円柱' : shape === 'polygon' ? '正多角柱' : shape === 'cone' ? '円錐台' : 'トーラス') : SHAPE_TITLES[shape]) : titles[index];
  return <div className={`foundation-file-menu-icon foundation-modeling-input-icon${shape && index === 0 ? ' foundation-modeling-input-icon--shape' : ''}`}><InterfaceIconPreview index={index} toolbar={false} title={previewTitle} japanese={japanese} custom={{artwork,screen:index===3?keyboardScreen:shapeScreen,region:{bounds:region,landing:region},highlightColor:'#0087ef'}}/></div>;
}
