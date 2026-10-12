import { useId, type ReactNode } from 'react';
import InterfaceIconPreview from './InterfaceIconPreview';
import command from '../../assets/icad-foundations/parasolid/command.png';
import file from '../../assets/icad-foundations/parasolid/import-file.png';
import name from '../../assets/icad-foundations/parasolid/name-change.png';
import release from '../../assets/icad-foundations/parasolid/release.png';
import level from '../../assets/icad-foundations/parasolid/level.png';
import select from '../../assets/icad-foundations/parasolid/select.png';
import result from '../../assets/icad-foundations/parasolid/result.png';
import save from '../../assets/icad-foundations/parasolid/save.png';
import saveDialog from '../../assets/icad-foundations/parasolid/save-dialog.png';

type Step = { screen:string; bounds:[number,number,number,number]; en:string; ja:string; size?:[number,number] };
const steps:Record<'import'|'lighten'|'save',Step[]> = {
  import:[
    {screen:command,bounds:[1751,365,31,32],en:'Select Import',ja:'インポートを選択'},
    {screen:file,bounds:[8,44,685,400],en:'Select the Parasolid File',ja:'パラソリッドファイルを選択'},
    {screen:file,bounds:[574,106,110,21],en:'Confirm and Execute',ja:'確定して実行'},
    {screen:name,bounds:[245,578,73,22],en:'Cancel the Name Change',ja:'名前変更をキャンセル'},
    {screen:release,bounds:[234,465,246,23],en:'Release the Purchase Part Names',ja:'購入部品名を解除'},
  ],
  lighten:[
    {screen:command,bounds:[1815,365,31,32],en:'Select Lighten B-Rep Solid',ja:'ソリッド軽量化を選択'},
    {screen:level,bounds:[227,245,329,295],en:'Select No Form Changes',ja:'形状変更なしを選択'},
    {screen:select,bounds:[805,304,553,533],en:'Select the Purchase Part',ja:'購入部品を選択'},
    {screen:result,bounds:[635,1056,450,23],en:'Check the Message Pane',ja:'メッセージ欄を確認'},
  ],
  save:[
    {screen:save,size:[1904,1048],bounds:[3,162,559,22],en:'Open Save As',ja:'名前を付けて保存を開く'},
    {screen:saveDialog,bounds:[82,316,265,24],en:'Name and Save the Part',ja:'ファイル名を指定して保存'},
  ],
};

export default function ParasolidStepPreview({kind,step,japanese,icon}:{kind:keyof typeof steps;step:number;japanese:boolean;icon?:ReactNode}) {
  const cropId=useId();
  const item=steps[kind][step] ?? steps[kind][0];
  const title=japanese?item.ja:item.en;
  const [w,h]=item.size ?? [1920,1080];
  const [x,y,bw,bh]=item.bounds;
  const bounds:[number,number,number,number]=[x/w*1920,y/h*1080,bw/w*1920,bh/h*1080];
  // The card shows the relevant control; opening it reveals the original full capture.
  const artwork=step===0 && icon ? icon :     <svg className="stretch-vector" style={{overflow:"hidden"}} viewBox={`${x} ${y} ${bw} ${bh}`} role="img" aria-label={title}>
      <defs><clipPath id={cropId}><rect x={x} y={y} width={bw} height={bh}/></clipPath></defs>
      <image href={item.screen} width={w} height={h} clipPath={`url(#${cropId})`}/>
    </svg>;
  return <span className={`parasolid-${kind}-artwork`} style={{display:'grid',placeItems:'center',height:120,width:'100%'}}>
    <InterfaceIconPreview index={step} toolbar={false} title={title} japanese={japanese} custom={{artwork,screen:item.screen,screenSize:[w,h],screenFit:'viewport',region:{bounds,landing:bounds}}}/>
  </span>;
}
