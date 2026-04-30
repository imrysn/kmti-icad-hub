import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useCourses } from '../../hooks/useCourses'; import { Course } from '../../types';
import { useLessons } from '../../hooks/useLessons';
import { Lesson, ICAD_3D_LESSONS, ICAD_2D_LESSONS } from './mentorConstants'; import { authService } from '../../services/authService';

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
    const is2DDrawingCourse = selectedCourse?.id?.toString() === '2' || selectedCourse?.course_type === '2D_Drawing';
    
    // UI/Interaction State 
    const [activeLessonId, setActiveLessonId] = useState<string>(''); 
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set()); 
    const [completedLessons, setCompletedLessons] = useState<string[]>([]); 
    const [averageScore, setAverageScore] = useState(0);
    const [isLoadingProgress, setIsLoadingProgress] = useState(true);
    const [isRestored, setIsRestored] = useState(false);
    const lastCourseIdRef = useRef<string | null>(null);

    // Prerequisite State (3D Completion for 2D Course)
    const [is3DCompleted, setIs3DCompleted] = useState(false);
    const [isCheckingPrereq, setIsCheckingPrereq] = useState(true);

    // Count completable 3D modules once
    const completable3DCount = useMemo(() => {
        let count = 0;
        const traverse = (list: Lesson[]) => {
            list.forEach(l => {
                if (l.quiz) count++;
                if (l.children) traverse(l.children);
            });
        };
        traverse(ICAD_3D_LESSONS);
        return count;
    }, []);

    // Auth info for bypass
    const user = authService.getStoredUser();
    const canBypass = isEmployeeSide || user?.role === 'admin' || user?.role === 'employee';

    // Derived stable state
    const { lessons: dbLessons, loading: lessonsLoading, allLessonIds: dbLessonIds, completableModuleIds: dbCompletableIds } = useLessons(selectedCourse?.id);

    const currentLessons = useMemo(() => {
        if (!selectedCourse) return [];
        if (is2DDrawingCourse) return ICAD_2D_LESSONS;
        if (selectedCourse.id.toString() === '1') return ICAD_3D_LESSONS;
        return dbLessons;
    }, [selectedCourse, is2DDrawingCourse, dbLessons]);

    const allLessonIds = useMemo(() => {
        const ids: string[] = [];
        const traverse = (list: Lesson[]) => {
            list.forEach(l => {
                if (l.children && l.children.length > 0) {
                    traverse(l.children);
                } else {
                    ids.push(l.id);
                }
            });
        };
        traverse(currentLessons);
        return ids.length > 0 ? ids : dbLessonIds;
    }, [currentLessons, dbLessonIds]);

    const completableModuleIds = useMemo(() => {
        const ids: string[] = [];
        const traverse = (list: Lesson[]) => {
            list.forEach(l => {
                if (l.quiz) ids.push(l.id);
                if (l.children && l.children.length > 0) traverse(l.children);
            });
        };
        traverse(currentLessons);
        return ids.length > 0 ? ids : dbCompletableIds;
    }, [currentLessons, dbCompletableIds]);

    // Initial Session Restoration (once courses are available)
    useEffect(() => {
        if (!loading && courses.length > 0 && !isRestored) {
            const savedCourseId = localStorage.getItem(authService.getStorageKey('selectedCourseId'));
            const savedLessonId = localStorage.getItem(authService.getStorageKey('activeLessonId'));
            const savedExpanded = localStorage.getItem(authService.getStorageKey('expandedIds'));
            const savedSidebar = localStorage.getItem(authService.getStorageKey('sidebarOpen'));

            if (savedCourseId) {
                console.log('Restoring course from storage:', savedCourseId);
                const course = courses.find(c => c.id.toString() == savedCourseId.toString());
                if (course) {
                    console.log('Found course for restoration:', course.title);
                    setSelectedCourse(course);
                    if (savedLessonId) {
                        console.log('Restoring lesson:', savedLessonId);
                        setActiveLessonId(savedLessonId);
                    }
                    if (savedExpanded) setExpandedIds(new Set(JSON.parse(savedExpanded)));
                    if (savedSidebar) setSidebarOpen(savedSidebar === 'true');
                } else {
                    console.warn('Could not find course in list for ID:', savedCourseId);
                }
            }
            setIsRestored(true);
        }
    }, [courses, loading, isRestored]);

    // Prerequisite Check (3D Completion)
    useEffect(() => {
        const checkPrereq = async () => {
            if (canBypass) {
                setIs3DCompleted(true);
                setIsCheckingPrereq(false);
                return;
            }

            try {
                // Course ID '1' is 3D Modeling
                const progress = await authService.getLessonProgress('1');
                const completedCount = progress.filter((p: any) => p.is_completed).length;
                
                // Mark as completed if all quizzes are passed
                setIs3DCompleted(completedCount >= completable3DCount && completable3DCount > 0);
            } catch (err) {
                console.error('Failed to check 3D prerequisite:', err);
            } finally {
                setIsCheckingPrereq(false);
            }
        };

        if (authService.isAuthenticated()) {
            checkPrereq();
        }
    }, [completable3DCount, canBypass]);

    // Session Persistence Sync (Save to LocalStorage)
    useEffect(() => {
        if (isRestored) {
            if (selectedCourse) {
                localStorage.setItem(authService.getStorageKey('selectedCourseId'), selectedCourse.id);
                localStorage.setItem(authService.getStorageKey('activeLessonId'), activeLessonId);
                localStorage.setItem(authService.getStorageKey('expandedIds'), JSON.stringify(Array.from(expandedIds)));
                localStorage.setItem(authService.getStorageKey('sidebarOpen'), sidebarOpen.toString());
            } else {
                // Clear persistence if we manually return to course selector
                localStorage.removeItem(authService.getStorageKey('selectedCourseId'));
                localStorage.removeItem(authService.getStorageKey('activeLessonId'));
                localStorage.removeItem(authService.getStorageKey('expandedIds'));
                localStorage.removeItem(authService.getStorageKey('sidebarOpen'));
            }
        }
    }, [selectedCourse, activeLessonId, expandedIds, sidebarOpen, isRestored]);

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
        const viewer = document.querySelector('.lesson-scroll-area');
        if (viewer) viewer.scrollTo({ top: 0, behavior: 'instant' });
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
            <CourseSelector 
                courses={courses} 
                loading={loading || isCheckingPrereq} 
                error={error} 
                setSelectedCourse={setSelectedCourse} 
                is3DCompleted={is3DCompleted}
                canBypass={canBypass}
            />
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
                    lessons={currentLessons}
                />

                <LessonViewer 
                    is2DDrawingCourse={is2DDrawingCourse} 
                    activeLessonId={activeLessonId} 
                    currentLessonIndex={currentLessonIndex} 
                    allLessonIdsLength={allLessonIds.length} 
                    goToNextLesson={goToNextLesson} 
                    goToPrevLesson={goToPrevLesson} 
                    sidebarOpen={sidebarOpen} 
                    setSidebarOpen={setSidebarOpen} 
                    setSelectedCourse={setSelectedCourse} 
                    getActiveLessonTitle={getActiveLessonTitle} 
                    lessons={currentLessons} 
                    completedLessons={completedLessons} 
                    onLessonComplete={fetchProgress} 
                    isEmployeeSide={isEmployeeSide} 
                />
            </div>
        </div>
    );
};

export default MentorMode;
