import tailwindcssAnimate from 'tailwindcss-animate'
import { tailwindConfigMerge } from '@harnessio/helpers'

export default tailwindConfigMerge({
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  plugins: [
    tailwindcssAnimate,
    function ({ addUtilities }) {
      addUtilities({
        '.tabnav-active': {
          boxShadow:
            'inset 0 1px 0 0 hsl(var(--border-background)), inset 1px 0 0 0 hsl(var(--border-background)), inset -1px 0 0 0 hsl(var(--border-background))'
        },
        '.tabnav-inactive': {
          boxShadow: 'inset 0 -1px 0 0 hsl(var(--border-background))'
        }
      })
    }
  ]
})
