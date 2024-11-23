import { useMemo } from 'react'

import { Moon, Sun, SunMoon } from 'lucide-react'

import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@harnessio/canary'

import { ColorType, ContrastType, FullTheme, ModeType, useTheme } from './theme-provider'

function getModeColorContrastFromFullTheme(theme: string) {
  const modeColorContrast = theme.split('-')

  if (modeColorContrast.length === 3) {
    return {
      mode: modeColorContrast[0] as ModeType,
      color: modeColorContrast[1] as ColorType,
      contrast: modeColorContrast[2] as ContrastType
    }
  } else {
    return { mode: 'dark' as ModeType, color: 'black' as ColorType, contrast: 'standard' as ContrastType }
  }
}

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  // theme will be structured like light-orange-standard which represents mode-color-contrast

  const { mode, color, contrast } = useMemo(() => getModeColorContrastFromFullTheme(theme), [theme])

  return (
    <div className="flex w-full items-center space-x-5">
      <ModeSelect setTheme={setTheme} mode={mode} color={color} contrast={contrast} />
      <ColorSelect setTheme={setTheme} mode={mode} color={color} contrast={contrast} />
      <ContrastSelect setTheme={setTheme} mode={mode} color={color} contrast={contrast} />
    </div>
  )
}

function ModeSelect({
  setTheme,
  mode,
  color,
  contrast
}: {
  setTheme: (theme: FullTheme) => void
  mode: ModeType
  color: ColorType
  contrast: ContrastType
}) {
  return (
    <div>
      <Label className="text-xs">Mode</Label>
      <Select
        value={mode}
        onValueChange={(mode: ModeType) => {
          setTheme(`${mode}-${color}-${contrast}`)
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a theme mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function ColorSelect({
  setTheme,
  mode,
  color,
  contrast
}: {
  setTheme: (theme: FullTheme) => void
  color: ColorType
  mode: ModeType
  contrast: ContrastType
}) {
  return (
    <div>
      <Label className="text-xs">Color</Label>
      <Select
        value={color}
        onValueChange={(color: ColorType) => {
          setTheme(`${mode}-${color}-${contrast}`)
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a color theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="std">Standard</SelectItem>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vision Assistive</SelectLabel>
            <SelectItem value="tri">Tritanopia</SelectItem>
            <SelectItem value="pnd">Protanopia & Deuteranopia</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

function ContrastSelect({
  setTheme,
  mode,
  color,
  contrast
}: {
  setTheme: (theme: FullTheme) => void
  mode: ModeType
  color: ColorType
  contrast: ContrastType
}) {
  return (
    <div>
      <Label className="text-xs">Contrast</Label>
      <Select
        value={contrast}
        onValueChange={(contrast: ContrastType) => {
          setTheme(`${mode}-${color}-${contrast}`)
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a theme contrast" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="standard">Standard</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
