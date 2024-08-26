import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
const host = 'localhost'
const PORT = 3000
const API_URL = `http://${host}:${PORT}`
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    cors: true, // Enable CORS for the dev server
    proxy: {
      '/code': {
        target: API_URL, // Proxy API requests to another local server
        changeOrigin: true,
        rewrite: path => path.replace(/^\/code/, '')
      }
    }
  }
})
