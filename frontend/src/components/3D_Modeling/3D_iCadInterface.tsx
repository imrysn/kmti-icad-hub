import { ChevronLeft, ChevronRight, Monitor } from 'lucide-react';
import React from "react";
import { useLessonCore } from "../../hooks/useLessonCore";
import './CourseLesson.css';
import '../LessonIntroPanel.css';
import VideoTutorialViewer from "./VideoTutorialViewer";
import FoundationsVideoReadingLayout from '../FoundationsVideoReadingLayout';

interface IcadInterfaceLessonProps {
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
  showFoundationsIntro?: boolean;
}

import { useTranslation } from '../../context/LanguageContext';

import { TUTORIAL_STEPS } from "./VideoTutorialData/iCadInterfaceTutorial";
import {
  TUTORIAL_STEPS as TUTORIAL_STEPS_JP,
} from '../iCAD_Foundations/VideoTutorial_JP/UnderstandingTheIcadInterfaceVideo';

import {
  INTERFACE_WRITTEN_TUTORIAL_COPY as INTERFACE_COPY_EN,
  INTERFACE_WRITTEN_TUTORIAL_STEPS as INTERFACE_STEPS_EN,
} from '../iCAD_Foundations/WrittenTutorial_EN';

import {
  INTERFACE_WRITTEN_TUTORIAL_COPY as INTERFACE_COPY_JP,
  INTERFACE_WRITTEN_TUTORIAL_STEPS as INTERFACE_STEPS_JP,
} from '../iCAD_Foundations/WrittenTutorial_JP';

export const INTERFACE_WRITTEN_TUTORIAL_COPY = INTERFACE_COPY_EN;
export const INTERFACE_WRITTEN_TUTORIAL_STEPS = INTERFACE_STEPS_EN;

const IcadInterfaceLesson: React.FC<IcadInterfaceLessonProps> = ({ onNextLesson, onPrevLesson, nextLabel, showFoundationsIntro = false }) => {
  const { language, t } = useTranslation();
  const isJapanese = language === 'ja';

  const INTERFACE_STEPS = React.useMemo(() => [
    t('icad.step0'),
    t('icad.step1'),
    t('icad.step2'),
    t('icad.step3'),
    t('icad.step4'),
    t('icad.step5'),
    t('icad.step6'),
    t('icad.step7'),
    t('icad.step8'),
    t('icad.step9'),
    t('icad.step10'),
    t('icad.step11')
  ], [t]);

  const activeCopy = isJapanese ? INTERFACE_COPY_JP : INTERFACE_COPY_EN;
  const activeWrittenSteps = isJapanese ? INTERFACE_STEPS_JP : INTERFACE_STEPS_EN;

  const localizedTutorialSteps = React.useMemo(() => {
    if (isJapanese) {
      return TUTORIAL_STEPS_JP.map((step) => ({
        ...step,
        narrateTitle: false,
      }));
    }

    return TUTORIAL_STEPS.map((step) => {
      const titleKey = `tutorial.icad.${step.id}.title`;
      const textKey = `tutorial.icad.${step.id}.text`;
      const translatedTitle = t(titleKey);
      const translatedText = t(textKey);

      return {
        ...step,
        title: translatedTitle === titleKey ? step.title : translatedTitle,
        text: translatedText === textKey ? step.text : translatedText,
        narrateTitle: false,
      };
    });
  }, [isJapanese, t]);

  const {
    scrollProgress,
    containerRef,
    currentIndex } = useLessonCore('interface', INTERFACE_STEPS);

  return (
    <div className="course-lesson-container foundations-standard-intro foundations-video-reading-lesson" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Main Interactive Stage */}
      <div className="lesson-grid single-card">
        <div className={`lesson-card tab-content fade-in ${currentIndex >= 0 ? 'reading-active' : ''}`}
          data-reading-index={currentIndex >= 0 && currentIndex <= 11 ? "0" : undefined}>

          <FoundationsVideoReadingLayout
            title={activeCopy.title}
            writtenTutorialCopy={activeCopy}
            steps={activeWrittenSteps.map(step => ({ ...step }))}
          >
            <VideoTutorialViewer
              lessonType="video-tutorial"
              muteSourceVideoAudio
              steps={localizedTutorialSteps}
              introPanel={showFoundationsIntro ? {
                icon: Monitor,
                eyebrow: isJapanese ? "画面ツアー" : "Interactive screen tour",
                title: isJapanese ? "iCAD SX インターフェース" : "iCAD SX Interface",
                description: isJapanese
                  ? "ワークスペースのガイド付きツアーで、iCAD トレーニング全体で使用する主要な画面領域の配置を学びます。"
                  : "Take a guided tour of the workspace and learn where to find the main screen areas used throughout your iCAD training."
              } : undefined}
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

export default IcadInterfaceLesson;
