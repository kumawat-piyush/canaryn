import React from 'react'

interface MainContainerProps {
  children: React.ReactNode
}

// This is empty container with padding without header
const MainEmptyLayout: React.FC<MainContainerProps> = ({ children }) => {
  return <div className="container">{children}</div>
}

export default MainEmptyLayout
