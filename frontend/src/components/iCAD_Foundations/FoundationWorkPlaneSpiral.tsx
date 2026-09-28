import setup from '../../assets/icad-foundations/modeling/work-plane-spiral-setup.png';
import pitch from '../../assets/icad-foundations/modeling/work-plane-spiral-pitch.png';
import result from '../../assets/icad-foundations/modeling/work-plane-spiral-result.png';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationWorkPlaneSpiral.css';

function Sample({ src, size, crop, title }: { src: string; size: [number, number]; crop: string; title: string }) {
  return <svg viewBox={crop} role="img" aria-label={title} className="work-plane-spiral-sample">
    <image href={src} width={size[0]} height={size[1]} />
  </svg>;
}

export default function FoundationWorkPlaneSpiral({ text, index, japanese = false }: { text: string; index: number; japanese?: boolean }) {
  const labels = japanese
    ? ['断面、回転軸、厚さ、谷径、外径、長さ', 'スパイラル形状アイコン', 'ピッチ50とスケール1', '隣り合う巻きのピッチ', '軸上の始点P1と終点P2', '完成したらせんの側面図', '完成したらせんの斜視図']
    : ['Cross-section, axis, thickness, root diameter, outer diameter, and length', 'Spiral Form icon highlighted in the menu', 'Pitch 50 and both scales set to 1', 'Pitch between adjacent turns', 'Start P1 and end P2 along the axis', 'Side view of the completed spiral', 'Angled view of the completed spiral'];
  return <div className={`work-plane-spiral work-plane-spiral--${index}`}>
    {text.split('\n\n').map((part, i) => <p key={i}>{renderFormattedText(part)}</p>)}
    {index === 0 && <Sample src={setup} size={[1075,674]} crop="142 91 725 393" title={labels[0]} />}
    {index === 1 && <Sample src={setup} size={[1075,674]} crop="105 536 149 98" title={labels[1]} />}
    {index === 2 && <div className="work-plane-spiral-pitch">
      <Sample src={pitch} size={[750,699]} crop={japanese ? '47 142 433 29' : '47 72 433 30'} title={labels[2]} />
      <Sample src={pitch} size={[750,699]} crop="502 73 218 228" title={labels[3]} />
    </div>}
    {index === 3 && <Sample src={pitch} size={[750,699]} crop="44 233 404 432" title={labels[4]} />}
    {index === 4 && <div className="work-plane-spiral-result">
      <Sample src={result} size={[707,382]} crop="41 46 287 301" title={labels[5]} />
      <Sample src={result} size={[707,382]} crop="383 46 296 301" title={labels[6]} />
    </div>}
  </div>;
}
