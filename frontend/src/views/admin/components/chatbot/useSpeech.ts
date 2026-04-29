import { useState, useCallback } from 'react';

export const useSpeech = (forcedLanguage: string) => {
    const [currentlyReadingIdx, setCurrentlyReadingIdx] = useState<number | null>(null);
    const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);

    // Helper to find the best Asian voice for the current language
    const getAsianVoice = useCallback((lang: string): SpeechSynthesisVoice | null => {
        if (!window.speechSynthesis) return null;
        const voices = window.speechSynthesis.getVoices();

        // Priority maps for Asian-localed voices
        const priorities: Record<string, string[]> = {
            'en-US': ['en-PH', 'en-SG', 'en-MY', 'en-JP', 'en-HK', 'en-IN'],
            'ja-JP': ['ja-JP'],
            'fil-PH': ['fil-PH', 'en-PH']
        };

        const searchLangs = priorities[lang] || [lang];

        for (const target of searchLangs) {
            const found = voices.find(v => v.lang.toLowerCase().includes(target.toLowerCase()));
            if (found) return found;
        }

        // Fallback to exact lang match
        return voices.find(v => v.lang.toLowerCase().includes(lang.toLowerCase())) || null;
    }, []);

    const stripMarkdown = (text: string): string => {
        return text
            .replace(/\[\d+\]/g, '') // Remove citations [1], [2]
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
            .replace(/\*(.*?)\*/g, '$1') // Remove italics
            .replace(/#{1,6}\s+(.*)/g, '$1') // Remove headers
            .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // Remove code blocks
            .replace(/>\s+(.*)/g, '$1') // Remove blockquotes
            .replace(/-\s+(.*)/g, '$1') // Remove list items
            .replace(/\n/g, ' ') // Replace newlines with spaces
            .trim();
    };

    const speakText = useCallback((text: string, idx: number) => {
        if (!window.speechSynthesis) return;

        // If clicking the same message that is currently playing, stop it
        if (currentlyReadingIdx === idx) {
            window.speechSynthesis.cancel();
            setCurrentlyReadingIdx(null);
            setCurrentCharIndex(0);
            return;
        }

        // Cancel previous utterance
        window.speechSynthesis.cancel();

        // Clean text for speech
        const cleanText = stripMarkdown(text);
        if (!cleanText) return;

        // Add small delay to ensure cancel completes before starting new speech
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(cleanText);

            // Set voice and lang
            const voice = getAsianVoice(forcedLanguage);
            if (voice) {
                utterance.voice = voice;
            }
            utterance.lang = forcedLanguage;

            // State handlers
            utterance.onstart = () => {
                setCurrentlyReadingIdx(idx);
                setCurrentCharIndex(0);
            };
            
            utterance.onboundary = (event) => {
                if (event.name === 'word') {
                    setCurrentCharIndex(event.charIndex);
                }
            };

            utterance.onend = () => {
                setCurrentlyReadingIdx(null);
                setCurrentCharIndex(0);
            };
            
            utterance.onerror = () => {
                setCurrentlyReadingIdx(null);
                setCurrentCharIndex(0);
            };

            window.speechSynthesis.speak(utterance);
        }, 50);
    }, [currentlyReadingIdx, forcedLanguage, getAsianVoice]);

    return {
        currentlyReadingIdx,
        currentCharIndex,
        speakText,
        setCurrentlyReadingIdx
    };
};
