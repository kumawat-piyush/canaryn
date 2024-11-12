/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@harnessio/canary/tailwind.config'),
    require('@harnessio/unified-pipeline/tailwind.config'),
    require('@harnessio/fragments/tailwind.config')
  ],
  content: [
    'node_modules/@harnessio/unified-pipeline/src/**/*.{ts,tsx}',
    'node_modules/@harnessio/fragments/src/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ]
}
