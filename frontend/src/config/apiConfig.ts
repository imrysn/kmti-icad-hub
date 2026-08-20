const normalizeUrl = (value: string): string => value.trim().replace(/\/+$/, '').replace(/\/api\/v1$/, '');

const getBrowserHost = (): string => {
    if (typeof window === 'undefined' || !window.location?.hostname) return '127.0.0.1';
    return window.location.hostname;
};

const resolveApiBaseUrl = (): string => {
    // 1. Explicitly configured URL takes highest priority
    const configuredUrl = typeof import.meta.env !== 'undefined'
        ? import.meta.env.VITE_API_URL?.trim()
        : '';

    if (configuredUrl) return normalizeUrl(configuredUrl);

    // 2. Local development fallback
    if (typeof import.meta.env !== 'undefined' && import.meta.env.DEV) {
        return `http://${getBrowserHost()}:3002`;
    }

    // 3. Production browser environment (relative to current domain)
    if (typeof window !== 'undefined' && /^https?:$/.test(window.location.protocol)) {
        return normalizeUrl(window.location.origin);
    }

    // 4. Ultimate fallback for production (prevents hardcoded local IPs in public builds)
    console.warn("API base URL is not configured. Falling back to relative path '/'.");
    return '';
};

export const API_BASE_URL = resolveApiBaseUrl();

if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem('custom_api_url');
}
