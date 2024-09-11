import React from 'react'
import { Spacer, Text } from '@harnessio/canary'
import Floating1ColumnLayout from '../layouts/Floating1ColumnLayout'

export function CreatePipelinePage() {
  return (
    <Floating1ColumnLayout>
      <Spacer size={12} />
      <Text as="p" size={6} weight="medium">
        Create your pipeline
      </Text>
    </Floating1ColumnLayout>
  )
}
