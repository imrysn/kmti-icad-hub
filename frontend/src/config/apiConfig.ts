const normalizeUrl = (value: string): string => value.trim().replace(/\/+$/, '').replace(/\/api\/v1$/, '');

const getBrowserHost = (): string => {
    if (typeof window === 'undefined' || !window.location?.hostname) return '127.0.0.1';
    return window.location.hostname;
};

const resolveApiBaseUrl = (): string => {
    const configuredUrl = typeof import.meta.env !== 'undefined'
        ? import.meta.env.VITE_API_URL?.trim()
        : '';

    if (configuredUrl) return normalizeUrl(configuredUrl);

    if (typeof import.meta.env !== 'undefined' && import.meta.env.DEV) {
        return `http://${getBrowserHost()}:3001`;
    }

    if (typeof window !== 'undefined' && /^https?:$/.test(window.location.protocol)) {
        return normalizeUrl(window.location.origin);
    }

    return 'http://127.0.0.1:3001';
};

export const API_BASE_URL = resolveApiBaseUrl();

if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem('custom_api_url');
}
