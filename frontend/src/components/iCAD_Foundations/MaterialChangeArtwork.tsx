import './MaterialChangeArtwork.css';
import MaterialSetArtwork from './MaterialSetArtwork';
import InterfaceIconPreview from './InterfaceIconPreview';
import existing from '../../assets/icad-foundations/modeling/material-change-existing.png';
import list from '../../assets/icad-foundations/modeling/material-change-list.png';

export default function MaterialChangeArtwork({step,japanese}:{step:number;japanese:boolean}) {
 if(step<2)return <MaterialSetArtwork step={step} japanese={japanese}/>;
 if(step===3)return <div className="stretch-vector" style={{display:'grid',placeItems:'center',fontSize:14}}><span>{japanese?'OK → 新しい材質':'OK → New material'}</span><span>{japanese?'Cancel → 元の材質':'Cancel → Original material'}</span></div>;
 return <div className="material-change-previews">{[existing,list].map((screen,i)=>{
  const bounds:[number,number,number,number]=i===0?[772,491,392,153]:[7,43,504,337];
  const title=i===0?(japanese?'設定済みの材質：OK / Cancel':'Existing material: OK / Cancel'):(japanese?'新しい材質を選択：C2801':'Select a new material: C2801');
  const artwork=<svg className="stretch-vector"  viewBox={bounds.join(' ')} role="img" aria-label={title}><image href={screen} width="1920" height="1080"/></svg>;
  return <InterfaceIconPreview key={i} index={i} toolbar={false} title={title} japanese={japanese} custom={{artwork,screen,region:{bounds,landing:bounds},highlightColor:'#0087ef'}}/>;
 })}</div>;
}
