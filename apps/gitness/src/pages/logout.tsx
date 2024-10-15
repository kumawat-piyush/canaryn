import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useToken from '../framework/hooks/useToken'
import { Button } from '@harnessio/canary'

export const Logout: React.FC = () => {
  const navigate = useNavigate()
  const { removeToken } = useToken()

  const handleLogout = () => {
    removeToken() // Remove the token when the user logs out
    navigate('/signin') // Redirect to sign-in page
  }
  return (
    <Button theme="error" type="button" /*variant={'destructive'}*/ size="sm" onClick={handleLogout}>
      Log Out
    </Button>
  )
}
