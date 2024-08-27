import React from 'react'
import { Text } from '@harnessio/canary'

export default function CommitsList() {
  return (
    //  Needs absolute height here unfortunately, h-full does not work
    <div className="grid grid-cols-[220px_1fr] h-[calc(100vh-102px)]">
      <div className="h-full overflow-y-auto border-r px-8 py-4">
        <Text size={1}>Left child panel</Text>
        <div className="h-[2000px]" />
        <Text size={2}>End of left</Text>
      </div>
      <div className="h-full overflow-y-auto px-8 py-4">
        <Text size={1}>Right child panel</Text>
        <div className="h-[2000px]" />
        <Text size={2}>End of right</Text>
      </div>
    </div>
  )
}
