// This file is automatically generated. Modifying its content manually is discouraged.
import React from 'react'
import { registerIcon } from '@harnessio/svg-icon'
import type { IconProps } from '@harnessio/svg-icon-react'
import { Icon } from '@harnessio/svg-icon-react'

const name = 'voice-circle/noir'

registerIcon(
  name,
  `<svg width="24" height="24" fill="none" stroke-width="1.5" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M12 6v12M9 9v6m9-4v2M6 11v2m9-6v10m-3 5c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/></svg>`
)

export function VoiceCircle(props: IconProps) {
  return <Icon name={name} {...props} />
}

VoiceCircle.prototype.name = name
