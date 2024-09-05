import React, { useState } from 'react'
import {
  Spacer,
  ListActions,
  ListPagination,
  Button,
  SearchBox,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  Text,
  Icon,
  ButtonGroup
} from '@harnessio/canary'
import { Summary } from '../components/repo-summary'
import NoData from '../components/no-data'
import NoSearchResults from '../components/no-search-results'
import SkeletonList from '../components/loaders/skeleton-list'
import PlaygroundListSettings from '../settings/list-settings'
import FullWidth2ColumnLayout from '../layouts/FullWidth2ColumnLayout'
import PaddingListLayout from '../layouts/PaddingListLayout'

const mockFiles = [
  {
    id: '0',
    name: 'public',
    type: 'folder',
    lastCommitMessage: 'removing duplicated metrics for servers and swapping to pattern mathematics ',
    timestamp: '2 hours ago'
  },
  {
    id: '1',
    name: 'files',
    type: 'folder',
    lastCommitMessage: 'removing duplicated metrics for servers and swapping to pattern mathematics ',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    name: 'src',
    type: 'folder',
    lastCommitMessage: 'removing duplicated metrics for servers and swapping to pattern mathematics ',
    timestamp: '2 hours ago'
  }
]

function RepoSummaryPage() {
  const [loadState, setLoadState] = useState('data-loaded')

  const renderListContent = () => {
    switch (loadState) {
      case 'data-loaded':
        return <Summary files={mockFiles} />
      case 'loading':
        return <SkeletonList />
      case 'no-search-matches':
        return (
          <NoSearchResults
            iconName="no-search-magnifying-glass"
            title="No search results"
            description={['Check your spelling and filter options,', 'or search for a different keyword.']}
            primaryButton={{ label: 'Clear search' }}
            secondaryButton={{ label: 'Clear filters' }}
          />
        )
      default:
        return null
    }
  }

  if (loadState == 'no-data') {
    return (
      <>
        <NoData
          insideTabView
          iconName="no-data-folder"
          title="No pipelines yet"
          description={['There are no files in this repository yet.', 'Create new or import an existing file.']}
          primaryButton={{ label: 'Create file' }}
          secondaryButton={{ label: 'Import file' }}
        />
        <PlaygroundListSettings loadState={loadState} setLoadState={setLoadState} />
      </>
    )
  }

  return (
    <PaddingListLayout spaceTop={false}>
      <FullWidth2ColumnLayout
        leftColumn={
          <>
            <ListActions.Root>
              <ListActions.Left>
                <ButtonGroup.Root>
                  <Button variant="secondary">
                    <Icon name="merged" size={1} />
                    &nbsp;&nbsp;main&nbsp;&nbsp;
                    <Icon name="chevron-down" size={11} />
                  </Button>
                  <SearchBox.Root placeholder="Search" />
                </ButtonGroup.Root>
              </ListActions.Left>
              <ListActions.Right>
                <ButtonGroup.Root>
                  <Button variant="outline">
                    Add file&nbsp;&nbsp;
                    <Icon name="chevron-down" size={11} />
                  </Button>
                  <Button variant="default">Clone repository</Button>
                </ButtonGroup.Root>
              </ListActions.Right>
            </ListActions.Root>
            <Spacer size={5} />
            {renderListContent()}
            <Spacer size={8} />
            {loadState == 'data-loaded' && (
              <ListPagination.Root>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious size="sm" href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink isActive size="sm_icon" href="#">
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink size="sm_icon" href="#">
                        2
                      </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationLink size="sm_icon" href="#">
                        <PaginationEllipsis />
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink size="sm_icon" href="#">
                        4
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink size="sm_icon" href="#">
                        5
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext size="sm" href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </ListPagination.Root>
            )}
          </>
        }
        rightColumn={
          <div className="flex flex-col">
            <Text size={4} weight={'medium'}>
              Summary
            </Text>
            <Spacer size={2} />
            <Text size={2} color={'tertiaryBackground'}>
              Created May 6th, 2024
            </Text>
          </div>
        }
      />
      <PlaygroundListSettings loadState={loadState} setLoadState={setLoadState} />
    </PaddingListLayout>
  )
}

export default RepoSummaryPage
