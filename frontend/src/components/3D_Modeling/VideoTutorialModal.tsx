import { Pause, Play, X, SkipBack, SkipForward } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import React,{ useEffect,useRef,useState } from 'react';
import { createPortal } from 'react-dom';
import { api } from '../../services/api';
import { KaraokeLessonText } from '../KaraokeLessonText';
import './VideoTutorialModal.css';

// We import the specific image for this tutorial
import icadInterfaceImg from '../../assets/3D_INTERACTIVE/icad_interface.jpg';

export interface TutorialStep {
  id: string | number;
  title: string;
  text: string;
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
}

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: TutorialStep[];
}

const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({
  isOpen, onClose, steps
}) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tutorialVideoRef = useRef<HTMLVideoElement | null>(null);
  const activeIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    if (!isOpen) {
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
      setIsPlaying(false);
      setCurrentStep(0);
      setCurrentCharIndex(0);
      return;
    }

    if (isPlaying) {
      speakCurrentStep();
    } else {
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
    }
  }, [isOpen, currentStep, isPlaying]);

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
      const end = currentData.videoEnd || 9999;
      // If current video time is outside step range, seek to start
      if (video.currentTime < start || video.currentTime >= end) {
        video.currentTime = start;
      }
    }
  }, [currentStep]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
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
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep, isPlaying]);

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

  const handleClose = () => {
    handleStop();
    onClose();
  };

  if (!isOpen || !steps || steps.length === 0) return null;

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

  return createPortal(
    <div className="tutorial-overlay">
      <div className="tutorial-viewport">
        <div
          className="tutorial-image-container"
          style={{
            transform: currentData.zoom,
            transformOrigin: currentData.origin,
            display: 'block',
            width: '100%',
            maxWidth: '100%',
            maxHeight: '100vh',
            aspectRatio: '16 / 9',
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
              muted
              onTimeUpdate={(e) => {
                const video = e.currentTarget;
                const time = video.currentTime;
                const matchedStepIndex = steps.findIndex(step => {
                  const start = step.videoStart || 0;
                  const end = step.videoEnd || 9999;
                  return time >= start && time < end;
                });
                if (matchedStepIndex !== -1 && matchedStepIndex !== currentStep) {
                  setCurrentStep(matchedStepIndex);
                  setCurrentCharIndex(0);
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
        </div>
      </div>

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
          <h2 className="tutorial-title">{currentData.title}</h2>
          <KaraokeLessonText text={currentData.text} isActive={isPlaying} currentCharIndex={currentCharIndex} className="tutorial-description" />
        </div>
      )}

      {/* Native-Style Bottom Control Bar */}
      <div className="kmti-native-video-controls">
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
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} 
          />
        </div>

        <div className="kmti-time-indicator" style={{ fontSize: '13px', whiteSpace: 'nowrap', opacity: 0.8 }}>
          Step {currentStep + 1} / {steps.length}
        </div>

        <button onClick={handleClose} title="Close Tutorial">
          <X size={20} />
        </button>
      </div>
    </div>,
    document.body
  );
};

export default VideoTutorialModal;
// Trigger recompile
