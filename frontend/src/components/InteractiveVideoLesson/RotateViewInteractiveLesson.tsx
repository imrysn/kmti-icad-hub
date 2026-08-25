import React from 'react';
import { InteractiveVideoLesson } from './InteractiveVideoLesson';
import { rotateViewLessonConfig } from './configs/rotateViewLesson';

interface RotateViewInteractiveLessonProps {
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  onComplete?: () => Promise<void> | void;
  nextLabel?: string;
  isFirstLesson?: boolean;
}

const RotateViewInteractiveLesson: React.FC<RotateViewInteractiveLessonProps> = (props) => (
  <InteractiveVideoLesson config={rotateViewLessonConfig} {...props} />
);

export default RotateViewInteractiveLesson;
