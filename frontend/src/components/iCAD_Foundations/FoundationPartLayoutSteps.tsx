import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationUsesCards.css';
import './FoundationPartLayoutSteps.css';
import PartLayoutMenuIcon from './PartLayoutMenuIcon';
import CurrentOriginIcon from './CurrentOriginIcon';
import FoundationModelingInputIcon from './FoundationModelingInputIcon';
import placedShape from '../../assets/icad-foundations/origin-placement/shape-placed.png';
import shownOrigin from '../../assets/icad-foundations/origin-placement/shape-origin-shown.png';

export default function FoundationPartLayoutSteps({text, placement=false}:{text:string; placement?:boolean}) {
  const [intro,...steps]=text.split('\n\n');
  return <div className={`foundations-uses foundation-part-layout-steps${placement ? ' foundation-part-layout-steps--placement' : ''}`}>
    <p>{renderFormattedText(intro)}</p>
    <ol className="foundations-uses__grid">
      {steps.map((step,index)=>{
        const [title,...body]=step.split('\n');
        return <li className="foundations-use-card" key={title}>
          <span className="foundations-use-card__number" aria-hidden="true">{index+1}</span>
          <h5 className="foundations-use-card__title">{title.replaceAll('**','').replace(/^.*?—\s*/,'')}</h5>
          <div className="foundations-use-card__icon-frame">{placement ? (
            index === 0 ? <FoundationModelingInputIcon index={0} box professional />
            : index === 1 ? <FoundationModelingInputIcon index={2} box professional />
            : index === 3 ? <PartLayoutMenuIcon />
            : <img className="foundation-placement-step-image" src={index === 2 ? placedShape : shownOrigin} alt={index === 2 ? 'Placed shape' : 'Shape with its origin displayed'} />
          ) : index === 0 ? <PartLayoutMenuIcon /> : <CurrentOriginIcon markOrigin={index === 2} markXAxis={index === 3} markYAxis={index === 4} newOrigin={index === 5} />}</div>
          <div className="foundations-use-card__body"><p>{renderFormattedText(body.join('\n'))}</p></div>
        </li>;
      })}
    </ol>
  </div>;
}
