import { Skeleton, StackedList } from '@harnessio/canary'
import React from 'react'

export default function SkeletonList() {
  const listItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="relative w-full h-full">
      {listItems && listItems.length > 0 && (
        <StackedList.Root>
          {listItems.map((itm, itm_idx) => (
            <StackedList.Item key={itm_idx} isLast={listItems.length - 1 === itm_idx}>
              <StackedList.Field
                title={<Skeleton className="w-1/2 h-4 mb-1.5" />}
                description={<Skeleton className="w-full h-4" />}
              />
              <StackedList.Field
                title={<Skeleton className="w-1/2 h-4" />}
                description={<Skeleton className="w-full h-4" />}
                right
                secondary
              />
            </StackedList.Item>
          ))}
        </StackedList.Root>
      )}
      <div className="absolute z-10 bottom-0 w-full h-full bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
