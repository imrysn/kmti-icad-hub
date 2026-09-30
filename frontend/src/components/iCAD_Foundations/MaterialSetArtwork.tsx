import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import command from '../../assets/icad-foundations/modeling/material-set-command.png';
import selected from '../../assets/icad-foundations/modeling/material-set-selected.png';
import list from '../../assets/icad-foundations/modeling/material-set-list.png';
import confirm from '../../assets/icad-foundations/modeling/material-set-confirm.png';

export default function MaterialSetArtwork({step,japanese}:{step:number;japanese:boolean}) {
 const titles=japanese?['一覧から選んで材質設定する','要素を選択','材質設定','材質情報設定 — OK']:['Set Material — 一覧から選んで材質設定する','Select the Entity','Material Setting','Confirm Material Setting — OK'];
 const screens=[command,selected,list,confirm];
 const bounds:[number,number,number,number]=step===0?[1752,157,28,31]:step===1?[820,310,440,500]:step===2?[7,43,504,337]:[762,491,412,153];
 const overlay=step===2?<g fontFamily="Arial,sans-serif">
   <rect x="26" y="258" width="450" height="19" rx="2" fill="none" stroke="#16799e" strokeWidth="2"/>
   <rect x="165" y="258" width="38" height="19" fill="none" stroke="#e14949" strokeWidth="2"/>
   <path d="M203 267H530V307H548" fill="none" stroke="#e14949" strokeWidth="2"/>
   <rect x="548" y="282" width="260" height="58" rx="6" fill="white" stroke="#c5d7e1"/>
   <text x="560" y="303" fontSize="16" fill="#263442">{japanese?'色コード：［色23］':'Color code: [色23]'}</text>
   <text x="560" y="325" fontSize="14" fill="#526174">{japanese?'選択中の材質：C3604':'Selected material: C3604'}</text>
 </g>:undefined;
 const artwork=step===0?<div className="stretch-vector" style={{display:'grid',placeItems:'center'}}><FoundationOperationCommandIcon command="material-set" title={titles[0]}/></div>:step===1?<svg className="stretch-vector" viewBox="800 295 470 530" role="img" aria-label={titles[1]}>
   <g stroke="#777" strokeWidth="1.2" strokeLinejoin="round">
     <path d="M995 345 1036 319 1245 440 1203 464Z" fill="white"/>
     <path d="M995 345 1203 464 1203 802 995 681Z" fill="#aaa"/>
     <path d="M1203 464 1245 440 1245 777 1203 802Z" fill="#e3e3e3"/>
     {[[1020,392],[1178,484],[1178,758]].map(([x,y])=><ellipse key={y} cx={x} cy={y} rx="11" ry="17" transform={`rotate(-30 ${x} ${y})`} fill="white"/>)}
   </g>
   <g stroke="#efa626" strokeWidth="1.5">
     <path d="M845 617 1050 498C1115 466 1195 608 1145 648L932 770Z" fill="#fafafa"/>
     <ellipse cx="890" cy="694" rx="55" ry="85" transform="rotate(-25 890 694)" fill="#aaa"/>
     <ellipse cx="890" cy="694" rx="28" ry="45" transform="rotate(-25 890 694)" fill="#16db29"/>
     <ellipse cx="1099" cy="574" rx="55" ry="85" transform="rotate(-25 1099 574)" fill="none"/>
     <ellipse cx="1099" cy="574" rx="28" ry="45" transform="rotate(-25 1099 574)" fill="none"/>
     <path d="M862 666 1071 546M918 722 1127 602" fill="none"/>
   </g>
 </svg>:<svg className="stretch-vector" viewBox={bounds.join(' ')} role="img" aria-label={titles[step]}><image href={screens[step]} width="1920" height="1080"/>{step===2 && <rect x="26" y="258" width="450" height="19" rx="2" fill="none" stroke="#16799e" strokeWidth="2"/>}</svg>;
 return <InterfaceIconPreview index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,screen:screens[step],screenOverlay:overlay,region:{bounds,landing:bounds},highlightColor:'#0087ef'}}/>;
}
