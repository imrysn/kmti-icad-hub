import React from 'react';
import { InteractiveVideoLesson } from './InteractiveVideoLesson';
import { panLessonConfig } from './configs/panLesson';

interface PanInteractiveLessonProps {
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  onComplete?: () => Promise<void> | void;
  nextLabel?: string;
  isFirstLesson?: boolean;
}

const PanInteractiveLesson: React.FC<PanInteractiveLessonProps> = (props) => (
  <InteractiveVideoLesson config={panLessonConfig} {...props} />
);

export default PanInteractiveLesson;
