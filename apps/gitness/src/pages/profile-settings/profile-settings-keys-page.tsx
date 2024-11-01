import React from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { Spacer, Text, Button } from '@harnessio/canary'
import {
  FormFieldSet,
  SandboxLayout,
  ProfileKeysList,
  KeysList,
  ProfileTokensList,
  TokensList
} from '@harnessio/playground'
import { ListPublicKeyErrorResponse, useListPublicKeyQuery } from '@harnessio/code-service-client'
import { AlertDeleteParams, ApiErrorType } from './types'
import { PageResponseHeader } from '../../types'
import { PaginationComponent } from '../../../../../packages/playground/dist'

interface SandboxSettingsAccountKeysPageProps {
  tokens: TokensList[]
  setPublicKeys: React.Dispatch<React.SetStateAction<KeysList[]>>
  openTokenDialog: () => void
  openSshKeyDialog: () => void
  openAlertDeleteDialog: (data: AlertDeleteParams) => void
  error: { type: string; message: string } | null
  setApiError: React.Dispatch<
    React.SetStateAction<{
      type: ApiErrorType
      message: string
    } | null>
  >
}
const SandboxSettingsAccountKeysPage: React.FC<SandboxSettingsAccountKeysPageProps> = ({
  tokens,
  setPublicKeys,
  openTokenDialog,
  openSshKeyDialog,
  openAlertDeleteDialog,
  error,
  setApiError
}) => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const { data: { body: publicKeys = [], headers } = {} } = useListPublicKeyQuery(
    {
      queryParams: {
        page,
        sort: 'created',
        order: 'asc'
      }
    },
    {
      onSuccess: ({ body: data }) => {
        setPublicKeys(data)
      },
      onError: (error: ListPublicKeyErrorResponse) => {
        const message = error.message || 'An unknown error occurred.'
        setApiError({ type: ApiErrorType.KeyFetch, message: message })
      }
    }
  )

  const totalPages = parseInt(headers?.get(PageResponseHeader.xTotalPages) || '')

  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content>
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Keys and Tokens
        </Text>
        <Spacer size={6} />
        <form>
          <FormFieldSet.Root>
            {/* PERSONAL ACCESS TOKEN */}
            <FormFieldSet.Legend>
              <span className="flex justify-between">
                Personal access token
                <Button type="button" variant="outline" className="text-primary" onClick={openTokenDialog}>
                  Add new token
                </Button>
              </span>
            </FormFieldSet.Legend>
            <FormFieldSet.ControlGroup>
              <>
                {(!error || error.type !== 'tokenFetch') && (
                  <ProfileTokensList tokens={tokens} openAlertDeleteDialog={openAlertDeleteDialog} />
                )}
                {error && error.type === 'tokenFetch' && (
                  <>
                    <Spacer size={2} />
                    <Text size={1} className="text-destructive">
                      {error.message}
                    </Text>
                  </>
                )}
              </>
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
          <FormFieldSet.Root>
            <FormFieldSet.Separator />
          </FormFieldSet.Root>
          <FormFieldSet.Root>
            {/* PERSONAL ACCESS TOKEN */}
            <FormFieldSet.Legend>My SSH keys</FormFieldSet.Legend>
            <FormFieldSet.SubLegend>
              <span className="flex justify-between">
                SSH keys allow you to establish a secure connection to your code repository.
                <Button variant="outline" className="text-primary" type="button" onClick={openSshKeyDialog}>
                  Add new SSH key
                </Button>
              </span>
            </FormFieldSet.SubLegend>
            <FormFieldSet.ControlGroup>
              <>
                {(!error || error.type !== 'keyFetch') && (
                  <>
                    <ProfileKeysList publicKeys={publicKeys} openAlertDeleteDialog={openAlertDeleteDialog} />
                    <PaginationComponent
                      totalPages={totalPages}
                      currentPage={page}
                      goToPage={(pageNum: number) => setPage(pageNum)}
                    />
                  </>
                )}
                {error && error.type === 'keyFetch' && (
                  <>
                    <Spacer size={2} />
                    <Text size={1} className="text-destructive">
                      {error.message}
                    </Text>
                  </>
                )}
              </>
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
        </form>
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsAccountKeysPage }
