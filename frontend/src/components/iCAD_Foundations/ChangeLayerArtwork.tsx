import {useId} from 'react';
import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import command from '../../assets/icad-foundations/properties/change-layer-command.png';
import input from '../../assets/icad-foundations/properties/change-layer-input.png';
import result from '../../assets/icad-foundations/properties/change-layer-result.png';
import './ChangeColorArtwork.css';

/** Original captures cropped with SVG; model pixels and UI remain unchanged. */
export default function ChangeLayerArtwork({step,japanese}: {step:number;japanese:boolean}) {
  const clipId=useId();
  const titles=japanese?['レイヤを変更する','項目入力 — 変更後レイヤ','立体要素','結果 — レイヤ']:['Change Layer — レイヤを変更する','Item Entry — 変更後レイヤ','Solid Entity','Result — レイヤ'];
  const screen=step===3?result:step===1?input:command;
  const bounds:[number,number,number,number]=step===0?[1783,194,29,29]:step===1?[136,1026,141,29]:step===2?[976,330,194,526]:[447,337,300,91];
  const landing:[number,number,number,number]=step===3?[459,399,91,17]:bounds;
  const artwork=step===0?<FoundationOperationCommandIcon command="change-layer" title={titles[step]}/>:<svg className="stretch-vector change-color-preview-artwork" viewBox={bounds.join(' ')} role="img" aria-label={titles[step]}>
    <defs><clipPath id={clipId}>{step===2?<path d="M982 362 1026 336 1152 409 1161 420 1161 825 1115 850 982 774Z"/>:<rect x={bounds[0]} y={bounds[1]} width={bounds[2]} height={bounds[3]}/>}</clipPath></defs>
    <image href={screen} width="1920" height="1080" clipPath={`url(#${clipId})`}/>
    {step===3&&<rect x="459" y="399" width="91" height="17" fill="none" stroke="#0087ef" strokeWidth="2"/>}
  </svg>;
  return <InterfaceIconPreview index={0} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,screen,region:{bounds,landing},highlightColor:'#0087ef'}}/>;
}
