import menuImage from '../../assets/icad-foundations/modeling/work-plane-command-menu.png';
import './FoundationWorkPlaneCommandMenu.css';

const englishCommands=['Line','Parallel','Horizontal','Vertical','Angled','Spline','Circle','3PointCircle','Text','Offset','Trim/Join','SmartDraw','Fillet','Chamfer','SmartTrim','Stretch','SmartEdit','Parametric','Move','Copy','Properties','Delete'];

export default function FoundationWorkPlaneCommandMenu({japanese=false}: {japanese?:boolean}) {
  const notes=japanese ? ['製図ツールを含みます。','スケッチツールを含みます。','製図・スケッチで使用できるコマンドが表示されます。','選択したツールのオプションが表示されます。'] : ['Contains tools for drafting.','Contains tools for sketching.','Displays the available tools for drafting and sketching.','Displays the options for the selected tool.'];
  return <div className="work-plane-command-guide">
    <p>{japanese?'作業平面でのスケッチに使う主なツールは、コマンドメニューにあります。':'Most tools for sketching on the Work Plane are found in the Command Menu.'}</p>
    <div className="work-plane-command-guide__layout">
      <div className="work-plane-command-capture" role="img" aria-label={japanese?'iCAD SX のコマンドメニュー':'iCAD SX Command Menu with English labels'}>
        <img src={menuImage} alt=""/>
        {!japanese && <div className="work-plane-command-translation" aria-hidden="true">
          <span className="command-english-heading">DRAW</span>
          {englishCommands.map((label,n)=><span key={label} className={`command-english-label${n===2?' selected':''}${n>=18?' edit-command':''}`} style={{left:`${(n%2===0?5:67)/135*100}%`,top:`${(190+Math.floor(n/2)*18)/507*100}%`}}>{label}</span>)}
          <span className="command-english-active">Horizontal Line</span>
          <span className="command-english-option selected">Limited</span>
          <span className="command-english-option unlimited">Unlimited</span>
          <span className="command-english-return">From Center</span>
        </div>}
        {[{n:1,x:82,y:13},{n:2,x:1,y:13},{n:3,x:124,y:198},{n:4,x:124,y:456}].map(({n,x,y})=><span key={n} className="work-plane-command-marker capture-marker" style={{left:`${x/135*100}%`,top:`${y/507*100}%`}}>{n}</span>)}
      </div>
      <ol className="work-plane-command-guide__notes">
        {notes.map((note,n)=><li key={note}><span className="work-plane-command-marker">{n+1}</span><p>{note}</p></li>)}
      </ol>
    </div>
  </div>;
}
