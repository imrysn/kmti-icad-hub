import { describe,expect,it } from 'vitest';
import { getBulkDownloadErrorMessage,getFileOperationErrorMessage } from '../fileOperationErrors';

describe('file operation errors', () => {
    it('distinguishes authentication, missing file, and unavailable storage', () => {
        expect(getFileOperationErrorMessage(new Error('HTTP 401'))).toContain('session has expired');
        expect(getFileOperationErrorMessage(new Error('HTTP 404'))).toContain('could not be found');
        expect(getFileOperationErrorMessage(new Error('HTTP 503'))).toContain('temporarily unavailable');
    });

    it('reports interrupted and locked transfers', () => {
        expect(getFileOperationErrorMessage(new Error('Download timed out'))).toContain('interrupted');
        expect(getFileOperationErrorMessage(new Error('EPERM file locked'))).toContain('currently in use');
    });

    it('uses the first structured bulk error', () => {
        expect(getBulkDownloadErrorMessage([{ code: 'HTTP_404', message: 'HTTP 404' }]))
            .toContain('could not be found');
    });
});
