import { BookOpen, CheckCircle2, Info, Target } from 'lucide-react';
import React from 'react';
import './WrittenTutorialPanel.css';

export interface WrittenTutorialStep {
  id: string | number;
  title: string;
  text: string;
}

interface WrittenTutorialPanelProps {
  title: string;
  description?: string;
  steps: WrittenTutorialStep[];
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

export const getLessonPurpose = (title: string) => {
  const lesson = title.toLowerCase();

  if (lesson.includes('tool bar')) return 'iCAD Tool Bars are used to quickly access common commands for viewing, editing, and modeling.';
  if (lesson.includes('interface')) return 'The iCAD interface is used to find the workspace, menus, commands, input areas, and system messages.';
  if (lesson.includes('zoom')) return 'Zoom is used to enlarge details or show more of the model without changing its size.';
  if (lesson.includes('pan')) return 'Pan is used to move the visible workspace without moving the model.';
  if (lesson.includes('rotate')) return 'Rotate View is used to inspect a model from different angles without changing its geometry.';
  if (lesson.includes('user view')) return 'User View is used to inspect several sides of a model in one custom viewing angle.';
  if (lesson.includes('3d view')) return '3D View is used to display a model from standard directions such as Front, Top, Right, and Left.';
  if (lesson.includes('cylinder')) return 'A cylinder is used to create round features such as shafts, pins, rollers, and holes.';
  if (lesson.includes('box')) return 'A box is used to create rectangular parts by defining their width, depth, and height.';
  if (lesson.includes('polygon')) return 'A polygonal prism is used to create multi-sided parts with a controlled size and height.';
  if (lesson.includes('cone')) return 'A cone is used to create tapered parts by defining the lower face, upper face, and height.';
  if (lesson.includes('torus')) return 'A torus is used to create ring-shaped parts such as seals, rings, and curved tubes.';
  if (lesson.includes('origin') || lesson.includes('coordinate')) return 'The origin and coordinates are used to place geometry at exact positions in the workspace.';

  return `${title} is used to complete this workflow accurately in iCAD.`;
};

const WrittenTutorialPanel: React.FC<WrittenTutorialPanelProps> = ({ title, description, steps }) => {
  const instructionalSteps = steps
    .filter(step => !/(knowledge\s*check|review|recap|conclusion)/i.test(step.title))
    .map(step => ({ ...step, text: simplifyTutorialText(step.text) }));
  const introduction = description
    ? simplifyTutorialText(description)
    : `This lesson introduces ${title.toLowerCase()} in iCAD.`;
  const purpose = getLessonPurpose(title);

  return (
  <aside className="written-tutorial-panel" aria-label={`Written tutorial for ${title}`}>
    <header className="written-tutorial-panel__header">
      <BookOpen size={24} aria-hidden="true" />
      <div>
        <span className="written-tutorial-panel__module-label">Self-paced module</span>
        <h3>{title}</h3>
      </div>
    </header>

    <div className="written-tutorial-panel__content">
      <section className="written-tutorial-panel__introduction" aria-label="Introduction">
        <div className="written-tutorial-panel__section-heading">
          <Info size={18} aria-hidden="true" />
          <h4>Introduction</h4>
        </div>
        <p>{introduction}</p>
        <p><strong>Purpose:</strong> {purpose}</p>
      </section>

      <section className="written-tutorial-panel__goal" aria-labelledby={`module-goal-${title}`}>
        <Target size={18} aria-hidden="true" />
        <div>
          <h4 id={`module-goal-${title}`}>Learning goal</h4>
          <p>Follow the steps to complete {title.toLowerCase()} in iCAD.</p>
        </div>
      </section>

      <h4 className="written-tutorial-panel__section-title">Procedure</h4>
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
        <CheckCircle2 size={18} aria-hidden="true" />
        <span>Module complete after all steps are finished.</span>
      </div>
    </div>
  </aside>
  );
};

export default WrittenTutorialPanel;
