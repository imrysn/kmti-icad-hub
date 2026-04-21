/**
 * Safely parses backend error responses (FastAPI/Pydantic) into human-readable strings.
 * Prevents "Objects are not valid as a React child" crashes.
 */
export const parseBackendError = (err: any, fallback: string = 'An unexpected error occurred.'): string => {
    // 1. If it's a validation error array from FastAPI/Pydantic
    if (err.response?.data?.detail && Array.isArray(err.response.data.detail)) {
        return err.response.data.detail
            .map((d: any) => {
                // Extract field name from loc (e.g. ['body', 'password'] -> 'password')
                const field = d.loc && d.loc.length > 0 ? d.loc[d.loc.length - 1] : 'Field';
                return `${field}: ${d.msg}`;
            })
            .join(', ');
    }

    // 2. If it's a string detail (standard FastAPI HTTPException)
    if (typeof err.response?.data?.detail === 'string') {
        return err.response.data.detail;
    }

    // 3. Fallback to generic message or error string
    return err.message || fallback;
};
