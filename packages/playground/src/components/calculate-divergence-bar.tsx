import React from 'react'
import { Text } from '@harnessio/canary'
import { cn } from '@harnessio/canary'

interface CalDivergenceProps {
  behindAhead: {
    behind?: number
    ahead?: number
  }
  className?: string
}

export const CalculateDivergenceBar = ({ behindAhead, className }: CalDivergenceProps) => {
  const total = (behindAhead.behind ?? 0) + (behindAhead.ahead ?? 0)
  const getPercentage = (value: number) => (value / total) * 100
  const behindPercentage = getPercentage(behindAhead.behind ?? 0)
  const aheadPercentage = getPercentage(behindAhead.ahead ?? 0)

  return (
    <div className={cn('flex flex-col m-auto w-full', className)}>
      <Text wrap="nowrap" truncate className="w-full text-tertiary-background text-center flex flex-grow flex-row">
        <span className="w-[50%] border-r-2 text-right px-1.5 border-gray-20">{behindAhead.behind}</span>
        <span className="w-[50%] text-left px-1.5">{behindAhead.ahead}</span>
      </Text>
      {/* bar section : The reason why we don't use the fileviewgauge is the background color cannot be customized even use in the className*/}
      <div className="w-full m-auto text-center flex mt-1 max-w-28 flex-row">
        <Text className="h-1 w-[50%] relative">
          <span
            className="h-full absolute top-0 right-0 rounded-l-sm bg-divergence-behind"
            style={{ width: `${behindPercentage}%` }}
          />
        </Text>
        <Text className="h-1 w-[50%] relative">
          <span
            className="h-full absolute top-0 left-0 rounded-r-sm bg-divergence-ahead"
            style={{ width: `${aheadPercentage}%` }}
          />
        </Text>
      </div>
    </div>
  )
}
