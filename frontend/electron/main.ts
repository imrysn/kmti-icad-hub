import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Load the local URL for development or the local file for production
    if (process.env.NODE_ENV === 'development') {
        const devUrl = 'http://localhost:5173';
        if (mainWindow) {
            mainWindow.loadURL(devUrl).catch(() => {
                console.log('Failed to load 5173, trying 5174...');
                if (mainWindow) mainWindow.loadURL('http://localhost:5174');
            });
        }
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('flash-window', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win && !win.isFocused()) {
        win.flashFrame(true);
        win.once('focus', () => win.flashFrame(false));
    }
});
