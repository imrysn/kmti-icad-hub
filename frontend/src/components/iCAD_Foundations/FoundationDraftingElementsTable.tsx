import './FoundationDraftingElementsTable.css';

export default function FoundationDraftingElementsTable({japanese}: {japanese:boolean}) {
  const headings=japanese ? ['寸法','注記','記号'] : ['DIMENSIONS','NOTES','SYMBOLS'];
  const rows=japanese ? [
    ['長さ／円／角度','文字','矢印／矢視図'],
    ['面取り／フィレット','部品注記','切断線'],
    ['','溶接','加工／仕上げ'],
    ['','バルーン','ハッチング'],
  ] : [
    ['Linear/Circular/Angular','Text','Arrow/Arrow View'],
    ['Chamfer/Fillet','Part Notes','Cutting Lines'],
    ['','Welding','Machining/Finishing'],
    ['','Balloon','Hatch'],
  ];
  return <div className="foundation-drafting-table-wrap">
    <table className="foundation-drafting-table" aria-label={japanese?'製図要素':'Drafting Elements'}>
      <thead><tr>{headings.map(heading=><th key={heading} scope="col">{heading}</th>)}</tr></thead>
      <tbody>{rows.map((row,index)=><tr key={index}>{row.map((cell,column)=><td key={column}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}
