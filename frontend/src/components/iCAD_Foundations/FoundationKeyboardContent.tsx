import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import FoundationStartingSteps from './FoundationStartingSteps';
import './FoundationUsesCards.css';
import './FoundationKeyboardContent.css';

export default function FoundationKeyboardContent({text, inputFlow=false}: {text:string; inputFlow?:boolean}) {
  const blocks=text.split('\n\n');
  if (inputFlow) return <div className="foundation-keyboard-input">
    <p>{renderFormattedText(blocks[0])}</p>
    <FoundationStartingSteps keyboard japanese={/[\u3040-\u30ff]/.test(text)}
      sections={blocks[1].replaceAll('**', '').split('→').map(step => ({ title: step.trim(), text: '' }))} />
    {blocks.slice(2).map(block=><p key={block}>{renderFormattedText(block)}</p>)}
  </div>;
  return <div className="foundations-uses foundation-keyboard-actions">
    <ul className="foundations-uses__grid">
      {blocks.map((block,index)=>{
        const [title,...description]=block.split('\n');
        return <li className="foundations-use-card" key={title}>
          <span className="foundations-use-card__number" aria-hidden="true">{index+1}</span>
          <h5 className="foundations-use-card__title">{renderFormattedText(title)}</h5>
          <div className="foundations-use-card__icon-frame"><kbd>{['123','Enter','Esc','⌫ / Del','Alt'][index]}</kbd></div>
          <div className="foundations-use-card__body"><p>{renderFormattedText(description.join('\n'))}</p></div>
        </li>;
      })}
    </ul>
  </div>;
}
