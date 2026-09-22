import FoundationExtrudePreview from './FoundationExtrudePreview';
import FoundationBoxSetup from './FoundationBoxSetup';
import FoundationMovePreview from './FoundationMovePreview';
import type { OperationTopic } from './OperationMenuSvg';
import FoundationOperationPreview from './FoundationOperationPreview';
import InterfaceIconPreview from './InterfaceIconPreview';
import ToolbarReferenceSvg from './ToolbarReferenceSvg';
import interfaceImage from '../../assets/icad-foundations/interface/icad-interface.jpg';
import { interfaceIconRegion } from './interfaceIconLocations';
import FoundationModelingInputIcon from './FoundationModelingInputIcon';
import FoundationSketchPreview from './FoundationSketchPreview';
import { Box, Hexagon, Ruler, MapPin, CheckCircle, Move, MousePointer2, Copy, Trash2, CheckSquare, Undo2, RotateCw, FlipHorizontal, Pencil, Layers } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationUsesCards.css';
import './FoundationModelingProcess.css';

function Cylinder() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
  </svg>;
}

export default function FoundationModelingProcess({
  text,
  cylinder = false,
  polygon = false,
  cone = false,
  torus = false,
  professional = false,
  move = false,
  copy = false,
  rotate = false,
  rotateCopy = false,
  mirror = false,
  mirrorCopy = false,
  deleting = false,
  sketch = false,
  extrude = false,
  extrudeBoth = false,
  revolve = false,
  inputAreas = false,
  box = false,
  japanese = false
}: {
  text: string;
  cylinder?: boolean;
  polygon?: boolean;
  cone?: boolean;
  torus?: boolean;
  professional?: boolean;
  move?: boolean;
  copy?: boolean;
  rotate?: boolean;
  rotateCopy?: boolean;
  mirror?: boolean;
  mirrorCopy?: boolean;
  deleting?: boolean;
  sketch?: boolean;
  extrude?: boolean;
  extrudeBoth?: boolean;
  revolve?: boolean;
  inputAreas?: boolean;
  box?: boolean;
  japanese?: boolean;
}) {
  const shapeFlow = box || cylinder || polygon || cone || torus;
  const operationTopic: OperationTopic | null = move ? 'move' : copy ? 'copy' : rotate ? 'rotate' : rotateCopy ? 'rotateCopy' : mirror ? 'mirror' : mirrorCopy ? 'mirrorCopy' : deleting ? 'delete' : null;
  const blocks = text.split('\n\n');
  const hasIntro = !/^\*\*(?:Step|ステップ) \d+/.test(blocks[0]);
  const intro = hasIntro ? blocks[0] : '';
  const steps = hasIntro ? blocks.slice(1) : blocks;
  const icons = deleting
    ? [Trash2, MousePointer2, CheckSquare, Undo2]
    : rotate || rotateCopy
    ? [RotateCw, MousePointer2, MapPin, CheckCircle]
    : mirror || mirrorCopy
    ? [FlipHorizontal, MousePointer2, MapPin, CheckCircle]
    : move || copy
    ? [copy ? Copy : Move, MousePointer2, MapPin, CheckCircle]
    : sketch
    ? [Pencil, MousePointer2, MapPin, CheckCircle]
    : extrude
    ? [Layers, MousePointer2, Ruler, CheckCircle]
    : revolve
    ? [RotateCw, MousePointer2, MapPin, CheckCircle]
    : [polygon ? Hexagon : cylinder ? Cylinder : Box, Ruler, MapPin, CheckCircle];
  return <div className={`foundations-uses foundation-modeling-process${sketch ? ' foundation-modeling-process--sketch' : ''}${extrude ? ' foundation-modeling-process--extrude' : ''}${shapeFlow ? ' foundation-modeling-process--box' : ''}`}>
    {intro && <p>{renderFormattedText(intro)}</p>}
    <ol className="foundations-uses__grid">
      {steps.map((step, index) => {
        const [heading, ...lines] = step.split('\n');
        const sizeFields = professional && shapeFlow && index === 3
          ? lines.map(line => line.match(/^\*\*(.+?)[：:]\s*(\d+(?:\.\d+)?)\*\*$/)).filter(match => match !== null)
          : [];
        const Icon = icons[index] || Box;
        return <li className="foundations-use-card" key={heading}>
          <span className="foundations-use-card__number" aria-hidden="true">{index + 1}</span>
          <h5 className="foundations-use-card__title">{heading.replace(/\*\*/g, '').replace(/^(?:(?:Step|ステップ) \d+ —\s*|\d+\.\s*)/, '')}</h5>
          <div className="foundations-use-card__icon-frame">{professional && deleting && index === 3 ? <div className="foundation-undo-preview"><InterfaceIconPreview index={6} toolbar title={heading.replaceAll('**','')} japanese={japanese} custom={{artwork:<ToolbarReferenceSvg index={6} title={heading.replaceAll('**','')} highlightUndo/>,screen:interfaceImage,region:interfaceIconRegion(6,true)}}/></div> : move && professional ? <FoundationMovePreview index={index} japanese={japanese}/> : professional && operationTopic && operationTopic !== 'move' && !(deleting && index === 3) ? <FoundationOperationPreview topic={operationTopic} index={index} title={heading.replaceAll('**','').replace(/^.*?—\s*/, '')} japanese={japanese}/> : (extrude || revolve) && professional ? <FoundationExtrudePreview revolve={revolve} bothSides={extrudeBoth} index={index} title={heading.replaceAll('**','')} japanese={japanese}/> : sketch ? <FoundationSketchPreview index={index} title={heading.replaceAll('**','')} japanese={japanese}/> : shapeFlow && (index===0 || index===2) ? <FoundationBoxSetup japanese={japanese} orientation={index===2} cylinder={cylinder} polygon={polygon} cone={cone} torus={torus} professional={professional} iconOnly/> : (inputAreas || shapeFlow) ? <FoundationModelingInputIcon index={shapeFlow ? (index===1 ? 0 : index-2) : index} japanese={japanese} box={box} cylinder={cylinder} polygon={polygon} cone={cone} torus={torus} professional={professional}/> : (move && index === 2) ? (
            <svg className="foundation-modeling-size-fields" viewBox="0 0 160 80" role="img" aria-label={`Item Entry: ${japanese ? '移動量X 10, 移動量Y 60, 移動量Z 10' : 'MOVELENGX 10, MOVELENGY 60, MOVELENGZ 10'}`} fontFamily="Meiryo, sans-serif" fontSize="11" fill="#111">
              <g transform="translate(0 0)"><rect x="1" y="1" width="158" height="24" fill="#eee" stroke="#999"/><text x="4" y="17" fontWeight="600">{japanese ? '移動量X' : 'MOVELENGX'}</text><rect x="96" y="3" width="60" height="20" fill="white" stroke="#999"/><text x="102" y="17">10.0</text></g>
              <g transform="translate(0 26)"><rect x="1" y="1" width="158" height="24" fill="#eee" stroke="#999"/><text x="4" y="17" fontWeight="600">{japanese ? '移動量Y' : 'MOVELENGY'}</text><rect x="96" y="3" width="60" height="20" fill="white" stroke="#999"/><text x="102" y="17">60.0</text></g>
              <g transform="translate(0 52)"><rect x="1" y="1" width="158" height="24" fill="#eee" stroke="#999"/><text x="4" y="17" fontWeight="600">{japanese ? '移動量Z' : 'MOVELENGZ'}</text><rect x="96" y="3" width="60" height="20" fill="white" stroke="#999"/><text x="102" y="17">10.0</text></g>
            </svg>
          ) : <Icon aria-hidden="true" strokeWidth={1.6} />}</div>
          <div className="foundations-use-card__body">
            {lines.filter(line => !line.startsWith('- ') && !sizeFields.some(field => field[0] === line)).map(line => <p key={line}>{renderFormattedText(line)}</p>)}
            {sizeFields.length > 0 && <dl className="foundation-modeling-field-values">{sizeFields.map(field => <div key={field[1]}><dt>{field[1]}</dt><dd>{field[2]}</dd></div>)}</dl>}
            
            {lines.some(line => line.startsWith('- ')) && <ul>{lines.filter(line => line.startsWith('- ')).map(line => <li key={line}>{line.slice(2)}</li>)}</ul>}
          </div>
        </li>;
      })}
    </ol>
    {shapeFlow && <p className="foundation-modeling-process__video-note">{japanese ? '動画では形状を選択してから正面図に切り替えています。この手順では先に正面図を選びます。どちらの場合も、形状を選択してから Y 方向を設定し、寸法を入力します。' : 'The video selects the shape before switching to Front View. These steps start with Front View. In both, select the shape before choosing Y orientation and entering its size.'}</p>}
    {move && !professional && <p className="foundation-modeling-process__video-note">{japanese ? 'ポイント：ステップ 3 の項目入力による数値移動（移動量X・Y・Z）のほか、ステップ 2 の後に対象上の基準点（頂点）を左クリックし、目的位置を左クリックする「点指定移動」も行えます。' : 'Tip: In addition to entering movement distances (X, Y, Z) in Item Entry, you can also move an entity by selecting a base point on it and left-clicking the destination location.'}</p>}
  </div>;
}
