import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { InteractiveVideoLesson } from './InteractiveVideoLesson';
import { zoomInOutLessonConfig as zoomInOutLessonConfigEN } from '../iCAD_Foundations/VideoTutorial_EN/MouseControlsVideoLessons';
import { zoomInOutLessonConfig as zoomInOutLessonConfigJP } from '../iCAD_Foundations/VideoTutorial_JP/MouseControlsVideoLessons';

interface ZoomInOutInteractiveLessonProps {
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  onComplete?: () => Promise<void> | void;
  nextLabel?: string;
  isFirstLesson?: boolean;
}

const ZoomInOutInteractiveLesson: React.FC<ZoomInOutInteractiveLessonProps> = (props) => {
  const { language } = useTranslation();
  const config = language === 'ja' ? zoomInOutLessonConfigJP : zoomInOutLessonConfigEN;
  return <InteractiveVideoLesson key={language} config={config} {...props} />;
};

export default ZoomInOutInteractiveLesson;

