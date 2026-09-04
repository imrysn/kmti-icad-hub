import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { InteractiveVideoLesson } from './InteractiveVideoLesson';
import { panLessonConfig as panLessonConfigEN } from '../iCAD_Foundations/VideoTutorial_EN/MouseControlsVideoLessons';
import { panLessonConfig as panLessonConfigJP } from '../iCAD_Foundations/VideoTutorial_JP/MouseControlsVideoLessons';

interface PanInteractiveLessonProps {
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  onComplete?: () => Promise<void> | void;
  nextLabel?: string;
  isFirstLesson?: boolean;
}

const PanInteractiveLesson: React.FC<PanInteractiveLessonProps> = (props) => {
  const { language } = useTranslation();
  const config = language === 'ja' ? panLessonConfigJP : panLessonConfigEN;
  return <InteractiveVideoLesson key={language} config={config} {...props} />;
};

export default PanInteractiveLesson;

