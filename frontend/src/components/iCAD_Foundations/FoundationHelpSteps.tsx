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
      <p>{sections[4].text.split('\n')[0]}</p>
      <ul>{sections[4].text.split('\n').slice(1).map(line => <li key={line}>{line.replace(/^- /, '')}</li>)}</ul>
    </section>}
  </div>;
}
