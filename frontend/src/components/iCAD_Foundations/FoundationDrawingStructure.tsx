import FoundationImagePreview from './FoundationImagePreview';
import { FileText, Layers, Box } from 'lucide-react';
import drawingExample from '../../assets/icad-foundations/drawing/drawing-structure-single-part.png';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationUsesCards.css';
import './FoundationDrawingStructure.css';

type Section = { title: string; text: string };

function Content({ text }: { text: string }) {
  return <>{text.split('\n\n').map((block, index) => {
    const [intro, ...lines] = block.split('\n');
    return <div key={index}>
      <p>{renderFormattedText(intro)}</p>
      {lines.length > 0 && (lines.every(line => line.startsWith('- '))
        ? <ul>{lines.map(line => <li key={line}>{renderFormattedText(line.slice(2))}</li>)}</ul>
        : <p style={{ whiteSpace: 'pre-line' }}>{renderFormattedText(lines.join('\n'))}</p>)}
    </div>;
  })}</>;
}

export default function FoundationDrawingStructure({ sections, japanese = false }: { sections: Section[]; japanese?: boolean }) {
  const icons = [FileText, Layers, Box];
  return <div className="foundation-drawing-structure">
    <section>
      <h4 className="section-title">{sections[0].title}</h4>
      <p>{sections[0].text.split('\n\n')[0]}</p>
      <div className="foundations-uses">
        <ol className="foundations-uses__grid">
          {sections.slice(1, 4).map((section, index) => {
            const Icon = icons[index];
            return <li className="foundations-use-card" key={section.title}>
              <span className="foundations-use-card__number" aria-hidden="true">{index + 1}</span>
              <h5 className="foundations-use-card__title">{section.title}</h5>
              <div className="foundations-use-card__icon-frame"><Icon aria-hidden="true" strokeWidth={1.6} /></div>
              <div className="foundations-use-card__body"><Content text={section.text} /></div>
            </li>;
          })}
        </ol>
      </div>
    </section>
    <section>
      <h4 className="section-title">{sections[4].title}</h4>
      <figure className="foundation-drawing-structure__example">
        <FoundationImagePreview src={drawingExample} japanese={japanese} alt={japanese ? "Training_Plate_01：左にツリービュー、作業領域に穴のある板を表示した図面。" : "Training_Plate_01 drawing with an expanded Tree View and a plate with holes."} />
        <figcaption>{japanese ? "画像をクリックすると全画面で表示します。" : "Click the image to view it at full size."}</figcaption>
      </figure>
      <Content text={sections[4].text} />
    </section>
  </div>;
}
