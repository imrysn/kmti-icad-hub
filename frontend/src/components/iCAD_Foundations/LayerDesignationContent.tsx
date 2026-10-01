import {renderFormattedText} from './WrittenTutorial_EN/WrittenTutorialPanel';
import MaterialUnlistedContent from './MaterialUnlistedContent';
import InterfaceIconPreview from './InterfaceIconPreview';
import materialColors from '../../assets/3d-images/properties_material.png';
import common from '../../assets/3d-images/layer1.png';
import painted from '../../assets/3d-images/layer2.png';
import unpainted from '../../assets/3d-images/acrylic_pointer.png';
import treated from '../../assets/3d-images/isonite_manganese.png';
import purchased from '../../assets/3d-images/layer3.png';
import './FoundationViewComparison.css';
import './LayerDesignationContent.css';

export default function LayerDesignationContent({text,title,index,japanese=false}:{text:string;title:string;index:number;japanese?:boolean}) {
  if(index===0) return <div className="foundation-view-comparison layer-designation"><div className="foundation-view-comparison__cards">
    {text.split('\n\n').map((block,i)=>{const [heading,...lines]=block.split('\n');const image=[common,painted,unpainted,treated,purchased][i];return <section className="foundation-view-comparison__card" key={heading}><div className="foundation-view-comparison__front">
      <h5>{heading}</h5>
      <div className="layer-designation__image"><InterfaceIconPreview index={i} toolbar={false} title={heading} japanese={japanese} custom={{artworkOnly:true,artwork:<img className="layer-designation-artwork" src={image} alt={heading}/>,screen:image,region:{bounds:[0,0,1920,1080],landing:[0,0,1920,1080]}}}/></div>
      <p>{renderFormattedText(lines.join('\n'))}</p>
    </div></section>;})}
  </div></div>;
  if(index===4) return <p>{renderFormattedText(text)}</p>;
  return <div className="layer-designation__table">{index===2&&<p>{japanese?'パーツの色を指定するときは、材質リストの色情報に従います。':'Use the Color information provided in the Material List when assigning the part color.'}</p>}<MaterialUnlistedContent text={text} title={title} index={2} japanese={japanese}/>{index===2&&<div className="layer-designation__material-image"><InterfaceIconPreview index={5} toolbar={false} title={japanese?'材質リストの色番号':'Material List Color Codes'} japanese={japanese} custom={{artworkOnly:true,artwork:<img className="layer-designation-artwork" src={materialColors} alt={japanese?'材質リストの色番号':'Material List Color Codes'}/>,screen:materialColors,region:{bounds:[0,0,732,419],landing:[0,0,732,419]}}}/></div>}</div>;
}
