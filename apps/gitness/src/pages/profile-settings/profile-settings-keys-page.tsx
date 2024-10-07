import React from 'react'
import { Spacer, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Text } from '@harnessio/canary'
import { FormFieldSet, SandboxLayout } from '@harnessio/playground'
import { ListPublicKeyOkResponse } from '@harnessio/code-service-client'
import ReactTimeago from 'react-timeago'
import { Icon } from '@harnessio/canary'

interface SandboxSettingsAccountKeysPageProps {
  publicKeys: ListPublicKeyOkResponse[]
}
const SandboxSettingsAccountKeysPage: React.FC<SandboxSettingsAccountKeysPageProps> = ({ publicKeys }) => {
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
            <FormFieldSet.Legend>Personal access token</FormFieldSet.Legend>
            <FormFieldSet.ControlGroup>
              <Table variant="asStackedList">
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expiration date</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Text as="p" size={2} align="center" color={'tertiaryBackground'} className="text-center w-full">
                        There are no personal access tokens associated with this account.
                      </Text>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
              <Table variant="asStackedList">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead>Last used date</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* <TableCell colSpan={3}>
                      <Text as="p" size={2} align="center" color={'tertiaryBackground'} className="text-center w-full">
                        There are no SSH keys associated with this account.
                      </Text>
                    </TableCell> */}
                  {/* <TableCell> */}
                  {publicKeys.map((key: ListPublicKeyOkResponse) => {
                    return (
                      <TableRow key={key.identifier}>
                        <TableCell>
                          <div className="inline-flex gap-2">
                            <div className="bg-tertiary p-2 inline-block border rounded-lg">
                              <Icon name="ssh-key" size={20} />
                            </div>
                            <div className="flex flex-col">
                              <Text weight="bold">{key.identifier}</Text>
                              <Text truncate color="tertiaryBackground" className="max-w-[200px] overflow-hidden">
                                {key.fingerprint}
                              </Text>
                            </div>
                            {/* {key.fingerprint} */}
                          </div>
                        </TableCell>
                        {/* <TableCell>{new Date(key.created).toLocaleString()}</TableCell> */}
                        <TableCell className="h-1">
                          <div className="h-full flex items-center">
                            <ReactTimeago date={new Date(key.created)} />
                          </div>
                        </TableCell>

                        <TableCell className="h-1">
                          <div className="h-full flex items-center">
                            {key.last_used ? new Date(key.last_used).toLocaleString() : 'Never used'}
                          </div>
                        </TableCell>
                        <TableCell className="content-center">
                          <div className="flex gap-1.5 items-center justify-end">
                            <Icon name="vertical-ellipsis" size={14} className="text-tertiary-background" />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
        </form>
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsAccountKeysPage }
