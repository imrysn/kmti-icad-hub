import { LucideIcon, Maximize, Minimize, Pause, Play, X, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import React,{ useEffect,useRef,useState } from 'react';
import { createPortal } from 'react-dom';
import { api } from '../../services/api';
import { useTranslation } from '../../context/LanguageContext';
import './VideoTutorialViewer.css';
import '../LessonQuestionPanel.css';
import '../InteractiveVideoLesson/InteractiveVideoLesson.css';
import LessonIntroPanel from '../LessonIntroPanel';
import LessonQuestionPanel from '../LessonQuestionPanel';
import type { InteractiveVideoQuestion } from '../InteractiveVideoLesson/types';

// We import the specific image for this tutorial
import icadInterfaceImg from '../../assets/3D_INTERACTIVE/icad_interface.jpg';
import { KaraokeLessonText } from '../KaraokeLessonText';

export type TutorialOverlayType =
  | 'highlight'
  | 'callout'
  | 'dimensionAnnotation'
  | 'quiz'
  | 'recap';

export interface NormalizedPoint {
  x: number;
  y: number;
}

export interface NormalizedRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TutorialOverlay {
  id: string;
  type: TutorialOverlayType;
  startTime: number;
  endTime: number;
  target?: NormalizedRect;
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  labelOffset?: { x: number, y: number };
  animation?: 'none' | 'pulse' | 'flash';
  line?: {
    start: NormalizedPoint;
    end: NormalizedPoint;
  };
  dimensionType?: 'horizontal' | 'vertical';
  quizData?: {
    question: string;
    options: { text: string; isCorrect: boolean; feedback: string }[];
  };
  recapData?: {
    title: string;
    items: string[];
  };
}

export interface TutorialStep { quizData?: { question: string; options: { text: string; isCorrect: boolean; feedback: string }[]; }; recapData?: { title: string; items: string[]; }; 
  id: string | number;
  title: string;
  text: string;
  customText?: string;
  customTitle?: string;
  zoom: string;
  origin: string;
  spotlight: {
    top: string;
    left: string;
    width: string;
    height: string;
    opacity: number;
  };
  subtitlePos: React.CSSProperties;
  wordSpotlights?: {
    words: string[];
    spotlight: {
      top: string;
      left: string;
      width: string;
      height: string;
      opacity: number;
    };
  }[];
  videoSrc?: string;
  videoStart?: number;
  videoEnd?: number;
  overlays?: TutorialOverlay[];
}

export interface IntroPanelData {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  startLabel?: string;
}

interface VideoTutorialViewerProps {
  steps: TutorialStep[];
  introPanel?: IntroPanelData;
  lessonType?: 'step-by-step' | 'video-tutorial';
}

const VideoTutorialViewer: React.FC<VideoTutorialViewerProps> = ({ steps, introPanel, lessonType }) => {
  const { t } = useTranslation();
  const [hasStarted, setHasStarted] = useState(!introPanel);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [quizChoice, setQuizChoice] = useState('');
  const [quizChecked, setQuizChecked] = useState(false);
  const passedQuizzesRef = useRef(new Set<string>());

  const [videoTime, setVideoTime] = useState(0);
  const [videoRect, setVideoRect] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tutorialVideoRef = useRef<HTMLVideoElement | null>(null);
  const activeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle precise video rendering area for overlays
  useEffect(() => {
    const video = tutorialVideoRef.current;
    if (!video) return;

    const updateRect = () => {
      if (!video.videoWidth || !video.clientWidth) return;
      
      const vRatio = video.videoWidth / video.videoHeight;
      const cRatio = video.clientWidth / video.clientHeight;
      
      let w, h, x = 0, y = 0;
      
      if (cRatio > vRatio) {
        // Container is wider than video
        h = video.clientHeight;
        w = h * vRatio;
        x = (video.clientWidth - w) / 2;
      } else {
        // Container is taller than video
        w = video.clientWidth;
        h = w / vRatio;
        y = (video.clientHeight - h) / 2;
      }
      setVideoRect({ left: x, top: y, width: w, height: h });
    };

    updateRect();
    
    const observer = new ResizeObserver(() => updateRect());
    observer.observe(video);
    
    // Also update on loadedmetadata when videoWidth becomes available
    video.addEventListener('loadedmetadata', updateRect);
    
    return () => {
      observer.disconnect();
      video.removeEventListener('loadedmetadata', updateRect);
    };
  }, [currentStep, isFullscreen]);

  useEffect(() => {
    const syncFullscreenState = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        setHasStarted(false);
        handleStop();
        setCurrentStep(0);
      }
    };

    document.addEventListener('fullscreenchange', syncFullscreenState);
    return () => document.removeEventListener('fullscreenchange', syncFullscreenState);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    if (tutorialVideoRef.current) {
      tutorialVideoRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMute = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    if (audioRef.current) {
      audioRef.current.muted = newMute;
    }
    if (tutorialVideoRef.current) {
      tutorialVideoRef.current.muted = newMute;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Cleanup on unmount
    return () => {
      if (synthRef.current) synthRef.current.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (activeIntervalRef.current) {
        clearTimeout(activeIntervalRef.current);
        activeIntervalRef.current = null;
      }
    };
  }, []);

  // Sync with global ReadAloudButton
  useEffect(() => {
    const playHandler = () => setIsPlaying(true);
    const stopHandler = () => setIsPlaying(false);

    window.addEventListener('kmti-play-tutorial', playHandler);
    window.addEventListener('kmti-stop-tutorial', stopHandler);

    return () => {
      window.removeEventListener('kmti-play-tutorial', playHandler);
      window.removeEventListener('kmti-stop-tutorial', stopHandler);
    };
  }, []);

  // Broadcast local playback state changes
  useEffect(() => {
    if (isPlaying) {
      window.dispatchEvent(new CustomEvent('kmti-tutorial-playing'));
    } else {
      window.dispatchEvent(new CustomEvent('kmti-tutorial-stopped'));
    }
    return () => {
      window.dispatchEvent(new CustomEvent('kmti-tutorial-stopped'));
    };
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      speakCurrentStep();
    } else {
      if (synthRef.current) synthRef.current.cancel();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (activeIntervalRef.current) {
        clearTimeout(activeIntervalRef.current);
        activeIntervalRef.current = null;
      }
    }
  }, [currentStep, isPlaying]);

  useEffect(() => {
    if (tutorialVideoRef.current) {
      if (isPlaying && !isPaused) {
        tutorialVideoRef.current.play().catch(err => console.log("Video play failed:", err));
      } else {
        tutorialVideoRef.current.pause();
      }
    }
  }, [isPlaying, isPaused]);

  useEffect(() => {
    if (tutorialVideoRef.current && currentData) {
      const video = tutorialVideoRef.current;
      const start = currentData.videoStart || 0;
      // Seek to step's videoStart if out of range, then play
      if (video.currentTime < start || video.currentTime > (currentData.videoEnd || 9999)) {
        video.currentTime = start;
      }
      if (isPlaying && !isPaused) {
        video.play().catch(err => console.log("Video resume on step change failed:", err));
      }
    }
  }, [currentStep]);

  // Keyboard navigation (only active when fullscreen or maybe always if focused, but let's just keep it)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayback();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsFullscreen(false);
        if (document.fullscreenElement) {
          void document.exitFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, isPlaying, isFullscreen]);

  const speakCurrentStep = () => {
    if (activeIntervalRef.current) {
      clearInterval(activeIntervalRef.current);
      activeIntervalRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setCurrentCharIndex(0);
    setIsPaused(false);


    const text = steps[currentStep].text;

    const sanitizeSpeech = (t: string) => t.replace(/i\s*CAD/ig, 'eye cad');
    const spokenText = sanitizeSpeech(text);

    const savedVoice = localStorage.getItem('tts_voice_uri') || 'openai://nova';
    const isBackendVoice = savedVoice.startsWith('kokoro://') || savedVoice.startsWith('openai://');
    const savedRate = parseFloat(localStorage.getItem('tts_rate') || '0.8');

    if (isBackendVoice) {
      const apiBase = api.defaults.baseURL || '';

      const textUrl = `${apiBase}/api/v1/tts/synthesize?text=${encodeURIComponent(spokenText)}&voice=${encodeURIComponent(savedVoice)}&speed=${savedRate}`;

      const textAudio = new Audio(textUrl);
      textAudio.muted = isMuted;
      audioRef.current = textAudio;

      const words = text.split(/\s+/).filter(w => w.length > 0);
      const estimatedDuration = (text.length * 60) / savedRate;

      let wordIdx = 0;
      let searchFrom = 0;

      textAudio.onplaying = () => {
        if (activeIntervalRef.current) clearTimeout(activeIntervalRef.current);

        setCurrentCharIndex(searchFrom);
        const durationSec = (textAudio.duration && !isNaN(textAudio.duration) && isFinite(textAudio.duration))
          ? textAudio.duration
          : (estimatedDuration / 1000);
        const totalMs = durationSec * 1000;
        const msPerChar = totalMs / (text.length || 1);

        const highlightNextWord = () => {
          if (!isPlaying) return;
          if (wordIdx < words.length) {
            const currentWord = words[wordIdx];
            const wordStart = text.indexOf(currentWord, searchFrom);
            if (wordStart !== -1) {
              setCurrentCharIndex(wordStart);
              searchFrom = wordStart + currentWord.length;
            }
            const delay = (currentWord.length + 1) * msPerChar;
            wordIdx++;
            activeIntervalRef.current = setTimeout(highlightNextWord, delay);
          }
        };
        highlightNextWord();
      };

      textAudio.onpause = () => {
        if (activeIntervalRef.current) {
          clearTimeout(activeIntervalRef.current);
          activeIntervalRef.current = null;
        }
      };

      textAudio.onwaiting = () => {
        if (activeIntervalRef.current) {
          clearTimeout(activeIntervalRef.current);
          activeIntervalRef.current = null;
        }
      };

      textAudio.onended = () => {
        if (activeIntervalRef.current) {
          clearTimeout(activeIntervalRef.current);
          activeIntervalRef.current = null;
        }
        setCurrentCharIndex(0);
        if (currentStep < steps.length - 1) {
          // Advance to next step; video resumes from its videoStart via the step-change useEffect
          setTimeout(() => {
            setCurrentStep(prev => prev + 1);
          }, 400);
        } else {
          // Last step: if there is no video, stop playback automatically
          if (!steps[currentStep].videoSrc) {
            handleStop();
          }
        }
      };

      textAudio.onerror = (err) => {
        console.error('Kokoro Text Audio Error:', err);
        if (activeIntervalRef.current) {
          clearTimeout(activeIntervalRef.current);
          activeIntervalRef.current = null;
        }
        setIsPlaying(false);
      };

      textAudio.play().catch(err => {
        console.error("Text audio play failed:", err);
        textAudio.onended?.(null as any);
      });
    } else {
      // Fallback: Browser Web Speech synthesis
      if (!synthRef.current) return;

      const textUtterance = new SpeechSynthesisUtterance(spokenText);
      textUtterance.rate = savedRate * 0.9;

      const words = text.split(/\s+/).filter(w => w.length > 0);
      const estimatedDuration = (text.length * 60) / textUtterance.rate;
      let boundaryFired = false;

      const getOriginalIndex = (spokenIdx: number) => {
        if (text.length === spokenText.length) return spokenIdx;
        const regex = /i\s*cad/ig;
        let match;
        let shift = 0;
        regex.lastIndex = 0;
        while ((match = regex.exec(text)) !== null) {
          const matchIdx = match.index;
          const matchText = match[0];
          const diff = 7 - matchText.length;
          if (matchIdx + shift < spokenIdx) {
            shift += diff;
          } else {
            break;
          }
        }
        return Math.max(0, spokenIdx - shift);
      };

      textUtterance.onstart = () => {
        setTimeout(() => {
          if (!boundaryFired && synthRef.current) {
            let wordIdx = 0;
            let searchFrom = 0;
            const msPerChar = estimatedDuration / (text.length || 1);

            const highlightNextWord = () => {
              if (wordIdx < words.length) {
                const currentWord = words[wordIdx];
                const wordStart = text.indexOf(currentWord, searchFrom);
                if (wordStart !== -1) {
                  setCurrentCharIndex(wordStart);
                  searchFrom = wordStart + currentWord.length;
                }
                const delay = (currentWord.length + 1) * msPerChar;
                wordIdx++;
                activeIntervalRef.current = setTimeout(highlightNextWord, delay);
              }
            };
            highlightNextWord();
          }
        }, 300);
      };

      textUtterance.onboundary = (e) => {
        if (e.name === 'word') {
          boundaryFired = true;
          if (activeIntervalRef.current) {
            clearTimeout(activeIntervalRef.current);
            activeIntervalRef.current = null;
          }
          setCurrentCharIndex(getOriginalIndex(e.charIndex));
        }
      };

      textUtterance.onend = () => {
        if (activeIntervalRef.current) clearTimeout(activeIntervalRef.current);
        setCurrentCharIndex(0);
        
        // Don't auto-advance if the step has a static quiz or recap that needs user interaction
        if (!steps[currentStep].videoSrc && (steps[currentStep].quizData || steps[currentStep].recapData)) {
          setIsPlaying(false);
          setIsPaused(true);
          return;
        }

        if (currentStep < steps.length - 1) {
          // Advance to next step; video resumes from its videoStart via the step-change useEffect
          setTimeout(() => {
            setCurrentStep(prev => prev + 1);
          }, 400);
        } else {
          // Last step: if there is no video, stop playback automatically
          if (!steps[currentStep].videoSrc) {
            handleStop();
          }
        }
      };

      if (window.speechSynthesis) {
        window.speechSynthesis.resume();
      }
      synthRef.current.speak(textUtterance);
    }
  };



  const getSubHighlightIndices = () => {
    if (!currentData || !currentData.wordSpotlights) return [];
    const text = currentData.text.toLowerCase();
    return currentData.wordSpotlights
      .map(ws => {
        for (const w of ws.words) {
          const idx = text.indexOf(w.toLowerCase());
          if (idx !== -1) return idx;
        }
        return -1;
      })
      .filter(idx => idx !== -1)
      .sort((a, b) => a - b);
  };

  const handleNext = () => {
    const subIndices = getSubHighlightIndices();
    if (subIndices.length > 0) {
      const nextIdx = subIndices.find(idx => idx > currentCharIndex);
      if (nextIdx !== undefined) {
        setCurrentCharIndex(nextIdx);
        if (isPlaying && !isPaused) {
          togglePlayback();
        }
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setCurrentCharIndex(0);
    }
  };

  const handlePrev = () => {
    const subIndices = getSubHighlightIndices();
    if (subIndices.length > 0 && currentCharIndex > 0) {
      const prevIndices = subIndices.filter(idx => idx < currentCharIndex);
      if (prevIndices.length > 0) {
        const prevIdx = prevIndices[prevIndices.length - 1];
        setCurrentCharIndex(prevIdx);
        if (isPlaying && !isPaused) {
          togglePlayback();
        }
        return;
      } else {
        setCurrentCharIndex(0);
        if (isPlaying && !isPaused) {
          togglePlayback();
        }
        return;
      }
    }

    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setCurrentCharIndex(0);
    }
  };

  const togglePlayback = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsPaused(false);
    } else {
      if (isPaused) {
        setIsPaused(false);
        if (audioRef.current) {
          audioRef.current.play().catch(err => console.error("Audio resume failed:", err));
        } else if (synthRef.current) {
          synthRef.current.resume();
        }
      } else {
        setIsPaused(true);
        if (audioRef.current) {
          audioRef.current.pause();
        } else if (synthRef.current) {
          synthRef.current.pause();
        }
        if (activeIntervalRef.current) {
          clearTimeout(activeIntervalRef.current);
          activeIntervalRef.current = null;
        }
      }
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentCharIndex(0);
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (activeIntervalRef.current) {
      clearTimeout(activeIntervalRef.current);
      activeIntervalRef.current = null;
    }
    if (tutorialVideoRef.current) {
      tutorialVideoRef.current.pause();
      tutorialVideoRef.current.currentTime = 0;
    }
  };

  const toggleFullscreen = async () => {
    const shouldOpen = !isFullscreen;
    setIsFullscreen(shouldOpen);

    try {
      if (shouldOpen) {
        await document.documentElement.requestFullscreen();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      // The overlay remains available when the browser blocks native fullscreen.
    }
  };

  const handleClose = () => {
    handleStop();
    setCurrentStep(0);
  };

  if (!steps || steps.length === 0) return null;

  const currentData = steps[currentStep];

  const getActiveSpotlight = () => {
    if (currentCharIndex === 0 || !currentData.wordSpotlights) {
      return currentData.spotlight;
    }

    const text = currentData.text;
    let startIdx = currentCharIndex;
    while (startIdx < text.length && text[startIdx] === ' ') {
      startIdx++;
    }

    let nextSpace = text.indexOf(' ', startIdx);
    if (nextSpace === -1) nextSpace = text.length;

    const currentWord = text.substring(startIdx, nextSpace);
    const cleanWord = currentWord.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();

    const matched = currentData.wordSpotlights.find(ws =>
      ws.words.some(w => w.toLowerCase() === cleanWord)
    );

    return matched ? matched.spotlight : currentData.spotlight;
  };

  const containerClass = isFullscreen ? 'tutorial-viewer-container fullscreen' : 'tutorial-viewer-container inline';

  const viewerJSX = (
    <div className={containerClass}>
      <div className="tutorial-viewport">
        <div
          className="tutorial-image-container"
          style={{
            transform: currentData.zoom,
            transformOrigin: currentData.origin,
            display: 'block',
            width: isFullscreen ? '100vw' : '100%',
            height: isFullscreen ? '100vh' : undefined,
            maxWidth: '100%',
            maxHeight: isFullscreen ? 'none' : 'calc(100vh - 200px)',
            aspectRatio: isFullscreen ? undefined : '16 / 9',
            minWidth: 0,
            minHeight: 0
          }}
        >
          {currentData.videoSrc ? (
            <video
              ref={tutorialVideoRef}
              src={currentData.videoSrc}
              className="tutorial-image"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
              playsInline
              muted={isMuted}
              onTimeUpdate={(e) => {
                const video = e.currentTarget;
                const time = video.currentTime;
                setVideoTime(time);
                
                // Handle quiz pause
                const activeQuiz = currentData.overlays?.find(o => o.type === 'quiz' && time >= o.startTime && time <= o.endTime && !passedQuizzesRef.current.has(o.id));
                if (activeQuiz && activeQuizId !== activeQuiz.id) {
                  setActiveQuizId(activeQuiz.id);
                  setQuizChoice('');
                  setQuizChecked(false);
                  video.pause();
                  setIsPlaying(false);
                  setIsPaused(true);
                  if (audioRef.current) audioRef.current.pause();
                  if (synthRef.current) synthRef.current.pause();
                  return;
                }

                const end = currentData.videoEnd || 9999;
                const isLastStep = currentStep === steps.length - 1;
                if (time >= end && !video.paused) {
                  if (isLastStep) {
                    // Last step: stop the tutorial when video reaches videoEnd
                    video.pause();
                    video.currentTime = 0;
                    setIsPlaying(false);
                    setCurrentStep(0);
                    setCurrentCharIndex(0);
                  } else {
                    // Mid step: pause video, let TTS finish, then TTS onended advances the step
                    video.pause();
                  }
                }
              }}
              onEnded={(e) => {
                setIsPlaying(false);
                setCurrentStep(0);
                setCurrentCharIndex(0);
                const video = e.currentTarget;
                video.currentTime = 0;
                video.pause();
              }}
            />
          ) : (
            <img
              src={icadInterfaceImg}
              alt={t('common.icad_interface')}
              className="tutorial-image"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          )}
          
          <div className="tutorial-spotlight-overlay">
            <div
              className="tutorial-spotlight-cutout"
              style={getActiveSpotlight()}
            />
          </div>

          {/* New Optional Overlays */}
          {currentData.overlays && videoRect.width > 0 && (
            <div className="tutorial-interactive-overlays" style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              pointerEvents: 'none',
              overflow: 'hidden'
            }}>
              {currentData.overlays.map(overlay => {
                if (videoTime < overlay.startTime || videoTime > overlay.endTime) return null;
                
                if (overlay.type === 'highlight' && overlay.target) {
                  const left = videoRect.left + overlay.target.x * videoRect.width;
                  const top = videoRect.top + overlay.target.y * videoRect.height;
                  const width = overlay.target.width * videoRect.width;
                  const height = overlay.target.height * videoRect.height;
                  
                  return (
                    <div key={overlay.id} className={`overlay-highlight ${overlay.animation || 'none'}`} style={{
                      position: 'absolute',
                      left: `${left}px`,
                      top: `${top}px`,
                      width: `${width}px`,
                      height: `${height}px`,
                      border: '2px solid rgba(255, 0, 0, 0.8)',
                      borderRadius: '4px',
                      boxShadow: '0 0 8px rgba(255, 0, 0, 0.5)',
                      pointerEvents: 'none',
                      zIndex: 10
                    }}>
                      {overlay.label && (() => {
                        const labelPos = overlay.labelPosition || 'top';
                        let labelStyle: React.CSSProperties = {
                          position: 'absolute',
                          background: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          whiteSpace: 'nowrap'
                        };
                        
                        if (labelPos === 'top') {
                          labelStyle.bottom = '100%';
                          labelStyle.left = '50%';
                          labelStyle.transform = 'translateX(-50%)';
                          labelStyle.marginBottom = '4px';
                        } else if (labelPos === 'bottom') {
                          labelStyle.top = '100%';
                          labelStyle.left = '50%';
                          labelStyle.transform = 'translateX(-50%)';
                          labelStyle.marginTop = '4px';
                        } else if (labelPos === 'left') {
                          labelStyle.right = '100%';
                          labelStyle.top = '50%';
                          labelStyle.transform = 'translateY(-50%)';
                          labelStyle.marginRight = '4px';
                        } else if (labelPos === 'right') {
                          labelStyle.left = '100%';
                          labelStyle.top = '50%';
                          labelStyle.transform = 'translateY(-50%)';
                          labelStyle.marginLeft = '4px';
                        }
                        
                        return (
                          <div style={labelStyle}>
                            {overlay.label}
                          </div>
                        );
                      })()}
                    </div>
                  );
                }
                
                if (overlay.type === 'dimensionAnnotation' && overlay.line) {
                  const x1 = videoRect.left + overlay.line.start.x * videoRect.width;
                  const y1 = videoRect.top + overlay.line.start.y * videoRect.height;
                  const x2 = videoRect.left + overlay.line.end.x * videoRect.width;
                  const y2 = videoRect.top + overlay.line.end.y * videoRect.height;
                  
                  return (
                    <svg key={overlay.id} style={{
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10
                    }}>
                      <defs>
                        <marker id={`arrow-${overlay.id}-start`} markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto-start-reverse">
                          <path d="M0,0 L0,6 L9,3 z" fill="rgba(255,0,0,0.9)" />
                        </marker>
                        <marker id={`arrow-${overlay.id}-end`} markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L9,3 z" fill="rgba(255,0,0,0.9)" />
                        </marker>
                      </defs>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,0,0,0.9)" strokeWidth="2" markerStart={`url(#arrow-${overlay.id}-start)`} markerEnd={`url(#arrow-${overlay.id}-end)`} />
                      {overlay.label && (() => {
                        const defaultX = (x1 + x2) / 2;
                        const defaultY = (y1 + y2) / 2 - (overlay.dimensionType === 'horizontal' ? 8 : 0);
                        const offsetX = overlay.labelOffset?.x || 0;
                        const offsetY = overlay.labelOffset?.y || 0;
                        const finalX = defaultX + offsetX;
                        const finalY = defaultY + offsetY;

                        return (
                          <text x={finalX} y={finalY} 
                                fill="white" fontSize="14" fontWeight="bold" 
                                textAnchor="middle" alignmentBaseline={overlay.dimensionType === 'vertical' ? 'middle' : 'auto'}
                                transform={overlay.dimensionType === 'vertical' && !overlay.labelOffset ? `translate(20, 0)` : ''}
                                style={{ textShadow: '1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black' }}>
                            {overlay.label}
                          </text>
                        );
                      })()}
                    </svg>
                  );
                }

                if (overlay.type === 'quiz' && activeQuizId === overlay.id && overlay.quizData) {
                  const question: InteractiveVideoQuestion = {
                    id: overlay.id,
                    prompt: overlay.quizData.question,
                    choices: overlay.quizData.options.map((opt, i) => ({
                      id: String(i),
                      label: opt.text,
                      isCorrect: opt.isCorrect,
                      feedback: opt.feedback
                    }))
                  };

                  return (
                    <div key={overlay.id} style={{ pointerEvents: 'auto' }}>
                      <LessonQuestionPanel
                        question={question}
                        selectedChoice={quizChoice}
                        answerChecked={quizChecked}
                        onSelectChoice={setQuizChoice}
                        onCheckAnswer={() => setQuizChecked(true)}
                        onRetry={() => { setQuizChoice(''); setQuizChecked(false); }}
                        onContinue={() => {
                          passedQuizzesRef.current.add(overlay.id);
                          setActiveQuizId(null);
                          togglePlayback();
                        }}
                      />
                    </div>
                  );
                }

                if (overlay.type === 'recap' && overlay.recapData) {
                  return (
                    <div key={overlay.id} className="ivl-stage-panel ivl-recap-panel" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 50, pointerEvents: 'auto' }}>
                      <p className="ivl-eyebrow">Lesson recap</p>
                      <h3>{overlay.recapData.title}</h3>
                      <div className="ivl-recap-items">
                        {overlay.recapData.items.map((item, i) => (
                          <div key={i} className="ivl-recap-item">
                            <strong>{item}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                return null;
              })}
            </div>
          )}
        </div>
      </div>

      {currentData.quizData && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100 }}>
          <div style={{ pointerEvents: 'auto', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <LessonQuestionPanel
              question={{
                id: String(currentData.id),
                prompt: currentData.quizData.question,
                choices: currentData.quizData.options.map((opt, i) => ({
                  id: String(i),
                  label: opt.text,
                  isCorrect: opt.isCorrect,
                  feedback: opt.feedback
                }))
              }}
              selectedChoice={quizChoice}
              answerChecked={quizChecked}
              onSelectChoice={setQuizChoice}
              onCheckAnswer={() => setQuizChecked(true)}
              onRetry={() => { setQuizChoice(''); setQuizChecked(false); }}
              onContinue={() => {
                setQuizChoice('');
                setQuizChecked(false);
                handleNext();
              }}
            />
          </div>
        </div>
      )}

      {currentData.recapData && (
        <div className="ivl-stage-panel ivl-recap-panel" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 50, pointerEvents: 'auto' }}>
          <p className="ivl-eyebrow">Lesson recap</p>
          <h3>{currentData.recapData.title}</h3>
          <div className="ivl-recap-items">
            {currentData.recapData.items.map((item, i) => (
              <div key={i} className="ivl-recap-item">
                <strong>{item}</strong>
              </div>
            ))}
          </div>
          <button className="start-tutorial-btn" onClick={handleNext} style={{ marginTop: '20px' }}>
            Continue
          </button>
        </div>
      )}

      {/* Floating Subtitle Box or Flat bottom subtitle */}
      {currentData.spotlight.opacity === 0 ? (
        isPlaying && (
          <div className="tutorial-subtitle-flat">
            <h2 className="tutorial-title">{currentData.title}</h2>
            <KaraokeLessonText text={currentData.text} isActive={isPlaying} currentCharIndex={currentCharIndex} className="tutorial-description" />
          </div>
        )
      ) : (
        <div
          className="tutorial-subtitle-box"
          style={{
            top: 'auto',
            bottom: 'auto',
            left: 'auto',
            right: 'auto',
            transform: 'none',
            ...currentData.subtitlePos
          }}
        >
          {currentStep > 0 && (
            <button
              className="tutorial-subtitle-close"
              onClick={handleClose}
              title="Close Step (Back to Intro)"
            >
              <X size={18} />
            </button>
          )}
          <h2 className="tutorial-title">{currentData.title}</h2>
          <KaraokeLessonText text={currentData.text} isActive={isPlaying} currentCharIndex={currentCharIndex} className="tutorial-description" />
        </div>
      )}

      {/* Native-Style Bottom Control Bar */}
      <div className={`kmti-native-video-controls ${lessonType || 'video-tutorial'}`}>
        <button onClick={togglePlayback} title={isPlaying && !isPaused ? "Pause" : "Play"}>
          {isPlaying && !isPaused ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
        </button>
        <button onClick={handlePrev} disabled={currentStep === 0} title="Previous Step">
          <SkipBack size={18} fill="currentColor" />
        </button>
        <button onClick={currentStep === steps.length - 1 ? handleClose : handleNext} title={currentStep === steps.length - 1 ? "Finish Tutorial" : "Next Step"}>
          <SkipForward size={18} fill="currentColor" />
        </button>

        <div className="kmti-progress-container">
          <div 
            className="kmti-progress-filled" 
            style={{ 
              width: currentData.videoSrc 
                ? `${(videoTime / (currentData.videoEnd || Math.max(videoTime, 1))) * 100}%`
                : `${((currentStep + 1) / steps.length) * 100}%`
            }} 
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
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                if (val > 0 && isMuted) setIsMuted(false);
                if (val === 0 && !isMuted) setIsMuted(true);
              }}
              title="Volume"
            />
          </div>
        
        <div className="kmti-time-indicator" style={{ fontSize: '13px', whiteSpace: 'nowrap', opacity: 0.8 }}>
          {currentData.videoSrc ? (
            `${formatTime(videoTime)} / ${formatTime(currentData.videoEnd || videoTime)}`
          ) : (
            `Step ${currentStep + 1} / ${steps.length}`
          )}
        </div>

        <button onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
        {currentStep > 0 && (
          <button onClick={handleClose} title="Close Tutorial">
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );

  if (!hasStarted && introPanel) {
    return (
      <div className="lesson-intro-shell" style={{ padding: '2rem' }}>
        <LessonIntroPanel
          icon={introPanel.icon}
          eyebrow={introPanel.eyebrow}
          title={introPanel.title}
          description={introPanel.description}
          startLabel={introPanel.startLabel}
          onStart={() => {
            void toggleFullscreen();
            setHasStarted(true);
            setTimeout(() => {
              setIsPlaying(true);
              setIsPaused(false);
            }, 100);
          }}
        />
      </div>
    );
  }

  if (isFullscreen) {
    return createPortal(viewerJSX, document.body);
  }

  return viewerJSX;
};

export default VideoTutorialViewer;
