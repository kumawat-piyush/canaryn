import { useMemo } from 'react'
import { Moon, Sun, SunMoon } from 'lucide-react'

import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
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
import { FormFieldSet } from '..'

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
      {/* <div>
        <FormFieldSet.Label>Mode</FormFieldSet.Label>
        <div className="w-fit rounded-md border">
          <div className="flex items-center justify-center space-x-3 p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  {mode === 'light' && <Sun className="size-[1.2rem]" />}
                  {mode === 'dark' && <Moon className="size-[1.2rem]" />}
                  {mode === 'system' && <SunMoon className="size-[1.2rem]" />}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme(`light-${color}-${contrast}`)}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(`dark-${color}-${contrast}`)}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(`system-${color}-${contrast}`)}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div> */}

      <ModeSelect setTheme={setTheme} mode={mode} color={color} contrast={contrast} />
      <ColorSelect setTheme={setTheme} mode={mode} color={color} contrast={contrast} />
      <ContrastSelect setTheme={setTheme} mode={mode} color={color} contrast={contrast} />

      {/* <div>
        <FormFieldSet.Label>Color</FormFieldSet.Label>
        <div className="w-fit rounded-md border">
          <div className="flex items-center justify-center space-x-3 p-2">
            {colorsToRender.map(colorToRender => (
              <ColorButton
                key={colorToRender}
                mode={mode}
                color={colorToRender}
                contrast={contrast}
                selectedColor={color}
                setTheme={setTheme}
              />
            ))}
          </div>
        </div>
      </div> */}

      {/* <div>
        <FormFieldSet.Label>Contrast</FormFieldSet.Label>
        <div className="w-fit rounded-md border">
          <div className="flex items-center justify-center space-x-3 p-2">
            <select
              className="p-2 focus:outline-none focus:ring-0"
              value={contrast}
              onChange={e => setTheme(`${mode}-${color}-${e.target.value as ContrastType}`)}>
              {contrastsToRender.map(contrastOption => (
                <option key={contrastOption} value={contrastOption} className="capitalize">
                  {contrastOption}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div> */}
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
        }}>
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
        }}>
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
        }}>
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

// function ColorButton({
//   mode,
//   color,
//   contrast,
//   selectedColor,
//   setTheme
// }: {
//   mode: ModeType
//   color: ColorType
//   contrast: ContrastType
//   title?: string
//   selectedColor: ColorType
//   setTheme: (theme: FullTheme) => void
// }) {
//   return (
//     <>
//       <button
//         onClick={() => setTheme(`${mode}-${color}-${contrast}`)}
//         title={color}
//         className={cn(
//           'flex items-center justify-center rounded-full border text-white',
//           selectedColor === color ? 'p-2' : 'p-4',
//           getTailwindColorClass(color)
//         )}>
//         {selectedColor === color && <Icon name="tick" size={16} />}
//       </button>
//     </>
//   )
// }

// const getTailwindColorClass = (color: ColorType) => {
//   switch (color) {
//     case 'blue':
//       return 'bg-blue-600'
//     case 'green':
//       return 'bg-green-600'
//     case 'orange':
//       return 'bg-orange-600'
//     case 'red':
//       return 'bg-red-600'
//     case 'violet':
//       return 'bg-violet-600'
//     case 'yellow':
//       return 'bg-yellow-600'
//     case 'zinc':
//       return 'bg-zinc-600'
//     default:
//       return 'bg-black'
//   }
// }
