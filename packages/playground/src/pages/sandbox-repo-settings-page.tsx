import React, { useState } from 'react'
import { PlaygroundListSettings } from '../settings/list-settings'
import { SandboxLayout } from '../index'
import { Navbar } from '@harnessio/canary'

function Sidebar() {
  return (
    <Navbar.Root className="bg-transparent border-none">
      <Navbar.Content>
        <Navbar.Group title="Access">
          <Navbar.Item text="Collaborations" />
          <Navbar.Item text="Moderation options" />
        </Navbar.Group>
        <Navbar.Group title="Code and automation" topBorder>
          <Navbar.Item text="Branches" />
          <Navbar.Item text="Tags" />
          <Navbar.Item text="Rules" />
          <Navbar.Item text="Actions" />
          <Navbar.Item text="Webhooks" />
          <Navbar.Item text="Environments" />
          <Navbar.Item text="Codespaces" />
          <Navbar.Item text="Pages" />
        </Navbar.Group>
        <Navbar.Group title="Security" topBorder>
          <Navbar.Item text="Code security and analysis" />
          <Navbar.Item text="Deploy keys" />
          <Navbar.Item text="Secrets and variables" />
        </Navbar.Group>
        <Navbar.Group title="Security" topBorder>
          <Navbar.Item text="Email notifications" />
        </Navbar.Group>
      </Navbar.Content>
    </Navbar.Root>
  )
}

function SandboxRepoSettingsPage() {
  const [loadState, setLoadState] = useState('data-loaded')

  return (
    <SandboxLayout.Main hasHeader hasSubHeader hasLeftPanel>
      <SandboxLayout.Columns columnWidths="auto 1fr">
        <SandboxLayout.Column>
          <SandboxLayout.Content className="pr-0">
            <Sidebar />
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
