export const getFileOperationErrorMessage = (
    error: unknown,
    action: 'download' | 'open' = 'download',
    applicationName = 'the application'
): string => {
    const rawMessage = error instanceof Error
        ? error.message
        : typeof error === 'string'
            ? error
            : String((error as any)?.message || '');
    const message = rawMessage.toLowerCase();

    if (message.includes('already being prepared') || message.includes('operation_in_progress')) {
        return 'This file is already being prepared. Please wait for the current operation to finish.';
    }
    if (message.includes('http 401') || message.includes('status code 401') || message.includes('authentication token')) {
        return 'Your session has expired. Please sign in again.';
    }
    if (message.includes('http 403') || message.includes('status code 403')) {
        return 'You do not have permission to access this file.';
    }
    if (message.includes('http 404') || message.includes('status code 404')) {
        return 'The file could not be found on the server.';
    }
    if (/http 50[234]/.test(message) || /status code 50[234]/.test(message) || message.includes('storage temporarily unavailable')) {
        return 'File storage is temporarily unavailable. Please try again shortly.';
    }
    if (message.includes('timed out') || message.includes('network') || message.includes('interrupted')) {
        return 'The file transfer was interrupted. Please check the connection and try again.';
    }
    if (message.includes('locked') || message.includes('eperm') || message.includes('eacces')) {
        return 'The local file is currently in use. Close the existing copy and try again.';
    }
    if (message.includes('empty')) {
        return 'The server returned an empty file. Please try again or contact an administrator.';
    }
    if (action === 'open') {
        return `The file was downloaded, but ${applicationName} could not open it. Check that the application is installed and associated with this file type.`;
    }
    return 'The file could not be downloaded. Please try again.';
};

export const getBulkDownloadErrorMessage = (errors: any[] = []): string => {
    if (errors.length === 0) return 'No files were downloaded.';
    return getFileOperationErrorMessage(errors[0]?.message || errors[0]?.error || errors[0]);
};
