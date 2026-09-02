import { BookOpen } from 'lucide-react';
import React from 'react';
import './WrittenTutorialPanel.css';

export interface WrittenTutorialStep {
  id: string | number;
  title: string;
  text: string;
  preserveText?: boolean;
}

export interface WrittenTutorialCopy {
  moduleLabel: string;
  procedureTitle: string;
  completionText: string;
}

interface WrittenTutorialPanelProps {
  title: string;
  description?: string;
  steps: WrittenTutorialStep[];
  copy?: Partial<WrittenTutorialCopy>;
}

const ACTION_START = /^(open|select|click|choose|enter|type|set|confirm|locate|look|find|use|move|drag|scroll|zoom|rotate|place|position|check|view|press|go|wait)\b/i;

export const simplifyTutorialText = (text: string) => {
  const cleanText = text
    .replace(/\bafter the knowledge check,?\s*/gi, '')
    .replace(/^(?:to begin|next|then|finally),?\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return '';

  const sentences = cleanText.match(/[^.!?]+[.!?]?/g)?.map(sentence => sentence.trim()).filter(Boolean) ?? [];
  const actionSentence = sentences.find(sentence => ACTION_START.test(sentence));
  const conciseSentence = actionSentence ?? sentences[0] ?? cleanText;
  const words = conciseSentence.split(/\s+/);

  if (words.length <= 24) return conciseSentence;
  return `${words.slice(0, 24).join(' ').replace(/[,;:]$/, '')}…`;
};

const WrittenTutorialPanel: React.FC<WrittenTutorialPanelProps> = ({ title, steps, copy }) => {
  const instructionalSteps = steps
    .filter(step => !/(knowledge\s*check|review|recap|conclusion)/i.test(step.title))
    .map(step => ({ ...step, text: step.preserveText ? step.text : simplifyTutorialText(step.text) }));
  const panelCopy: WrittenTutorialCopy = {
    moduleLabel: 'Self-paced module',
    procedureTitle: 'Procedure',
    completionText: 'Module complete after all steps are finished.',
    ...copy,
  };

  return (
  <aside className="written-tutorial-panel" aria-label={`Written tutorial for ${title}`}>
    <header className="written-tutorial-panel__header">
      <BookOpen className="written-tutorial-panel__header-icon" size={24} aria-hidden="true" />
      <span className="written-tutorial-panel__module-label">{panelCopy.moduleLabel}</span>
      <h3>{title}</h3>
    </header>

    <div className="written-tutorial-panel__content">
      <h4 className="written-tutorial-panel__section-title">{panelCopy.procedureTitle}</h4>
      <ol className="written-tutorial-panel__steps">
        {instructionalSteps.map((step, index) => (
          <li key={step.id} className="written-tutorial-panel__step">
            <span className="written-tutorial-panel__number">{index + 1}</span>
            <div>
              <h4>{step.title}</h4>
              {step.text && <p>{step.text}</p>}
            </div>
          </li>
        ))}
      </ol>

      <div className="written-tutorial-panel__complete">
        <span>{panelCopy.completionText}</span>
      </div>
    </div>
  </aside>
  );
};

export default WrittenTutorialPanel;
