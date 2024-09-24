import React, { createContext, useContext, useState, ReactNode } from 'react'
import {
  CodeServiceAPIClient,
  MembershipSpacesOkResponse,
  TypesMembershipSpace,
  membershipSpaces,
  TypesSpace
} from '@harnessio/code-service-client'

interface AppContextType {
  selectedSpace: string
  setSelectedSpace: (space: string) => void
  spaces: TypesMembershipSpace[]
  setSpaces: (spaces: TypesMembershipSpace[]) => void
  addSpaces: (newSpaces: TypesSpace[]) => void
}

const BASE_URL_PREFIX = '/api/v1'

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSpace, setSelectedSpace] = useState<string>('')
  const [spaces, setSpaces] = useState<TypesMembershipSpace[]>([])

  React.useEffect(() => {
    new CodeServiceAPIClient({
      urlInterceptor: (url: string) => `${BASE_URL_PREFIX}${url}`,
      requestInterceptor: (request: Request): Request => {
        // Retrieve the token from storage and add to headers if available
        const token = localStorage.getItem('token')
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
            localStorage.removeItem('token')
            window.location.href = '/signin'
        }
        return response
      }
    })
    membershipSpaces({
      queryParams: { page: 1, limit: 10, sort: 'created', order: 'asc' }
    }).then((response: MembershipSpacesOkResponse) => {
      setSpaces(response)
      if (response?.[0]?.space?.path) {
        setSelectedSpace(response[0].space.path)
      }
    })
  }, [])

  const addSpaces = (newSpaces: TypesSpace[]) => {
    setSpaces(prevSpaces => [...prevSpaces, ...newSpaces])
  }

  return (
    <AppContext.Provider value={{ selectedSpace, setSelectedSpace, spaces, setSpaces, addSpaces }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
