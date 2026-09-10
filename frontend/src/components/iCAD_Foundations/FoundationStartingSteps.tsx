import { Search, MousePointer2, Hourglass, MonitorCheck, Save, LogOut, MessageSquare, MonitorOff, Keyboard, CornerDownLeft } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationStartingSteps.css';

const icons = [Search, MousePointer2, Hourglass, MonitorCheck];
export default function FoundationStartingSteps({ sections, japanese, closing = false, keyboard = false }: {
  sections: Array<{ title: string; text: string }>; japanese: boolean; closing?: boolean; keyboard?: boolean;
}) {
  return <ol className={`foundations-starting-steps${sections.length === 2 ? ' foundations-starting-steps--pair' : ''}${keyboard ? ' foundations-starting-steps--keyboard' : ''}`}>
    {sections.map((section, index) => {
      const Icon = (keyboard ? [MousePointer2, Keyboard, CornerDownLeft] : closing ? [Save, LogOut, MessageSquare, MonitorOff] : icons)[index];
      return <li key={section.title} className="foundations-starting-step">
        <div className="foundations-starting-step__body">
          <div className="foundations-starting-step__symbol"><Icon size={38} strokeWidth={1.6} aria-hidden="true" /></div>
          <span className="foundations-starting-step__label">{japanese ? 'ステップ' : 'Step'} {index + 1}</span>
          <h5>{section.title}</h5>{section.text && <p>{renderFormattedText(section.text)}</p>}
        </div>
      </li>;
    })}
  </ol>;
}
