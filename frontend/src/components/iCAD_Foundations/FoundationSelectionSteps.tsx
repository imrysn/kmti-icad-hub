import { ListFilter, MousePointer2, Mouse } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationUsesCards.css';
import './FoundationSelectionSteps.css';

const icons = [ListFilter, MousePointer2, Mouse];
export default function FoundationSelectionSteps({ text }: { text: string }) {
  return <div className="foundations-uses foundation-selection-steps">
    <ol className="foundations-uses__grid">
      {text.split('\n\n').map((block, index) => {
        const [heading, ...body] = block.split('\n');
        const Icon = icons[index] || Mouse;
        return <li className="foundations-use-card" key={heading}>
          <span className="foundations-use-card__number" aria-hidden="true">{index + 1}</span>
          <h5 className="foundations-use-card__title">{heading.replaceAll('**', '').replace(/^.*?—\s*/, '')}</h5>
          <div className="foundations-use-card__icon-frame"><Icon size={64} strokeWidth={1.6} aria-hidden="true" /></div>
          <div className="foundations-use-card__body"><p>{renderFormattedText(body.join('\n'))}</p></div>
        </li>;
      })}
    </ol>
  </div>;
}
