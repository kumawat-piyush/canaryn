import React, { useState } from 'react'
import Home from '../components/home'
import PlaygroundHomeSettings from '../settings/home-settings'

export default function HomeListPage() {
  const [loadState, setLoadState] = useState('home-unauth')

  const renderContent = () => {
    switch (loadState) {
      case 'home-auth':
        return <Home />
      case 'home-unauth':
        return <Home />
      case 'sign-in':
        return <Home />
      case 'sign-up':
        return <Home />
      default:
        return null
    }
  }

  return (
    <>
      {renderContent()}
      <PlaygroundHomeSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}
