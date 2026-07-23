import { useCallback,useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { api } from '../services/api';
import { assessmentService } from '../services/assessmentService';
import { authService } from '../services/authService';

/** Trigger a single blob download in the browser */
const triggerBlobDownload = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};

/** Small helper – sleep for `ms` milliseconds */
const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export const useBulkDownload = () => {
    const { showNotification } = useNotification();
    const [isDownloading, setIsDownloading] = useState(false);

    const handleBulkDownload = useCallback(async (items: any[], type: 'tasks' | 'submissions' = 'tasks') => {
        if (!items || items.length === 0) {
            showNotification(`No ${type} to download.`, 'warning');
            return;
        }

        const token = authService.getToken();
        if (!token) {
            showNotification('Session expired. Please login again.', 'error');
            return;
        }

        // ── Electron path ────────────────────────────────────────────────────────
        if (window.electronAPI && window.electronAPI.downloadBulkFiles) {
            setIsDownloading(true);
            try {
                const payload = items.map(item => {
                    let url, relativePath;

                    if (type === 'submissions') {
                        url = assessmentService.getSubmissionDownloadUrl(item.id);

                        const taskObj = item.task || item;
                        const taskCode = taskObj.task_code || 'unknown';
                        let fileName = item.submission_file_path
                            ? item.submission_file_path.split(/[/\\]/).pop()
                            : `${taskCode}.icd`;

                        let masterPath = taskObj.master_file_path;
                        if (!masterPath || masterPath.includes('undefined')) {
                            const rawSet = taskObj.set_number ?? item.set_number;
                            const setNumber = (rawSet !== undefined && rawSet !== 'undefined' && rawSet !== null) ? rawSet : 'unknown';
                            const rawCode = taskObj.task_code ?? item.task_code;
                            const taskCodeVal = (rawCode !== undefined && rawCode !== 'undefined' && rawCode !== null) ? rawCode : 'unknown';
                            masterPath = `Units & Tasks/Set ${setNumber}/${taskCodeVal}_Master.dwg`;
                        }

                        const lastSlash = Math.max(masterPath.lastIndexOf('/'), masterPath.lastIndexOf('\\'));
                        let dirOnly = lastSlash >= 0 ? masterPath.substring(0, lastSlash) : masterPath;

                        if (fileName && fileName.match(/\.(zip|rar)$/i)) {
                            const parts = masterPath.split(/[/\\]/);
                            if (parts.length >= 3) {
                                dirOnly = parts.slice(0, 3).join('/');
                            }
                        }

                        relativePath = `${dirOnly}/${fileName}`;
                    } else {
                        url = assessmentService.getDownloadUrl(item.id);
                        const fallbackSet = item.set_number !== undefined && item.set_number !== null ? item.set_number : 'unknown';
                        const fallbackCode = item.task_code || 'unknown';
                        relativePath = item.master_file_path || `Units & Tasks/Set ${fallbackSet}/${fallbackCode}_Master.dwg`;
                    }

                    return { id: item.id, target_relative_path: relativePath, url };
                });

                const result = await window.electronAPI.downloadBulkFiles({ tasks: payload, token });

                if (result.canceled) {
                    showNotification('Bulk download canceled.', 'info');
                } else if (result.successCount > 0) {
                    showNotification(`Successfully downloaded ${result.successCount} files!`, 'success');
                    if (result.errors && result.errors.length > 0) {
                        console.error('Bulk download errors:', JSON.stringify(result.errors, null, 2));
                        showNotification(`Failed to download ${result.errors.length} files. Check console for details.`, 'warning');
                    }
                } else {
                    if (result.errors && result.errors.length > 0) {
                        console.error('Bulk download errors:', JSON.stringify(result.errors, null, 2));
                    }
                    showNotification('No files were downloaded.', 'warning');
                }
            } catch (err) {
                console.error('Bulk download error:', err);
                showNotification('An error occurred during bulk download.', 'error');
            } finally {
                setIsDownloading(false);
            }
            return;
        }

        // ── Web-browser fallback ─────────────────────────────────────────────────
        // Download each file individually using blob fetch + anchor click.
        setIsDownloading(true);
        showNotification(`Starting download of ${items.length} file(s)…`, 'info');
        let successCount = 0;
        let failCount = 0;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            try {
                let apiPath: string;
                let filename: string;

                if (type === 'submissions') {
                    apiPath = `/api/v1/assessments/submissions/${item.id}/download`;
                    const taskObj = item.task || item;
                    const taskCode = taskObj.task_code || 'unknown';
                    const originalFileName = item.submission_file_path?.split(/[/\\]/).pop() || `submission_${item.id}`;
                    filename = originalFileName.startsWith(taskCode) ? originalFileName : `${taskCode}_${originalFileName}`;
                } else {
                    apiPath = `/api/v1/assessments/tasks/${item.id}/download`;
                    const masterPath: string = item.master_file_path || '';
                    filename = masterPath.split(/[/\\]/).pop()
                        || `Set${item.set_number}_${item.task_code}_Master.dwg`;
                }

                const response = await api.get(apiPath, { responseType: 'blob', timeout: 120000 });
                triggerBlobDownload(response.data as Blob, filename);
                successCount++;

                // Stagger downloads slightly so the browser doesn't block them
                if (i < items.length - 1) await sleep(400);
            } catch (err) {
                console.error(`Failed to download item ${item.id}:`, err);
                failCount++;
            }
        }

        setIsDownloading(false);

        if (successCount > 0 && failCount === 0) {
            showNotification(`Successfully downloaded ${successCount} file(s)!`, 'success');
        } else if (successCount > 0) {
            showNotification(`Downloaded ${successCount} file(s). ${failCount} failed.`, 'warning');
        } else {
            showNotification('All downloads failed. Please try again.', 'error');
        }
    }, [showNotification]);

    return {
        handleBulkDownload,
        isDownloading
    };
};
