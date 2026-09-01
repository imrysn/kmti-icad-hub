const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const Menu = electron.Menu;
const path = require('path');
const fs = require('fs');
const { net } = require('electron');
const { spawn } = require('child_process');

const CAD_APPLICATIONS = Object.freeze({
    ijcad: {
        executable: 'gcad.exe',
        vendorDirectories: ['ITJP'],
    },
    nanocad: {
        executable: 'ncad.exe',
        vendorDirectories: ['Nanosoft'],
    },
    icad: {
        executable: 'icad.exe',
        candidates: ['C:\\ICADSX\\bin\\icad.exe'],
    },
    solidworks: {
        executable: 'SLDWORKS.exe',
        vendorDirectories: ['SOLIDWORKS Corp'],
    },
});
const reservedDownloadPaths = new Set();
const activeOpenOperations = new Set();

function resolveCadExecutable(appName) {
    const application = CAD_APPLICATIONS[String(appName || '').toLowerCase()];
    if (!application) return null;

    const candidates = [...(application.candidates || [])];
    const programFileRoots = [process.env.ProgramFiles, process.env['ProgramFiles(x86)']]
        .filter(Boolean);

    for (const programFilesRoot of programFileRoots) {
        for (const vendorDirectory of application.vendorDirectories || []) {
            const vendorPath = path.join(programFilesRoot, vendorDirectory);
            try {
                for (const entry of fs.readdirSync(vendorPath, { withFileTypes: true })) {
                    if (!entry.isDirectory()) continue;
                    const productPath = path.join(vendorPath, entry.name);
                    candidates.push(
                        path.join(productPath, application.executable),
                        path.join(productPath, 'bin', application.executable),
                        path.join(productPath, 'BIN', application.executable),
                    );
                }
            } catch (_) {
                // The vendor is not installed in this Program Files location.
            }
        }
    }

    return candidates.find(candidate => fs.existsSync(candidate)) || application.executable;
}

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

function createDownloadError(message, code, statusCode) {
    const error = new Error(message);
    error.code = code;
    if (statusCode) error.statusCode = statusCode;
    return error;
}

function uniqueDownloadPath(requestedPath) {
    const extension = path.extname(requestedPath);
    const base = path.basename(requestedPath, extension);
    const directory = path.dirname(requestedPath);
    let candidate = requestedPath;
    let suffix = 0;
    while (fs.existsSync(candidate) || reservedDownloadPaths.has(candidate.toLowerCase())) {
        suffix += 1;
        candidate = path.join(directory, `${base}_${Date.now()}_${suffix}${extension}`);
    }
    reservedDownloadPaths.add(candidate.toLowerCase());
    return candidate;
}

function isRetryableDownloadError(error) {
    return ['DOWNLOAD_TIMEOUT', 'NETWORK_ERROR', 'RESPONSE_ABORTED', 'HTTP_502', 'HTTP_503', 'HTTP_504']
        .includes(error?.code);
}

