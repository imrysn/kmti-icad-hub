import { ShowHideCommandPreview } from './FoundationShowHideCommands';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationShowHideSteps.css';

export default function FoundationShowHideSteps({text,command,japanese}: {text:string;command:number;japanese:boolean}) {
  const start=text.search(/\*\*(?:Step|ステップ) 1/);
  const intro=start>0 ? text.slice(0,start).trim() : '';
  const steps=text.slice(Math.max(0,start)).split(/\n\n(?=\*\*(?:Step|ステップ) \d+)/);
  return <div className={`foundations-uses foundations-uses--aligned foundations-show-hide foundations-show-hide-steps foundations-show-hide-steps--${steps.length}`}>
    {intro && <p className="foundations-uses__intro">{renderFormattedText(intro)}</p>}
    <ul className="foundations-uses__grid">
      {steps.map((step,index)=>{
        const [heading,...body]=step.split('\n');
        const title=heading.replaceAll('**','').replace(/^(?:Step|ステップ) \d+\s*—\s*/,'');
        const right=command===2 || command===3 || ((command===1 || command===4) && index===2);
        return <li className="foundations-use-card" key={index}>
          <span className="foundations-use-card__number" aria-hidden="true">{index+1}</span>
          <h5 className="foundations-use-card__title">{title}</h5>
          <div className="foundations-use-card__icon-frame">
            {index===0 ? <ShowHideCommandPreview index={command} title={title} japanese={japanese}/> : <svg width="64" height="64" viewBox="0 0 48 64" role="img" aria-label={japanese ? (right?'右クリック':'左クリック') : (right?'Right-click':'Left-click')}>
              <rect x="5" y="2" width="38" height="59" rx="19" fill="#454b54" stroke="#9aa5b2" strokeWidth="2"/>
              <path d={right?'M24 3C35 3 42 10 42 22V29H24Z':'M24 3C13 3 6 10 6 22V29H24Z'} fill="#e00046"/>
              <path d="M24 3V29M6 29H42" fill="none" stroke="#fff" strokeWidth="2"/>
            </svg>}
          </div>
          <div className="foundations-use-card__body">{body.join('\n').trim().split('\n\n').map((paragraph,i)=><p key={i}>{renderFormattedText(paragraph)}</p>)}</div>
        </li>;
      })}
    </ul>
  </div>;
}
