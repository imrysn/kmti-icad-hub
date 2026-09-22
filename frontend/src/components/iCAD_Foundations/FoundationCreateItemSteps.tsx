import FoundationCloseOptions from './FoundationCloseOptions';
import FoundationFileMenuIcon from './FoundationFileMenuIcon';
import { Menu, FilePlus, Settings, CheckCircle, Save, XCircle, MessageSquare } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationStartingSteps.css';
import './FoundationUsesCards.css';
import './FoundationCreateItemSteps.css';
import './FoundationSaveSteps.css';

export default function FoundationCreateItemSteps({ text, closing = false, japanese = false }: { text: string; closing?: boolean; japanese?: boolean }) {
  const icons = closing ? [Save, Menu, XCircle, MessageSquare] : [Menu, FilePlus, Settings, CheckCircle];
  const steps = text.split('\n\n');
  if (!closing) return <div className="foundations-uses foundations-uses--aligned foundation-create-item-cards">
    <ol className="foundations-uses__grid">{steps.map((block,index) => {
      const [heading,...body] = block.split('\n');
      return <li className="foundations-use-card" key={heading}>
        <span className="foundations-use-card__number" aria-hidden="true">{index+1}</span>
        <h5 className="foundations-use-card__title">{heading.replace(/\*\*/g,'').replace(/^.*?—\s*/,'')}</h5>
        <div className="foundations-use-card__icon-frame"><FoundationFileMenuIcon newItem={index===1} japanese={japanese}/></div>
        <div className="foundations-use-card__body"><p>{renderFormattedText(body.join('\n'))}</p></div>
      </li>;
    })}</ol>
  </div>;
  return <div className="foundations-uses foundations-uses--aligned foundation-save-steps foundation-close-steps"><ol className="foundations-uses__grid" data-count={steps.length}>
    {steps.map((block, index) => {
      const [heading, ...body] = block.split('\n');
      const Icon = icons[index] || CheckCircle;
      return <li className="foundations-use-card" key={heading}>
        <span className="foundations-use-card__number" aria-hidden="true">{index + 1}</span>
        <h5 className="foundations-use-card__title">{heading.replace(/\*\*/g, '').replace(/^.*?—\s*/, '')}</h5>
        <div className="foundations-use-card__icon-frame">{index === 2 ? <FoundationCloseOptions japanese={japanese}/> : index < 2 ? <FoundationFileMenuIcon save={index === 0} japanese={japanese}/> : <Icon className="foundations-use-card__icon" strokeWidth={1.6} aria-hidden="true" />}</div>
        <div className="foundations-use-card__body"><p>{renderFormattedText(body.join('\n'))}</p></div>
      </li>;
    })}
  </ol></div>;
}
