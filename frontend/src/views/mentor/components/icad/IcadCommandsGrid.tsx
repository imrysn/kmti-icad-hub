import React from 'react';
import { PlayCircle } from 'lucide-react';

interface Props {
    setSelectedCourse: (course: any) => void;
    onLaunchCommands: () => void;
}

export const IcadCommandsGrid: React.FC<Props> = ({ onLaunchCommands }) => {
    return (
        <div className="course-card card-2d">
            <div className="card-header">
                <h3>iCAD Commands</h3>
            </div>
            <p>Explore the full iCAD drafting command reference — menus, sub-menus, and child commands.</p>
            <div className="card-graphic-container card-2d-graphic-container">
                <div className="card-2d-image" style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-muted)',
                }}>
                    Drafting Command Explorer
                </div>
            </div>
            <button className="primary" onClick={onLaunchCommands}>
                Launch Module <PlayCircle size={18} />
            </button>
        </div>
    );
};