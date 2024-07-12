import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RouteDestinations from './RouteDestinations'

const App: React.FC = () => {
  return (
    <Router>
      <RouteDestinations />
    </Router>
  )
}

export default App
