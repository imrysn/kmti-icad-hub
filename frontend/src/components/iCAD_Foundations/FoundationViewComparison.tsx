import { RotateCw, Layout, Box, FileText } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationViewComparison.css';

export default function FoundationViewComparison({ text, designEnvironments = false }: { text: string; designEnvironments?: boolean }) {
  const blocks = text.split('\n\n');
  const lines = text.split('\n');
  const introduction = designEnvironments ? lines.filter(line => !line.startsWith('- ')).join('\n').trim() : blocks[0];
  const cards = designEnvironments ? lines.filter(line => line.startsWith('- ')).map(line => {
    const [title, ...description] = line.slice(2).split(' — ');
    return `${title}\n${description.join(' — ')}`;
  }) : blocks.slice(1,3);
  const icons = designEnvironments ? [Box, FileText] : [RotateCw, Layout];
  return <div className="foundation-view-comparison">
    <p>{renderFormattedText(introduction)}</p>
    <div className="foundation-view-comparison__cards">
      {cards.map((block,index) => {
        const [title,...description] = block.split('\n');
        const Icon = icons[index];
        return <section className="foundation-view-comparison__card" key={title}>
          <div className="foundation-view-comparison__front">
            <Icon size={34} strokeWidth={1.7} aria-hidden="true" />
            <h5>{renderFormattedText(title)}</h5>
            <p>{renderFormattedText(description.join('\n'))}</p>
          </div>
        </section>;
      })}
    </div>
    {!designEnvironments && blocks.slice(3).map(block => <p key={block}>{renderFormattedText(block)}</p>)}
  </div>;
}

