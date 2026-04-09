import { useState, useCallback, useRef, useEffect } from 'react';

export const useTTS = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const queueRef = useRef<string[]>([]);
  
  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentIndex(-1);
    }
  }, []);

  const getTeacherVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    // Prioritize natural/professional sounding voices
    const selectedVoice = 
           voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
           voices.find(v => v.name.includes('Natural') && v.lang.startsWith('en')) ||
           voices.find(v => v.name.includes('Zira') && v.lang.startsWith('en')) ||
           voices.find(v => v.lang.startsWith('en'));
    
    return selectedVoice || null;
  }, []);

  const speakStep = useCallback((index: number) => {
    if (!window.speechSynthesis || index >= queueRef.current.length) {
      setIsSpeaking(false);
      setCurrentIndex(-1);
      return;
    }

    setCurrentIndex(index);
    const utterance = new SpeechSynthesisUtterance(queueRef.current[index]);
    
    // "Teacher-like" settings
    utterance.voice = getTeacherVoice();
    utterance.rate = 0.9; // Slightly slower, measured pace
    utterance.pitch = 1.05; // Clear and engaging
    utterance.volume = 1.0;

    utterance.onend = () => {
      // Small pause between steps for better comprehension
      setTimeout(() => {
        if (window.speechSynthesis.speaking) speakStep(index + 1);
        else speakStep(index + 1);
      }, 500);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentIndex(-1);
    };

    window.speechSynthesis.speak(utterance);
  }, [getTeacherVoice]);

  const speak = useCallback((textArray: string[]) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    if (textArray.length === 0) return;

    queueRef.current = textArray;
    setIsSpeaking(true);
    
    // Ensure voices are loaded (some browsers load them async)
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        speakStep(0);
      };
    } else {
      speakStep(0);
    }
  }, [speakStep]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { speak, stop, isSpeaking, currentIndex };
};
