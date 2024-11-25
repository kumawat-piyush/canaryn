import { useEffect } from 'react'

import { useThemeStore } from './hooks/use-theme-store'
import { ColorType, ContrastType, FullTheme, ModeType } from './types'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore(state => ({
    theme: state.theme,
    setTheme: state.setTheme
  }))

  useEffect(() => {
    const root = window.document.documentElement

    const getMediaQuery = () => window.matchMedia('(prefers-color-scheme: dark)')
    const [base, color, contrast] = theme.split('-') as [ModeType, ColorType, ContrastType]

    // Compute the effective theme based on system preference if set to "system"
    const effectiveBase = base === ModeType.System ? (getMediaQuery().matches ? ModeType.Dark : ModeType.Light) : base
    const effectiveTheme: FullTheme = `${effectiveBase}-${color}-${contrast}`

    root.className = '' // Clear existing classes
    root.classList.add(effectiveTheme) // Apply the computed theme class

    const updateSystemTheme = () => {
      if (theme.startsWith(ModeType.System)) {
        setTheme(`${getMediaQuery().matches ? ModeType.Dark : ModeType.Light}-${color}-${contrast}` as FullTheme)
      }
    }

    getMediaQuery().addEventListener('change', updateSystemTheme)

    return () => {
      getMediaQuery().removeEventListener('change', updateSystemTheme)
    }
  }, [theme, setTheme])

  return <>{children}</>
}
