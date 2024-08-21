// RootLayout.tsx
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import MainLayout from './MainLayout'

const RootLayout: React.FC = () => {
  const location = useLocation()
  const hideNavbarPaths = ['/signin', '/signup']

  const showNavbar = !hideNavbarPaths.includes(location.pathname)

  return (
    <div className="bg-background flex">
      {showNavbar && (
        <nav style={{ height: '100vh' }} className="bg-black w-[220px] p-5">
          <ul>
            <li>
              <NavLink to="/repos" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
                Repositories
              </NavLink>
            </li>
            <li>
              <NavLink to="/pipelines" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
                Pipelines
              </NavLink>
            </li>
            <li>
              <NavLink to="/executions" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
                Executions
              </NavLink>
            </li>
            <hr style={{ marginTop: '20px', marginBottom: '20px' }} />
            <li>
              <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/signin" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
                Sign in
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
                Sign up
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      <MainLayout />
    </div>
  )
}

export default RootLayout

//since I would like refactor it, so I would like to see how joe did in the nav tabs
//
