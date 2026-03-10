/**
 * MentorMode.tsx
 *
 * The main view for the Mentor Mode learning experience.
 *
 * ARCHITECTURE OVERVIEW
 * ─────────────────────
 * 1. Course Selection
 *    Users first pick a course from `useCourses()` (fetched from the backend).
 *
 * 2. Lesson Navigation  (state: `activeLessonId`)
 *    The sidebar renders ICAD_3D_LESSONS — a flat list of lesson-items.
 *    Each lesson-item has an `id` string that directly maps to a lesson component:
 *
 *      Lesson-item ID     →  Component rendered
 *      ──────────────────────────────────────────
 *      'interface'        →  <IcadInterfaceLesson />
 *      'toolbars'         →  <ToolBarsLesson />
 *      'origin'           →  <OriginLesson />
 *      'basic-op-{1..4}'  →  <BasicOperationLesson subLessonId={...} />
 *      '2d-3d-{1..3}'     →  <TwoDTo3DLesson subLessonId={...} />
 *
 * 3. Sub-Lessons (parent lessons with children[])
 *    When a lesson-item has children[], clicking it expands the sidebar.
 *    Each child id is passed as the `subLessonId` prop to the parent lesson
 *    component, which decides internally which sub-section to render.
 *
 * 4. 2D Drawing Course
 *    If selectedCourse.id === '2', `is2DDrawingCourse` is true and both the
 *    sidebar and main content render a placeholder — NO 3D lesson data is used.
 *
 * FILE STRUCTURE (src/components/3D_Modeling/)
 * ────────────────────────────────────────────
 *   3DiCadInterface.tsx     iCAD Interface lesson
 *   3DToolBars.tsx          Tool Bars lesson  (toolbar data lives here)
 *   3DOrigin.tsx            Origin lesson
 *   3DBasicOperation.tsx    Basic Operation (1-4) — all sub-lessons in one file
 *   3D2Dto3D.tsx            2D > 3D (1-3) — all sub-lessons in one file
 *   InteractiveImageMap.tsx reusable hotspot image component
 *   ToolbarExplorer.tsx     reusable toolbar selector component
 */
import React from 'react';
import {
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Video,
  ChevronDown,
  ChevronRight,
  Circle,
  Menu,
  Search
} from 'lucide-react';
import { useCourses } from '../hooks/useCourses';
import { Course, MediaAsset } from '../types';
import { CourseCardSkeleton } from '../components/SkeletonComponents';
import IcadInterfaceLesson from '../components/3D_Modeling/3D_iCadInterface';
import ToolBarsLesson from '../components/3D_Modeling/3D_ToolBars';
import OriginLesson from '../components/3D_Modeling/3D_Origin';
import BasicOperationLesson from '../components/3D_Modeling/3D_BasicOperation';
import TwoDTo3DLesson from '../components/3D_Modeling/3D_2Dto3D';
import HoleDetailsLesson from '../components/3D_Modeling/3D_HoleDetails';
import BooleanLesson from '../components/3D_Modeling/3D_Boolean';
import ComponentLesson from '../components/3D_Modeling/3D_Component';
import FairingLesson from '../components/3D_Modeling/3D_Fairing';
import PartLesson from '../components/3D_Modeling/3D_Part';
import MaterialSettingLesson from '../components/3D_Modeling/3D_MaterialSetting';

