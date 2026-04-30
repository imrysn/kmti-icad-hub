import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, ChevronLeft, CheckCircle2, X, Lock, Zap, BookOpen, Menu } from 'lucide-react'; import { Course } from '../../../types';
import { Lesson, ICAD_2D_LESSONS, ICAD_3D_LESSONS } from '../mentorConstants';
import { AnalyticsCard } from './AnalyticsCard';

const ProgressCircle: React.FC<{ percentage: number; size?: number; strokeWidth?: number; className?: string }> = ({ 
    percentage, 
    size = 24, 
    strokeWidth = 2,
    className = "" 
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const safePercentage = isNaN(percentage) ? 0 : Math.max(0, Math.min(100, percentage));
    const offset = circumference - (safePercentage / 100) * circumference;

    return (
        <div className={`progress-circle-container ${className}`} style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="progress-circle">
                <circle
                    className="progress-circle-bg"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="progress-circle-fill"
                    stroke="var(--primary)"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset: offset }}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
        </div>
    );
};

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
    lessons: Lesson[];
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
    averageScore,
    lessons
}) => {
    // Search State
    const [isSearchOpen, setIsSearchOpen] = useState(false); const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Lessons list based on course type
    // Lessons are now passed as props

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
        >
            <div className="sidebar-inner-container">
                <div className="sidebar-course-header">
                    <div className="sidebar-course-meta">
                        <button 
                            className="sidebar-toggle-btn"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                        >
                            <Menu size={20} />
                        </button>
                        
                        <div className={`sidebar-search-wrapper ${isSearchOpen ? 'expanded' : ''} ${sidebarOpen ? 'visible' : 'hidden'}`}>
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

                    {!sidebarOpen ? (
                        <div className="sidebar-collapsed-dashboard">
                            <Zap size={14} className="collapsed-zap-icon" />
                            <div className="collapsed-progress-track">
                                <div 
                                    className="collapsed-progress-fill" 
                                    style={{ width: `${(completedLessonsCount / totalLessons) * 100}%` }} 
                                />
                            </div>
                            <div className="collapsed-stats-pill">
                                {Math.round((completedLessonsCount / totalLessons) * 100)}%
                            </div>
                        </div>
                    ) : (
                        !isSearchOpen && <h2 className="sidebar-course-title">{selectedCourse.title}</h2>
                    )}
                    
                    {!isLoadingProgress && !isEmployeeSide && sidebarOpen && (
                        <div className="sidebar-analytics-wrapper">
                            <AnalyticsCard
                                completionPercentage={Math.min(100, (completedLessonsCount / totalLessons) * 100)}
                                averageScore={averageScore}
                                lessonsCompleted={completedLessonsCount}
                                totalLessons={totalLessons}
                            />
                        </div>
                    )}
                </div>

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
                            
                            // PROGRESS INHERITANCE: If the parent module is completed, children are visually completed
                            const isParentCompleted = moduleStatus.isSelfCompleted;

                            // Calculate progress percentage for children
                             const subLessonProgress = (lesson.children && lesson.children.length > 0)
                               ? (isParentCompleted ? 100 : (lesson.children.filter(c => completedLessons.includes(c.id)).length / lesson.children.length) * 100)
                               : (moduleStatus.isSelfCompleted ? 100 : 0);

                            return (
                                <div key={lesson.id} className="lesson-item-wrapper">
                                    <div className={`lesson-item ${isActive ? 'active' : ''} 
                                     ${isParentCompleted ? 'completed' : ''}
                                     ${moduleStatus.isLocked ? 'locked' : ''}
                                `}
                                        onClick={() => {
                                            if (lesson.children && lesson.children.length > 1) {
                                                toggleExpand(lesson.id);
                                            } else {
                                                if (!moduleStatus.isLocked) {
                                                    const targetId = (lesson.children && lesson.children.length === 1) 
                                                        ? lesson.children[0].id 
                                                        : lesson.id;
                                                    setActiveLessonId(targetId);
                                                }
                                            }
                                        }}
                                        title={!sidebarOpen ? lesson.title : ""}
                                    >
                                        <div className="lesson-item-title">
                                            <div className="lesson-icon-wrapper">
                                                <ProgressCircle 
                                                    percentage={subLessonProgress} 
                                                    size={28} 
                                                    strokeWidth={2.5}
                                                    className="lesson-progress-static"
                                                />
                                                <div className="lesson-icon-inner">
                                                    {lesson.children && lesson.children.length > 1 ? (
                                                        expandedIds.has(lesson.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                                                    ) : (
                                                        moduleStatus.isSelfCompleted ? (
                                                            <CheckCircle2 size={14} className="lesson-icon--completed" />
                                                        ) : (
                                                            <BookOpen size={14} className={`lesson-icon--dim ${moduleStatus.isLocked ? 'locked-icon' : ''}`} />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div className="lesson-title-text-group">
                                                <span>{lesson.title}</span>
                                                {searchTerms.length > 0 && 
                                                 !searchTerms.every(t => lesson.title.toLowerCase().includes(t)) && 
                                                 searchTerms.some(t => lesson.content?.some(c => c.toLowerCase().includes(t))) && (
                                                    <span className="search-match-badge">Found in Content</span>
                                                )}
                                            </div>
                                        </div>
                                        {moduleStatus.isLocked && (
                                            <Lock size={14} className="lesson-lock-icon" />
                                        )}
                                    </div>

                                    {lesson.children && lesson.children.length > 1 && expandedIds.has(lesson.id) && (
                                        <div className={`sub-lesson-list ${!sidebarOpen ? 'collapsed-dots' : ''}`}>
                                            {lesson.children.map((child: Lesson, index: number) => (
                                                <div 
                                                    key={child.id}
                                                    className={`sub-lesson-item 
                                                        ${activeLessonId === child.id ? 'active' : ''} 
                                                        ${completedLessons.includes(child.id) ? 'completed' : ''} 
                                                        ${moduleStatus.isLocked ? 'locked' : ''}
                                                        ${index === 0 ? 'is-first' : ''}
                                                        ${index === lesson.children!.length - 1 ? 'is-last' : ''}
                                                    `} 
                                                    onClick={() => {
                                                       if (!moduleStatus.isLocked) {
                                                           setActiveLessonId(child.id);
                                                       }
                                                    }}
                                                    title={!sidebarOpen ? child.title : ""}
                                                >
                                                    <div className="sub-lesson-connector" />
                                                    {!sidebarOpen ? (
                                                        <div className="sub-lesson-dot-indicator" />
                                                    ) : (
                                                        <div className="sub-lesson-title-group">
                                                            {completedLessons.includes(child.id) ? (
                                                                <CheckCircle2 size={14} className="sub-lesson-icon--completed" />
                                                            ) : (
                                                                <BookOpen size={14} className={`sub-lesson-icon ${moduleStatus.isLocked ? 'locked-icon' : ''}`} />
                                                            )}
                                                            <div className="lesson-title-text-group">
                                                                <span>{child.title}</span>
                                                                {searchTerms.length > 0 && 
                                                                 !searchTerms.every(t => child.title.toLowerCase().includes(t)) && 
                                                                 searchTerms.some(t => child.content?.some(c => c.toLowerCase().includes(t))) && (
                                                                    <span className="search-match-badge sub">Found in Content</span>
                                                                 )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {sidebarOpen && moduleStatus.isLocked && (
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
