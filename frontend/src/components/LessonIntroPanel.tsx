import type { LucideIcon } from 'lucide-react';
import { Play } from 'lucide-react';
import React, { useId } from 'react';
import { useTranslation } from '../context/LanguageContext';
import './LessonIntroPanel.css';

interface LessonIntroPanelProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  onStart: () => void;
  startLabel?: string;
}

const LessonIntroPanel: React.FC<LessonIntroPanelProps> = ({
  icon: Icon,
  eyebrow,
  title,
  description,
  onStart,
  startLabel,
}) => {
  const titleId = useId();
  const { language } = useTranslation();
  const isJapanese = language === 'ja';
  const defaultLabel = isJapanese ? 'レッスンを開始' : 'Start lesson';
  const label = (!startLabel || startLabel === 'Start lesson') ? defaultLabel : startLabel;

  return (
    <section className="lesson-intro-panel" aria-labelledby={titleId}>
      <Icon className="lesson-intro-panel__icon" size={30} aria-hidden="true" />
      <p className="lesson-intro-panel__eyebrow">{eyebrow}</p>
      <h3 id={titleId}>{title}</h3>
      <p className="lesson-intro-panel__description">{description}</p>
      <button className="lesson-intro-panel__button" type="button" onClick={onStart}>
        <Play size={17} aria-hidden="true" /> {label}
      </button>
    </section>
  );
};

export default LessonIntroPanel;
