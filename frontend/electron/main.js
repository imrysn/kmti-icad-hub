const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const Menu = electron.Menu;
const globalShortcut = electron.globalShortcut;
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

// Enable hardware acceleration for smooth rendering performance.
// (Only disable if running in headless environments or VMs lacking DirectX runtimes)
// app.disableHardwareAcceleration();
app.commandLine.appendSwitch('no-sandbox');
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

    // Handle development shortcuts and DevTools
    if (!app.isPackaged) {
        const devUrl = 'http://localhost:5173';
        mainWindow.loadURL(devUrl).catch(() => {
            console.log('Failed to load 5173, trying 5174...');
            mainWindow.loadURL('http://localhost:5174');
        });

        // DevTools auto-open disabled to prevent "Failed to fetch" console errors
        // mainWindow.webContents.openDevTools();

        // Register shortcuts for development
        app.on('browser-window-focus', () => {
            globalShortcut.register('CommandOrControl+Shift+I', () => {
                mainWindow.webContents.toggleDevTools();
            });
            globalShortcut.register('CommandOrControl+R', () => {
                mainWindow.webContents.reload();
            });
            globalShortcut.register('F12', () => {
                mainWindow.webContents.toggleDevTools();
            });
        });

        app.on('browser-window-blur', () => {
            globalShortcut.unregister('CommandOrControl+Shift+I');
            globalShortcut.unregister('CommandOrControl+R');
            globalShortcut.unregister('F12');
        });
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
        if (!resolvedPath.startsWith(draftsDir) && !resolvedPath.startsWith(downloadsDir)) {
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
            const safeFilename = path.basename(filename).replace(/[/\\]/g, '');
            const draftsDir = path.join(app.getPath('userData'), 'drafts');
            if (!fs.existsSync(draftsDir)) {
                fs.mkdirSync(draftsDir, { recursive: true });
            }

            let localPath = path.join(draftsDir, safeFilename);

            if (!localPath.startsWith(draftsDir)) {
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
            const safeUrl = url.replace('localhost', '127.0.0.1');
            const protocol = safeUrl.startsWith('https') ? https : http;

            return new Promise((resolve, reject) => {
                file.on('error', (err) => {
                    file.close();
                    fs.unlink(localPath, () => { });
                    reject(err);
                });

                const request = protocol.get(safeUrl, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }, (response) => {
                    if (response.statusCode !== 200) {
                        file.close();
                        fs.unlink(localPath, () => { });
                        reject(new Error(`Failed to download: ${response.statusCode}`));
                        return;
                    }

                    response.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        const { shell } = require('electron');
                        const { exec } = require('child_process');

                        if (appName && appName !== 'default') {
                            let cmd = '';
                            if (appName.toLowerCase() === 'ijcad') {
                                cmd = `start gcad.exe "${localPath}"`;
                            } else if (appName.toLowerCase() === 'nanocad') {
                                cmd = `start ncad.exe "${localPath}"`;
                            } else if (appName.toLowerCase() === 'icad') {
                                cmd = `start icad.exe "${localPath}"`;
                            } else if (appName.toLowerCase() === 'solidworks') {
                                cmd = `start SLDWORKS.exe "${localPath}"`;
                            }

                            if (cmd) {
                                exec(cmd, (error) => {
                                    if (error) {
                                        console.warn(`Failed to open with ${appName}, falling back to default:`, error);
                                        shell.openPath(localPath).then((err) => {
                                            if (err) reject(new Error(err));
                                            else resolve(localPath);
                                        });
                                    } else {
                                        resolve(localPath);
                                    }
                                });
                                return;
                            }
                        }

                        shell.openPath(localPath).then((error) => {
                            if (error) reject(new Error(error));
                            else resolve(localPath);
                        });
                    });
                });

                request.on('error', (err) => {
                    file.close();
                    fs.unlink(localPath, () => { });
                    reject(err);
                });

                request.setTimeout(30000, () => {
                    request.destroy();
                    reject(new Error('Download timeout'));
                });
            });
        } catch (error) {
            console.error('Critical download error:', error);
            throw error; // Rethrow to let the renderer catch it
        }

    });

    ipcMain.handle('download-bulk-files', async (event, { tasks, token }) => {
        const { shell } = require('electron');

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

                const localPath = path.join(targetDir, safeRelativePath);

                const fileDir = path.dirname(localPath);
                if (!fs.existsSync(fileDir)) {
                    fs.mkdirSync(fileDir, { recursive: true });
                }

                if (fs.existsSync(localPath) && fs.statSync(localPath).isDirectory()) {
                    fs.rmSync(localPath, { recursive: true, force: true });
                }

                // If file exists, maybe overwrite it
                const file = fs.createWriteStream(localPath);
                const safeUrl = task.url.replace('localhost', '127.0.0.1');
                const protocol = safeUrl.startsWith('https') ? https : http;

                await new Promise((resolve, reject) => {
                    file.on('error', (err) => {
                        file.close();
                        fs.unlink(localPath, () => { });
                        reject(err);
                    });

                    const request = protocol.get(safeUrl, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }, (response) => {
                        if (response.statusCode !== 200) {
                            file.close();
                            fs.unlink(localPath, () => { });
                            reject(new Error(`Failed to download: ${response.statusCode}`));
                            return;
                        }

                        response.pipe(file);
                        file.on('finish', () => {
                            file.close();
                            resolve(localPath);
                        });
                    });

                    request.on('error', (err) => {
                        file.close();
                        fs.unlink(localPath, () => { });
                        reject(err);
                    });

                    request.setTimeout(30000, () => {
                        request.destroy();
                        reject(new Error('Download timeout'));
                    });
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
