import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationUsesCards.css';
import './FoundationPartLayoutSteps.css';
import PartLayoutIcon from './PartLayoutIcon';
import CurrentOriginIcon from './CurrentOriginIcon';

export default function FoundationPartLayoutSteps({text}:{text:string}) {
  const [intro,...steps]=text.split('\n\n');
  return <div className="foundations-uses foundation-part-layout-steps">
    <p>{renderFormattedText(intro)}</p>
    <ol className="foundations-uses__grid">
      {steps.map((step,index)=>{
        const [title,...body]=step.split('\n');
        return <li className="foundations-use-card" key={title}>
          <span className="foundations-use-card__number" aria-hidden="true">{index+1}</span>
          <h5 className="foundations-use-card__title">{title.replaceAll('**','').replace(/^.*?—\s*/,'')}</h5>
          <div className="foundations-use-card__icon-frame">{index === 0 ? <PartLayoutIcon /> : <CurrentOriginIcon markOrigin={index === 2} markXAxis={index === 3} markYAxis={index === 4} newOrigin={index === 5} />}</div>
          <div className="foundations-use-card__body"><p>{renderFormattedText(body.join('\n'))}</p></div>
        </li>;
      })}
    </ol>
  </div>;
}
