import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationUsesCards.css';
import './FoundationCoordinateAxes.css';

export default function FoundationCoordinateAxes({text, origin=false}: {text:string; origin?:boolean}) {
  const blocks=text.split('\n\n');
  if (origin) return <div className="foundations-uses foundation-coordinate-axes">
    {blocks.map(block => /^\*\*X = 0, Y = 0, Z = 0\*\*$/.test(block.trim())
      ? <figure className="foundation-origin-diagram" key={block}>
          <svg width="300" height="190" viewBox="0 0 300 190" role="img" aria-label={text.includes('原点') ? 'X、Y、Z 軸が交わる点が原点です' : 'The origin is the point where the X, Y, and Z axes meet'}>
            <g strokeWidth="5" strokeLinecap="round">
              <path d="M130 108V40" stroke="#165dff" />
              <path d="M130 108 193 145" stroke="#ff2424" />
              <path d="M130 108 67 145" stroke="#f2cc00" />
            </g>
            <path d="M130 28 122 44H138Z" fill="#165dff" />
            <path d="M205 152 185 150 194 136Z" fill="#ff2424" />
            <path d="M55 152 75 150 66 136Z" fill="#f2cc00" />
            <g fontSize="18" fontWeight="700" textAnchor="middle">
              <text x="130" y="20" fill="#165dff">Y</text>
              <text x="215" y="171" fill="#ff2424">X</text>
              <text x="45" y="171" fill="#b28d00">Z</text>
            </g>
            <path d="M137 103 173 78H193" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="130" cy="108" r="6" fill="currentColor" stroke="white" strokeWidth="2" />
            <text x="199" y="83" fill="currentColor" fontSize="17" fontWeight="600">{text.includes('原点') ? '原点' : 'Origin'}</text>
          </svg>
          <figcaption>(0, 0, 0)</figcaption>
        </figure>
      : <p key={block}>{renderFormattedText(block)}</p>)}
  </div>;
  return <div className="foundations-uses foundation-coordinate-axes">
    <p>{renderFormattedText(blocks[0])}</p>
    <ul className="foundations-uses__grid">
      {blocks.slice(1,4).map((block,index)=>{
        const [title,...body]=block.split('\n');
        return <li className="foundations-use-card" key={title}>
          <span className="foundations-use-card__number" aria-hidden="true">{index+1}</span>
          <h5 className="foundations-use-card__title">{renderFormattedText(title)}</h5>
          <div className="foundations-use-card__icon-frame">
            <svg width="96" height="96" viewBox="-8 -12 120 122" aria-hidden="true">
              {['#ff2424','#165dff','#f2cc00'].map((color,axis)=><g key={color} fill={color} stroke={color} strokeLinejoin="round">
                <path d={['M50 60 L85 80','M50 60 L50 17','M50 60 L15 82'][axis]} strokeWidth={axis===index ? 8 : 5} opacity={axis===index ? 1 : 0.25} />
                <path d={['M89 83 L75 81 L82 70 Z','M50 10 L43 24 L57 24 Z','M9 86 L24 83 L17 73 Z'][axis]} opacity={axis===index ? 1 : 0.25} />
                <text className="foundation-coordinate-axes__label" x={[92,50,4][axis]} y={[103,4,103][axis]} textAnchor="middle" stroke="none" fontSize="19" fontWeight="800" opacity={axis===index ? 1 : 0.25}>{'XYZ'[axis]}</text>
              </g>)}
            </svg>
          </div>
          {body.some(line => line.trim()) && <div className="foundations-use-card__body"><p>{renderFormattedText(body.join('\n'))}</p></div>}
        </li>;
      })}
    </ul>
    {blocks.slice(4).map(block=><p key={block}>{renderFormattedText(block)}</p>)}
  </div>;
}
