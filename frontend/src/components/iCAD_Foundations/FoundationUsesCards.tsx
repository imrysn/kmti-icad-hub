import { Box, Layers, Pencil, Scan, FileText, Ruler, Menu, Wrench, Monitor, Keyboard, MessageSquare, ListTree } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationUsesCards.css';

const icons = [Box, Layers, Pencil, Scan, FileText, Ruler];

export default function FoundationUsesCards({ text, interfaceReview = false, customIcons }: { text: string; interfaceReview?: boolean; customIcons?: React.ReactNode[] }) {
  const lines = text.split('\n');
  const items = lines.filter(line => /^- /.test(line));
  return <div className="foundations-uses foundations-uses--aligned">
    {lines.some(line => line.trim() && !/^- /.test(line)) && <p className="foundations-uses__intro">{lines.filter(line => !/^- /.test(line)).join('\n')}</p>}
    <ul className="foundations-uses__grid">
      {items.map((item, index) => {
        const match = item.match(/^- \*\*(.*?)\*\*\s*—\s*(.*)$/);
        if (!match) return <li key={item}>{renderFormattedText(item.slice(2))}</li>;
        const customIcon = customIcons?.[index];
        const Icon = (interfaceReview ? [Menu, Wrench, Monitor, Keyboard, MessageSquare, ListTree] : icons)[index] || Box;
        return <li className="foundations-use-card" key={match[1]}>
          <span className="foundations-use-card__number" aria-hidden="true">{index + 1}</span>
          <h5 className="foundations-use-card__title">{match[1]}</h5>
          <div className="foundations-use-card__icon-frame">
            {customIcon ?? <Icon className="foundations-use-card__icon" size={32} strokeWidth={1.6} aria-hidden="true" />}
          </div>
          <div className="foundations-use-card__body">
            <p>{renderFormattedText(match[2])}</p>
          </div>
        </li>;
      })}
    </ul>
  </div>;
}
