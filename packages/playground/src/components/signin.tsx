import { SpotlightsBG, Text } from '@harnessio/canary'
import React from 'react'

export default function Signin() {
  return (
    <SpotlightsBG.Root>
      <SpotlightsBG.Content>
        <Text size={6} weight="medium" align="center" color="primary">
          Sign in
        </Text>
      </SpotlightsBG.Content>
    </SpotlightsBG.Root>
  )
}
