import { cn } from '@harnessio/canary'
import React from 'react'

interface ColumnsProps {
  children: React.ReactNode
  className?: string
  columnWidths?: string
}

function Root({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen" role="main">
      {children}
    </main>
  )
}

function LeftPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <nav
      className={cn(
        'fixed left-0 top-0 bottom-0 z-50 w-[220px] border-r border-border-background overflow-y-auto',
        className
      )}
      aria-label="Left Navigation Panel">
      {children}
    </nav>
  )
}

function LeftSubPanel({
  children,
  hasHeader,
  hasSubHeader,
  className
}: {
  children: React.ReactNode
  hasHeader?: boolean
  hasSubHeader?: boolean
  className?: string
}) {
  const paddingTopClass =
    hasHeader && hasSubHeader ? 'top-[100px]' : hasHeader ? 'top-[55px]' : hasSubHeader ? 'top-[45px]' : ''

  return (
    <section
      className={cn(
        'fixed left-[220px] top-0 bottom-0 z-50 w-[248px] border-r border-border-background overflow-y-auto',
        paddingTopClass,
        className
      )}
      aria-label="Left Sub Navigation Panel">
      {children}
    </section>
  )
}

function Header({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <header className={cn('h-[55px] fixed top-0 left-[220px] right-0 z-50 bg-background', className)} role="banner">
      {children}
    </header>
  )
}

function SubHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <header
      className={cn('h-[45px] fixed top-[55px] left-[220px] right-0 z-40 bg-background', className)}
      role="secondarybanner">
      {children}
    </header>
  )
}

function Main({
  children,
  fullWidth,
  className,
  hasHeader,
  hasSubHeader,
  hasLeftPanel,
  hasLeftSubPanel
}: {
  children: React.ReactNode
  fullWidth?: boolean
  className?: string
  hasHeader?: boolean
  hasSubHeader?: boolean
  hasLeftPanel?: boolean
  hasLeftSubPanel?: boolean
}) {
  const paddingTopClass =
    hasHeader && hasSubHeader ? `pt-[calc(55px+45px)]` : hasHeader ? 'pt-[55px]' : hasSubHeader ? 'pt-[45px]' : ''

  const paddingLeftClass =
    hasLeftPanel && hasLeftSubPanel
      ? 'pl-[calc(220px+248px)]'
      : hasLeftPanel
        ? 'pl-[220px]'
        : hasLeftSubPanel
          ? 'pl-[248px]'
          : ''

  if (fullWidth) {
    return (
      <div
        role="region"
        aria-label="Main Content"
        className={cn('h-full', paddingLeftClass, paddingTopClass, className)}>
        {children}
      </div>
    )
  }

  return (
    <div role="region" aria-label="Main Content" className={cn('h-full', paddingLeftClass)}>
      <div className={cn('h-full mx-auto max-w-[1200px]', paddingTopClass, className)}>{children}</div>
    </div>
  )
}

function Content({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-8 py-5 pb-24', className)}>{children}</div>
}

function Columns({ children, className, columnWidths = 'repeat(2, 1fr)' }: ColumnsProps) {
  return (
    <div
      className={cn('grid grid-flow-col', className)}
      style={{ gridTemplateColumns: columnWidths }}
      role="grid"
      aria-label="Column Layout">
      {children}
    </div>
  )
}

function Column({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('', className)} role="gridcell">
      {children}
    </div>
  )
}

export { Root, LeftPanel, LeftSubPanel, Header, SubHeader, Main, Content, Columns, Column }