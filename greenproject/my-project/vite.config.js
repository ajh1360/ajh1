import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3001,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // 백엔드 주소에 맞게 수정 필요 (현재 axiosInstance.js 확인 필요)
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
            '/auth': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            }
        },
    },
    build: {
        outDir: 'build',
    },
});
