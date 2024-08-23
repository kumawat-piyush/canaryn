import { Spacer, SpotlightsBG, Text } from '@harnessio/canary'
import React from 'react'

export default function Home() {
  return (
    // <div>
    //   <p className="text-destructive">Home page</p>
    //   <Badge>Badge</Badge>
    //   <Icon name="chevron-down" />
    // </div>
    <div className="w-full h-full">
      <SpotlightsBG.Root>
        <SpotlightsBG.Content>
          <Text size={6} weight={'medium'} align="center" className="text-primary">
            Canary Playground
          </Text>
          <Spacer size={2} />
          <Text size={3} weight={'normal'} align="center" className="text-tertiary-background">
            The next generation of design at Harness
          </Text>
        </SpotlightsBG.Content>
      </SpotlightsBG.Root>
    </div>
  )
}
