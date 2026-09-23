import { MousePointer2 } from 'lucide-react';
import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationResizeSteps.css';

function ResizeIcon({title}: {title:string}) {
  return <FoundationOperationCommandIcon command="resize" title={title} />;
}

function SolidSelection({title}: {title:string}) {
  return <svg viewBox="0 0 110 90" role="img" aria-label={title}>
    <path d="m22 31 38-20 30 17-39 22Z" fill="#fff" stroke="#526170" strokeWidth="2"/>
    <path d="m22 31 29 19v29L22 60Z" fill="#aeb7c0" stroke="#526170" strokeWidth="2"/>
    <path d="m51 50 39-22v29L51 79Z" fill="#d7dde3" stroke="#526170" strokeWidth="2"/>
    <circle cx="87" cy="66" r="14" fill="#bd512f"/><MousePointer2 x="75" y="54" width="25" height="25" color="#fff" strokeWidth="2.5"/>
  </svg>;
}

function ScaleVisual({title}: {title:string}) {
  return <svg className="foundation-resize-scale" viewBox="0 0 180 100" role="img" aria-label={title}>
    <g transform="translate(2 27)"><path d="m5 18 24-13 20 11-25 14Z" fill="#fff" stroke="#647084"/><path d="m5 18 19 12v18L5 37Z" fill="#aeb7c0" stroke="#647084"/><path d="m24 30 25-14v18L24 48Z" fill="#d7dde3" stroke="#647084"/></g>
    <path d="M61 50h34m-9-9 9 9-9 9" fill="none" stroke="#e0002b" strokeWidth="5"/>
    <g transform="translate(98 12) scale(1.45)"><path d="m5 18 24-13 20 11-25 14Z" fill="#fff" stroke="#647084"/><path d="m5 18 19 12v18L5 37Z" fill="#aeb7c0" stroke="#647084"/><path d="m24 30 25-14v18L24 48Z" fill="#d7dde3" stroke="#647084"/></g>
    <rect x="50" y="4" width="46" height="20" fill="#fff" stroke="#647084"/><text x="55" y="18" fontSize="11" fill="#172638">Scale 2.0</text>
  </svg>;
}

export default function FoundationResizeSteps({text,japanese}: {text:string;japanese:boolean}) {
  const steps=text.split(/\n\n(?=\*\*(?:Step|ステップ) \d+)/);
  return <div className="foundations-uses foundations-uses--aligned foundation-resize-steps" lang={japanese?'ja':'en'}><ul className="foundations-uses__grid">
    {steps.map((step,index)=>{
      const [heading,...body]=step.split('\n');
      const title=heading.replaceAll('**','').replace(/^(?:Step|ステップ) \d+\s*—\s*/, '');
      return <li className="foundations-use-card" key={index}><span className="foundations-use-card__number" aria-hidden="true">{index+1}</span><h5 className="foundations-use-card__title">{title}</h5><div className="foundations-use-card__icon-frame">{index===0?<ResizeIcon title={title}/>:index===1?<SolidSelection title={title}/>:<ScaleVisual title={title}/>}</div><div className="foundations-use-card__body"><p>{renderFormattedText(body.join('\n'))}</p></div></li>;
    })}
  </ul></div>;
}
