import { useState } from 'react'
import { SandboxSettingsAccountGeneralPage } from '@harnessio/playground'
import React from 'react'
import {
  useAdminListUsersQuery,
  AdminListUsersProps,
  AdminListUsersOkResponse,
  AdminListUsersErrorResponse,
  useAdminUpdateUserMutation,
  AdminUpdateUserRequestBody,
  AdminUpdateUserOkResponse,
  AdminUpdateUserErrorResponse
} from '@harnessio/code-service-client'

export const SettingsAccountGeneralPage: React.FC = () => {
  const [apiError, setApiError] = useState<string | null>(null)
  const [userData, setUserData] = useState<{ name: string; username: string; email: string }>({
    name: '',
    username: '',
    email: ''
  })

  const queryParams: AdminListUsersProps['queryParams'] = {
    sort: 'created',
    order: 'desc',
    page: 1,
    limit: 30
  }

  useAdminListUsersQuery(
    { queryParams },
    {
      onSuccess: (data: AdminListUsersOkResponse) => {
        if (data && data.length > 0) {
          const user = data[0]
          setUserData({
            name: user.display_name || '',
            username: user.uid || '',
            email: user.email || ''
          })
        }
      },
      onError: (error: AdminListUsersErrorResponse) => {
        const message = error.message || 'An unknown error occurred.'
        setApiError(message)
      }
    }
  )

  const updateUserMutation = useAdminUpdateUserMutation(
    {},
    {
      onSuccess: data => {
        // Update local state with the new user data
        setUserData({
          name: data.display_name || '',
          username: data.uid || '',
          email: data.email || ''
        })
      },
      onError: error => {
        setApiError(error.message || 'An error occurred while updating the user.')
      }
    }
  )

  const handleUpdateUser = (updatedData: { name: string; email: string }) => {
    updateUserMutation.mutate({
      user_uid: userData.username,
      body: {
        display_name: updatedData.name,
        email: updatedData.email
      }
    })
  }

  return (
    <SandboxSettingsAccountGeneralPage
      userData={userData}
      isLoading={useAdminListUsersQuery.isLoading}
      error={apiError}
      onUpdateUser={handleUpdateUser}
    />
  )
}
