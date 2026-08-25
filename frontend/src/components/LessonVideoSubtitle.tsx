import React from 'react';
import './LessonVideoSubtitle.css';
import { KaraokeLessonText } from './KaraokeLessonText';

interface LessonVideoSubtitleProps {
  text: string;
  currentCharIndex?: number;
}

const LessonVideoSubtitle: React.FC<LessonVideoSubtitleProps> = ({ text, currentCharIndex }) => {
  if (!text) return null;

  return (
    <div className="lesson-video-subtitle" role="status" aria-live="polite">
      <KaraokeLessonText 
        text={text} 
        isActive={true} 
        currentCharIndex={currentCharIndex} 
        className="lesson-video-subtitle__text"
        as="p"
      />
    </div>
  );
};

export default LessonVideoSubtitle;
