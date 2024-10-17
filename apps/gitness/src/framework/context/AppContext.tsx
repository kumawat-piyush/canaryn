import React, { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react'
import { noop } from 'lodash-es'
import { CodeServiceAPIClient, TypesSpace, TypesUser } from '@harnessio/code-service-client'

interface AppContextType {
  spaces: TypesSpace[]
  setSpaces: React.Dispatch<React.SetStateAction<TypesSpace[]>>
  addSpaces: (newSpaces: TypesSpace[]) => void
  resetApp: () => void
  currentUser?: TypesUser
  setCurrentUser: React.Dispatch<React.SetStateAction<TypesUser | undefined>>
}

const BASE_URL_PREFIX = `${window.apiUrl || ''}/api/v1`

const AppContext = createContext<AppContextType>({
  spaces: [],
  setSpaces: noop,
  addSpaces: noop,
  resetApp: noop,
  currentUser: undefined,
  setCurrentUser: noop
})

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [spaces, setSpaces] = useState<TypesSpace[]>([])
  const [currentUser, setCurrentUser] = useState<TypesUser | undefined>(undefined)

  useLayoutEffect(() => {
    new CodeServiceAPIClient({
      urlInterceptor: (url: string) => `${BASE_URL_PREFIX}${url}`,
      responseInterceptor: (response: Response) => {
        switch (response.status) {
          case 401:
            resetApp()
            window.location.href = '/signin'
            break
        }
        return response
      }
    })
  }, [])

  const resetApp = (): void => {
    setSpaces([])
    setCurrentUser({})
  }

  const addSpaces = (newSpaces: TypesSpace[]): void => {
    setSpaces(prevSpaces => [...(prevSpaces || []), ...newSpaces])
  }

  return (
    <AppContext.Provider
      value={{
        spaces,
        setSpaces,
        addSpaces,
        resetApp,
        currentUser,
        setCurrentUser
      }}>
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
