import FoundationCreationCommandIcon from './FoundationCreationCommandIcon';
import command from '../../assets/icad-foundations/modeling/hole-details-command-screen.png';
import tools from '../../assets/3d-images/hole_details_list_tools.png';
import placement from '../../assets/icad-foundations/modeling/hole-details-placement.png';
import cut from '../../assets/icad-foundations/modeling/hole-details-cut.png';
import bracket from '../../assets/icad-foundations/modeling/hole-details-tapped-bracket.png';
import block from '../../assets/icad-foundations/modeling/hole-details-tapped-block.png';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';

import FoundationUsesCards from './FoundationUsesCards';
import InterfaceIconPreview from './InterfaceIconPreview';
import './FoundationStretchSteps.css';
import './FoundationHoleDetails.css';

function CommandArtwork({title}:{title:string}) {
  return <FoundationCreationCommandIcon command="referenceMachinePart" title={title}/>;
}

export default function FoundationHoleDetails({text,index,japanese=false}:{text:string;index:number;japanese?:boolean}) {
  const preview=(src:string,title:string)=><InterfaceIconPreview index={0} toolbar={false} title={title} japanese={japanese} custom={{artwork:<img src={src} alt={title} style={{display:'block',width:'100%',height:'100%',objectFit:'contain'}}/>,artworkOnly:true,screen:src,region:{bounds:[0,0,1920,1080],landing:[0,0,1920,1080]}}}/>;
  const commandTitle=japanese?'Arrange Machine Part':'Arrange Machine Part';
  if(index===0) return <div className="foundation-hole-steps foundation-stretch-steps foundation-stretch-steps--4">
    <FoundationUsesCards text={text} customIcons={[
      <div key="command" className="foundation-hole-image foundation-hole-image--command"><InterfaceIconPreview index={0} toolbar={false} title={commandTitle} japanese={japanese} custom={{artwork:<CommandArtwork title={commandTitle}/>,screen:command,region:{bounds:[1752,315,28,28],landing:[1752,315,28,28]}}}/></div>,
      <div key="tools" className="foundation-hole-image">{preview(tools,japanese?'ツール一覧、規格、寸法、プレビュー':'Available tools, standards, dimensions, and preview')}</div>,
      <span key="confirm" className="foundation-hole-confirm" aria-label={japanese?'OKで確定':'Confirm with OK'}>OK</span>,
      <div key="placement" className="foundation-hole-pair">{preview(placement,japanese?'穴の配置前':'Before placement')}{preview(cut,japanese?'穴の作成後':'After creating the cut')}</div>,
    ]}/>
  </div>;
  return <div className="foundation-hole-detail">
    <p>{renderFormattedText(text)}</p>
    {index===2 && <div className="foundation-hole-examples">
      {preview(bracket,japanese?'緑色のタップ穴：ブラケット':'Green tapped holes: bracket')}
      {preview(block,japanese?'緑色のタップ穴：ブロック':'Green tapped holes: block')}
    </div>}
  </div>;
}
