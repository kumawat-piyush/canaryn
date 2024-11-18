import type { LinguiConfig } from '@lingui/conf'

const config: LinguiConfig = {
  locales: ['en', 'fr', 'cs'], // Define your locales here
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}',
      include: ['src', '../../packages/views/src']
    }
  ]
}

export default config
