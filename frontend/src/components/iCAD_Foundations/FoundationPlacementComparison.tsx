import away from '../../assets/icad-foundations/placement-away-origin.png';
import at from '../../assets/icad-foundations/placement-at-origin.png';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationPlacementComparison.css';

export default function FoundationPlacementComparison({ text, japanese }: { text: string; japanese: boolean }) {
  const blocks = text.split('\n\n');
  return <div>
    <div className="foundation-placement-comparison">
      {[away, at].map((src, index) => <figure key={src}>
        <img src={src} alt={japanese
          ? index === 0 ? '原点から離れて配置されたブロック' : 'ブロックの角と原点が一致する配置'
          : index === 0 ? 'Block placed away from the origin' : 'Block with its placement corner at the origin'} />
        <figcaption>{renderFormattedText(blocks[index])}</figcaption>
      </figure>)}
    </div>
    {blocks.slice(2).map(block => <p key={block}>{renderFormattedText(block)}</p>)}
  </div>;
}
