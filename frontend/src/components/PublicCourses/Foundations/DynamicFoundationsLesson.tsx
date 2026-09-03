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
  GETTING_STARTED_WRITTEN_TUTORIAL_COPY,
  GETTING_STARTED_WRITTEN_TUTORIAL_STEPS,
  STANDARD_3D_VIEW_WRITTEN_TUTORIAL_COPY,
  STANDARD_3D_VIEW_WRITTEN_TUTORIAL_STEPS,
  USER_VIEW_WRITTEN_TUTORIAL_COPY,
  USER_VIEW_WRITTEN_TUTORIAL_STEPS,
  ORIGIN_AXES_WRITTEN_TUTORIAL_COPY,
  ORIGIN_AXES_WRITTEN_TUTORIAL_STEPS,
  ORIGIN_LAYOUT_WRITTEN_TUTORIAL_COPY,
  ORIGIN_LAYOUT_WRITTEN_TUTORIAL_STEPS,
  SELECTING_GEOMETRY_WRITTEN_TUTORIAL_COPY,
  SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS,
  CREATE_LINE_WRITTEN_TUTORIAL_COPY,
  CREATE_LINE_WRITTEN_TUTORIAL_STEPS,
  CREATE_CIRCLE_RECT_WRITTEN_TUTORIAL_COPY,
  CREATE_CIRCLE_RECT_WRITTEN_TUTORIAL_STEPS,
  INTRO_TO_3D_WRITTEN_TUTORIAL_COPY,
  INTRO_TO_3D_WRITTEN_TUTORIAL_STEPS,
  INSPECT_MODEL_WRITTEN_TUTORIAL_COPY,
  INSPECT_MODEL_WRITTEN_TUTORIAL_STEPS,
  SAVING_WORK_WRITTEN_TUTORIAL_COPY,
  SAVING_WORK_WRITTEN_TUTORIAL_STEPS,
  TROUBLESHOOTING_WRITTEN_TUTORIAL_COPY,
  TROUBLESHOOTING_WRITTEN_TUTORIAL_STEPS,
  FINAL_GUIDED_EXERCISE_WRITTEN_TUTORIAL_COPY,
  FINAL_GUIDED_EXERCISE_WRITTEN_TUTORIAL_STEPS,
  PRACTICAL_ASSESSMENT_WRITTEN_TUTORIAL_COPY,
  PRACTICAL_ASSESSMENT_WRITTEN_TUTORIAL_STEPS,
  WrittenTutorialCopy,
  WrittenTutorialStep,
} from '../../iCAD_Foundations/WrittenTutorial';

const WRITTEN_TUTORIAL_REGISTRY: Record<string, { copy: WrittenTutorialCopy; steps: WrittenTutorialStep[] }> = {
  'lesson-1-1': { copy: GETTING_STARTED_WRITTEN_TUTORIAL_COPY, steps: GETTING_STARTED_WRITTEN_TUTORIAL_STEPS },
  'lesson-4-1': { copy: STANDARD_3D_VIEW_WRITTEN_TUTORIAL_COPY, steps: STANDARD_3D_VIEW_WRITTEN_TUTORIAL_STEPS },
  'lesson-4-2': { copy: USER_VIEW_WRITTEN_TUTORIAL_COPY, steps: USER_VIEW_WRITTEN_TUTORIAL_STEPS },
  'origin-projections': { copy: ORIGIN_AXES_WRITTEN_TUTORIAL_COPY, steps: ORIGIN_AXES_WRITTEN_TUTORIAL_STEPS },
  'lesson-5-1': { copy: ORIGIN_AXES_WRITTEN_TUTORIAL_COPY, steps: ORIGIN_AXES_WRITTEN_TUTORIAL_STEPS },
  'origin-layout': { copy: ORIGIN_LAYOUT_WRITTEN_TUTORIAL_COPY, steps: ORIGIN_LAYOUT_WRITTEN_TUTORIAL_STEPS },
  'lesson-5-2': { copy: ORIGIN_LAYOUT_WRITTEN_TUTORIAL_COPY, steps: ORIGIN_LAYOUT_WRITTEN_TUTORIAL_STEPS },
  'lesson-6-1': { copy: SELECTING_GEOMETRY_WRITTEN_TUTORIAL_COPY, steps: SELECTING_GEOMETRY_WRITTEN_TUTORIAL_STEPS },
  'lesson-7-1': { copy: CREATE_LINE_WRITTEN_TUTORIAL_COPY, steps: CREATE_LINE_WRITTEN_TUTORIAL_STEPS },
  'lesson-7-2': { copy: CREATE_CIRCLE_RECT_WRITTEN_TUTORIAL_COPY, steps: CREATE_CIRCLE_RECT_WRITTEN_TUTORIAL_STEPS },
  'lesson-8-1': { copy: INTRO_TO_3D_WRITTEN_TUTORIAL_COPY, steps: INTRO_TO_3D_WRITTEN_TUTORIAL_STEPS },
  'lesson-9-1': { copy: INSPECT_MODEL_WRITTEN_TUTORIAL_COPY, steps: INSPECT_MODEL_WRITTEN_TUTORIAL_STEPS },
  'lesson-10-1': { copy: SAVING_WORK_WRITTEN_TUTORIAL_COPY, steps: SAVING_WORK_WRITTEN_TUTORIAL_STEPS },
  'lesson-11-1': { copy: TROUBLESHOOTING_WRITTEN_TUTORIAL_COPY, steps: TROUBLESHOOTING_WRITTEN_TUTORIAL_STEPS },
  'lesson-12-1': { copy: FINAL_GUIDED_EXERCISE_WRITTEN_TUTORIAL_COPY, steps: FINAL_GUIDED_EXERCISE_WRITTEN_TUTORIAL_STEPS },
  'lesson-13-1': { copy: PRACTICAL_ASSESSMENT_WRITTEN_TUTORIAL_COPY, steps: PRACTICAL_ASSESSMENT_WRITTEN_TUTORIAL_STEPS },
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
  const { t } = useTranslation();
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

  const writtenModule = WRITTEN_TUTORIAL_REGISTRY[lessonId];

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
    const configuredSteps = videoSteps?.length ? videoSteps : [{
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
  }, [title, videoId, videoNarration, videoOverlays, videoSteps]);
  const isViewTourLesson = Boolean(videoIntroEyebrow);
  const fallbackRecap = useMemo(() => getFoundationsRecap(lessonId), [lessonId]);
  const hasEmbeddedRecap = Boolean(videoSteps?.some((step) => step.recapData));

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
    registerText(fullSteps, 0);
  }, [registerText, fullSteps]);

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    "content",
    fullSteps.length,
    [{ id: 'content' }],
    beginRecapOrAdvance,
    speak,
    fullSteps,
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
                    eyebrow: videoIntroEyebrow || "Interactive Video",
                    title: videoIntroTitle || "Watch Video Demonstration",
                    description: videoIntroDescription || "See this tool in action in the workspace."
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
