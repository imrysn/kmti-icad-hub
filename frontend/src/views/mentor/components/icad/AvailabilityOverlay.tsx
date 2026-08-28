import { Clock3, Lock, Wrench } from 'lucide-react';
import React from 'react';
import { ContentAvailability } from '../../../../services/availabilityService';

export const availabilityLabel = (status: ContentAvailability['status']) =>
    status === 'maintenance' ? 'Under Maintenance' : status === 'coming_soon' ? 'Coming Soon' : 'Unavailable';

export const AvailabilityOverlay: React.FC<{ availability: ContentAvailability }> = ({ availability }) => {
    const Icon = availability.status === 'maintenance' ? Wrench : availability.status === 'coming_soon' ? Clock3 : Lock;
    return (
        <div className="locked-overlay availability-overlay" role="status">
            <div className="locked-overlay-inner">
                <Icon size={36} className="overlay-lock-icon" />
                <h3 className="availability-overlay-title">{availability.display_name}</h3>
                <span className="availability-status-label">{availabilityLabel(availability.status)}</span>
                <p className="locked-hint">{availability.message || 'This course is temporarily unavailable.'}</p>
            </div>
        </div>
    );
};
