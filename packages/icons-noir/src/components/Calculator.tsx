// This file is automatically generated. Modifying its content manually is discouraged.
import React from 'react'
import { registerIcon } from '@harnessio/svg-icon'
import type { IconProps } from '@harnessio/svg-icon-react'
import { Icon } from '@harnessio/svg-icon-react'

const name = 'calculator/noir'

registerIcon(
  name,
  `<svg width="24" height="24" fill="none" stroke-width="1.5" viewBox="0 0 24 24"><path stroke="currentColor" d="M1 21V3a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M15 7h4m-4 8.5h4m-4 3h4M5 7h2m2 0H7m0 0V5m0 2v2m-1.414 9.414L7 17m1.415-1.414L7 17m0 0-1.414-1.414M7 17l1.415 1.414"/></svg>`
)

export function Calculator(props: IconProps) {
  return <Icon name={name} {...props} />
}

Calculator.prototype.name = name
