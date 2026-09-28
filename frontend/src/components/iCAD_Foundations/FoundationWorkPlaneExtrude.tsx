import interfaceScreen from '../../assets/icad-foundations/modeling/work-plane-extrude-profile.png';
import profile from '../../assets/icad-foundations/modeling/work-plane-extrude-profile-sample.png';
import height from '../../assets/icad-foundations/modeling/work-plane-extrude-height-sample.png';
import dialog from '../../assets/icad-foundations/modeling/work-plane-extrude-dialog-sample.png';
import result from '../../assets/icad-foundations/modeling/work-plane-extrude-result-sample.png';
import FoundationUsesCards from './FoundationUsesCards';
import InterfaceIconPreview from './InterfaceIconPreview';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationWorkPlaneExtrude.css';

function Preview({step,japanese}: {step:number;japanese:boolean}) {
 const screens=[interfaceScreen,profile,height,dialog,result];
 const sizes:[number,number][]=[[1920,1080],[143,261],[154,259],[189,285],[173,284]];
 const titles=japanese?['垂直投影','閉領域の選択','押し出しプレビュー','作業平面の削除確認','完成した立体']:['Extrude','Select the enclosed profile','Extrusion preview','Work Plane deletion prompt','Final solid'];
 const regions:[number,number,number,number][]=[[1752,262,28,31],[0,0,1920,1080],[0,0,1920,1080],[0,0,1920,1080],[0,0,1920,1080]];
 const crops=['1752 262 28 31','0 0 143 261','0 0 154 259','0 0 189 285','0 0 173 284'];
 const artwork=<svg viewBox={crops[step]} role="img" aria-label={titles[step]}><image href={screens[step]} width={sizes[step][0]} height={sizes[step][1]}/></svg>;
 return <div className={`work-plane-extrude-preview work-plane-extrude-preview--${step}`}><InterfaceIconPreview index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,screen:screens[step],screenSize:step===0?undefined:sizes[step],region:{bounds:regions[step],landing:regions[step]},highlightColor:step===0?'#0087ef':'transparent'}}/></div>;
}
export default function FoundationWorkPlaneExtrude({text,index,japanese=false}: {text:string;index:number;japanese?:boolean}) {
 if(index===1) return <div className="work-plane-extrude-steps"><FoundationUsesCards text={text} customIcons={[0,1,2].map(step=><Preview key={step} step={step} japanese={japanese}/>)}/></div>;
 return <div className="work-plane-extrude-detail">{text.split('\n\n').map((part,n)=>part.startsWith('- ')?<ul key={n}>{part.split('\n').map(line=><li key={line}>{renderFormattedText(line.replace(/^- /,''))}</li>)}</ul>:<p key={n}>{renderFormattedText(part)}</p>)}<Preview step={index===2?3:4} japanese={japanese}/></div>;
}
