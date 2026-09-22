import { Keyboard, MousePointer2, Ruler } from 'lucide-react';
import stretchPalette from '../../assets/icad-foundations/stretch/stretch-palette.png';
import stretchInterface from '../../assets/icad-foundations/stretch/stretch-interface.png';
import InterfaceIconPreview from './InterfaceIconPreview';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationStretchSteps.css';

function StretchCommandPreview({japanese,title}: {japanese:boolean;title:string}) {
  const artwork=<div className="foundation-stretch-palette" role="img" aria-label={japanese?'面を指定して伸縮する':'Stretch by Specifying Face'}><img src={stretchPalette} alt=""/><span aria-hidden="true"/></div>;
  return <InterfaceIconPreview index={0} toolbar={false} title={title} japanese={japanese} custom={{artwork,screen:stretchInterface,region:{bounds:[1753,369,25,27],landing:[1746,349,141,165]},highlightColor:'#0087ef'}}/>;
}

function StepIcon({method,index,japanese,title}: {method:1|2;index:number;japanese:boolean;title:string}) {
  if(method===1 && index===0) return <StretchCommandPreview japanese={japanese} title={title}/>;
  if(index===0) return <MousePointer2 aria-label={japanese?'面を左クリック':'Left-click the face'}/>;
  if(method===2 && index===1) return <div className="foundation-stretch-key-click"><kbd>G</kbd><span>+</span><MousePointer2 aria-label={japanese?'G を押して左クリック':'Press G and left-click'}/></div>;
  if(method===2) return <Ruler aria-label={japanese?'直線スケール':'Linear scale'}/>;
  return <Keyboard aria-label={japanese?'アイテム入力':'Item Entry'}/>;
}

export default function FoundationStretchSteps({text,method,japanese}: {text:string;method:1|2;japanese:boolean}) {
  const start=text.search(/\*\*(?:Step|ステップ) 1/);
  const intro=start>0 ? text.slice(0,start).trim() : '';
  const steps=text.slice(Math.max(0,start)).split(/\n\n(?=\*\*(?:Step|ステップ) \d+)/);
  return <div className="foundations-uses foundations-uses--aligned foundation-stretch-steps">
    {intro && <p className="foundations-uses__intro">{renderFormattedText(intro)}</p>}
    <ul className="foundations-uses__grid">{steps.map((step,index)=>{
      const [heading,...body]=step.split('\n');
      const title=heading.replaceAll('**','').replace(/^(?:Step|ステップ) \d+\s*—\s*/, '');
      return <li className="foundations-use-card" key={index}><span className="foundations-use-card__number" aria-hidden="true">{index+1}</span><h5 className="foundations-use-card__title">{title}</h5><div className="foundations-use-card__icon-frame"><StepIcon method={method} index={index} japanese={japanese} title={title}/></div><div className="foundations-use-card__body"><p>{renderFormattedText(body.join('\n'))}</p></div></li>;
    })}</ul>
  </div>;
}
