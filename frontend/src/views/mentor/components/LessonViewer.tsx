import React, { useEffect, useState, useRef, useCallback, lazy, Suspense } from 'react';
import { ChevronRight, ChevronLeft, Menu, BookOpen, Video, Brain, Loader2 } from 'lucide-react'; import { Course } from '../../../types';
import { useUI } from '../../../context/UIContext'; import { useAuth } from '../../../hooks/useAuth';
import { Lesson, Quiz as QuizType } from '../mentorConstants'; import { QuizModal } from './QuizModal';
import api from '../../../services/api';
import { IntelligenceChatbot } from '../../admin/components/IntelligenceChatbot';

// 3D Lesson Imports (Lazy Loaded)
const IcadInterfaceLesson = lazy(() => import('../../../components/3D_Modeling/3D_iCadInterface'));
const ToolBarsLesson = lazy(() => import('../../../components/3D_Modeling/3D_ToolBars'));
const OriginLesson = lazy(() => import('../../../components/3D_Modeling/3D_Origin'));
const BasicOperationLesson = lazy(() => import('../../../components/3D_Modeling/3D_BasicOperation'));
const TwoDTo3DLesson = lazy(() => import('../../../components/3D_Modeling/3D_2Dto3D'));
const HoleDetailsLesson = lazy(() => import('../../../components/3D_Modeling/3D_HoleDetails'));
const BooleanLesson = lazy(() => import('../../../components/3D_Modeling/3D_Boolean'));
const ComponentLesson = lazy(() => import('../../../components/3D_Modeling/3D_Component'));
const FairingLesson = lazy(() => import('../../../components/3D_Modeling/3D_Fairing'));
const PartLesson = lazy(() => import('../../../components/3D_Modeling/3D_Part'));
const MaterialSettingLesson = lazy(() => import('../../../components/3D_Modeling/3D_MaterialSetting'));
const PropertiesLesson = lazy(() => import('../../../components/3D_Modeling/3D_Properties'));
const AnnotationLesson = lazy(() => import('../../../components/3D_Modeling/3D_Annotation'));
const InterferenceLesson = lazy(() => import('../../../components/3D_Modeling/3D_Interference'));
const PurchasePartsLesson = lazy(() => import('../../../components/3D_Modeling/3D_PurchaseParts'));
const ParasolidLesson = lazy(() => import('../../../components/3D_Modeling/3D_Parasolid'));
const OperationSampleLesson = lazy(() => import('../../../components/3D_Modeling/3D_OperationSample'));
const MirroredPartLesson = lazy(() => import('../../../components/3D_Modeling/3D_MirroredPart'));
const StandardLesson = lazy(() => import('../../../components/3D_Modeling/3D_Standard'));

// 2D Lesson Imports (Lazy Loaded)
const OrthographicViewLesson = lazy(() => import('../../../components/2D_Drawing/2D_OrthographicView'));
const CommandMenuLesson = lazy(() => import('../../../components/2D_Drawing/2D_CommandMenu'));
const LinePropertiesLesson = lazy(() => import('../../../components/2D_Drawing/2D_LineProperties'));
const DimensioningLesson = lazy(() => import('../../../components/2D_Drawing/2D_Dimensioning'));
const StandardPartLesson = lazy(() => import('../../../components/2D_Drawing/2D_StandardPart'));
const SurfaceApplicationLesson = lazy(() => import('../../../components/2D_Drawing/2D_SurfaceApplication'));
const KeywayLesson = lazy(() => import('../../../components/2D_Drawing/2D_Keyway'));
const RetainingRingLesson = lazy(() => import('../../../components/2D_Drawing/2D_RetainingRing'));
const GeometricToleranceLesson = lazy(() => import('../../../components/2D_Drawing/2D_GeometricTolerance'));
const PartNoteLesson = lazy(() => import('../../../components/2D_Drawing/2D_PartNote'));
const MachiningSymbolLesson = lazy(() => import('../../../components/2D_Drawing/2D_MachiningSymbol'));
const WeldingSymbolLesson = lazy(() => import('../../../components/2D_Drawing/2D_WeldingSymbol'));
const HeatTreatmentLesson = lazy(() => import('../../../components/2D_Drawing/2D_HeatTreatment'));
const SurfaceCoatingLesson = lazy(() => import('../../../components/2D_Drawing/2D_SurfaceCoating'));
const WeightComputationLesson = lazy(() => import('../../../components/2D_Drawing/2D_WeightComputation'));
const BillOfMaterialLesson = lazy(() => import('../../../components/2D_Drawing/2D_BillOfMaterial'));
const BalloonLesson = lazy(() => import('../../../components/2D_Drawing/2D_Balloon'));
const TitleBlockLesson = lazy(() => import('../../../components/2D_Drawing/2D_Titleblock'));
const AdditionalViewLesson = lazy(() => import('../../../components/2D_Drawing/2D_AdditionalView'));
const OperalViewLesson = lazy(() => import('../../../components/2D_Drawing/2D_OperalView'));
const NormalMirrorPartsLesson = lazy(() => import('../../../components/2D_Drawing/2D_NormalMirrorParts'));
const RevisionCodeLesson = lazy(() => import('../../../components/2D_Drawing/2D_RevisionCode'));
const StandardLibraryLesson = lazy(() => import('../../../components/2D_Drawing/2D_StandardLibrary'));

