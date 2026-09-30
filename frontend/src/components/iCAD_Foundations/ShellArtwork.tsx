import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import commandScreen from '../../assets/icad-foundations/modeling/chamfer-command-interface.png';
import selected from '../../assets/icad-foundations/modeling/shell-selected.png';
import thickness from '../../assets/icad-foundations/modeling/shell-thickness.png';
import result from '../../assets/icad-foundations/modeling/shell-result.png';

export default function ShellArtwork({step,japanese}:{step:number;japanese:boolean}) {
  const titles=japanese?['シェルする','2つの端面を選択','共通の厚さ','中空の立体']:['Shell「シェルする」','Select the Two End Faces','Wall Thickness「共通の厚さ」','Hollow Solid'];
  const screens=[commandScreen,selected,thickness,result];
  const bounds:[number,number,number,number]=step===0?[1784,402,28,28]:step===2?[136,1026,191,27]:step===1?[675,295,752,548]:[630,347,750,547];
  const artwork=step===0?<div className="stretch-vector" style={{display:'grid',placeItems:'center'}}><FoundationOperationCommandIcon command="shell" title={titles[0]}/></div>:step===2?
    <svg className="stretch-vector stretch-vector--entry" viewBox="0 0 240 40" role="img" aria-label={titles[2]}>
      <rect x="1" y="1" width="238" height="38" fill="#eee" stroke="#aaa"/>
      <text x="8" y="26" fontSize="15">共通の厚さ</text>
      <rect x="100" y="6" width="126" height="28" fill="white" stroke="#0788ed"/>
      <text x="107" y="26" fontSize="17">4.5</text>
    </svg>:
    <svg className="stretch-vector" viewBox={bounds.join(' ')} role="img" aria-label={titles[step]}>
      {/* Contours follow the supplied selection/result screenshots. */}
      {step===1?<g stroke="#efa626" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M697 678 1323 316 1406 364 780 727Z" fill="#fff"/>
        <path d="M780 727 1406 364 1406 460 780 822Z" fill="#e3e3e3"/>
        <path d="M697 678 780 727 780 822 697 774Z" fill="#a5a5a5" stroke="#8996ef"/>
        <path d="M697 774 780 727M1323 316 1323 413 1406 460" fill="none"/>
      </g>:<g stroke="#626262" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M651 730 1277 367 1360 415 734 778Z" fill="#fff"/>
        <path d="M734 778 1360 415 1360 512 734 873Z" fill="#e3e3e3"/>
        <path d="M651 730 734 778 734 873 651 825Z" fill="#aaa"/>
        <path d="M658 740 728 781 728 862 658 821Z" fill="#fff"/>
        <path d="M658 740 728 781 658 821Z" fill="#e3e3e3"/>
      </g>}
    </svg>;
  return <InterfaceIconPreview index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,screen:screens[step],region:{bounds,landing:bounds},highlightColor:'#0087ef'}}/>;
}
