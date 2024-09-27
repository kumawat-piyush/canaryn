import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@harnessio/canary'
import { SandboxLayout } from '..'
import { PlaygroundSandboxLayoutSettings } from '../settings/sandbox-settings'
import { NavLink, Outlet } from 'react-router-dom'

function SandboxSettingsAccountPage() {
  const [loadState, setLoadState] = useState('sub-float')

  return (
    <>
      <SandboxLayout.SubHeader>
        <Tabs variant="navigation" defaultValue="general">
          <TabsList>
            <NavLink to={`general`}>
              <TabsTrigger value="general">General</TabsTrigger>
            </NavLink>
            <NavLink to={`keys`}>
              <TabsTrigger value="keys">Keys and tokens</TabsTrigger>
            </NavLink>
          </TabsList>
        </Tabs>
      </SandboxLayout.SubHeader>
      <Outlet />
      <PlaygroundSandboxLayoutSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}

export { SandboxSettingsAccountPage }
