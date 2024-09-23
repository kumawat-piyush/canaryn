import React, { useState } from 'react'
import { Icon, Navbar, Spacer, Text } from '@harnessio/canary'
import { SandboxLayout } from '..'
import { PlaygroundSandboxLayoutSettings } from '../settings/sandbox-settings'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <Navbar.Root className="w-full border-none bg-transparent px-3">
      <Navbar.Content>
        <Navbar.Group>
          <NavLink to="account">
            <Navbar.Item text="Account" icon={<Icon name="harness" size={12} />} />
          </NavLink>
          <NavLink to="project">
            <Navbar.Item text="Project" icon={<Icon name="harness" size={12} />} />
          </NavLink>
        </Navbar.Group>
      </Navbar.Content>
    </Navbar.Root>
  )
}

function SandboxSettingsPage() {
  const [loadState, setLoadState] = useState('sub-float')

  return (
    <>
      {loadState.includes('sub') && (
        <SandboxLayout.LeftSubPanel hasHeader>
          <Sidebar />
        </SandboxLayout.LeftSubPanel>
      )}
      <SandboxLayout.Main hasLeftPanel hasLeftSubPanel hasHeader>
        <SandboxLayout.Content>
          <Spacer size={10} />
          <Text size={5} weight={'medium'}>
            Settings
          </Text>
          <Spacer size={6} />
        </SandboxLayout.Content>
      </SandboxLayout.Main>
      <PlaygroundSandboxLayoutSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}

export { SandboxSettingsPage }
