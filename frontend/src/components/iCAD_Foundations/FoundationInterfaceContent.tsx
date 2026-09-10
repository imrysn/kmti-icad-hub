import { INTERFACE_WRITTEN_TUTORIAL_STEPS as en } from './WrittenTutorial_EN/UnderstandingTheIcadInterface';
import { INTERFACE_WRITTEN_TUTORIAL_STEPS as ja } from './WrittenTutorial_JP/UnderstandingTheIcadInterface';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import '../3D_Modeling/InterfaceNumberedRows.css';

export default function FoundationInterfaceContent({ japanese, why, sections }: { japanese: boolean; why?: { title: string; text: string }; sections?: Array<{title: string; text: string}> }) {
  const steps = sections ? sections.map((section, index) => ({...section, id: index})) : japanese ? ja : en;
  return <>
    <div className="foundations-interface-rows"><ol className="written-tutorial-panel__steps">
      {steps.map((step, index) => <li key={step.id} className="written-tutorial-panel__step">
        <div className="step-header"><span className="step-number">{index + 1}</span><h4>{step.title}</h4></div>
        <div className="step-text-content"><p>{renderFormattedText(step.text)}</p></div>
      </li>)}
    </ol></div>
    {why && <section><h4 className="section-title">{why.title}</h4>
      {why.text.includes('\n- ') ? <><p>{why.text.split('\n')[0]}</p><ul>{why.text.split('\n').slice(1).map(line => <li key={line}>{line.replace(/^- /, '')}</li>)}</ul></> : why.text.split('\n\n').map(line => <p key={line}>{renderFormattedText(line)}</p>)}
    </section>}
  </>;
}
