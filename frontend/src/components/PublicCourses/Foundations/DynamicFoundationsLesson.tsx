import { useTranslation } from '../../../context/LanguageContext';
import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight, ChevronLeft, Eye, Play } from 'lucide-react';
import { useLessonCore } from "../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../KaraokeLessonText";
import VideoTutorialViewer from "../../3D_Modeling/VideoTutorialViewer";
import FoundationsVideoReadingLayout from '../../FoundationsVideoReadingLayout';
import '../../2D_Drawing/CourseLesson.css';
import "./FoundationsLesson.css";
import zoomInOutVideo from '../../../assets/3D_INTERACTIVE/zoomin_out.mp4';
import panVideo from '../../../assets/3D_INTERACTIVE/pan.mp4';
import scrollVideo from '../../../assets/3D_INTERACTIVE/scroll.mp4';
import lesson41Video from '../../../assets/3D_INTERACTIVE/lesson4.1.mp4';
import lesson42Video from '../../../assets/3D_INTERACTIVE/lesson4.2.mp4';
import module5Video from '../../../assets/3D_INTERACTIVE/module5.mp4';
import type { LessonVideoStep, TutorialOverlay } from '../../../types/tutorial';
import LessonRecapPanel from '../../LessonRecapPanel';
import { getFoundationsRecap } from './foundationsRecaps';
import {
  GETTING_STARTED_WRITTEN_TUTORIAL_COPY as GETTING_STARTED_COPY_EN,
  GETTING_STARTED_WRITTEN_TUTORIAL_STEPS as GETTING_STARTED_STEPS_EN,
  STANDARD_3D_VIEW_WRITTEN_TUTORIAL_COPY as STANDARD_3D_VIEW_COPY_EN,
  STANDARD_3D_VIEW_WRITTEN_TUTORIAL_STEPS as STANDARD_3D_VIEW_STEPS_EN,
  USER_VIEW_WRITTEN_TUTORIAL_COPY as USER_VIEW_COPY_EN,
  USER_VIEW_WRITTEN_TUTORIAL_STEPS as USER_VIEW_STEPS_EN,
  ORIGIN_AXES_WRITTEN_TUTORIAL_COPY as ORIGIN_AXES_COPY_EN,
  ORIGIN_AXES_WRITTEN_TUTORIAL_STEPS as ORIGIN_AXES_STEPS_EN,
  ORIGIN_LAYOUT_WRITTEN_TUTORIAL_COPY as ORIGIN_LAYOUT_COPY_EN,
  ORIGIN_LAYOUT_WRITTEN_TUTORIAL_STEPS as ORIGIN_LAYOUT_STEPS_EN,
  SELECTING_GEOMETRY_WRITTEN_TUTORIAL_COPY as SELECTING_GEOMETRY_COPY_EN,
  SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS as SELECTING_GEOMETRY_STEPS_EN,
  CREATE_LINE_WRITTEN_TUTORIAL_COPY as CREATE_LINE_COPY_EN,
  CREATE_LINE_WRITTEN_TUTORIAL_STEPS as CREATE_LINE_STEPS_EN,
  CREATE_CIRCLE_RECT_WRITTEN_TUTORIAL_COPY as CREATE_CIRCLE_RECT_COPY_EN,
  CREATE_CIRCLE_RECT_WRITTEN_TUTORIAL_STEPS as CREATE_CIRCLE_RECT_STEPS_EN,
  INTRO_TO_3D_WRITTEN_TUTORIAL_COPY as INTRO_TO_3D_COPY_EN,
  INTRO_TO_3D_WRITTEN_TUTORIAL_STEPS as INTRO_TO_3D_STEPS_EN,
  INSPECT_MODEL_WRITTEN_TUTORIAL_COPY as INSPECT_MODEL_COPY_EN,
  INSPECT_MODEL_WRITTEN_TUTORIAL_STEPS as INSPECT_MODEL_STEPS_EN,
  SAVING_WORK_WRITTEN_TUTORIAL_COPY as SAVING_WORK_COPY_EN,
  SAVING_WORK_WRITTEN_TUTORIAL_STEPS as SAVING_WORK_STEPS_EN,
  TROUBLESHOOTING_WRITTEN_TUTORIAL_COPY as TROUBLESHOOTING_COPY_EN,
  TROUBLESHOOTING_WRITTEN_TUTORIAL_STEPS as TROUBLESHOOTING_STEPS_EN,
  FINAL_GUIDED_EXERCISE_WRITTEN_TUTORIAL_COPY as FINAL_GUIDED_EXERCISE_COPY_EN,
  FINAL_GUIDED_EXERCISE_WRITTEN_TUTORIAL_STEPS as FINAL_GUIDED_EXERCISE_STEPS_EN,
  PRACTICAL_ASSESSMENT_WRITTEN_TUTORIAL_COPY as PRACTICAL_ASSESSMENT_COPY_EN,
  PRACTICAL_ASSESSMENT_WRITTEN_TUTORIAL_STEPS as PRACTICAL_ASSESSMENT_STEPS_EN,
  WrittenTutorialCopy,
  WrittenTutorialStep,
} from '../../iCAD_Foundations/WrittenTutorial_EN';
import {
  GETTING_STARTED_WRITTEN_TUTORIAL_COPY as GETTING_STARTED_COPY_JP,
  GETTING_STARTED_WRITTEN_TUTORIAL_STEPS as GETTING_STARTED_STEPS_JP,
  STANDARD_3D_VIEW_WRITTEN_TUTORIAL_COPY as STANDARD_3D_VIEW_COPY_JP,
  STANDARD_3D_VIEW_WRITTEN_TUTORIAL_STEPS as STANDARD_3D_VIEW_STEPS_JP,
  USER_VIEW_WRITTEN_TUTORIAL_COPY as USER_VIEW_COPY_JP,
  USER_VIEW_WRITTEN_TUTORIAL_STEPS as USER_VIEW_STEPS_JP,
  ORIGIN_AXES_WRITTEN_TUTORIAL_COPY as ORIGIN_AXES_COPY_JP,
  ORIGIN_AXES_WRITTEN_TUTORIAL_STEPS as ORIGIN_AXES_STEPS_JP,
  ORIGIN_LAYOUT_WRITTEN_TUTORIAL_COPY as ORIGIN_LAYOUT_COPY_JP,
  ORIGIN_LAYOUT_WRITTEN_TUTORIAL_STEPS as ORIGIN_LAYOUT_STEPS_JP,
  SELECTING_GEOMETRY_WRITTEN_TUTORIAL_COPY as SELECTING_GEOMETRY_COPY_JP,
  SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS as SELECTING_GEOMETRY_STEPS_JP,
  CREATE_LINE_WRITTEN_TUTORIAL_COPY as CREATE_LINE_COPY_JP,
  CREATE_LINE_WRITTEN_TUTORIAL_STEPS as CREATE_LINE_STEPS_JP,
  CREATE_CIRCLE_RECT_WRITTEN_TUTORIAL_COPY as CREATE_CIRCLE_RECT_COPY_JP,
  CREATE_CIRCLE_RECT_WRITTEN_TUTORIAL_STEPS as CREATE_CIRCLE_RECT_STEPS_JP,
  INTRO_TO_3D_WRITTEN_TUTORIAL_COPY as INTRO_TO_3D_COPY_JP,
  INTRO_TO_3D_WRITTEN_TUTORIAL_STEPS as INTRO_TO_3D_STEPS_JP,
  INSPECT_MODEL_WRITTEN_TUTORIAL_COPY as INSPECT_MODEL_COPY_JP,
  INSPECT_MODEL_WRITTEN_TUTORIAL_STEPS as INSPECT_MODEL_STEPS_JP,
  SAVING_WORK_WRITTEN_TUTORIAL_COPY as SAVING_WORK_COPY_JP,
  SAVING_WORK_WRITTEN_TUTORIAL_STEPS as SAVING_WORK_STEPS_JP,
  TROUBLESHOOTING_WRITTEN_TUTORIAL_COPY as TROUBLESHOOTING_COPY_JP,
  TROUBLESHOOTING_WRITTEN_TUTORIAL_STEPS as TROUBLESHOOTING_STEPS_JP,
  FINAL_GUIDED_EXERCISE_WRITTEN_TUTORIAL_COPY as FINAL_GUIDED_EXERCISE_COPY_JP,
  FINAL_GUIDED_EXERCISE_WRITTEN_TUTORIAL_STEPS as FINAL_GUIDED_EXERCISE_STEPS_JP,
  PRACTICAL_ASSESSMENT_WRITTEN_TUTORIAL_COPY as PRACTICAL_ASSESSMENT_COPY_JP,
  PRACTICAL_ASSESSMENT_WRITTEN_TUTORIAL_STEPS as PRACTICAL_ASSESSMENT_STEPS_JP,
} from '../../iCAD_Foundations/WrittenTutorial_JP';
import {
  STANDARD_3D_VIEW_VIDEO_STEPS as STANDARD_3D_VIEW_VIDEO_STEPS_JP,
  USER_VIEW_VIDEO_STEPS as USER_VIEW_VIDEO_STEPS_JP,
} from '../../iCAD_Foundations/VideoTutorial_JP/StandardViewsVideo';
import {
  ORIGIN_AXES_VIDEO_STEPS as ORIGIN_AXES_VIDEO_STEPS_JP,
} from '../../iCAD_Foundations/VideoTutorial_JP/OriginAndCoordinatesVideo';

