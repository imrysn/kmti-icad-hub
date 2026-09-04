import { Info } from 'lucide-react';
import React, { useId } from 'react';
import { useTranslation } from '../context/LanguageContext';
import './LessonObjective.css';

interface LessonObjectiveProps {
  children: React.ReactNode;
  label?: string;
}

const LessonObjective: React.FC<LessonObjectiveProps> = ({
  children,
  label,
}) => {
  const objectiveId = useId();
  const { language } = useTranslation();
  const isJapanese = language === 'ja';
  const displayLabel = label || (isJapanese ? '学習目標' : 'learning goal');

  return (
    <section className="ivl-objective" aria-labelledby={objectiveId}>
      <Info className="ivl-objective__icon" size={20} aria-hidden="true" />
      <div>
        <p className="ivl-objective__eyebrow">{displayLabel}</p>
        <p id={objectiveId} className="ivl-objective__text">{children}</p>
      </div>
    </section>
  );
};

export default LessonObjective;
