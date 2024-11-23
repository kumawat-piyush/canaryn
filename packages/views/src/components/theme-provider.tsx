import { useEffect } from 'react'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ModeType = 'dark' | 'light' | 'system'
export type ColorType = 'std' | 'tri' | 'pnd'
export type ContrastType = 'standard' | 'low' | 'high'
export type FullTheme = `${ModeType}-${ColorType}-${ContrastType}`

type ThemeState = {
  theme: FullTheme
  setTheme: (theme: FullTheme) => void
}

const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      theme: 'system-std-standard', // Default theme
      setTheme: (newTheme: FullTheme) => set({ theme: newTheme })
    }),
    {
      name: 'canary-ui-theme' // LocalStorage key
    }
  )
)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore(state => state.theme)
  const setTheme = useThemeStore(state => state.setTheme)

  useEffect(() => {
    const root = window.document.documentElement

    const getMediaQuery = () => window.matchMedia('(prefers-color-scheme: dark)')
    const [base, color, contrast] = theme.split('-') as [ModeType, string, string]

    // Compute the effective theme based on system preference if set to "system"
    const effectiveBase = base === 'system' ? (getMediaQuery().matches ? 'dark' : 'light') : base
    const effectiveTheme = `${effectiveBase}-${color}-${contrast}`

    root.className = '' // Clear existing classes
    root.classList.add(effectiveTheme) // Apply the computed theme class

    const updateSystemTheme = () => {
      if (theme.startsWith('system')) {
        setTheme(`${getMediaQuery().matches ? 'dark' : 'light'}-${color}-${contrast}` as FullTheme)
      }
    }

    getMediaQuery().addEventListener('change', updateSystemTheme)

    return () => {
      getMediaQuery().removeEventListener('change', updateSystemTheme)
    }
  }, [theme, setTheme])

  return <>{children}</>
}

export const useTheme = () => {
  const theme = useThemeStore(state => state.theme)
  const setTheme = useThemeStore(state => state.setTheme)

  return { theme, setTheme }
}
