import { SandboxSettingsAccountKeysPage } from './profile-settings-keys-page'
import { useState, useEffect } from 'react'
import {
  useListPublicKeyQuery,
  ListPublicKeyQueryQueryParams,
  ListPublicKeyOkResponse,
  useCreateTokenMutation,
  CreateTokenOkResponse,
  CreateTokenErrorResponse,
  CreateTokenRequestBody,
  useCreatePublicKeyMutation,
  CreatePublicKeyRequestBody,
  CreatePublicKeyOkResponse,
  CreatePublicKeyErrorResponse
  // ListPublicKeyErrorResponse
} from '@harnessio/code-service-client'
import { TokenCreateDialog } from './token-create/token-create-dialog'
import { SshKeyCreateDialog } from './ssh-key-create/ssh-key-create-dialog'
import { TokenSuccessDialog } from './token-create/token-success-dialog'
import { TokensList } from '@harnessio/playground'
// import { useQueryClient } from '@tanstack/react-query'

export const SettingsProfileKeysPage = () => {
  // const queryClient = useQueryClient()

  const TEMP_USER_TOKENS_API_PATH = '/api/v1/user/tokens'

  const [publicKeys, setPublicKeys] = useState<ListPublicKeyOkResponse>([])
  const [tokens, setTokens] = useState<TokensList[]>([])

  const [openCreateTokenDialog, setCreateTokenDialog] = useState(false)
  const [openSuccessTokenDialog, setSuccessTokenDialog] = useState(false)
  const closeSuccessTokenDialog = () => setSuccessTokenDialog(false)

  const openTokenDialog = () => setCreateTokenDialog(true)
  const closeTokenDialog = () => setCreateTokenDialog(false)

  const [createdTokenData, setCreatedTokenData] = useState<{
    identifier: string
    lifetime: string
    token: string
  } | null>(null)

  const [saveSshKeyDialog, setSshKeyDialog] = useState(false)
  const openSshKeyDialog = () => setSshKeyDialog(true)
  const closeSshKeyDialog = () => setSshKeyDialog(false)

  const queryParams: ListPublicKeyQueryQueryParams = {
    page: 1,
    limit: 30,
    sort: 'created',
    order: 'asc'
  }

  useListPublicKeyQuery(
    { queryParams },
    {
      onSuccess: (data: ListPublicKeyOkResponse) => {
        setPublicKeys(data)
      }
      // onError: (error: ListPublicKeyErrorResponse) => {
      //   const message = error.message || 'An unknown error occurred.'
      //   console.log(message)
      // }
    }
  )

  const fetchTokens = () => {
    fetch(TEMP_USER_TOKENS_API_PATH)
      .then(resp => resp.json())
      .then(res => setTokens(res))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchTokens()
  }, [])

  const createTokenMutation = useCreateTokenMutation(
    { body: {} },
    {
      onSuccess: (newToken: CreateTokenOkResponse) => {
        // console.log(newToken)
        const tokenData = {
          identifier: newToken.token.identifier,
          lifetime: new Date(newToken.token.expires_at).toLocaleDateString(),
          token: newToken.access_token
        }

        closeTokenDialog()
        setCreatedTokenData(tokenData)
        setSuccessTokenDialog(true)
        fetchTokens()
      },
      onError: (error: CreateTokenErrorResponse) => {
        console.error('Failed to create token:', error)
      }
    }
  )

  const createSshKeyMutation = useCreatePublicKeyMutation(
    { body: {} },
    {
      onSuccess: (newSshKey: CreatePublicKeyOkResponse) => {
        console.log(newSshKey)
        closeSshKeyDialog()
        setPublicKeys(prevKeys => [...prevKeys, newSshKey])
      },
      onError: (error: CreatePublicKeyErrorResponse) => {
        console.error('Failed to create :', error)
      }
    }
  )

  const handleCreateToken = (tokenData: { identifier: string; lifetime: string }) => {
    let body: CreateTokenRequestBody = {
      identifier: tokenData.identifier
    }

    if (tokenData.lifetime.toLowerCase() !== 'never') {
      const convertedLifetime = parseInt(tokenData.lifetime, 10) * 24 * 60 * 60 * 1000 * 1000000
      body.lifetime = convertedLifetime
    }

    createTokenMutation.mutate({ body })
  }

  const handleCreateSshKey = (sshKeyData: { content: string; identifier: string }) => {
    const body: CreatePublicKeyRequestBody = {
      content: sshKeyData.content,
      identifier: sshKeyData.identifier,
      usage: 'auth'
    }

    createSshKeyMutation.mutate({ body })
  }
  return (
    <>
      <SandboxSettingsAccountKeysPage
        publicKeys={publicKeys}
        tokens={tokens}
        openTokenDialog={openTokenDialog}
        openSshKeyDialog={openSshKeyDialog}
      />
      <TokenCreateDialog
        open={openCreateTokenDialog}
        onClose={closeTokenDialog}
        handleCreateToken={handleCreateToken}
      />
      <SshKeyCreateDialog open={saveSshKeyDialog} onClose={closeSshKeyDialog} handleCreateSshKey={handleCreateSshKey} />
      {createdTokenData && (
        <TokenSuccessDialog
          open={openSuccessTokenDialog}
          onClose={closeSuccessTokenDialog}
          tokenData={createdTokenData}
        />
      )}
    </>
  )
}
