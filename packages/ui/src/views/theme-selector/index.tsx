import { useMemo } from 'react'

import { useTheme } from '../theme-provider/hooks/use-theme'
import { ColorSelect } from './color-select'
import { ContrastSelect } from './contrast-select'
import { ModeSelect } from './mode-select'
import { getModeColorContrastFromFullTheme } from './utils'

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  // theme will be structured like light-std-std which represents mode-color-contrast

  const { mode, color, contrast } = useMemo(() => getModeColorContrastFromFullTheme(theme), [theme])

  return (
    <div className="flex w-full items-center space-x-5">
      <ModeSelect setTheme={setTheme} mode={mode} color={color} contrast={contrast} />
      <ColorSelect setTheme={setTheme} mode={mode} color={color} contrast={contrast} />
      <ContrastSelect setTheme={setTheme} mode={mode} color={color} contrast={contrast} />
    </div>
  )
}
