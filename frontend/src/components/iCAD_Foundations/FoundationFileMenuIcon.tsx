import InterfaceIconPreview from './InterfaceIconPreview';
import saveAsScreen from '../../assets/icad-foundations/file-save-as-menu.png';
import newScreen from '../../assets/icad-foundations/file-new-menu.png';
import saveScreen from '../../assets/icad-foundations/file-save-menu.png';
import './FoundationInterfaceCards.css';
import './FoundationFileMenuIcon.css';

export default function FoundationFileMenuIcon({newItem=false,japanese=false,save=false,saveContext=false,saveAs=false}:{newItem?:boolean;japanese?:boolean;save?:boolean;saveContext?:boolean;saveAs?:boolean}) {
  const title = saveAs ? (japanese?'名前を付けて保存 (A)':'Save As (A)') : save ? (japanese?'上書き保存 (S)':'Save (S)') : newItem ? (japanese?'新規作成 (N)':'New (N)') : (japanese?'ファイル (F)':'File (F)');
  const useSaveScreen = save || saveContext || saveAs;
  const width = saveAs ? 1867 : useSaveScreen ? 1920 : 1900;
  const height = saveAs ? 1014 : useSaveScreen ? 1080 : 1063;
  const rect = saveAs ? [3,162,563,22] : save ? [3,140,563,22] : newItem ? [3,44,563,23] : [2,23,63,19];
  const region = rect.map((value,index)=>value*(index%2===0?1920/width:1080/height)) as [number,number,number,number];
  const command = save || newItem || saveAs;
  const artWidth = saveAs ? 370 : 300;
  const artwork = <svg viewBox={command?`0 0 ${artWidth} 32`:'0 0 110 32'} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
    <rect x=".5" y=".5" width={command?artWidth-1:109} height="31" fill={command?'#96ccf7':'#d8edfc'} stroke="#91b6cd"/>
    <text x={command?12:8} y="22" fill="#000" fontFamily="Meiryo, MS Gothic, sans-serif" fontSize="16">{saveAs?'名前を付けて保存(A)...':save?'上書き保存(S)':newItem?'新規作成(N)':'ファイル(F)'}</text>
    {command && <text x={artWidth-12} y="22" textAnchor="end" fill="#000" fontFamily="Arial, sans-serif" fontSize="14">{saveAs?'Ctrl+Shift+S':save?'Ctrl+S':'Ctrl+N'}</text>}
  </svg>;
  return <div className="foundation-file-menu-icon"><InterfaceIconPreview index={0} toolbar={false} title={title} japanese={japanese} custom={{artwork,screen:saveAs?saveAsScreen:useSaveScreen?saveScreen:newScreen,region:{bounds:region,landing:region},aspectRatio:width/height}}/></div>;
}
