import React from 'react'
import { Refresh } from '@harnessio/icons-noir'
import { Topbar, Text } from '@harnessio/canary'
interface WidgetLoadingProps {
  isLoading: boolean
}

export const TopBarWidgetLoading: React.FC<WidgetLoadingProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null
  }

  return (
    <Topbar.Root>
      <Topbar.Left>
        <div className="flex gap-2 flex-row items-center justify-center">
          <Text size={6} className="flex bg-muted rounded-full p-1.5 gap-4 align-middle ">
            <Refresh className="animate-spin" />
          </Text>
          <Text size={2} weight="medium" className="flex text-primary-muted flex-grow align-middle">
            Loading Your Projects...
          </Text>
        </div>
      </Topbar.Left>
    </Topbar.Root>
  )
}
