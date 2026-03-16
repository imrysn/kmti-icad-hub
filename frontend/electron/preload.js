const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    flashWindow: () => ipcRenderer.send('flash-window')
});
