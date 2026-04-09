const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const Menu = electron.Menu;
const globalShortcut = electron.globalShortcut;
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
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
        },
    });

    // Handle development shortcuts and DevTools
    if (!app.isPackaged) {
        const devUrl = 'http://localhost:5173';
        mainWindow.loadURL(devUrl).catch(() => {
            console.log('Failed to load 5173, trying 5174...');
            mainWindow.loadURL('http://localhost:5174');
        });
        
        // Open DevTools by default in dev
        mainWindow.webContents.openDevTools();

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
