import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import command from '../../assets/icad-foundations/properties/change-color-command.png';
import entity from '../../assets/icad-foundations/properties/change-color-entity.png';
import face from '../../assets/icad-foundations/properties/change-color-face.png';
import {useId} from 'react';
import './ChangeColorArtwork.css';

/** Cropped views of the supplied captures; no recreated palette or model controls. */
export function ChangeColorPreview({faceOnly=false,palette=false,japanese=false}: {faceOnly?:boolean;palette?:boolean;japanese?:boolean}) {
  const clipId=useId();
  const screen=faceOnly?face:entity;
  const title=japanese?(faceOnly?'面':'要素'):(faceOnly?'Face — 面':'Entity — 要素');
  const bounds:[number,number,number,number]=palette?[568,241,206,381]:[976,330,194,526];
  const artwork=<svg className="stretch-vector change-color-preview-artwork" viewBox={bounds.join(' ')} role="img" aria-label={title}>
    <defs><clipPath id={clipId}>{palette?<rect x="568" y="242" width="205" height="378"/>:<path d="M982 362 1026 336 1152 409 1161 420 1161 825 1115 850 982 774Z"/>}</clipPath></defs>
    <image href={screen} width="1920" height="1080" clipPath={`url(#${clipId})`}/>
  </svg>;
  return <div className="foundation-stretch-steps" style={{height:120,width:'100%',minWidth:0}}><InterfaceIconPreview index={0} toolbar={false} title={title} japanese={japanese} custom={{artwork,screen,region:{bounds,landing:bounds},highlightColor:'#0087ef'}}/></div>;
}

export default function ChangeColorArtwork({step,japanese}: {step:number;japanese:boolean}) {
  if(step===0) return <InterfaceIconPreview index={0} toolbar={false} title={japanese?'要素色を変更する':'Change Color — 要素色を変更する'} japanese={japanese} custom={{
    artwork:<FoundationOperationCommandIcon command="change-color" title={japanese?'要素色を変更する':'Change Color'}/>,screen:command,
    region:{bounds:[1752,157,28,31],landing:[1752,157,28,31]},highlightColor:'#0087ef',
  }}/>;
  return <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:8,width:'100%',height:120}}>
    <ChangeColorPreview palette={step===1} japanese={japanese}/>
    <ChangeColorPreview faceOnly palette={step===1} japanese={japanese}/>
  </div>;
}
