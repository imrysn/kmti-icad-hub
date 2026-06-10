/// <reference types="vite/client" />

interface Window {
  electronAPI: {
    flashWindow: () => void;
    setWindowSize: (width: number, height: number, resizable: boolean) => void;
    minimize: () => void;
    maximize: () => void;
    close: () => void;
    openFile: (filePath: string) => void;
    downloadAndOpen: (params: { url: string; filename: string; token: string }) => Promise<string>;
  };
}

declare module '*.glb' {
  const src: string;
  export default src;
}
