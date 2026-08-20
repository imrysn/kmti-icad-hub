import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export interface PlatformService {
    isDesktopApp: boolean;
    flashWindow: () => void;
    setWindowSize: (width: number, height: number, resizable: boolean) => void;
    minimize: () => void;
    maximize: () => void;
    close: () => void;
    openFile: (filePath: string) => void;
    downloadAndOpen: (params: { url: string; filename: string; token: string; appName?: string }) => Promise<any>;
    downloadBulkFiles: (params: { tasks: { id: number; url: string; target_relative_path?: string; set_number?: number; task_code?: string }[]; token: string }) => Promise<any>;
}

class ElectronPlatform implements PlatformService {
    isDesktopApp = true;
    
    flashWindow() {
        if (window.electronAPI?.flashWindow) window.electronAPI.flashWindow();
    }

    setWindowSize(width: number, height: number, resizable: boolean) {
        if (window.electronAPI?.setWindowSize) window.electronAPI.setWindowSize(width, height, resizable);
    }

    minimize() {
        if (window.electronAPI?.minimize) window.electronAPI.minimize();
    }

    maximize() {
        if (window.electronAPI?.maximize) window.electronAPI.maximize();
    }

    close() {
        if (window.electronAPI?.close) window.electronAPI.close();
    }

    openFile(filePath: string) {
        if (window.electronAPI?.openFile) window.electronAPI.openFile(filePath);
    }

    async downloadAndOpen(params: { url: string; filename: string; token: string; appName?: string }) {
        if (window.electronAPI?.downloadAndOpen) {
            return await window.electronAPI.downloadAndOpen(params);
        }
        throw new Error("downloadAndOpen not available");
    }

    async downloadBulkFiles(params: { tasks: { id: number; url: string; target_relative_path?: string; set_number?: number; task_code?: string }[]; token: string }) {
        if (window.electronAPI?.downloadBulkFiles) {
            return await window.electronAPI.downloadBulkFiles(params as any);
        }
        throw new Error("downloadBulkFiles not available");
    }
}

class BrowserPlatform implements PlatformService {
    isDesktopApp = false;

    private originalTitle = document.title;
    private flashInterval: any = null;

    flashWindow() {
        if (this.flashInterval) return;
        let isFlash = false;
        this.flashInterval = setInterval(() => {
            document.title = isFlash ? "(1) New Notice" : this.originalTitle;
            isFlash = !isFlash;
        }, 1000);
        setTimeout(() => {
            clearInterval(this.flashInterval);
            this.flashInterval = null;
            document.title = this.originalTitle;
        }, 10000);
    }

    setWindowSize(_width: number, _height: number, _resizable: boolean) {
        // No-op in browser
    }

    minimize() {
        // No-op in browser
    }

    maximize() {
        // No-op in browser
    }

    close() {
        // Just no-op in browser
    }

    openFile(_filePath: string) {
        console.warn("openFile not supported in browser.");
    }

    async downloadAndOpen(params: { url: string; filename: string; token: string; appName?: string }) {
        // Instead of opening, trigger a file download using fetch and Blob
        const response = await fetch(params.url, {
            headers: {
                Authorization: `Bearer ${params.token}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to download: HTTP ${response.status}`);
        }
        
        const blob = await response.blob();
        saveAs(blob, params.filename);
        
        // Show an alert or custom notification (returning a dummy object for now)
        alert(`File downloaded: ${params.filename}\nPlease open it locally using ${params.appName || 'the appropriate application'}.`);
        return { success: true, localPath: params.filename };
    }

    async downloadBulkFiles(params: { tasks: { id: number; url: string; target_relative_path?: string; set_number?: number; task_code?: string }[]; token: string }) {
        const zip = new JSZip();
        
        // Fetch all files
        const promises = params.tasks.map(async (task) => {
            let relativePath = task.target_relative_path || `Units & Tasks/Set ${task.set_number || 'unknown'}/${task.task_code || 'unknown'}_Master.dwg`;
            
            // Clean up relative path similar to Electron's logic
            relativePath = relativePath.replace(/\\/g, '/').replace(/^(\.\.[\/\\])+/, '');
            const match = relativePath.match(/(?:Unts|Units) & Tasks[\/\\](.*)/i);
            if (match) {
                relativePath = match[1];
            }

            const response = await fetch(task.url, {
                headers: {
                    Authorization: `Bearer ${params.token}`
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                zip.file(relativePath, blob);
                return { success: true, taskId: task.id };
            } else {
                console.error(`Error downloading task ${task.id}`);
                return { success: false, taskId: task.id, error: response.statusText };
            }
        });

        const results = await Promise.all(promises);
        const successCount = results.filter(r => r.success).length;
        
        if (successCount > 0) {
            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, "bulk_download.zip");
        }

        return {
            canceled: false,
            successCount,
            errors: results.filter(r => !r.success)
        };
    }
}

// Export a singleton instance dynamically resolved
const platform = window.electronAPI ? new ElectronPlatform() : new BrowserPlatform();
export default platform;
