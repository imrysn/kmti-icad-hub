import FoundationOperationCommandIcon from './FoundationOperationCommandIcon';
import InterfaceIconPreview from './InterfaceIconPreview';
import selected from '../../assets/icad-foundations/modeling/part-create-selected.png';
import information from '../../assets/icad-foundations/modeling/part-create-information.png';
import result from '../../assets/icad-foundations/modeling/part-create-result.png';

function InformationLabels({japanese}:{japanese:boolean}) {
  const labels=japanese?['パーツ一覧：ファイル内のパーツ','パーツ名：名前を入力','コメント：パーツの説明','作成レイヤ：新規レイヤ','レイヤ引継：元のレイヤ','Enter：作成を確定']:['Part list · Parts in this file','Part name · Enter a name','Comment · Part description','New layer · Set a layer','Original layer · Inherit layer','Enter · Confirm creation'];
  const points=[[530,315],[395,438],[395,459],[395,526],[395,550],[430,582]];
  return <g fontFamily="Arial,sans-serif" fontSize="16">
    {labels.map((label,i)=>{
      const [x,y]=points[i]; const row=255+i*43;
      return <g key={label}>
        <circle cx={x} cy={y} r="8" fill="#16799e" stroke="white" strokeWidth="1.5"/>
        <text x={x} y={y+4} textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">{i+1}</text>
        <rect x="712" y={row-16} width="269" height="32" rx="6" fill="#fff" stroke="#c5d7e1"/>
        <circle cx="729" cy={row} r="11" fill="#16799e"/>
        <text x="729" y={row+5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="white">{i+1}</text>
        <text x="747" y={row+5} fill="#263442">{label}</text>
      </g>;
    })}
  </g>;
}

function TreeLabel({japanese}:{japanese:boolean}) {
  return <g>
    <rect x="191" y="189" width="91" height="24" rx="3" fill="none" stroke="#16799e" strokeWidth="2"/>
    <rect x="190" y="254" width="178" height="48" rx="6" fill="white" stroke="#c5d7e1"/>
    <text x="200" y="272" fontSize="13" fill="#526174">{japanese?'新しいパーツ名':'New Part Name'}</text>
    <text x="200" y="292" fontSize="17" fontWeight="bold" fill="#16799e">70×10×50</text>
  </g>;
}

export function PartEntitySelectionIcon({title}:{title:string}) {
  return <svg className="stretch-vector" viewBox="800 295 470 530" role="img" aria-label={title}>
      <g stroke="#efa626" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M995 345 1036 319 1245 440 1203 464Z" fill="#fff"/>
        <path d="M995 345 1203 464 1203 802 995 681Z" fill="#aaa"/>
        <path d="M1203 464 1245 440 1245 777 1203 802Z" fill="#e3e3e3"/>
        {[[1020,392],[1178,484],[1020,667],[1178,758]].map(([x,y])=><g key={y}><ellipse cx={x} cy={y} rx="11" ry="17" transform={`rotate(-30 ${x} ${y})`} fill="white"/><ellipse cx={x+41} cy={y-24} rx="11" ry="17" transform={`rotate(-30 ${x+41} ${y-24})`} fill="none"/><path d={`M${x-8} ${y-14}l41-24M${x+8} ${y+14}l41-24`} fill="none"/></g>)}
      </g>
      <g stroke="#777" strokeWidth="1.2"><path d="M845 617 1050 498C1115 466 1195 608 1145 648L932 770Z" fill="#fafafa"/><ellipse cx="890" cy="694" rx="55" ry="85" transform="rotate(-25 890 694)" fill="#aaa"/><ellipse cx="890" cy="694" rx="28" ry="45" transform="rotate(-25 890 694)" fill="#16db29"/></g>
    </svg>;
}

export default function PartCreateArtwork({step,japanese}:{step:number;japanese:boolean}) {
  const titles=japanese?['パーツを作成する','単一の要素を選択','パーツ情報を入力','ツリービューで確認']:['Create 3D Part「パーツを作成する」','Select a Single Entity','Enter the 3D Part Information','Check the Tree View'];
  const screens=[selected,selected,information,result];
  const bounds:[number,number,number,number]=step===0?[1752,157,28,30]:step===1?[810,300,450,520]:step===2?[386,164,287,437]:[137,159,240,154];
  const artwork=step===0?<div className="stretch-vector" style={{display:'grid',placeItems:'center'}}><FoundationOperationCommandIcon command="part-create" title={titles[0]}/></div>:step===1?
    <PartEntitySelectionIcon title={titles[1]}/>:step===2?
    <svg className="stretch-vector" viewBox="380 158 610 460" role="img" aria-label={titles[2]}>
      <image href={information} width="1920" height="1080"/>
      <InformationLabels japanese={japanese}/>
    </svg>:
    <svg className="stretch-vector" viewBox="137 158 240 154" role="img" aria-label={titles[3]}>
      <image href={result} width="1920" height="1080"/>
      <TreeLabel japanese={japanese}/>
    </svg>;
  return <InterfaceIconPreview index={step} toolbar={false} title={titles[step]} japanese={japanese} custom={{artwork,screen:screens[step],screenOverlay:step===2?<InformationLabels japanese={japanese}/>:step===3?<TreeLabel japanese={japanese}/>:undefined,region:{bounds,landing:bounds},highlightColor:'#0087ef'}}/>;
}
