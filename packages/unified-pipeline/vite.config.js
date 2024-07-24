// vite.config.js
const path = require('path')
import { defineConfig } from 'vite'
const _ = require('lodash')
const pkg = require('./package.json')
const globals = require('./globals.json')
import dts from 'vite-plugin-dts'

const external = Object.keys(pkg.peerDependencies)

external.forEach(dep => {
  if (!_.has(globals, dep)) {
    console.log(`Entry for "${dep}" not found in globals.json`)
    process.exit(1)
  }
})

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'src'),
      name: 'Unified Pipeline',
      // the proper extensions will be added
      fileName: '@harnessio/unified-pipeline'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library, such as dev dependencies from package.json
      external,
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: _.pick(globals, external)
      },
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      }
    }
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: (name, filename, _css) => {
        const basename = path.basename(filename).replace(/\.module\.scss?.*/, '')
        return `${basename}--${name}`
      }
    }
  },
  plugins: [dts()]
})
