import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5137, // UI dev server port
    cors: false,
    proxy: {
      // '/code': {
      //   target: 'http://localhost:3000' // Proxy API requests to another local server
      //   // changeOrigin: true
      // }
      '/api': 'http://localhost:3000'
    }
  }
})
