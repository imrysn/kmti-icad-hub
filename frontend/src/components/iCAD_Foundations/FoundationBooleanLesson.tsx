import intersectCommandOriginal from '../../assets/icad-foundations/modeling/intersect-command-original.png';
import intersectSelected from '../../assets/icad-foundations/modeling/intersect-selected.png';
import intersectResult from '../../assets/icad-foundations/modeling/intersect-result.png';
import subtractBefore from '../../assets/icad-foundations/modeling/subtract-before.png';
import subtractSelected from '../../assets/icad-foundations/modeling/subtract-selected.png';
import subtractAfter from '../../assets/icad-foundations/modeling/subtract-after.png';
import unionBefore from '../../assets/icad-foundations/modeling/union-before.png';
import unionSelected from '../../assets/icad-foundations/modeling/union-selected.png';
import unionAfter from '../../assets/icad-foundations/modeling/union-after.png';
import FoundationViewComparison from './FoundationViewComparison';
import InterfaceIconPreview from './InterfaceIconPreview';
import image0 from '../../assets/3d-images/boolean1_union.png';
import image1 from '../../assets/3d-images/boolean1_select3d.png';
import image2 from '../../assets/3d-images/boolean1_subtract.png';
import image3 from '../../assets/3d-images/boolean1_subtract_entity.png';
import image4 from '../../assets/3d-images/boolean1_subtract_after_subtraction.png';
import image5 from '../../assets/3d-images/boolean1_subtract_retain_entities.png';
import image6 from '../../assets/3d-images/boolean1_boolean_subtract.png';
import image7 from '../../assets/3d-images/boolean2_intersect.png';
import image8 from '../../assets/3d-images/boolean2_intersecting_entities.png';
import image9 from '../../assets/3d-images/boolean2_component.png';
import image10 from '../../assets/3d-images/boolean2_component_separated.png';
import image11 from '../../assets/3d-images/boolean2_component_select_ok.png';
import image12 from '../../assets/3d-images/boolean2_component_separate_all_components.png';
import image13 from '../../assets/3d-images/boolean2_select_entity.png';
import image14 from '../../assets/3d-images/boolean2_select_ok.png';
import FoundationUsesCards from './FoundationUsesCards';
import './FoundationBooleanLesson.css';
import './FoundationStretchSteps.css';
const samples:Record<string,number[][]>={union:[[0,1]],subtract:[[2,3],[4],[5,6]],intersect:[[7,8]],separate:[[9,10,11],[12,13,14]]};
const images=[image0,image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,image11,image12,image13,image14];
const commands=new Set([0,2,5,7,9,12]);
function unionArtwork(step:number,title:string) {
 if(step===0) return <svg viewBox="0 0 32 32" role="img" aria-label={title} style={{display:'block',width:'100%',height:'100%'}}>
  <g stroke="#348f53" strokeWidth="1" strokeLinejoin="round">
   <path d="M3 19 16 12 29 19 16 27Z" fill="#43db75"/>
   <path d="M3 19v4l13 7v-3Z" fill="#35b968"/>
   <path d="M16 27 29 19v4l-13 7Z" fill="#25a65a"/>
   <path d="M11 7v11c0 4 10 4 10 0V7" fill="#48d977"/>
   <ellipse cx="16" cy="7" rx="5" ry="3" fill="#69e590"/>
  </g>
 </svg>;
 // Trace the visible faces from the supplied Union reference, without embedding a screenshot.
 const selected=step===1;
 return <svg viewBox="850 310 450 500" role="img" aria-label={title} style={{width:'100%',height:'100%'}}>
  <g stroke={selected?'#eea432':'#737373'} strokeWidth="1" strokeLinejoin="round">
   <path d="M873 445 1065 335 1129 372 937 482Z" fill="#fff"/>
   <path d="M937 482 1129 372 1129 519 937 630Z" fill="#e4e4e4"/>
   <path d="M937 630 1129 519 1269 600 1078 710Z" fill="#fff"/>
   <path d="M873 445 937 482 937 630 1078 710 1078 784 873 666Z" fill="#aaa"/>
   <path d="M1078 710 1269 600 1269 674 1078 784Z" fill="#e4e4e4"/>
   {step===3 && <path d="M873 594 937 630" fill="none"/>}
   {selected && <g fill="none"><path d="M1065 335V557L873 666M873 594 1065 482 1269 600M873 594 1078 710M1065 557 1269 674"/></g>}
  </g>
 </svg>;
}

