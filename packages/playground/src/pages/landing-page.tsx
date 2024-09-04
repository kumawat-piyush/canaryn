import React, { useState } from 'react'
import Home from '../components/home'
import PlaygroundLandingSettings from '../settings/landing-settings'
import Signin from '../components/signin'
import Signup from '../components/signup'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const [loadState, setLoadState] = useState('home-auth')
  const navigate = useNavigate()

  const handleSelectProject = () => {
    navigate('/repos')
  }

  const handleSignUp = () => {
    setLoadState('sign-up')
  }

  const handleSignIn = () => {
    setLoadState('sign-in')
  }

  const renderContent = () => {
    switch (loadState) {
      case 'home-auth':
        return <Home isAuthed onSelectProject={handleSelectProject} />
      case 'home-unauth':
        return <Home isAuthed={false} handleSignUp={handleSignUp} handleSignIn={handleSignIn} />
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
