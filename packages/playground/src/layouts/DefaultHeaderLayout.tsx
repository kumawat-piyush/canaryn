import React, { ReactNode } from 'react'

interface DefaultHeaderProps {
  children: ReactNode
}

// This is empty container with padding without header
const DefaultHeaderLayout: React.FC<DefaultHeaderProps> = ({ children }) => {
  return <div className="p-5 h-16">{children}</div>
}

export default DefaultHeaderLayout
