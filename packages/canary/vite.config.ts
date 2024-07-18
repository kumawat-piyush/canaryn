import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: 'dist',
      tsconfigPath: './tsconfig.app.json',
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('src/', ''),
        content
      })
    })
  ],
  resolve: {
    alias: {
      '@/lib': path.resolve(__dirname, 'src', 'lib'),
      '@/components': path.resolve(__dirname, 'src', 'components'),
      '@harnessio/svg-icon': path.resolve(__dirname, 'node_modules', '@harnessio', 'svg-icon'),
      '@harnessio/svg-icon-cli': path.resolve(__dirname, 'node_modules', '@harnessio', 'svg-icon-cli'),
      '@harnessio/svg-icon-react': path.resolve(__dirname, 'node_modules', '@harnessio', 'svg-icon-react')
    }
  },
  build: {
    sourcemap: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'canary',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'react',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        }
      }
    }
  }
})
