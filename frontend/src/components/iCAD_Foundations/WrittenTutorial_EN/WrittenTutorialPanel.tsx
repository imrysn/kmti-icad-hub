import React from 'react';
import { useTranslation } from '../../../context/LanguageContext';
import LessonObjective from '../../LessonObjective';
import QuickReviewFlow from '../QuickReviewFlow';
import '../../../styles/iCAD_Foundations/WrittenTutorial/WrittenTutorialPanel.css';
import { WrittenTutorialCopy, WrittenTutorialStep } from './types';

export type { WrittenTutorialCopy, WrittenTutorialStep } from './types';

interface WrittenTutorialPanelProps {
  title: string;
  description?: string;
  steps: WrittenTutorialStep[];
  copy?: Partial<WrittenTutorialCopy>;
  renderStepText?: (step: WrittenTutorialStep, index: number) => React.ReactNode;
  stepsContent?: React.ReactNode;
  afterDescription?: React.ReactNode;
}

const ACTION_START = /^(open|select|click|choose|enter|type|set|confirm|locate|look|find|use|move|drag|scroll|zoom|rotate|place|position|check|view|press|go|wait)\b/i;

export const renderFormattedText = (text: string): React.ReactNode => {
  if (!text) return null;
  const tokens = text.split(/(<b>[\s\S]*?<\/b>|<strong>[\s\S]*?<\/strong>|\*\*[\s\S]*?\*\*)/gi);
  if (tokens.length <= 1) {
    return text;
  }
  return tokens.map((token, idx) => {
    if (/^<(b|strong)>[\s\S]*?<\/\1>$/i.test(token)) {
      const inner = token.replace(/^<(b|strong)>/i, '').replace(/<\/(b|strong)>$/i, '');
      return <strong key={idx}>{inner}</strong>;
    }
    if (/^\*\*[\s\S]+\*\*$/.test(token) && token.length >= 4) {
      const inner = token.slice(2, -2);
      return <strong key={idx}>{inner}</strong>;
    }
    return token;
  });
};

