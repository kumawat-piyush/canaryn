import React, { useState } from 'react'
import Home from '../components/home'
import PlaygroundLandingSettings from '../settings/landing-settings'
import Signin from '../components/signin'
import Signup from '../components/signup'

export default function LandingPage() {
  const [loadState, setLoadState] = useState('home-unauth')

  const renderContent = () => {
    switch (loadState) {
      case 'home-auth':
        return <Home isAuthed />
      case 'home-unauth':
        return <Home isAuthed={false} />
      case 'sign-in':
        return <Signin />
      case 'sign-up':
        return <Signup />
      default:
        return null
    }
  }

  return (
    <>
      {renderContent()}
      <PlaygroundLandingSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}
