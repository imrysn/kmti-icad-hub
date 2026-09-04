import { ChevronLeft, ChevronRight, Wrench } from 'lucide-react';
import React from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import './CourseLesson.css';
import '../LessonIntroPanel.css';
import VideoTutorialViewer from "./VideoTutorialViewer";
import FoundationsVideoReadingLayout from '../FoundationsVideoReadingLayout';

/* Toolbar image imports */


import { TOOLBAR_TUTORIAL_STEPS } from "./VideoTutorialData/ToolBarsTutorial";


import { useTranslation } from '../../context/LanguageContext';

interface ToolBarsLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

import {
  TOOLBARS_WRITTEN_TUTORIAL_COPY as TOOLBARS_COPY_EN,
  TOOLBARS_WRITTEN_TUTORIAL_STEPS as TOOLBARS_STEPS_EN,
} from '../iCAD_Foundations/WrittenTutorial_EN';

import {
  TOOLBARS_WRITTEN_TUTORIAL_COPY as TOOLBARS_COPY_JP,
  TOOLBARS_WRITTEN_TUTORIAL_STEPS as TOOLBARS_STEPS_JP,
} from '../iCAD_Foundations/WrittenTutorial_JP';

import {
  TOOLBAR_TUTORIAL_STEPS as TOOLBAR_TUTORIAL_STEPS_JP,
} from '../iCAD_Foundations/VideoTutorial_JP/ToolBarsVideo';

export const TOOLBARS_WRITTEN_TUTORIAL_COPY = TOOLBARS_COPY_EN;
export const TOOLBARS_WRITTEN_TUTORIAL_STEPS = TOOLBARS_STEPS_EN;

export const localizeToolbarTutorialSteps = (
  translate: (key: string) => string,
  translateContent: (text: string) => string = (text) => text,
) => TOOLBAR_TUTORIAL_STEPS.map((step) => {
  const titleKey = `tutorial.toolbars.${step.id}.title`;
  const textKey = `tutorial.toolbars.${step.id}.text`;
  const translatedTitle = translate(titleKey);
  const translatedText = translate(textKey);

  return {
    ...step,
    title: translatedTitle === titleKey ? step.title : translatedTitle,
    text: translatedText === textKey ? step.text : translatedText,
    quizData: step.quizData ? {
      question: translateContent(step.quizData.question),
      options: step.quizData.options.map((option) => ({
        ...option,
        text: translateContent(option.text),
        feedback: translateContent(option.feedback),
      })),
    } : undefined,
    recapData: step.recapData ? {
      title: translateContent(step.recapData.title),
      items: step.recapData.items.map(translateContent),
    } : undefined,
  };
});

const ToolBarsLesson: React.FC<ToolBarsLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel }) => {
  const { language, t, translateContent } = useTranslation();
  const isJapanese = language === 'ja';
  const {
    containerRef,
    scrollProgress,
  } = useLessonCore('toolbars');

  const activeCopy = isJapanese ? TOOLBARS_COPY_JP : TOOLBARS_COPY_EN;
  const activeWrittenSteps = isJapanese ? TOOLBARS_STEPS_JP : TOOLBARS_STEPS_EN;
  const steps = isJapanese ? TOOLBAR_TUTORIAL_STEPS_JP : localizeToolbarTutorialSteps(t, translateContent);

  return (
    <div className="course-lesson-container foundations-standard-intro foundations-video-reading-lesson" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      {/* Main Interactive Stage */}
      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <FoundationsVideoReadingLayout
            title={activeCopy.title}
            steps={activeWrittenSteps}
            writtenTutorialCopy={activeCopy}
          >
            <VideoTutorialViewer
              lessonType="video-tutorial"
              muteSourceVideoAudio
              steps={steps}
              introPanel={{
                icon: Wrench,
                eyebrow: isJapanese ? "ツールツアー" : "Interactive tool tour",
                title: isJapanese ? "iCAD SX ツールバーの確認" : "Explore the iCAD SX Tool Bars",
                description: isJapanese
                  ? "ツールバーのガイド付きツアーで、iCAD ワークフロー全体で使用する基本コマンドの配置を学びます。"
                  : "Take a guided tour of the Tool Bars and learn where to find the essential commands used throughout your iCAD workflow."
              }}
            />
          </FoundationsVideoReadingLayout>

          <div className="lesson-navigation">
            {onPrevLesson && (
              <button className="nav-button" onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ChevronLeft size={18} /> {t('common.previous')}</button>
            )}
            <button className="nav-button next" onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ToolBarsLesson;

