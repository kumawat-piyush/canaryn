import React from 'react'
import { Text } from '@harnessio/canary'

interface RootProps {
  children: React.ReactNode
  className?: string
}

interface BarProps {
  total: number
  filled: number
  className?: string
}

function Root({ ...props }: RootProps) {
  const { children } = props

  return <div className="flex flex-col gap-1 justify-center">{children}</div>
}

function Content({ ...props }: RootProps) {
  const { children } = props

  return (
    <div className="flex leading-snug px-2">
      <Text size={1} className="text-primary/70">
        {children}
      </Text>
    </div>
  )
}
function Bar({ total, filled }: BarProps) {
  const percentageFilled = (filled / total) * 100

  return (
    <div className="relative flex h-[3px] rounded-[1px] bg-tertiary-background/20 overflow-hidden">
      {/* Style prop is necessary becuase TW does not support dynamic percentage widths */}
      <div
        className="h-full bg-blue-400 transition-all ease-in-out duration-300"
        style={{ width: `${percentageFilled}%` }}
      />
    </div>
  )
}

export { Root, Content, Bar }