interface LessonViewerProps {
  is2DDrawingCourse: boolean;
  activeLessonId: string;
  currentLessonIndex: number;
  allLessonIdsLength: number;
  goToNextLesson: () => void;
  goToPrevLesson: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setSelectedCourse: (course: Course | null) => void;
  getActiveLessonTitle: (lessons: Lesson[], id: string) => string;
  ICAD_2D_LESSONS: Lesson[];
  ICAD_3D_LESSONS: Lesson[];
  completedLessons: string[];
  onLessonComplete: (id?: string) => void;
  isEmployeeSide?: boolean;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  is2DDrawingCourse,
  activeLessonId,
  currentLessonIndex,
  allLessonIdsLength,
  goToNextLesson,
  goToPrevLesson,
  sidebarOpen,
  setSidebarOpen,
  setSelectedCourse,
  getActiveLessonTitle,
  ICAD_2D_LESSONS,
  ICAD_3D_LESSONS,
  completedLessons,
  onLessonComplete,
  isEmployeeSide = false
}) => {
  const { requestConfirmation } = useUI();
  const { user } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

  // Chatbot Resizer & Toggle State
  const [isChatbotOpen, setIsChatbotOpen] = useState(true);
  const [chatbotWidth, setChatbotWidth] = useState(300);
  const [dbContent, setDbContent] = useState<any[]>([]);
  const [isDbLoading, setIsDbLoading] = useState(false);
  const isDragging = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const newWidth = document.body.clientWidth - e.clientX;
    if (newWidth >= 300 && newWidth <= 800) {
      setChatbotWidth(newWidth);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      document.body.style.cursor = 'default';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('is-dragging');
    }
  }, [handleMouseMove]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.classList.add('is-dragging');
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    setShowQuiz(false);
    setDbContent([]);
    
    // Fetch dynamic content if available
    const fetchDbContent = async () => {
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
    
    fetchDbContent();
    
    // Restore quiz state for this lesson if it was open
    const savedShowQuiz = localStorage.getItem(`kmti_showQuiz_${activeLessonId}`);
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
  }, [activeLessonId]);

  // Persist showQuiz state
  useEffect(() => {
    if (activeLessonId) {
      localStorage.setItem(`kmti_showQuiz_${activeLessonId}`, showQuiz.toString());
    }
  }, [showQuiz, activeLessonId]);

  const handleExitCourse = async () => {
    const confirmed = await requestConfirmation({
      title: 'SUSPEND LEARNING SESSION',
      message: 'Are you sure you want to disconnect? Your current progress has been safely synchronized. You will be returned to the module hub.',
      confirmText: 'Suspend Session',
      type: 'info'
    });
    if (confirmed) {
      setSelectedCourse(null);
    }
  };

  const lessons = is2DDrawingCourse ? ICAD_2D_LESSONS : ICAD_3D_LESSONS;
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
  const nextLabel = (hasQuiz && !isModuleCompleted && !isEmployeeSide) ? 'Continue' : 'Next Lesson';

  const handleQuizComplete = async (score: number, detailedAnswers?: any[]) => {
    if (!parentResult?.parent) return;
    try {
      await api.post('/auth/submit-quiz', {
        course_id: is2DDrawingCourse ? '2' : '1',
        lesson_id: parentResult.parent.id,
        score: score,
        answers: detailedAnswers
      });
      if (score >= 80) {
        onLessonComplete(parentResult.parent.id);
        setTimeout(() => {
          setShowQuiz(prev => {
            if (prev) {
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
    setShowQuiz(false);
    goToNextLesson();
  };

  const handleNextAction = async () => {
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

  return (
    <main className="main-content-viewer">
      <div className="sticky-lesson-controls" style={{ justifyContent: 'flex-end', gap: '0.75rem' }}>
        <button
          className="exit-course-btn"
          style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        >
          <Brain size={16} style={{ marginRight: '0.5rem' }} />
          {isChatbotOpen ? 'CLOSE AI' : 'ASSISTANT'}
        </button>
        <button className="exit-course-btn" onClick={handleExitCourse}>
          EXIT COURSE
        </button>
      </div>

      <div className="lesson-split-layout">
        <div className="lesson-scroll-area">
          <div className="lesson-header-banner">
            <p className="lesson-indicator">Lesson {currentLessonIndex + 1} of {allLessonIdsLength}</p>
            <h2 className="lesson-banner-title">
              {getActiveLessonTitle(lessons, activeLessonId)}
            </h2>
            <div className="lesson-banner-divider"></div>
          </div>

          <div className="lesson-content-body">
            <Suspense fallback={
              <div className="lesson-loading-fallback">
                <div className="fallback-card">
                  <Loader2 className="animate-spin" size={48} />
                  <p>Preparing lesson modules...</p>
                </div>
              </div>
            }>
              {(() => {
                const registry: Record<string, () => React.ReactNode> = {
                  'interface': () => <IcadInterfaceLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  'toolbars': () => <ToolBarsLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  'origin': () => <div className="origin-lesson-container"><OriginLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} /></div>,
                  'hole-details': () => <HoleDetailsLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  'interference': () => <InterferenceLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                };

                const prefixRegistry: Record<string, (id: string) => React.ReactNode> = {
                  'fairing': () => <FairingLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  'basic-op': (id) => <BasicOperationLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-3d': (id) => <TwoDTo3DLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '3d-part': (id) => <PartLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  'material': (id) => <MaterialSettingLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  'properties': (id) => <PropertiesLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  'annotation': () => <AnnotationLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  'boolean': (id) => <BooleanLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  'component': (id) => <ComponentLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  'purchase-parts': (id) => <PurchasePartsLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  'parasolid': (id) => <ParasolidLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  'op-sample': (id) => <OperationSampleLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  'mirrored': (id) => <MirroredPartLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  'standard': (id) => <StandardLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-orthographic': (id) => <OrthographicViewLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-command-menu': (id) => <CommandMenuLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-line-props': (id) => <LinePropertiesLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-dimensioning': (id) => <DimensioningLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-standard-part': (id) => <StandardPartLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-surface-app': (id) => <SurfaceApplicationLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-retaining-ring': (id) => <RetainingRingLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-geometric-tol': (id) => <GeometricToleranceLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-heat-treatment': (id) => <HeatTreatmentLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-bom': (id) => <BillOfMaterialLesson subLessonId={id.split('-').pop()} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-additional-view': (id) => <AdditionalViewLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-operal-view': (id) => <OperalViewLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-normal-mirror': (id) => <NormalMirrorPartsLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-balloon': () => <BalloonLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-titleblock': () => <TitleBlockLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-keyway': () => <KeywayLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-part-note': () => <PartNoteLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-machining-symbol': () => <MachiningSymbolLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-welding-symbol': () => <WeldingSymbolLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-surface-coating': () => <SurfaceCoatingLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-weight-computation': () => <WeightComputationLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-revision-code': () => <RevisionCodeLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                  '2d-standard-library': () => <StandardLibraryLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
                };

                const exactMatch = activeLessonId ? registry[activeLessonId] : null;
                if (exactMatch) return exactMatch();

                // Try exact match in prefixRegistry first (for lessons with dashes in name but no sub-lesson suffix)
                if (activeLessonId && typeof prefixRegistry[activeLessonId] === 'function') {
                  return prefixRegistry[activeLessonId](activeLessonId);
                }

                const prefix = activeLessonId?.includes('-') 
                  ? activeLessonId.substring(0, activeLessonId.lastIndexOf('-')) 
                  : activeLessonId;

                if (prefix && activeLessonId && typeof prefixRegistry[prefix] === 'function') {
                  return prefixRegistry[prefix](activeLessonId);
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
                      <h3 className="content-2d-placeholder__title">iCAD Operation Manual 2D Drawing</h3>
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
                    <p>Lesson content for <strong>{activeLessonId}</strong> will be provided soon.</p>
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


            {/* Premium Quiz Modal */}
            {hasQuiz && (activeQuiz || parentResult?.parent?.quiz) && (
              <QuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)}
                quiz={activeQuiz || parentResult?.parent?.quiz}
                onComplete={handleQuizComplete}
                onSuccessContinue={handleQuizSuccessContinue}
              />
            )}
          </div>

        </div> {/* End of lesson-scroll-area */}

        {isChatbotOpen && (
          <>
            <div
              className="chatbot-resizer"
              onMouseDown={handleMouseDown}
            />
            <aside className="lesson-chatbot-sidebar" style={{ width: `${chatbotWidth}px` }}>
              <IntelligenceChatbot />
            </aside>
          </>
        )}
      </div> {/* End of lesson-split-layout */}
    </main>
  );
};
