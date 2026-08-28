import React from 'react';

import { PlayCircle } from 'lucide-react';
import introImg from '../../../../assets/Solidworks/card-image/intro.png';
import { ContentAvailability } from '../../../../services/availabilityService';
import { AvailabilityOverlay, availabilityLabel } from '../icad/AvailabilityOverlay';

interface Props {
    setSelectedCourse: (course: any) => void;
    availability?: ContentAvailability;
}

export const SolidworksIntroduction: React.FC<Props> = ({ setSelectedCourse, availability }) => {
    if (availability?.status === 'hidden') return null;
    const unavailable = !!availability && availability.status !== 'available';
    return (
        <div className={`course-card card-2d ${unavailable ? 'locked availability-locked' : ''}`}>
            {unavailable && <AvailabilityOverlay availability={availability} />}
            <div className="card-header">
                <h3>Introduction</h3>
            </div>
            <p>Learn the basics of SOLIDWORKS interface and workflow.</p>
            <div className="card-graphic-container card-2d-graphic-container">
                <div className="card-2d-image" style={{ 
                    height: '100%', 
                    width: '100%', 
                    backgroundImage: `url(${introImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
            </div>
            <button
                className={`primary ${unavailable ? 'disabled' : ''}`}
                disabled={unavailable}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!unavailable) setSelectedCourse({
                        id: 'mock-sw-intro',
                        title: 'SolidWorks Introduction',
                        description: 'Learn the basics of SOLIDWORKS interface and workflow.',
                        course_type: 'Manual'
                    });
                }}
            >
                {unavailable ? availabilityLabel(availability.status) : 'Launch Module'} <PlayCircle size={18} />
            </button>
        </div>
    );
};
