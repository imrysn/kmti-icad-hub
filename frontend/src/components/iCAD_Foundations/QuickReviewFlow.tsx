import './QuickReviewFlow.css';

function formatted(text: string) {
  return text.split(/(\*\*.*?\*\*|<b>.*?<\/b>|<strong>.*?<\/strong>)/g).map((part,index) =>
    /^(\*\*|<b>|<strong>)/.test(part) ? <strong key={index}>{part.replace(/\*\*|<\/?(?:b|strong)>/g,'')}</strong> : part);
}

/** Keep mappings together; split a sequential review into connected steps. */
export function quickReviewGroups(text: string): string[][] {
  return text.split(/\n\s*\n/).filter(block=>block.trim()).map(block => {
    const lines=block.split('\n').map(line=>line.trim()).filter(Boolean);
    if (lines.length>1) return lines;
    // A bold wrapper can surround an entire sequence rather than each step.
    let clean=block.trim();
    if ((clean.match(/\*\*/g)||[]).length===2) clean=clean.replace(/^\*\*([\s\S]*)\*\*$/, '$1');
    if ((clean.match(/<(?:b|strong)>/g)||[]).length===1) clean=clean.replace(/^<(?:b|strong)>([\s\S]*)<\/(?:b|strong)>$/, '$1');
    return clean.split(/\s*→\s*/).filter(Boolean);
  });
}

export default function QuickReviewFlow({text}: {text:string}) {
  const checklist = text.split('\n').map(line => line.trim()).filter(Boolean);
  if (checklist.length && checklist.every(line => line.startsWith('- '))) {
    return <div className="quick-review-flow"><ul className="quick-review-checklist">
      {checklist.map(item => <li key={item}>{formatted(item.slice(2))}</li>)}
    </ul></div>;
  }
  const groups = quickReviewGroups(text);
  return <div className="quick-review-flow">
    {groups.map((items, groupIndex) => items.length === 1 && /^(or|または|For multiple elements:|複数の要素の場合：)$/i.test(items[0])
      ? <p className="quick-review-flow__label" key={groupIndex}>{items[0]}</p>
      : <ol className="quick-review-flow__row" key={groupIndex}>
      {items.map((item,index) => <li className="quick-review-flow__segment" key={index}>
        {item.split('→').length === 2 ? <>
          <strong className="quick-review-flow__key">{item.split('→')[0].replace(/\*\*|<\/?(?:b|strong)>/g, '').trim()}</strong>
          <span className="quick-review-flow__detail">{item.split('→')[1].replace(/\*\*|<\/?(?:b|strong)>/g, '').trim()}</span>
        </> : <div className="quick-review-flow__text">{formatted(item)}</div>}
      </li>)}
    </ol>)}
  </div>;
}
