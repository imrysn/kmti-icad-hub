import React,{ createContext,useCallback,useContext,useState,useEffect } from 'react';
import { useTTS } from '../hooks/useTTS';
import { useTranslation } from './LanguageContext';

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
  const { language } = useTranslation();
  const [currentText, setCurrentText] = useState<string[]>([]);
  const [currentStartIndex, setCurrentStartIndex] = useState<number>(0);

  useEffect(() => {
    if (!tts.voices || tts.voices.length === 0) return;
    const targetLang = language === 'ja' ? 'ja-JP' : 'en-US';
    const languageCode = targetLang.toLowerCase().split('-')[0];
    const currentVoice = tts.voices.find(v => v.voiceURI === tts.selectedVoiceURI);
    if (currentVoice?.lang.toLowerCase().startsWith(languageCode)) return;

    const preferredVoice = language === 'en'
      ? tts.voices.find(v => v.voiceURI === 'openai://nova')
      : undefined;
    const matchingVoice = preferredVoice
      || tts.voices.find(v => v.lang.toLowerCase().startsWith(languageCode))
      || tts.voices.find(v => v.lang.toLowerCase().includes(targetLang.toLowerCase().split('-')[0]));
    if (matchingVoice) {
      tts.setSelectedVoiceURI(matchingVoice.voiceURI);
    }
  }, [language, tts.selectedVoiceURI, tts.setSelectedVoiceURI, tts.voices]);

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
