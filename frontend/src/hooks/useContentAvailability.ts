import { useCallback, useEffect, useMemo, useState } from 'react';
import { availabilityService, ContentAvailability } from '../services/availabilityService';

export const useContentAvailability = () => {
    const [items, setItems] = useState<ContentAvailability[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        try {
            setError(null);
            setItems(await availabilityService.list());
        } catch {
            setError('Course availability could not be loaded.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void refresh();

        const refreshInterval = window.setInterval(() => { void refresh(); }, 30_000);
        const handleAvailabilityChanged = () => { void refresh(); };
        window.addEventListener('courseAvailabilityChanged', handleAvailabilityChanged);

        return () => {
            window.clearInterval(refreshInterval);
            window.removeEventListener('courseAvailabilityChanged', handleAvailabilityChanged);
        };
    }, [refresh]);

    const byKey = useMemo(() => Object.fromEntries(items.map(item => [item.resource_key, item])), [items]);
    return { items, byKey, loading, error, refresh, setItems };
};
