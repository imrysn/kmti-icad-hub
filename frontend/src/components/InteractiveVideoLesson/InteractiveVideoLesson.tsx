import { CheckCircle2, ChevronLeft, ChevronRight, GripHorizontal, Info, Mouse, Pause, Play, RefreshCcw, RotateCcw } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LessonIntroPanel from '../LessonIntroPanel';
import { useTranslation } from '../../context/LanguageContext';
import { useLessonCore } from '../../hooks/useLessonCore';
import { splitIntoSentences } from '../../utils/sentenceUtils';
import type { InteractiveVideoLessonConfig, InteractiveVideoQuestion } from './types';
import '../../styles/LessonIntroPanel.css';
import './InteractiveVideoLesson.css';

interface InteractiveVideoLessonProps {
  config: InteractiveVideoLessonConfig;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  onComplete?: () => Promise<void> | void;
  nextLabel?: string;
  isFirstLesson?: boolean;
}

type LessonPhase = 'intro' | 'video' | 'question' | 'recap' | 'complete';

export const InteractiveVideoLesson: React.FC<InteractiveVideoLessonProps> = ({
  config,
  onPrevLesson,
  onNextLesson,
  onComplete,
  nextLabel,
  isFirstLesson = false,
}) => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const firedEventsRef = useRef(new Set<string>());
  const passedQuestionsRef = useRef(new Set<string>());
  const narrationStartedRef = useRef(false);
  const narrationAfterRef = useRef<null | (() => void)>(null);
  const keepNarrationPlayingOnPauseRef = useRef(false);
  const overlayTimerRef = useRef<number | null>(null);
  const completionStartedRef = useRef(false);

  const [phase, setPhase] = useState<LessonPhase>('intro');
  const [activeQuestion, setActiveQuestion] = useState<InteractiveVideoQuestion | null>(null);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [answerChecked, setAnswerChecked] = useState(false);
  const [overlayLabel, setOverlayLabel] = useState('');
  const [narrationParts, setNarrationParts] = useState<string[]>([config.introNarration]);
  const [completionError, setCompletionError] = useState('');
  const [isSavingCompletion, setIsSavingCompletion] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(true);
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    currentIndex,
    currentSentenceIndex,
    registerText,
  } = useLessonCore(`interactive-video-${config.id}`);

  const segmentByQuestionId = useMemo(
    () => new Map(config.segments.map((segment) => [segment.checkpoint.id, segment])),
    [config.segments],
  );

  const selectedAnswer = activeQuestion?.choices.find((choice) => choice.id === selectedChoice);
  const isAnswerCorrect = Boolean(selectedAnswer?.isCorrect);

  const beginNarration = useCallback((text: string | string[], after?: () => void) => {
    const narration = Array.isArray(text) ? text : [text];
    stop();
    setNarrationParts(narration);
    registerText(narration, 0);
    narrationAfterRef.current = after || null;
    narrationStartedRef.current = false;
    speak(narration, 0);
  }, [registerText, speak, stop]);

  const showOverlay = useCallback((label: string) => {
    if (overlayTimerRef.current) window.clearTimeout(overlayTimerRef.current);
    setOverlayLabel(label);
    overlayTimerRef.current = window.setTimeout(() => setOverlayLabel(''), 4200);
  }, []);

  const playVideo = useCallback(() => {
    setPhase('video');
    videoRef.current?.play().catch(() => {
      // The visible Play button remains available when browser autoplay is blocked.
    });
  }, []);

  const startIntro = useCallback(() => {
    playVideo();
  }, [playVideo]);

  useEffect(() => {
    if (isSpeaking) {
      narrationStartedRef.current = true;
      return;
    }
    if (!narrationStartedRef.current || !narrationAfterRef.current) return;
    narrationStartedRef.current = false;
    const after = narrationAfterRef.current;
    narrationAfterRef.current = null;
    after();
  }, [isSpeaking]);

  useEffect(() => () => {
    if (overlayTimerRef.current) window.clearTimeout(overlayTimerRef.current);
  }, []);

  const openQuestion = useCallback((question: InteractiveVideoQuestion) => {
    keepNarrationPlayingOnPauseRef.current = true;
    videoRef.current?.pause();
    stop();
    setPhase('question');
    setActiveQuestion(question);
    setSelectedChoice('');
    setAnswerChecked(false);
  }, [stop]);

  const processTimeline = useCallback(() => {
    const video = videoRef.current;
    if (!video || phase !== 'video') return;
    const time = video.currentTime;

    const introNarrationEventId = 'video-intro-narration';
    if (time >= 0.01 && !firedEventsRef.current.has(introNarrationEventId)) {
      firedEventsRef.current.add(introNarrationEventId);
      beginNarration(config.introNarration);
    }

    for (const segment of config.segments) {
      const narrationEventId = `${segment.id}-narration`;
      if (time >= segment.startAt && !firedEventsRef.current.has(narrationEventId)) {
        firedEventsRef.current.add(narrationEventId);
        if (isSpeaking) {
          keepNarrationPlayingOnPauseRef.current = true;
          video.pause();
          narrationAfterRef.current = () => {
            showOverlay(segment.overlayText);
            beginNarration(segment.narration);
            playVideo();
          };
        } else {
          showOverlay(segment.overlayText);
          beginNarration(segment.narration);
        }
      }

      const checkpointEventId = `${segment.id}-checkpoint`;
      if (time >= segment.endAt && !passedQuestionsRef.current.has(segment.checkpoint.id)) {
        if (!firedEventsRef.current.has(checkpointEventId)) {
          firedEventsRef.current.add(checkpointEventId);
          keepNarrationPlayingOnPauseRef.current = true;
          video.pause();
          if (isSpeaking) {
            narrationAfterRef.current = () => openQuestion(segment.checkpoint);
          } else {
            openQuestion(segment.checkpoint);
          }
        }
        return;
      }
    }
  }, [beginNarration, config.introNarration, config.segments, isSpeaking, openQuestion, phase, playVideo, showOverlay]);

  const handleTimeUpdate = useCallback(() => {
    setVideoTime(videoRef.current?.currentTime || 0);
    processTimeline();
  }, [processTimeline]);

  const activeSubtitle = useMemo(() => {
    if (!isSpeaking || currentIndex < 0) return '';
    const paragraph = narrationParts[currentIndex];
    if (!paragraph) return '';
    const sentences = splitIntoSentences(paragraph);
    return sentences[currentSentenceIndex] || paragraph;
  }, [currentIndex, currentSentenceIndex, isSpeaking, narrationParts]);

  const handleSeeking = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const nextRequired = config.segments.find(
      (segment) => !passedQuestionsRef.current.has(segment.checkpoint.id),
    );
    if (nextRequired && video.currentTime > nextRequired.endAt) {
      keepNarrationPlayingOnPauseRef.current = true;
      video.pause();
      video.currentTime = nextRequired.startAt;
      firedEventsRef.current.add(`${nextRequired.id}-narration`);
      showOverlay(nextRequired.overlayText);
      beginNarration(nextRequired.narration, playVideo);
    }
  }, [beginNarration, config.segments, playVideo, showOverlay]);

  const handleVideoPause = useCallback(() => {
    setIsVideoPaused(true);
    if (keepNarrationPlayingOnPauseRef.current) {
      keepNarrationPlayingOnPauseRef.current = false;
      return;
    }
    if (phase === 'video' && isSpeaking) pause();
  }, [isSpeaking, pause, phase]);

  const handleVideoPlay = useCallback(() => {
    setIsVideoPaused(false);
    keepNarrationPlayingOnPauseRef.current = false;
    if (phase === 'video' && isSpeaking) resume();
  }, [isSpeaking, phase, resume]);

  const toggleVideoPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video || phase !== 'video') return;
    if (video.paused) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [phase]);

  const finishLesson = useCallback(async () => {
    if (completionStartedRef.current) return;
    completionStartedRef.current = true;
    setIsSavingCompletion(true);
    setCompletionError('');
    try {
      await onComplete?.();
      setPhase('complete');
    } catch (error) {
      console.error('Failed to save interactive lesson completion:', error);
      completionStartedRef.current = false;
      setCompletionError('Your answers are complete, but progress could not be saved. Please try again.');
      setPhase('recap');
    } finally {
      setIsSavingCompletion(false);
    }
  }, [onComplete]);

  const beginRecap = useCallback(() => {
    setActiveQuestion(null);
    setPhase('recap');
    beginNarration(config.recapNarration, finishLesson);
  }, [beginNarration, config.recapNarration, finishLesson]);

  const handleQuestionContinue = () => {
    if (!activeQuestion || !isAnswerCorrect) return;
    passedQuestionsRef.current.add(activeQuestion.id);

    if (activeQuestion.id === config.conceptCheck.id) {
      beginRecap();
      return;
    }

    const segment = segmentByQuestionId.get(activeQuestion.id);
    const segmentIndex = segment ? config.segments.findIndex((item) => item.id === segment.id) : -1;
    const isLastVideoCheckpoint = segmentIndex === config.segments.length - 1;
    setActiveQuestion(null);

    if (isLastVideoCheckpoint) {
      openQuestion(config.conceptCheck);
      return;
    }

    playVideo();
  };

  const replayLesson = () => {
    stop();
    firedEventsRef.current.clear();
    passedQuestionsRef.current.clear();
    completionStartedRef.current = false;
    setActiveQuestion(null);
    setSelectedChoice('');
    setAnswerChecked(false);
    setCompletionError('');
    setOverlayLabel('');
    setVideoTime(0);
    setIsVideoPaused(true);
    setPhase('intro');
    if (videoRef.current) videoRef.current.currentTime = 0;
    startIntro();
  };

  return (
    <div className="course-lesson-container interactive-video-lesson" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <section className="ivl-objective" aria-labelledby={`${config.id}-objective`}>
        <Info size={20} aria-hidden="true" />
        <div>
          <p className="ivl-eyebrow">Learning objective</p>
          <p id={`${config.id}-objective`}>{config.objective}</p>
        </div>
      </section>

      <section className="ivl-player-card" aria-label={config.videoLabel}>
        <div className="ivl-video-shell lesson-intro-shell">
          <video
            ref={videoRef}
            className="ivl-video"
            src={config.videoSrc}
            controlsList="nodownload"
            preload="metadata"
            aria-label={config.videoLabel}
            onLoadedMetadata={() => setVideoDuration(videoRef.current?.duration || 0)}
            onTimeUpdate={handleTimeUpdate}
            onSeeking={handleSeeking}
            onPause={handleVideoPause}
            onPlay={handleVideoPlay}
            onEnded={processTimeline}
            onError={() => setCompletionError('The lesson video could not be loaded. Please refresh the page and try again.')}
          />

          {overlayLabel && (
            <div className="ivl-action-overlay" role="status" aria-live="polite">
              <span>{overlayLabel}</span>
            </div>
          )}

          {activeSubtitle && (
            <div className="ivl-subtitle" role="status" aria-live="polite">
              <span>{activeSubtitle}</span>
            </div>
          )}

          {phase === 'video' && (
            <div className="tutorial-control-card ivl-tutorial-control-card" aria-label="Tutorial playback controls">
              <span className="ivl-control-handle" aria-hidden="true"><GripHorizontal size={18} /></span>
              <span className="ivl-time-badge">
                {Math.floor(videoTime / 60)}:{String(Math.floor(videoTime % 60)).padStart(2, '0')}
                <span> / {Math.floor(videoDuration / 60)}:{String(Math.floor(videoDuration % 60)).padStart(2, '0')}</span>
              </span>
              <button className="ivl-control-button" type="button" onClick={toggleVideoPlayback} aria-label={isVideoPaused ? 'Play lesson' : 'Pause lesson'}>
                {isVideoPaused ? <Play size={17} /> : <Pause size={17} />}
                <span>{isVideoPaused ? 'Play' : 'Pause'}</span>
              </button>
              <button className="ivl-control-button ivl-control-icon" type="button" onClick={replayLesson} aria-label="Replay lesson from start" title="Replay from start">
                <RotateCcw size={17} />
              </button>
            </div>
          )}

          {phase === 'intro' && (
            <LessonIntroPanel
              icon={Mouse}
              eyebrow="Interactive navigation lesson"
              title="Zoom In and Zoom Out"
              description={config.introSupportingText}
              onStart={startIntro}
            />
          )}

          {phase === 'question' && activeQuestion && (
            <div className="ivl-stage-panel ivl-question-panel" role="dialog" aria-modal="true" aria-labelledby={`${activeQuestion.id}-title`}>
              <p className="ivl-eyebrow">Knowledge check</p>
              <h3 id={`${activeQuestion.id}-title`}>{activeQuestion.prompt}</h3>
              <fieldset className="ivl-options">
                <legend className="sr-only">Choose one answer</legend>
                {activeQuestion.choices.map((choice) => (
                  <label key={choice.id} className={`ivl-option ${selectedChoice === choice.id ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name={activeQuestion.id}
                      value={choice.id}
                      checked={selectedChoice === choice.id}
                      disabled={answerChecked}
                      onChange={() => setSelectedChoice(choice.id)}
                    />
                    <span>{choice.label}</span>
                  </label>
                ))}
              </fieldset>

              {answerChecked && (
                <div className={`ivl-feedback ${isAnswerCorrect ? 'correct' : 'incorrect'}`} role="status">
                  {selectedAnswer?.feedback}
                </div>
              )}

              <div className="ivl-question-actions">
                {!answerChecked && (
                  <button className="ivl-primary-button" disabled={!selectedChoice} onClick={() => setAnswerChecked(true)}>
                    Check Answer
                  </button>
                )}
                {answerChecked && !isAnswerCorrect && (
                  <button className="ivl-secondary-button" onClick={() => { setSelectedChoice(''); setAnswerChecked(false); }}>
                    <RefreshCcw size={17} aria-hidden="true" /> Retry
                  </button>
                )}
                {answerChecked && isAnswerCorrect && (
                  <button className="ivl-primary-button" onClick={handleQuestionContinue}>
                    Continue Lesson <ChevronRight size={17} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          )}

          {phase === 'recap' && (
            <div className="ivl-stage-panel ivl-recap-panel" role="status" aria-live="polite">
              <CheckCircle2 size={30} aria-hidden="true" />
              <p className="ivl-eyebrow">Lesson recap</p>
              <h3>Remember</h3>
              <p>{config.recapNarration}</p>
              <div className="ivl-recap-items">
                {config.recapItems.map((item) => (
                  <div key={item.action} className="ivl-recap-item">
                    <strong>{item.action}</strong>
                    <span>{item.result}</span>
                  </div>
                ))}
              </div>
              {completionError && <p className="ivl-save-error">{completionError}</p>}
              {completionError && (
                <button className="ivl-primary-button" disabled={isSavingCompletion} onClick={finishLesson}>
                  {isSavingCompletion ? 'Saving…' : 'Retry saving progress'}
                </button>
              )}
            </div>
          )}

          {phase === 'complete' && (
            <div className="ivl-stage-panel ivl-complete-panel" role="status">
              <CheckCircle2 size={34} aria-hidden="true" />
              <p className="ivl-eyebrow">Lesson complete</p>
              <h3>Lesson Complete</h3>
              <p>{config.completionText}</p>
              <div className="ivl-complete-actions">
                <button className="ivl-secondary-button" onClick={replayLesson}>
                  <RotateCcw size={17} aria-hidden="true" /> Replay lesson
                </button>
                <button className="ivl-primary-button" onClick={onNextLesson}>
                  {nextLabel || t('lesson.next_lesson')} <ChevronRight size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>

      </section>

      <div className="lesson-navigation ivl-navigation">
        <button className="nav-button" disabled={isFirstLesson} onClick={onPrevLesson}>
          <ChevronLeft size={18} /> {t('common.previous')}
        </button>
        {phase === 'complete' && (
          <button className="nav-button next" onClick={onNextLesson}>
            {nextLabel || t('lesson.next_lesson')} <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};
