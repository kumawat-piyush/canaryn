export type ModeType = 'dark' | 'light' | 'system'
export type ColorType = 'std' | 'tri' | 'pnd'
export type ContrastType = 'standard' | 'low' | 'high'
export type FullTheme = `${ModeType}-${ColorType}-${ContrastType}`
export type ThemeState = {
  theme: FullTheme
  setTheme: (theme: FullTheme) => void
}