// 2D Drawing Lesson Imports
import OrthographicViewLesson from '../components/2D_Drawing/2D_OrthographicView';
import CommandMenuLesson from '../components/2D_Drawing/2D_CommandMenu';
import LinePropertiesLesson from '../components/2D_Drawing/2D_LineProperties';
import DimensioningLesson from '../components/2D_Drawing/2D_Dimensioning';
import StandardPartLesson from '../components/2D_Drawing/2D_StandardPart';
import SurfaceApplicationLesson from '../components/2D_Drawing/2D_SurfaceApplication';
import KeywayLesson from '../components/2D_Drawing/2D_Keyway';
import RetainingRingLesson from '../components/2D_Drawing/2D_RetainingRing';
import GeometricToleranceLesson from '../components/2D_Drawing/2D_GeometricTolerance';
import PartNoteLesson from '../components/2D_Drawing/2D_PartNote';
import MachiningSymbolLesson from '../components/2D_Drawing/2D_MachiningSymbol';
import WeldingSymbolLesson from '../components/2D_Drawing/2D_WeldingSymbol';
import HeatTreatmentLesson from '../components/2D_Drawing/2D_HeatTreatment';
import SurfaceCoatingLesson from '../components/2D_Drawing/2D_SurfaceCoating';
import WeightComputationLesson from '../components/2D_Drawing/2D_WeightComputation';
import BillOfMaterialLesson from '../components/2D_Drawing/2D_BillOfMaterial';
import BalloonLesson from '../components/2D_Drawing/2D_Balloon';
import TitleblockLesson from '../components/2D_Drawing/2D_Titleblock';
import AdditionalViewLesson from '../components/2D_Drawing/2D_AdditionalView';
import OperalViewLesson from '../components/2D_Drawing/2D_OperalView';
import NormalMirrorPartsLesson from '../components/2D_Drawing/2D_NormalMirrorParts';
import RevisionCodeLesson from '../components/2D_Drawing/2D_RevisionCode';
import StandardLibraryLesson from '../components/2D_Drawing/2D_StandardLibrary';

import '../styles/MentorMode.css';

type Lesson = {
  id: string;
  title: string;
  isCompleted?: boolean;
  children?: Lesson[];
};

// ── Lesson-item definitions ─────────────────────────────────────────────────
// Each object maps directly to a sidebar entry.
// If `children` is present, the lesson-item is a collapsible parent whose
// child `id` values are passed as `subLessonId` to the lesson component.
const ICAD_3D_LESSONS: Lesson[] = [ // cspell:disable-line
  { id: 'interface', title: 'iCAD Interface' }, // cspell:disable-line
  { id: 'toolbars', title: 'Tool Bars' },
  { id: 'origin', title: 'Origin' },
  {
    id: 'basic-op',
    title: 'Basic Operation',
    children: Array.from({ length: 4 }, (_, i) => ({ id: `basic-op-${i + 1}`, title: `Basic Operation (${i + 1})` }))
  },
  {
    id: '2d-3d',
    title: '2D > 3D',
    children: Array.from({ length: 3 }, (_, i) => ({ id: `2d-3d-${i + 1}`, title: `2D > 3D (${i + 1})` }))
  },
  { id: 'hole-details', title: 'Hole Details' },
  {
    id: 'boolean',
    title: 'Boolean',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `boolean-${i + 1}`, title: `Boolean (${i + 1})` }))
  },
  {
    id: 'component',
    title: 'Component',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `component-${i + 1}`, title: `Component (${i + 1})` }))
  },
  { id: 'fairing', title: 'Fairing' },
  {
    id: '3d-part',
    title: '3D Part',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `3d-part-${i + 1}`, title: `3D Part (${i + 1})` }))
  },
  {
    id: 'material',
    title: 'Material Setting',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `material-${i + 1}`, title: `Material Setting (${i + 1})` }))
  },
  {
    id: 'properties',
    title: 'Properties',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `properties-${i + 1}`, title: `Properties (${i + 1})` }))
  },
  {
    id: 'annotation',
    title: 'Annotation',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `annotation-${i + 1}`, title: `Annotation (${i + 1})` }))
  },
  { id: 'interference', title: 'Interference Check' },
  {
    id: 'purchase-parts',
    title: '3D Purchase Parts',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `purchase-parts-${i + 1}`, title: `3D Purchase Parts (${i + 1})` }))
  },
  {
    id: 'parasolid', // cspell:disable-line
    title: 'Loading Parasolid', // cspell:disable-line
    children: Array.from({ length: 2 }, (_, i) => ({ id: `parasolid-${i + 1}`, title: `Loading Parasolid (${i + 1})` })) // cspell:disable-line
  },
  {
    id: 'op-sample',
    title: 'Operation Sample',
    children: Array.from({ length: 5 }, (_, i) => ({ id: `op-sample-${i + 1}`, title: `Operation Sample (${i + 1})` }))
  },
  {
    id: 'mirrored',
    title: 'Mirrored Part',
    children: Array.from({ length: 2 }, (_, i) => ({ id: `mirrored-${i + 1}`, title: `Mirrored Part (${i + 1})` }))
  },
  {
    id: 'standard',
    title: 'Standard',
    children: Array.from({ length: 8 }, (_, i) => ({ id: `standard-${i + 1}`, title: `Standard (${i + 1})` }))
  }
];

