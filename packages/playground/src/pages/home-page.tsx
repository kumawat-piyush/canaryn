import React, { useState } from 'react'
import Home from '../components/home'
import SkeletonList from '../components/loaders/skeleton-list'
import NoData from '../components/no-data'
import PlaygroundHomeSettings from '../settings/home-settings'

export default function HomeListPage() {
  const [loadState, setLoadState] = useState('data-loaded')

  const renderContent = () => {
    switch (loadState) {
      case 'data-loaded':
        return <Home />
      case 'loading':
        return <SkeletonList />

      default:
        return null
    }
  }

  if (loadState == 'no-data') {
    return (
      <>
        <NoData iconName="no-data-folder" title="No Home yet" description={['There are no Home yet.']} />
        <PlaygroundHomeSettings loadState={loadState} setLoadState={setLoadState} />
      </>
    )
  }
  return (
    <>
      {renderContent()}
      <PlaygroundHomeSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}
