import React from 'react';

import { PlayCircle } from 'lucide-react';

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
                <div className="card-2d-image" style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
                    Graphic Placeholder
                </div>
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
