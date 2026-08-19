import React from 'react';

import { PlayCircle } from 'lucide-react';
import introImg from '../../../../assets/Solidworks/card-image/intro.png';

interface Props {
    setSelectedCourse: (course: any) => void;
}

export const SolidworksIntroduction: React.FC<Props> = ({ setSelectedCourse }) => {
    return (
        <div className="course-card card-2d">
            <div className="card-header">
                <h3>Introduction</h3>
            </div>
            <p>Learn the basics of SOLIDWORKS interface and workflow.</p>
            <div className="card-graphic-container card-2d-graphic-container">
                <div className="card-2d-image" style={{ 
                    height: '100%', 
                    width: '100%', 
                    backgroundImage: `url(${introImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
            </div>
            <button
                className="primary"
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCourse({
                        id: 'mock-sw-intro',
                        title: 'SolidWorks Introduction',
                        description: 'Learn the basics of SOLIDWORKS interface and workflow.',
                        course_type: 'Manual'
                    });
                }}
            >
                Launch Module <PlayCircle size={18} />
            </button>
        </div>
    );
};
