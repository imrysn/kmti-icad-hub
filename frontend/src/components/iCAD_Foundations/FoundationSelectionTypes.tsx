import { MousePointer2, Boxes, Box, Shapes } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationUsesCards.css';
import './FoundationSelectionTypes.css';

const icons = [MousePointer2, Boxes, Box, Shapes];
export default function FoundationSelectionTypes({ text }: { text: string }) {
  const blocks = text.split('\n\n');
  const items = text.split('\n').filter(line => line.startsWith('- '));
  return <div className="foundations-uses foundation-selection-types">
    {blocks.filter(block => !block.startsWith('- ')).map(block => <p key={block}>{renderFormattedText(block)}</p>)}
    <ul className="foundations-uses__grid">
      {items.map((item, index) => {
        const Icon = icons[index] || Shapes;
        return <li className="foundations-use-card" key={item}>
          <span className="foundations-use-card__number" aria-hidden="true">{index + 1}</span>
          <h5 className="foundations-use-card__title">{item.slice(2)}</h5>
          <div className="foundations-use-card__icon-frame"><Icon size={64} strokeWidth={1.6} aria-hidden="true" /></div>
        </li>;
      })}
    </ul>
  </div>;
}
