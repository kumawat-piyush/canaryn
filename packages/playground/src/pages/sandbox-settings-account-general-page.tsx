import React from 'react'
import { Button, ButtonGroup, Input, Spacer, Text } from '@harnessio/canary'
import { SandboxLayout, FormFieldSet } from '..'

function SandboxSettingsAccountGeneralPage() {
  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content maxWidth="2xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          General
        </Text>
        <Spacer size={6} />
        <FormFieldSet.Root>
          <FormFieldSet.Legend>Personal information</FormFieldSet.Legend>
          <FormFieldSet.ControlGroup>
            <FormFieldSet.Label htmlFor="name">Name</FormFieldSet.Label>
            <Input id="name" type="text" placeholder="Enter your name" />
          </FormFieldSet.ControlGroup>
          <FormFieldSet.ControlGroup>
            <FormFieldSet.Label htmlFor="username">Username</FormFieldSet.Label>
            <Input id="username" type="test" placeholder="Enter your username" />
          </FormFieldSet.ControlGroup>
          <FormFieldSet.ControlGroup>
            <FormFieldSet.Label htmlFor="email">Account email</FormFieldSet.Label>
            <Input id="email" type="email" placeholder="brad@drone.io" />
          </FormFieldSet.ControlGroup>
          <FormFieldSet.ControlGroup type="button">
            <ButtonGroup.Root>
              <Button size="sm">Update profile</Button>
            </ButtonGroup.Root>
          </FormFieldSet.ControlGroup>
        </FormFieldSet.Root>
        <FormFieldSet.Root>
          <FormFieldSet.Separator />
        </FormFieldSet.Root>
        <FormFieldSet.Root>
          <FormFieldSet.Legend>Password settings</FormFieldSet.Legend>
          <FormFieldSet.SubLegend>
            Minimum of 6 characters long containing at least one number and have a mixture of uppercase and lowercase
            letters.
          </FormFieldSet.SubLegend>
          <FormFieldSet.ControlGroup>
            <FormFieldSet.Label htmlFor="old-password">Old password</FormFieldSet.Label>
            <Input id="old-password" type="password" placeholder="Enter your old password" />
          </FormFieldSet.ControlGroup>
          <FormFieldSet.ControlGroup>
            <FormFieldSet.Label htmlFor="new-password">New password</FormFieldSet.Label>
            <Input id="new-password" type="password" placeholder="Enter a new password" />
          </FormFieldSet.ControlGroup>
          <FormFieldSet.ControlGroup>
            <FormFieldSet.Label htmlFor="confirm-password">Confirm new password</FormFieldSet.Label>
            <Input id="confirm-password" type="password" placeholder="Confirm the new password" />
          </FormFieldSet.ControlGroup>
          <FormFieldSet.ControlGroup type="button">
            <ButtonGroup.Root>
              <Button size="sm">Update password</Button>
            </ButtonGroup.Root>
          </FormFieldSet.ControlGroup>
        </FormFieldSet.Root>
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsAccountGeneralPage }
