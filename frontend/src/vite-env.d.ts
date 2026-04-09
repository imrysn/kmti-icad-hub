/// <reference types="vite/client" />

interface Window {
  electronAPI: {
    flashWindow: () => void;
    setWindowSize: (width: number, height: number, resizable: boolean) => void;
    minimize: () => void;
    maximize: () => void;
    close: () => void;
  };
}
