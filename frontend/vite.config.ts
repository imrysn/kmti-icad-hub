import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: './',
    server: {
        port: 5173,
    },
    build: {
        outDir: 'dist',
    },
    // Cache bust — forces Vite to re-resolve all modules on next start
    cacheDir: 'node_modules/.vite',
});
