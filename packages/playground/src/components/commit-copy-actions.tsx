import React, { useEffect, useState } from 'react'
import { Text, Icon, cn } from '@harnessio/canary'
import copy from 'clipboard-copy'
import { ShaBadge } from '..'
import { Link } from 'react-router-dom'
//TODO: it need to pass url to copy function in the future, it is used in branch-list & pull-request-commit list
// not have commit detail page yet
export const CommitCopyActions = ({ sha, password }: { sha?: string; password?: string }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let timeoutId: number
    if (copied) {
      if (sha) {
        copy(sha)
      } else {
        copy(password ?? '')
      }

      timeoutId = window.setTimeout(() => setCopied(false), 2500)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [copied])

  return (
    <ShaBadge.Root>
      <ShaBadge.Content>
        <Link to="#">
          <Text size={1} className="text-tertiary-background">
            {sha ? sha.substring(0, 7) : password}
          </Text>
        </Link>
      </ShaBadge.Content>
      <ShaBadge.Icon handleClick={() => setCopied(true)}>
        <Icon size={12} name={copied ? 'tick' : 'clone'} className={cn({ 'text-success': copied })} />
        {password && (
          <Text className={cn('ml-3', { 'text-success': copied })}>{copied ? `Copied` : `Copy `} new password</Text>
        )}
      </ShaBadge.Icon>
    </ShaBadge.Root>
  )
}
