// this component is to prevent props drilling and pass the value to the children
import React, { createContext, ReactNode, useContext } from 'react'

export interface ExecutionContextType {
  value: unknown
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
