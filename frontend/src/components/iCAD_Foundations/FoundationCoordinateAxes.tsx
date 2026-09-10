import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationUsesCards.css';
import './FoundationCoordinateAxes.css';

export default function FoundationCoordinateAxes({text, origin=false}: {text:string; origin?:boolean}) {
  const blocks=text.split('\n\n');
  if (origin) return <div className="foundations-uses foundation-coordinate-axes">
    {blocks.map(block => /^\*\*X = 0, Y = 0, Z = 0\*\*$/.test(block.trim())
      ? <ol className="foundations-uses__grid" key={block}>
          {['X = 0','Y = 0','Z = 0'].map((value,index)=><li className="foundations-use-card" key={value}>
            <span className="foundations-use-card__number" aria-hidden="true">{index+1}</span>
            <h5 className="foundations-use-card__title">{value}</h5>
          </li>)}
        </ol>
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
          <div className="foundations-use-card__body"><p>{renderFormattedText(body.join('\n'))}</p></div>
        </li>;
      })}
    </ul>
    {blocks.slice(4).map(block=><p key={block}>{renderFormattedText(block)}</p>)}
  </div>;
}
