import { Lock,PlayCircle } from 'lucide-react';
import React from 'react';
import { useTranslation } from '../../../context/LanguageContext';
import drawing2DUrl from '../../../assets/2D.png';
import drawing2DAssessmentUrl from '../../../assets/2D_Image_File/2D_balloon_assembly_drawing_1.png';
import practical3DImgUrl from '../../../assets/froming4.webp';
import uncoilerUrl from '../../../assets/uncoiler.glb';
import { ModelViewer3D } from '../../../components/ModelViewer3D';
import { CourseCardSkeleton } from '../../../components/SkeletonComponents';
import { Course } from '../../../types';
import { EffectiveEntitlements } from '../../../services/authService';

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
    effectiveAccess: EffectiveEntitlements | null;
    planLoading: boolean;
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
    isEmployeeSide = false,
    effectiveAccess,
    planLoading
}) => {
    const { t } = useTranslation();

    if (loading || planLoading) {
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

    const course3D = courses.find(c => c.id.toString() === '1') || (isEmployeeSide ? {
        id: '1',
        title: '3D Modeling',
        description: 'Develop advanced spatial visualization skills to model complex mechanical parts and multi-component assemblies. Includes parametric sketching, feature modeling (extrusion, sweep, loft), design-intent logic, and assembly constraints.',
        course_type: '3D_Modeling',
        order: 1
    } : undefined);

    const course2D = courses.find(c => c.id.toString() === '2') || (isEmployeeSide ? {
        id: '2',
        title: '2D Detailing',
        description: 'Master the art of technical drafting. Convert raw 3D geometry into fabrication-ready drawings. Focuses on section views, isometric details, annotations, standard bill of materials (BOM), and mechanical tolerancing.',
        course_type: '2D_Drawing',
        order: 2
    } : undefined);

    const practicalIds = new Set((effectiveAccess?.entitlements || []).filter((item) => item.resource_type === 'practical_set').map((item) => item.resource_id));
    const has3DPractical = isEmployeeSide || Array.from(practicalIds).some((id) => id === '*' || id.startsWith('3D:'));
    const has2DPractical = isEmployeeSide || Array.from(practicalIds).some((id) => id === '*' || id.startsWith('2D:'));

    const activeCards = [
        ...(course3D ? [{
            ...course3D,
            title: t('course.title_3d') || course3D.title,
            description: t('course.desc_3d') || course3D.description
        }] : []),
        ...(!isEmployeeSide && has3DPractical ? [{
            id: 'practical-assessment',
            title: t('course.title_3d_prac') || '3D Practical Assessment',
            description: t('course.desc_3d_prac') || 'Sequential 10-set practical drafting tasks and modeling validation in iJCAD to verify structural annotation and modeling accuracy.',
            course_type: 'Practical',
            order: 1.5
        }] : []),
        ...(course2D ? [{
            ...course2D,
            title: t('course.title_2d') || course2D.title,
            description: t('course.desc_2d') || course2D.description
        }] : []),
        ...(!isEmployeeSide && has2DPractical ? [{
            id: '2d-assessment',
            title: t('course.title_2d_assessment') || '2D Detailing Assessment',
            description: t('course.desc_2d_assessment') || 'Apply layout, section views, and mechanical tolerances in standard test sets to verify drafting precision.',
            course_type: 'Practical_2D',
            order: 2.5
        }] : [])
    ];

    const allCourses = [...activeCards];

    return (
        <div className="mentor-mode course-selector-view animate-fade-in">
            <div className="mentor-header">
                <h1>{t('course.welcome_title') || 'Welcome to iCAD Training'}</h1>
                <p>{t('course.welcome_subtitle') || 'Select your learning path to begin the deep dive'}</p>
            </div>

            {!isEmployeeSide && <div className="learner-plan-summary">
                <div><span>CURRENT ACCESS PLAN</span><strong>{effectiveAccess?.plan?.name || 'No active plan'}</strong></div>
                {effectiveAccess?.plan ? <p>
                    Active from {effectiveAccess.starts_at ? new Date(effectiveAccess.starts_at.endsWith('Z') ? effectiveAccess.starts_at : `${effectiveAccess.starts_at}Z`).toLocaleDateString() : 'now'}
                    {' · '}{effectiveAccess.ends_at ? `Expires ${new Date(effectiveAccess.ends_at.endsWith('Z') ? effectiveAccess.ends_at : `${effectiveAccess.ends_at}Z`).toLocaleDateString()}` : 'No expiration'}
                </p> : <p>Contact KMTI administration to activate training access.</p>}
            </div>}

            <div className="course-selection">
                <div className="course-grid">
                    {allCourses.length === 0 && <div className="no-entitled-courses"><Lock size={28} /><h3>No training content is available</h3><p>Your account is active, but its access plan does not currently include any published courses or practical sets.</p></div>}
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
                                            <span>{t('course.locked') || 'Locked'}</span>
                                            <p className="locked-hint">
                                                {course.id.toString() === 'practical-assessment'
                                                    ? (t('course.unlock_3d_prac') || 'Complete 3D Modeling to unlock')
                                                    : course.id.toString() === '2d-assessment'
                                                        ? (t('course.unlock_2d_det') || 'Complete 2D Detailing to unlock')
                                                        : (t('course.unlock_3d_det') || 'Complete 3D Practical Assessment to unlock')}
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
                                    {isLocked ? (t('course.locked') || 'Locked') : (t('course.launch') || 'Launch Module')} <PlayCircle size={18} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
