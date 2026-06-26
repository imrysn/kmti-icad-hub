import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, Play, Square, GripHorizontal } from 'lucide-react';
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
}

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: TutorialStep[];
}

const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({ isOpen, onClose, steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [navPos, setNavPos] = useState({ x: 0, y: 0 });
  const synthRef = useRef<SpeechSynthesis | null>(null);
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
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      setIsPlaying(false);
      setCurrentStep(0);
      setCurrentCharIndex(0);
      return;
    }

    if (isPlaying) {
      speakCurrentStep();
    } else {
      setCurrentCharIndex(0);
    }
  }, [isOpen, currentStep, isPlaying]);

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
    if (!synthRef.current) return;

    synthRef.current.cancel();
    setCurrentCharIndex(0);

    const title = steps[currentStep].title;
    const text = steps[currentStep].text;

    // Pronunciation fix: replace "iCAD"/"ICAD" or "i CAD"/"I CAD" with "eyekad" for correct speech synthesis pronunciation
    const sanitizeSpeech = (t: string) => t.replace(/i\s*CAD/ig, 'eyekad');
    const spokenText = sanitizeSpeech(text);

    const titleUtterance = new SpeechSynthesisUtterance(sanitizeSpeech(title));
    titleUtterance.rate = 0.9;

    const textUtterance = new SpeechSynthesisUtterance(spokenText);
    textUtterance.rate = 0.9;

    const words = text.split(/\s+/).filter(w => w.length > 0);
    const estimatedDuration = (text.length * 60) / textUtterance.rate;
    let boundaryFired = false;
    let fallbackInterval: NodeJS.Timeout | null = null;

    const getOriginalIndex = (spokenIdx: number) => {
      if (text.length === spokenText.length) return spokenIdx;
      const regex = /i\s*cad/ig;
      let match;
      let shift = 0;
      regex.lastIndex = 0;
      while ((match = regex.exec(text)) !== null) {
        const matchIdx = match.index;
        const matchText = match[0];
        const diff = 7 - matchText.length; // "eyekad" (7) - matchText.length
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

          fallbackInterval = setInterval(() => {
            if (wordIdx < words.length) {
              const currentWord = words[wordIdx];
              const wordStart = text.indexOf(currentWord, searchFrom);
              if (wordStart !== -1) {
                setCurrentCharIndex(wordStart);
                searchFrom = wordStart + currentWord.length;
              }
              wordIdx++;
            } else {
              if (fallbackInterval) clearInterval(fallbackInterval);
            }
          }, (text.length / (words.length || 1)) * msPerChar);
        }
      }, 300);
    };

    textUtterance.onboundary = (e) => {
      if (e.name === 'word') {
        boundaryFired = true;
        if (fallbackInterval) {
          clearInterval(fallbackInterval);
          fallbackInterval = null;
        }
        setCurrentCharIndex(getOriginalIndex(e.charIndex));
      }
    };

    textUtterance.onend = () => {
      if (fallbackInterval) clearInterval(fallbackInterval);
      setCurrentCharIndex(0);
      // Auto-advance if not on the last step
      if (currentStep < steps.length - 1) {
        // slight pause before next step
        setTimeout(() => {
          if (isOpen && isPlaying) {
            setCurrentStep(prev => prev + 1);
          }
        }, 1000);
      } else {
        // Wait 1.5 seconds after final narration ends, then reset to Overview step
        setTimeout(() => {
          setIsPlaying(false);
          setCurrentStep(0);
        }, 1500);
      }
    };

    titleUtterance.onend = () => {
      if (isOpen && isPlaying && synthRef.current) {
        synthRef.current.speak(textUtterance);
      }
    };

    if (window.speechSynthesis) {
      window.speechSynthesis.resume();
    }
    synthRef.current.speak(titleUtterance);
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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying && synthRef.current) {
      synthRef.current.cancel();
    }
  };

  const handleClose = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    onClose();
  };

  if (!isOpen || !steps || steps.length === 0) return null;

  const currentData = steps[currentStep];

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
          <div className="tutorial-spotlight-overlay">
            <div
              className="tutorial-spotlight-cutout"
              style={currentData.spotlight}
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
          <button
            className="tutorial-btn"
            onClick={togglePlayback}
            title={isPlaying ? "Stop Narration" : "Play Narration"}
          >
            {isPlaying ? <Square size={16} /> : <Play size={16} />}
            {isPlaying ? "Stop" : "Play"}
          </button>

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
