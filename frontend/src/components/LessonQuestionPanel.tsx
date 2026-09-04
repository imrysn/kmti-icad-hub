import { ChevronRight, RefreshCcw } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from '../context/LanguageContext';
import type { InteractiveVideoQuestion } from './InteractiveVideoLesson/types';
import './LessonQuestionPanel.css';

interface LessonQuestionPanelProps {
  question: InteractiveVideoQuestion;
  selectedChoice: string;
  answerChecked: boolean;
  onSelectChoice: (choiceId: string) => void;
  onCheckAnswer: () => void;
  onRetry: () => void;
  onContinue: () => void;
  eyebrow?: string;
  continueLabel?: string;
}

const LessonQuestionPanel: React.FC<LessonQuestionPanelProps> = ({
  question,
  selectedChoice,
  answerChecked,
  onSelectChoice,
  onCheckAnswer,
  onRetry,
  onContinue,
  eyebrow,
  continueLabel,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const { language } = useTranslation();
  const isJapanese = language === 'ja';
  const selectedAnswer = question.choices.find((choice) => choice.id === selectedChoice);
  const isAnswerCorrect = Boolean(selectedAnswer?.isCorrect);

  const displayEyebrow = eyebrow ?? (isJapanese ? '理解度チェック' : 'Knowledge check');
  const displayContinueLabel = continueLabel ?? (isJapanese ? 'レッスンを続ける' : 'Continue Lesson');

  useEffect(() => {
    panelRef.current?.focus();
  }, [question.id]);

  return (
    <div className="ivl-question-backdrop">
      <div ref={panelRef} className="ivl-question-panel" role="dialog" aria-modal="true" aria-labelledby={`${question.id}-title`} tabIndex={-1}>
        <p className="ivl-eyebrow">{displayEyebrow}</p>
        <h3 id={`${question.id}-title`}>{question.prompt}</h3>
        <fieldset className="ivl-options">
          <legend className="sr-only">{isJapanese ? '回答を1つ選択してください' : 'Choose one answer'}</legend>
          {question.choices.map((choice) => (
            <label key={choice.id} className={`ivl-option ${selectedChoice === choice.id ? 'selected' : ''}`}>
              <input type="radio" name={question.id} value={choice.id} checked={selectedChoice === choice.id} disabled={answerChecked} onChange={() => onSelectChoice(choice.id)} />
              <span>{choice.label}</span>
            </label>
          ))}
        </fieldset>
        {answerChecked && (
          <div className={`ivl-feedback ${isAnswerCorrect ? 'correct' : 'incorrect'}`} role="status">{selectedAnswer?.feedback}</div>
        )}
        <div className="ivl-question-actions">
          {!answerChecked && <button className="ivl-primary-button" type="button" disabled={!selectedChoice} onClick={onCheckAnswer}>{isJapanese ? '回答を確認' : 'Check Answer'}</button>}
          {answerChecked && !isAnswerCorrect && <button className="ivl-secondary-button" type="button" onClick={onRetry}><RefreshCcw size={17} aria-hidden="true" /> {isJapanese ? '再試行' : 'Retry'}</button>}
          {answerChecked && isAnswerCorrect && <button className="ivl-primary-button" type="button" onClick={onContinue}>{displayContinueLabel} <ChevronRight size={17} aria-hidden="true" /></button>}
        </div>
      </div>
    </div>
  );
};

export default LessonQuestionPanel;
