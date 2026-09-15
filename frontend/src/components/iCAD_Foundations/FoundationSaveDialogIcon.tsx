import saveAsScreen from '../../assets/icad-foundations/file-operations/save-as-dialog.png';
import firstSaveScreen from '../../assets/icad-foundations/file-operations/first-save-dialog.png';
import InterfaceIconPreview from './InterfaceIconPreview';
import screen from '../../assets/icad-foundations/file-operations/save-dialog.png';
import './FoundationInterfaceCards.css';
import './FoundationFileMenuIcon.css';

export default function FoundationSaveDialogIcon({confirm=false,japanese=false,firstSave=false,saveAs=false}:{confirm?:boolean;japanese?:boolean;firstSave?:boolean;saveAs?:boolean}) {
  const title=confirm?(japanese?'保存 (A)':'Save (A)'):(japanese?'保存先とファイル名':'Folder and file name');
  const sourceRegion:[number,number,number,number]=saveAs ? (confirm?[701,195,110,19]:[135,131,685,324]) : firstSave ? (confirm?[701,198,110,19]:[135,135,685,323]) : confirm?[727,311,110,19]:[166,281,548,265];
  const region = sourceRegion.map((value,index)=>saveAs ? value*(index%2===0?1920/1911:1080/1078) : value) as [number,number,number,number];
  const artwork=confirm?<svg viewBox="0 0 112 24" role="img" aria-label={title}>
    <rect x="1" y="1" width="110" height="22" fill="#e4e4e4" stroke="#0087ef" strokeWidth="2"/>
    <text x="56" y="17" textAnchor="middle" fontFamily="Meiryo, sans-serif" fontSize="13" fill="#000">保存(A)</text>
  </svg>:<svg viewBox="0 0 320 66" role="img" aria-label={title}>
    <rect width="320" height="66" fill="#f0f0f0"/>
    <text x="6" y="21" fontFamily="Meiryo, sans-serif" fontSize="12" fill="#000">保存先(I):</text>
    <rect x="86" y="5" width="227" height="22" fill="#fff" stroke="#999"/>
    <text x="93" y="21" fontFamily="Arial, sans-serif" fontSize="13" fill="#000">{saveAs?'Training':'I:\\Training'}</text>
    <text x="6" y="54" fontFamily="Meiryo, sans-serif" fontSize="12" fill="#000">ファイル名(N):</text>
    <rect x="86" y="37" width="227" height="22" fill="#fff" stroke="#0087ef"/>
    <text x="93" y="53" fontFamily="Arial, sans-serif" fontSize="13" fill="#000">{saveAs?'Training_Box_01_Copy':'Training_Box_01'}</text>
  </svg>;
  return <div className={`foundation-file-menu-icon${confirm ? '' : ' foundation-file-menu-icon--fields'}`}><InterfaceIconPreview index={0} toolbar={false} title={title} japanese={japanese} custom={{artwork,highlightColor: confirm ? undefined : '#0087ef',screen:saveAs?saveAsScreen:firstSave?firstSaveScreen:screen,region:{bounds:region,landing:region}}}/></div>;
}
