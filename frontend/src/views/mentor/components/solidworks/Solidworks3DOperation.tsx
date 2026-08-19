import React from 'react';

import { PlayCircle } from 'lucide-react';
import img3d from '../../../../assets/Solidworks/card-image/3d.png';

interface Props {
    setSelectedCourse: (course: any) => void;
}

export const Solidworks3DOperation: React.FC<Props> = ({ setSelectedCourse }) => {
    return (
        <div className="course-card card-2d">
            <div className="card-header">
                <h3>3D Operation</h3>
            </div>
            <p>Master 3D modeling operations and assemblies in SOLIDWORKS.</p>
            <div className="card-graphic-container card-2d-graphic-container">
                <div className="card-2d-image" style={{ 
                    height: '100%', 
                    width: '100%', 
                    backgroundImage: `url(${img3d})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
            </div>
            <button 
                className="primary" 
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCourse({
                        id: 'mock-sw-3d',
                        title: '3D Operation',
                        description: 'Master 3D modeling operations and assemblies in SOLIDWORKS.',
                        course_type: 'Manual'
                    });
                }}
            >
                Launch Module <PlayCircle size={18} />
            </button>
        </div>
    );
};
