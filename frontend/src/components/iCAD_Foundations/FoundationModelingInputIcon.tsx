import polygonScreen from '../../assets/icad-foundations/polygon-input-areas.png';
import cylinderScreen from '../../assets/icad-foundations/cylinder-input-areas.png';
import FoundationShapePlacementIcon from './FoundationShapePlacementIcon';
import boxScreen from '../../assets/icad-foundations/box-input-areas.png';
import InterfaceSvgIcon from './InterfaceSvgIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import screen from '../../assets/icad-foundations/modeling-input-areas.png';
import './FoundationInterfaceCards.css';
import './FoundationFileMenuIcon.css';

export default function FoundationModelingInputIcon({index,japanese=false,box=false,cylinder=false,polygon=false}:{index:number;japanese?:boolean;box?:boolean;cylinder?:boolean;polygon?:boolean}) {
  const titles=japanese?['アイコンメニュー — 形状配置','項目入力','キー入力','キーボードの Enter']:['Icon Menu — Shape Placement','Item Entry','Key Entry','Enter on the keyboard'];
  const rectangles:number[][]=[[1365,110,103,95],[104,803,1258,24],[1366,803,132,24],[1366,803,132,24]];
  const region=rectangles[index].map((v,i)=>v*(i%2===0?1920/1500:1080/844)) as [number,number,number,number];
  if(box) {
    const boxRegions=[[1784,158,29,31],[137,1027,438,25],[1753,1027,161,27]];
    if(index<3) region.splice(0,4,...boxRegions[index].map(v=>v));
  }
  if(cylinder && index<3) region.splice(0,4,...[[1752,157,28,32],[137,1027,294,27],[1753,1027,161,27]][index]);
  if(polygon && index<3) region.splice(0,4,...[[1816,157,29,32],[137,1027,397,27],[1753,1027,161,27]][index]);
  const enterKeySvg='<svg xmlns="http://www.w3.org/2000/svg" width="865" height="350" viewBox="0 0 865 350"><rect x="1" y="1" width="863" height="348" rx="24" fill="#4b4b4b"/><path d="M26 27H839V323H26Z" fill="#252525"/><text x="84" y="239" font-family="Arial,sans-serif" font-size="182" fill="white">Enter</text><path d="M762 153V192H619" fill="none" stroke="white" stroke-width="14"/><path d="M584 192L632 165V219Z" fill="white"/></svg>';
  const keyboardScreen='data:image/svg+xml,'+encodeURIComponent(enterKeySvg);
  if(index===3) region.splice(0,4,0,0,1920,1080);
  const artwork=(box||cylinder||polygon) && index===0 ? <FoundationShapePlacementIcon shape={box?'box':cylinder?'cylinder':'polygon'} title={box?'Box (直方体)':cylinder?'Cylinder (円柱)':'Polygonal Prism (正多角柱)'}/> : (box||cylinder||polygon) && index===1 ? <svg className="foundation-modeling-size-fields" viewBox={`0 0 160 ${cylinder?54:80}`} role="img" aria-label={box?'Item Entry: 奥行き 20, 幅 30, 高さ 10':cylinder?'Item Entry: 直径 10, 高さ 10':'Item Entry: 頂点数 6, 直径 10, 高さ 10'} fontFamily="Meiryo, sans-serif" fontSize="13" fill="#111">
    {(box?[['奥行き','20'],['幅','30'],['高さ','10']]:cylinder?[['直径','10'],['高さ','10']]:[['頂点数','6'],['直径','10'],['高さ','10']]).map(([label,value],n)=><g key={label} transform={`translate(0 ${n*26})`}><rect x="1" y="1" width="158" height="24" fill="#eee" stroke="#999"/><text x="5" y="18">{label}</text><rect x="65" y="3" width="91" height="20" fill="white" stroke="#999"/><text x="70" y="18">{value}</text><path d="M144 11l4 4 4-4" fill="none" stroke="#777"/></g>)}
  </svg> : (box||cylinder||polygon) && index===2 ? <svg viewBox="0 0 144 24" role="img" aria-label="Key Entry: 0 0 0"><rect x="1" y="1" width="142" height="22" fill="white" stroke="#999"/><text x="6" y="17" fontFamily="Arial, sans-serif" fontSize="13" fill="#111">0 0 0</text></svg> : index<3 ? <InterfaceSvgIcon index={index+5} toolbar={false} title={titles[index]}/> : <svg viewBox="0 0 865 350" role="img" aria-label={titles[index]}><rect x="1" y="1" width="863" height="348" rx="24" fill="#4b4b4b"/><path d="M26 27H839V323H26Z" fill="#252525"/><text x="84" y="239" fontFamily="Arial,sans-serif" fontSize="182" fill="white">Enter</text><path d="M762 153V192H619" fill="none" stroke="white" strokeWidth="14"/><path d="M584 192L632 165V219Z" fill="white"/></svg>;
  if(index===3) return <div className="foundation-modeling-input-static foundation-modeling-input-static--enter">{artwork}</div>;
  return <div className="foundation-file-menu-icon foundation-modeling-input-icon"><InterfaceIconPreview index={index} toolbar={false} title={box && index===0 ? (japanese?'直方体':'Box — 直方体') : titles[index]} japanese={japanese} custom={{artwork,screen:index===3?keyboardScreen:polygon?polygonScreen:cylinder?cylinderScreen:box?boxScreen:screen,region:{bounds:region,landing:region},aspectRatio:index===3?865/350:(box||cylinder||polygon)?1920/1080:1500/844,highlightColor:'#0087ef'}}/></div>;
}
