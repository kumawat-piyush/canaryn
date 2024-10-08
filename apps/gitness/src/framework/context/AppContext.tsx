import React, { createContext, useContext, useState, ReactNode, useEffect, useLayoutEffect } from 'react'
import {
  CodeServiceAPIClient,
  TypesMembershipSpace,
  membershipSpaces,
  TypesSpace,
  TypesUser,
  getUser
} from '@harnessio/code-service-client'
import useToken from '../hooks/useToken'
import { useAtom } from 'jotai'
import { currentUserAtom } from './currentUser'

interface AppContextType {
  spaces: TypesMembershipSpace[]
  setSpaces: (spaces: TypesMembershipSpace[]) => void
  addSpaces: (newSpaces: TypesSpace[]) => void
  currentUser?: TypesUser
}

const BASE_URL_PREFIX = '/api/v1'

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [spaces, setSpaces] = useState<TypesMembershipSpace[]>([])
  const { token } = useToken()
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom)

  useLayoutEffect(() => {
    new CodeServiceAPIClient({
      urlInterceptor: (url: string) => `${BASE_URL_PREFIX}${url}`,
      requestInterceptor: (request: Request): Request => {
        if (token) {
          const newRequest = request.clone()
          newRequest.headers.set('Authorization', `Bearer ${token}`)
          return newRequest
        }
        return request
      },
      responseInterceptor: (response: Response) => {
        switch (response.status) {
          case 401:
            window.location.href = '/logout'
        }
        return response
      }
    })
    membershipSpaces({
      queryParams: { page: 1, limit: 10, sort: 'identifier', order: 'asc' }
    }).then(response => {
      setSpaces(response)
    })
    getUser({}).then(_currentUser => {
      setCurrentUser(_currentUser)
    })
  }, [])

  useEffect(() => {
    if (token) {
      membershipSpaces({
        queryParams: { page: 1, limit: 10, sort: 'identifier', order: 'asc' }
      }).then(response => {
        setSpaces(response)
      })
    }
  }, [token])

  const addSpaces = (newSpaces: TypesSpace[]) => {
    setSpaces(prevSpaces => [...prevSpaces, ...newSpaces])
  }

  useEffect(() => {
    // Fetch current user when conditions to fetch it matched and
    //  - cache does not exist yet
    if (
      !currentUser
      // && !initialValue.isCurrentSessionPublic TODO: add currentsession is public
    ) {
      getUser({})
    }
  }, [getUser, currentUser])

  return <AppContext.Provider value={{ spaces, setSpaces, addSpaces, currentUser }}>{children}</AppContext.Provider>
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
