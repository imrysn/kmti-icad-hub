import { Info } from 'lucide-react';
import React, { useId } from 'react';
import './LessonObjective.css';

interface LessonObjectiveProps {
  children: React.ReactNode;
  label?: string;
}

const LessonObjective: React.FC<LessonObjectiveProps> = ({
  children,
  label = 'Learning objective',
}) => {
  const objectiveId = useId();

  return (
    <section className="ivl-objective" aria-labelledby={objectiveId}>
      <Info className="ivl-objective__icon" size={20} aria-hidden="true" />
      <div>
        <p className="ivl-objective__eyebrow">{label}</p>
        <p id={objectiveId} className="ivl-objective__text">{children}</p>
      </div>
    </section>
  );
};

export default LessonObjective;
