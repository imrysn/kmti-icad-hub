import React from 'react';
import { Search, ChevronDown, ChevronRight, Menu, CheckCircle2 } from 'lucide-react';
import { Course } from '../../../types';
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
}

export const MentorSidebar: React.FC<MentorSidebarProps> = ({
    selectedCourse,
    is2DDrawingCourse,
    sidebarOpen,
    activeLessonId,
    setActiveLessonId,
    expandedIds,
    toggleExpand,
    setSelectedCourse
}) => {
    return (
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
                    {(is2DDrawingCourse ? ICAD_2D_LESSONS : ICAD_3D_LESSONS).map((lesson: Lesson) => (
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
                                        <Menu size={16} className="lesson-icon--dim" />
                                    )}
                                    <span>{lesson.title}</span>
                                </div>
                                {lesson.isCompleted && <CheckCircle2 size={18} color="#0066ff" />}
                            </div>

                            {lesson.children && expandedIds.has(lesson.id) && (
                                <div className="sub-lesson-list">
                                    {lesson.children.map((child: Lesson) => (
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
                    ))}
                </div>
            </div>
        </aside>
    );
};
