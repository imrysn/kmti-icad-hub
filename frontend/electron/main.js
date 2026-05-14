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
        const { shell } = require('electron');
        shell.openPath(filePath).then((error) => {
            if (error) {
                console.error(`Failed to open file: ${error}`);
            }
        });
    });

    ipcMain.handle('download-and-open', async (event, { url, filename, token }) => {
        try {
            const draftsDir = path.join(app.getPath('userData'), 'drafts');
            if (!fs.existsSync(draftsDir)) {
                fs.mkdirSync(draftsDir, { recursive: true });
            }

            let localPath = path.join(draftsDir, filename);
            
            // If file exists, try to check if it's writable. If not, use a unique name.
            if (fs.existsSync(localPath)) {
                try {
                    fs.accessSync(localPath, fs.constants.W_OK);
                } catch (e) {
                    const ext = path.extname(filename);
                    const base = path.basename(filename, ext);
                    localPath = path.join(draftsDir, `${base}_${Date.now()}${ext}`);
                }
            }

            const file = fs.createWriteStream(localPath);
            const safeUrl = url.replace('localhost', '127.0.0.1');
            const protocol = safeUrl.startsWith('https') ? https : http;

            return new Promise((resolve, reject) => {
                const request = protocol.get(safeUrl, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }, (response) => {
                    if (response.statusCode !== 200) {
                        file.close();
                        fs.unlink(localPath, () => {});
                        reject(new Error(`Failed to download: ${response.statusCode}`));
                        return;
                    }

                    response.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        const { shell } = require('electron');
                        shell.openPath(localPath).then((error) => {
                            if (error) reject(new Error(error));
                            else resolve(localPath);
                        });
                    });
                });

                request.on('error', (err) => {
                    file.close();
                    fs.unlink(localPath, () => {});
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
