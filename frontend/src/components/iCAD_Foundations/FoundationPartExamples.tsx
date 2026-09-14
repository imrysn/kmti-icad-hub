import { Box, Circle, Layers, CornerDownRight } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationUsesCards.css';
import './FoundationPartExamples.css';

export default function FoundationPartExamples({ text }: { text: string }) {
  const blocks = text.split('\n\n');
  const exampleBlock = blocks.findIndex(block => block.split('\n').some(line => line.startsWith('- ')));
  const icons = [Box, Circle, Layers, CornerDownRight];
  return <div className="foundation-part-examples">
    {blocks.map((block, blockIndex) => {
      if (blockIndex !== exampleBlock) return <p key={blockIndex}>{renderFormattedText(block)}</p>;
      const lines = block.split('\n');
      return <div className="foundations-uses" key={blockIndex}>
        <p>{lines.filter(line => !line.startsWith('- ')).join('\n')}</p>
        <ol className="foundations-uses__grid">
          {lines.filter(line => line.startsWith('- ')).map((line, index) => {
            const Icon = icons[index] || Box;
            return <li className="foundations-use-card" key={line}>
              <span className="foundations-use-card__number" aria-hidden="true">{index + 1}</span>
              <h5 className="foundations-use-card__title">{line.slice(2)}</h5>
              <div className="foundations-use-card__icon-frame"><Icon aria-hidden="true" strokeWidth={1.6} /></div>
            </li>;
          })}
        </ol>
      </div>;
    })}
  </div>;
}
