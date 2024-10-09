import React from 'react'
import { useParams } from 'react-router-dom'
import { RootLayout as _RootLayout } from '@harnessio/playground'
import { PathParams } from '../RouteDefinitions'
import { useAppContext } from '../framework/context/AppContext'

/**
 * Need this wrapper component around RootLayout to be able to access url params, user info from context etc.
 */
export const RootLayout: React.FC = () => {
  const { currentUser } = useAppContext()
  const { spaceId } = useParams<PathParams>()
  return <_RootLayout projectId={spaceId} isAdmin={currentUser?.admin} username={currentUser?.display_name ?? ''} />
}
