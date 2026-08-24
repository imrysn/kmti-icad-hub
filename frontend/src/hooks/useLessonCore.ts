import { useCallback,useEffect,useRef,useState } from 'react';
import { useTTSContext } from '../context/TTSContext';
import { useTranslation } from '../context/LanguageContext';

/**
 * useLessonCore - Shared logic for all lesson components.
 * Handles scroll progress and provides TTS status.
 */
export const useLessonCore = (subLessonId: string, defaultText?: string[]) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // TTS integration using global shared context
  const { speak: speakRaw, stop, pause, resume, isSpeaking, currentIndex, currentSentenceIndex, currentCharIndex, registerText: registerTextRaw } = useTTSContext();
  const { language, translateContent } = useTranslation();
  const translateSteps = useCallback(
    (steps: string[]) => steps.map(translateContent),
    [translateContent]
  );
  const speak = useCallback(
    (steps: string[], startIndex: number) => speakRaw(translateSteps(steps), startIndex),
    [speakRaw, translateSteps]
  );
  const registerText = useCallback(
    (steps: string[], startIndex?: number) => registerTextRaw(translateSteps(steps), startIndex),
    [registerTextRaw, translateSteps]
  );

  const defaultTextJSON = defaultText ? JSON.stringify(defaultText) : '';

  useEffect(() => {
    if (defaultTextJSON) {
      registerText(JSON.parse(defaultTextJSON));
    }
  }, [subLessonId, defaultTextJSON, registerText]);

  useEffect(() => {
    const lessonContainer = containerRef.current;
    if (!lessonContainer) return;

    const localizeTextNodes = () => {
      const walker = document.createTreeWalker(lessonContainer, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      let node = walker.nextNode();
      while (node) {
        nodes.push(node as Text);
        node = walker.nextNode();
      }
      nodes.forEach((textNode) => {
        // Step identifiers are structural labels, not lesson copy.  Keeping them
        // untouched prevents a text-only translation match from expanding a
        // compact marker such as "a" inside its fixed-size badge.
        if (textNode.parentElement?.closest('.step-number')) return;
        const translated = translateContent(textNode.nodeValue || '');
        if (translated !== textNode.nodeValue) textNode.nodeValue = translated;
      });
    };

    localizeTextNodes();
    const observer = new MutationObserver(localizeTextNodes);
    observer.observe(lessonContainer, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language, translateContent]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how much of the element has been scrolled past the top of the viewport.
      // When at the top of the element, rect.top is 0.
      // As we scroll down, rect.top becomes negative.
      // If we scroll up past the element, rect.top becomes positive.
      const scrolled = rect.top < 0 ? Math.abs(rect.top) : 0;
      const totalScrollableHeight = rect.height - viewportHeight;

      if (totalScrollableHeight > 0) {
        const progress = (scrolled / totalScrollableHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else if (rect.top < 0) {
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
        registerText([]); // Clear global registered text
    };
  }, [subLessonId, stop, registerText]);

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
    pause,
    resume,
    isSpeaking,
    currentIndex,
    currentSentenceIndex,
    currentCharIndex,
    registerText
  };
};
