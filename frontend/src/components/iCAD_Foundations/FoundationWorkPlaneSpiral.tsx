import FoundationCreationCommandIcon from './FoundationCreationCommandIcon';
import { useId } from 'react';
import interfaceScreen from '../../assets/icad-foundations/modeling/work-plane-command-interface.png';
import InterfaceIconPreview from './InterfaceIconPreview';
import setup from '../../assets/icad-foundations/modeling/work-plane-spiral-setup.png';
import pitch from '../../assets/icad-foundations/modeling/work-plane-spiral-pitch.png';
import result from '../../assets/icad-foundations/modeling/work-plane-spiral-result.png';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import FoundationUsesCards from './FoundationUsesCards';
import './FoundationStretchSteps.css';
import './FoundationWorkPlaneSpiral.css';

function Sample({ src, size, crop, title }: { src: string; size: [number, number]; crop: string; title: string }) {
  const clipId = useId();
  const [x,y,w,h] = crop.split(' ').map(Number);
  return <svg viewBox={crop} role="img" aria-label={title} className="work-plane-spiral-sample" style={{overflow:'hidden'}}>
    <defs><clipPath id={clipId}><rect x={x} y={y} width={w} height={h}/></clipPath></defs>
    <image clipPath={`url(#${clipId})`} href={src} width={size[0]} height={size[1]} />
  </svg>;
}

export default function FoundationWorkPlaneSpiral({ text, index, japanese = false }: { text: string; index: number; japanese?: boolean }) {
  const labels = japanese
    ? ['断面、回転軸、厚さ、谷径、外径、長さ', 'Spiral Form', 'ピッチ50とスケール1', '隣り合う巻きのピッチ', '軸上の始点P1と終点P2', '完成したらせんの側面図', '完成したらせんの斜視図']
    : ['Cross-section, axis, thickness, root diameter, outer diameter, and length', 'Spiral Form', 'Pitch 50 and both scales set to 1', 'Pitch between adjacent turns', 'Start P1 and end P2 along the axis', 'Side view of the completed spiral', 'Angled view of the completed spiral'];
  const preview = (src:string, size:[number,number], crop:string, title:string, command=false) => {
    const [x,y,w,h] = crop.split(' ').map(Number);
    const bounds:[number,number,number,number] = [x / size[0] * 1920, y / size[1] * 1080, w / size[0] * 1920, h / size[1] * 1080];
    const artwork = command?<FoundationCreationCommandIcon command="spiral" title={title}/>:<Sample src={src} size={size} crop={crop} title={title} />;
    return <InterfaceIconPreview index={0} toolbar={false} title={title} japanese={japanese} custom={{artwork,artworkOnly:!command,screen:src,screenSize:command?undefined:size,region:{bounds,landing:bounds},highlightColor:command?'#0087ef':'transparent'}} />;
  };
  if (index === 0) return <div className="work-plane-spiral foundation-stretch-steps foundation-stretch-steps--4">
    <FoundationUsesCards text={text} customIcons={[
      <div key="section" className="work-plane-spiral-preview">{preview(setup,[1075,674],'142 91 725 393',labels[0])}</div>,
      <div key="command" className="work-plane-spiral-preview work-plane-spiral-preview--command">{preview(interfaceScreen,[1920,1080],'1817 296 26 32',labels[1],true)}</div>,
      <div key="pitch" className="work-plane-spiral-pitch">
        {preview(pitch,[750,699],japanese ? '47 142 433 29' : '47 72 433 30',labels[2])}
        {preview(pitch,[750,699],'502 73 218 228',labels[3])}
      </div>,
      <div key="length" className="work-plane-spiral-preview">{preview(pitch,[750,699],'44 233 404 432',labels[4])}</div>,
    ]} />
  </div>;
  return <div className="work-plane-spiral">
    {text.split('\n\n').map((part, i) => <p key={i}>{renderFormattedText(part)}</p>)}
    <div className="work-plane-spiral-result">
      <Sample src={result} size={[707,382]} crop="41 46 287 301" title={labels[5]} />
      <Sample src={result} size={[707,382]} crop="383 46 296 301" title={labels[6]} />
    </div>
  </div>;
}
