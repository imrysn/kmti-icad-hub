import React, { useEffect } from 'react';
import { ChevronRight, Menu, BookOpen, Video } from 'lucide-react';
import { Course } from '../../../types';
import { useUI } from '../../../context/UIContext';
import { Lesson } from '../mentorConstants';

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
import TitleblockLesson from '../../../components/2D_Drawing/2D_Titleblock';
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
    ICAD_3D_LESSONS
}) => {
    const { requestConfirmation } = useUI();

    useEffect(() => {
        // Wait a tick for the new lesson component DOM to mount
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
            title: 'Exit Course',
            message: 'Are you sure you want to exit? Your progress in this session will be saved, but you will return to the selection screen.',
            confirmText: 'Exit',
            type: 'info'
        });
        if (confirmed) {
            setSelectedCourse(null);
        }
    };

    return (
        <main className="main-content-viewer">
            <div className="sticky-lesson-controls">
                <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Menu size={20} />
                </button>
                <button className="exit-course-btn" onClick={handleExitCourse}>
                    EXIT COURSE
                </button>
            </div>

            <div className="lesson-header-banner">
                <p className="lesson-indicator">Lesson {currentLessonIndex + 1} of {allLessonIdsLength}</p>
                <h2 className="lesson-banner-title">{getActiveLessonTitle(is2DDrawingCourse ? ICAD_2D_LESSONS : ICAD_3D_LESSONS, activeLessonId)}</h2>
                <div className="lesson-banner-divider"></div>
            </div>

            <div className="lesson-content-body">
                {
                    (() => {
                        const registry: Record<string, () => React.ReactNode> = {
                            'interface': () => <IcadInterfaceLesson onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            'toolbars': () => <ToolBarsLesson onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            'origin': () => <div className="origin-lesson-container"><OriginLesson onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} /></div>,
                            'hole-details': () => <HoleDetailsLesson onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            'fairing': () => <FairingLesson onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            'interference': () => <InterferenceLesson onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                        };

                        const prefixRegistry: Record<string, (id: string) => React.ReactNode> = {
                            'basic-op': (id) => <BasicOperationLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            '2d-3d': (id) => <TwoDTo3DLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            '3d-part': (id) => <PartLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            'material': (id) => <MaterialSettingLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            'properties': (id) => <PropertiesLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            'annotation': (id) => <AnnotationLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            'boolean': (id) => <BooleanLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            'component': (id) => <ComponentLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            'purchase-parts': (id) => <PurchasePartsLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            'parasolid': (id) => <ParasolidLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            'op-sample': (id) => <OperationSampleLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            'mirrored': (id) => <MirroredPartLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            'standard': (id) => <StandardLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            '2d-orthographic': (id) => <OrthographicViewLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            '2d-command-menu': (id) => <CommandMenuLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            '2d-line-props': (id) => <LinePropertiesLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            '2d-dimensioning': (id) => <DimensioningLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            '2d-standard-part': (id) => <StandardPartLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            '2d-surface-app': (id) => <SurfaceApplicationLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            '2d-retaining-ring': (id) => <RetainingRingLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            '2d-geometric-tol': (id) => <GeometricToleranceLesson subLessonId={id} onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />,
                            '2d-heat-treatment': () => <HeatTreatmentLesson />,
                            '2d-bom': () => <BillOfMaterialLesson />,
                            '2d-additional-view': () => <AdditionalViewLesson />,
                            '2d-operal-view': () => <OperalViewLesson />,
                            '2d-normal-mirror': () => <NormalMirrorPartsLesson />,
                        };

                        const exactMatch = activeLessonId ? registry[activeLessonId] : null;
                        if (exactMatch) return exactMatch();

                        const prefix = Object.keys(prefixRegistry).find(p => activeLessonId && activeLessonId.startsWith(p + '-'));
                        if (prefix && activeLessonId) return prefixRegistry[prefix](activeLessonId);

                        if (is2DDrawingCourse) {
                            switch (activeLessonId) {
                                case '2d-keyway': return <KeywayLesson onNextLesson={goToNextLesson} onPrevLesson={goToPrevLesson} />;
                                case '2d-part-note': return <PartNoteLesson />;
                                case '2d-machining-symbol': return <MachiningSymbolLesson />;
                                case '2d-welding-symbol': return <WeldingSymbolLesson />;
                                case '2d-surface-coating': return <SurfaceCoatingLesson />;
                                case '2d-weight-computation': return <WeightComputationLesson />;
                                case '2d-balloon': return <BalloonLesson />;
                                case '2d-titleblock': return <TitleblockLesson />;
                                case '2d-revision-code': return <RevisionCodeLesson />;
                                case '2d-standard-library': return <StandardLibraryLesson />;
                                default:
                                    return (
                                        <div className="content-2d-placeholder">
                                            <BookOpen size={48} strokeWidth={1.5} />
                                            <h3 className="content-2d-placeholder__title">iCAC Operation Manual 2D Drawing</h3>
                                            <p className="content-2d-placeholder__text">Content will be available soon.</p>
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
                            </div>
                        );
                    })()
                }

                <div className="content-actions">
                    <button
                        className="btn-primary next-lesson-btn"
                        onClick={goToNextLesson}
                        disabled={currentLessonIndex === allLessonIdsLength - 1}
                    >
                        Next Lesson <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </main>
    );
};
