import { CheckCircle2, ChevronRight, X } from 'lucide-react';
import React from 'react';
import { useTranslation } from '../context/LanguageContext';

export interface LessonRecapItem {
  action?: string;
  result?: string;
  text?: string;
}

interface LessonRecapPanelProps {
  title?: string;
  summary?: string;
  items: LessonRecapItem[];
  actionLabel: string;
  actionType?: 'next' | 'close';
  onAction: () => void;
  disabled?: boolean;
  error?: string;
}

const LessonRecapPanel: React.FC<LessonRecapPanelProps> = ({
  title,
  summary,
  items,
  actionLabel,
  actionType = 'next',
  onAction,
  disabled = false,
  error,
}) => {
  const { language } = useTranslation();
  const isJapanese = language === 'ja';
  const visibleTitle = title?.trim().toLowerCase() === 'remember' ? '' : title?.trim();
  const cleanedSummary = summary
    ?.trim()
    .replace(/^great work[.!]?\s*/i, '')
    .replace(/^remember[:.!]?\s*/i, '')
    .trim();
  const visibleSummary = cleanedSummary
    ? `${cleanedSummary.charAt(0).toUpperCase()}${cleanedSummary.slice(1)}`
    : '';

  return (
    <div className="ivl-stage-panel ivl-recap-panel" role="status" aria-live="polite">
      <CheckCircle2 size={30} aria-hidden="true" />
      <p className="ivl-eyebrow">{isJapanese ? 'レッスンのおさらい' : 'Lesson recap'}</p>
      {visibleTitle && <h3>{visibleTitle}</h3>}
      {visibleSummary && <p className="ivl-recap-summary">{visibleSummary}</p>}
      <div className="ivl-recap-items">
        {items.map((item, index) => (
          <div key={`${item.action || item.text || 'recap'}-${index}`} className="ivl-recap-item">
            {item.action && <strong>{item.action}</strong>}
            <span>{item.result || item.text}</span>
          </div>
        ))}
      </div>
      {error && <p className="ivl-save-error">{error}</p>}
      <button className="ivl-primary-button ivl-recap-action" disabled={disabled} onClick={onAction}>
        {actionLabel}
        {actionType === 'close'
          ? <X size={17} aria-hidden="true" />
          : <ChevronRight size={17} aria-hidden="true" />}
      </button>
    </div>
  );
};

export default LessonRecapPanel;
