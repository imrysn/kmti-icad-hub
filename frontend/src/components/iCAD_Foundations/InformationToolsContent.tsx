import InformationReferenceIcon from './InformationReferenceIcon';
import {useId} from 'react';
import {renderFormattedText} from './WrittenTutorial_EN/WrittenTutorialPanel';
import FoundationViewComparison from './FoundationViewComparison';
import MaterialUnlistedContent from './MaterialUnlistedContent';
import InterfaceIconPreview from './InterfaceIconPreview';
import coordinates from '../../assets/icad-foundations/information/coordinates.png';
import length from '../../assets/icad-foundations/information/length.png';
import distance from '../../assets/icad-foundations/information/distance.png';
import angle from '../../assets/icad-foundations/information/angle.png';
import entity from '../../assets/icad-foundations/information/entity.png';
import './FoundationViewComparison.css';
import './ChangeColorArtwork.css';
import './InformationToolsContent.css';
const captures=[coordinates,length,distance,angle,entity];
function ToolVisual({index,title,japanese,result=false}:{index:number;title:string;japanese:boolean;result?:boolean}) {
 const id=useId();
 const bounds:[number,number,number,number]=result?(index===0?[555,327,390,163]:index===4?[555,308,390,410]:[587,359,390,166]):[1751+(index===4?0:index*32),index===4?297:264,30,30];
 const artwork=result?<svg className="change-color-preview-artwork" viewBox={bounds.join(' ')} role="img" aria-label={title}><defs><clipPath id={id}><rect x={bounds[0]} y={bounds[1]} width={bounds[2]} height={bounds[3]}/></clipPath></defs><image href={captures[index]} width="1920" height="1080" clipPath={`url(#${id})`}/></svg>:<InformationReferenceIcon index={index} title={title}/>;
 return <InterfaceIconPreview index={index} toolbar={false} title={title} japanese={japanese} custom={{artwork,screen:captures[index],region:{bounds,landing:bounds},highlightColor:'#0087ef'}}/>;
}
export default function InformationToolsContent({text,title,index,japanese=false}:{text:string;title:string;index:number;japanese?:boolean}) {
 if(index===0) return <div className="foundation-view-comparison information-tools foundation-view-comparison--five"><div className="foundation-view-comparison__cards">{text.split('\n\n').map((block,i)=>{const [heading,...body]=block.split('\n');return <section className="foundation-view-comparison__card" key={heading}><div className="foundation-view-comparison__front"><h5>{heading}</h5><div className="information-tools__visuals"><ToolVisual index={i} title={heading} japanese={japanese}/></div><p>{renderFormattedText(body.join('\n'))}</p></div></section>;})}</div></div>;
 if(index===1) return <FoundationViewComparison text={text} customIcons={[<span key="edges"/>,<span key="points"/>]}/>;
 if(index===2) return <MaterialUnlistedContent text={text} title={title} index={2} japanese={japanese}/>;
 return <p>{renderFormattedText(text)}</p>;
}
