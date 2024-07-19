import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    copyPublicDir: false
  },
  resolve: {
    alias: [
      {
        find: /@harnessio\/svg-icon/,
        replacement: path.resolve(__dirname, 'node_modules', '@harnessio', 'svg-icon')
      },
      {
        find: /@harnessio\/svg-icon-react/,
        replacement: path.resolve(__dirname, 'node_modules', '@harnessio', 'svg-icon-react')
      }
    ]
  }
})
