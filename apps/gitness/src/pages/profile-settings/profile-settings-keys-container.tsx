import { SandboxSettingsAccountKeysPage } from './profile-settings-keys-page'
import { useState, useEffect } from 'react'
import {
  useListPublicKeyQuery,
  ListPublicKeyQueryQueryParams,
  ListPublicKeyOkResponse,
  useCreateTokenMutation,
  CreateTokenOkResponse,
  CreateTokenErrorResponse,
  CreateTokenRequestBody

  // ListPublicKeyErrorResponse
} from '@harnessio/code-service-client'
import { TokenCreateDialog } from './token-create/token-create-dialog'
import { TokensList } from '@harnessio/playground'

export const SettingsProfileKeysPage = () => {
  const TEMP_USER_TOKENS_API_PATH = '/api/v1/user/tokens'

  const [publicKeys, setPublicKeys] = useState<ListPublicKeyOkResponse[]>([])
  const [tokens, setTokens] = useState<TokensList[]>([])

  const [openCreateTokenDialog, setCreateTokenDialog] = useState(false)
  const openTokenDialog = () => setCreateTokenDialog(true)
  const closeTokenDialog = () => setCreateTokenDialog(false)

  const queryParams: ListPublicKeyQueryQueryParams = {
    page: 1,
    limit: 30,
    sort: 'created',
    order: 'asc'
  }

  useListPublicKeyQuery(
    { queryParams },
    {
      onSuccess: (data: ListPublicKeyOkResponse[]) => {
        setPublicKeys(data)
      }
      // onError: (error: ListPublicKeyErrorResponse) => {
      //   const message = error.message || 'An unknown error occurred.'
      //   console.log(message)
      // }
    }
  )

  useEffect(() => {
    fetch(TEMP_USER_TOKENS_API_PATH)
      .then(resp => resp.json())
      .then(res => setTokens(res))
    // .catch(err => console.log(err))
  }, [])

  const createTokenMutation = useCreateTokenMutation(
    { body: {} },
    {
      onSuccess: (newToken: CreateTokenOkResponse) => {
        // Add the newly created token to the list of tokens
        // setTokens(prevTokens => [...prevTokens, newToken])
        console.log(newToken)
        closeTokenDialog()
      },
      onError: (error: CreateTokenErrorResponse) => {
        console.error('Failed to create token:', error)
      }
    }
  )

  const handleCreateToken = (tokenData: { identifier: string; lifetime: string }) => {
    const convertedLifetime = parseInt(tokenData.lifetime, 10) * 24 * 60 * 60 * 1000
    const body: CreateTokenRequestBody = {
      identifier: tokenData.identifier,
      lifetime: convertedLifetime
    }
    createTokenMutation.mutate({ body })
  }

  return (
    <>
      <SandboxSettingsAccountKeysPage publicKeys={publicKeys} tokens={tokens} openTokenDialog={openTokenDialog} />
      <TokenCreateDialog
        open={openCreateTokenDialog}
        onClose={closeTokenDialog}
        handleCreateToken={handleCreateToken}
      />
    </>
  )
}
