import { PartEntitySelectionIcon } from './PartCreateArtwork';
import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import selected from '../../assets/icad-foundations/modeling/part-rename-selected.png';
import information from '../../assets/icad-foundations/modeling/part-rename-information.png';
import result from '../../assets/icad-foundations/modeling/part-rename-result.png';

export default function PartRenameArtwork({step,japanese}:{step:number;japanese:boolean}) {
  if(step===3) {
    const title=japanese?'ツリービュー：70×10×50 → 70×10×80':'Tree View: 70×10×50 → 70×10×80';
    const artwork=<svg className="stretch-vector" viewBox="0 0 480 175" role="img" aria-label={title}>
      {[selected,result].map((source,i)=><g key={source}>
        <text x={i*250+110} y="18" textAnchor="middle" fontSize="16" fill="currentColor">{i===0?(japanese?'変更前':'Before'):(japanese?'変更後':'After')}</text>
        <svg x={i*250} y="28" width="220" height="100" viewBox="140 155 230 105"><image href={source} width="1920" height="1080"/><rect x="194" y="190" width="85" height="23" fill="none" stroke="#16799e" strokeWidth="2"/></svg>
        <text x={i*250+110} y="156" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#16799e">{i===0?'70×10×50':'70×10×80'}</text>
      </g>)}
      <text x="235" y="88" textAnchor="middle" fontSize="22" fill="#16799e">→</text>
    </svg>;
    const bounds:[number,number,number,number]=[140,155,230,105];
    return <InterfaceIconPreview index={step} toolbar={false} title={title} japanese={japanese} custom={{artwork,screen:result,artworkOnly:true,region:{bounds,landing:bounds}}}/>;
  }
  const titles=japanese?['パーツ名を変更する','要素を選択','名称変更 — 新しい情報','Yes','更新されたパーツ名']:['Change 3D Part Name「パーツ名を変更する」','Select the Entity','Enter the New Information (名称変更)','Yes','Updated Part Name'];
  const screen=step===2?information:selected;
  const bounds:[number,number,number,number]=step===0?[0,0,1920,1080]:step===1?[820,310,440,500]:step===2?[512,228,895,617]:[140,158,230,95];
  const labels=japanese?['新パーツ名','新図面名（外部パーツ）','新パーツコメント','リンクされた2Dパーツ名も変更','OK：変更を確定']:['New 3D Part Name','New Drawing Name (external parts)','New Comment','Check to also change the linked 2D Part Name','OK: Apply the changes'];
  const overlay=step===2?<g fontFamily="Arial,sans-serif" fontSize="16">
    {[[682,317,159,62],[956,317,159,62],[1231,317,159,62],[517,790,100,20],[726,811,94,21]].map(([x,y,w,h],i)=><g key={i}>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="#16799e" strokeWidth="2"/>
      <circle cx={x+12} cy={y-12} r="10" fill="#16799e"/><text x={x+12} y={y-8} textAnchor="middle" fill="white" fontSize="13">{i+1}</text>
      <rect x="550" y={440+i*48} width="650" height="38" rx="6" fill="white" stroke="#c5d7e1"/>
      <text x="565" y={465+i*48} fill="#263442">{i+1}. {labels[i]}</text>
    </g>)}
  </g>:undefined;
  const artwork=step===0?<div className="stretch-vector" style={{display:'grid',placeItems:'center'}}><FoundationOperationCommandIcon command="part-rename" title={titles[0]}/></div>:step===1?<PartEntitySelectionIcon title={titles[1]}/>:<svg className="stretch-vector" viewBox={bounds.join(' ')} role="img" aria-label={titles[step]}><image href={screen} width="1920" height="1080"/>{overlay}</svg>;
  return <div className={step===4?'foundation-part-rename-result':undefined}><InterfaceIconPreview index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,screen,screenOverlay:overlay,artworkOnly:step===0,region:{bounds,landing:bounds},highlightColor:'#0087ef'}}/></div>;
}

