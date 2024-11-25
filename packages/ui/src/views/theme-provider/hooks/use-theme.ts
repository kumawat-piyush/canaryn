import { useThemeStore } from './use-theme-store'

export const useTheme = () => {
  const { theme, setTheme } = useThemeStore(state => ({ theme: state.theme, setTheme: state.setTheme }))

  return { theme, setTheme }
}
