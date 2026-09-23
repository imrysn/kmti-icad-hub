import { useFoundationVisuals } from './FoundationVisualContext';
import FoundationCreationCommandIcon from './FoundationCreationCommandIcon';
import { SteelProfileArtwork, MachinePartMenuArtwork, SteelDialogArtwork } from './ShapeSteelArtwork';
import arrangePartScreen from '../../assets/icad-foundations/shape-steel/arrange-machine-part-interface.png';
import shapeSteelDialogScreen from '../../assets/icad-foundations/shape-steel/shape-steel-dialog-interface.png';
import shapeSteelPositionScreen from '../../assets/icad-foundations/shape-steel/shape-steel-position-interface.png';
import FoundationModelingInputIcon from './FoundationModelingInputIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationShapeSteelLesson.css';

function ArrangePartIcon({title,japanese}: {title:string;japanese:boolean}) {
  const singleCommand=useFoundationVisuals();
  const artwork=singleCommand ? <FoundationCreationCommandIcon command="machinePart" title={title}/> : <MachinePartMenuArtwork title={title}/>;
  return <InterfaceIconPreview index={0} toolbar={false} title={title} japanese={japanese} custom={{artwork,screen:arrangePartScreen,region:{bounds:[1751,314,30,31],landing:singleCommand?[1751,314,30,31]:[1748,291,132,58]},highlightColor:'#0087ef'}}/>;
}

function ShapeSteelDialogIcon({title,japanese}: {title:string;japanese:boolean}) {
  const artwork=<SteelDialogArtwork title={title}/>;
  return <InterfaceIconPreview index={1} toolbar={false} title={title} japanese={japanese} custom={{artwork,screen:shapeSteelDialogScreen,region:{bounds:[5,5,805,653],landing:[5,5,805,653]},highlightColor:'#0087ef'}}/>;
}

function WorkflowIcon({index,title,japanese}: {index:number;title:string;japanese:boolean}) {
  if(index===0) return <ArrangePartIcon title={title} japanese={japanese}/>;
  if(index===1) return <ShapeSteelDialogIcon title={title} japanese={japanese}/>;
  return <FoundationModelingInputIcon index={2} box professional japanese={japanese} previewScreen={shapeSteelPositionScreen}/>;
}

function parseBlocks(text:string) {
  return text.split(/\n\n(?=\*\*)/).map(block=>{
    const [heading,...body]=block.split('\n');
    return {title:heading.replaceAll('**','').replace(/^(?:Step|ステップ) \d+\s*—\s*/,''),body:body.join('\n')};
  });
}

export default function FoundationShapeSteelLesson({text,profiles,japanese=false}: {text:string;profiles?:boolean;japanese?:boolean}) {
  const blocks=parseBlocks(text);
  return <div className={`foundations-uses foundations-uses--aligned foundation-shape-steel${profiles?' foundation-shape-steel--profiles':' foundation-shape-steel--steps'}`}><ul className="foundations-uses__grid">
    {blocks.map((block,index)=>profiles
      ? <li className="foundations-use-card foundation-shape-steel-profile" key={index}><div className="foundations-use-card__icon-frame"><SteelProfileArtwork index={index} title={block.title}/></div><h5 className="foundations-use-card__title">{block.title}</h5><div className="foundations-use-card__body"><p>{renderFormattedText(block.body)}</p></div></li>
      : <li className="foundations-use-card" key={index}><span className="foundations-use-card__number" aria-hidden="true">{index+1}</span><h5 className="foundations-use-card__title">{block.title}</h5><div className="foundations-use-card__icon-frame"><WorkflowIcon index={index} title={block.title} japanese={japanese}/></div><div className="foundations-use-card__body"><p>{renderFormattedText(block.body)}</p></div></li>)}
  </ul></div>;
}
