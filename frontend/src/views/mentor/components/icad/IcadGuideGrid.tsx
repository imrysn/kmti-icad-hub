import React from 'react';

import { PlayCircle } from 'lucide-react';

interface Props {
    setSelectedCourse: (course: any) => void;
    onLaunchGuide: () => void;
}

export const IcadGuideGrid: React.FC<Props> = ({ setSelectedCourse, onLaunchGuide }) => {
    return (
        <div className="course-card card-2d">
            <div className="card-header">
                <h3>iCAD Guide</h3>
            </div>
            <p>Step-by-step iCAD guide covering setup, tools, and drafting workflows for beginners and experienced users.</p>
            <div className="card-graphic-container card-2d-graphic-container">
                <div className="card-2d-image" style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
                    iCAD Guide Explorer
                </div>
            </div>
            <button
                className="primary"
                onClick={(e) => {
                    e.stopPropagation();
                    onLaunchGuide();
                }}
            >
                Launch Module <PlayCircle size={18} />
            </button>
        </div>
    );
};
