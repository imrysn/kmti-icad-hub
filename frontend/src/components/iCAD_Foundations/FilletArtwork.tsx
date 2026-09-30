import { useId } from 'react';
import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import radiusScreen from '../../assets/icad-foundations/modeling/fillet-radius.png';
import selectedScreen from '../../assets/icad-foundations/modeling/fillet-selected.png';
import resultScreen from '../../assets/icad-foundations/modeling/fillet-result.png';

export default function FilletArtwork({step,japanese}:{step:number;japanese:boolean}) {
  const gradient=useId();
  const titles=japanese?['Fillet Edge「均等の丸みを作成する」','半径','エッジを選択','丸みの結果']:['Fillet Edge「均等の丸みを作成する」','Fillet Radius「半径」','Select the Edge','Rounded Edge'];
  const screens=[radiusScreen,radiusScreen,selectedScreen,resultScreen];
  const bounds:[number,number,number,number]=step===0?[1816,369,28,28]:step===1?[137,1025,146,28]:[932,310,205,520];
  const artwork=step===0?<div className="stretch-vector" style={{display:'grid',placeItems:'center'}}><FoundationOperationCommandIcon command="fillet" title={titles[0]}/></div>:step===1?
    <svg className="stretch-vector stretch-vector--entry" viewBox="0 0 220 40" role="img" aria-label={titles[1]}>
      <rect x="1" y="1" width="218" height="38" fill="#eee" stroke="#aaa"/>
      <text x="8" y="26" fontSize="15">半径</text>
      <rect x="84" y="6" width="122" height="28" fill="white" stroke="#0788ed"/>
      <text x="91" y="26" fontSize="17">2.0000</text>
    </svg>:
    <svg className="stretch-vector" viewBox="850 310 370 520" role="img" aria-label={titles[step]}>
      <defs><linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#aaa"/><stop offset=".5" stopColor="#fff"/><stop offset="1" stopColor="#eee"/></linearGradient></defs>
      {/* Plate, bore, and rounded top edge follow the supplied screenshots. */}
      <g stroke="#626262" strokeWidth="1" strokeLinejoin="round">
        <path d="M952 353 994 329 1110 396 1068 420Z" fill="#fff"/>
        <path d="M952 353 1068 420Q1077 424 1077 434L1077 810 952 738Z" fill="#a5a5a5"/>
        <path d="M1077 434 1119 410 1119 786 1077 810Z" fill="#e3e3e3"/>
        <path d="M1068 420 1110 396Q1119 400 1119 410L1077 434Q1077 424 1068 420Z" fill={`url(#${gradient})`}/>
        <ellipse cx="1015" cy="461" rx="18" ry="28" transform="rotate(-30 1015 461)" fill={`url(#${gradient})`}/>
      </g>
      {step===2&&<path d="M1077 434 1119 410" fill="none" stroke="#ed3289" strokeWidth="2"/>}
    </svg>;
  return <InterfaceIconPreview index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,screen:screens[step],region:{bounds,landing:bounds},highlightColor:'#0087ef'}}/>;
}
