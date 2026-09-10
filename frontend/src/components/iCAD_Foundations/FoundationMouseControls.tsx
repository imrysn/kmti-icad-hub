import './FoundationMouseControls.css';
import { useTranslation } from '../../context/LanguageContext';
import { MousePointer2, Move, ArrowUpFromLine } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';

function MouseDiagram({ control, direction }: { control: number; direction?: 'up' | 'down' }) {
  const base = '#454b54';
  const accent = '#ed1745';
  return <svg viewBox="0 0 100 112" className="foundation-mouse-diagram" aria-hidden="true">
    <path d="M48 12C27 12 18 25 18 43V51H44V31Q44 25 48 25Z" fill={control === 1 ? accent : base} />
    <path d="M52 12C73 12 82 25 82 43V51H56V31Q56 25 52 25Z" fill={control === 3 || control === 4 ? accent : base} />
    <path d="M18 55H82V70C82 91 70 103 50 103S18 91 18 70Z" fill={base} />
    <rect x="46" y="28" width="8" height="24" rx="4" fill={control === 2 || control === 4 ? accent : '#aeb9c7'} />
    {direction && <path d={direction === 'up' ? 'M91 57V23M85 30L91 23L97 30' : 'M91 23V57M85 50L91 57L97 50'} stroke="#1683de" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
    {control === 0 && <g stroke="#1683de" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 42V75M1 47L5 42L9 47M1 70L5 75L9 70M24 5H76M29 1L24 5L29 9M71 1L76 5L71 9" />
    </g>}
  </svg>;
}

export default function FoundationMouseControls({ sections, zoom = false, pan = false, rotation }: { sections: Array<{title: string; text: string}>; zoom?: boolean; pan?: boolean; rotation?: 'mouse' | 'alt' }) {
  const count = zoom ? 2 : 4;
  const { language } = useTranslation();
  return <div className={`foundation-mouse-controls${zoom ? ' foundation-zoom-controls' : ''}`}>
    <ul>{sections.slice(0,count).map((section,index) => <li key={section.title}>
      <span className="foundation-mouse-control-number" aria-hidden="true">{index + 1}</span>
      <div className="foundation-mouse-control-title"><h5>{section.title}</h5></div>
      <div className="foundation-mouse-control-icon">{rotation ? <div className="foundation-wheel-direction">
        {rotation === 'mouse' && index === 0 ? <MousePointer2 size={38} aria-hidden="true" /> : rotation === 'alt' && index === 0 ? <kbd className="foundation-alt-key">Alt</kbd> : <MouseDiagram control={index === 3 ? -1 : rotation === 'mouse' ? 4 : 1} />}
        {rotation === 'alt' && index === 1 && <kbd>Alt</kbd>}
        {index === 2 && <Move size={20} aria-hidden="true" />}
        {index === 3 && <ArrowUpFromLine size={20} aria-hidden="true" />}
      </div> : zoom ? <div className="foundation-wheel-direction">
        <MouseDiagram control={2} direction={index === 0 ? 'up' : 'down'} />
        <span>{language === 'ja' ? (index === 0 ? 'ホイールを前へ ↑' : 'ホイールを後ろへ ↓') : (index === 0 ? 'Scroll forward ↑' : 'Scroll backward ↓')}</span>
      </div> : pan ? (index === 0 ? <MousePointer2 size={38} aria-hidden="true" /> : <div className="foundation-wheel-direction"><MouseDiagram control={2} />{index === 2 ? <Move size={20} aria-hidden="true" /> : index === 3 ? <ArrowUpFromLine size={20} aria-hidden="true" /> : null}</div>) : <MouseDiagram control={index} />}</div>
      <p style={{whiteSpace: 'pre-line'}}>{renderFormattedText(section.text)}</p>
    </li>)}</ul>
    {sections[count] && <section><h4 className="section-title">{sections[count].title}</h4>
      {sections[count].text.split('\n\n').map(line => <p key={line}>{renderFormattedText(line)}</p>)}
    </section>}
  </div>;
}
