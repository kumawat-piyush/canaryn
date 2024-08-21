import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

interface DefaultHeaderProps {
  children: ReactNode
}

// This is header layout including h1 tag
const DefaultHeaderLayout: React.FC<DefaultHeaderProps> = () => {
  return (
    <div className="grid w-auto md:p-5 md:h-16">
      <Outlet />
    </div>
  )
}

export default DefaultHeaderLayout

//what elements includes in the defaultheader, including main outlet.
