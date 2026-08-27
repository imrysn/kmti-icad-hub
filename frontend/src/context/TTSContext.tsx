import React,{ createContext,useCallback,useContext,useState,useEffect } from 'react';
import { useTTS } from '../hooks/useTTS';
import { FOUNDATIONS_NARRATION_PROFILE } from '../config/foundationsNarration';

interface TTSVoice {
  voiceURI: string;
  name: string;
  lang: string;
  localService: boolean;
  default: boolean;
}

interface TTSContextType {
  isSpeaking: boolean;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  currentCharIndex: number;
  currentSentenceIndex: number;
  activeParagraphText: string;
  currentText: string[];
  currentStartIndex: number;
  registerText: (text: string[], startIndex?: number) => void;
  speak: (text: string[], startIndex?: number) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  rate: number;
  setRate: (rate: number) => void;
  voices: TTSVoice[];
  selectedVoiceURI: string | null;
  setSelectedVoiceURI: (uri: string | null) => void;
}

const TTSContext = createContext<TTSContextType | undefined>(undefined);

export const TTSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tts = useTTS();
  const [currentText, setCurrentText] = useState<string[]>([]);
  const [currentStartIndex, setCurrentStartIndex] = useState<number>(0);

  useEffect(() => {
    if (tts.selectedVoiceURI !== FOUNDATIONS_NARRATION_PROFILE.voiceURI) {
      tts.setSelectedVoiceURI(FOUNDATIONS_NARRATION_PROFILE.voiceURI);
    }
  }, [tts.selectedVoiceURI, tts.setSelectedVoiceURI]);

  const registerText = useCallback((text: string[], startIndex: number = 0) => {
    setCurrentText(text);
    setCurrentStartIndex(startIndex);
  }, []);

  return (
    <TTSContext.Provider
      value={{
        isSpeaking: tts.isSpeaking,
        currentIndex: tts.currentIndex,
        setCurrentIndex: tts.setCurrentIndex,
        currentCharIndex: tts.currentCharIndex,
        currentSentenceIndex: tts.currentSentenceIndex,
        activeParagraphText: tts.activeParagraphText,
        currentText,
        currentStartIndex,
        registerText,
        speak: tts.speak,
        stop: tts.stop,
        pause: tts.pause,
        resume: tts.resume,
        rate: tts.rate,
        setRate: tts.setRate,
        voices: tts.voices,
        selectedVoiceURI: tts.selectedVoiceURI,
        setSelectedVoiceURI: tts.setSelectedVoiceURI,
      }}
    >
      {children}
    </TTSContext.Provider>
  );
};

export const useTTSContext = () => {
  const context = useContext(TTSContext);
  if (!context) {
    throw new Error('useTTSContext must be used within a TTSProvider');
  }
  return context;
};
