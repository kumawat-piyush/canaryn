import React, { useEffect, useState } from 'react'
import { Text, Icon, cn } from '@harnessio/canary'
import copy from 'clipboard-copy'
import { ShaBadge } from '../..'

export const PasswordCopyAction = ({ password }: { password: string }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let timeoutId: number
    if (copied) {
      copy(password)
      timeoutId = window.setTimeout(() => setCopied(false), 2500)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [copied])

  return (
    <ShaBadge.Root>
      <ShaBadge.Content>
        <Text size={1} className="text-tertiary-background">
          {password}
        </Text>
      </ShaBadge.Content>
      <ShaBadge.Icon handleClick={() => setCopied(true)}>
        <Icon size={12} name={copied ? 'tick' : 'clone'} className={cn({ 'text-success': copied })} />
        <Text className={cn('ml-3', { 'text-success': copied })}>{copied ? `Copied` : `Copy `} new password</Text>
      </ShaBadge.Icon>
    </ShaBadge.Root>
  )
}
