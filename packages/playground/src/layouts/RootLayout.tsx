// RootLayout.tsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/navbar'

const RootLayout: React.FC = () => {
  return (
    <div className="bg-background flex">
      <Nav />
      <main style={{ flexGrow: 1, padding: '0px' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
