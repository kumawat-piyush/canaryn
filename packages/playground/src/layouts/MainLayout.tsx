import React from 'react'
import { Outlet } from 'react-router-dom'

// This is empty container with padding 64px without header: could using in create respository page and repository list page

const MainLayout: React.FC = () => {
  return (
    <main className="h-screen w-4/5 pt-0 flex-grow">
      <Outlet />
    </main>
  )
}

export default MainLayout