export const simplifyTutorialText = (text: string) => {
  const cleanText = text
    .replace(/\bafter the knowledge check,?\s*/gi, '')
    .replace(/^(?:to begin|next|then|finally),?\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return '';

  const sentences = cleanText.match(/[^.!?]+[.!?]?/g)?.map(sentence => sentence.trim()).filter(Boolean) ?? [];
  const actionSentences = sentences.filter(sentence => ACTION_START.test(sentence));

  if (actionSentences.length > 0) {
    return actionSentences.join(' ');
  }

  return sentences[0] || cleanText;
};

export const WrittenTutorialPanel: React.FC<WrittenTutorialPanelProps> = ({
  title,
  description,
  steps,
  copy,
  renderStepText,
  stepsContent,
  afterDescription,
}) => {
  const { language } = useTranslation();
  const isJapanese = language === 'ja';
  const instructionalSteps = steps
    .filter(step => step.preserveText || !/(knowledge\s*check|review|recap|conclusion)/i.test(step.title))
    .map(step => ({ ...step, text: step.preserveText ? step.text : simplifyTutorialText(step.text) }));

  const panelCopy: WrittenTutorialCopy = {
    procedureTitle: isJapanese ? '手順' : 'Procedure',
    completionText: isJapanese ? 'すべての手順が完了すると、モジュールは完了となります。' : 'Module complete after all steps are finished.',
    title: copy?.title !== undefined ? copy.title : (title || ''),
    description: copy?.description !== undefined ? copy.description : (description || ''),
    ...copy,
  };

  let displayTitle = panelCopy.title !== undefined ? panelCopy.title : (title || '');
  let displayDescription = panelCopy.description !== undefined ? panelCopy.description : (description || '');

  if (!panelCopy.useStepHeaderTitle && !displayDescription && displayTitle.length > 50 && title && title.length < 50) {
    displayDescription = displayTitle;
    displayTitle = title;
  }

  return (
    <aside className="written-tutorial-panel" aria-label={`Written tutorial for ${displayTitle || panelCopy.procedureTitle}`}>
      {(displayTitle || displayDescription) && (
        <header className="written-tutorial-panel__header">
          {(panelCopy.inlineHeader || panelCopy.useStepHeaderTitle) && displayTitle && displayDescription ? (
            <div className="step-header-inline">
              <div className="step-header-inline__lead">
                <h4>{displayTitle}</h4>{' '}
                <p className="written-tutorial-panel__description">
                  {renderFormattedText(
                    panelCopy.inlineHeader
                      ? (() => {
                          const trimmed = displayTitle.trim();
                          const thePrefix = `The ${trimmed} `;
                          if (displayDescription.toLowerCase().startsWith(thePrefix.toLowerCase())) {
                            return displayDescription.slice(thePrefix.length);
                          }
                          const directPrefix = `${trimmed} `;
                          if (displayDescription.toLowerCase().startsWith(directPrefix.toLowerCase())) {
                            return displayDescription.slice(directPrefix.length);
                          }
                          return displayDescription;
                        })()
                      : displayDescription
                  )}
                </p>
              </div>
              {panelCopy.description2 ? (
                <p className="written-tutorial-panel__description written-tutorial-panel__description--secondary">
                  {renderFormattedText(panelCopy.description2)}
                </p>
              ) : null}
            </div>
          ) : (
            <>
              {displayTitle ? (
                <div className="step-header">
                  <h4>{displayTitle}</h4>
                </div>
              ) : null}
              {displayDescription ? (
                <p className="written-tutorial-panel__description">{renderFormattedText(displayDescription)}</p>
              ) : null}
              {panelCopy.description2 ? (
                <p className="written-tutorial-panel__description written-tutorial-panel__description--secondary">
                  {renderFormattedText(panelCopy.description2)}
                </p>
              ) : null}
            </>
          )}
        </header>
      )}

      {afterDescription}
      <div className="written-tutorial-panel__content">
        {(panelCopy.objective || panelCopy.renderAsObjective || panelCopy.procedureTitle === 'ivl-objective') && (
          <LessonObjective label={panelCopy.objectiveLabel || (isJapanese ? '学習目標' : 'learning goal')}>
            {panelCopy.objective || (panelCopy.procedureTitle !== 'ivl-objective' ? panelCopy.procedureTitle : 'Understand how Zoom In and Zoom Out work, and when to use each viewing action in iCAD.')}
          </LessonObjective>
        )}
        {panelCopy.procedureTitle && panelCopy.procedureTitle !== 'ivl-objective' && (!panelCopy.renderAsObjective || panelCopy.objective) && (
          <h4 className="section-title written-tutorial-panel__section-title">{panelCopy.procedureTitle}</h4>
        )}
        {stepsContent ?? <ol className="written-tutorial-panel__steps">
          {instructionalSteps.map((step, index) => {
            const showNumber = !panelCopy.hideStepNumbers && !step.hideStepNumber;
            return (
              <li key={step.id} className={`written-tutorial-panel__step ${!showNumber ? 'no-step-number' : ''}`}>
                <div className="step-header">
                  {showNumber && <span className="step-number">{index + 1}</span>}
                  <h4>{step.title}</h4>
                </div>
                {step.text && (() => {
                  const customContent = renderStepText?.(step, index);
                  if (customContent != null) return customContent;
                  const lines = step.text.split('\n');
                  const hasBullets = lines.some(l => /^\s*([*•-])\s+/.test(l));
                  if (!hasBullets) {
                    return (
                      <div className={`step-text-content ${step.image ? 'has-step-image' : ''}`}>
                        <div className="step-text-left">
                          <p>{renderFormattedText(step.text)}</p>
                        </div>
                        {step.image && (
                          <div className="step-image-container">
                            <img src={step.image} alt={step.imageAlt || step.title} className="step-inline-image" />
                          </div>
                        )}
                      </div>
                    );
                  }
                  const blocks: Array<{ type: 'text' | 'ul'; content: string | string[] }> = [];
                  let currentBullets: string[] = [];
                  let currentTextLines: string[] = [];

                  const flushText = () => {
                    if (currentTextLines.length > 0) {
                      const textBlock = currentTextLines.join('\n').trim();
                      if (textBlock) {
                        blocks.push({ type: 'text', content: textBlock });
                      }
                      currentTextLines = [];
                    }
                  };

                  const flushBullets = () => {
                    if (currentBullets.length > 0) {
                      blocks.push({ type: 'ul', content: currentBullets });
                      currentBullets = [];
                    }
                  };

                  lines.forEach(line => {
                    if (/^\s*([*•-])\s+/.test(line)) {
                      flushText();
                      currentBullets.push(line.replace(/^\s*([*•-])\s+/, ''));
                    } else {
                      flushBullets();
                      currentTextLines.push(line);
                    }
                  });
                  flushText();
                  flushBullets();

                  return (
                    <div className={`step-text-content ${step.image ? 'has-step-image' : ''}`}>
                      <div className="step-text-left">
                        {blocks.map((block, bIdx) =>
                          block.type === 'ul' ? (
                            <ul key={bIdx} className="step-bullet-list">
                              {(block.content as string[]).map((b, i) => (
                                <li key={i}>{renderFormattedText(b)}</li>
                              ))}
                            </ul>
                          ) : (
                            <p key={bIdx}>{renderFormattedText(block.content as string)}</p>
                          )
                        )}
                      </div>
                      {step.image && (
                        <div className="step-image-container">
                          <img src={step.image} alt={step.imageAlt || step.title} className="step-inline-image" />
                        </div>
                      )}
                    </div>
                  );
                })()}
              </li>
            );
          })}
        </ol>}
        {(panelCopy.quickReviewText || panelCopy.quickReviewTitle) && (
          <div className="written-tutorial-panel__quick-review">
            <h4 className="section-title written-tutorial-panel__section-title">
              {panelCopy.quickReviewTitle || 'Quick Review'}
            </h4>
            {panelCopy.quickReviewText && (
              <QuickReviewFlow text={panelCopy.quickReviewText} />
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default WrittenTutorialPanel;
