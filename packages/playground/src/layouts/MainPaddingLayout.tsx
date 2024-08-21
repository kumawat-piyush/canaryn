import React from 'react'

interface MainContainerProps {
  children: React.ReactNode
}

// This is empty container with padding 64px without header: could using in create respository page and repository list page

const MainEmptyLayout: React.FC<MainContainerProps> = ({ children }) => {
  return <div className="container pt-16 mx-auto">{children}</div>
}

export default MainEmptyLayout
