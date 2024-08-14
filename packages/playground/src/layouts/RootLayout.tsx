// RootLayout.tsx
import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import Navbar from '../components/navbar'
import { ModeToggle } from '../components/mode-toggle'

const RootLayout: React.FC = () => {
  const location = useLocation()
  const hideNavbarPaths = ['/signin', '/signup']

  const showNavbar = !hideNavbarPaths.includes(location.pathname)

  return (
    <div className="bg-background flex">
      {showNavbar && (
        // <nav style={{ height: '100vh' }} className="bg-black w-[220px] p-5">
        //   <ul>
        //     <li>
        //       <NavLink to="/repos" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
        //         Repositories
        //       </NavLink>
        //     </li>
        //     <li>
        //       <NavLink to="/pipelines" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
        //         Pipelines
        //       </NavLink>
        //     </li>
        //     <li>
        //       <NavLink to="/executions" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
        //         Executions
        //       </NavLink>
        //     </li>
        //     <hr style={{ marginTop: '20px', marginBottom: '20px' }} />
        //     <li>
        //       <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
        //         Home
        //       </NavLink>
        //     </li>
        //     <li>
        //       <NavLink to="/signin" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
        //         Sign in
        //       </NavLink>
        //     </li>
        //     <li>
        //       <NavLink to="/sign up" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
        //         Sign up
        //       </NavLink>
        //     </li>
        //   </ul>
        //   <Navbar.Root>
        //     <Navbar.Header>
        //       <p>Header</p>
        //     </Navbar.Header>
        //     <Navbar.Content>
        //       <Navbar.Group>
        //         <Navbar.Item text="Nav option 1" />
        //         <Navbar.Item text="Nav option 2" />
        //         <Navbar.Item text="Nav option 3" />
        //         <Navbar.Item text="Nav option 4" />
        //       </Navbar.Group>
        //       <Navbar.AccordionGroup title="Pinned">
        //         <Navbar.Item text="Nav option 5" />
        //       </Navbar.AccordionGroup>
        //     </Navbar.Content>
        //     <Navbar.Footer>
        //       <p>Footer</p>
        //     </Navbar.Footer>
        //   </Navbar.Root>
        // </nav>
        <Navbar.Root>
          <Navbar.Header>
            <p>Header</p>
          </Navbar.Header>
          <Navbar.Content>
            <Navbar.Group>
              <Navbar.Item to="/repos" text="Repositories" />
              <Navbar.Item to="/pipelines" text="Pipelines" />
              <Navbar.Item to="/executions" text="Executions" />
            </Navbar.Group>
            <Navbar.AccordionGroup title="Pinned">
              <Navbar.Item to="/test" text="Test" />
            </Navbar.AccordionGroup>
          </Navbar.Content>
          <Navbar.Footer>
            <ModeToggle />
          </Navbar.Footer>
        </Navbar.Root>
      )}
      <main style={{ flexGrow: 1, padding: '0px' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