function subtractArtwork(mode:string,title:string) {

 if(mode==='command') return <svg viewBox="0 0 32 32" role="img" aria-label={title} style={{width:'100%',height:'100%'}}>
  <path d="M3 14 16 6 29 14v7L16 29 3 21Z" fill="#26b565" stroke="#26854c"/>
  <path d="M3 14 16 6 29 14 16 22Z" fill="#54dd87" stroke="#26854c"/>
  <ellipse cx="16" cy="14" rx="6" ry="3.5" fill="#fafafa" stroke="#26854c"/>
 </svg>;
 const result=mode==='result';
 return <svg viewBox="815 400 440 365" role="img" aria-label={title} style={{width:'100%',height:'100%'}}>
 <g stroke={mode==='target'?'#eea432':'#777'} strokeWidth="1" strokeLinejoin="round">
 {result?<>
  <path d="M837 515 997 422 1076 469 1037 492 1117 538 1157 515 1236 561 1076 653 997 607 1037 584 957 538 917 561Z" fill="#fff"/>
  <path d="M837 515 917 561V653L837 607Z M957 538 1037 584 997 607V653L957 630Z M997 607 1076 653V745L997 699Z" fill="#aaa"/>
  <path d="M917 561 957 538V630L917 653Z M1076 653 1236 561V653L1076 745Z M1037 492 1076 469V515Z" fill="#e4e4e4"/>
 </>:<>
  <path d="M837 515 997 422 1236 561 1076 653Z" fill="#fff"/>
  <path d="M837 515 1076 653V745L837 607Z" fill="#aaa"/>
  <path d="M1076 653 1236 561V653L1076 745Z" fill="#e4e4e4"/>
  {mode==='target'&&<g fill="none"><path d="M997 422V515L837 607M997 515 1236 653"/><path d="M917 561 957 538 1037 584 997 607M917 561V653M997 607V699M1037 492 1076 469M1037 492 1117 538 1157 515" stroke="#777"/></g>}
  {mode==='tools'&&<g fill="none" stroke="#eea432"><path d="M917 561 957 538 1037 584 997 607Z M917 561V653L957 630 1037 677V584 M957 538V630 M997 607V699L917 653 M997 699 1037 677 M1037 492 1076 469 1157 515 1117 538Z M1037 492V584L1076 561 1157 607V515 M1076 469V561 M1117 538V630L1037 584 M1117 630 1157 607"/></g>}
 </>}
 </g></svg>;
}
function intersectArtwork(mode:string,title:string) {
 if(mode==='command') return <div style={{display:'grid',placeItems:'center',width:'100%',height:'100%'}}>
  <img src={intersectCommandOriginal} alt={title} style={{display:'block',width:76,height:'auto',maxWidth:'100%',objectFit:'contain'}}/>
 </div>;
 const result=mode==='result';
 return <svg viewBox="730 355 650 400" role="img" aria-label={title} style={{width:'100%',height:'100%'}}>
 <g stroke="#eea432" strokeWidth="1" strokeLinejoin="round">
 {!result&&<>
 <path d="M757 476 917 383 1037 453 1117 407 1355 545 1197 637 1077 568 997 614Z" fill="#fff"/>
 <path d="M757 476 997 614V706L757 568Z M1077 568 1197 637V729L1077 660Z" fill="#aaa"/>
 <path d="M997 614 1077 568V660L997 706Z M1197 637 1355 545V637L1197 729Z" fill="#e5e5e5"/>
 </>}
 {result&&<><path d="M957 499 1037 453 1157 522 1077 568Z" fill="#fff"/><path d="M957 499 1077 568V660L957 591Z" fill="#aaa"/><path d="M1077 568 1157 522V614L1077 660Z" fill="#e5e5e5"/></>}
 <g fill="none"><path d="M757 476 917 383 1157 522 997 614Z M757 476V568L997 706 1157 614V522 M997 614V706 M917 383V476L757 568 M917 476 1157 614 M957 499 1117 407 1355 545 1197 637Z M957 499V591L1197 729 1355 637V545 M1197 637V729 M1117 407V499L957 591 M1117 499 1355 637"/></g>
 </g></svg>;
}
export default function FoundationBooleanLesson({text,index,kind,japanese=false}:{text:string;index:number;kind:string;japanese?:boolean}) {
 if(kind==='intersect') {
  const titles=japanese?['重なり部分を残す','交差する要素を選ぶ','結果を確認する']:['Select Intersect','Select the Intersecting Entities','Check the Final Result'];
  const preview=(step:number)=>{const bounds:[number,number,number,number]=step===0?[1849,314,27,30]:[730,355,650,400];return <InterfaceIconPreview key={step} index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork:intersectArtwork(['command','selected','result'][step],titles[step]),screen:step===2?intersectResult:intersectSelected,region:{bounds,landing:bounds}}}/>;};
  if(index===0) return <div className="foundation-union-comparison"><FoundationViewComparison text={text} customIcons={[intersectArtwork('selected',japanese?'交差する要素':'Intersecting entities'),intersectArtwork('result',japanese?'共通部分の結果':'Intersection result')]}/></div>;
  return <div className="foundation-stretch-steps foundation-union-steps"><FoundationUsesCards text={text} customIcons={[0,1,2].map(preview)}/></div>;
 }
 if(kind==='subtract') {
  const preview=(mode:string,screen:string,title:string,step:number)=>{
   const bounds:[number,number,number,number]=mode==='command'?[1780,315,28,28]:[815,400,440,365];
   return <InterfaceIconPreview key={mode} index={step} toolbar={false} title={title} japanese={japanese} custom={{artwork:subtractArtwork(mode,title),screen,region:{bounds,landing:bounds}}}/>;
  };
  if(index===0) return <div className="foundation-union-comparison"><FoundationViewComparison text={text} customIcons={[subtractArtwork('target',japanese?'ターゲット要素':'Target Entity'),subtractArtwork('tools',japanese?'ツール要素':'Tool Entity')]}/></div>;
  if(index===2) return <div className="foundation-boolean-steps foundation-subtract-retain" style={{'--boolean-columns':2} as React.CSSProperties}><FoundationUsesCards text={text} customIcons={[
   <img key="command" src={image5} alt={japanese?'ツールを残す差のアイコン':'Subtract option that retains tool entities'}/>,
   <img key="result" src={image6} alt={japanese?'ツール要素を残す差の結果':'Before and after subtraction with tool entities retained'}/>
  ]}/></div>;
  const titles=japanese?['削るを選ぶ','ターゲット要素を選ぶ','ツール要素を選ぶ','結果を確認する']:['Select Subtract','Select the Target Entity','Select the Tool Entity','Check the Final Result'];
  return <div className="foundation-stretch-steps foundation-stretch-steps--4 foundation-union-steps"><FoundationUsesCards text={text} customIcons={titles.map((title,step)=>preview(['command','target','tools','result'][step],[subtractBefore,subtractBefore,subtractSelected,subtractAfter][step],title,step))}/></div>;
 }
 if(kind==='union') {
  if(index===0) return <div className="foundation-union-comparison"><FoundationViewComparison text={text} customIcons={[unionArtwork(3,japanese?'操作前：別々の3D要素':'Before: Separate 3D Entities'),unionArtwork(2,japanese?'操作後：1つに結合された立体':'After: One Combined Solid')]}/></div>;
  const titles=japanese?['くっつけるを選ぶ','3D要素を選ぶ','操作を確定する']:['Select Union','Select the 3D Entities','Confirm the Operation'];
  return <div className="foundation-stretch-steps foundation-union-steps"><FoundationUsesCards text={text} customIcons={titles.map((title,step)=>{
   const bounds:[number,number,number,number]=step===0?[1753,315,26,28]:[850,310,450,500];
   return <InterfaceIconPreview key={step} index={step} toolbar={false} title={title} japanese={japanese} custom={{artwork:unionArtwork(step,title),screen:[unionBefore,unionSelected,unionAfter][step],region:{bounds,landing:bounds}}}/>;
  })}/></div>;
 }
 const selected=samples[kind]?.[index] || [];
 return <div className="foundation-boolean-steps" style={{'--boolean-columns':selected.length} as React.CSSProperties}>
   <FoundationUsesCards text={text} customIcons={selected.map((n,i)=><img key={n} src={images[n]} alt={japanese?`操作例 ${i+1}`:`${kind}: ${commands.has(n)?'highlighted command':n===11||n===14?'CSG confirmation dialog':'reference example'} ${i+1}`} />)}/>
 </div>;
}
