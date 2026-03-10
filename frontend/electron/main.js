const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            // SECURITY: nodeIntegration MUST be false to prevent renderer-process code
            // from having full Node.js access. Any XSS in the renderer would otherwise
            // give an attacker complete system access.
            nodeIntegration: false,
            // SECURITY: contextIsolation MUST be true — isolates the preload script
            // world from the renderer's JavaScript world.
            contextIsolation: true,
            // Disable remote module (deprecated and insecure)
            sandbox: true,
        },
    });

    // Load from Vite dev server in development, built files in production.
    // Use app.isPackaged as the reliable production signal instead of NODE_ENV,
    // which leaks DevTools in a packaged build if NODE_ENV=production isn't set.
    if (!app.isPackaged) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
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
