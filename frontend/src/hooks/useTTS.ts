import { useState, useCallback, useRef, useEffect } from 'react';
import { splitIntoSentences, normalizeSpeechText, getSentenceMapping } from '../utils/sentenceUtils';
import { api } from '../services/api';

interface SentenceQueueItem {
  paragraphIndex: number;
  sentenceIndex: number;
  text: string;
  normalizedText: string;
  offset: number; // Offset in original paragraph
  paragraphText: string; // Original full paragraph text
}

// Relaxed voice type to merge browser SpeechSynthesisVoice and Kokoro voices
interface TTSVoice {
  voiceURI: string;
  name: string;
  lang: string;
  localService: boolean;
  default: boolean;
}

export const useTTS = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1); // Paragraph index
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(-1);
  const [activeParagraphText, setActiveParagraphText] = useState<string>('');
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0); // Global to paragraph

  // User Preference States (with localStorage persistence)
  const [rate, setRateState] = useState<number>(() => {
    const saved = localStorage.getItem('tts_rate');
    return saved ? parseFloat(saved) : 1.0;
  });
  const [selectedVoiceURI, setSelectedVoiceURIState] = useState<string | null>(() => {
    const saved = localStorage.getItem('tts_voice_uri');
    return saved && saved !== 'undefined' && saved !== 'null' && saved !== '' ? saved : 'kokoro://af_sarah';
  });
  const [voices, setVoices] = useState<TTSVoice[]>([]);

  const queueRef = useRef<SentenceQueueItem[]>([]);
  const currentSentenceRef = useRef<number>(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const preloadedAudioRef = useRef<{ index: number; audio: HTMLAudioElement } | null>(null);
  const activeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDebug = process.env.NODE_ENV === 'development';

  useEffect(() => {
    let active = true;

    const loadVoices = async () => {
      let browserVoices: TTSVoice[] = [];
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        browserVoices = window.speechSynthesis.getVoices().map(v => ({
          voiceURI: v.voiceURI,
          name: v.name,
          lang: v.lang,
          localService: v.localService,
          default: v.default
        }));
      }

      let premiumVoices: TTSVoice[] = [];
      try {
        const response = await api.get('/tts/voices');
        if (response.data && Array.isArray(response.data)) {
          premiumVoices = response.data.map((v: any) => ({
            voiceURI: v.id,
            name: v.name,
            lang: v.lang,
            localService: false,
            default: false
          }));
        }
      } catch (err) {
        console.warn('Failed to load premium Kokoro voices:', err);
      }

      if (active) {
        const mergedVoices = [...premiumVoices, ...browserVoices];
        console.log("useTTS: Loaded voices:", mergedVoices.map(v => v.voiceURI));
        setVoices(mergedVoices);
      }
    };

    loadVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      active = false;
    };
  }, []);

  const setRate = useCallback((r: number) => {
    setRateState(r);
    localStorage.setItem('tts_rate', r.toString());
  }, []);

  const setSelectedVoiceURI = useCallback((uri: string | null) => {
    setSelectedVoiceURIState(uri);
    if (uri) {
      localStorage.setItem('tts_voice_uri', uri);
    } else {
      localStorage.removeItem('tts_voice_uri');
    }
  }, []);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (preloadedAudioRef.current) {
      preloadedAudioRef.current.audio.pause();
      preloadedAudioRef.current = null;
    }
    if (activeIntervalRef.current) {
      clearInterval(activeIntervalRef.current);
      activeIntervalRef.current = null;
    }
    setIsSpeaking(false);
    setCurrentIndex(-1);
    setCurrentSentenceIndex(-1);
    setCurrentCharIndex(0);
    setActiveParagraphText('');
    currentSentenceRef.current = -1;
    if (typeof window !== 'undefined') {
      try {
        delete (window as any)._activeUtterance;
      } catch (e) { }
    }
  }, []);

  const getTeacherVoice = useCallback((): TTSVoice | null => {
    // Prioritize natural/professional sounding browser voices
    const selectedVoice =
      voices.find(v => !v.voiceURI.startsWith('kokoro://') && v.name.includes('Google') && v.lang.startsWith('en')) ||
      voices.find(v => !v.voiceURI.startsWith('kokoro://') && v.name.includes('Natural') && v.lang.startsWith('en')) ||
      voices.find(v => !v.voiceURI.startsWith('kokoro://') && v.name.includes('Zira') && v.lang.startsWith('en')) ||
      voices.find(v => !v.voiceURI.startsWith('kokoro://') && v.lang.startsWith('en') && !v.name.includes('Low Quality'));

    return selectedVoice || null;
  }, [voices]);

  const speakSentence = useCallback((index: number) => {
    // Stop any existing playing instances
    if (activeIntervalRef.current) {
      clearInterval(activeIntervalRef.current);
      activeIntervalRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (index >= queueRef.current.length) {
      if (isDebug) console.log('Narration Complete');
      setIsSpeaking(false);
      setCurrentIndex(-1);
      setCurrentSentenceIndex(-1);
      setCurrentCharIndex(0);
      setActiveParagraphText('');
      currentSentenceRef.current = -1;
      return;
    }

    const item = queueRef.current[index];
    currentSentenceRef.current = index;

    // Do NOT set indexes here immediately to avoid highlighting the text
    // while the audio file is loading over the network.
    // They are set inside audio.onplaying and utterance.onstart below.

    const isKokoro = selectedVoiceURI?.startsWith('kokoro://');
    console.log("useTTS: speakSentence index:", index, "isKokoro:", isKokoro, "selectedVoiceURI:", selectedVoiceURI);

    if (isKokoro) {
      const voiceName = selectedVoiceURI!.replace('kokoro://', '');

      let audio: HTMLAudioElement;
      if (preloadedAudioRef.current && preloadedAudioRef.current.index === index) {
        console.log("useTTS: Playing preloaded audio for index:", index);
        audio = preloadedAudioRef.current.audio;
        preloadedAudioRef.current = null;
      } else {
        const url = `${api.defaults.baseURL || ''}/api/v1/tts/synthesize?text=${encodeURIComponent(item.normalizedText)}&voice=${voiceName}&speed=${rate}`;
        console.log("useTTS: Synthesizing and playing from URL:", url);
        audio = new Audio(url);
      }

      audioRef.current = audio;

      const words = item.normalizedText.split(/\s+/).filter(w => w.length > 0);
      const estimatedDuration = (item.normalizedText.length * 60) / rate;

      // Preload next sentence in background while this one plays
      if (index + 1 < queueRef.current.length) {
        const nextItem = queueRef.current[index + 1];
        const nextUrl = `${api.defaults.baseURL || ''}/api/v1/tts/synthesize?text=${encodeURIComponent(nextItem.normalizedText)}&voice=${voiceName}&speed=${rate}`;
        const nextAudio = new Audio(nextUrl);
        nextAudio.load();
        preloadedAudioRef.current = { index: index + 1, audio: nextAudio };
      }

      let wordIdx = 0;
      let lastOffset = 0;

      const startHighlightTimer = () => {
        if (activeIntervalRef.current) clearInterval(activeIntervalRef.current);

        setCurrentCharIndex(item.offset + lastOffset);
        const durationSec = (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration))
          ? audio.duration
          : (estimatedDuration / 1000);

        const totalMs = durationSec * 1000;
        const msPerChar = totalMs / (item.normalizedText.length || 1);

        activeIntervalRef.current = setInterval(() => {
          if (wordIdx < words.length) {
            const currentWord = words[wordIdx];
            const wordStart = item.normalizedText.indexOf(currentWord, lastOffset);
            if (wordStart !== -1) {
              setCurrentCharIndex(item.offset + wordStart);
              lastOffset = wordStart + currentWord.length;
            }
            wordIdx++;
          } else {
            if (activeIntervalRef.current) {
              clearInterval(activeIntervalRef.current);
              activeIntervalRef.current = null;
            }
          }
        }, (item.normalizedText.length / (words.length || 1)) * msPerChar);
      };

      audio.onloadedmetadata = () => {
        // Adjust highlight speed dynamically once actual audio duration is fetched
        if (audioRef.current === audio && !audio.paused) {
          startHighlightTimer();
        }
      };

      audio.onplaying = () => {
        // Set indexes only when audio playback actually starts
        setCurrentIndex(item.paragraphIndex);
        setCurrentSentenceIndex(item.sentenceIndex);
        setActiveParagraphText(item.paragraphText);
        startHighlightTimer();
      };

      audio.onpause = () => {
        if (activeIntervalRef.current) {
          clearInterval(activeIntervalRef.current);
          activeIntervalRef.current = null;
        }
      };

      audio.onwaiting = () => {
        if (activeIntervalRef.current) {
          clearInterval(activeIntervalRef.current);
          activeIntervalRef.current = null;
        }
      };

      audio.onended = () => {
        if (activeIntervalRef.current) {
          clearInterval(activeIntervalRef.current);
          activeIntervalRef.current = null;
        }
        setCurrentCharIndex(item.offset + item.text.length);
        setTimeout(() => {
          if (currentSentenceRef.current === index) {
            speakSentence(index + 1);
          }
        }, 500);
      };

      audio.onerror = (err) => {
        console.error('Kokoro Audio Playback Error:', err);
        if (activeIntervalRef.current) {
          clearInterval(activeIntervalRef.current);
          activeIntervalRef.current = null;
        }
        setIsSpeaking(false);
        setCurrentIndex(-1);
        setActiveParagraphText('');
      };

      audio.play().catch(err => {
        console.error("Audio play failed:", err);
        audio.onended?.(null as any);
      });
    } else {
      // Fallback: Browser Web Speech API
      if (!window.speechSynthesis) return;
      const utterance = new SpeechSynthesisUtterance(item.normalizedText);
      if (typeof window !== 'undefined') {
        (window as any)._activeUtterance = utterance;
      }

      let voice: TTSVoice | null = null;
      if (selectedVoiceURI) {
        voice = voices.find(v => v.voiceURI === selectedVoiceURI) || null;
      }
      if (!voice) {
        voice = getTeacherVoice();
      }

      if (voice && !voice.voiceURI.startsWith('kokoro://')) {
        const rawVoices = window.speechSynthesis.getVoices();
        const nativeVoice = rawVoices.find(v => v.voiceURI === voice!.voiceURI);
        if (nativeVoice) utterance.voice = nativeVoice;
      }

      utterance.rate = rate;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const words = item.normalizedText.split(/\s+/).filter(w => w.length > 0);
      const estimatedDuration = (item.normalizedText.length * 60) / utterance.rate;
      let boundaryFired = false;

      utterance.onstart = () => {
        // Set indexes only when Web Speech playback actually starts
        setCurrentIndex(item.paragraphIndex);
        setCurrentSentenceIndex(item.sentenceIndex);
        setActiveParagraphText(item.paragraphText);
        setCurrentCharIndex(item.offset);

        setTimeout(() => {
          if (!boundaryFired && isSpeaking && currentSentenceRef.current === index) {
            let wordIdx = 0;
            const msPerChar = estimatedDuration / (item.normalizedText.length || 1);

            activeIntervalRef.current = setInterval(() => {
              if (wordIdx < words.length) {
                const currentWord = words[wordIdx];
                const wordStart = item.normalizedText.indexOf(currentWord);
                if (wordStart !== -1) {
                  setCurrentCharIndex(item.offset + wordStart);
                }
                wordIdx++;
              } else {
                if (activeIntervalRef.current) clearInterval(activeIntervalRef.current);
              }
            }, (item.normalizedText.length / (words.length || 1)) * msPerChar);
          }
        }, 300);
      };

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          boundaryFired = true;
          if (activeIntervalRef.current) {
            clearInterval(activeIntervalRef.current);
            activeIntervalRef.current = null;
          }
          setCurrentCharIndex(item.offset + event.charIndex);
        }
      };

      utterance.onend = () => {
        if (activeIntervalRef.current) clearInterval(activeIntervalRef.current);
        setCurrentCharIndex(item.offset + item.text.length);

        setTimeout(() => {
          if (currentSentenceRef.current === index) {
            speakSentence(index + 1);
          }
        }, 500);
      };

      utterance.onerror = (err) => {
        console.error('TTS Utterance Error:', err);
        if (activeIntervalRef.current) clearInterval(activeIntervalRef.current);
        setIsSpeaking(false);
        setCurrentIndex(-1);
        setActiveParagraphText('');
      };

      if (window.speechSynthesis) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.speak(utterance);
    }
  }, [getTeacherVoice, isDebug, isSpeaking, rate, selectedVoiceURI, voices]);

  const speak = useCallback((textArray: string[], startIndex: number = 0) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (activeIntervalRef.current) {
      clearInterval(activeIntervalRef.current);
      activeIntervalRef.current = null;
    }
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
          offset: m.start,
          paragraphText: para
        });
      });
    });

    queueRef.current = sentenceQueue;
    setIsSpeaking(true);

    const startSentenceIdx = sentenceQueue.findIndex(s => s.paragraphIndex === startIndex);
    const finalStartIdx = startSentenceIdx !== -1 ? startSentenceIdx : 0;

    setTimeout(() => speakSentence(finalStartIdx), 100);
  }, [speakSentence]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (activeIntervalRef.current) {
        clearInterval(activeIntervalRef.current);
        activeIntervalRef.current = null;
      }
    };
  }, []);

  // Dynamic Realtime Voice/Rate Change Controller
  useEffect(() => {
    if (isSpeaking && currentSentenceRef.current !== -1) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const activeUtterance = (window as any)._activeUtterance;
        if (activeUtterance) {
          activeUtterance.onstart = null;
          activeUtterance.onboundary = null;
          activeUtterance.onend = null;
          activeUtterance.onerror = null;
        }
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current.onplay = null;
        audioRef.current.onplaying = null;
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (preloadedAudioRef.current) {
        preloadedAudioRef.current.audio.pause();
        preloadedAudioRef.current = null;
      }
      if (activeIntervalRef.current) {
        clearInterval(activeIntervalRef.current);
        activeIntervalRef.current = null;
      }

      setTimeout(() => {
        if (isSpeaking) {
          speakSentence(currentSentenceRef.current);
        }
      }, 100);
    }
  }, [rate, selectedVoiceURI]);

  return {
    speak,
    stop,
    isSpeaking,
    currentIndex,
    setCurrentIndex,
    currentSentenceIndex,
    currentCharIndex,
    activeParagraphText,
    rate,
    setRate,
    voices,
    selectedVoiceURI,
    setSelectedVoiceURI
  };
};
