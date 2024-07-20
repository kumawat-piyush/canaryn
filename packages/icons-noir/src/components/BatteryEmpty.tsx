// This file is automatically generated. Modifying its content manually is discouraged.
import React from 'react'
import { registerIcon } from '@harnessio/svg-icon'
import type { IconProps } from '@harnessio/svg-icon-react'
import { Icon } from '@harnessio/svg-icon-react'

const name = 'battery-empty/noir'

registerIcon(
  name,
  `<svg width="24" height="24" fill="none" stroke-width="1.5" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M23 10v4"/><path stroke="currentColor" d="M1 16V8a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2Z"/></svg>`
)

export function BatteryEmpty(props: IconProps) {
  return <Icon name={name} {...props} />
}

BatteryEmpty.prototype.name = name
