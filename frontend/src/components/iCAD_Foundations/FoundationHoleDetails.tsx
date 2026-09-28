import command from '../../assets/3d-images/basic_operation6_arrange_machine_part.png';
import tools from '../../assets/3d-images/hole_details_list_tools.png';
import placement from '../../assets/icad-foundations/modeling/hole-details-placement.png';
import cut from '../../assets/icad-foundations/modeling/hole-details-cut.png';
import bracket from '../../assets/icad-foundations/modeling/hole-details-tapped-bracket.png';
import block from '../../assets/icad-foundations/modeling/hole-details-tapped-block.png';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';

export default function FoundationHoleDetails({text,index,japanese=false}:{text:string;index:number;japanese?:boolean}) {
  const samples=[[command],[tools],[placement,cut],[bracket,block]];
  const labels=japanese?['機械部品配置アイコン','穴ツール、規格、寸法、プレビュー','穴の配置前と配置後','緑色で示したタップ穴']:['Arrange Machine Part icon highlighted in red','Hole tool list, standards, dimensions, and preview','Hole placement before and after','Tapped holes marked green'];
  return <div style={{width:'100%',minWidth:0}}>
    <p>{renderFormattedText(text)}</p>
    <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'center',gap:24,margin:'24px auto'}}>
      {samples[index].map((src,n)=><img key={src} src={src} alt={`${labels[index]}${index===2?(n===0?(japanese?'：配置前':': before'):(japanese?'：配置後':': after')):''}`} style={{display:'block',maxWidth:'100%',width:index===0?400:index===1?'100%':'auto',height:index<2?'auto':index===2?190:240,objectFit:'contain',border:0}}/>)}
    </div>
  </div>;
}
