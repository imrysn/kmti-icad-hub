import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useCourses } from '../../hooks/useCourses'; import { Course } from '../../types';
import { useLessons } from '../../hooks/useLessons';
import { Lesson, ICAD_3D_LESSONS, ICAD_2D_LESSONS } from './mentorConstants'; import { authService } from '../../services/authService';
import { assessmentService } from '../../services/assessmentService';

// Extracted Components
import { CourseSelector } from './components/CourseSelector'; import { MentorSidebar } from './components/MentorSidebar';
import { LessonViewer } from './components/LessonViewer';
import { PracticalAssessment } from './components/PracticalAssessment';

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
    // Router hooks for header mode-switcher integration
    const location = useLocation();
    const navigate = useNavigate();

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

    const [is3DCompleted, setIs3DCompleted] = useState(false);
    const [is3DAssessmentCompleted, setIs3DAssessmentCompleted] = useState(false);
    const [is2DCompleted, setIs2DCompleted] = useState(false);
    const [isAnnotationCompleted, setIsAnnotationCompleted] = useState(false);
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

    const completable2DCount = useMemo(() => {
        let count = 0;
        const traverse = (list: Lesson[]) => {
            list.forEach(l => {
                if (l.quiz) count++;
                if (l.children) traverse(l.children);
            });
        };
        traverse(ICAD_2D_LESSONS);
        return count;
    }, []);

    // Auth info for bypass
    const user = authService.getStoredUser();
    const canBypass = isEmployeeSide || user?.role === 'admin' || user?.role === 'employee';

    // Header mode-switcher integration: read ?mode=assessment from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const mode = params.get('mode');

        if (mode === 'assessment' && selectedCourse?.id !== 'practical-assessment') {
            const assessmentCourse: Course = {
                id: 'practical-assessment',
                title: 'Practical Assessment',
                description: 'Sequential 7-set drafting tasks in iJCAD.',
                course_type: 'Practical',
                order: 99
            };
            setSelectedCourse(assessmentCourse);
        } else if (mode === 'manual' && selectedCourse?.id === 'practical-assessment') {
            setSelectedCourse(null);
        }
    }, [location.search]);

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
                setIsAnnotationCompleted(true);
                localStorage.setItem(authService.getStorageKey('annotationCompleted'), 'true');
                setIsCheckingPrereq(false);
                return;
            }

            try {
                // Course ID '1' is 3D Modeling
                const progress3D = await authService.getLessonProgress('1');
                const completedCount3D = progress3D.filter((p: any) => p.is_completed).length;
                
                // Mark as completed if all quizzes are passed
                setIs3DCompleted(completedCount3D >= completable3DCount && completable3DCount > 0);

                // Check specifically for annotation quiz
                const annotationProgress = progress3D.find((p: any) => p.lesson_id === 'annotation');
                const annotationDone = !!annotationProgress?.is_completed;
                setIsAnnotationCompleted(annotationDone);
                localStorage.setItem(authService.getStorageKey('annotationCompleted'), annotationDone.toString());

                // Check 3D Practical Assessment Completion
                try {
                    const [tasksData, submissionsData] = await Promise.all([
                        assessmentService.getTasks(),
                        assessmentService.getMySubmissions()
                    ]);
                    
                    // Group tasks by set_number to see which sets the user is mapped to
                    const requiredSets = new Set(tasksData.map((t: any) => t.set_number));
                    
                    // A set is completed if ANY task within that set has an approved 3D submission
                    const isPracticalCompleted = requiredSets.size > 0 && Array.from(requiredSets).every(setNum => {
                        const tasksInSet = tasksData.filter((t: any) => t.set_number === setNum);
                        return tasksInSet.some((task: any) => 
                            submissionsData.some((sub: any) => 
                                sub.task_id === task.id && 
                                sub.status === 'approved' && 
                                (sub.assessment_type || '3D') === '3D'
                            )
                        );
                    });
                    
                    setIs3DAssessmentCompleted(isPracticalCompleted);
                } catch (e) {
                    console.error('Failed to check 3D practical assessment prerequisite:', e);
                }

                // Course ID '2' is 2D Drawing
                const progress2D = await authService.getLessonProgress('2');
                const completedCount2D = progress2D.filter((p: any) => p.is_completed).length;
                setIs2DCompleted(completedCount2D >= completable2DCount && completable2DCount > 0);
            } catch (err) {
                console.error('Failed to check prerequisites:', err);
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
            
            // If we are currently loading progress for Course '1', update isAnnotationCompleted as well
            if (selectedCourse.id.toString() === '1') {
                const annotationDone = ids.includes('annotation');
                setIsAnnotationCompleted(annotationDone);
                localStorage.setItem(authService.getStorageKey('annotationCompleted'), annotationDone.toString());
            }
            
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

    // Real-time Activity Tracking
    const coursesRef = useRef(courses);
    const activeLessonIdRef = useRef(activeLessonId);
    
    useEffect(() => {
        coursesRef.current = courses;
        activeLessonIdRef.current = activeLessonId;
    }, [courses, activeLessonId]);

    useEffect(() => {
        const sendActivity = async (tabName?: string | null) => {
            const allCourses = coursesRef.current || [];
            const lessonId = activeLessonIdRef.current;
            
            let lessonTitle = 'Select a Lesson';
            let courseTitle = '';
            for (const course of allCourses) {
                const lessonsList = course.lessons || [];
                for (const lesson of lessonsList) {
                    if (lesson.id === lessonId) {
                        lessonTitle = lesson.title;
                        courseTitle = course.title;
                    }
                    if (lesson.children) {
                        const child = lesson.children.find(c => c.id === lessonId);
                        if (child) {
                            lessonTitle = child.title;
                            courseTitle = course.title;
                        }
                    }
                }
            }

            let activityStr = '';
            if (courseTitle) {
                // E.g. "3D Modeling Course" or "2D Detailing Course"
                // Let's ensure the word "Course" is present if it's not already
                if (!courseTitle.toLowerCase().includes('course') && courseTitle !== 'Practical Assessment') {
                    activityStr += `${courseTitle} Course `;
                } else {
                    activityStr += `${courseTitle} `;
                }
            }

            if (lessonTitle !== 'Select a Lesson') {
                activityStr += `${lessonTitle} lesson`;
            } else {
                activityStr += lessonTitle;
            }

            if (tabName && typeof tabName === 'string' && tabName.trim()) {
                let cleanTab = tabName.replace(/-tab/gi, '').replace(/-/g, ' ').trim();
                cleanTab = cleanTab.replace(/\b\w/g, l => l.toUpperCase());
                activityStr += ` (${cleanTab} Tab)`;
            }
            
            authService.updateActivity(activityStr);
        };

        if (activeLessonId) {
            let currentTabId = null;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (key.includes('-tab') || key.includes('ActiveTab') || key.includes('active-tab'))) {
                    if (key.toLowerCase().includes(activeLessonId.toLowerCase())) {
                        currentTabId = localStorage.getItem(key);
                        break;
                    }
                }
            }
            sendActivity(currentTabId);
        }

        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key: string, value: string) {
            originalSetItem.apply(this, [key as any, value as any]);
            if (key.includes('-tab') || key.includes('ActiveTab') || key.includes('active-tab')) {
                sendActivity(value);
            }
        };

        return () => {
            localStorage.setItem = originalSetItem;
        };
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
        if (activeLessonId === 'annotation') {
            console.log('Annotation quiz completed. Routing to Practical Assessment.');
            const assessmentCourse: Course = {
                id: 'practical-assessment',
                title: 'Practical Assessment',
                description: 'Sequential 7-set drafting tasks in iJCAD.',
                course_type: 'Practical',
                order: 99
            };
            setSelectedCourse(assessmentCourse);
            navigate('/mentor?mode=assessment');
            return;
        }

        if (currentLessonIndex < allLessonIds.length - 1) {
            const nextId = allLessonIds[currentLessonIndex + 1];
            
            // Clear only the NEXT lesson's tab state so it starts fresh when advancing via completion
            Object.keys(localStorage).forEach(key => {
                if (key.toLowerCase().includes(nextId.toLowerCase()) && 
                    (key.includes('-tab') || key.includes('ActiveTab') || key.includes('active-tab'))) {
                    localStorage.removeItem(key);
                }
            });

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
                is2DCompleted={is2DCompleted}
                isAnnotationCompleted={isAnnotationCompleted}
                canBypass={canBypass}
                is3DAssessmentCompleted={is3DAssessmentCompleted}
                isEmployeeSide={isEmployeeSide}
            />
        );
    }

    return (
        <div className="mentor-mode">
            <div className="course-view-container">
                {selectedCourse.id !== 'practical-assessment' && selectedCourse.id !== '2d-assessment' && (
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
                )}

                {selectedCourse.id === 'practical-assessment' || selectedCourse.id === '2d-assessment' ? (
                    (selectedCourse.id === 'practical-assessment' && !canBypass && !is3DCompleted) ? (
                        <div className="locked-assessment-container animate-fade-in">
                            <div className="locked-assessment-card">
                                <div className="lock-badge-large">
                                    <Lock size={48} />
                                </div>
                                <h2>3D Practical Assessment Locked</h2>
                                <p className="lock-description">
                                    The 3D Practical Assessment is a series of 10 sequential drafting tasks in iJCAD.
                                    To ensure you have the prerequisite skills, you must first complete the <strong>3D Modeling Course</strong>.
                                </p>
                                <div className="unlock-requirements">
                                    <div className="requirement-item">
                                        <div className="status-dot warning" />
                                        <span>Prerequisite: Complete 3D Modeling</span>
                                    </div>
                                </div>
                                <button className="primary mt-6" onClick={() => { setSelectedCourse(null); navigate('/mentor?mode=manual'); }}>
                                    Return to Courses
                                </button>
                            </div>
                        </div>
                    ) : (selectedCourse.id === '2d-assessment' && !canBypass && !is2DCompleted) ? (
                        <div className="locked-assessment-container animate-fade-in">
                            <div className="locked-assessment-card">
                                <div className="lock-badge-large">
                                    <Lock size={48} />
                                </div>
                                <h2>2D Detailing Assessment Locked</h2>
                                <p className="lock-description">
                                    The 2D Detailing Assessment is a series of 4 sequential drafting tasks in iJCAD.
                                    To ensure you have the prerequisite skills, you must first complete the <strong>2D Detailing Course</strong>.
                                </p>
                                <div className="unlock-requirements">
                                    <div className="requirement-item">
                                        <div className="status-dot warning" />
                                        <span>Prerequisite: Complete 2D Detailing</span>
                                    </div>
                                </div>
                                <button className="primary mt-6" onClick={() => { setSelectedCourse(null); navigate('/mentor?mode=manual'); }}>
                                    Return to Courses
                                </button>
                            </div>
                        </div>
                    ) : (
                        <PracticalAssessment 
                            is3DCompleted={is3DCompleted}
                            assessmentType={selectedCourse.id === '2d-assessment' ? '2D' : '3D'}
                            onBack={() => { setSelectedCourse(null); navigate('/mentor?mode=manual'); }} 
                        />
                    )
                ) : (
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
                )}
            </div>
        </div>
    );
};

export default MentorMode;
