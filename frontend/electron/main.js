const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const Menu = electron.Menu;
const path = require('path');
const fs = require('fs');
const { net } = require('electron');
const { spawn } = require('child_process');

const CAD_EXECUTABLES = Object.freeze({
    ijcad: 'gcad.exe',
    nanocad: 'ncad.exe',
    icad: 'icad.exe',
    solidworks: 'SLDWORKS.exe',
});

function isPathInside(parentDir, candidatePath) {
    const relative = path.relative(path.resolve(parentDir), path.resolve(candidatePath));
    return relative !== '' && !relative.startsWith('..') && !path.isAbsolute(relative);
}

function normalizeDownloadUrl(rawUrl) {
    if (typeof rawUrl !== 'string') throw new Error('Invalid download URL');
    const parsed = new URL(rawUrl.replace('localhost', '127.0.0.1'));
    if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error('Unsupported download protocol');
    }

    const host = parsed.hostname.toLowerCase();
    const isApprovedHost = host === '127.0.0.1'
        || host === 'localhost'
        || host === 'kmti-nas'
        || /^10\./.test(host)
        || /^192\.168\./.test(host)
        || /^172\.(1[6-9]|2\d|3[01])\./.test(host);
    if (!isApprovedHost) throw new Error('Download host is not approved');
    return parsed.toString();
}

ipcMain.handle('print-document', async (event, options = {}) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return { success: false, error: 'Unable to find the active window.' };

    return new Promise((resolve) => {
        win.webContents.print(options, (success, failureReason) => {
            if (success) {
                resolve({ success: true });
                return;
            }

            const reason = failureReason || 'Printing failed.';
            const canceled = /cancel(?:ed|led)?/i.test(reason);
            resolve(canceled
                ? { success: false, canceled: true }
                : { success: false, error: reason });
        });
    });
});

ipcMain.handle('save-pdf', async (event, options = {}) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return { success: false, error: 'Unable to find the active window.' };

    const safeDefaultName = path.basename(options.defaultName || 'Quotation.pdf')
        .replace(/[^a-zA-Z0-9._-]/g, '_');
    const { canceled, filePath } = await electron.dialog.showSaveDialog(win, {
        title: 'Save PDF',
        defaultPath: path.join(app.getPath('documents'), safeDefaultName),
        filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
    });
    if (canceled || !filePath) return { success: false, canceled: true };

    try {
        const pdf = await win.webContents.printToPDF({
            printBackground: true,
            pageSize: 'A4',
            landscape: false,
            marginsType: 1,
        });
        await fs.promises.writeFile(filePath, pdf);
        return { success: true, filePath };
    } catch (error) {
        return { success: false, error: error.message || String(error) };
    }
});

// Enable hardware acceleration for smooth rendering performance.
// (Only disable if running in headless environments or VMs lacking DirectX runtimes)
// app.disableHardwareAcceleration();
// app.commandLine.appendSwitch('disable-gpu');
// app.commandLine.appendSwitch('disable-gpu-sandbox');




