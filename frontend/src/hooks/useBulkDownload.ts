import { useCallback, useState } from 'react';
import { AssessmentTask, assessmentService } from '../services/assessmentService';
import { authService } from '../services/authService';
import { useNotification } from '../context/NotificationContext';

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

        if (window.electronAPI && window.electronAPI.downloadBulkFiles) {
            setIsDownloading(true);
            try {
                // Map items to payload
                const payload = items.map(item => {
                    let url, relativePath;
                    
                    if (type === 'submissions') {
                        url = assessmentService.getSubmissionDownloadUrl(item.id);
                        
                        // Force exactly the same directory structure as the bulk master files
                        const taskObj = item.task || item;
                        const fileName = item.submission_file_path ? item.submission_file_path.split(/[\\/]/).pop() : `${taskObj.task_code || 'unknown'}.icd`;
                        
                        let masterPath = taskObj.master_file_path;
                        if (!masterPath || masterPath.includes('undefined')) {
                            const rawSet = taskObj.set_number ?? item.set_number;
                            const setNumber = (rawSet !== undefined && rawSet !== 'undefined' && rawSet !== null) ? rawSet : 'unknown';
                            
                            const rawCode = taskObj.task_code ?? item.task_code;
                            const taskCode = (rawCode !== undefined && rawCode !== 'undefined' && rawCode !== null) ? rawCode : 'unknown';
                            
                            masterPath = `Units & Tasks/Set ${setNumber}/${taskCode}_Master.dwg`;
                        }
                        
                        // Extract just the directory from the master path
                        const lastSlash = Math.max(masterPath.lastIndexOf('/'), masterPath.lastIndexOf('\\'));
                        let dirOnly = lastSlash >= 0 ? masterPath.substring(0, lastSlash) : masterPath;
                        
                        // For extra folders like .zip and .rar, place them in the unit root folder (e.g. 2655RCGR) instead of deeper folders like Parts/
                        if (fileName.match(/\.(zip|rar)$/i)) {
                            const parts = masterPath.split(/[\\/]/);
                            if (parts.length >= 3) {
                                dirOnly = parts.slice(0, 3).join('/');
                            }
                        }
                        
                        relativePath = `${dirOnly}/${fileName}`;
                    } else {
                        url = assessmentService.getDownloadUrl(item.id);
                        let fallbackSet = item.set_number !== undefined && item.set_number !== null ? item.set_number : 'unknown';
                        let fallbackCode = item.task_code || 'unknown';
                        relativePath = item.master_file_path || `Units & Tasks/Set ${fallbackSet}/${fallbackCode}_Master.dwg`;
                    }

                    return {
                        id: item.id,
                        target_relative_path: relativePath,
                        url: url
                    };
                });

                const result = await window.electronAPI.downloadBulkFiles({ tasks: payload, token });
                
                if (result.canceled) {
                    showNotification('Bulk download canceled.', 'info');
                } else if (result.successCount > 0) {
                    showNotification(`Successfully downloaded ${result.successCount} files!`, 'success');
                    if (result.errors && result.errors.length > 0) {
                        showNotification(`Failed to download ${result.errors.length} files.`, 'warning');
                    }
                } else {
                    showNotification('No files were downloaded.', 'warning');
                }
            } catch (err) {
                console.error('Bulk download error:', err);
                showNotification('An error occurred during bulk download.', 'error');
            } finally {
                setIsDownloading(false);
            }
        } else {
            showNotification('Bulk download is only available in the Desktop App.', 'warning');
        }
    }, [showNotification]);

    return {
        handleBulkDownload,
        isDownloading
    };
};
