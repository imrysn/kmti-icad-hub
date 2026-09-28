import type { ReactNode } from 'react';
import { RotateCw, Layout, Box, FileText } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationViewComparison.css';

export default function FoundationViewComparison({ text, designEnvironments = false, workPlanes = false, customIcons }: { text: string; designEnvironments?: boolean; workPlanes?: boolean; customIcons?: ReactNode[] }) {
  const blocks = text.split('\n\n');
  const lines = text.split('\n');
  const introduction = designEnvironments ? lines.filter(line => !line.startsWith('- ')).join('\n').trim() : workPlanes ? blocks[0] : blocks[0];
  const cards = designEnvironments ? lines.filter(line => line.startsWith('- ')).map(line => {
    const [title, ...description] = line.slice(2).split(' — ');
    return `${title}\n${description.join(' — ')}`;
  }) : workPlanes ? blocks.slice(1, 4) : blocks.slice(1,3);
  const icons = designEnvironments ? [Box, FileText] : workPlanes ? [RotateCw, RotateCw, RotateCw] : [RotateCw, Layout];
  return <div className={`foundation-view-comparison${workPlanes ? ' foundation-view-comparison--three' : ''}`}>
    <p>{renderFormattedText(introduction)}</p>
    <div className="foundation-view-comparison__cards">
      {cards.map((block,index) => {
        const [title,...description] = block.split('\n');
        const Icon = icons[index];
        return <section className="foundation-view-comparison__card" key={title}>
          <div className="foundation-view-comparison__front">
            {customIcons?.[index] ?? <Icon size={34} strokeWidth={1.7} aria-hidden="true" />}
            <h5>{renderFormattedText(title)}</h5>
            <p>{renderFormattedText(description.join('\n'))}</p>
          </div>
        </section>;
      })}
    </div>
    {!designEnvironments && blocks.slice(3).map(block => <p key={block}>{renderFormattedText(block)}</p>)}
  </div>;
}



