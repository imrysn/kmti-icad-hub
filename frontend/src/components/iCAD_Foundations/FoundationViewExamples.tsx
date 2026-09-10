import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import UserViewIcon from './UserViewIcon';
import ShadingModeIcon from './ShadingModeIcon';
import StandardViewIcon from './StandardViewIcon';
import './FoundationViewExamples.css';
import './FoundationUsesCards.css';

function ViewCube({ view }: { view: number }) {
  const all = view === 3;
  return <svg viewBox="0 0 80 80" className="foundation-view-cube" aria-hidden="true">
    <g stroke="#254666" strokeWidth="2.5" strokeLinejoin="round">
      <path d="M16 24L53 24L53 62L16 62Z" fill={view === 0 || all ? '#438cf2' : '#e2eaf4'} />
      <path d="M16 24L30 12L67 12L53 24Z" fill={view === 1 || all ? '#8fbcff' : '#f7faff'} />
      <path d="M53 24L67 12L67 50L53 62Z" fill={view === 2 || all ? '#245bc0' : '#b8c9df'} />
    </g>
  </svg>;
}

function CommandIcon({ index }: { index: number }) {
  return <StandardViewIcon index={index} />;
}

export default function FoundationViewExamples({ text, commands = false, userViews = false, shading = false }: { text: string; commands?: boolean; userViews?: boolean; shading?: boolean }) {
  const blocks = text.split('\n\n');
  if (commands) return <div className={`foundations-uses foundations-view-commands${userViews ? ' foundations-user-view-commands' : ''}${shading ? ' foundations-shading-commands' : ''}`}>
    {userViews && <p>{renderFormattedText(blocks[0])}</p>}
    <div className="foundations-view-commands__content">{!userViews && !shading && '3D View Tools'}
      <ul className="foundations-uses__grid foundations-view-commands__grid">
        {(userViews ? blocks.slice(1,5) : blocks).map((block, index) => {
          const [heading, ...body] = block.split('\n');
          const [english, japanese] = heading.replace(/\*\*/g, '').split(' — ');
          return <li className="foundations-use-card" key={heading}>
            <span className="foundations-use-card__number" aria-hidden="true">{index + 1}</span>
            <h5 className="foundations-use-card__title"><span>{english}</span><span lang="ja">({japanese})</span></h5>
            <div className="foundations-use-card__icon-frame">{shading ? <ShadingModeIcon mode={index} /> : userViews ? <UserViewIcon view={[3, 0, 1, 2][index]} /> : <CommandIcon index={index} />}</div>
            <div className="foundations-use-card__body"><p>{renderFormattedText(body.join('\n'))}</p></div>
          </li>;
        })}
      </ul>
    </div>
    {userViews && blocks.slice(5).map(block => <p key={block}>{renderFormattedText(block)}</p>)}
  </div>;
  return <div className="foundation-view-examples">
    {!commands && blocks.slice(0, 2).map(block => <p key={block}>{block}</p>)}
    <ul className="foundation-view-ribbons">
      {(commands ? blocks : blocks.slice(2)).map((block, index) => {
        const [title, ...body] = block.split('\n');
        return <li className="foundation-view-ribbon" key={title}>
          <div className="foundation-view-ribbon__flag">{commands ? <CommandIcon index={index} /> : <ViewCube view={index} />}</div>
          <h5>{renderFormattedText(title)}</h5>
          <p>{body.join('\n')}</p>
        </li>;
      })}
    </ul>
  </div>;
}
