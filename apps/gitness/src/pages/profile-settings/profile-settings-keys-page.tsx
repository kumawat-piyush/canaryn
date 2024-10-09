import React, { useState } from 'react'
import { Spacer, Text, Button } from '@harnessio/canary'
import {
  FormFieldSet,
  SandboxLayout,
  ProfileKeysList,
  KeysList,
  ProfileTokensList,
  TokensList
} from '@harnessio/playground'

interface SandboxSettingsAccountKeysPageProps {
  publicKeys: KeysList[]
  tokens: TokensList[]
  openTokenDialog: () => void
  openSshKeyDialog: () => void
}
const SandboxSettingsAccountKeysPage: React.FC<SandboxSettingsAccountKeysPageProps> = ({
  publicKeys,
  tokens,
  openTokenDialog,
  openSshKeyDialog
}) => {
  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content maxWidth="2xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Keys and Tokens
        </Text>
        <Spacer size={6} />
        <form>
          <FormFieldSet.Root>
            {/* PERSONAL ACCESS TOKEN */}
            <FormFieldSet.Legend>
              <div className="flex justify-between">
                Personal access token
                <Button type="button" variant="outline" className="text-primary" onClick={openTokenDialog}>
                  Add new token
                </Button>
              </div>
            </FormFieldSet.Legend>
            <FormFieldSet.ControlGroup>
              <ProfileTokensList tokens={tokens} />
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
          <FormFieldSet.Root>
            <FormFieldSet.Separator />
          </FormFieldSet.Root>
          <FormFieldSet.Root>
            {/* PERSONAL ACCESS TOKEN */}
            <FormFieldSet.Legend>My SSH keys</FormFieldSet.Legend>
            <FormFieldSet.SubLegend>
              <div className="flex justify-between">
                SSH keys allow you to establish a secure connection to your code repository.
                <Button variant="outline" className="text-primary" type="button" onClick={openSshKeyDialog}>
                  Add new SSH key
                </Button>
              </div>
            </FormFieldSet.SubLegend>
            <FormFieldSet.ControlGroup>
              <ProfileKeysList publicKeys={publicKeys} />
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
        </form>
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsAccountKeysPage }
