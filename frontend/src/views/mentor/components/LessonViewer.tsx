import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronRight, ChevronLeft, Menu, BookOpen, Video, Brain } from 'lucide-react'; import { Course } from '../../../types';
import { useUI } from '../../../context/UIContext'; import { useAuth } from '../../../hooks/useAuth';
import { Lesson, Quiz as QuizType } from '../mentorConstants'; import { QuizModal } from './QuizModal';
import api from '../../../services/api';
import { IntelligenceChatbot } from '../../admin/components/IntelligenceChatbot';

// 3D Lesson Imports
import IcadInterfaceLesson from '../../../components/3D_Modeling/3D_iCadInterface';
import ToolBarsLesson from '../../../components/3D_Modeling/3D_ToolBars';
import OriginLesson from '../../../components/3D_Modeling/3D_Origin';
import BasicOperationLesson from '../../../components/3D_Modeling/3D_BasicOperation';
import TwoDTo3DLesson from '../../../components/3D_Modeling/3D_2Dto3D';
import HoleDetailsLesson from '../../../components/3D_Modeling/3D_HoleDetails';
import BooleanLesson from '../../../components/3D_Modeling/3D_Boolean';
import ComponentLesson from '../../../components/3D_Modeling/3D_Component';
import FairingLesson from '../../../components/3D_Modeling/3D_Fairing';
import PartLesson from '../../../components/3D_Modeling/3D_Part';
import MaterialSettingLesson from '../../../components/3D_Modeling/3D_MaterialSetting';
import PropertiesLesson from '../../../components/3D_Modeling/3D_Properties';
import AnnotationLesson from '../../../components/3D_Modeling/3D_Annotation';
import InterferenceLesson from '../../../components/3D_Modeling/3D_Interference';
import PurchasePartsLesson from '../../../components/3D_Modeling/3D_PurchaseParts';
import ParasolidLesson from '../../../components/3D_Modeling/3D_Parasolid';
import OperationSampleLesson from '../../../components/3D_Modeling/3D_OperationSample';
import MirroredPartLesson from '../../../components/3D_Modeling/3D_MirroredPart';
import StandardLesson from '../../../components/3D_Modeling/3D_Standard';

// 2D Lesson Imports
import OrthographicViewLesson from '../../../components/2D_Drawing/2D_OrthographicView';
import CommandMenuLesson from '../../../components/2D_Drawing/2D_CommandMenu';
import LinePropertiesLesson from '../../../components/2D_Drawing/2D_LineProperties';
import DimensioningLesson from '../../../components/2D_Drawing/2D_Dimensioning';
import StandardPartLesson from '../../../components/2D_Drawing/2D_StandardPart';
import SurfaceApplicationLesson from '../../../components/2D_Drawing/2D_SurfaceApplication';
import KeywayLesson from '../../../components/2D_Drawing/2D_Keyway';
import RetainingRingLesson from '../../../components/2D_Drawing/2D_RetainingRing';
import GeometricToleranceLesson from '../../../components/2D_Drawing/2D_GeometricTolerance';
import PartNoteLesson from '../../../components/2D_Drawing/2D_PartNote';
import MachiningSymbolLesson from '../../../components/2D_Drawing/2D_MachiningSymbol';
import WeldingSymbolLesson from '../../../components/2D_Drawing/2D_WeldingSymbol';
import HeatTreatmentLesson from '../../../components/2D_Drawing/2D_HeatTreatment';
import SurfaceCoatingLesson from '../../../components/2D_Drawing/2D_SurfaceCoating';
import WeightComputationLesson from '../../../components/2D_Drawing/2D_WeightComputation';
import BillOfMaterialLesson from '../../../components/2D_Drawing/2D_BillOfMaterial';
import BalloonLesson from '../../../components/2D_Drawing/2D_Balloon';
import TitleBlockLesson from '../../../components/2D_Drawing/2D_Titleblock';
import AdditionalViewLesson from '../../../components/2D_Drawing/2D_AdditionalView';
import OperalViewLesson from '../../../components/2D_Drawing/2D_OperalView';
import NormalMirrorPartsLesson from '../../../components/2D_Drawing/2D_NormalMirrorParts';
import RevisionCodeLesson from '../../../components/2D_Drawing/2D_RevisionCode';
import StandardLibraryLesson from '../../../components/2D_Drawing/2D_StandardLibrary';

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

  // Chatbot Resizer & Toggle State
  const [isChatbotOpen, setIsChatbotOpen] = useState(true);
  const [chatbotWidth, setChatbotWidth] = useState(300);
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
    setTimeout(() => {
      const tabsEl = document.querySelector('.lesson-tabs');
      if (tabsEl) {
        tabsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const introEl = document.querySelector('.lesson-intro');
        if (introEl) {
          introEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          const scrollContainer = document.querySelector('.main-content-viewer');
          if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }, 50);
  }, [activeLessonId]);

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

  const handleQuizComplete = async (score: number) => {
    if (!parentResult?.parent) return;
    try {
      await api.post('/auth/submit-quiz', {
        course_id: is2DDrawingCourse ? '2' : '1',
        lesson_id: parentResult.parent.id,
        score: score
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

  const handleNextAction = () => {
    if (hasQuiz && !isModuleCompleted && !isEmployeeSide) {
      setShowQuiz(true);
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
        {
          (() => {
            const registry: Record<string, () => React.ReactNode> = {
              'interface': () => <IcadInterfaceLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
              'toolbars': () => <ToolBarsLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
              'origin': () => <div className="origin-lesson-container"><OriginLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} /></div>,
              'hole-details': () => <HoleDetailsLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
              'fairing': () => <FairingLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
              'interference': () => <InterferenceLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
            };

            const prefixRegistry: Record<string, (id: string) => React.ReactNode> = {
              'basic-op': (id) => <BasicOperationLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
              '2d-3d': (id) => <TwoDTo3DLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
              '3d-part': (id) => <PartLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
              'material': (id) => <MaterialSettingLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
              'properties': (id) => <PropertiesLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
              'annotation': (id) => <AnnotationLesson subLessonId={id} onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />,
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
            };

            const exactMatch = activeLessonId ? registry[activeLessonId] : null;
            if (exactMatch) return exactMatch();

            const prefix = Object.keys(prefixRegistry).find(p => activeLessonId && activeLessonId.startsWith(p + '-'));
            if (prefix && activeLessonId) return prefixRegistry[prefix](activeLessonId);

            if (is2DDrawingCourse) {
              switch (activeLessonId) {
                case '2d-keyway': return <KeywayLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />;
                case '2d-part-note': return <PartNoteLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />;
                case '2d-machining-symbol': return <MachiningSymbolLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />;
                case '2d-welding-symbol': return <WeldingSymbolLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />;
                case '2d-surface-coating': return <SurfaceCoatingLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />;
                case '2d-weight-computation': return <WeightComputationLesson />;
                case '2d-balloon': return <BalloonLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />;
                case '2d-titleblock': return <TitleBlockLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />;
                case '2d-revision-code': return <RevisionCodeLesson />;
                case '2d-standard-library': return <StandardLibraryLesson onNextLesson={handleNextAction} onPrevLesson={goToPrevLesson} nextLabel={nextLabel} />;
                default:
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
          })()
        }


        {/* Premium Quiz Modal */}
        {parentResult?.parent?.quiz && (
          <QuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)}
            quiz={parentResult.parent.quiz}
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
