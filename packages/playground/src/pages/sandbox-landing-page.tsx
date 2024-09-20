import React from 'react'
import { SandboxLayout } from '../index'
import LandingPage from './landing-page'

function SandboxLandingPage() {
  return (
    <SandboxLayout.Content fullWidth hasLeftPanel>
      <LandingPage />
    </SandboxLayout.Content>
  )
}

export { SandboxLandingPage }
