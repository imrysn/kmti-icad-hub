import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import commandScreen from '../../assets/icad-foundations/modeling/chamfer-command-interface.png';
import lengthScreen from '../../assets/icad-foundations/modeling/chamfer-length.png';
import selectedScreen from '../../assets/icad-foundations/modeling/chamfer-selected.png';
import resultScreen from '../../assets/icad-foundations/modeling/chamfer-result.png';

export default function ChamferArtwork({step,japanese}:{step:number;japanese:boolean}) {
  const titles=japanese?['Chamfer Edge「面取りを作成する」','面取り長','エッジを選択','面取りの結果']:['Chamfer Edge「面取りを作成する」','Chamfer Length「面取り長」','Select the Edge','Chamfered Edge'];
  const screens=[commandScreen,lengthScreen,selectedScreen,resultScreen];
  const bounds:[number,number,number,number]=step===0?[1848,370,28,28]:step===1?[137,1025,175,28]:[875,348,362,411];
  const artwork=step===0?<div className="stretch-vector" style={{display:'grid',placeItems:'center'}}><FoundationOperationCommandIcon command="chamfer" title={titles[0]}/></div>:step===1?
    <svg className="stretch-vector stretch-vector--entry" viewBox="0 0 220 40" role="img" aria-label={titles[1]}>
      <rect x="1" y="1" width="218" height="38" fill="#eee" stroke="#aaa"/>
      <text x="8" y="26" fontSize="15">面取り長</text>
      <rect x="84" y="6" width="122" height="28" fill="white" stroke="#0788ed"/>
      <text x="91" y="26" fontSize="17">2.0000</text>
    </svg>:
    <svg className="stretch-vector" viewBox="865 340 380 430" role="img" aria-label={titles[step]}>
      {/* Face outlines follow the supplied selected-edge and result screenshots. */}
      <g stroke="#626262" strokeWidth="1" strokeLinejoin="round">
        <path d="M888 457 1056 361 1216 453 1049 550Z" fill="#fff"/>
        <path d="M888 457 1049 550 1055 562 1055 746 888 651Z" fill="#a5a5a5"/>
        <path d="M1055 562 1223 465 1223 651 1055 746Z" fill="#e3e3e3"/>
        <path d="M1049 550 1216 453 1223 465 1055 562Z" fill="#fafafa"/>
      </g>
      {step===2&&<path d="M1049 550 1216 453" fill="none" stroke="#ed3289" strokeWidth="2"/>}
    </svg>;
  return <InterfaceIconPreview index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,screen:screens[step],region:{bounds,landing:bounds},highlightColor:'#0087ef'}}/>;
}
