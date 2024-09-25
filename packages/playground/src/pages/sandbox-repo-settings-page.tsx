import React, { useState } from 'react'
import { PlaygroundListSettings } from '../settings/list-settings'
import { SandboxLayout } from '../index'

function SandboxRepoSettingsPage() {
  const [loadState, setLoadState] = useState('data-loaded')

  return (
    <SandboxLayout.Main hasHeader hasSubHeader hasLeftPanel>
      <SandboxLayout.Columns columnWidths="auto 1fr">
        <SandboxLayout.Column>
          <SandboxLayout.Content>
            <p>Menu</p>
          </SandboxLayout.Content>
        </SandboxLayout.Column>
        <SandboxLayout.Column>
          <SandboxLayout.Content>
            <p>Settings</p>
          </SandboxLayout.Content>
        </SandboxLayout.Column>
      </SandboxLayout.Columns>
      <PlaygroundListSettings loadState={loadState} setLoadState={setLoadState} />
    </SandboxLayout.Main>
  )
}

export { SandboxRepoSettingsPage }
