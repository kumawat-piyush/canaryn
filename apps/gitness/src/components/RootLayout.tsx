import React from 'react'
import { useParams } from 'react-router-dom'
import { RootLayout as _RootLayout } from '@harnessio/playground'
import { PathParams } from '../RouteDefinitions'

/**
 * Need this wrapper component around RootLayout to be able to access url params
 */
export const RootLayout: React.FC = () => {
  const { spaceId } = useParams<PathParams>()
  return <_RootLayout projectId={spaceId} />
}
