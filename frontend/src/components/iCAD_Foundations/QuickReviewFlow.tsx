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
  const items = quickReviewGroups(text).flat();
  return <div className="quick-review-flow">
    <ol className="quick-review-flow__row">
      {items.map((item,index) => <li className="quick-review-flow__segment" key={index}>
        <svg className="quick-review-flow__outline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polygon points={index === 0 ? '1,1 90,1 99,50 90,99 1,99' : '1,1 90,1 99,50 90,99 1,99 10,50'} fill="none" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="quick-review-flow__text">{formatted(item)}</div>
      </li>)}
    </ol>
  </div>;
}
