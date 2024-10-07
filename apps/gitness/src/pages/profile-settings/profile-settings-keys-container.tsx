import { SandboxSettingsAccountKeysPage } from './profile-settings-keys-page'
import { useState } from 'react'
import React from 'react'
import {
  useListPublicKeyQuery,
  ListPublicKeyQueryQueryParams,
  ListPublicKeyOkResponse,
  ListPublicKeyErrorResponse
} from '@harnessio/code-service-client'

export const SettingsProfileKeysPage = () => {
  const [publicKeys, setPublicKeys] = useState<ListPublicKeyOkResponse[]>([])

  const [apiError, setApiError] = useState<{ type: 'keys' | 'tokens'; message: string } | null>(null)

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
        console.log(data)
        setPublicKeys(data)
        setApiError(null)
      },
      onError: (error: ListPublicKeyErrorResponse) => {
        const message = error.message || 'An unknown error occurred.'
        setApiError({ type: 'keys', message })
      }
    }
  )

  return <SandboxSettingsAccountKeysPage publicKeys={publicKeys} />
}
