import { useTranslation } from '../../../context/LanguageContext';
import React, { useEffect, useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, Info, Play, CheckCircle } from 'lucide-react';
import { useLessonCore } from "../../../hooks/useLessonCore";
import { useTTSAutoplay } from "../../../hooks/useTTSAutoplay";
import { KaraokeLessonText } from "../../KaraokeLessonText";
import "../../../styles/3D_Modeling/CourseLesson.css";
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
}

const DynamicFoundationsLesson: React.FC<DynamicLessonProps> = ({
  lessonId,
  title,
  content,
  videoId,
  onPrevLesson,
  onNextLesson,
  nextLabel,
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
    <div className="course-lesson-container bg-slate-50 min-h-full" ref={containerRef}>
      <div className="lesson-progress-container fixed top-0 left-0 w-full h-1 z-50">
        <div className="lesson-progress-bar h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-grid single-card max-w-4xl mx-auto mt-6 mb-12 px-4">
        <div className="lesson-card tab-content bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/40 ring-1 ring-slate-900/5">
          <div className="fade-in p-8 sm:p-10">
            <div className="space-y-6">
              {content.map((step, idx) => {
                const stepIndex = idx + 1; // offset by 1 because title is at index 0

                // Custom styling for "What is..." or "What Does..." or "Learning Objective"
                if (step.startsWith("What") || step.startsWith("Learning Objective:")) {
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

                // If this is the answer body for a "What..." or "Learning Objective:" question
                if (idx > 0 && (content[idx - 1].startsWith("What") || content[idx - 1].startsWith("Learning Objective:"))) {
                  return (
                    <div key={stepIndex}>
                      <div className={`instruction-step step-description ${currentIndex === stepIndex ? 'reading-active' : ''}`}>
                        <p className="p-flush text-slate-700 text-lg leading-relaxed">
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
                        <KaraokeLessonText as="span" className="step-label" text={step} isActive={isSpeaking && currentIndex === stepIndex} currentCharIndex={currentCharIndex} />
                      </div>
                    </div>
                  );
                }

                // Generic blocks
                let textStyle = "p-flush";
                let blockStyle = "mt-2";

                if (step.startsWith("Learning Objective") || step.startsWith("Goal")) {
                  textStyle = "p-flush font-semibold text-blue-600";
                } else if (step.startsWith("Try It Yourself") || step.startsWith("Practice")) {
                  textStyle = "p-flush font-semibold text-emerald-600";
                } else if (step.startsWith("Important") || step.startsWith("Warning") || step.startsWith("Note")) {
                  textStyle = "p-flush red-text font-medium";
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
                <div className="instruction-step mt-8">
                  <div className="card-header">
                    <h4 className="section-title">
                      <span>HOW IT WORKS</span>
                    </h4>
                  </div>
                  <div className="flex-row-wrap mt-8" style={{ gap: '2rem', justifyContent: 'center' }}>
                    <video 
                      src={videoMap[videoId]} 
                      controls 
                      className="software-screenshot mt-8"
                      style={{ width: '900px', maxWidth: '100%' }}
                      preload="metadata"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

                    <div className="lesson-navigation">
            <button className="nav-button" onClick={() => { if (onPrevLesson) onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ChevronLeft size={18} /> {t('common.previous')}</button>
            <button className="nav-button next" onClick={() => { if (onNextLesson) onNextLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{nextLabel || t('common.next')} <ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicFoundationsLesson;
