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
      {/* why we need to use width 50% here is because the middle line"|" is not in the middle of the bar if the number is not the same. if we do text-center, 
        text will be move forward ot the right and also caused not aligned the center position" */}
      <Text wrap="nowrap" truncate className="w-full text-tertiary-background text-center flex flex-grow flex-row">
        <span className="w-[50%] border-r-2 text-right pr-1 border-gray-20">{behindAhead.behind}</span>
        <span className="w-[50%] text-left pl-1">{behindAhead.ahead}</span>
      </Text>
      {/* bar section : The reason why we don't use the fileviewgauge is the background color cannot be customized even use in the className*/}
      <div className="w-full m-auto text-center flex mt-1 max-w-28 flex-row">
        <Text className="h-1 w-[50%] relative">
          <span
            className="h-full absolute top-0 right-0 rounded-l-sm"
            style={{ width: `${behindPercentage}%`, backgroundColor: '#303036' }}
          />
        </Text>
        <Text className="h-1 w-[50%] relative">
          <span
            className="h-full absolute top-0 left-0 rounded-r-sm"
            style={{ width: `${aheadPercentage}%`, backgroundColor: '#484851' }}
          />
        </Text>
      </div>
    </div>
  )
}
