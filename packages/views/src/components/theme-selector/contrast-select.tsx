import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@harnessio/canary'

import { ColorType, ContrastType, FullTheme, ModeType } from '../theme-provider/types'

export function ContrastSelect({
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
          <SelectItem value={ContrastType.Standard}>Standard</SelectItem>
          <SelectItem value={ContrastType.Low}>Low</SelectItem>
          <SelectItem value={ContrastType.High}>High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