const WRITTEN_TUTORIAL_REGISTRY_EN: Record<string, { copy: WrittenTutorialCopy; steps: WrittenTutorialStep[] }> = {
  'lesson-1-1': { copy: GETTING_STARTED_COPY_EN, steps: GETTING_STARTED_STEPS_EN },
  'lesson-4-1': { copy: STANDARD_3D_VIEW_COPY_EN, steps: STANDARD_3D_VIEW_STEPS_EN },
  'lesson-4-2': { copy: USER_VIEW_COPY_EN, steps: USER_VIEW_STEPS_EN },
  'origin-projections': { copy: ORIGIN_AXES_COPY_EN, steps: ORIGIN_AXES_STEPS_EN },
  'lesson-5-1': { copy: ORIGIN_AXES_COPY_EN, steps: ORIGIN_AXES_STEPS_EN },
  'origin-layout': { copy: ORIGIN_LAYOUT_COPY_EN, steps: ORIGIN_LAYOUT_STEPS_EN },
  'lesson-5-2': { copy: ORIGIN_LAYOUT_COPY_EN, steps: ORIGIN_LAYOUT_STEPS_EN },
  'lesson-6-1': { copy: SELECTING_GEOMETRY_COPY_EN, steps: SELECTING_GEOMETRY_STEPS_EN },
  'lesson-7-1': { copy: CREATE_LINE_COPY_EN, steps: CREATE_LINE_STEPS_EN },
  'lesson-7-2': { copy: CREATE_CIRCLE_RECT_COPY_EN, steps: CREATE_CIRCLE_RECT_STEPS_EN },
  'lesson-8-1': { copy: INTRO_TO_3D_COPY_EN, steps: INTRO_TO_3D_STEPS_EN },
  'lesson-9-1': { copy: INSPECT_MODEL_COPY_EN, steps: INSPECT_MODEL_STEPS_EN },
  'lesson-10-1': { copy: SAVING_WORK_COPY_EN, steps: SAVING_WORK_STEPS_EN },
  'lesson-11-1': { copy: TROUBLESHOOTING_COPY_EN, steps: TROUBLESHOOTING_STEPS_EN },
  'lesson-12-1': { copy: FINAL_GUIDED_EXERCISE_COPY_EN, steps: FINAL_GUIDED_EXERCISE_STEPS_EN },
  'lesson-13-1': { copy: PRACTICAL_ASSESSMENT_COPY_EN, steps: PRACTICAL_ASSESSMENT_STEPS_EN },
};

