import React from 'react'
import { Spacer, Text } from '@harnessio/canary'
import { SandboxLayout, SkeletonList } from '..'

function SandboxSettingsAccountGeneralPage() {
  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content>
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          General
        </Text>
        <Spacer size={6} />
        <SkeletonList />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsAccountGeneralPage }
