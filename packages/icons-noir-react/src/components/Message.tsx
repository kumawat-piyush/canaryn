// This file is automatically generated. Modifying its content manually is discouraged.
import { registerIcon } from '@harnessio/svg-icon'
import type { IconProps } from '@harnessio/svg-icon-react'
import { Icon } from '@harnessio/svg-icon-react'

const name = 'message/noir'

registerIcon(
  name,
  `<svg width="24" height="24" fill="none" stroke-width="1.5" viewBox="0 0 24 24"><path stroke="currentColor" d="M3 20.29V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.961a2 2 0 0 0-1.561.75l-2.331 2.914A.6.6 0 0 1 3 20.29Z"/></svg>`
)

export function Message(props: IconProps) {
  return <Icon name={name} {...props} />
}

Message.prototype.name = name
