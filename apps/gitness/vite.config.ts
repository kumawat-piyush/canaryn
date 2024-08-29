import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5137, // UI dev server port
    proxy: {
      '/repos': {
        changeOrigin: true,
        target: 'http://127.0.0.1:3000' /* setting as "http://localhost:3000" won't work */,
        rewrite: path => path.replace('/repos', '/api/v1/repos')
      }
    }
  }
})
