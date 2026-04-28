import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useCourses } from '../../hooks/useCourses'; import { Course } from '../../types';
import { Lesson, ICAD_2D_LESSONS, ICAD_3D_LESSONS } from './mentorConstants'; import { authService } from '../../services/authService';

// Extracted Components
import { CourseSelector } from './components/CourseSelector'; import { MentorSidebar } from './components/MentorSidebar';
import { LessonViewer } from './components/LessonViewer';

import '../../styles/MentorMode.css';

/**
 * MentorMode.tsx
 * Container component that manages fetching courses, tracking lesson state,
 * and rendering the core navigation and viewing components.
 */
interface MentorModeProps {
    isEmployeeSide?: boolean;
}

const MentorMode: React.FC<MentorModeProps> = ({ isEmployeeSide = false }) => {
    // Data Hook
    const { courses, loading, error } = useCourses();

    // Global State
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const is2DDrawingCourse = selectedCourse?.id === '2';
    
    // UI/Interaction State 
    const [activeLessonId, setActiveLessonId] = useState<string>(''); 
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set()); 
    const [completedLessons, setCompletedLessons] = useState<string[]>([]); 
    const [averageScore, setAverageScore] = useState(0);
    const [isLoadingProgress, setIsLoadingProgress] = useState(true);
    const [isRestored, setIsRestored] = useState(false);
    const lastCourseIdRef = useRef<string | null>(null);

    // Derived stable state
    const currentLessons = useMemo(() => is2DDrawingCourse ? ICAD_2D_LESSONS : ICAD_3D_LESSONS, [is2DDrawingCourse]);

    // Initial Session Restoration (once courses are available)
    useEffect(() => {
        if (!loading && courses.length > 0 && !isRestored) {
            const savedCourseId = localStorage.getItem('kmti_selectedCourseId');
            const savedLessonId = localStorage.getItem('kmti_activeLessonId');
            const savedExpanded = localStorage.getItem('kmti_expandedIds');
            const savedSidebar = localStorage.getItem('kmti_sidebarOpen');

            if (savedCourseId) {
                const course = courses.find(c => c.id === savedCourseId);
                if (course) {
                    setSelectedCourse(course);
                    if (savedLessonId) setActiveLessonId(savedLessonId);
                    if (savedExpanded) setExpandedIds(new Set(JSON.parse(savedExpanded)));
                    if (savedSidebar) setSidebarOpen(savedSidebar === 'true');
                }
            }
            setIsRestored(true);
        }
    }, [courses, loading, isRestored]);

    // Session Persistence Sync (Save to LocalStorage)
    useEffect(() => {
        if (isRestored) {
            if (selectedCourse) {
                localStorage.setItem('kmti_selectedCourseId', selectedCourse.id);
                localStorage.setItem('kmti_activeLessonId', activeLessonId);
                localStorage.setItem('kmti_expandedIds', JSON.stringify(Array.from(expandedIds)));
                localStorage.setItem('kmti_sidebarOpen', sidebarOpen.toString());
            } else {
                // Clear persistence if we manually return to course selector
                localStorage.removeItem('kmti_selectedCourseId');
                localStorage.removeItem('kmti_activeLessonId');
                localStorage.removeItem('kmti_expandedIds');
                localStorage.removeItem('kmti_sidebarOpen');
            }
        }
    }, [selectedCourse, activeLessonId, expandedIds, sidebarOpen, isRestored]);

    // Derived stable state for lessons (for navigation)
    const allLessonIds = useMemo(() => currentLessons.flatMap((l: Lesson) =>
        l.children ? l.children.map((c: { id: string }) => c.id) : [l.id]
    ), [currentLessons]);

    // Progressable units (Modules with quizzes)
    const completableModuleIds = useMemo(() => 
        currentLessons.filter(l => !!l.quiz).map(l => l.id),
    [currentLessons]);

    // Filter completions to only include valid modules for this specific course
    const relevantCompletedCount = useMemo(() => 
        completedLessons.filter(id => completableModuleIds.includes(id)).length,
    [completedLessons, completableModuleIds]);
    
    // Detect Course Switch or Exit and Reset Lesson State
    useEffect(() => {
        if (!selectedCourse) {
            // Exit to Hub: Clear lesson state immediately so the next course starts fresh
            setActiveLessonId('');
            setExpandedIds(new Set());
            lastCourseIdRef.current = null;
        } else if (lastCourseIdRef.current !== selectedCourse.id) {
            // Course Switch: If we came from another course, clear the state
            if (lastCourseIdRef.current !== null) {
                setActiveLessonId('');
                setExpandedIds(new Set());
            }
            lastCourseIdRef.current = selectedCourse.id;
        }
    }, [selectedCourse, isRestored]);

    const currentLessonIndex = allLessonIds.indexOf(activeLessonId);

    // Fetch Progress from Backend
    const fetchProgress = useCallback(async (newCompletedId?: string) => {
        if (!selectedCourse) return;

        // Optimistic UI: Update local state immediately if a new ID is provided
        if (newCompletedId) {
            setCompletedLessons(prev => {
                if (prev.includes(newCompletedId)) return prev;
                return [...prev, newCompletedId];
            });
        }

        setIsLoadingProgress(true);
        try {
            const progress = await authService.getLessonProgress(selectedCourse.id);
            // Only count as completed if score is >= 80
            const ids = progress.filter((p: any) => p.is_completed).map((p: any) => p.lesson_id);
            
            // Re-merge the newCompletedId just in case the backend hasn't updated yet
            if (newCompletedId && !ids.includes(newCompletedId)) {
                ids.push(newCompletedId);
            }
            
            
            setCompletedLessons(ids);
            
            // Calculate average score
            const quizLessons = progress.filter((p: any) => p.score > 0);
            if (quizLessons.length > 0) {
                const total = quizLessons.reduce((acc: number, p: any) => acc + p.score, 0);
                setAverageScore(total / quizLessons.length);
            } else {
                setAverageScore(0);
            }
        } catch (err) {
            console.error('Failed to fetch progress:', err);
        } finally {
            setIsLoadingProgress(false);
        }
    }, [selectedCourse]);

    // Side Effects
    useEffect(() => {
        if (selectedCourse) fetchProgress();
    }, [selectedCourse, fetchProgress]);

    // Standard initialization (if nothing was restored or lesson is empty)
    useEffect(() => {
        if (!selectedCourse || activeLessonId) return;
        
        if (is2DDrawingCourse) {
            setActiveLessonId('2d-orthographic-1');
            setExpandedIds(new Set(['2d-orthographic']));
        } else {
            setActiveLessonId('interface');
            setExpandedIds(new Set());
        }
    }, [selectedCourse?.id, is2DDrawingCourse, activeLessonId]);

    useEffect(() => {
        const viewer = document.querySelector('.main-content-viewer');
        if (viewer) viewer.scrollTo(0, 0);
    }, [activeLessonId]);

    // Handlers and Helpers
    const toggleExpand = useCallback((id: string) => {
        setExpandedIds(prev => {
            const newExpanded = new Set(prev);
            if (newExpanded.has(id)) {
                newExpanded.delete(id);
            } else {
                newExpanded.add(id);
            }
            return newExpanded;
        });
    }, []);

    const goToNextLesson = useCallback(() => {
        if (currentLessonIndex < allLessonIds.length - 1) {
            const nextId = allLessonIds[currentLessonIndex + 1];
            console.log('Navigating to next lesson:', { 
                currentId: activeLessonId, 
                nextId: nextId, 
                currentIndex: currentLessonIndex,
                total: allLessonIds.length 
            });
            
            setActiveLessonId(nextId);

            // Automatically expand the section if the next lesson is inside a group
            setExpandedIds(prev => {
                const nextSet = new Set(prev);
                currentLessons.forEach((l: Lesson) => {
                    if (l.children?.some((c: { id: string }) => c.id === nextId)) {
                        nextSet.add(l.id);
                    }
                });
                return nextSet;
            });
        } else {
            console.warn('Cannot go to next lesson: already at the end of the course.');
        }
    }, [currentLessonIndex, allLessonIds, activeLessonId, currentLessons]);

    const goToPrevLesson = useCallback(() => {
        if (currentLessonIndex > 0) {
            const prevId = allLessonIds[currentLessonIndex - 1];
            setActiveLessonId(prevId);
            
            setExpandedIds(prev => {
                const nextSet = new Set(prev);
                currentLessons.forEach((l: Lesson) => {
                    if (l.children?.some((c: { id: string }) => c.id === prevId)) {
                        nextSet.add(l.id);
                    }
                });
                return nextSet;
            });
        }
    }, [currentLessonIndex, allLessonIds, activeLessonId, currentLessons]);

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

    // Render Composition
    if (loading || error || !selectedCourse) {
        return (
            <CourseSelector courses={courses} loading={loading} error={error} setSelectedCourse={setSelectedCourse} />
        );
    }

    return (
        <div className="mentor-mode">
            <div className="course-view-container">
                <MentorSidebar 
                    selectedCourse={selectedCourse} 
                    is2DDrawingCourse={is2DDrawingCourse} 
                    sidebarOpen={sidebarOpen} 
                    setSidebarOpen={setSidebarOpen} 
                    activeLessonId={activeLessonId} 
                    setActiveLessonId={setActiveLessonId} 
                    expandedIds={expandedIds} 
                    toggleExpand={toggleExpand} 
                    setSelectedCourse={setSelectedCourse} 
                    completedLessons={completedLessons} 
                    isLoadingProgress={isLoadingProgress} 
                    isEmployeeSide={isEmployeeSide} 
                    totalLessons={completableModuleIds.length} 
                    completedLessonsCount={relevantCompletedCount}
                    averageScore={averageScore} 
                />

                <LessonViewer is2DDrawingCourse={is2DDrawingCourse} activeLessonId={activeLessonId} currentLessonIndex={currentLessonIndex} allLessonIdsLength={allLessonIds.length} goToNextLesson={goToNextLesson} goToPrevLesson={goToPrevLesson} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setSelectedCourse={setSelectedCourse} getActiveLessonTitle={getActiveLessonTitle} ICAD_2D_LESSONS={ICAD_2D_LESSONS} ICAD_3D_LESSONS={ICAD_3D_LESSONS} completedLessons={completedLessons} onLessonComplete={fetchProgress} isEmployeeSide={isEmployeeSide} />
            </div>
        </div>
    );
};

export default MentorMode;
