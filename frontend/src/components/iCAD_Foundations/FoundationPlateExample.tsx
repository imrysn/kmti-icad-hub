import FoundationImagePreview from './FoundationImagePreview';
import drawingExample from '../../assets/icad-foundations/drawing-structure-single-part.png';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationDrawingStructure.css';

export default function FoundationPlateExample({ text, japanese = false }: { text: string; japanese?: boolean }) {
  return <>
    <figure className="foundation-drawing-structure__example">
      <FoundationImagePreview src={drawingExample} japanese={japanese} alt={japanese ? "ツリービューの plate 部品と作業領域の板の形状。" : "The plate Part in the Tree View and its plate shape in the working area."} />
      <figcaption>{japanese ? "画像をクリックすると全画面で表示します。" : "Click the image to view it at full size."}</figcaption>
    </figure>
    {text.split('\n\n').map(paragraph => <p key={paragraph}>{renderFormattedText(paragraph)}</p>)}
  </>;
}
