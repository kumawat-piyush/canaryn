import React, { useState } from 'react'
import { Text } from '@harnessio/canary'
import { SandboxLayout } from '..'
import { PlaygroundSandboxLayoutSettings } from '../settings/sandbox-settings'

function Sidebar() {
  return (
    <div>
      <Text size={2} color="tertiaryBackground">
        Settings groups
      </Text>
    </div>
  )
}

function SandboxSettingsPage() {
  const [loadState, setLoadState] = useState('full-sub')

  return (
    <>
      {loadState.includes('sub') && (
        <SandboxLayout.LeftSubPanel hasHeader>
          <SandboxLayout.Content>
            <Sidebar />
          </SandboxLayout.Content>
        </SandboxLayout.LeftSubPanel>
      )}
      <SandboxLayout.Main
        fullWidth={loadState.includes('full')}
        hasLeftPanel
        hasLeftSubPanel={loadState.includes('sub')}
        hasHeader>
        <SandboxLayout.Content>
          <div>
            <Text size={2} color="tertiaryBackground">
              Settings page
            </Text>
          </div>
        </SandboxLayout.Content>
      </SandboxLayout.Main>
      <PlaygroundSandboxLayoutSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}

export { SandboxSettingsPage }
