import { ChevronLeft, ChevronRight, Mouse, Pause, Play, RotateCcw, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import LessonIntroPanel from '../LessonIntroPanel';
import LessonQuestionPanel from '../LessonQuestionPanel';
import LessonVideoSubtitle from '../LessonVideoSubtitle';
import LessonRecapPanel from '../LessonRecapPanel';
import FoundationsVideoReadingLayout from '../FoundationsVideoReadingLayout';
import { useTranslation } from '../../context/LanguageContext';
import { useLessonCore } from '../../hooks/useLessonCore';
import type { InteractiveVideoLessonConfig, InteractiveVideoQuestion } from './types';
import '../LessonIntroPanel.css';
import './InteractiveVideoLesson.css';
import { buildAnswerFeedbackNarration, buildKnowledgeCheckNarration } from '../../utils/quizNarration';

interface InteractiveVideoLessonProps {
  config: InteractiveVideoLessonConfig;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
  onComplete?: () => Promise<void> | void;
  nextLabel?: string;
  isFirstLesson?: boolean;
}

type LessonPhase = 'intro' | 'video' | 'question' | 'recap';

export const InteractiveVideoLesson: React.FC<InteractiveVideoLessonProps> = ({
  config,
  onPrevLesson,
  onNextLesson,
  onComplete,
  nextLabel,
}) => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerCardRef = useRef<HTMLElement>(null);
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
  const [showNarrationSubtitle, setShowNarrationSubtitle] = useState(true);
  const [completionError, setCompletionError] = useState('');
  const [isSavingCompletion, setIsSavingCompletion] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(true);
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const {
    scrollProgress,
    containerRef,
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    currentIndex,
    currentCharIndex,
    registerText,
  } = useLessonCore(`interactive-video-${config.id}`);

  const segmentByQuestionId = useMemo(
    () => new Map(config.segments.map((segment) => [segment.checkpoint.id, segment])),
    [config.segments],
  );

  const selectedAnswer = activeQuestion?.choices.find((choice) => choice.id === selectedChoice);
  const isAnswerCorrect = Boolean(selectedAnswer?.isCorrect);
  const writtenSteps = useMemo(() => [
    ...(config.writtenTutorialSteps ?? config.segments.map(segment => ({
      id: segment.id,
      title: segment.label,
      text: segment.narration.join(' '),
    }))),
  ], [config]);

  const beginNarration = useCallback((text: string | string[], after?: () => void, showSubtitle = true) => {
    const narration = Array.isArray(text) ? text : [text];
    stop();
    setShowNarrationSubtitle(showSubtitle);
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
    setPhase('question');
    setActiveQuestion(question);
    setSelectedChoice('');
    setAnswerChecked(false);
    beginNarration(buildKnowledgeCheckNarration(
      question.prompt,
      question.choices.map(choice => choice.label),
    ), undefined, false);
  }, [beginNarration]);

  const handleQuestionCheck = useCallback(() => {
    if (!selectedAnswer) return;
    setAnswerChecked(true);
    if (selectedAnswer.isCorrect) {
      confetti({ particleCount: 120, spread: 75, origin: { y: 0.62 } });
      beginNarration(buildAnswerFeedbackNarration(true, selectedAnswer.feedback), undefined, false);
    } else {
      beginNarration(buildAnswerFeedbackNarration(false, selectedAnswer.feedback), undefined, false);
    }
  }, [beginNarration, selectedAnswer]);

  const processTimeline = useCallback(() => {
    const video = videoRef.current;
    if (!video || phase !== 'video') return;
    const time = video.currentTime;

    const introNarrationEventId = 'video-intro-narration';
    if (time >= 0.01 && !firedEventsRef.current.has(introNarrationEventId)) {
      firedEventsRef.current.add(introNarrationEventId);
      keepNarrationPlayingOnPauseRef.current = true;
      video.pause();
      beginNarration(config.introNarration, playVideo);
      return;
    }

    for (const segment of config.segments) {
      const dueCue = segment.narrationCues?.find((cue) => {
        const cueEventId = `${segment.id}-cue-${cue.at}`;
        return time >= cue.at && !firedEventsRef.current.has(cueEventId);
      });

      if (dueCue) {
        firedEventsRef.current.add(`${segment.id}-cue-${dueCue.at}`);
        if (dueCue.overlayText) showOverlay(dueCue.overlayText);
        if (dueCue.pauseVideo === false) {
          beginNarration(dueCue.narration, undefined, dueCue.showSubtitle !== false);
        } else {
          keepNarrationPlayingOnPauseRef.current = true;
          video.pause();
          beginNarration(dueCue.narration, playVideo, dueCue.showSubtitle !== false);
        }
        return;
      }

      const narrationEventId = `${segment.id}-narration`;
      if (!segment.narrationCues?.length && time >= segment.startAt && !firedEventsRef.current.has(narrationEventId)) {
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

  useEffect(() => {
    if (phase !== 'video') return undefined;

    let animationFrameId = 0;
    const checkMediaClock = () => {
      if (videoRef.current && !videoRef.current.paused) {
        processTimeline();
      }
      animationFrameId = window.requestAnimationFrame(checkMediaClock);
    };

    animationFrameId = window.requestAnimationFrame(checkMediaClock);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [phase, processTimeline]);

  const handleTimeUpdate = useCallback(() => {
    setVideoTime(videoRef.current?.currentTime || 0);
  }, []);

  const activeSubtitle = useMemo(() => {
    if (!showNarrationSubtitle || !isSpeaking || currentIndex < 0) return '';
    return narrationParts[currentIndex] || '';
  }, [currentIndex, isSpeaking, narrationParts, showNarrationSubtitle]);

  const handleSeeking = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const nextRequired = config.segments.find(
      (segment) => !passedQuestionsRef.current.has(segment.checkpoint.id),
    );
    if (nextRequired && video.currentTime > nextRequired.endAt) {
      keepNarrationPlayingOnPauseRef.current = true;
      video.pause();
      video.currentTime = Math.max(0, nextRequired.startAt - 0.05);
      playVideo();
    }
  }, [config.segments, playVideo]);

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const syncFullscreenState = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        setPhase('intro');
        setIsVideoPaused(true);
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    };

    document.addEventListener('fullscreenchange', syncFullscreenState);
    return () => document.removeEventListener('fullscreenchange', syncFullscreenState);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) setIsMuted(false);
    if (val === 0 && !isMuted) setIsMuted(true);
  }, [isMuted]);

  const toggleFullscreen = useCallback(async () => {
    const shouldOpen = !isFullscreen;
    setIsFullscreen(shouldOpen);
    
    try {
      if (shouldOpen) {
        if (playerCardRef.current) {
          await playerCardRef.current.requestFullscreen();
        }
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      // Ignored
    }
  }, [isFullscreen]);

  const startIntro = useCallback(() => {
    void toggleFullscreen();
    playVideo();
  }, [playVideo, toggleFullscreen]);

  const beginRecap = useCallback(() => {
    setActiveQuestion(null);
    setPhase('recap');
    beginNarration(config.recapNarration);
  }, [beginNarration, config.recapNarration]);

  const handleRecapAction = useCallback(async () => {
    if (completionStartedRef.current) return;
    completionStartedRef.current = true;
    setIsSavingCompletion(true);
    setCompletionError('');
    stop();
    try {
      await onComplete?.();
      if (document.fullscreenElement) await document.exitFullscreen();
      if (onNextLesson) {
        onNextLesson();
      } else {
        setPhase('intro');
      }
    } catch (error) {
      console.error('Failed to save interactive lesson completion:', error);
      completionStartedRef.current = false;
      setCompletionError('Your answers are complete, but progress could not be saved. Please try again.');
      setPhase('recap');
    } finally {
      setIsSavingCompletion(false);
    }
  }, [onComplete, onNextLesson, stop]);

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
    <div className="course-lesson-container interactive-video-lesson foundations-standard-intro foundations-video-reading-lesson" ref={containerRef}>
      <div className="lesson-progress-container">
        <div className="lesson-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="lesson-grid single-card">
        <div className="lesson-card tab-content fade-in">
          <FoundationsVideoReadingLayout
            title={config.title}
            description={config.introSupportingText}
            steps={writtenSteps}
            writtenTutorialCopy={config.writtenTutorialCopy}
          >
      <section className="ivl-player-card" aria-label={config.videoLabel} ref={playerCardRef}>
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

          {phase === 'video' && activeSubtitle && (
            <LessonVideoSubtitle text={activeSubtitle} currentCharIndex={currentCharIndex} />
          )}

          {phase === 'video' && (
            <div className={`kmti-native-video-controls video-tutorial ${!isVideoPaused ? 'is-playing' : ''}`}>
              <button onClick={toggleVideoPlayback} title={isVideoPaused ? 'Play' : 'Pause'}>
                {isVideoPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
              </button>
              <button onClick={replayLesson} title="Replay">
                <RotateCcw size={18} />
              </button>
              <div className="kmti-progress-container">
                <div 
                  className="kmti-progress-filled" 
                  style={{ width: videoDuration ? `${(videoTime / videoDuration) * 100}%` : '0%' }} 
                />
              </div>
              <div className="kmti-volume-control">
                <button onClick={toggleMute} title={isMuted || volume === 0 ? "Unmute" : "Mute"}>
                  {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input 
                  type="range" 
                  className="kmti-volume-slider" 
                  min="0" max="1" step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  title="Volume"
                />
              </div>
              <div className="kmti-time-indicator" style={{ fontSize: '13px', whiteSpace: 'nowrap', opacity: 0.8 }}>
                {Math.floor(videoTime / 60)}:{String(Math.floor(videoTime % 60)).padStart(2, '0')} / {Math.floor(videoDuration / 60)}:{String(Math.floor(videoDuration % 60)).padStart(2, '0')}
              </div>
              <button onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          )}

          {phase === 'intro' && (
            <LessonIntroPanel
              icon={Mouse}
              eyebrow="Interactive navigation lesson"
              title={config.title}
              description={config.introSupportingText}
              onStart={startIntro}
            />
          )}

          {phase === 'question' && activeQuestion && (
            <LessonQuestionPanel
              question={activeQuestion}
              selectedChoice={selectedChoice}
              answerChecked={answerChecked}
              onSelectChoice={setSelectedChoice}
              onCheckAnswer={handleQuestionCheck}
              onRetry={() => { setSelectedChoice(''); setAnswerChecked(false); }}
              onContinue={handleQuestionContinue}
            />
          )}

          {phase === 'recap' && (
            <LessonRecapPanel
              summary={config.recapNarration}
              items={config.recapItems}
              actionLabel={isSavingCompletion ? 'Saving…' : (onNextLesson ? (nextLabel || t('lesson.next_lesson')) : 'Close')}
              actionType={onNextLesson ? 'next' : 'close'}
              onAction={() => { void handleRecapAction(); }}
              disabled={isSavingCompletion}
              error={completionError}
            />
          )}


        </div>

      </section>
      </FoundationsVideoReadingLayout>

      <div className="lesson-navigation">
        {onPrevLesson && (
          <button className="nav-button" onClick={onPrevLesson} disabled={phase === 'question'}>
            <ChevronLeft size={18} /> {t('common.previous')}
          </button>
        )}
        <button className="nav-button next" onClick={onNextLesson}>
          {nextLabel || t('lesson.next_lesson')} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  </div>
</div>
);
};
