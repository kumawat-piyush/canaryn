import React from 'react'
import { cn } from '@/lib/utils'

export enum MeterState {
  Empty = 0,
  Inactive = 1,
  Active = 2,
  Error = 3
}

interface MeterRootProps {
  data?: {
    id: string
    state: MeterState
  }[]
  className?: string
}

const stateToBgColor = {
  [MeterState.Empty]: 'bg-tertiary-background/20',
  [MeterState.Inactive]: 'bg-red-400',
  [MeterState.Active]: 'bg-yellow-400',
  [MeterState.Error]: 'bg-green-300'
}

const stateToGlow = {
  [MeterState.Empty]: '', // No glow for empty state
  [MeterState.Inactive]: 'shadow-[0_0_6px_2px_rgba(248,113,113,0.3)]', // red-400 with 30% opacity
  [MeterState.Active]: 'shadow-[0_0_6px_2px_rgba(251,191,36,0.3)]', // yellow-400 with 30% opacity
  [MeterState.Error]: 'shadow-[0_0_6px_2px_rgba(16,185,129,0.3)]' // emerald-400 with 30% opacity
}

function Root({ data, className }: MeterRootProps) {
  return (
    <div className={cn('flex h-5 gap-[4px] items-stretch', className)}>
      {data?.map((col, col_idx) => {
        return (
          <div
            key={col_idx}
            className={cn('flex w-[5px] h-full rounded-[1.5px]', stateToBgColor[col.state], stateToGlow[col.state])}
          />
        )
      })}
    </div>
  )
}

export { Root }
