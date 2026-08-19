import React from 'react';

import { PlayCircle } from 'lucide-react';
import img2d from '../../../../assets/Solidworks/card-image/2d.png';

interface Props {
    setSelectedCourse: (course: any) => void;
}

export const Solidworks2DOperation: React.FC<Props> = ({ setSelectedCourse }) => {
    return (
        <div className="course-card card-2d">
            <div className="card-header">
                <h3>2D Operation</h3>
            </div>
            <p>Create detailed 2D manufacturing drawings from your 3D models.</p>
            <div className="card-graphic-container card-2d-graphic-container">
                <div className="card-2d-image" style={{ 
                    height: '100%', 
                    width: '100%', 
                    backgroundImage: `url(${img2d})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
            </div>
            <button 
                className="primary" 
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCourse({
                        id: 'mock-sw-2d',
                        title: '2D Operation',
                        description: 'Create detailed 2D manufacturing drawings from your 3D models.',
                        course_type: 'Manual'
                    });
                }}
            >
                Launch Module <PlayCircle size={18} />
            </button>
        </div>
    );
};
