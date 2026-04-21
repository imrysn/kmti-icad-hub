import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, Menu, CheckCircle2, X, Lock } from 'lucide-react'; import { Course } from '../../../types';
import { Lesson, ICAD_2D_LESSONS, ICAD_3D_LESSONS } from '../mentorConstants';
import { AnalyticsCard } from './AnalyticsCard';

interface MentorSidebarProps {
    selectedCourse: Course;
    is2DDrawingCourse: boolean;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    activeLessonId: string;
    setActiveLessonId: (id: string) => void;
    expandedIds: Set<string>;
    toggleExpand: (id: string) => void;
    setSelectedCourse: (course: Course | null) => void;
    completedLessons: string[];
    isLoadingProgress: boolean;
    isEmployeeSide?: boolean;
    totalLessons: number;
    completedLessonsCount: number;
    averageScore: number;
}

export const MentorSidebar: React.FC<MentorSidebarProps> = ({
    selectedCourse,
    is2DDrawingCourse,
    sidebarOpen,
    setSidebarOpen,
    activeLessonId,
    setActiveLessonId,
    expandedIds,
    toggleExpand,
    setSelectedCourse,
    completedLessons,
    isLoadingProgress,
    isEmployeeSide = false,
    totalLessons,
    completedLessonsCount,
    averageScore
}) => {
    // Search State
    const [isSearchOpen, setIsSearchOpen] = useState(false); const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Lessons list based on course type
    const lessons = is2DDrawingCourse ? ICAD_2D_LESSONS : ICAD_3D_LESSONS;

    // Recursive Deep Filtering Logic with Multi-word support & Inheritance
    const searchTerms = useMemo(() =>
        searchTerm.toLowerCase().split(/\s+/).filter(t => t),
        [searchTerm]);

    const filteredLessons = useMemo(() => {
        if (searchTerms.length === 0) return lessons;

        const deepFilter = (list: Lesson[], inheritedMatch: boolean = false): Lesson[] => {
            return list
                .map(lesson => {
                    const lessonMatch = searchTerms.every(t =>
                        lesson.title.toLowerCase().includes(t) ||
                        lesson.content?.some(c => c.toLowerCase().includes(t))
                    );

                    const filteredChildren = lesson.children
                        ? deepFilter(lesson.children, inheritedMatch || lessonMatch)
                        : undefined;

                    const hasMatchingChildren = filteredChildren && filteredChildren.length > 0;

                    // Node is included if it matches OR has matching children OR parent matched
                    if (lessonMatch || hasMatchingChildren || inheritedMatch) {
                        return {
                            ...lesson,
                            children: filteredChildren
                        } as Lesson;
                    }
                    return null;
                })
                .filter((l): l is Lesson => l !== null);
        };

        return deepFilter(lessons);
    }, [lessons, searchTerms]);

    // Auto-focus search input
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Auto-expand parents if they contain children after filtering
    useEffect(() => {
        if (searchTerms.length > 0) {
            filteredLessons.forEach(l => {
                if (l.children && l.children.length > 0 && !expandedIds.has(l.id)) {
                    toggleExpand(l.id);
                }
            });
        }
    }, [filteredLessons, searchTerms, toggleExpand, expandedIds]);

    return (
        <aside
            className={`course-sidebar ${sidebarOpen ? 'open' : ''}`}
            onMouseEnter={() => setSidebarOpen(true)}
            onMouseLeave={() => setSidebarOpen(false)}
        >
            <div className="sidebar-inner-container">
                <div className="sidebar-course-header">
                    <div className="sidebar-course-meta">
                        <div className={`sidebar-search-wrapper ${isSearchOpen ? 'expanded' : ''}`}>
                            {isSearchOpen && (
                                <input ref={searchInputRef} type="text" className="sidebar-search-input" placeholder="Search lessons..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') setIsSearchOpen(false);
                                    }}
                                />
                            )}
                            <button className="sidebar-search-btn-top" onClick={() => setIsSearchOpen(!isSearchOpen)}
                                title={isSearchOpen ? "Close Search" : "Search Lessons"}
                            >
                                {isSearchOpen ? <X size={18} /> : <Search size={18} />}
                            </button>
                        </div>
                    </div>
                    {!isSearchOpen && <h2 className="sidebar-course-title">{selectedCourse.title}</h2>}
                    {
                        !isLoadingProgress && !isEmployeeSide && (
                            <div className="sidebar-analytics-wrapper">
                                <AnalyticsCard
                                    completionPercentage={Math.min(100, (completedLessonsCount / totalLessons) * 100)}
                                    averageScore={averageScore}
                                    lessonsCompleted={completedLessonsCount}
                                    totalLessons={totalLessons}
                                />
                            </div>
                        )
                    }
                </div >

                <div className="lesson-list">
                    {filteredLessons.length > 0 ? (
                        filteredLessons.map((lesson: Lesson) => {
                            // Unified Gating Logic
                            const getLessonGateStatus = (l: Lesson) => {
                                if (isEmployeeSide) {
                                    return { isLocked: false, isStrictlyLocked: false, isSelfCompleted: true };
                                }

                                const lessonIndex = lessons.findIndex(it => it.id === l.id);

                                // CUMULATIVE LOCKED logic: if ANY previous module HAS a quiz and that quiz is NOT in completedLessons
                                const isLocked = lessons.slice(0, lessonIndex).some(prev =>
                                    !!prev.quiz && !completedLessons.includes(prev.id)
                                );

                                // UNLOCKED if not strictly locked OR if the current module itself is already completed
                                const isSelfCompleted = completedLessons.includes(l.id);

                                return { isLocked: isLocked && !isSelfCompleted, isStrictlyLocked: isLocked, isSelfCompleted };
                            };

                            const moduleStatus = getLessonGateStatus(lesson);
                            const isActive = activeLessonId === lesson.id || (lesson.children?.some(c => c.id === activeLessonId));

                            return (
                                <div key={lesson.id}>
                                    <div className={`lesson-item ${isActive ? 'active' : ''} 
                                     
                                     ${moduleStatus.isLocked ? 'locked' : ''}
                                `}
                                        onClick={() => {
                                            if (lesson.children) {
                                                toggleExpand(lesson.id);
                                            } else {
                                                if (!moduleStatus.isLocked) {
                                                    setActiveLessonId(lesson.id);
                                                } else {
                                                    console.warn('Module Locked:', { id: lesson.id });
                                                }
                                            }
                                        }}
                                    >
                                        <div className="lesson-item-title">
                                            {
                                                lesson.children ? (
                                                    expandedIds.has(lesson.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                                                ) : (
                                                    moduleStatus.isSelfCompleted ? (
                                                        <CheckCircle2 size={16} className="lesson-icon--completed" />
                                                    ) : (
                                                        <Menu size={16} className={`lesson-icon--dim ${moduleStatus.isLocked ? 'locked-icon' : ''}`} />
                                                    )
                                                )
                                            }
                                            <div className="lesson-title-text-group">
                                                <span>{lesson.title}</span>
                                                {searchTerms.length > 0 &&
                                                    !searchTerms.every(t => lesson.title.toLowerCase().includes(t)) &&
                                                    searchTerms.some(t => lesson.content?.some(c => c.toLowerCase().includes(t))) && (
                                                        <span className="search-match-badge">Found in Content</span>
                                                    )}
                                            </div>
                                        </div >
                                        {
                                            moduleStatus.isLocked && (
                                                <Lock size={14} className="lesson-lock-icon" />
                                            )
                                        }
                                    </div >

                                    {
                                        lesson.children && expandedIds.has(lesson.id) && (
                                            <div className="sub-lesson-list">
                                                {lesson.children.map((child: Lesson) => (
                                                    <div className={`sub-lesson-item ${activeLessonId === child.id ? 'active' : ''} ${completedLessons.includes(child.id) ? 'completed' : ''} ${moduleStatus.isLocked ? 'locked' : ''} `} onClick={() => {
                                                        if (!moduleStatus.isLocked) {
                                                            console.log('Gating Check (Sub-lesson): OK', {
                                                                id: child.id,
                                                                parent: lesson.id,
                                                                moduleStatus
                                                            });
                                                            setActiveLessonId(child.id);
                                                        } else {
                                                            console.warn('Gating Check (Sub-lesson): BLOCKED', {
                                                                id: child.id,
                                                                parent: lesson.id,
                                                                moduleStatus
                                                            });
                                                        }
                                                    }}
                                                    >
                                                        < div className="sub-lesson-title-group" >
                                                            {
                                                                completedLessons.includes(child.id) ? (
                                                                    <CheckCircle2 size={14} className="sub-lesson-icon--completed" />
                                                                ) : (
                                                                    <Menu size={14} className={`sub-lesson-icon ${moduleStatus.isLocked ? 'locked-icon' : ''}`} />
                                                                )
                                                            }
                                                            < div className="lesson-title-text-group" >
                                                                <span>{child.title}</span>
                                                                {
                                                                    searchTerms.length > 0 &&
                                                                    !searchTerms.every(t => child.title.toLowerCase().includes(t)) &&
                                                                    searchTerms.some(t => child.content?.some(c => c.toLowerCase().includes(t))) && (
                                                                        <span className="search-match-badge sub">Found in Content</span>
                                                                    )
                                                                }
                                                            </div >
                                                        </div >
                                                        {
                                                            moduleStatus.isLocked && (
                                                                <Lock size={12} className="sub-lesson-lock" />
                                                            )
                                                        }
                                                    </div >
                                                ))}
                                            </div >
                                        )}
                                </div >
                            );
                        })
                    ) : (
                        <div className="sidebar-search-empty">
                            <p>No lessons found match "{searchTerm}"</p>
                            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                                Clear search
                            </button>
                        </div>
                    )}
                </div >
            </div >
        </aside >
    );
};
