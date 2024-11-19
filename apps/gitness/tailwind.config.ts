import { tailwindConfigMerge } from '@harnessio/helpers'

export default tailwindConfigMerge({
  content: [
    './node_modules/@harnessio/unified-pipeline/src/**/*.{ts,tsx,js,jsx}',
    './node_modules/@harnessio/views/src/**/*.{ts,tsx,js,jsx}',
    './node_modules/@harnessio/canary/src/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}'
  ]
})
