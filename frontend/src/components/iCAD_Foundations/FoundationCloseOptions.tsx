import InterfaceIconPreview from './InterfaceIconPreview';
import menuScreen from '../../assets/icad-foundations/file-close-menu.png';
import windowScreen from '../../assets/icad-foundations/drawing-close-window.png';
import './FoundationFileMenuIcon.css';

export default function FoundationCloseOptions({japanese=false}:{japanese?:boolean}) {
  return <div style={{display:'flex',alignItems:'center',gap:8,width:'100%'}}>
    {[false,true].map(window => {
      const title=window ? (japanese?'図面ウィンドウの閉じるボタン':'Drawing window close button') : (japanese?'閉じる(C)':'Close (C)');
      const region:[number,number,number,number]=window?[1702,144,32,18]:[3,89,563,22];
      const artwork=<svg viewBox={window?'0 0 38 32':'0 0 130 32'} role="img" aria-label={title}>
        <rect x="1" y="1" width={window?36:128} height="30" rx="2" fill="#96ccf7" stroke="#91b6cd"/>
        <text x={window?19:8} y="22" textAnchor={window?'middle':'start'} fontFamily="Meiryo, sans-serif" fontSize="16" fill="#000">{window?'×':'閉じる(C)'}</text>
      </svg>;
      return <div className="foundation-file-menu-icon" key={title} style={{flex:window?'0 0 46px':1}}>
        <InterfaceIconPreview index={0} toolbar={false} title={title} japanese={japanese} custom={{artwork,screen:window?windowScreen:menuScreen,region:{bounds:region,landing:region},aspectRatio:1920/1080,highlightColor:'#0087ef'}}/>
      </div>;
    })}
  </div>;
}
