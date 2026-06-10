import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: './',
    server: {
        port: 5173,
        host: true,
    },
    build: {
        outDir: 'dist',
    },
    assetsInclude: ['**/*.glb'],
    // Cache bust — forces Vite to re-resolve all modules on next start
    cacheDir: 'node_modules/.vite',
    // @ts-ignore
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', 'src/test/', 'src/**/*.css', 'src/utils/'],
        },
    },
});
