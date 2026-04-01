const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const Menu = electron.Menu;
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 440,
        height: 550,
        frame: true,
        transparent: false,
        backgroundColor: '#0f172a',
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            // SECURITY: nodeIntegration MUST be false to prevent renderer-process code
            // from having full Node.js access. Any XSS in the renderer would otherwise
            // give an attacker complete system access.
            nodeIntegration: false,
            // SECURITY: contextIsolation MUST be true — isolates the preload script
            // world from the renderer's JavaScript world.
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            // Disable remote module (deprecated and insecure)
            sandbox: true,
        },
    });

    mainWindow.removeMenu();

    // Load from Vite dev server in development, built files in production.
    // Use app.isPackaged as the reliable production signal instead of NODE_ENV,
    // which leaks DevTools in a packaged build if NODE_ENV=production isn't set.
    if (!app.isPackaged) {
        // Try to load from port 5173, but fallback to 5174 if Vite shifted
        const devUrl = 'http://localhost:5173';
        mainWindow.loadURL(devUrl).catch(() => {
            console.log('Failed to load 5173, trying 5174...');
            mainWindow.loadURL('http://localhost:5174');
        });
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    // Handle permission requests (Microphone/Camera)
    const { session } = require('electron');
    session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
        const url = webContents.getURL();
        if (permission === 'media') {
            // Allow media access for localhost (dev) or localized files
            if (url.startsWith('http://localhost') || url.startsWith('file://')) {
                return callback(true);
            }
        }
        callback(false);
    });
}

app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    createWindow();
});

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

// Handle IPC signals from renderer
ipcMain.on('flash-window', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win && !win.isFocused()) {
        win.flashFrame(true);
        win.once('focus', () => {
            win.flashFrame(false);
        });
    }
});

ipcMain.on('set-window-size', (event, { width, height, resizable }) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
        win.setSize(width, height);
        win.setResizable(resizable);
        if (!resizable) {
            win.center();
        }
    }
});
