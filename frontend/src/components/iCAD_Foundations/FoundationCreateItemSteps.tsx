import FoundationCloseOptions from './FoundationCloseOptions';
import FoundationFileMenuIcon from './FoundationFileMenuIcon';
import { Menu, FilePlus, Settings, CheckCircle, Save, XCircle, MessageSquare } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationStartingSteps.css';
import './FoundationUsesCards.css';
import './FoundationCreateItemSteps.css';

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
  return <ol className={`foundations-starting-steps${steps.length === 2 ? ' foundations-starting-steps--pair' : ''}`}>
    {steps.map((block, index) => {
      const [heading, ...body] = block.split('\n');
      const Icon = icons[index] || CheckCircle;
      return <li className="foundations-starting-step" key={heading}>
        <div className="foundations-starting-step__body">
          <div className="foundations-starting-step__symbol">{closing && index === 2 ? <FoundationCloseOptions japanese={japanese}/> : !closing && index < 2 ? <FoundationFileMenuIcon newItem={index === 1} japanese={japanese}/> : <Icon size={38} strokeWidth={1.6} aria-hidden="true" />}</div>
          <span className="foundations-starting-step__label">{japanese ? 'ステップ' : 'Step'} {index + 1}</span>
          <h5>{heading.replace(/\*\*/g, '').replace(/^.*?—\s*/, '')}</h5>
          <p>{renderFormattedText(body.join('\n'))}</p>
        </div>
      </li>;
    })}
  </ol>;
}
