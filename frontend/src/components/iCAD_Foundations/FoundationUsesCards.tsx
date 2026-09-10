import { Box, Layers, Pencil, Scan, FileText, Ruler } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationUsesCards.css';

const icons = [Box, Layers, Pencil, Scan, FileText, Ruler];

export default function FoundationUsesCards({ text }: { text: string }) {
  const lines = text.split('\n');
  const items = lines.filter(line => /^- /.test(line));
  return <div className="foundations-uses">
    <p className="foundations-uses__intro">{lines.filter(line => !/^- /.test(line)).join('\n')}</p>
    <ul className="foundations-uses__grid">
      {items.map((item, index) => {
        const match = item.match(/^- \*\*(.*?)\*\*\s*—\s*(.*)$/);
        if (!match) return <li key={item}>{renderFormattedText(item.slice(2))}</li>;
        const Icon = icons[index] || Box;
        return <li className="foundations-use-card" key={match[1]}>
          <span className="foundations-use-card__number" aria-hidden="true">{index + 1}</span>
          <h5 className="foundations-use-card__title">{match[1]}</h5>
          <div className="foundations-use-card__icon-frame">
            <Icon className="foundations-use-card__icon" size={32} strokeWidth={1.6} aria-hidden="true" />
          </div>
          <div className="foundations-use-card__body">
            <p>{match[2]}</p>
          </div>
        </li>;
      })}
    </ul>
  </div>;
}
