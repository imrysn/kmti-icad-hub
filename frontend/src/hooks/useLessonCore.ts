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
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the element has been scrolled past the top of the viewport
      // rect.top is the distance from the top of the viewport to the top of the element
      // When at the top, rect.top is 0. As we scroll down, rect.top becomes negative.
      const scrolled = Math.abs(rect.top);
      const totalScrollableHeight = rect.height - viewportHeight;
      
      if (totalScrollableHeight > 0) {
        const progress = (scrolled / totalScrollableHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else if (rect.top < 0) {
        // If the content is shorter than the viewport but we scrolled past it
        setScrollProgress(100);
      } else {
        setScrollProgress(0);
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
