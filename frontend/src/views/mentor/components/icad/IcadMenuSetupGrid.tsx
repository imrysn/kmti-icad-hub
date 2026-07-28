import React from 'react';

import { PlayCircle } from 'lucide-react';

interface Props {
    setSelectedCourse: (course: any) => void;
    onLaunchMenuSetUp: () => void;
}

export const IcadMenuSetupGrid: React.FC<Props> = ({ setSelectedCourse, onLaunchMenuSetUp }) => {
    return (
        <div className="course-card card-2d">
            <div className="card-header">
                <h3>iCAD Menu Setup (Keywords)</h3>
            </div>
            <p>Learn iCAD menu configuration and keyword setup to customize your drafting environment efficiently.</p>
            <div className="card-graphic-container card-2d-graphic-container">
                <div className="card-2d-image" style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
                    Menu Setup Explorer
                </div>
            </div>
            <button
                className="primary"
                onClick={(e) => {
                    e.stopPropagation();
                    onLaunchMenuSetUp();
                }}
            >
                Launch Module <PlayCircle size={18} />
            </button>
        </div>
    );
};
