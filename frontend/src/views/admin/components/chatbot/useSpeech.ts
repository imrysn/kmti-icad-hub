import { useState, useCallback } from 'react';

export const useSpeech = (forcedLanguage: string) => {
    const [currentlyReadingIdx, setCurrentlyReadingIdx] = useState<number | null>(null);

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

    const speakText = useCallback((text: string, idx: number) => {
        if (!window.speechSynthesis) return;

        // If clicking the same message that is currently playing, stop it
        if (currentlyReadingIdx === idx) {
            window.speechSynthesis.cancel();
            setCurrentlyReadingIdx(null);
            return;
        }

        // Cancel previous utterance
        window.speechSynthesis.cancel();

        // Add small delay to ensure cancel completes before starting new speech
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(text);

            // Set voice and lang
            const voice = getAsianVoice(forcedLanguage);
            if (voice) {
                utterance.voice = voice;
            }
            utterance.lang = forcedLanguage;

            // State handlers
            utterance.onstart = () => setCurrentlyReadingIdx(idx);
            utterance.onend = () => setCurrentlyReadingIdx(null);
            utterance.onerror = () => setCurrentlyReadingIdx(null);

            window.speechSynthesis.speak(utterance);
        }, 50);
    }, [currentlyReadingIdx, forcedLanguage, getAsianVoice]);

    return {
        currentlyReadingIdx,
        speakText,
        setCurrentlyReadingIdx
    };
};
