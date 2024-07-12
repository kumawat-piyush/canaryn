import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import RouteDestinations from './RouteDestinations'
import { routes } from './RouteDefinitions'

const AppRouter: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to={routes.toSignIn()}>Sign In</Link>
          </li>
          <li>
            <Link to={routes.toSignUp()}>Sign Up</Link>
          </li>
        </ul>
      </nav>
      <RouteDestinations />
    </Router>
  )
}

export default AppRouter
