const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    flashWindow: () => ipcRenderer.send('flash-window'),
    setWindowSize: (width, height, resizable) => ipcRenderer.send('set-window-size', { width, height, resizable }),
    
    // Window Controls
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close')
});
