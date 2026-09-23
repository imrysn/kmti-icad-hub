import { useFoundationVisuals } from './FoundationVisualContext';
import FoundationCreationCommandIcon from './FoundationCreationCommandIcon';
import StretchArtwork from './StretchArtwork';
import scaleScreen from '../../assets/icad-foundations/stretch/stretch-scale-interface.png';
import scaleResult from '../../assets/icad-foundations/stretch/stretch-scale-result.png';
import stretchInterface from '../../assets/icad-foundations/stretch/stretch-interface.png';
import entryScreen from '../../assets/icad-foundations/stretch/stretch-entry-interface.png';
import resultScreen from '../../assets/icad-foundations/stretch/stretch-result-interface.png';
import InterfaceIconPreview from './InterfaceIconPreview';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationStretchSteps.css';

function StepIcon({method,index,japanese,title}: {method:1|2;index:number;japanese:boolean;title:string}) {
  const singleCommand=useFoundationVisuals();
  const linear=method===2;
  const screen=index===0?stretchInterface:index===3?(linear?scaleResult:resultScreen):(linear?scaleScreen:entryScreen);
  const bounds:[number,number,number,number]=index===0?[1753,369,25,27]:index===2?(linear?[970,639,76,23]:[136,1027,308,26]):index===3?[790,305,620,560]:linear?[378,180,1360,835]:[805,305,435,450];
  return <InterfaceIconPreview index={index} toolbar={false} title={title} japanese={japanese} custom={{artwork:singleCommand && index===0 ? <FoundationCreationCommandIcon command="stretch" title={title}/> : <StretchArtwork step={index} linear={linear} title={title}/>,screen,region:{bounds,landing:bounds},highlightColor:'#0087ef'}}/>;
}

export default function FoundationStretchSteps({text,method,japanese}: {text:string;method:1|2;japanese:boolean}) {
  const start=text.search(/\*\*(?:Step|ステップ) 1/);
  const intro=start>0 ? text.slice(0,start).trim() : '';
  const steps=text.slice(Math.max(0,start)).split(/\n\n(?=\*\*(?:Step|ステップ) \d+)/);
  return <div className={`foundations-uses foundations-uses--aligned foundation-stretch-steps foundation-stretch-steps--${steps.length}`}>
    {intro && <p className="foundations-uses__intro">{renderFormattedText(intro)}</p>}
    <ul className="foundations-uses__grid">{steps.map((step,index)=>{
      const [heading,...body]=step.split('\n');
      const title=heading.replaceAll('**','').replace(/^(?:Step|ステップ) \d+\s*—\s*/, '');
      return <li className="foundations-use-card" key={index}><span className="foundations-use-card__number" aria-hidden="true">{index+1}</span><h5 className="foundations-use-card__title">{title}</h5><div className="foundations-use-card__icon-frame"><StepIcon method={method} index={index} japanese={japanese} title={title}/></div><div className="foundations-use-card__body"><p>{renderFormattedText(body.join('\n'))}</p></div></li>;
    })}</ul>
  </div>;
}
