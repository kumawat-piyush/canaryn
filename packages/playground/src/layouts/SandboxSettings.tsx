import React from 'react'
import { Outlet } from 'react-router-dom'
import { SandboxLayout } from '../index'
import { Text } from '@harnessio/canary'

const SandboxSettings: React.FC = () => {
  return (
    <>
      <SandboxLayout.Header>
        <div className="h-full flex items-center px-8 border-b border-border-background">
          <Text size={2} color="primary" weight="medium">
            Settings
          </Text>
        </div>
      </SandboxLayout.Header>
      <Outlet />
    </>
  )
}

export { SandboxSettings }
