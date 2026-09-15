import FoundationBoxSetup from './FoundationBoxSetup';
import FoundationModelingInputIcon from './FoundationModelingInputIcon';
import { Box, Hexagon, Ruler, MapPin, CheckCircle, Move, MousePointer2, Copy, Trash2, CheckSquare, Undo2 } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationUsesCards.css';
import './FoundationModelingProcess.css';

function Cylinder() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
  </svg>;
}

export default function FoundationModelingProcess({ text, cylinder = false, polygon = false, move = false, copy = false, deleting = false, inputAreas = false, box = false, japanese = false }: { text: string; cylinder?: boolean; polygon?: boolean; move?: boolean; copy?: boolean; deleting?: boolean; inputAreas?: boolean; box?: boolean; japanese?: boolean }) {
  const shapeFlow = box || cylinder || polygon;
  const blocks = text.split('\n\n');
  const hasIntro = !/^\*\*(?:Step|ステップ) \d+/.test(blocks[0]);
  const intro = hasIntro ? blocks[0] : '';
  const steps = hasIntro ? blocks.slice(1) : blocks;
  const icons = deleting ? [Trash2, MousePointer2, CheckSquare, Undo2] : move || copy ? [copy ? Copy : Move, MousePointer2, MapPin, CheckCircle] : [polygon ? Hexagon : cylinder ? Cylinder : Box, Ruler, MapPin, CheckCircle];
  return <div className={`foundations-uses foundation-modeling-process${shapeFlow ? ' foundation-modeling-process--box' : ''}`}>
    {intro && <p>{renderFormattedText(intro)}</p>}
    <ol className="foundations-uses__grid">
      {steps.map((step, index) => {
        const [heading, ...lines] = step.split('\n');
        const Icon = icons[index] || Box;
        return <li className="foundations-use-card" key={heading}>
          <span className="foundations-use-card__number" aria-hidden="true">{index + 1}</span>
          <h5 className="foundations-use-card__title">{heading.replace(/\*\*/g, '').replace(/^(?:(?:Step|ステップ) \d+ —\s*|\d+\.\s*)/, '')}</h5>
          <div className="foundations-use-card__icon-frame">{shapeFlow && (index===0 || index===2) ? <FoundationBoxSetup japanese={japanese} orientation={index===2} cylinder={cylinder} polygon={polygon} iconOnly/> : (inputAreas || cylinder || polygon) ? <FoundationModelingInputIcon index={shapeFlow ? (index===1 ? 0 : index-2) : index} japanese={japanese} box={box} cylinder={cylinder} polygon={polygon}/> : <Icon aria-hidden="true" strokeWidth={1.6} />}</div>
          <div className="foundations-use-card__body">
            {lines.filter(line => !line.startsWith('- ')).map(line => <p key={line}>{renderFormattedText(line)}</p>)}
            
            {lines.some(line => line.startsWith('- ')) && <ul>{lines.filter(line => line.startsWith('- ')).map(line => <li key={line}>{line.slice(2)}</li>)}</ul>}
          </div>
        </li>;
      })}
    </ol>
    {shapeFlow && <p className="foundation-modeling-process__video-note">{japanese ? '動画では形状を選択してから正面図に切り替えています。この手順では先に正面図を選びます。どちらの場合も、形状を選択してから Y 方向を設定し、寸法を入力します。' : 'The video selects the shape before switching to Front View. These steps start with Front View. In both, select the shape before choosing Y orientation and entering its size.'}</p>}
  </div>;
}
