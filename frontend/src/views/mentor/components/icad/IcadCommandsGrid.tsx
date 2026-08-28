import React from 'react';
import { PlayCircle } from 'lucide-react';
import { ContentAvailability } from '../../../../services/availabilityService';
import { AvailabilityOverlay, availabilityLabel } from './AvailabilityOverlay';

interface Props {
    setSelectedCourse: (course: any) => void;
    onLaunchCommands: () => void;
    availability?: ContentAvailability;
}

export const IcadCommandsGrid: React.FC<Props> = ({ onLaunchCommands, availability }) => {
    if (availability?.status === 'hidden') return null;
    const unavailable = !!availability && availability.status !== 'available';
    return (
        <div className={`course-card card-2d ${unavailable ? 'locked availability-locked' : ''}`}>
            {unavailable && <AvailabilityOverlay availability={availability} />}
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
            <button className={`primary ${unavailable ? 'disabled' : ''}`} disabled={unavailable} onClick={() => !unavailable && onLaunchCommands()}>
                {unavailable ? availabilityLabel(availability.status) : 'Launch Module'} <PlayCircle size={18} />
            </button>
        </div>
    );
};
