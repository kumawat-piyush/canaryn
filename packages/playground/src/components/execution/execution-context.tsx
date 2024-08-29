// this component is to prevent props drilling and pass the value to the children
import React, { createContext, ReactNode, useContext } from 'react'

type Value = string | { [key: string]: string | unknown }
type TableVal = string

export type KeyValuePair = { name: string; value: Value | Value[] }
export type TableTitleKeyPair = { name: string; value: TableVal }

export interface ExecutionContextType {
  value: KeyValuePair[]
}

export const ExecutionContext = createContext<ExecutionContextType | undefined>(undefined)

interface ExecutionContextProviderProps {
  children: ReactNode
  value: ExecutionContextType['value']
}

export const ExecutionContextProvider: React.FC<ExecutionContextProviderProps> = ({ children, value }) => {
  return <ExecutionContext.Provider value={{ value }}>{children}</ExecutionContext.Provider>
}

// Custom hook for using the context
export const useExecutionContext = () => {
  const context = useContext(ExecutionContext)
  if (!context) {
    throw new Error('useExecutionContext must be used within an ExecutionContextProvider')
  }
  return context
}
