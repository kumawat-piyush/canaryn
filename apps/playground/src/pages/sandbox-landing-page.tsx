import React from 'react'
import LandingPage from './landing-page'
import { SandboxLayout } from '@harnessio/fragments'

function SandboxLandingPage() {
  return (
    <SandboxLayout.Main fullWidth hasLeftPanel>
      <LandingPage />
    </SandboxLayout.Main>
  )
}

export { SandboxLandingPage }
