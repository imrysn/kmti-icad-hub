import React from 'react';
import { InteractiveVideoLesson } from './InteractiveVideoLesson';
import { zoomInOutLessonConfig } from './configs/zoomInOutLesson';

interface ZoomInOutInteractiveLessonProps {
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  onComplete?: () => Promise<void> | void;
  nextLabel?: string;
  isFirstLesson?: boolean;
}

const ZoomInOutInteractiveLesson: React.FC<ZoomInOutInteractiveLessonProps> = (props) => (
  <InteractiveVideoLesson config={zoomInOutLessonConfig} {...props} />
);

export default ZoomInOutInteractiveLesson;
