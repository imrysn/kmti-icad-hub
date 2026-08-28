import React from 'react';

import { PlayCircle } from 'lucide-react';
import { ContentAvailability } from '../../../../services/availabilityService';
import icadGuideBackground from '../../../../assets/icad-guide.png';
import { AvailabilityOverlay, availabilityLabel } from './AvailabilityOverlay';

interface Props {
    setSelectedCourse: (course: any) => void;
    onLaunchGuide: () => void;
    availability?: ContentAvailability;
}

export const IcadGuideGrid: React.FC<Props> = ({ onLaunchGuide, availability }) => {
    if (availability?.status === 'hidden') return null;
    const unavailable = !!availability && availability.status !== 'available';
    return (
        <div className={`course-card card-2d ${unavailable ? 'locked availability-locked' : ''}`}>
            {unavailable && <AvailabilityOverlay availability={availability} />}
            <div className="card-header">
                <h3>iCAD Guide</h3>
            </div>
            <p>Step-by-step iCAD guide covering setup, tools, and drafting workflows for beginners and experienced users.</p>
            <div className="card-graphic-container card-2d-graphic-container">
                <img src={icadGuideBackground} alt="iCAD Guide" className="card-2d-image" />
            </div>
            <button
                className={`primary ${unavailable ? 'disabled' : ''}`}
                disabled={unavailable}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!unavailable) onLaunchGuide();
                }}
            >
                {unavailable ? availabilityLabel(availability.status) : 'Launch Module'} <PlayCircle size={18} />
            </button>
        </div>
    );
};
