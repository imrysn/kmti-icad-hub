import gapScreen from '../../assets/icad-foundations/modeling/work-plane-sketch-gap.png';
import startScreen from '../../assets/icad-foundations/modeling/work-plane-sketch-start.png';
import outlineScreen from '../../assets/icad-foundations/modeling/work-plane-sketch-outline.png';
import closedScreen from '../../assets/icad-foundations/modeling/work-plane-sketch-closed.png';
import InterfaceIconPreview from './InterfaceIconPreview';
import toolsReference from '../../assets/icad-foundations/modeling/work-plane-solid-toolbar.png';
import FoundationUsesCards from './FoundationUsesCards';
import FoundationWorkPlaneCommandMenu from './FoundationWorkPlaneCommandMenu';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationWorkPlaneSketch.css';

function SketchCapture({stage,japanese,gap=false}: {stage:number;japanese:boolean;gap?:boolean}) {
 const screen=gap?gapScreen:[startScreen,outlineScreen,closedScreen][stage];
 const title=gap?(japanese?'隙間あり — 修正が必要':'Gap — repair before continuing'):(japanese?['最初の辺を描く','輪郭を描く','輪郭を閉じる']:['Draw the First Edge','Draw the Outline','Close the Profile'])[stage];
 const bounds:[number,number,number,number]=[915,395,325,415];
 const gapMarker=gap ? <circle cx="945" cy="566" r="36" fill="none" stroke="#ff3535" strokeWidth="4"/> : undefined;
 return <div className="work-plane-sketch-capture"><InterfaceIconPreview index={stage} toolbar={false} title={title} japanese={japanese} custom={{
   artwork:<svg viewBox="890 380 380 435" role="img" aria-label={title}><image href={screen} width="1920" height="1080"/>{gapMarker}</svg>,
   screen,screenOverlay:gapMarker,region:{bounds,landing:bounds},highlightColor:'#0087ef',
 }}/></div>;
}

export default function FoundationWorkPlaneSketch({text,index,japanese=false}: {text:string;index:number;japanese?:boolean}) {
 if(index===0) return <FoundationWorkPlaneCommandMenu japanese={japanese}/>;
 if(index===1) return <div className="work-plane-sketch-steps"><FoundationUsesCards text={text} customIcons={[0,1,2].map(stage=><SketchCapture key={stage} stage={stage} japanese={japanese}/>)}/></div>;
 if(index===2) return <div className="work-plane-sketch"><p>{text}</p><div className="work-plane-sketch__comparison">
   {[false,true].map(gap=><figure key={String(gap)}><SketchCapture stage={2} japanese={japanese} gap={gap}/><figcaption>{japanese?(gap?'隙間あり — 修正が必要':'閉じた輪郭 — すべての端点が接続'):(gap?'Gap — repair before continuing':'Closed profile — endpoints connected')}</figcaption></figure>)}
 </div></div>;
 if(index===3) return <div className="work-plane-sketch">{text.split('\n\n').map(p=><p key={p}>{renderFormattedText(p)}</p>)}<div className="work-plane-sketch__toolbar"><img src={toolsReference} alt={japanese?'基本タブの「2Dから立体化」の場所':'Location of 2D to 3D in the Basic tab'}/><svg className="work-plane-sketch__tool-highlights" viewBox="0 0 174 160" aria-hidden="true"><rect x="135" y="7" width="37" height="46"/><rect x="3" y="111" width="132" height="21"/></svg></div></div>;
 return null;
}