const WRITTEN_TUTORIAL_REGISTRY_JP: Record<string, { copy: WrittenTutorialCopy; steps: WrittenTutorialStep[] }> = {
  'lesson-1-1': { copy: GETTING_STARTED_COPY_JP, steps: GETTING_STARTED_STEPS_JP },
  'lesson-4-1': { copy: STANDARD_3D_VIEW_COPY_JP, steps: STANDARD_3D_VIEW_STEPS_JP },
  'lesson-4-2': { copy: USER_VIEW_COPY_JP, steps: USER_VIEW_STEPS_JP },
  'origin-projections': { copy: ORIGIN_AXES_COPY_JP, steps: ORIGIN_AXES_STEPS_JP },
  'lesson-5-1': { copy: ORIGIN_AXES_COPY_JP, steps: ORIGIN_AXES_STEPS_JP },
  'origin-layout': { copy: ORIGIN_LAYOUT_COPY_JP, steps: ORIGIN_LAYOUT_STEPS_JP },
  'lesson-5-2': { copy: ORIGIN_LAYOUT_COPY_JP, steps: ORIGIN_LAYOUT_STEPS_JP },
  'lesson-6-1': { copy: SELECTING_GEOMETRY_COPY_JP, steps: SELECTING_GEOMETRY_STEPS_JP },
  'lesson-7-1': { copy: CREATE_LINE_COPY_JP, steps: CREATE_LINE_STEPS_JP },
  'lesson-7-2': { copy: CREATE_CIRCLE_RECT_COPY_JP, steps: CREATE_CIRCLE_RECT_STEPS_JP },
  'lesson-8-1': { copy: INTRO_TO_3D_COPY_JP, steps: INTRO_TO_3D_STEPS_JP },
  'lesson-9-1': { copy: INSPECT_MODEL_COPY_JP, steps: INSPECT_MODEL_STEPS_JP },
  'lesson-10-1': { copy: SAVING_WORK_COPY_JP, steps: SAVING_WORK_STEPS_JP },
  'lesson-11-1': { copy: TROUBLESHOOTING_COPY_JP, steps: TROUBLESHOOTING_STEPS_JP },
  'lesson-12-1': { copy: FINAL_GUIDED_EXERCISE_COPY_JP, steps: FINAL_GUIDED_EXERCISE_STEPS_JP },
  'lesson-13-1': { copy: PRACTICAL_ASSESSMENT_COPY_JP, steps: PRACTICAL_ASSESSMENT_STEPS_JP },
};

