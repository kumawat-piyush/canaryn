import React from 'react'
import { useRoutes } from 'react-router-dom'
import SignIn from './pages/Signin/Signin'
import SignUp from './pages/Signup/Signup'
import { routes } from './RouteDefinitions'

const RouteDestinations: React.FC = () => {
  const element = useRoutes([
    { path: routes.toSignIn(), element: <SignIn /> },
    { path: routes.toSignUp(), element: <SignUp /> }
  ])
  return element
}

export default RouteDestinations
