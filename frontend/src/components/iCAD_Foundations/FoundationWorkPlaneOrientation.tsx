import xy from '../../assets/icad-foundations/modeling/work-plane-xy.png';
import xz from '../../assets/icad-foundations/modeling/work-plane-xz.png';
import yz from '../../assets/icad-foundations/modeling/work-plane-yz.png';
import keyImage from '../../assets/icad-foundations/modeling/muhenkan-key.png';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationWorkPlaneOrientation.css';

export default function FoundationWorkPlaneOrientation({text,shortcut=false}: {text:string;shortcut?:boolean}) {
  if(!shortcut) return <div className="work-plane-orientations"><p>{renderFormattedText(text)}</p><div className="work-plane-orientations__images">
    {[xy,xz,yz].map((src,n)=><img key={src} src={src} alt={`${['X-Y','X-Z','Y-Z'][n]} Work Plane`}/>)}
  </div></div>;
  const paragraphs=text.trim().split('\n\n');
  return <div className="work-plane-shortcut">
    <div className="work-plane-shortcut__keys"><img src={keyImage} alt="無変換 (Muhenkan)"/><span>+</span><kbd>W</kbd></div>
    {paragraphs.map((paragraph,n)=>paragraph.startsWith('"%ICADDIR%') ? <pre key={n}><code>{paragraph}</code></pre> : <p key={n}>{renderFormattedText(paragraph)}</p>)}
  </div>;
}
