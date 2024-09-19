import { cn } from '@harnessio/canary'
import React from 'react'

const Root: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="h-screen">{children}</div>
}

function Sidebar({ children, nested, className }: { children: React.ReactNode; nested?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        'fixed left-0 top-0 bottom-0 z-50 w-[220px] border-r border-border-background overflow-y-auto',
        {
          'left-[220px] top-[100px]': nested
        },
        className
      )}>
      {children}
    </div>
  )
}

function Main({ children }: { children: React.ReactNode }) {
  return <div className="h-full pl-[220px]">{children}</div>
}

function Header({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'h-[100px] fixed top-0 left-[220px] right-0 border-b border-border-background z-50 bg-background',
        className
      )}>
      {children}
    </div>
  )
}

function Content({
  children,
  fullWidth,
  className
}: {
  children: React.ReactNode
  fullWidth?: boolean
  className?: string
}) {
  if (fullWidth) return <div className={cn('min-h-full pt-[100px] w-full px-8 pb-24', className)}>{children}</div>

  return (
    <div className="flex min-h-full pt-[100px]">
      <div className={cn('mx-auto max-w-[1200px] w-full', className)}>{children}</div>
    </div>
  )
}

export { Root, Sidebar, Main, Header, Content }
