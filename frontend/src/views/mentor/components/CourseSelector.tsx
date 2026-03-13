import React from 'react';
import { BookOpen, PlayCircle } from 'lucide-react';
import { Course } from '../../../types';
import { CourseCardSkeleton } from '../../../components/SkeletonComponents';

interface CourseSelectorProps {
    courses: Course[];
    loading: boolean;
    error: string | null;
    setSelectedCourse: (course: Course) => void;
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({ courses, loading, error, setSelectedCourse }) => {
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
        <div className="mentor-mode">
            <div className="mentor-header">
                <BookOpen size={32} />
                <h1>Mentor Mode</h1>
                <p>Select a structured path to begin your training</p>
            </div>
            <div className="course-selection">
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
                                Start Learning <PlayCircle size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
