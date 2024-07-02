import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { proxy } from 'vite';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['calendar-month', 'calendar-date', 'calendar-range'].includes(tag),
        }
      }
    })     
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src/app'
    }
  },
  build: {
    outDir: 'src/public'
  }
});
