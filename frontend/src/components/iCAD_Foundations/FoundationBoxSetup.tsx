import polygonScreen from '../../assets/icad-foundations/polygon-input-areas.jpg';
import cylinderScreen from '../../assets/icad-foundations/cylinder-input-areas.png';
import ToolbarReferenceSvg from './ToolbarReferenceSvg';
import InterfaceIconPreview from './InterfaceIconPreview';
import screen from '../../assets/icad-foundations/box-input-areas.png';
import './FoundationFileMenuIcon.css';

export default function FoundationBoxSetup({japanese=false,orientation=false,iconOnly=false,cylinder=false,polygon=false}:{japanese?:boolean;orientation?:boolean;iconOnly?:boolean;cylinder?:boolean;polygon?:boolean}) {
 return <section className={`foundation-box-setup${orientation ? ' foundation-box-setup--orientation' : ''}`}>
  {!orientation && !iconOnly && <h5>{japanese?'始める前に':'Before You Begin'}</h5>}
  <div className="foundation-box-setup__controls" style={{gridTemplateColumns:'1fr'}}>{[orientation?1:0].map(index=>{
   const title=index===0?(japanese?'正面図':'Front View'):(japanese?'Y 方向':'Y Orientation');
   // polygon-input-areas.jpg is 1920 × 1050; its y values are scaled to the 1080-high space used by regionStyle.
   const rect=index===0?(polygon?[844,45,23,26]:[844,44,23,25]):polygon?[35,943,30,17]:cylinder?[35,914,30,19]:[35,932,30,19];
   const region=rect.map(v=>v) as [number,number,number,number];
   const artwork=index===0?<ToolbarReferenceSvg index={4} title={title} highlightFront/>:<svg viewBox="0 0 123 24" role="img" aria-label={title}><defs><linearGradient id="box-orientation-gray" x2="0" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#d3d3d3"/></linearGradient></defs>{['X','Y','Z','面'].map((label,n)=><g key={label}><rect x={1+n*30.5} y="5" width="28" height="16" rx="4" fill="url(#box-orientation-gray)" stroke={n===1?'#e6b800':'#969696'} strokeWidth={n===1?2:'.7'}/><text x={15+n*30.5} y="17" textAnchor="middle" fontFamily="Arial,Meiryo,sans-serif" fontSize="12" fill="#111">{label}</text></g>)}</svg>;
   return <div key={title}><div className="foundation-file-menu-icon"><InterfaceIconPreview index={index} toolbar={false} title={title} japanese={japanese} custom={{artwork,screen:polygon?polygonScreen:cylinder?cylinderScreen:screen,region:{bounds:region,landing:region},aspectRatio:polygon?1920/1050:1920/1080,highlightColor:'#0087ef'}}/></div>{!iconOnly && <p>{index===0?(japanese?'この練習は正面図から始めます。':'Start this exercise in Front View.'):(japanese?'画面左側のコマンドメニューに方向ボタンが表示されます。Y を選び、ステップ 2 で寸法を入力します。':'The orientation buttons now appear in the Command Menu on the left. Select Y, then enter the size in Step 2.')}</p>}</div>;
  })}</div>
 </section>;
}
