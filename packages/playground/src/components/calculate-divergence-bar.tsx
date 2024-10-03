import React from 'react'
import { Progress, Text } from '@harnessio/canary'
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
      <div className="grid grid-flow-col grid-cols-2 justify-center pr-[2px]">
        {/* <Text className="h-1 w-[50%] relative">
          <span
            className="h-full absolute top-0 right-0 rounded-l-sm bg-primary/20"
            style={{ width: `${behindPercentage}%` }}
          />
        </Text>
        <Text className="h-1 w-[50%] relative">
          <span
            className="h-full absolute top-0 left-0 rounded-r-sm bg-primary/30"
            style={{ width: `${aheadPercentage}%` }}
          />
        </Text> */}
        <div className="relative rotate-180">
          <Progress variant="divergence" value={behindPercentage} />
        </div>
        <div className="relative">
          <Progress variant="divergence" value={aheadPercentage} />
        </div>
      </div>
    </div>
  )
}
