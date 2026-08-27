import { useTranslation } from '../../../context/LanguageContext';
import React, { useEffect, useMemo } from "react";
import { ChevronRight, ChevronLeft, Play } from 'lucide-react';
import { useLessonCore } from "../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../KaraokeLessonText";
import VideoTutorialViewer from "../../3D_Modeling/VideoTutorialViewer";
import '../../2D_Drawing/CourseLesson.css';
import "./FoundationsLesson.css";
import zoomInOutVideo from '../../../assets/3D_INTERACTIVE/zoomin_out.mp4';
import panVideo from '../../../assets/3D_INTERACTIVE/pan.mp4';
import scrollVideo from '../../../assets/3D_INTERACTIVE/scroll.mp4';
import lesson41Video from '../../../assets/3D_INTERACTIVE/lesson4.1.mp4';
import lesson42Video from '../../../assets/3D_INTERACTIVE/lesson4.2.mp4';
import module5Video from '../../../assets/3D_INTERACTIVE/module5.mp4';
import type { LessonVideoStep, TutorialOverlay } from '../../../types/tutorial';

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
  onPrevLesson,
  onNextLesson,
  nextLabel,
}) => {
  const { t } = useTranslation();

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

  useEffect(() => {
    registerText(fullSteps, 0);
  }, [registerText, fullSteps]);

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    "content",
    fullSteps.length,
    [{ id: 'content' }],
    () => { if (onNextLesson) onNextLesson(); },
    speak,
    fullSteps,
    0
  );

  return (
    <div className="course-lesson-container foundations-lesson" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-grid single-card foundations-lesson-grid">
        <div className="lesson-card tab-content foundations-lesson-card">
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
                <div className="instruction-step foundations-video-section" style={{ height: '600px', position: 'relative' }}>
                  <VideoTutorialViewer 
                    steps={tutorialSteps}
                    muteSourceVideoAudio={muteSourceVideoAudio}
                    lessonType="video-tutorial"
                    introPanel={{
                      icon: Play,
                      eyebrow: "Interactive Video",
                      title: "Watch Video Demonstration",
                      description: "See this tool in action in the workspace."
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="lesson-navigation">
            {onPrevLesson && (
              <button className="nav-button" onClick={() => { onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ChevronLeft size={18} /> {t('common.previous')}</button>
            )}
            <button className="nav-button next" onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicFoundationsLesson;
