import { useState, useEffect, useRef } from 'react'; import { useTTS } from './useTTS';

/**
 * useLessonCore - Shared logic for all lesson components.
 * Handles scroll progress and provides TTS status.
 */
export const useLessonCore = (subLessonId: string) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // TTS integration
  const { speak, stop, isSpeaking, currentIndex, currentCharIndex } = useTTS();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const element = containerRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (totalHeight <= 0) {
        // Fallback for non-scrollable containers (using window scroll)
        const winHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (windowScrollTop / winHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else {
        // Standard container scroll tracking
        const progress = (element.scrollTop / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    // Reset progress on sub-lesson change
    setScrollProgress(0);
    
    // Also scroll the main viewer to top
    const scrollContainer = document.querySelector('.lesson-scroll-area');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    window.addEventListener('scroll', handleScroll, true);
    return () => {
        window.removeEventListener('scroll', handleScroll, true);
        stop(); // Stop speaking when navigating away
    };
  }, [subLessonId, stop]);

  // Auto-scroll logic for TTS
  useEffect(() => {
    if (isSpeaking && currentIndex >= 0) {
      const targetSection = document.querySelector(`[data-reading-index="${currentIndex}"]`);
      if (targetSection) {
        // Use a more refined scroll logic
        const rect = targetSection.getBoundingClientRect();
        const isVisible = (
          rect.top >= 100 && 
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - 100
        );

        // Only scroll if not already comfortably visible
        if (!isVisible) {
          targetSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }
    }
  }, [isSpeaking, currentIndex]);

  return {
    scrollProgress,
    containerRef,
    speak,
    stop,
    isSpeaking,
    currentIndex,
    currentCharIndex
  };
};
