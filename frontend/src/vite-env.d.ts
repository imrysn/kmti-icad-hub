/// <reference types="vite/client" />

interface Window {
  electronAPI: {
    flashWindow: () => void;
    setWindowSize: (width: number, height: number, resizable: boolean) => void;
    minimize: () => void;
    maximize: () => void;
    close: () => void;
    openFile: (filePath: string) => void;
    downloadAndOpen: (params: { url: string; filename: string; token: string, appName?: string }) => Promise<string>;
    downloadBulkFiles: (params: { tasks: { id: number; target_relative_path: string; url: string }[]; token: string }) => Promise<{ canceled: boolean; successCount: number; errors: any[] }>;
  };
}

declare module '*.glb' {
  const src: string;
  export default src;
}
