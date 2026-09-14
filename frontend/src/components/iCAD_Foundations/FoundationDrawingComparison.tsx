import { Box, FileText } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationStartingSteps.css';

export default function FoundationDrawingComparison({ text }: { text: string }) {
  const icons = [Box, FileText];
  const blocks = text.split("\n\n");
  return <><ol className="foundations-starting-steps foundations-starting-steps--pair">
    {blocks.slice(0, 2).map((block, index) => {
      const [title, ...description] = block.split('\n');
      const Icon = icons[index] || FileText;
      return <li className="foundations-starting-step" key={title}>
        <div className="foundations-starting-step__body">
          <div className="foundations-starting-step__symbol"><Icon size={38} strokeWidth={1.6} aria-hidden="true" /></div>
          <h5>{renderFormattedText(title)}</h5>
          <p>{renderFormattedText(description.join('\n'))}</p>
        </div>
      </li>;
    })}
  </ol>{blocks.slice(2).map(block => <p key={block}>{renderFormattedText(block)}</p>)}</>;
}
