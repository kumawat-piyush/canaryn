import React from 'react'
import { cn } from '@/lib/utils'

export enum MeterState {
  Empty = 0,
  Error = 1,
  Warning = 2,
  Success = 3
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
  [MeterState.Error]: 'bg-error',
  [MeterState.Warning]: 'bg-warning',
  [MeterState.Success]: 'bg-success'
}

function Root({ data, className }: MeterRootProps) {
  return (
    <div className={cn('flex h-[19px] gap-[4px] items-stretch', className)}>
      {data?.map((col, col_idx) => {
        return <div key={col_idx} className={cn('flex w-[5px] h-full rounded-[1px]', stateToBgColor[col.state])} />
      })}
    </div>
  )
}

export { Root }
