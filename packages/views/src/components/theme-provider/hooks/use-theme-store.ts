import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { FullTheme, ThemeState } from '../types'

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      theme: 'system-std-standard' as FullTheme, // Default theme
      setTheme: (newTheme: FullTheme) => set({ theme: newTheme })
    }),
    {
      name: 'canary-ui-theme' // LocalStorage key
    }
  )
)
