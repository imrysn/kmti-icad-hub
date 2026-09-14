import FoundationStartingSteps from './FoundationStartingSteps';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';

export default function FoundationStandardViewSteps({text, japanese, comparison=false}: {text: string; japanese: boolean; comparison?: boolean}) {
  const blocks = text.split('\n\n');
  const sections = blocks.slice(0,2).map(block => {
    const [title,...body] = block.split('\n');
    return {title:title.replace(/\*\*/g,'').replace(/^.*?—\s*/,''),text:body.join('\n')};
  });
  return <><FoundationStartingSteps sections={sections} japanese={japanese} comparison={comparison} />
    {blocks.slice(2).map(block => <p key={block}>{renderFormattedText(block)}</p>)}
  </>;
}