const ICAD_2D_LESSONS: Lesson[] = [
  { id: '2d-orthographic', title: 'Create Orthographic View', children: Array.from({ length: 3 }, (_, i) => ({ id: `2d-orthographic-${i + 1}`, title: `Create Orthographic View (${i + 1})` })) },
  { id: '2d-command-menu', title: 'Command Menu', children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-command-menu-${i + 1}`, title: `Command Menu (${i + 1})` })) },
  { id: '2d-line-props', title: 'Line Properties', children: Array.from({ length: 4 }, (_, i) => ({ id: `2d-line-props-${i + 1}`, title: `Line Properties (${i + 1})` })) },
  { id: '2d-dimensioning', title: 'Dimensioning', children: Array.from({ length: 5 }, (_, i) => ({ id: `2d-dimensioning-${i + 1}`, title: `Dimensioning (${i + 1})` })) },
  { id: '2d-standard-part', title: 'Standard Part Detail', children: Array.from({ length: 7 }, (_, i) => ({ id: `2d-standard-part-${i + 1}`, title: `Standard Part Detail (${i + 1})` })) },
  { id: '2d-surface-app', title: 'Application of Surface', children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-surface-app-${i + 1}`, title: `Application of Surface (${i + 1})` })) },
  { id: '2d-keyway', title: 'Keyway' },
  { id: '2d-retaining-ring', title: 'Retaining Ring', children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-retaining-ring-${i + 1}`, title: `Retaining Ring (${i + 1})` })) },
  { id: '2d-geometric-tol', title: 'Geometric Tolerance', children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-geometric-tol-${i + 1}`, title: `Geometric Tolerance (${i + 1})` })) },
  { id: '2d-part-note', title: 'Part Note' },
  { id: '2d-machining-symbol', title: 'Machining Symbol' },
  { id: '2d-welding-symbol', title: 'Welding Symbol' },
  { id: '2d-heat-treatment', title: 'Heat Treatment', children: Array.from({ length: 4 }, (_, i) => ({ id: `2d-heat-treatment-${i + 1}`, title: `Heat Treatment (${i + 1})` })) },
  { id: '2d-surface-coating', title: 'Surface Coating' },
  { id: '2d-weight-computation', title: 'Material Weight Computation' },
  { id: '2d-bom', title: 'Bill of Material', children: Array.from({ length: 4 }, (_, i) => ({ id: `2d-bom-${i + 1}`, title: `Bill of Material (${i + 1})` })) },
  { id: '2d-balloon', title: 'Balloon' },
  { id: '2d-titleblock', title: 'Titleblock' },
  { id: '2d-additional-view', title: 'Additional View', children: Array.from({ length: 4 }, (_, i) => ({ id: `2d-additional-view-${i + 1}`, title: `Additional View (${i + 1})` })) },
  { id: '2d-operal-view', title: 'Operal View', children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-operal-view-${i + 1}`, title: `Operal View (${i + 1})` })) },
  { id: '2d-normal-mirror', title: 'Normal and Mirror Parts', children: Array.from({ length: 2 }, (_, i) => ({ id: `2d-normal-mirror-${i + 1}`, title: `Normal and Mirror Parts (${i + 1})` })) },
  { id: '2d-revision-code', title: 'Revision Code' },
  { id: '2d-standard-library', title: 'Standard Part Library' }
];



const MentorMode: React.FC = () => {
  const { courses, loading, error } = useCourses();
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);
  // True when the selected course is iCAC 2D Drawing (id = '2')
  const is2DDrawingCourse = selectedCourse?.id === '2';

  const [activeLessonId, setActiveLessonId] = React.useState<string>(is2DDrawingCourse ? '2d-orthographic-1' : 'interface');
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  React.useEffect(() => {
    // Reset active lesson when course changes
    if (is2DDrawingCourse) {
      setActiveLessonId('2d-orthographic-1');
      setExpandedIds(new Set(['2d-orthographic']));
    } else {
      setActiveLessonId('interface');
      setExpandedIds(new Set());
    }
  }, [selectedCourse?.id]);

  // Scroll to top of content when lesson changes
  React.useEffect(() => {
    const viewer = document.querySelector('.main-content-viewer');
    if (viewer) viewer.scrollTo(0, 0);
  }, [activeLessonId]);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  // Build a flat list of all selectable lesson IDs (the "leaf" nodes)
  const allLessonIds = (is2DDrawingCourse ? ICAD_2D_LESSONS : ICAD_3D_LESSONS).flatMap(l =>
    l.children ? l.children.map(c => c.id) : [l.id]
  );

  const currentLessonIndex = allLessonIds.indexOf(activeLessonId);

  const goToNextLesson = () => {
    if (currentLessonIndex < allLessonIds.length - 1) {
      const nextId = allLessonIds[currentLessonIndex + 1];
      setActiveLessonId(nextId);

      // Auto-expand parent if the next lesson is a sub-lesson
      setExpandedIds(prev => {
        const nextSet = new Set(prev);
        (is2DDrawingCourse ? ICAD_2D_LESSONS : ICAD_3D_LESSONS).forEach(l => {
          if (l.children?.some(c => c.id === nextId)) {
            nextSet.add(l.id);
          }
        });
        return nextSet;
      });
    }
  };

  const getActiveLessonTitle = (lessons: Lesson[], id: string): string => {
    for (const lesson of lessons) {
      if (lesson.id === id) return lesson.title;
      if (lesson.children) {
        const child = lesson.children.find(c => c.id === id);
        if (child) return child.title;
      }
    }
    return 'Select a Lesson';
  };

  if (loading) return (
    <div className="mentor-mode">
      <div className="mentor-header">
        <h1>Mentor Mode</h1>
        <p>Loading your learning experience...</p>
      </div>
      <div className="course-selection">
        <div className="course-grid">
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
        </div>
      </div>
    </div>
  );

  if (error) return <div className="mentor-error">{error}</div>;

  if (!selectedCourse) {
    return (
      <div className="mentor-mode">
        <div className="mentor-header">
          <BookOpen size={32} />
          <h1>Mentor Mode</h1>
          <p>Select a structured path to begin your training</p>
        </div>
        <div className="course-selection">
          <div className="course-grid">
            {courses.map((course) => (
              <div
                key={course.id}
                className="course-card"
                onClick={() => setSelectedCourse(course)}
              >
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button className="btn-primary">
                  Start Learning <PlayCircle size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mentor-mode">
      <div className="course-view-container">
        <aside className={`course-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-inner-container">
            <div className="sidebar-course-header">
              <div className="sidebar-course-meta">
                <button className="sidebar-search-btn-top">
                  <Search size={18} />
                </button>
              </div>
              <h2 className="sidebar-course-title">{selectedCourse.title}</h2>
              <div className="sidebar-progress-container">
                <div className="sidebar-progress-bar-bg">
                  <div className="sidebar-progress-bar-fill" style={{ width: '38%' }}></div>
                </div>
                <span className="sidebar-progress-text">38% COMPLETE</span>
              </div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-header-row">
                <div className="sidebar-title" onClick={() => setSelectedCourse(null)} style={{ cursor: 'pointer' }}>
                  <ChevronDown size={16} /> COURSE OVERVIEW
                </div>
                <button className="sidebar-search-btn">
                  <Search size={16} />
                </button>
              </div>
            </div>

            <div className="lesson-list">
              {(is2DDrawingCourse ? ICAD_2D_LESSONS : ICAD_3D_LESSONS).map((lesson) => ( // cspell:disable-line
                <div key={lesson.id}>
                  <div
                    className={`lesson-item ${activeLessonId === lesson.id || (lesson.children?.some(c => c.id === activeLessonId)) ? 'active' : ''} ${lesson.isCompleted ? 'completed' : ''}`}
                    onClick={() => {
                      if (lesson.children) {
                        toggleExpand(lesson.id);
                      } else {
                        setActiveLessonId(lesson.id);
                      }
                    }}
                  >
                    <div className="lesson-item-title">
                      {lesson.children ? (
                        expandedIds.has(lesson.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                      ) : (
                        <Menu size={16} style={{ opacity: 0.6 }} />
                      )}
                      <span>{lesson.title}</span>
                    </div>
                    {lesson.isCompleted && <CheckCircle2 size={18} color="#0066ff" />}
                  </div>

                  {lesson.children && expandedIds.has(lesson.id) && (
                    <div className="sub-lesson-list">
                      {lesson.children.map((child) => (
                        <div
                          key={child.id}
                          className={`sub-lesson-item ${activeLessonId === child.id ? 'active' : ''}`}
                          onClick={() => setActiveLessonId(child.id)}
                        >
                          <Menu size={14} style={{ opacity: 0.5, marginRight: '0.75rem' }} />
                          {child.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="main-content-viewer">
          <div className="sticky-lesson-controls">
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>
            <button className="exit-course-btn" onClick={() => setSelectedCourse(null)}>
              EXIT COURSE
            </button>
          </div>

          <div className="lesson-header-banner">
            <p className="lesson-indicator">Lesson {currentLessonIndex + 1} of {allLessonIds.length}</p>
            <h2 className="lesson-banner-title">{getActiveLessonTitle(is2DDrawingCourse ? ICAD_2D_LESSONS : ICAD_3D_LESSONS, activeLessonId)}</h2> {/* cspell:disable-line */}
            <div className="lesson-banner-divider"></div>
          </div>

          <div className="lesson-content-body">
            {/* 3D Modeling Lessons */}
            {!is2DDrawingCourse && activeLessonId === 'interface' && <IcadInterfaceLesson />}
            {!is2DDrawingCourse && activeLessonId === 'toolbars' && <ToolBarsLesson />}
            {!is2DDrawingCourse && activeLessonId === 'origin' && <div className="origin-lesson-container"><OriginLesson /></div>}
            {!is2DDrawingCourse && (activeLessonId.startsWith('basic-op-')) && <BasicOperationLesson subLessonId={activeLessonId} />}
            {!is2DDrawingCourse && (activeLessonId.startsWith('2d-3d-')) && <TwoDTo3DLesson subLessonId={activeLessonId} onNextLesson={goToNextLesson} />}
            {!is2DDrawingCourse && activeLessonId === 'hole-details' && <HoleDetailsLesson onNextLesson={goToNextLesson} />}
            {!is2DDrawingCourse && activeLessonId === 'fairing' && <FairingLesson onNextLesson={goToNextLesson} />}
            {!is2DDrawingCourse && (activeLessonId.startsWith('3d-part-')) && <PartLesson subLessonId={activeLessonId} onNextLesson={goToNextLesson} />}
            {!is2DDrawingCourse && (activeLessonId.startsWith('material-')) && <MaterialSettingLesson subLessonId={activeLessonId} onNextLesson={goToNextLesson} />}
            {!is2DDrawingCourse && (activeLessonId.startsWith('boolean-')) && <BooleanLesson subLessonId={activeLessonId} onNextLesson={goToNextLesson} />}
            {!is2DDrawingCourse && (activeLessonId.startsWith('component-')) && <ComponentLesson subLessonId={activeLessonId} onNextLesson={goToNextLesson} />}

            {/* 2D Drawing Lessons */}
            {is2DDrawingCourse && activeLessonId.startsWith('2d-orthographic-') && <OrthographicViewLesson />}
            {is2DDrawingCourse && activeLessonId.startsWith('2d-command-menu-') && <CommandMenuLesson />}
            {is2DDrawingCourse && activeLessonId.startsWith('2d-line-props-') && <LinePropertiesLesson />}
            {is2DDrawingCourse && activeLessonId.startsWith('2d-dimensioning-') && <DimensioningLesson />}
            {is2DDrawingCourse && activeLessonId.startsWith('2d-standard-part-') && <StandardPartLesson />}
            {is2DDrawingCourse && activeLessonId.startsWith('2d-surface-app-') && <SurfaceApplicationLesson />}
            {is2DDrawingCourse && activeLessonId === '2d-keyway' && <KeywayLesson />}
            {is2DDrawingCourse && activeLessonId.startsWith('2d-retaining-ring-') && <RetainingRingLesson />}
            {is2DDrawingCourse && activeLessonId.startsWith('2d-geometric-tol-') && <GeometricToleranceLesson />}
            {is2DDrawingCourse && activeLessonId === '2d-part-note' && <PartNoteLesson />}
            {is2DDrawingCourse && activeLessonId === '2d-machining-symbol' && <MachiningSymbolLesson />}
            {is2DDrawingCourse && activeLessonId === '2d-welding-symbol' && <WeldingSymbolLesson />}
            {is2DDrawingCourse && activeLessonId.startsWith('2d-heat-treatment-') && <HeatTreatmentLesson />}
            {is2DDrawingCourse && activeLessonId === '2d-surface-coating' && <SurfaceCoatingLesson />}
            {is2DDrawingCourse && activeLessonId === '2d-weight-computation' && <WeightComputationLesson />}
            {is2DDrawingCourse && activeLessonId.startsWith('2d-bom-') && <BillOfMaterialLesson />}
            {is2DDrawingCourse && activeLessonId === '2d-balloon' && <BalloonLesson />}
            {is2DDrawingCourse && activeLessonId === '2d-titleblock' && <TitleblockLesson />}
            {is2DDrawingCourse && activeLessonId.startsWith('2d-additional-view-') && <AdditionalViewLesson />}
            {is2DDrawingCourse && activeLessonId.startsWith('2d-operal-view-') && <OperalViewLesson />}
            {is2DDrawingCourse && activeLessonId.startsWith('2d-normal-mirror-') && <NormalMirrorPartsLesson />}
            {is2DDrawingCourse && activeLessonId === '2d-revision-code' && <RevisionCodeLesson />}
            {is2DDrawingCourse && activeLessonId === '2d-standard-library' && <StandardLibraryLesson />}

            {/* Fallback Placeholder */}
            {!activeLessonId.startsWith('2d-') && !['interface', 'toolbars', 'origin', 'hole-details', 'fairing'].includes(activeLessonId) &&
              !['basic-op-', '2d-3d-', '3d-part-', 'material-', 'boolean-', 'component-'].some(prefix => activeLessonId.startsWith(prefix)) && (
                <div className="content-placeholder">
                  <Video size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                  <p>Lesson content for <strong>{activeLessonId}</strong> will be provided soon.</p>
                </div>
              )}

            <div className="content-actions" style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
              <button
                className="btn-primary"
                style={{ padding: '0.85rem 2rem' }}
                onClick={goToNextLesson}
                disabled={currentLessonIndex === allLessonIds.length - 1}
              >
                Next Lesson <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MentorMode;
