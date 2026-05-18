import { useState, useCallback, useRef, useEffect } from 'react';
import { splitIntoSentences, normalizeSpeechText, getSentenceMapping } from '../utils/sentenceUtils';

interface SentenceQueueItem {
    paragraphIndex: number;
    sentenceIndex: number;
    text: string;
    normalizedText: string;
    offset: number; // Offset in original paragraph
}

export const useTTS = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1); // Paragraph index
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(-1);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0); // Global to paragraph
  
  const queueRef = useRef<SentenceQueueItem[]>([]);
  const currentSentenceRef = useRef<number>(-1);
  const isDebug = process.env.NODE_ENV === 'development';

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCurrentIndex(-1);
    setCurrentSentenceIndex(-1);
    setCurrentCharIndex(0);
    currentSentenceRef.current = -1;
  }, []);

  const getTeacherVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (!window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    
    // Prioritize natural/professional sounding voices
    const selectedVoice = 
           voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
           voices.find(v => v.name.includes('Natural') && v.lang.startsWith('en')) ||
           voices.find(v => v.name.includes('Zira') && v.lang.startsWith('en')) ||
           voices.find(v => v.lang.startsWith('en') && !v.name.includes('Low Quality'));
    
    return selectedVoice || null;
  }, []);

  const speakSentence = useCallback((index: number) => {
    if (!window.speechSynthesis || index >= queueRef.current.length) {
      if (isDebug) console.log('Narration Complete');
      setIsSpeaking(false);
      setCurrentIndex(-1);
      setCurrentSentenceIndex(-1);
      setCurrentCharIndex(0);
      currentSentenceRef.current = -1;
      return;
    }

    const item = queueRef.current[index];
    currentSentenceRef.current = index;
    
    setCurrentIndex(item.paragraphIndex);
    setCurrentSentenceIndex(item.sentenceIndex);
    
    const utterance = new SpeechSynthesisUtterance(item.normalizedText);
    
    // Teacher settings
    utterance.voice = getTeacherVoice();
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Fallback timing calculation for smoother highlighting
    const words = item.normalizedText.split(/\s+/).filter(w => w.length > 0);
    const estimatedDuration = (item.normalizedText.length * 60) / utterance.rate;
    let boundaryFired = false;
    let fallbackInterval: NodeJS.Timeout | null = null;

    utterance.onstart = () => {
      setCurrentCharIndex(item.offset);
      
      // Start fallback timer
      setTimeout(() => {
          if (!boundaryFired && isSpeaking && currentSentenceRef.current === index) {
              let wordIdx = 0;
              const msPerChar = estimatedDuration / (item.normalizedText.length || 1);
              
              fallbackInterval = setInterval(() => {
                  if (wordIdx < words.length) {
                      const currentWord = words[wordIdx];
                      const wordStart = item.normalizedText.indexOf(currentWord);
                      if (wordStart !== -1) {
                          setCurrentCharIndex(item.offset + wordStart);
                      }
                      wordIdx++;
                  } else {
                      if (fallbackInterval) clearInterval(fallbackInterval);
                  }
              }, (item.normalizedText.length / (words.length || 1)) * msPerChar);
          }
      }, 300);
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        boundaryFired = true;
        if (fallbackInterval) {
            clearInterval(fallbackInterval);
            fallbackInterval = null;
        }
        setCurrentCharIndex(item.offset + event.charIndex);
      }
    };

    utterance.onend = () => {
      if (fallbackInterval) clearInterval(fallbackInterval);
      setCurrentCharIndex(item.offset + item.text.length);
      
      setTimeout(() => {
        if (currentSentenceRef.current === index) {
            speakSentence(index + 1);
        }
      }, 500);
    };

    utterance.onerror = (err) => {
      console.error('TTS Utterance Error:', err);
      if (fallbackInterval) clearInterval(fallbackInterval);
      setIsSpeaking(false);
      setCurrentIndex(-1);
    };

    window.speechSynthesis.speak(utterance);
  }, [getTeacherVoice, isDebug, isSpeaking]);

  const speak = useCallback((textArray: string[], startIndex: number = 0) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    if (!textArray || textArray.length === 0) return;

    const sentenceQueue: SentenceQueueItem[] = [];
    textArray.forEach((para, pIdx) => {
        const sentences = splitIntoSentences(para);
        const mapping = getSentenceMapping(para, sentences);
        
        mapping.forEach((m, sIdx) => {
            sentenceQueue.push({
                paragraphIndex: pIdx,
                sentenceIndex: sIdx,
                text: m.text,
                normalizedText: normalizeSpeechText(m.text),
                offset: m.start
            });
        });
    });

    queueRef.current = sentenceQueue;
    setIsSpeaking(true);

    const startSentenceIdx = sentenceQueue.findIndex(s => s.paragraphIndex === startIndex);
    const finalStartIdx = startSentenceIdx !== -1 ? startSentenceIdx : 0;

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        speakSentence(finalStartIdx);
      };
    } else {
      speakSentence(finalStartIdx);
    }
  }, [speakSentence]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { 
    speak, 
    stop, 
    isSpeaking, 
    currentIndex, 
    currentSentenceIndex, 
    currentCharIndex 
  };
};
