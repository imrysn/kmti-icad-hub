import React from 'react';

interface CourseProps {
    title: string;
    description: string;
}

const CourseCard: React.FC<CourseProps> = ({ title, description }) => {
    return (
        <div className="course-card">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default CourseCard;
