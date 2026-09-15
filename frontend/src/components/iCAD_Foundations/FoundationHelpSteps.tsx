import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationHelpSteps.css';

export default function FoundationHelpSteps({ sections }: { sections: Array<{ title: string; text: string }> }) {
  return <div className="foundations-help-layout">
    <ol className="foundations-help-steps">
      {sections.slice(0, 4).map((section, index) => <li className="foundations-help-step" key={section.title}>
        <div className="foundations-help-step__arrow"><span>{String(index + 1).padStart(2, '0')}</span><h5>{section.title}</h5></div>
        <p>{renderFormattedText(section.text)}</p>
      </li>)}
    </ol>
    {sections[4] && <section className="foundations-help-when">
      <h4 className="section-title">{sections[4].title}</h4>
      <p>{renderFormattedText(sections[4].text.split('\n')[0])}</p>
      {/* "- " lines are the list; any other non-empty line (such as a tip) is a paragraph after it. */}
      <ul>{sections[4].text.split('\n').slice(1).filter(line => line.startsWith('- ')).map(line => <li key={line}>{renderFormattedText(line.slice(2))}</li>)}</ul>
      {sections[4].text.split('\n').slice(1).filter(line => line.trim() && !line.startsWith('- ')).map(line => <p key={line}>{renderFormattedText(line)}</p>)}
    </section>}
  </div>;
}
