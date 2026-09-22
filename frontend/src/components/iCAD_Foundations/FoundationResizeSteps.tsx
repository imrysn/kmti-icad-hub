import { MousePointer2 } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationResizeSteps.css';

function ResizeIcon({title}: {title:string}) {
  return <svg className="foundation-resize-command" viewBox="0 0 104 112" role="img" aria-label={title}>
    <rect x="4" y="4" width="96" height="104" fill="#eef1f4" stroke="#8c98a4" strokeWidth="2"/>
    <rect x="5" y="5" width="94" height="18" fill="#d7e8fa"/>
    <text x="10" y="18" fontSize="9" fill="#172638">伸縮・整形・切断</text>
    {[0,1,2].map(row=>[0,1,2,3].map(col=><g key={`${row}-${col}`} transform={`translate(${11+col*22} ${31+row*24})`} opacity={row===2&&col===0?1:.72}>
      <path d="M1 8 9 3l9 5-9 5Z" fill="#f7f7f7" stroke="#607080"/>
      <path d="M1 8v8l8 5v-8Z" fill="#bcc6cf" stroke="#607080"/>
      <path d="m9 13 9-5v8l-9 5Z" fill="#16b85a" stroke="#39705a"/>
    </g>))}
    <rect x="7" y="76" width="24" height="27" fill="none" stroke="#e4002b" strokeWidth="3"/>
  </svg>;
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