const videoMap: Record<string, string> = {
  'zoomin_out': zoomInOutVideo,
  'pan': panVideo,
  'scroll': scrollVideo,
  'lesson4.1': lesson41Video,
  'lesson4.2': lesson42Video,
  'module5': module5Video,
};

interface DynamicLessonProps {
  lessonId: string;
  title: string;
  content: string[];
  videoId?: string;
  videoOverlays?: TutorialOverlay[];
  videoSteps?: LessonVideoStep[];
  muteSourceVideoAudio?: boolean;
  videoIntroTitle?: string;
  videoIntroDescription?: string;
  videoIntroEyebrow?: string;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  nextLabel?: string;
}

const DynamicFoundationsLesson: React.FC<DynamicLessonProps> = ({
  lessonId,
  title,
  content,
  videoId,
  videoOverlays,
  videoSteps,
  muteSourceVideoAudio,
  videoIntroTitle,
  videoIntroDescription,
  videoIntroEyebrow,
  onPrevLesson,
  onNextLesson,
  nextLabel,
}) => {
  const { language, t } = useTranslation();
  const isJapanese = language === 'ja';
  const [showRecap, setShowRecap] = useState(false);

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex,
    registerText
  } = useLessonCore(`icad-foundations-${lessonId}`);

  useEffect(() => {
    stop();
  }, [lessonId, stop]);

  const writtenRegistry = isJapanese ? WRITTEN_TUTORIAL_REGISTRY_JP : WRITTEN_TUTORIAL_REGISTRY_EN;
  const writtenModule = writtenRegistry[lessonId];

  const activeVideoSteps = useMemo(() => {
    if (isJapanese) {
      if (lessonId === 'lesson-4-1') return STANDARD_3D_VIEW_VIDEO_STEPS_JP;
      if (lessonId === 'lesson-4-2') return USER_VIEW_VIDEO_STEPS_JP;
      if (lessonId === 'lesson-5-1' || lessonId === 'origin-projections') return ORIGIN_AXES_VIDEO_STEPS_JP;
    }
    return videoSteps;
  }, [isJapanese, lessonId, videoSteps]);

  // Combine title with content for TTS
  const fullSteps = useMemo(() => [title, ...content], [title, content]);
  const videoNarration = useMemo(() => {
    const lessonText = content
      .filter((step) => !/^(Learning Objective|Objective):?$/i.test(step.trim()))
      .join(' ')
      .trim();

    return lessonText || title;
  }, [content, title]);

  const tutorialSteps = useMemo(() => {
    const configuredSteps = activeVideoSteps?.length ? activeVideoSteps : [{
      id: '1', title, customText: videoNarration, videoStart: 0, videoEnd: 9999, overlays: videoOverlays
    }];

    return configuredSteps.map((step) => ({
      ...step,
      text: step.customText,
      zoom: '',
      origin: '',
      spotlight: { top: '0', left: '0', width: '0', height: '0', opacity: 0 },
      subtitlePos: { bottom: '20px' },
      videoSrc: videoMap[videoId || ''],
    }));
  }, [title, videoId, videoNarration, videoOverlays, activeVideoSteps]);

  const isViewTourLesson = Boolean(videoIntroEyebrow);
  const fallbackRecap = useMemo(() => getFoundationsRecap(lessonId), [lessonId]);
  const hasEmbeddedRecap = Boolean(activeVideoSteps?.some((step) => step.recapData));

  const activeIntroEyebrow = isJapanese
    ? (videoIntroEyebrow ? '視図ツアー' : '動画チュートリアル')
    : (videoIntroEyebrow || 'Interactive Video');

  const activeIntroTitle = isJapanese
    ? (lessonId === 'lesson-4-1'
        ? '3D ビューの確認'
        : lessonId === 'lesson-4-2'
          ? 'ユーザービューの確認'
          : (videoIntroTitle ? '動画デモンストレーション' : '動画デモンストレーション'))
    : (videoIntroTitle || 'Watch Video Demonstration');

  const activeIntroDescription = isJapanese
    ? (lessonId === 'lesson-4-1'
        ? '3D ビューのガイド付きツアーで、正面・上面・底面・右面・左面の各方向からモデルを正確に検査する方法を学びます。'
        : lessonId === 'lesson-4-2'
          ? 'ユーザービューのガイド付きツアーで、モデルの幅・高さ・奥行きを把握しながら複数の面を同時に検査する方法を学びます。'
          : (videoIntroDescription ? 'ワークスペースでこのツールの実際の動作を確認します。' : 'ワークスペースでこのツールの実際の動作を確認します。'))
    : (videoIntroDescription || 'See this tool in action in the workspace.');

  const beginRecapOrAdvance = () => {
    if (fallbackRecap && !hasEmbeddedRecap) {
      setShowRecap(true);
      speak([fallbackRecap.narration], 0);
      return;
    }
    onNextLesson?.();
  };

  const finishRecap = () => {
    stop();
    setShowRecap(false);
    onNextLesson?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!writtenModule) {
      registerText(fullSteps, 0);
    }
  }, [registerText, fullSteps, writtenModule]);

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    "content",
    writtenModule ? 0 : fullSteps.length,
    [{ id: 'content' }],
    beginRecapOrAdvance,
    speak,
    writtenModule ? [] : fullSteps,
    0
  );

  return (
    <div className={`course-lesson-container foundations-lesson ${isViewTourLesson ? 'foundations-view-tour-lesson foundations-standard-intro' : ''} ${videoId ? 'foundations-video-reading-lesson' : ''}`} ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-grid single-card foundations-lesson-grid">
        <div className="lesson-card tab-content fade-in foundations-lesson-card">
          {writtenModule ? (
            <FoundationsVideoReadingLayout
              title={writtenModule.copy.title}
              description={writtenModule.copy.description}
              steps={writtenModule.steps}
              writtenTutorialCopy={writtenModule.copy}
            >
              {videoId && videoMap[videoId] && (
                <VideoTutorialViewer 
                  steps={tutorialSteps}
                  muteSourceVideoAudio={muteSourceVideoAudio}
                  lessonType="video-tutorial"
                  introPanel={{
                    icon: videoIntroEyebrow ? Eye : Play,
                    eyebrow: activeIntroEyebrow,
                    title: activeIntroTitle,
                    description: activeIntroDescription
                  }}
                />
              )}
            </FoundationsVideoReadingLayout>
          ) : (
            <div className="fade-in foundations-lesson-content">
              <div className="foundations-content-stack">
              {content.map((step, idx) => {
                const stepIndex = idx + 1; // offset by 1 because title is at index 0

                if (/^(Learning Objective|Objective):/i.test(step)) {
                  return null;
                }

                if (idx > 0 && content[idx - 1].trim().toLowerCase() === 'learning objective:') {
                  return null;
                }

                // Custom styling for concept questions.
                if (step.startsWith("What")) {
                  return (
                    <div key={stepIndex} className={`instruction-step ${currentIndex === stepIndex ? 'reading-active' : ''}`}>
                      <div className="card-header">
                        <h4 className="section-title">
                          <KaraokeLessonText as="span" text={step} isActive={isSpeaking && currentIndex === stepIndex} currentCharIndex={currentCharIndex} />
                        </h4>
                      </div>
                    </div>
                  );
                }

                // If this is the answer body for a concept question.
                if (idx > 0 && content[idx - 1].startsWith("What")) {
                  return (
                    <div key={stepIndex}>
                      <div className={`instruction-step step-description ${currentIndex === stepIndex ? 'reading-active' : ''}`}>
                        <p className="p-flush foundations-lead">
                          <KaraokeLessonText as="span" text={step} isActive={isSpeaking && currentIndex === stepIndex} currentCharIndex={currentCharIndex} />
                        </p>
                      </div>
                    </div>
                  );
                }

                // Custom styling for "How to..." headers
                if (step.startsWith("How to")) {
                  return (
                    <div key={stepIndex} className={`instruction-step ${currentIndex === stepIndex ? 'reading-active' : ''}`}>
                      <h4 className={`section-title ${currentIndex === stepIndex ? 'reading-active' : ''}`}>
                        <KaraokeLessonText as="span" text={step} isActive={isSpeaking && currentIndex === stepIndex} currentCharIndex={currentCharIndex} />
                      </h4>
                    </div>
                  );
                }

                // Custom styling for numbered steps (e.g. "Step 1: Do this")
                const stepMatch = step.match(/^Step\s+(\d+):\s*(.*)/i);
                if (stepMatch) {
                  return (
                    <div key={stepIndex} className={`instruction-step ${currentIndex === stepIndex ? 'reading-active' : ''}`}>
                      <div className="step-header">
                        <span className="step-number">{stepMatch[1]}</span>
                        <KaraokeLessonText as="span" className="step-label" text={stepMatch[2]} isActive={isSpeaking && currentIndex === stepIndex} currentCharIndex={currentCharIndex} />
                      </div>
                    </div>
                  );
                }

                // Generic blocks
                let textStyle = "p-flush";
                let blockStyle = "foundations-text-block";

                if (step.startsWith("Learning Objective") || step.startsWith("Goal")) {
                  textStyle = "p-flush foundations-emphasis";
                } else if (step.startsWith("Try It Yourself") || step.startsWith("Practice")) {
                  textStyle = "p-flush foundations-practice-text";
                } else if (step.startsWith("Important") || step.startsWith("Warning") || step.startsWith("Note")) {
                  textStyle = "p-flush red-text font-medium";
                } else if (step.startsWith("Expected Result")) {
                  textStyle = "p-flush foundations-result-text";
                }

                return (
                  <div 
                    key={stepIndex} 
                    className={`instruction-step ${blockStyle} ${currentIndex === stepIndex ? 'reading-active' : ''}`}
                  >
                    <KaraokeLessonText
                      className={textStyle}
                      text={step}
                      isActive={isSpeaking && currentIndex === stepIndex}
                      currentCharIndex={currentCharIndex}
                    />
                  </div>
                );
              })}

              {/* Render Video at the bottom of the lesson */}
              {videoId && videoMap[videoId] && (
                <div className="instruction-step foundations-video-section" style={{ position: 'relative' }}>
                  <FoundationsVideoReadingLayout
                    title={videoIntroTitle || title}
                    description={videoIntroDescription || 'Read the video demonstration as a step-by-step tutorial.'}
                    steps={tutorialSteps.map(step => ({ id: step.id, title: step.title, text: step.text }))}
                  >
                    <VideoTutorialViewer 
                      steps={tutorialSteps}
                      muteSourceVideoAudio={muteSourceVideoAudio}
                      lessonType="video-tutorial"
                      introPanel={{
                        icon: videoIntroEyebrow ? Eye : Play,
                        eyebrow: videoIntroEyebrow || "Interactive Video",
                        title: videoIntroTitle || "Watch Video Demonstration",
                        description: videoIntroDescription || "See this tool in action in the workspace."
                      }}
                    />
                  </FoundationsVideoReadingLayout>
                </div>
              )}
            </div>
          </div>
          )}

          <div className="lesson-navigation">
            {onPrevLesson && (
              <button className="nav-button" onClick={() => { onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ChevronLeft size={18} /> {t('common.previous')}</button>
            )}
            <button className="nav-button next" onClick={() => { beginRecapOrAdvance(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
      {showRecap && fallbackRecap && (
        <div className="foundations-recap-overlay">
          <LessonRecapPanel
            summary={fallbackRecap.narration}
            items={fallbackRecap.items}
            actionLabel={nextLabel || t('lesson.next_lesson')}
            actionType="next"
            onAction={finishRecap}
          />
        </div>
      )}
    </div>
  );
};

export default DynamicFoundationsLesson;
