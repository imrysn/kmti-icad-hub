import React, { useState, useEffect } from 'react';
import { useCourses } from '../../hooks/useCourses';
import { Course } from '../../types';
import { Lesson, ICAD_2D_LESSONS, ICAD_3D_LESSONS } from './mentorConstants';

// Extracted Components
import { CourseSelector } from './components/CourseSelector';
import { MentorSidebar } from './components/MentorSidebar';
import { LessonViewer } from './components/LessonViewer';

import '../../styles/MentorMode.css';

/**
 * MentorMode.tsx
 * Container component that manages fetching courses, tracking lesson state,
 * and rendering the core navigation and viewing components.
 */
const MentorMode: React.FC = () => {
    // Data Hook
    const { courses, loading, error } = useCourses();

    // Global State
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const is2DDrawingCourse = selectedCourse?.id === '2';

    // UI/Interaction State
    const [activeLessonId, setActiveLessonId] = useState<string>(is2DDrawingCourse ? '2d-orthographic-1' : 'interface');
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Side Effects
    useEffect(() => {
        if (is2DDrawingCourse) {
            setActiveLessonId('2d-orthographic-1');
            setExpandedIds(new Set(['2d-orthographic']));
        } else {
            setActiveLessonId('interface');
            setExpandedIds(new Set());
        }
    }, [selectedCourse?.id, is2DDrawingCourse]);

    useEffect(() => {
        const viewer = document.querySelector('.main-content-viewer');
        if (viewer) viewer.scrollTo(0, 0);
    }, [activeLessonId]);


    // Handlers and Helpers
    const toggleExpand = (id: string) => {
        const newExpanded = new Set(expandedIds);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedIds(newExpanded);
    };

    const allLessonIds = (is2DDrawingCourse ? ICAD_2D_LESSONS : ICAD_3D_LESSONS).flatMap(l =>
        l.children ? l.children.map(c => c.id) : [l.id]
    );

    const currentLessonIndex = allLessonIds.indexOf(activeLessonId);

    const goToNextLesson = () => {
        if (currentLessonIndex < allLessonIds.length - 1) {
            const nextId = allLessonIds[currentLessonIndex + 1];
            setActiveLessonId(nextId);

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


    // Render Composition
    if (loading || error || !selectedCourse) {
        return (
            <CourseSelector 
                courses={courses} 
                loading={loading} 
                error={error} 
                setSelectedCourse={setSelectedCourse} 
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
                    activeLessonId={activeLessonId}
                    setActiveLessonId={setActiveLessonId}
                    expandedIds={expandedIds}
                    toggleExpand={toggleExpand}
                    setSelectedCourse={setSelectedCourse}
                />

                <LessonViewer 
                    is2DDrawingCourse={is2DDrawingCourse}
                    activeLessonId={activeLessonId}
                    currentLessonIndex={currentLessonIndex}
                    allLessonIdsLength={allLessonIds.length}
                    goToNextLesson={goToNextLesson}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    setSelectedCourse={setSelectedCourse}
                    getActiveLessonTitle={getActiveLessonTitle}
                    ICAD_2D_LESSONS={ICAD_2D_LESSONS}
                    ICAD_3D_LESSONS={ICAD_3D_LESSONS}
                />
            </div>
        </div>
    );
};

export default MentorMode;
