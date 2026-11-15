import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

// GitHub Pages: https://yeonhwa84.github.io/my_github_desktop/
export default defineConfig({
    base: '/my_github_desktop/',
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        port: 5173,
        open: true,
        host: true, // LAN 접근 허용 (모바일 실기기 테스트)
    },
});