function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        frame: false, // Make the window frameless
        transparent: false,
        backgroundColor: '#020617',
        resizable: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            sandbox: true,
            zoomFactor: 1.0, // Force 100% zoom on start
        },
    });

    // Development-only shortcuts; packaged builds do not expose DevTools/reload.
    if (!app.isPackaged) {
        mainWindow.webContents.on('before-input-event', (event, input) => {
            if (input.type === 'keyDown') {
                if ((input.control || input.meta) && input.shift && input.key.toLowerCase() === 'i') {
                    mainWindow.webContents.toggleDevTools();
                    event.preventDefault();
                } else if (input.key === 'F12') {
                    mainWindow.webContents.toggleDevTools();
                    event.preventDefault();
                } else if ((input.control || input.meta) && input.key.toLowerCase() === 'r') {
                    mainWindow.webContents.reload();
                    event.preventDefault();
                }
            }
        });
    }

    // Handle development shortcuts and DevTools
    if (!app.isPackaged) {
        const devUrl = 'http://localhost:5173';
        mainWindow.loadURL(devUrl).catch(() => {
            console.log('Failed to load 5173, trying 5174...');
            mainWindow.loadURL('http://localhost:5174');
        });

        // DevTools auto-open disabled to prevent "Failed to fetch" console errors
        // mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
        mainWindow.removeMenu();
        Menu.setApplicationMenu(null);
    }

    // Handle Window Management IPC
    ipcMain.on('window-minimize', () => {
        mainWindow.minimize();
    });

    ipcMain.on('window-maximize', () => {
        mainWindow.setResizable(true);
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    });

    ipcMain.on('window-close', () => {
        mainWindow.close();
    });

    ipcMain.on('open-file', (event, filePath) => {
        if (!filePath || typeof filePath !== 'string' || filePath.includes('..')) {
            console.error('Blocked invalid or unsafe path in open-file:', filePath);
            return;
        }

        const draftsDir = path.join(app.getPath('userData'), 'drafts');
        const resolvedPath = path.resolve(filePath);

        // Enforce boundary safety: path must reside strictly inside user drafts or downloads folder
        const downloadsDir = app.getPath('downloads');
        if (!isPathInside(draftsDir, resolvedPath) && !isPathInside(downloadsDir, resolvedPath)) {
            console.error('Blocked opening unauthorized location in open-file:', resolvedPath);
            return;
        }

        const { shell } = require('electron');
        shell.openPath(resolvedPath).then((error) => {
            if (error) {
                console.error(`Failed to open file: ${error}`);
            }
        });
    });

    ipcMain.handle('download-and-open', async (event, { url, filename, token, appName }) => {
        try {
            if (!filename || typeof filename !== 'string' || filename.includes('..')) {
                throw new Error('Invalid or unsafe filename');
            }

            // Strictly strip any folder routing character
            const safeFilename = path.basename(filename).replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');
            if (!safeFilename || safeFilename === '.' || safeFilename === '..') {
                throw new Error('Invalid filename');
            }
            const draftsDir = path.join(app.getPath('userData'), 'drafts');
            if (!fs.existsSync(draftsDir)) {
                fs.mkdirSync(draftsDir, { recursive: true });
            }

            let localPath = path.resolve(draftsDir, safeFilename);

            if (!isPathInside(draftsDir, localPath)) {
                throw new Error('Path traversal detected');
            }

            // If file exists, try to check if it's writable. If not, use a unique name.
            if (fs.existsSync(localPath)) {
                try {
                    fs.accessSync(localPath, fs.constants.W_OK);
                } catch (e) {
                    const ext = path.extname(safeFilename);
                    const base = path.basename(safeFilename, ext);
                    localPath = path.join(draftsDir, `${base}_${Date.now()}${ext}`);
                }
            }

            if (fs.existsSync(localPath) && fs.statSync(localPath).isDirectory()) {
                fs.rmSync(localPath, { recursive: true, force: true });
            }

            const file = fs.createWriteStream(localPath);
            const safeUrl = normalizeDownloadUrl(url);
            if (typeof token !== 'string' || !token) throw new Error('Missing authentication token');

            return new Promise((resolve, reject) => {
                file.on('error', (err) => {
                    file.close();
                    fs.unlink(localPath, () => { });
                    reject(err);
                });

                // Use standard setTimeout since net.ClientRequest has no setTimeout/destroy
                const timeoutId = setTimeout(() => {
                    try { request.abort(); } catch (e) { /* ignore */ }
                    file.close();
                    fs.unlink(localPath, () => { });
                    reject(new Error('Download timeout'));
                }, 60000);

                const request = net.request({
                    method: 'GET',
                    url: safeUrl,
                    useSessionCookies: true
                });
                request.setHeader('Authorization', `Bearer ${token}`);

                request.on('response', (response) => {
                    if (response.statusCode !== 200) {
                        clearTimeout(timeoutId);
                        file.close();
                        fs.unlink(localPath, () => { });
                        reject(new Error(`Failed to download: ${response.statusCode}`));
                        return;
                    }

                    response.on('data', (chunk) => {
                        file.write(chunk);
                    });

                    response.on('end', () => {
                        clearTimeout(timeoutId);
                        file.close();
                        const { shell } = require('electron');
                        const openWithDefault = () => shell.openPath(localPath).then((error) => {
                            if (error) reject(new Error(error));
                            else resolve(localPath);
                        });

                        const executable = appName && appName !== 'default'
                            ? CAD_EXECUTABLES[String(appName).toLowerCase()]
                            : null;
                        if (!executable) {
                            openWithDefault();
                            return;
                        }

                        const child = spawn(executable, [localPath], {
                            detached: true,
                            stdio: 'ignore',
                            windowsHide: true,
                        });
                        child.once('spawn', () => {
                            child.unref();
                            resolve(localPath);
                        });
                        child.once('error', (error) => {
                            console.warn(`Failed to open with ${appName}, falling back to default:`, error);
                            openWithDefault();
                        });
                    });
                });

                request.on('error', (err) => {
                    clearTimeout(timeoutId);
                    file.close();
                    fs.unlink(localPath, () => { });
                    reject(err);
                });

                request.end();
            });
        } catch (error) {
            console.error('Critical download error:', error);
            throw error; // Rethrow to let the renderer catch it
        }

    });

    ipcMain.handle('download-bulk-files', async (event, { tasks, token }) => {
        const { shell } = require('electron');
        if (!Array.isArray(tasks)) throw new Error('Invalid download task list');
        if (typeof token !== 'string' || !token) throw new Error('Missing authentication token');

        // Auto-save directly to Downloads instead of prompting
        const targetDir = app.getPath('downloads');
        const downloadedFiles = [];
        const errors = [];

        for (const task of tasks) {
            try {
                let relativePath = task.target_relative_path;
                if (!relativePath) {
                    relativePath = `Units & Tasks/Set ${task.set_number || 'unknown'}/${task.task_code || 'unknown'}_Master.dwg`;
                }

                // Ensure no path traversal tricks and remove any prefixes before the actual Set folders
                relativePath = relativePath.replace(/\\/g, '/');
                let safeRelativePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');

                // Extract everything after "Units & Tasks/" or "Units & Tasks/" to keep exactly the "1st Set Parts/..." structure
                const match = safeRelativePath.match(/(?:Unts|Units) & Tasks[\/\\](.*)/i);
                if (match) {
                    safeRelativePath = match[1];
                }

                const localPath = path.resolve(targetDir, safeRelativePath);
                if (!isPathInside(targetDir, localPath)) {
                    throw new Error('Download path escapes the Downloads directory');
                }

                const fileDir = path.dirname(localPath);
                try {
                    if (!fs.existsSync(fileDir)) {
                        fs.mkdirSync(fileDir, { recursive: true });
                    }
                } catch (dirErr) {
                    console.warn(`Could not create directory ${fileDir}:`, dirErr);
                }

                try {
                    if (fs.existsSync(localPath)) {
                        const stat = fs.statSync(localPath);
                        if (stat.isDirectory()) {
                            fs.rmSync(localPath, { recursive: true, force: true });
                        } else {
                            fs.unlinkSync(localPath); // Delete the existing file before overwriting to avoid EBUSY/EPERM/ENOENT issues
                        }
                    }
                } catch (statErr) {
                    console.warn(`Could not stat or remove existing file ${localPath}:`, statErr);
                }

                // If file exists, maybe overwrite it
                const file = fs.createWriteStream(localPath);
                const safeUrl = normalizeDownloadUrl(task.url);

                await new Promise((resolve, reject) => {
                    file.on('error', (err) => {
                        file.close();
                        fs.unlink(localPath, () => { });
                        reject(err);
                    });

                    // Use standard setTimeout since net.ClientRequest has no setTimeout/destroy
                    const timeoutId = setTimeout(() => {
                        try { request.abort(); } catch (e) { /* ignore */ }
                        file.close();
                        fs.unlink(localPath, () => { });
                        reject(new Error('Download timeout'));
                    }, 60000);

                    const request = net.request({
                        method: 'GET',
                        url: safeUrl,
                        useSessionCookies: true
                    });
                    request.setHeader('Authorization', `Bearer ${token}`);

                    request.on('response', (response) => {
                        if (response.statusCode !== 200) {
                            clearTimeout(timeoutId);
                            file.close();
                            fs.unlink(localPath, () => { });
                            reject(new Error(`Failed to download: ${response.statusCode}`));
                            return;
                        }

                        response.on('data', (chunk) => {
                            file.write(chunk);
                        });

                        response.on('end', () => {
                            clearTimeout(timeoutId);
                            file.close();
                            resolve(localPath);
                        });
                    });

                    request.on('error', (err) => {
                        clearTimeout(timeoutId);
                        file.close();
                        fs.unlink(localPath, () => { });
                        reject(err);
                    });

                    request.end();
                });

                downloadedFiles.push(localPath);
            } catch (err) {
                console.error(`Error downloading task ${task.id}:`, err);
                errors.push({ taskId: task.id, error: err.message });
            }
        }

        if (downloadedFiles.length > 0) {
            shell.openPath(targetDir);
        }

        return { canceled: false, successCount: downloadedFiles.length, errors };
    });


    // Handle permission requests
    const { session } = require('electron');
    session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
        const url = webContents.getURL();
        if (permission === 'media') {
            if (url.startsWith('http://localhost') || url.startsWith('file://')) {
                return callback(true);
            }
        }
        callback(false);
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// App-level IPC signals
ipcMain.on('flash-window', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win && !win.isFocused()) {
        win.flashFrame(true);
        win.once('focus', () => win.flashFrame(false));
    }
});

ipcMain.on('set-window-size', (event, { width, height, resizable }) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
        if (win.isMaximized()) {
            win.unmaximize();
        }
        win.setResizable(true); // Temporarily allow resizable to change size
        win.setSize(width, height);
        win.setResizable(resizable);
        if (!resizable) win.center();
    }
});
