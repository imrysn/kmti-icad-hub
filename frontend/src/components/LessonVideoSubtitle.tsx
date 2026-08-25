import React from 'react';
import '../styles/LessonVideoSubtitle.css';

interface LessonVideoSubtitleProps {
  text: string;
  currentCharIndex?: number;
}

const LessonVideoSubtitle: React.FC<LessonVideoSubtitleProps> = ({ text }) => {
  if (!text) return null;

  return (
    <div className="lesson-video-subtitle" role="status" aria-live="polite">
      <p className="lesson-video-subtitle__text">
        <span className="lesson-video-subtitle__spoken">{text}</span>
      </p>
    </div>
  );
};

export default LessonVideoSubtitle;
