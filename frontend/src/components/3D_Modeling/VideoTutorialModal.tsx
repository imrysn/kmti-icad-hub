import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, Play, Pause, Square, GripHorizontal } from 'lucide-react';
import './VideoTutorialModal.css';
import { api } from '../../services/api';

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

const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({ isOpen, onClose, steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [navPos, setNavPos] = useState({ x: 0, y: 0 });
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tutorialVideoRef = useRef<HTMLVideoElement | null>(null);
  const activeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const dragRef = useRef<{ startX: number, startY: number, startNavX: number, startNavY: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startNavX: navPos.x,
      startNavY: navPos.y
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setNavPos({
      x: dragRef.current.startNavX + dx,
      y: dragRef.current.startNavY + dy
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragRef.current) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      dragRef.current = null;
    }
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


    const title = steps[currentStep].title;
    const text = steps[currentStep].text;

    const sanitizeSpeech = (t: string) => t.replace(/i\s*CAD/ig, 'eye cad');
    const spokenText = sanitizeSpeech(text);
    const spokenTitle = sanitizeSpeech(title);

    const savedVoice = localStorage.getItem('tts_voice_uri') || 'kokoro://af_sarah';
    const isKokoro = savedVoice.startsWith('kokoro://');
    const savedRate = parseFloat(localStorage.getItem('tts_rate') || '1.0');

    if (isKokoro) {
      const voiceName = savedVoice.replace('kokoro://', '');
      const apiBase = api.defaults.baseURL || '';
      
      const textUrl = `${apiBase}/api/v1/tts/synthesize?text=${encodeURIComponent(spokenText)}&voice=${voiceName}&speed=${savedRate}`;
      
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

  const renderKaraokeText = () => {
    const text = steps[currentStep].text;
    if (!isPlaying || currentCharIndex === 0) {
      return <p className="tutorial-description">{text}</p>;
    }

    let startIdx = currentCharIndex;
    // Skip spaces
    while (startIdx < text.length && text[startIdx] === ' ') {
      startIdx++;
    }

    let nextSpace = text.indexOf(' ', startIdx);
    if (nextSpace === -1) nextSpace = text.length;

    const pre = text.substring(0, startIdx);
    const current = text.substring(startIdx, nextSpace);
    const post = text.substring(nextSpace);

    return (
      <p className="tutorial-description" style={{ lineHeight: '1.5' }}>
        <span style={{ color: '#fff' }}>{pre}</span>
        <span style={{ color: '#dd4dfa', textShadow: '0 0 8px rgba(221,77,250,0.6)', fontWeight: 'bold' }}>{current}</span>
        <span style={{ color: '#888' }}>{post}</span>
      </p>
    );
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
              alt="iCAD Interface"
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
            {renderKaraokeText()}
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
          {renderKaraokeText()}
        </div>
      )}

      {/* Persistent Floating Control Panel */}
      <div
        className="tutorial-control-card"
        style={{ transform: `translate(${navPos.x}px, ${navPos.y}px)` }}
      >
        <div
          className="drag-handle"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          title="Drag to move panel"
          style={{ cursor: 'grab', padding: '8px', marginRight: '4px', borderRadius: '4px', display: 'flex' }}
        >
          <GripHorizontal size={20} color="#888" />
        </div>

        <div className="tutorial-controls">
          {!isPlaying ? (
            <button
              className="tutorial-btn"
              onClick={togglePlayback}
              title="Play Narration"
            >
              <Play size={16} /> Play
            </button>
          ) : (
            <>
              <button
                className="tutorial-btn"
                onClick={togglePlayback}
                title={isPaused ? "Resume Narration" : "Pause Narration"}
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button
                className="tutorial-btn"
                onClick={handleStop}
                title="Stop Narration"
              >
                <Square size={16} /> Stop
              </button>
            </>
          )}

          <button
            className="tutorial-btn"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            className="tutorial-btn primary"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
          >
            <ChevronRight size={18} />
          </button>

          <button className="tutorial-btn exit" onClick={handleClose}>
            Exit Tutorial <X size={18} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VideoTutorialModal;
// Trigger recompile
