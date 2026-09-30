import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import InterfaceIconPreview from './InterfaceIconPreview';
import './MaterialUnlistedContent.css';
import drawing from '../../assets/icad-foundations/modeling/material-unlisted-drawing.png';
import information from '../../assets/icad-foundations/modeling/material-unlisted-information.png';

export default function MaterialUnlistedContent({text,title,index,japanese=false}:{text:string;title:string;index:number;japanese?:boolean}) {
  if(index===2) {
    const [head,...rows]=text.split('\n').map(row=>row.split('|').map(cell=>cell.trim()));
    return <div style={{overflowX:'auto'}}><table aria-label={title} style={{borderCollapse:'collapse',width:'100%',maxWidth:620,margin:'0 auto'}}>
      <thead><tr>{head.map(cell=><th key={cell} scope="col" style={{border:'1px solid #94a3b8',padding:'8px 12px',textAlign:'left'}}>{cell}</th>)}</tr></thead>
      <tbody>{rows.map(([material,equivalent])=><tr key={material}><th scope="row" style={{border:'1px solid #94a3b8',padding:'8px 12px',textAlign:'left'}}>{material}</th><td style={{border:'1px solid #94a3b8',padding:'8px 12px'}}>{equivalent}</td></tr>)}</tbody>
    </table></div>;
  }
  return <div><p>{renderFormattedText(text)}</p><div className="material-unlisted-preview" style={{aspectRatio:index===0?'366 / 269':'415 / 295'}}><InterfaceIconPreview index={index} toolbar={false} title={title} japanese={japanese} custom={{artworkOnly:true,screen:index===0?drawing:information,region:{bounds:[0,0,1920,1080],landing:[0,0,1920,1080]},artwork:<img className="material-unlisted-image" src={index===0?drawing:information} alt={title}/>}}/></div></div>;
}
