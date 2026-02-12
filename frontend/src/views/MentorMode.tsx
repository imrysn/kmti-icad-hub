import React from 'react';
import { BookOpen, PlayCircle, CheckCircle, Video } from 'lucide-react';
import { useCourses } from '../hooks/useCourses';
import { Course, MediaAsset } from '../types';
import { CourseCardSkeleton } from '../components/SkeletonComponents';

import '../styles/MentorMode.css';

/**
 * Mentor Mode: Structured learning path for trainees
 * Features:
 * - Step-by-step course progression
 * - "Show Me" video triggers
 * - Active testing prompts
 */
const MentorMode: React.FC = () => {
    const { courses, loading, error } = useCourses();
    const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);
    const [currentStep, setCurrentStep] = React.useState(0);
    const [showVideo, setShowVideo] = React.useState<MediaAsset | null>(null);

    const handleShowMe = (media: MediaAsset) => {
        setShowVideo(media);
    };

    const handleNextStep = () => {
        setCurrentStep(prev => prev + 1);
    };

    if (loading) return (
        <div className="mentor-mode">
            <div className="mentor-header">
                <div className="skeleton skeleton-avatar" />
                <div className="skeleton skeleton-header-title" />
                <div className="skeleton skeleton-subtitle" />
            </div>
            <div className="course-grid">
                <CourseCardSkeleton />
                <CourseCardSkeleton />
                <CourseCardSkeleton />
                <CourseCardSkeleton />
                <CourseCardSkeleton />
                <CourseCardSkeleton />
            </div>
        </div>
    );
    if (error) return <div className="mentor-error">{error}</div>;

    return (
        <div className="mentor-mode">
            <div className="mentor-header">
                <BookOpen size={32} />
                <h1>Mentor Mode</h1>
                <p>Structured Learning Path</p>
            </div>

            {!selectedCourse ? (
                <div className="course-selection">
                    <h2>Select Your Course</h2>
                    <div className="course-grid">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="course-card"
                                onClick={() => setSelectedCourse(course)}
                            >
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                <button className="btn-primary">
                                    Start Learning <PlayCircle size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="course-progress">
                    <div className="progress-header">
                        <h2>{selectedCourse.title}</h2>
                        <button onClick={() => setSelectedCourse(null)} className="btn-secondary">
                            Back to Courses
                        </button>
                    </div>

                    <div className="lesson-content">
                        <div className="step-indicator">
                            Step {currentStep + 1} of 10
                        </div>

                        <div className="lesson-text">
                            <h3>Understanding Orthographic Projection</h3>
                            <p>
                                Orthographic projection is a method of representing 3D objects in 2D.
                                It shows multiple views (front, top, side) without perspective distortion.
                            </p>

                            <button
                                className="btn-show-me"
                                onClick={() => handleShowMe({
                                    media_type: 'video',
                                    media_url: '/media/ortho_explanation.mp4',
                                    timestamp_start: 15.0,
                                    timestamp_end: 45.0,
                                    description: 'Demonstrates orthographic projection'
                                })}
                            >
                                <Video size={20} /> Show Me
                            </button>
                        </div>

                        <div className="active-test">
                            <h4>Active Test</h4>
                            <p>In iCAD, create an orthographic view of the sample cube.</p>
                            <button className="btn-primary" onClick={handleNextStep}>
                                <CheckCircle size={16} /> I've Done This
                            </button>
                        </div>
                    </div>

                    {showVideo && (
                        <div className="video-modal">
                            <div className="video-modal-content">
                                <div className="video-modal-header">
                                    <h3>{showVideo.description}</h3>
                                    <button onClick={() => setShowVideo(null)} className="video-close-btn">Close</button>
                                </div>
                                <video
                                    controls
                                    autoPlay
                                    src={`${showVideo.media_url}#t=${showVideo.timestamp_start || 0}`}
                                >
                                    Your browser does not support video.
                                </video>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MentorMode;
