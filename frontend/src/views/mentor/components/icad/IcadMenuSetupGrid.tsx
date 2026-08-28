import React from 'react';

import { PlayCircle } from 'lucide-react';
import { ContentAvailability } from '../../../../services/availabilityService';
import icadMenuSetupBackground from '../../../../assets/icad-menusetup.png';
import { AvailabilityOverlay, availabilityLabel } from './AvailabilityOverlay';

interface Props {
    setSelectedCourse: (course: any) => void;
    onLaunchMenuSetUp: () => void;
    availability?: ContentAvailability;
}

export const IcadMenuSetupGrid: React.FC<Props> = ({ onLaunchMenuSetUp, availability }) => {
    if (availability?.status === 'hidden') return null;
    const unavailable = !!availability && availability.status !== 'available';
    return (
        <div className={`course-card card-2d ${unavailable ? 'locked availability-locked' : ''}`}>
            {unavailable && <AvailabilityOverlay availability={availability} />}
            <div className="card-header">
                <h3>iCAD Menu Setup (Keywords)</h3>
            </div>
            <p>Learn iCAD menu configuration and keyword setup to customize your drafting environment efficiently.</p>
            <div className="card-graphic-container card-2d-graphic-container">
                <img src={icadMenuSetupBackground} alt="iCAD Menu Setup" className="card-2d-image" />
            </div>
            <button
                className={`primary ${unavailable ? 'disabled' : ''}`}
                disabled={unavailable}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!unavailable) onLaunchMenuSetUp();
                }}
            >
                {unavailable ? availabilityLabel(availability.status) : 'Launch Module'} <PlayCircle size={18} />
            </button>
        </div>
    );
};
