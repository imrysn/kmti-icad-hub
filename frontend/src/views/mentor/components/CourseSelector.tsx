import React from 'react';
import { BookOpen, PlayCircle, Lock } from 'lucide-react'; import { Course } from '../../../types';
import { CourseCardSkeleton } from '../../../components/SkeletonComponents';

interface CourseSelectorProps {
    courses: Course[];
    loading: boolean;
    error: string | null;
    setSelectedCourse: (course: Course) => void;
    is3DCompleted: boolean;
    canBypass: boolean;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({ 
    courses, 
    loading, 
    error, 
    setSelectedCourse,
    is3DCompleted,
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

    return (
        <div className="mentor-mode course-selector-view animate-fade-in">
            <div className="mentor-header">
                <BookOpen size={48} className="lesson-intro-icon course-welcome-icon" />
                <h1>Welcome to iCAD Hub</h1>
                <p>Select your learning path to begin the deep dive</p>
            </div>
            <div className="course-selection">
                <div className="course-grid">
                    {courses.map((course) => {
                        const isLocked = course.id.toString() === '2' && !is3DCompleted && !canBypass;
                        
                        return (
                            <div 
                                key={course.id} 
                                className={`course-card ${isLocked ? 'locked' : ''}`} 
                                onClick={() => !isLocked && setSelectedCourse(course)}
                            >
                                {isLocked && (
                                    <>
                                        <div className="lock-badge">
                                            <Lock size={16} />
                                        </div>
                                        <div className="locked-overlay">
                                            <Lock size={32} />
                                            <span>Prerequisite Required</span>
                                            <p className="locked-hint">Complete 3D Modeling to unlock</p>
                                        </div>
                                    </>
                                )}
                                <div className="card-header">
                                    <h3>{course.title}</h3>
                                </div>
                                <p>{course.description}</p>
                                <button className={`primary ${isLocked ? 'disabled' : ''}`} disabled={isLocked}>
                                    {isLocked ? 'Locked' : 'Launch Module'} <PlayCircle size={18} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
