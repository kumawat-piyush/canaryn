import React from 'react'
import { Spacer, Text } from '@harnessio/canary'
import { SandboxLayout } from '..'

function SandboxSettingsProjectGeneralPage() {
  return (
    <SandboxLayout.Main hasLeftPanel hasLeftSubPanel hasHeader>
      <SandboxLayout.Content>
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          General
        </Text>
        <Spacer size={6} />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsProjectGeneralPage }
