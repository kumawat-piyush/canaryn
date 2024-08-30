import React, { useState } from 'react'
import CommitsList from '../components/commits-list'
import SkeletonList from '../components/loaders/skeleton-list'
import NoData from '../components/no-data'
import PlaygroundCommitsSettings from '../components/playground/commits-settings'
import PaddingListLayout from '../layouts/PaddingListLayout'
import { ListActions, SearchBox, Spacer } from '@harnessio/canary'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]

export default function CommitsListPage() {
  const [loadState, setLoadState] = useState('loading')

  const renderContent = () => {
    switch (loadState) {
      case 'data-loaded':
        return <CommitsList />
      case 'loading':
        return <SkeletonList />

      default:
        return null
    }
  }

  if (loadState == 'no-data') {
    return (
      <>
        <NoData iconName="no-data-folder" title="No commits yet" description={['There are no commits yet.']} />
        <PlaygroundCommitsSettings loadState={loadState} setLoadState={setLoadState} />
      </>
    )
  }
  return (
    <PaddingListLayout spaceTop={false}>
      <ListActions.Root>
        <ListActions.Left>
          <SearchBox.Root placeholder="Search" />
        </ListActions.Left>
        <ListActions.Right>
          <ListActions.Dropdown title="Filter" items={filterOptions} />
          <ListActions.Dropdown title="Sort" items={sortOptions} />
        </ListActions.Right>
      </ListActions.Root>
      <Spacer size={5} />
      {renderContent()}
      <PlaygroundCommitsSettings loadState={loadState} setLoadState={setLoadState} />
    </PaddingListLayout>
  )
}
