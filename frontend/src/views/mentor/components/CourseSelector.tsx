import React from 'react';
import { BookOpen, PlayCircle, Lock, Layers } from 'lucide-react'; import { Course } from '../../../types';
import { CourseCardSkeleton } from '../../../components/SkeletonComponents';
import { ModelViewer3D } from '../../../components/ModelViewer3D';
import uncoilerUrl from '../../../assets/uncoiler.glb';
import drawing2DUrl from '../../../assets/2D.png';
import practical3DImgUrl from '../../../assets/froming4.webp';
import drawing2DAssessmentUrl from '../../../assets/2D_Image_File/2D_balloon_assembly_drawing_1.png';

interface CourseSelectorProps {
    courses: Course[];
    loading: boolean;
    error: string | null;
    setSelectedCourse: (course: Course) => void;
    is3DCompleted: boolean;
    is2DCompleted: boolean;
    isAnnotationCompleted: boolean;
    canBypass: boolean;
    is3DAssessmentCompleted: boolean;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({
    courses,
    loading,
    error,
    setSelectedCourse,
    is3DCompleted,
    is2DCompleted,
    isAnnotationCompleted,
    canBypass,
    is3DAssessmentCompleted
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

    const course3D = courses.find(c => c.id.toString() === '1') || {
        id: '1',
        title: '3D Modeling',
        description: 'Develop advanced spatial visualization skills to model complex mechanical parts and multi-component assemblies. Includes parametric sketching, feature modeling (extrusion, sweep, loft), design-intent logic, and assembly constraints.',
        course_type: '3D_Modeling',
        order: 1
    };

    const course2D = courses.find(c => c.id.toString() === '2') || {
        id: '2',
        title: '2D Detailing',
        description: 'Master the art of technical drafting. Convert raw 3D geometry into fabrication-ready drawings. Focuses on section views, isometric details, annotations, standard bill of materials (BOM), and mechanical tolerancing.',
        course_type: '2D_Drawing',
        order: 2
    };

    const activeCards = [
        course3D,
        {
            id: 'practical-assessment',
            title: '3D Practical Assessment',
            description: 'Sequential 10-set practical drafting tasks and modeling validation in iJCAD to verify structural annotation and modeling accuracy.',
            course_type: 'Practical',
            order: 1.5
        },
        course2D,
        {
            id: '2d-assessment',
            title: '2D Detailing Assessment',
            description: 'Apply layout, section views, and mechanical tolerances in standard test sets to verify drafting precision.',
            course_type: 'Practical_2D',
            order: 2.5
        }
    ];

    const allCourses = [...activeCards];

    return (
        <div className="mentor-mode course-selector-view animate-fade-in">
            <div className="mentor-header">
                <h1>Welcome to iCAD Training</h1>
                <p>Select your learning path to begin the deep dive</p>
            </div>

            <div className="course-selection">
                <div className="course-grid">
                    {allCourses.map((course) => {
                        const isLocked = (course.id.toString() === 'practical-assessment' && !is3DCompleted && !canBypass) ||
                            (course.id.toString() === '2' && !is3DAssessmentCompleted && !canBypass) ||
                            (course.id.toString() === '2d-assessment' && !is2DCompleted && !canBypass);

                        return (
                            <div
                                key={course.id}
                                className={`course-card ${course.id.toString() === '1' ? 'card-3d' : ''} ${course.id.toString() === '2' ? 'card-2d' : ''} ${course.id.toString() === 'practical-assessment' ? 'card-practical-3d card-practical' : ''} ${course.id.toString() === '2d-assessment' ? 'card-practical-2d card-practical' : ''} ${isLocked ? 'locked' : ''}`}
                            >
                                {isLocked && (
                                    <div className="locked-overlay">
                                        <div className="locked-overlay-inner">
                                            <Lock size={36} className="overlay-lock-icon" />
                                            <span>Prerequisite Required</span>
                                            <p className="locked-hint">
                                                {course.id.toString() === 'practical-assessment'
                                                    ? 'Complete 3D Modeling to unlock'
                                                    : course.id.toString() === '2d-assessment'
                                                        ? 'Complete 2D Detailing to unlock'
                                                        : 'Complete 3D Practical Assessment to unlock'}
                                            </p>
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
                                ) : course.id.toString() === 'practical-assessment' ? (
                                    <div className="card-graphic-container card-2d-graphic-container">
                                        <img src={practical3DImgUrl} alt="3D Practical" className="card-2d-image" />
                                    </div>
                                ) : (
                                    <div className="card-graphic-container card-2d-graphic-container">
                                        <img src={drawing2DAssessmentUrl} alt="2D Assessment" className="card-2d-image" />
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
