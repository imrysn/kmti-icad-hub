import './MaterialDescriptionTable.css';

export default function MaterialDescriptionTable({text,title,japanese=false}:{text:string;title:string;japanese?:boolean}) {
  const blocks=text.split('\n\n---\n\n');
  const rows=(block:string)=>block.split('\n').filter(line=>line.trim()).map(line=>line.split('|').map(cell=>cell.trim()));
  const basic=rows(blocks[1]).slice(1);
  const shapes=rows(blocks[2]).slice(1);
  const plate=rows(blocks[4]);
  const english=['C - Channel','H - Beam','I - Beam','Angle Bar','Round Pipe','Square Pipe','Rectangular Pipe','Square Bar','Round Bar','Flat Bar','Plate'];
  const verified=['溝形鋼','H形鋼','I形鋼','山形鋼'];
  return <div className="material-reference-scroll" role="region" aria-label={title} tabIndex={0}>
    <div className="material-reference-sheet">
      <div className="material-reference-rules">
        <strong>{japanese?'材料説明':'Material Description'}</strong>
        <div><span>*</span>{japanese?'寸法の区切りには ×（BATSU）を使用':'Use BATSU = ×'}</div>
        <div><span>*</span>{japanese?'丸形状の材料には φ（FAI）を使用':'In cases of round-shaped materials, use FAI φ'}</div>
      </div>
      <div className="material-reference-basic"><span>a.</span><table aria-label={japanese?'基本的な材料の例':'Basic Material Examples'}><tbody>{basic.map(([name,size])=><tr key={name}><th scope="row">{name}</th><td>{size}</td></tr>)}</tbody></table></div>
      <div className="material-reference-columns">
        <div><div className="material-reference-heading">b. <strong>{japanese?'JIS形鋼':'JIS Shaped Material'}</strong></div>
          <table className="material-reference-shapes" aria-label={japanese?'JIS形鋼':'JIS Shaped Material'}><tbody>{shapes.map((row,i)=><tr key={english[i]}><th scope="row">{english[i]}</th><td>{verified[i]??''}</td><td>{row[1]}</td></tr>)}</tbody></table>
        </div>
        <table className="material-reference-plate" aria-label={japanese?'使用可能な板厚 — JIS':'Available Plate Thickness — JIS'}>
          <thead><tr><th colSpan={4}>{japanese?'使用可能な板厚':'AVAILABLE PLATE THICKNESS'}<br/>(JIS)</th></tr></thead>
          <tbody>{plate.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell.replace(' mm','mm')}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <div className="material-reference-rubber"><div>c. <strong>{japanese?'ゴム':'Rubber'}</strong></div><div>
        <div>2×φ17 <span className="material-reference-formula">( {japanese?'厚さ × サイズ':'Thickness × Size'} )</span></div>
        <svg viewBox="0 0 260 53" width="260" height="53" role="img" aria-label={japanese?'2は厚さ、φ17はサイズ':'2 is Thickness; φ17 is Size'}>
          <g fill="none" stroke="#ff3030"><path d="M36 2V18H63M57 14 63 18 57 22M4 2V42H63M57 38 63 42 57 46"/></g>
          <g fill="currentColor" fontSize="17"><text x="69" y="23">{japanese?'サイズ':'Size'}</text><text x="69" y="47">{japanese?'厚さ':'Thickness'}</text></g>
        </svg>
      </div></div>
    </div>
  </div>;
}
