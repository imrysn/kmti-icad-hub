import { resolveFoundationLesson } from './curriculum';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import InterfaceIconPreview from './InterfaceIconPreview';
import './FoundationUsesCards.css';
import './FoundationInterfaceCards.css';


export default function FoundationInterfaceContent({ japanese, why, sections, toolbar = false }: { japanese: boolean; why?: { title: string; text: string }; sections?: Array<{title: string; text: string}>; toolbar?: boolean }) {
  const source = sections || resolveFoundationLesson('F2.1')!.content[japanese ? 'ja' : 'en'].sections!.slice(0, 10);
  const steps = source.map((section, index) => ({...section, id: index}));
  return <>
    <div className={`foundations-uses foundation-interface-cards${toolbar ? ' foundation-interface-cards--toolbar' : ''}`}><ol className="foundations-uses__grid">
      {steps.map((step, index) => <li key={step.id} className="foundations-use-card">
        <span className="foundations-use-card__number" aria-hidden="true">{index + 1}</span>
        <h5 className="foundations-use-card__title">{step.title}</h5>
        <div className="foundations-use-card__icon-frame">
          <InterfaceIconPreview index={index} toolbar={toolbar} title={step.title} japanese={japanese} />
        </div>
        <div className="foundations-use-card__body"><p>{renderFormattedText(step.text)}</p></div>
      </li>)}
    </ol></div>
    {why && <section><h4 className="section-title">{why.title}</h4>
      {why.text.includes('\n- ') ? <><p>{why.text.split('\n')[0]}</p><ul>{why.text.split('\n').slice(1).map(line => <li key={line}>{line.replace(/^- /, '')}</li>)}</ul></> : why.text.split('\n\n').map(line => <p key={line}>{renderFormattedText(line)}</p>)}
    </section>}
  </>;
}



