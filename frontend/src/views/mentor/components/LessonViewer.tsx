import { FoundationCompletionContext } from '../../../components/iCAD_Foundations/FoundationCompletionContext';
import LessonRecapPanel from '../../../components/LessonRecapPanel';
import { resolveFoundationLesson, foundationRecap } from '../../../components/iCAD_Foundations/curriculum';
import { professionalRenderLesson } from '../../../components/iCAD_Professional/curriculum';
import { PRESERVED_FOUNDATIONS_LESSONS } from '../mentorConstants';
const FoundationReadingLesson = lazy(() => import('../../../components/iCAD_Foundations/FoundationReadingLesson'));
import { BookOpen, ChevronLeft, ChevronRight, Loader2, Video } from 'lucide-react';
import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useTranslation } from '../../../context/LanguageContext';
import api from '../../../services/api';
import { authService } from '../../../services/authService';
import { Lesson } from '../mentorConstants';
import { QuizModal } from './QuizModal';

// Foundations Lesson Imports
const DynamicFoundationsLesson = lazy(() => import('../../../components/PublicCourses/Foundations/DynamicFoundationsLesson'));
import { getDynamicFoundationsLessonProps } from '../../../components/PublicCourses/Foundations/dynamicLessonProps';
const PanInteractiveLesson = lazy(() => import('../../../components/InteractiveVideoLesson/PanInteractiveLesson'));
const RotateViewInteractiveLesson = lazy(() => import('../../../components/InteractiveVideoLesson/RotateViewInteractiveLesson'));


// 3D Lesson Imports (Lazy Loaded)
const IcadInterfaceLesson = lazy(() => import('../../../components/3D_Modeling/3D_iCadInterface'));
const ToolBarsLesson = lazy(() => import('../../../components/3D_Modeling/3D_ToolBars'));
const BasicOperationLesson = lazy(() => import('../../../components/3D_Modeling/3D_BasicOperation'));


import { useTTSContext } from '../../../context/TTSContext';

