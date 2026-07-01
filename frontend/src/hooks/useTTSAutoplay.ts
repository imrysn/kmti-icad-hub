import { useEffect, useRef } from 'react';

/**
 * Hook to manage TTS autoplay and tab transitions.
 */
export const useTTSAutoplay = (
  isSpeaking: boolean,
  currentIndex: number,
  activeTab: string,
  stepsLength: number,
  tabs: { id: string }[],
  handleNext: (isAuto?: boolean) => void,
  speak: (steps: string[], startIdx: number) => void,
  currentSteps: string[],
  startIdx: number
) => {
  const wasSpeakingRef = useRef(false);
  const lastIndexRef = useRef(-1);
  const shouldAutoPlayRef = useRef(false);
  const prevTabRef = useRef(activeTab);
  const hasMountedRef = useRef(false);

  // Auto-start speaking if autoplay was active from a previous lesson page
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      if (sessionStorage.getItem('tts-autoplay-active') === 'true') {
        shouldAutoPlayRef.current = true;
        const timer = setTimeout(() => {
          speak(currentSteps, startIdx);
        }, 600); // 600ms buffer to ensure component is fully mounted and DOM index attributes exist
        return () => clearTimeout(timer);
      }
    }
  }, [speak, currentSteps, startIdx]);

  useEffect(() => {
    if (currentIndex !== -1) {
      lastIndexRef.current = currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isSpeaking && wasSpeakingRef.current) {
      if (lastIndexRef.current === stepsLength - 1) {
        const i = tabs.findIndex(t => t.id === activeTab);
        if (i < tabs.length - 1) {
          shouldAutoPlayRef.current = true;
          sessionStorage.setItem('tts-autoplay-active', 'true');
          handleNext(true);
        } else {
          // Last tab finished: auto-advance to the next lesson page
          sessionStorage.setItem('tts-autoplay-active', 'true');
          handleNext(true);
        }
      }
    }
    wasSpeakingRef.current = isSpeaking;
  }, [isSpeaking, activeTab, stepsLength, tabs, handleNext]);

  useEffect(() => {
    if (activeTab !== prevTabRef.current) {
      if (shouldAutoPlayRef.current) {
        shouldAutoPlayRef.current = false;
        setTimeout(() => {
          speak(currentSteps, startIdx);
        }, 300);
      }
      prevTabRef.current = activeTab;
    }
  }, [activeTab, speak, currentSteps, startIdx]);
};
