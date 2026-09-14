import { Save, Copy } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationStartingSteps.css';

export default function FoundationSaveComparison({ text }: { text: string }) {
  const icons = [Save, Copy];
  return <ol className="foundations-starting-steps foundations-starting-steps--pair">
    {text.split('\n\n').map((block, index) => {
      const [title, ...body] = block.split('\n');
      const Icon = icons[index] || Save;
      return <li key={title} className="foundations-starting-step">
        <div className="foundations-starting-step__body">
          <div className="foundations-starting-step__symbol"><Icon size={38} strokeWidth={1.6} aria-hidden="true" /></div>
          <h5>{renderFormattedText(title)}</h5>
          <p>{renderFormattedText(body.join('\n'))}</p>
        </div>
      </li>;
    })}
  </ol>;
}