interface LessonViewerProps {
  is2DDrawingCourse: boolean;
  isFoundationsCourse?: boolean;
  isProfessionalCourse?: boolean;
  courseId: string;
  activeLessonId: string;
  currentLessonIndex: number;
  allLessonIdsLength: number;
  goToNextLesson: () => void;
  goToPrevLesson: () => void;
  getActiveLessonTitle: (lessons: Lesson[], id: string) => string;
  lessons: Lesson[];
  completedLessons: string[];
  onLessonComplete: (id?: string) => void;
  isEmployeeSide?: boolean;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  is2DDrawingCourse,
  isFoundationsCourse = false,
  isProfessionalCourse = false,
  courseId,
  activeLessonId,
  currentLessonIndex,
  allLessonIdsLength,
  goToNextLesson,
  goToPrevLesson,
  getActiveLessonTitle,
  lessons,
  completedLessons,
  onLessonComplete,
  isEmployeeSide = false
}) => {
  const { t, language } = useTranslation();
  const [showFoundationReview, setShowFoundationReview] = useState(false);
  const [completionError, setCompletionError] = useState(false);
  const [savingCompletion, setSavingCompletion] = useState(false);
  useEffect(() => { setCompletionError(false); setShowFoundationReview(false); }, [activeLessonId, language]);
  const lessonTitleKey = `lesson.title.${activeLessonId}`;
  const translatedLessonTitle = t(lessonTitleKey);
  let activeLessonTitle = translatedLessonTitle === lessonTitleKey
    ? getActiveLessonTitle(lessons, activeLessonId)
    : translatedLessonTitle;

  // Remove "Lesson X.Y — ", "Module X - ", or "レッスン X.Y — " prefix in English and Japanese
  activeLessonTitle = activeLessonTitle.replace(/^(?:module|lesson|モジュール|レッスン)\s*[\d\.]*\s*(?:—|-|–|:)\s*/i, '').trim();
  const lessonIndicator = t('lesson.indicator')
    .replace('{current}', String(currentLessonIndex + 1))
    .replace('{total}', String(allLessonIdsLength));
  useAuth();
  const { stop, speak, isSpeaking, currentIndex, setCurrentIndex, activeParagraphText } = useTTSContext();
  useEffect(() => {
    stop();
  }, [activeLessonId, stop]);



  const [showQuiz, setShowQuiz] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [, setIsLoadingQuiz] = useState(false);

  const [dbContent, setDbContent] = useState<any[]>([]);
  const [, setIsDbLoading] = useState(false);

  useEffect(() => {
    setShowQuiz(false);
    setDbContent([]);

    // Fetch dynamic content if available
    const fetchDbContent = async () => {
      if (!activeLessonId || isFoundationsCourse || isProfessionalCourse) return;

      setIsDbLoading(true);
      try {
        const res = await api.get(`/courses/lesson/${activeLessonId}/content?t=${Date.now()}`);
        setDbContent(res.data);
      } catch (err) {
        console.error('Failed to fetch DB content:', err);
      } finally {
        setIsDbLoading(false);
      }
    };

    if (activeLessonId && !isFoundationsCourse) {
      fetchDbContent();
    }

    // Restore quiz state for this lesson if it was open
    const savedShowQuiz = localStorage.getItem(authService.getStorageKey(`showQuiz_${activeLessonId}`));
    if (savedShowQuiz === 'true') {
      // Re-fetch quiz data if we're restoring the session
      const restoreQuiz = async () => {
        setIsLoadingQuiz(true);
        try {
          const parentResult = findParentAndQuiz();
          if (parentResult?.parent) {
            const response = await api.get(`/quizzes/${parentResult.parent.id}`);
            setActiveQuiz(response.data);
            setShowQuiz(true);
          }
        } catch (err) {
          console.error('Failed to restore quiz:', err);
          // Fallback to hardcoded quiz
          const parentResult = findParentAndQuiz();
          if (parentResult?.parent?.quiz) {
            setActiveQuiz(parentResult.parent.quiz);
            setShowQuiz(true);
          }
        } finally {
          setIsLoadingQuiz(false);
        }
      };
      restoreQuiz();
    }

    // Comprehensive scroll reset
    const performScrollReset = () => {
      const scrollArea = document.querySelector('.lesson-scroll-area');
      if (scrollArea) {
        scrollArea.scrollTo({ top: 0, behavior: 'instant' });
      }
      // Fallback
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    setTimeout(performScrollReset, 10);
    setTimeout(performScrollReset, 100); // Second pass for slow rendering
  }, [activeLessonId, isFoundationsCourse, isProfessionalCourse]);

  // Persist showQuiz state
  const activeLessonIdRef = useRef(activeLessonId);
  useEffect(() => {
    activeLessonIdRef.current = activeLessonId;
  }, [activeLessonId]);

  useEffect(() => {
    if (activeLessonIdRef.current) {
      localStorage.setItem(authService.getStorageKey(`showQuiz_${activeLessonIdRef.current}`), showQuiz.toString());
    }
  }, [showQuiz]);

  // Dynamic Accessibility Highlight Controller
  useEffect(() => {
    const container = document.querySelector('.course-lesson-container');
    if (!container) return;

    // Retrieve exact same element selectors used for narration scraping to align indices
    const elements = container.querySelectorAll('.section-title, p, .card-header, .step-header, .p-flush');

    // Create a filtered list to match speakCurrent exclusions
    const paragraphs: string[] = [];
    const validElements: HTMLElement[] = [];
    elements.forEach(el => {
      const text = el.textContent?.trim();
      if (text && text.length > 2 && !el.closest('.lesson-navigation') && !el.closest('.lesson-tabs') && !el.closest('.tab-button') && !el.closest('.lesson-video-subtitle')) {
        if (!paragraphs.includes(text)) {
          paragraphs.push(text);
          validElements.push(el as HTMLElement);
        }
      }
    });

    let detectedIndex = -1;

    validElements.forEach((el, idx) => {
      let isMatch = false;
      if (isSpeaking) {
        if (activeParagraphText) {
          const elText = el.textContent?.trim().replace(/\s+/g, ' ');
          const targetText = activeParagraphText.trim().replace(/\s+/g, ' ');
          isMatch = !!(elText && targetText && (elText === targetText || elText.includes(targetText) || targetText.includes(elText)));
        } else {
          isMatch = idx === currentIndex;
        }
      }

      if (isMatch) {
        el.classList.add('tts-active-highlight');
        // Smoothly scroll active narration paragraph into visual context
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Find the closest ancestor (or self) with data-reading-index to correct custom index matching
        const readingIndexEl = el.closest('[data-reading-index]');
        if (readingIndexEl) {
          const attr = readingIndexEl.getAttribute('data-reading-index');
          if (attr) {
            const parsed = parseInt(attr, 10);
            if (!isNaN(parsed)) {
              detectedIndex = parsed;
            }
          }
        }
      } else {
        el.classList.remove('tts-active-highlight');
      }
    });

    if (detectedIndex !== -1 && detectedIndex !== currentIndex) {
      setCurrentIndex(detectedIndex);
    }

    return () => {
      validElements.forEach(el => el.classList.remove('tts-active-highlight'));
    };
  }, [isSpeaking, currentIndex, activeParagraphText, activeLessonId, setCurrentIndex]);

  // Use the passed lessons prop
  const findParentAndQuiz = (): { parent: Lesson; isLastSub: boolean } | null => {
    for (const lesson of lessons) {
      if (lesson.id === activeLessonId) {
        return { parent: lesson, isLastSub: true };
      }
      if (lesson.children) {
        const idx = lesson.children.findIndex(c => c.id === activeLessonId);
        if (idx !== -1) {
          return { parent: lesson, isLastSub: idx === lesson.children.length - 1 };
        }
      }
    }
    return null;
  };

  const parentResult = findParentAndQuiz();
  const hasQuiz = !!(parentResult?.parent?.quiz && parentResult.isLastSub);
  const isModuleCompleted = parentResult?.parent ? completedLessons.includes(parentResult.parent.id) : false;
  const isLastLesson = currentLessonIndex === allLessonIdsLength - 1;
  const nextLabel = (isLastLesson || parentResult?.isLastSub || !parentResult?.parent?.children)
    ? t('lesson.next_lesson')
    : t('common.next');

  const handleQuizComplete = async (score: number, detailedAnswers?: any[]) => {
    if (!parentResult?.parent) return;
    const lessonIdToClear = parentResult.parent.id;
    try {
      await api.post('/auth/submit-quiz', {
        course_id: courseId,
        lesson_id: lessonIdToClear,
        score: score,
        answers: detailedAnswers
      });
      if (score >= 80) {
        localStorage.removeItem(authService.getStorageKey(`showQuiz_${lessonIdToClear}`));
        onLessonComplete(lessonIdToClear);
        setTimeout(() => {
          setShowQuiz(prev => {
            if (prev) {
              localStorage.removeItem(authService.getStorageKey(`showQuiz_${lessonIdToClear}`));
              goToNextLesson();
              return false;
            }
            return false;
          });
        }, 5000);
      }
    } catch (err) {
      console.error('Failed to submit quiz score:', err);
    }
  };

  const handleQuizSuccessContinue = () => {
    if (parentResult?.parent) {
      localStorage.removeItem(authService.getStorageKey(`showQuiz_${parentResult.parent.id}`));
    }
    setShowQuiz(false);
    goToNextLesson();
  };

  const handleInteractiveLessonComplete = useCallback(async () => {
    await api.post('/auth/submit-quiz', {
      course_id: courseId,
      lesson_id: isFoundationsCourse ? (resolveFoundationLesson(activeLessonId)?.id || activeLessonId) : activeLessonId,
      score: 100,
      answers: [],
    });
    onLessonComplete(isFoundationsCourse ? (resolveFoundationLesson(activeLessonId)?.id || activeLessonId) : activeLessonId);
  }, [activeLessonId, courseId, onLessonComplete, isFoundationsCourse]);

  const handleNextAction = async () => {
    if (isFoundationsCourse && resolveFoundationLesson(activeLessonId)) {
      const canonical = resolveFoundationLesson(activeLessonId)!;
      if (canonical.recapMode === 'embedded-or-reading-review' && !showFoundationReview) {
        setShowFoundationReview(true);
        speak([foundationRecap(canonical.id, language === 'ja' ? 'ja' : 'en')!.narration], 0);
        return;
      }
      stop();
      if (savingCompletion) return;
      setSavingCompletion(true); setCompletionError(false);
      try { await handleInteractiveLessonComplete(); goToNextLesson(); }
      catch { setCompletionError(true); }
      finally { setSavingCompletion(false); }
      return;
    }
    if (hasQuiz && !isModuleCompleted && !isEmployeeSide) {
      setIsLoadingQuiz(true);
      try {
        const response = await api.get(`/quizzes/${parentResult.parent.id}`);
        setActiveQuiz(response.data);
        setShowQuiz(true);
      } catch (err) {
        console.error('Failed to fetch quiz:', err);
        // Fallback to hardcoded quiz if API fails
        setActiveQuiz(parentResult.parent.quiz);
        setShowQuiz(true);
      } finally {
        setIsLoadingQuiz(false);
      }
    } else {
      goToNextLesson();
    }
  };

  // Only pass onPrevLesson if there is a previous lesson
  const handlePrevAction = currentLessonIndex > 0 ? goToPrevLesson : undefined;

  return (
    <main className="main-content-viewer">
      <div className="lesson-split-layout">
        <div className="lesson-scroll-area">

          {completionError && <div role="alert">
            <p>{language === 'ja' ? '学習記録を保存できませんでした。再試行してください。' : 'Completion could not be saved. Retry to continue.'}</p>
            <button disabled={savingCompletion} onClick={handleNextAction}>{language === 'ja' ? '再試行' : 'Retry'}</button>
          </div>}
          <div className="lesson-header-banner">
            <p className="lesson-indicator">{lessonIndicator}</p>
            <h2 className="lesson-banner-title">
              {activeLessonTitle}
            </h2>
            <div className="lesson-banner-divider"></div>
          </div>

          <div key={activeLessonId} className={`lesson-content-body ${isFoundationsCourse || isProfessionalCourse ? 'foundations-lesson-content-body' : ''}`}>
            <FoundationCompletionContext.Provider value={isFoundationsCourse || isProfessionalCourse ? {
              complete: handleInteractiveLessonComplete, advance: goToNextLesson, nextLabel: language === 'ja' ? '次へ' : 'Next',
            } : null}>
              <Suspense fallback={
                <div className="lesson-loading-fallback" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '350px', width: '100%' }}>
                  <div className="fallback-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--text-dim)' }}>
                    <Loader2 className="animate-spin" size={48} style={{ color: 'var(--color-primary)' }} />
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500 }}>Preparing lesson modules...</p>
                  </div>
                </div>
              }>
                {(() => {
                  // Canonical routing is allowlisted before any legacy/prefix routing.
                  if (isFoundationsCourse || isProfessionalCourse) {
                    // Professional lessons render with their Foundations source layout; completion keeps the P id.
                    const canonical = isProfessionalCourse ? professionalRenderLesson(activeLessonId) : resolveFoundationLesson(activeLessonId);
                    const completionId = isProfessionalCourse ? activeLessonId : canonical?.id || '';
                    if (!canonical) return <div role="status">
                      <p>{language === 'ja' ? 'この旧レッスンは基礎コースの対象外です。サイドバーからレッスンを選んでください。学習記録は保持されています。' : 'This legacy lesson is no longer part of Foundations. Choose a lesson from the sidebar. Your previous records are preserved.'}</p>
                    </div>;
                    const renderer = canonical.renderer;
                    if (canonical.id === 'F4.1') {
                      const original = PRESERVED_FOUNDATIONS_LESSONS.flatMap(module => module.children || [module]).find(lesson => lesson.id === 'lesson-4-1')!;
                      return <FoundationReadingLesson key={canonical.id + language} lesson={canonical} completed={completedLessons.includes(completionId)}
                        onComplete={handleInteractiveLessonComplete} onNext={goToNextLesson} onPrevious={handlePrevAction} isLast={false}
                        tutorial={<FoundationCompletionContext.Provider value={null}><div className="foundations-zoom-tutorial"><DynamicFoundationsLesson {...getDynamicFoundationsLessonProps({ ...original, content: original.content || [] })} /></div></FoundationCompletionContext.Provider>} />;
                    }
                    if (canonical.id === 'F3.6') return <FoundationReadingLesson key={canonical.id + language} lesson={canonical} completed={completedLessons.includes(completionId)}
                      onComplete={handleInteractiveLessonComplete} onNext={goToNextLesson} onPrevious={handlePrevAction} isLast={false}
                      tutorial={<div className="foundations-zoom-tutorial"><RotateViewInteractiveLesson /></div>} />;
                    if (canonical.id === 'F3.5') return <FoundationReadingLesson key={canonical.id + language} lesson={canonical} completed={completedLessons.includes(completionId)}
                      onComplete={handleInteractiveLessonComplete} onNext={goToNextLesson} onPrevious={handlePrevAction} isLast={false}
                      tutorial={<div className="foundations-zoom-tutorial"><PanInteractiveLesson /></div>} />;
                    if (canonical.id === 'F2.9') return <FoundationReadingLesson key={canonical.id + language} lesson={canonical} completed={completedLessons.includes(completionId)}
                      onComplete={handleInteractiveLessonComplete} onNext={goToNextLesson} onPrevious={handlePrevAction} isLast={false}
                      tutorial={<FoundationCompletionContext.Provider value={null}><ToolBarsLesson tutorialOnly /></FoundationCompletionContext.Provider>} />;
                    if (canonical.id === 'F2.1') return <FoundationReadingLesson key={canonical.id + language} lesson={canonical} completed={completedLessons.includes(completionId)}
                      onComplete={handleInteractiveLessonComplete} onNext={goToNextLesson} onPrevious={handlePrevAction} isLast={false}
                      tutorial={<FoundationCompletionContext.Provider value={null}><IcadInterfaceLesson tutorialOnly /></FoundationCompletionContext.Provider>} />;
                    if (!renderer || canonical.id === 'F5.4') return <FoundationReadingLesson key={canonical.id + language} lesson={canonical} completed={completedLessons.includes(completionId)}
                      onComplete={handleInteractiveLessonComplete} onNext={goToNextLesson}
                      onPrevious={handlePrevAction} isLast={canonical.id === 'F17.2'} />;
                    const op2Map: Record<string, string> = {
                      'basic-op-move': 'lesson-6-1',
                      'basic-op-rotate': 'lesson-6-2',
                      'basic-op-mirror': 'lesson-6-3',
                      'basic-op-copy': 'lesson-6-4',
                      'basic-op-rotateCopy': 'lesson-6-5',
                      'basic-op-mirrorCopy': 'lesson-6-6',
                      'basic-op-delete': 'lesson-6-7',
                    };
                    const effectiveRenderer = op2Map[renderer] || renderer;
                    const source = PRESERVED_FOUNDATIONS_LESSONS.flatMap(module => module.children || [module]).find(lesson => lesson.id === effectiveRenderer);
                    const preservedTutorial = effectiveRenderer.startsWith('basic-op-')
                      ? <BasicOperationLesson subLessonId={effectiveRenderer} hideSketchIntro={canonical.id === 'P9.1' || canonical.sourceProfessionalLessonId === 'P9.1'} />
                      : source ? <DynamicFoundationsLesson {...getDynamicFoundationsLessonProps({ ...source, content: source.content || [] })} /> : null;
                    return <FoundationReadingLesson key={canonical.id + language} lesson={canonical} completed={completedLessons.includes(completionId)}
                      onComplete={handleInteractiveLessonComplete} onNext={goToNextLesson} onPrevious={handlePrevAction} isLast={canonical.id === 'F17.2'}
                      tutorial={preservedTutorial && <FoundationCompletionContext.Provider value={null}><div className="foundations-zoom-tutorial">{preservedTutorial}</div></FoundationCompletionContext.Provider>} />;

                  }

                  // Check for dynamic DB content as primary fallback
                  if (dbContent.length > 0) {
                    return (
                      <div className="dynamic-lesson-view">
                        <div className="modular-content">
                          {dbContent.map((item, idx) => (
                            <div key={idx} className={`content-block ${item.content_type}`}>
                              {item.content_type === 'text' && <p className="instruction-text">{item.data}</p>}
                              {item.content_type === 'image' && <img className="instruction-image" src={item.data} alt="Curriculum Fig" />}
                            </div>
                          ))}
                        </div>
                        <div className="lesson-navigation" style={{ marginTop: '3rem', justifyContent: 'center', gap: '1.5rem' }}>
                          <button className="nav-button" onClick={goToPrevLesson}>
                            <ChevronLeft size={18} /> Previous Module
                          </button>
                          <button className="nav-button next" onClick={handleNextAction}>
                            {nextLabel} <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  }

                  if (is2DDrawingCourse) {
                    return (
                      <div className="content-2d-placeholder">
                        <BookOpen size={48} strokeWidth={1.5} />
                        <h3 className="content-2d-placeholder__title">iCAD Operation Manual 2D Detailing</h3>
                        <p className="content-2d-placeholder__text">Content will be available soon.</p>

                        <div className="lesson-navigation" style={{ marginTop: '2rem', justifyContent: 'center', gap: '1rem' }}>
                          <button className="nav-button" onClick={goToPrevLesson}>
                            <ChevronLeft size={18} /> Previous
                          </button>
                          <button className="nav-button next" onClick={handleNextAction}>
                            {nextLabel} <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div className="content-placeholder">
                      <Video size={48} className="content-placeholder__icon" />
                      <p>{t('lesson.coming_soon')} <strong>{activeLessonId}</strong></p>
                      <p className="content-placeholder__note">
                        This area will host the instructional text, video demonstrations, and active testing prompts.
                      </p>

                      <div className="lesson-navigation" style={{ marginTop: '2rem', justifyContent: 'center', gap: '1rem' }}>
                        <button className="nav-button" onClick={goToPrevLesson}>
                          <ChevronLeft size={18} /> Previous
                        </button>
                        <button className="nav-button next" onClick={handleNextAction}>
                          {nextLabel} <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </Suspense>
            </FoundationCompletionContext.Provider>
            {showFoundationReview && <div className="foundations-recap-overlay"><LessonRecapPanel
              summary={foundationRecap(activeLessonId, language === 'ja' ? 'ja' : 'en')!.narration}
              items={foundationRecap(activeLessonId, language === 'ja' ? 'ja' : 'en')!.items}
              actionLabel={language === 'ja' ? '次へ' : 'Next'} onAction={handleNextAction} disabled={savingCompletion}
              error={completionError ? (language === 'ja' ? '保存できませんでした。もう一度お試しください。' : 'Completion could not be saved. Please try again.') : undefined} /></div>}


            {/* Premium Quiz Modal */}
            {showQuiz && hasQuiz && (activeQuiz || parentResult?.parent?.quiz) && (
              <QuizModal
                isOpen={showQuiz}
                onClose={() => {
                  if (parentResult?.parent) {
                    localStorage.removeItem(authService.getStorageKey(`showQuiz_${parentResult.parent.id}`));
                  }
                  setShowQuiz(false);
                }}
                quiz={activeQuiz || parentResult?.parent?.quiz}
                lessonId={parentResult.parent.id}
                onComplete={handleQuizComplete}
                onSuccessContinue={handleQuizSuccessContinue}
              />
            )}
          </div>

        </div> {/* End of lesson-scroll-area */}


      </div> {/* End of lesson-split-layout */}
    </main>
  );
};
