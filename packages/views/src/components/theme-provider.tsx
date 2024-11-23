import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useEffect } from 'react'

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
    (set) => ({
      theme: 'system-std-standard', // Default theme
      setTheme: (newTheme: FullTheme) => set({ theme: newTheme }),
    }),
    {
      name: 'canary-ui-theme', // LocalStorage key
    }
  )
)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  useEffect(() => {
    const root = window.document.documentElement

    const getMediaQuery = () => window.matchMedia('(prefers-color-scheme: dark)')
    const [base, color, contrast] = theme.split('-') as [ModeType, string, string]

    // Compute the effective theme based on system preference if set to "system"
    const effectiveBase =
      base === 'system' ? (getMediaQuery().matches ? 'dark' : 'light') : base
    const effectiveTheme = `${effectiveBase}-${color}-${contrast}`

    root.className = '' // Clear existing classes
    root.classList.add(effectiveTheme) // Apply the computed theme class

    const updateSystemTheme = () => {
      if (theme.startsWith('system')) {
        setTheme(
          `${getMediaQuery().matches ? 'dark' : 'light'}-${color}-${contrast}` as FullTheme
        )
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
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  return { theme, setTheme }
}

// import { createContext, useContext, useEffect, useState } from 'react'

// export type ModeType = 'dark' | 'light' | 'system'
// export type ColorType = 'std' | 'tri' | 'pnd'
// export type ContrastType = 'standard' | 'low' | 'high'
// export type FullTheme = `${ModeType}-${ColorType}-${ContrastType}`

// type ThemeProviderProps = {
//   children: React.ReactNode
//   defaultTheme?: FullTheme
//   storageKey?: string
// }

// type ThemeProviderState = {
//   theme: FullTheme
//   setTheme: (theme: FullTheme) => void
// }

// const initialState: ThemeProviderState = {
//   theme: 'system-std-standard',
//   setTheme: () => null
// }

// const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// export function ThemeProvider({
//   children,
//   defaultTheme = 'system-std-standard',
//   storageKey = 'canary-ui-theme',
//   ...props
// }: ThemeProviderProps) {
//   const getMediaQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

//   const [theme, setThemeState] = useState<FullTheme>(
//     () => (localStorage.getItem(storageKey) as FullTheme) || defaultTheme
//   )
//   const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>(() => (getMediaQuery().matches ? 'dark' : 'light'))

//   useEffect(() => {
//     const root = window.document.documentElement

//     // Determine the effective theme based on the system preference if theme starts with 'system'
//     const [base, color, contrast] = theme.split('-') as [ModeType, string, string]
//     const effectiveBase = base === 'system' ? systemTheme : base
//     const effectiveTheme = `${effectiveBase}-${color}-${contrast}`

//     root.className = '' // Clear existing classes
//     root.classList.add(effectiveTheme) // Apply the computed theme class
//   }, [theme, systemTheme])

//   useEffect(() => {
//     const updateSystemTheme = () => setSystemTheme(getMediaQuery().matches ? 'dark' : 'light')

//     if (theme.startsWith('system')) {
//       updateSystemTheme()
//     }

//     getMediaQuery().addEventListener('change', updateSystemTheme)

//     return () => getMediaQuery().removeEventListener('change', updateSystemTheme)
//   }, [theme])

//   const setTheme = (newTheme: FullTheme) => {
//     localStorage.setItem(storageKey, newTheme)
//     setThemeState(newTheme)

//     if (newTheme.startsWith('system')) {
//       setSystemTheme(getMediaQuery().matches ? 'dark' : 'light')
//     }
//   }

//   const value = {
//     theme,
//     setTheme
//   }

//   return (
//     <ThemeProviderContext.Provider {...props} value={value}>
//       {children}
//     </ThemeProviderContext.Provider>
//   )
// }

// export const useTheme = () => {
//   const context = useContext(ThemeProviderContext)
//   if (!context) throw new Error('useTheme must be used within a ThemeProvider')
//   return context
// }
