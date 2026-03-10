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
 * FILE STRUCTURE (src/components/3DModeling/)
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
import IcadInterfaceLesson from '../components/3DModeling/3DiCadInterface';
import ToolBarsLesson from '../components/3DModeling/3DToolBars';
import OriginLesson from '../components/3DModeling/3DOrigin';
import BasicOperationLesson from '../components/3DModeling/3DBasicOperation';
import TwoDTo3DLesson from '../components/3DModeling/3D2Dto3D';
import HoleDetailsLesson from '../components/3DModeling/3DHoleDetails';

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



const MentorMode: React.FC = () => {
  const { courses, loading, error } = useCourses();
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);
  const [activeLessonId, setActiveLessonId] = React.useState<string>('interface');
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // Scroll to top of content when lesson changes
  React.useEffect(() => {
    const viewer = document.querySelector('.main-content-viewer');
    if (viewer) viewer.scrollTo(0, 0);
  }, [activeLessonId]);

  // True when the selected course is iCAC 2D Drawing (id = '2')
  const is2DDrawingCourse = selectedCourse?.id === '2';

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
  const allLessonIds = ICAD_3D_LESSONS.flatMap(l =>
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
        ICAD_3D_LESSONS.forEach(l => {
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
                <div className="sidebar-title sidebar-title--clickable" onClick={() => setSelectedCourse(null)}>
                  <ChevronDown size={16} /> COURSE OVERVIEW
                </div>
                <button className="sidebar-search-btn">
                  <Search size={16} />
                </button>
              </div>
            </div>

            <div className="lesson-list">
              {is2DDrawingCourse ? (
                <div className="lesson-list__coming-soon">
                  <p>Content coming soon.</p>
                </div>
              ) : (
                ICAD_3D_LESSONS.map((lesson) => ( // cspell:disable-line
                  <div key={lesson.id}>
                    <div
                      className={`lesson-item ${activeLessonId === lesson.id ? 'active' : ''} ${lesson.isCompleted ? 'completed' : ''}`}
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
                          <Menu size={16} className="lesson-icon--dim" />
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
                             <Menu size={14} className="sub-lesson-icon" />
                            {child.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
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
            <h2 className="lesson-banner-title">{getActiveLessonTitle(ICAD_3D_LESSONS, activeLessonId)}</h2> {/* cspell:disable-line */}
            <div className="lesson-banner-divider"></div>
          </div>

          <div className="lesson-content-body">
          {/* ── Lesson Registry ──────────────────────────────────────────────────── */}
          {/* To add a new lesson: just add an entry to LESSON_REGISTRY in MentorMode.tsx */}
          {(() => {
            // Registry: maps a lesson id (or id prefix) → component factory
            const registry: Record<string, () => React.ReactNode> = {
              'interface':    () => <IcadInterfaceLesson />,
              'toolbars':     () => <ToolBarsLesson />,
              'origin':       () => <div className="origin-lesson-container"><OriginLesson /></div>,
              'hole-details': () => <HoleDetailsLesson onNextLesson={goToNextLesson} />,
            };

            // Sub-lesson prefixes (basic-op-1, 2d-3d-2, etc.)
            const prefixRegistry: Record<string, (id: string) => React.ReactNode> = {
              'basic-op': (id) => <BasicOperationLesson subLessonId={id} />,
              '2d-3d':    (id) => <TwoDTo3DLesson subLessonId={id} onNextLesson={goToNextLesson} />,
            };

            // Exact match first
            if (registry[activeLessonId]) return registry[activeLessonId]();

            // Prefix match for sub-lessons (e.g. 'basic-op-3' → 'basic-op')
            const prefix = Object.keys(prefixRegistry).find(p => activeLessonId.startsWith(p + '-'));
            if (prefix) return prefixRegistry[prefix](activeLessonId);

            // 2D Course placeholder
            if (is2DDrawingCourse) return (
              <div className="content-2d-placeholder">
                <BookOpen size={48} strokeWidth={1.5} />
                <h3 className="content-2d-placeholder__title">iCAC Operation Manual 2D Drawing</h3>
                <p className="content-2d-placeholder__text">Content will be available soon.</p>
              </div>
            );

            // Fallback placeholder for unimplemented lessons
            return (
              <div className="content-placeholder">
                <Video size={48} className="content-placeholder__icon" />
                <p>Lesson content for <strong>{activeLessonId}</strong> will be provided soon.</p>
                <p className="content-placeholder__note">
                  This area will host the instructional text, video demonstrations, and active testing prompts.
                </p>
              </div>
            );
          })()}

            <div className="content-actions">
              <button
                className="btn-primary next-lesson-btn"
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
