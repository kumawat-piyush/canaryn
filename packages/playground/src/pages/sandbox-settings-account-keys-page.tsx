import React from 'react'
import { Spacer, Text } from '@harnessio/canary'
import { SandboxLayout } from '..'

function SandboxSettingsAccountKeysPage() {
  return (
    <SandboxLayout.Main hasLeftPanel hasLeftSubPanel hasHeader>
      <SandboxLayout.Content>
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Keys and tokens
        </Text>
        <Spacer size={6} />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsAccountKeysPage }
