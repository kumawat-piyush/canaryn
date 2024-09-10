import { cn } from '@harnessio/canary'
import React from 'react'

function Root({
  children,
  topBorder = false,
  firstSection = false,
  className = ''
}: {
  children: React.ReactNode
  topBorder?: boolean
  firstSection?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        { 'border-t border-grey-10 pt-7': topBorder, 'mt-16': firstSection, 'mt-7': !firstSection },
        className
      )}>
      {children}
    </div>
  )
}

function Header({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex flex-col gap-3 mb-1', className)}>{children}</div>
}

function Content({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex flex-col gap-3', className)}>{children}</div>
}

function BoxGroup({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('grid grid-cols-3 auto-rows-[220px] gap-x-4 gap-y-6 auto-cols-[1fr]', className)}>
      {children}
    </div>
  )
}

function Box({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn('border bg-white/5 rounded-md', className)}>{children}</div>
}

export { Root, Header, Content, BoxGroup, Box }
