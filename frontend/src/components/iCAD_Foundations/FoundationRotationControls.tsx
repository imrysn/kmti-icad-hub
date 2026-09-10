import FoundationMouseControls from './FoundationMouseControls';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';

export default function FoundationRotationControls({ sections }: { sections: Array<{title: string; text: string}> }) {
  return <div className="foundation-rotation-controls">
    {sections.slice(0, 2).map((method, index) => {
      const blocks = method.text.split('\n\n');
      const stepBlocks = index === 0 ? blocks.slice(1) : blocks;
      const steps = stepBlocks.map(block => {
        const [heading, ...body] = block.split('\n');
        return { title: heading.replace(/\*\*/g, '').replace(/^.*?—\s*/, ''), text: body.join('\n') };
      });
      return <section key={method.title} className="foundation-rotation-method">
        <h4 className="section-title">{index === 0 ? renderFormattedText(blocks[0]) : method.title}</h4>
        <FoundationMouseControls sections={steps} rotation={index === 0 ? 'mouse' : 'alt'} />
      </section>;
    })}
    {sections[2] && <section className="foundation-rotation-reminder"><h4 className="section-title">{sections[2].title}</h4>
      {sections[2].text.split('\n\n').map(line => <p key={line}>{renderFormattedText(line)}</p>)}
    </section>}
  </div>;
}
