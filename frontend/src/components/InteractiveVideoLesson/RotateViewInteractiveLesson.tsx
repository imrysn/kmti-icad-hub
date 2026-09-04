import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { InteractiveVideoLesson } from './InteractiveVideoLesson';
import { rotateViewLessonConfig as rotateViewLessonConfigEN } from '../iCAD_Foundations/VideoTutorial_EN/MouseControlsVideoLessons';
import { rotateViewLessonConfig as rotateViewLessonConfigJP } from '../iCAD_Foundations/VideoTutorial_JP/MouseControlsVideoLessons';

interface RotateViewInteractiveLessonProps {
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  onComplete?: () => Promise<void> | void;
  nextLabel?: string;
  isFirstLesson?: boolean;
}

const RotateViewInteractiveLesson: React.FC<RotateViewInteractiveLessonProps> = (props) => {
  const { language } = useTranslation();
  const config = language === 'ja' ? rotateViewLessonConfigJP : rotateViewLessonConfigEN;
  return <InteractiveVideoLesson key={language} config={config} {...props} />;
};

export default RotateViewInteractiveLesson;

