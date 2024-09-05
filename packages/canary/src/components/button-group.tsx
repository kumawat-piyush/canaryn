import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonGroupProps {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
  className?: string
  spacing?: string
}

function Root({ children, direction = 'horizontal', className, spacing = '4' }: ButtonGroupProps) {
  const gapClass = `gap-${spacing}`

  return <div className={cn('flex', direction === 'vertical' ? 'flex-col' : '', gapClass, className)}>{children}</div>
}

export { Root }
