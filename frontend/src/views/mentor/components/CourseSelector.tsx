import { BookOpen,Lock,PlayCircle,Settings } from 'lucide-react';
import React from 'react';
import kmtiTrainingHubLogo from '../../../assets/logo/kmti-training-hub.png';
import { useAuth } from '../../../context/AuthContext';
import { useTranslation } from '../../../context/LanguageContext';
import drawing2DUrl from '../../../assets/2D.png';
import drawing2DAssessmentUrl from '../../../assets/2d-images/2D_balloon_assembly_drawing_1.png';
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
    const { t, language } = useTranslation();
    const { user } = useAuth();

    const getRoleLabel = (role?: string) => {
        if (!role) return '';
        if (language !== 'ja') return role;
        const lower = role.toLowerCase();
        if (lower === 'trainee') return '研修生';
        if (lower === 'mentor') return 'メンター';
        if (lower === 'admin') return '管理者';
        return role;
    };

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

    const courseFoundations = courses.find(c => c.course_type === 'iCAD_Foundations');

    const course3D = courses.find(c => c.course_type === '3D_Modeling') || (isEmployeeSide ? {
        id: '1',
        title: '3D Modeling',
        description: 'Develop advanced spatial visualization skills to model complex mechanical parts and multi-component assemblies. Includes parametric sketching, feature modeling (extrusion, sweep, loft), design-intent logic, and assembly constraints.',
        course_type: '3D_Modeling',
        order: 1
    } : undefined);

    const course2D = courses.find(c => c.course_type === '2D_Drawing') || (isEmployeeSide ? {
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
        ...(courseFoundations ? [{
            ...courseFoundations,
            title: t('course.title_foundations') || courseFoundations.title,
            description: t('course.desc_foundations') || courseFoundations.description
        }] : []),
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
    const isCourseLocked = (course: Course) => {
        const isPracticalLocked = !is3DCompleted && !canBypass;
        const isCourse2Locked = !is3DAssessmentCompleted && !canBypass;
        const is2DAssessmentLocked = !is2DCompleted && !canBypass;
        const id = course.id.toString();
        return id === 'practical-assessment' ? isPracticalLocked
            : id === '2' ? (isPracticalLocked || isCourse2Locked)
                : id === '2d-assessment' ? (isPracticalLocked || isCourse2Locked || is2DAssessmentLocked)
                    : false;
    };

    return (
        <div className="mentor-mode course-selector-view animate-fade-in">
            <aside className="course-home-sidebar">
                <div className="learner-sidebar-brand">
                    <img src={kmtiTrainingHubLogo} alt="KMTI Training Hub" draggable={false} />
                    <span>KMTI Training Hub</span>
                </div>

                <div className="course-home-navigation">
                    <div className="course-home-nav-heading">{language === 'ja' ? 'コース一覧' : 'Courses'}</div>
                    {allCourses.map((course) => (
                        <button key={course.id} type="button" disabled={isCourseLocked(course as Course)} onClick={() => setSelectedCourse(course as Course)}>
                            {isCourseLocked(course as Course) ? <Lock size={16} /> : <BookOpen size={16} />}
                            <span>{course.title}</span>
                        </button>
                    ))}
                </div>

                {!isEmployeeSide && <div className="learner-plan-summary course-home-plan">
                    <div><span>{language === 'ja' ? '現在のアクセスプラン' : 'CURRENT ACCESS PLAN'}</span><strong>{effectiveAccess?.plan?.name || (language === 'ja' ? 'アクティブなプランなし' : 'No active plan')}</strong></div>
                    {effectiveAccess?.plan ? <p>
                        Active from {effectiveAccess.starts_at ? new Date(effectiveAccess.starts_at.endsWith('Z') ? effectiveAccess.starts_at : `${effectiveAccess.starts_at}Z`).toLocaleDateString() : 'now'}
                        {' · '}{effectiveAccess.ends_at ? `Expires ${new Date(effectiveAccess.ends_at.endsWith('Z') ? effectiveAccess.ends_at : `${effectiveAccess.ends_at}Z`).toLocaleDateString()}` : 'No expiration'}
                    </p> : <p>{language === 'ja' ? '管理者にお問い合わせいただき、トレーニングアクセスを有効化してください。' : 'Contact KMTI administration to activate training access.'}</p>}
                </div>}

                <div className="course-home-sidebar-footer">
                    <button
                        className="learner-sidebar-account"
                        type="button"
                        onClick={() => window.dispatchEvent(new CustomEvent('kmti-open-profile-settings'))}
                    >
                        <span className="learner-account-avatar">{(user?.full_name || user?.username || 'U').trim().charAt(0).toUpperCase()}</span>
                        <span className="learner-account-copy"><strong>{user?.full_name || user?.username}</strong><small>{getRoleLabel(user?.role)}</small></span>
                        <Settings size={16} />
                    </button>
                </div>
            </aside>

            <div className="course-home-main">
                <div className={`course-selector-hero ${isEmployeeSide ? 'without-plan' : ''}`}>
                    <div className="mentor-header">
                        <h1>{t('course.welcome_title') || 'Welcome to iCAD Training'}</h1>
                        <p>{t('course.welcome_subtitle') || 'Select your learning path to begin the deep dive'}</p>
                    </div>
                </div>

                <div className="course-selection">
                <div className="course-grid">
                    {allCourses.length === 0 && <div className="no-entitled-courses"><Lock size={28} /><h3>No training content is available</h3><p>Your account is active, but its access plan does not currently include any published courses or practical sets.</p></div>}
                    {allCourses.map((course) => {
                        const isLocked = isCourseLocked(course as Course);

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
        </div>
    );
};
