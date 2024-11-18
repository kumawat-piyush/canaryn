import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import yaml from '@rollup/plugin-yaml'
import { lingui } from '@lingui/vite-plugin'

const external = [
  'react',
  'react-dom',
  'lodash-es',
  'moment',
  '@harnessio/canary',
  '@harnessio/forms',
  '@harnessio/unified-pipeline',
  'react-router-dom'
]

// https://vitejs.dev/config/
export default defineConfig({
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [
    // react(),
    react({
      plugins: [['@lingui/swc-plugin', {}]] // Add the SWC plugin for Lingui
    }),
    yaml({}),
    lingui(),
    dts({
      outDir: 'dist',
      tsconfigPath: './tsconfig.json',
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('src/', ''),
        content
      })
    }),
    // @ts-expect-error: @TODO: Fix  this. Should be removed, added to enable typecheck
    monacoEditorPlugin.default({ customWorkers: [{ entry: 'monaco-yaml/yaml.worker', label: 'yaml' }] })
  ],
  build: {
    sourcemap: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'views',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: { external }
  }
})