function downloadOnce(url, token, requestedPath) {
    const safeUrl = normalizeDownloadUrl(url);
    const finalPath = uniqueDownloadPath(requestedPath);
    const partialPath = `${finalPath}.${process.pid}.${Date.now()}.part`;

    return new Promise((resolve, reject) => {
        let settled = false;
        let request;
        let response;
        let output;

        const cleanupPartial = () => {
            const removePartial = () => fs.rm(partialPath, { force: true }, () => { });
            try {
                if (output && !output.closed) {
                    output.once('close', removePartial);
                    output.destroy();
                    return;
                }
            } catch (_) { /* ignore cleanup errors */ }
            removePartial();
        };

        const fail = (error) => {
            if (settled) return;
            settled = true;
            clearTimeout(timeoutId);
            try { request?.abort(); } catch (_) { /* ignore */ }
            cleanupPartial();
            reservedDownloadPaths.delete(finalPath.toLowerCase());
            reject(error);
        };

        const timeoutId = setTimeout(() => {
            fail(createDownloadError('Download timed out.', 'DOWNLOAD_TIMEOUT'));
        }, 60000);

        try {
            output = fs.createWriteStream(partialPath, { flags: 'wx' });
            request = net.request({ method: 'GET', url: safeUrl, useSessionCookies: true });
            request.setHeader('Authorization', `Bearer ${token}`);

            output.once('error', (error) => {
                fail(createDownloadError(error.message, error.code === 'EACCES' || error.code === 'EPERM' ? 'FILE_LOCKED' : 'WRITE_ERROR'));
            });

            request.once('error', (error) => {
                fail(createDownloadError(error.message || 'Network request failed.', 'NETWORK_ERROR'));
            });

            request.once('response', (incomingResponse) => {
                response = incomingResponse;
                const statusCode = Number(response.statusCode || 0);
                if (statusCode !== 200) {
                    fail(createDownloadError(`Download request failed with HTTP ${statusCode}.`, `HTTP_${statusCode}`, statusCode));
                    return;
                }

                response.once('aborted', () => fail(createDownloadError('Download response was interrupted.', 'RESPONSE_ABORTED')));
                response.once('error', (error) => fail(createDownloadError(error.message || 'Download response failed.', 'NETWORK_ERROR')));

                output.once('finish', () => {
                    output.close((closeError) => {
                        if (closeError) {
                            fail(createDownloadError(closeError.message, 'WRITE_ERROR'));
                            return;
                        }
                        if (settled) return;
                        try {
                            const size = fs.statSync(partialPath).size;
                            if (size <= 0) {
                                fail(createDownloadError('The downloaded file is empty.', 'EMPTY_FILE'));
                                return;
                            }
                            const contentLengthHeader = response.headers?.['content-length'];
                            const expectedSize = Number(Array.isArray(contentLengthHeader) ? contentLengthHeader[0] : contentLengthHeader);
                            if (Number.isFinite(expectedSize) && expectedSize > 0 && size !== expectedSize) {
                                fail(createDownloadError('The downloaded file was incomplete.', 'RESPONSE_ABORTED'));
                                return;
                            }
                            fs.renameSync(partialPath, finalPath);
                            settled = true;
                            clearTimeout(timeoutId);
                            reservedDownloadPaths.delete(finalPath.toLowerCase());
                            resolve(finalPath);
                        } catch (error) {
                            fail(createDownloadError(error.message, error.code === 'EACCES' || error.code === 'EPERM' ? 'FILE_LOCKED' : 'WRITE_ERROR'));
                        }
                    });
                });

                response.pipe(output);
            });

            request.end();
        } catch (error) {
            fail(createDownloadError(error.message || String(error), 'DOWNLOAD_SETUP_ERROR'));
        }
    });
}

async function downloadFile(url, token, requestedPath) {
    if (typeof token !== 'string' || !token) {
        throw createDownloadError('Missing authentication token.', 'AUTH_MISSING');
    }

    let lastError;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
        try {
            return await downloadOnce(url, token, requestedPath);
        } catch (error) {
            lastError = error;
            if (!isRetryableDownloadError(error) || attempt === 3) break;
            await new Promise(resolve => setTimeout(resolve, attempt * 500));
        }
    }
    throw lastError;
}

function serializeDownloadError(error) {
    return {
        code: error?.code || 'DOWNLOAD_ERROR',
        statusCode: error?.statusCode,
        message: error?.message || String(error),
    };
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
        const operationKey = `${url}|${filename}|${appName || 'default'}`;
        if (activeOpenOperations.has(operationKey)) {
            throw createDownloadError('This file is already being prepared.', 'OPERATION_IN_PROGRESS');
        }
        activeOpenOperations.add(operationKey);
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

            const requestedPath = path.resolve(draftsDir, safeFilename);

            if (!isPathInside(draftsDir, requestedPath)) {
                throw new Error('Path traversal detected');
            }

            const localPath = await downloadFile(url, token, requestedPath);
            const { shell } = require('electron');
            const openWithDefault = async () => {
                const openError = await shell.openPath(localPath);
                if (openError) throw createDownloadError(openError, 'APP_LAUNCH_FAILED');
                return localPath;
            };

            const executable = appName && appName !== 'default'
                ? resolveCadExecutable(appName)
                : null;
            if (!executable) return await openWithDefault();

            return await new Promise((resolve, reject) => {
                const child = spawn(executable, [localPath], {
                    detached: true,
                    stdio: 'ignore',
                    windowsHide: true,
                });
                child.once('spawn', () => {
                    child.unref();
                    resolve(localPath);
                });
                child.once('error', async (launchError) => {
                    console.warn(`Failed to open with ${appName}, falling back to default:`, launchError);
                    try {
                        resolve(await openWithDefault());
                    } catch (fallbackError) {
                        reject(fallbackError);
                    }
                });
            });
        } catch (error) {
            console.error('Critical download error:', error);
            const serialized = serializeDownloadError(error);
            const ipcError = new Error(serialized.message);
            ipcError.code = serialized.code;
            ipcError.statusCode = serialized.statusCode;
            throw ipcError;
        } finally {
            activeOpenOperations.delete(operationKey);
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

                const downloadedPath = await downloadFile(task.url, token, localPath);
                downloadedFiles.push(downloadedPath);
            } catch (err) {
                console.error(`Error downloading task ${task.id}:`, err);
                errors.push({ taskId: task.id, ...serializeDownloadError(err) });
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
