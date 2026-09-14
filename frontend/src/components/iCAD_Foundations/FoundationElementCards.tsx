import './FoundationUsesCards.css';
import './FoundationElementCards.css';

export default function FoundationElementCards({ text, japanese }: { text: string; japanese: boolean }) {
  const lines = text.split('\n');
  const items = lines.filter(line => line.startsWith('- '));
  const descriptions = japanese
    ? ['図面内の線。', '面の境界。', '立体の表面。', '特定の位置。', '現在のコマンドで選択できるその他の形状。']
    : ['A line in the drawing.', 'The boundary of a face.', 'A surface of a solid.', 'A specific location.', 'Other geometry available to the active command.'];
  return <div className="foundations-uses foundation-element-cards">
    <p>{lines.filter(line => line && !line.startsWith('- ')).join(' ')}</p>
    <ul className="foundations-uses__grid">
      {items.map((item, index) => <li className="foundations-use-card" key={item}>
        <span className="foundations-use-card__number" aria-hidden="true">{index + 1}</span>
        <h5 className="foundations-use-card__title">{item.slice(2)}</h5>
        <div className="foundations-use-card__icon-frame">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            {index === 0 ? <><path d="M10 51 54 13"/><circle cx="10" cy="51" r="3"/><circle cx="54" cy="13" r="3"/></>
              : index === 1 ? <><path d="M10 23 32 10 54 23V47L32 59 10 47Z M10 23 32 36 54 23 M32 36V59" opacity=".35"/><path d="M32 36 54 23" strokeWidth="5"/></>
              : index === 2 ? <><path d="M10 23 32 10 54 23V47L32 59 10 47Z M10 23 32 36 54 23 M32 36V59"/><path d="M32 36 54 23V47L32 59Z" fill="currentColor" fillOpacity=".3"/></>
              : index === 3 ? <><path d="M32 10V24 M32 40V54 M10 32H24 M40 32H54"/><circle cx="32" cy="32" r="5" fill="currentColor"/></>
              : <><path d="M9 47Q14 9 34 30T55 15"/><circle cx="43" cy="46" r="10"/></>}
          </svg>
        </div>
        <div className="foundations-use-card__body"><p>{descriptions[index]}</p></div>
      </li>)}
    </ul>
  </div>;
}
