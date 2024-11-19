import deepmerge from 'deepmerge'
import { Config } from 'tailwindcss/types/config'

import baseConfig from '@harnessio/tailwind-config'

export function tailwindConfigMerge(tailwindConfig: Config): Config {
  return deepmerge(baseConfig, tailwindConfig) as Config
}
