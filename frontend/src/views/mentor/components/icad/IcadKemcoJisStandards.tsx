import React from 'react';

import { PlayCircle } from 'lucide-react';
import kemcoStandardBackground from '../../../../assets/KEMCO-STANDARD.png';

interface Props {
    setSelectedCourse: (course: any) => void;
}

export const IcadKemcoJisStandards: React.FC<Props> = ({ setSelectedCourse }) => {
    return (
        <div className="course-card card-2d">
            <div className="card-header">
                <h3>KEMCO and JIS Standard</h3>
            </div>
            <p>Learn KEMCO drafting requirements, JIS standards, materials, components, and drawing practices.</p>
            <div className="card-graphic-container card-2d-graphic-container">
                <img
                    src={kemcoStandardBackground}
                    alt="KEMCO and JIS Standard"
                    className="card-2d-image"
                />
            </div>
            <button 
                className="primary" 
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCourse({
                        id: 'mock-icad-kemco',
                        title: 'KEMCO and JIS Standard',
                        description: 'Learn KEMCO drafting requirements, JIS standards, materials, components, and drawing practices.',
                        course_type: 'Standard'
                    });
                }}
            >
                Launch Module <PlayCircle size={18} />
            </button>
        </div>
    );
};
