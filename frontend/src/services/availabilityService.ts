import { api } from './api';

export type AvailabilityStatus = 'available' | 'coming_soon' | 'maintenance' | 'hidden';

export interface ContentAvailability {
    resource_key: string;
    display_name: string;
    status: AvailabilityStatus;
    message: string | null;
    updated_by?: number | null;
    updated_at?: string | null;
}

export const availabilityService = {
    async list(): Promise<ContentAvailability[]> {
        const response = await api.get('/availability');
        return response.data;
    },

    async update(resourceKey: string, status: AvailabilityStatus, message: string): Promise<ContentAvailability> {
        const response = await api.put(`/availability/${resourceKey}`, { status, message });
        return response.data;
    },
};
