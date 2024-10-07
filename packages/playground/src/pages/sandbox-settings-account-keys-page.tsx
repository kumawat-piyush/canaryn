import React from 'react'
import { Spacer, Text } from '@harnessio/canary'
import { FormFieldSet, SandboxLayout } from '..'
import { ProfileKeysList } from '../components/profile-settings-keys-list'
import { ProfileTokensList } from '../components/profile-settings-tokens-list'
import { mockKeys } from './mocks/profile-settings/mockKeyList'
import { mockTokens } from './mocks/profile-settings/mockTokensList'

function SandboxSettingsAccountKeysPage() {
  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content maxWidth="2xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Keys and tokens
        </Text>
        <Spacer size={6} />
        <form>
          <FormFieldSet.Root>
            {/* PERSONAL ACCESS TOKEN */}
            <FormFieldSet.Legend>Personal access token</FormFieldSet.Legend>
            <FormFieldSet.ControlGroup>
              <ProfileTokensList tokens={mockTokens} />
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
          <FormFieldSet.Root>
            <FormFieldSet.Separator />
          </FormFieldSet.Root>
          <FormFieldSet.Root>
            {/* PERSONAL ACCESS TOKEN */}
            <FormFieldSet.Legend>My SSH keys</FormFieldSet.Legend>
            <FormFieldSet.SubLegend>
              SSH keys allow you to establish a secure connection to your code repository.
            </FormFieldSet.SubLegend>
            <FormFieldSet.ControlGroup>
              <ProfileKeysList publicKeys={mockKeys} />
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
        </form>
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsAccountKeysPage }
