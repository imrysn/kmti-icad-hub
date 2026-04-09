import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, Menu, CheckCircle2, X, Lock } from 'lucide-react'; import { Course } from '../../../types';
import { Lesson, ICAD_2D_LESSONS, ICAD_3D_LESSONS } from '../mentorConstants';

interface MentorSidebarProps {
    selectedCourse: Course;
    is2DDrawingCourse: boolean;
    sidebarOpen: boolean;
    activeLessonId: string;
    setActiveLessonId: (id: string) => void;
    expandedIds: Set<string>;
    toggleExpand: (id: string) => void;
    setSelectedCourse: (course: Course | null) => void;
    completedLessons: string[];
    isLoadingProgress: boolean;
}

export const MentorSidebar: React.FC<MentorSidebarProps> = ({
    selectedCourse,
    is2DDrawingCourse,
    sidebarOpen,
    activeLessonId,
    setActiveLessonId,
    expandedIds,
    toggleExpand,
    setSelectedCourse,
    completedLessons,
    isLoadingProgress
}) => {
    // Search State
    const [isSearchOpen, setIsSearchOpen] = useState(false); const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Lessons list based on course type
    const lessons = is2DDrawingCourse ? ICAD_2D_LESSONS : ICAD_3D_LESSONS;

    // Filtering Logic
    const filteredLessons = useMemo(() => {
        if (!searchTerm.trim()) return lessons;

        const term = searchTerm.toLowerCase();
        return lessons.filter(lesson => {
            const lessonMatch = lesson.title.toLowerCase().includes(term);
            const childrenMatch = lesson.children?.some(child => 
                child.title.toLowerCase().includes(term)
            );
            return lessonMatch || childrenMatch;
        });
    }, [lessons, searchTerm]);

    // Auto-focus search input
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Auto-expand parents if they contain a matching child
    useEffect(() => {
        if (searchTerm.trim()) {
            filteredLessons.forEach(l => {
                const hasMatchingChild = l.children?.some(c => 
                    c.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                // Only expand if it contains a matching child AND is not already expanded
                if (hasMatchingChild && !expandedIds.has(l.id)) {
                    toggleExpand(l.id);
                }
            });
        }
    }, [filteredLessons, searchTerm, toggleExpand, expandedIds]);

    return (
        <aside className={`course-sidebar ${sidebarOpen ? 'open' : ''}`}>
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
                    <div className="sidebar-progress-container">
                        <div className="sidebar-progress-bar-bg">
                            <div className="sidebar-progress-bar-fill" style={{ width: '38%' }}></div>
                        </div>
                        <span className="sidebar-progress-text">38% COMPLETE</span>
                    </div>
                </div>

                <div className="lesson-list">
                    {filteredLessons.length > 0 ? (
                        filteredLessons.map((lesson: Lesson) => {
                            // Unified Gating Logic
                            const getLessonGateStatus = (l: Lesson) => {
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
                                     ${moduleStatus.isSelfCompleted ? 'completed' : ''}
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
                                    {lesson.children ? (
                                        expandedIds.has(lesson.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                                    ) : (
                                        moduleStatus.isSelfCompleted ? (
                                            <CheckCircle2 size={16} className="lesson-icon--completed" />
                                        ) : (
                                            <Menu size={16} className={`lesson-icon--dim ${moduleStatus.isLocked ? 'locked-icon' : ''}`} />
                                        )
                                    )}
                                    <span>{lesson.title}</span>
                                </div>
                                {moduleStatus.isLocked && (
                                    <Lock size={14} className="lesson-lock-icon" />
                                )}
                            </div>

                            {lesson.children && expandedIds.has(lesson.id) && (
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
                                            <div className="sub-lesson-title-group">
                                                {completedLessons.includes(child.id) ? (
                                                    <CheckCircle2 size={14} className="sub-lesson-icon--completed" />
                                                ) : (
                                                    <Menu size={14} className={`sub-lesson-icon ${moduleStatus.isLocked ? 'locked-icon' : ''}`} />
                                                )}
                                                {child.title}
                                            </div>
                                            {moduleStatus.isLocked && (
                                                <Lock size={12} className="sub-lesson-lock" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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
                </div>
            </div>
        </aside>
    );
};
