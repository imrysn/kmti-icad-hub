import React from 'react';
import { BookOpen, PlayCircle, Lock, Layers, Compass } from 'lucide-react'; import { Course } from '../../../types';
import { CourseCardSkeleton } from '../../../components/SkeletonComponents';
import { ModelViewer3D } from '../../../components/ModelViewer3D';
import uncoilerUrl from '../../../assets/uncoiler.glb';
import drawing2DUrl from '../../../assets/2D.png';

interface CourseSelectorProps {
    courses: Course[];
    loading: boolean;
    error: string | null;
    setSelectedCourse: (course: Course) => void;
    is3DCompleted: boolean;
    is2DCompleted: boolean;
    canBypass: boolean;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({
    courses,
    loading,
    error,
    setSelectedCourse,
    is3DCompleted,
    is2DCompleted,
    canBypass
}) => {
    if (loading) {
        return (
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
    }

    if (error) {
        return <div className="mentor-error">{error}</div>;
    }

    const allCourses = [
        ...courses,
        {
            id: 'coming-soon',
            title: 'Coming Soon',
            description: 'This module is under development.',
            course_type: '3d',
            order: 999
        }
    ];

    return (
        <div className="mentor-mode course-selector-view animate-fade-in">
            <div className="mentor-header">
                <h1>Welcome to iCAD Hub</h1>
                <p>Select your learning path to begin the deep dive</p>
            </div>

            <div className="course-selection">
                <div className="course-grid">
                    {allCourses.map((course) => {
                        const isComingSoon = course.id.toString() === 'coming-soon';
                        const isLocked = isComingSoon || (course.id.toString() === '2' && !is3DCompleted && !canBypass);

                        return (
                            <div
                                key={course.id}
                                className={`course-card ${course.id.toString() === '1' ? 'card-3d' : ''} ${course.id.toString() === '2' ? 'card-2d' : ''} ${isLocked ? 'locked' : ''} ${isComingSoon ? 'coming-soon-card' : ''}`}
                            >
                                {isLocked && (
                                    <div className="locked-overlay">
                                        <div className="locked-overlay-inner">
                                            {isComingSoon ? (
                                                <>
                                                    <Compass size={36} className="overlay-lock-icon animate-pulse" />
                                                    <span>Under Development</span>
                                                    <p className="locked-hint">Advanced modules launching soon</p>
                                                </>
                                            ) : (
                                                <>
                                                    <Lock size={36} className="overlay-lock-icon" />
                                                    <span>Prerequisite Required</span>
                                                    <p className="locked-hint">Complete 3D Modeling to unlock</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="card-header">
                                    <h3>{course.title}</h3>
                                </div>

                                <p>{course.description}</p>

                                {course.id.toString() === '1' ? (
                                    <div className="card-graphic-container">
                                        <ModelViewer3D glbUrl={uncoilerUrl} />
                                    </div>
                                ) : course.id.toString() === '2' ? (
                                    <div className="card-graphic-container card-2d-graphic-container">
                                        <img src={drawing2DUrl} alt="2D Drawing" className="card-2d-image" />
                                    </div>
                                ) : (
                                    <div className="card-graphic-container" style={{ opacity: 0.15 }}>
                                        <svg viewBox="0 0 100 100" className="card-svg-graphic coming-soon-graphic">
                                            <rect x="15" y="15" width="70" height="70" rx="8" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" strokeDasharray="4,4" />
                                            <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
                                            <path d="M 50,25 L 50,50 L 65,50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                )}

                                <button
                                    className={`primary ${isLocked ? 'disabled' : ''}`}
                                    disabled={isLocked}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!isLocked) setSelectedCourse(course as any);
                                    }}
                                >
                                    {isComingSoon ? 'Coming Soon' : isLocked ? 'Locked' : 'Launch Module'} <PlayCircle size={18} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
