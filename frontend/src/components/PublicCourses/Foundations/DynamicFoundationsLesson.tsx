import { useTranslation } from '../../../context/LanguageContext';
import React, { useEffect, useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, Info, Play } from 'lucide-react';
import { useLessonCore } from "../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../KaraokeLessonText";
import "../../../styles/3D_Modeling/CourseLesson.css";
import "./FoundationsLesson.css";
import zoomInOutVideo from '../../../assets/3D_INTERACTIVE/zoomin_out.mp4';
import panVideo from '../../../assets/3D_INTERACTIVE/pan.mp4';
import scrollVideo from '../../../assets/3D_INTERACTIVE/scroll.mp4';
import lesson41Video from '../../../assets/3D_INTERACTIVE/lesson4.1.mp4';
import lesson42Video from '../../../assets/3D_INTERACTIVE/lesson4.2.mp4';
import module5Video from '../../../assets/3D_INTERACTIVE/module5.mp4';

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
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  nextLabel?: string;
  isFirstLesson?: boolean;
}

const DynamicFoundationsLesson: React.FC<DynamicLessonProps> = ({
  lessonId,
  title,
  content,
  videoId,
  onPrevLesson,
  onNextLesson,
  nextLabel,
  isFirstLesson = false,
}) => {
  const [activeTab] = useState("content");
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

  useEffect(() => {
    registerText(fullSteps, 0);
  }, [registerText, fullSteps]);

  useTTSAutoplay(
    isSpeaking,
    currentIndex,
    activeTab,
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

                if (step.startsWith("Learning Objective:")) {
                  const objective = step.replace(/^Learning Objective:\s*/i, '');
                  return (
                    <div key={stepIndex} className={`foundations-callout foundations-objective ${currentIndex === stepIndex ? 'reading-active' : ''}`}>
                      <div className="foundations-callout-icon" aria-hidden="true"><Info size={20} /></div>
                      <div>
                        <h4>Learning objective</h4>
                        <KaraokeLessonText as="p" text={objective} isActive={isSpeaking && currentIndex === stepIndex} currentCharIndex={currentCharIndex} />
                      </div>
                    </div>
                  );
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
                <div className="instruction-step foundations-video-section">
                  <div className="card-header">
                    <h4 className="section-title">
                      <Play size={20} aria-hidden="true" />
                      <span>How it works</span>
                    </h4>
                  </div>
                  <div className="foundations-video-frame">
                    <video 
                      src={videoMap[videoId]} 
                      controls 
                      className="software-screenshot foundations-video"
                      preload="metadata"
                      aria-label={`${title} demonstration video`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lesson-navigation">
            <button className="nav-button" disabled={isFirstLesson} onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ChevronLeft size={18} /> {t('common.previous')}</button>
            <button className="nav-button next" onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicFoundationsLesson;
