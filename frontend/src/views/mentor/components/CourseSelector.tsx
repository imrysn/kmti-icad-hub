import { Lock,PlayCircle } from 'lucide-react';
import React from 'react';
import { CourseCardSkeleton } from '../../../components/SkeletonComponents';
import { Course } from '../../../types';
import img3dModeling from '../../../assets/icad_card_image/3d_modeling.png';
import img2dDetailing from '../../../assets/icad_card_image/2d_detailing.png';
import img3dPractical from '../../../assets/icad_card_image/3d_practical_assessment.png';
import img2dAssessment from '../../../assets/icad_card_image/2d_detailing_assessment.png';

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
    isEmployeeSide?: boolean;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({
    courses,
    loading,
    error,
    setSelectedCourse,
    is3DCompleted,
    is2DCompleted,
    canBypass,
    is3DAssessmentCompleted,
    isEmployeeSide = false
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
                        {!isEmployeeSide && (
                            <>
                                <CourseCardSkeleton />
                                <CourseCardSkeleton />
                            </>
                        )}
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
        ...(isEmployeeSide ? [] : [{
            id: 'practical-assessment',
            title: '3D Practical Assessment',
            description: 'Sequential 10-set practical drafting tasks and modeling validation in iJCAD to verify structural annotation and modeling accuracy.',
            course_type: 'Practical',
            order: 1.5
        }]),
        course2D,
        ...(isEmployeeSide ? [] : [{
            id: '2d-assessment',
            title: '2D Detailing Assessment',
            description: 'Apply layout, section views, and mechanical tolerances in standard test sets to verify drafting precision.',
            course_type: 'Practical_2D',
            order: 2.5
        }])
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
                        const isPracticalLocked = !is3DCompleted && !canBypass;
                        const isCourse2Locked = !is3DAssessmentCompleted && !canBypass;
                        const is2DAssessmentLocked = !is2DCompleted && !canBypass;

                        const isLocked =
                            course.id.toString() === 'practical-assessment' ? isPracticalLocked :
                            course.id.toString() === '2' ? (isPracticalLocked || isCourse2Locked) :
                            course.id.toString() === '2d-assessment' ? (isPracticalLocked || isCourse2Locked || is2DAssessmentLocked) :
                            false;

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
                                    <div className="card-graphic-container card-2d-graphic-container">
                                        <img src={img3dModeling} alt="3D Modeling" className="card-2d-image" />
                                    </div>
                                ) : course.id.toString() === '2' ? (
                                    <div className="card-graphic-container card-2d-graphic-container">
                                        <img src={img2dDetailing} alt="2D Detailing" className="card-2d-image" />
                                    </div>
                                ) : course.id.toString() === 'practical-assessment' ? (
                                    <div className="card-graphic-container card-2d-graphic-container">
                                        <img src={img3dPractical} alt="3D Practical" className="card-2d-image" />
                                    </div>
                                ) : (
                                    <div className="card-graphic-container card-2d-graphic-container">
                                        <img src={img2dAssessment} alt="2D Assessment" className="card-2d-image" />
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
