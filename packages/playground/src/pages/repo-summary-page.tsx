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
import PaddingListLayout from '../layouts/PaddingListLayout'
import NoData from '../components/no-data'
import NoSearchResults from '../components/no-search-results'
import SkeletonList from '../components/loaders/skeleton-list'
import PlaygroundListSettings from '../settings/list-settings'

const mockPipelines = [
  {
    id: '0',
    success: true,
    name: 'TI v2 - Build jhttp - cloud',
    sha: '93dbd09a',
    description: 'fix(deps): update module github.com/aws/aws-sdk-go to',
    version: 'v1.5.4.20',
    timestamp: '2 hours ago',
    meter: [
      { id: '0', state: 3 },
      { id: '1', state: 3 },
      { id: '2', state: 3 },
      { id: '3', state: 3 },
      { id: '4', state: 3 },
      { id: '5', state: 3 },
      { id: '6', state: 3 },
      { id: '7', state: 3 },
      { id: '8', state: 1 },
      { id: '9', state: 1 },
      { id: '10', state: 3 }
    ]
  },
  {
    id: '1',
    success: true,
    name: 'Zuul Cloud',
    sha: '366177a6',
    description: 'Update module github.com/aws/aws-sdk-go to',
    version: 'v1.54.19',
    timestamp: '3 hours ago',
    meter: [
      { id: '0', state: 0 },
      { id: '1', state: 0 },
      { id: '2', state: 0 },
      { id: '3', state: 0 },
      { id: '4', state: 0 },
      { id: '5', state: 0 },
      { id: '6', state: 0 },
      { id: '7', state: 1 },
      { id: '8', state: 2 },
      { id: '9', state: 3 },
      { id: '10', state: 3 }
    ]
  },
  {
    id: '2',
    success: true,
    name: 'build scan push K8S - Trivy',
    sha: '93dbd09a',
    description: 'fix: [CI-13371]: Fix log closers in case of step timeouts',
    version: 'v1.5.4.20',
    timestamp: '5 hours ago',
    meter: [
      { id: '0', state: 0 },
      { id: '1', state: 0 },
      { id: '2', state: 0 },
      { id: '3', state: 0 },
      { id: '4', state: 3 },
      { id: '5', state: 1 },
      { id: '6', state: 1 },
      { id: '7', state: 1 },
      { id: '8', state: 1 },
      { id: '9', state: 1 },
      { id: '10', state: 1 }
    ]
  },
  {
    id: '3',
    success: true,
    name: 'Zuul K8S',
    sha: 'da7c1c67',
    description: 'feat: [CDE-119]: Add task handling to spawn and cleanup VM for CDE/gitspaces on bare metalo',
    version: 'v1.5.4.20',
    timestamp: '5 hours ago',
    meter: [
      { id: '0', state: 1 },
      { id: '1', state: 1 },
      { id: '2', state: 1 },
      { id: '3', state: 3 },
      { id: '4', state: 3 },
      { id: '5', state: 3 },
      { id: '6', state: 3 },
      { id: '7', state: 3 },
      { id: '8', state: 2 },
      { id: '9', state: 2 },
      { id: '10', state: 2 }
    ]
  },
  {
    id: '4',
    success: true,
    name: 'build scan push K8S - Trivy',
    sha: '93dbd09a',
    description: 'fix: [CI-13371]: Fix log closers in case of step timeouts',
    version: 'v1.5.4.20',
    timestamp: '5 hours ago',
    meter: [
      { id: '0', state: 0 },
      { id: '1', state: 0 },
      { id: '2', state: 0 },
      { id: '3', state: 3 },
      { id: '4', state: 3 },
      { id: '5', state: 3 },
      { id: '6', state: 1 },
      { id: '7', state: 3 },
      { id: '8', state: 3 },
      { id: '9', state: 3 },
      { id: '10', state: 3 }
    ]
  },
  {
    id: '5',
    success: false,
    name: 'build scan push test - k8s - Clone 2',
    sha: 'fe54f9b1',
    description: 'Update go-jsonnet version to',
    version: 'v0.20.0',
    timestamp: '13 hours ago',
    meter: [
      { id: '0', state: 0 },
      { id: '1', state: 0 },
      { id: '2', state: 0 },
      { id: '3', state: 1 },
      { id: '4', state: 1 },
      { id: '5', state: 1 },
      { id: '6', state: 3 },
      { id: '7', state: 3 },
      { id: '8', state: 3 },
      { id: '9', state: 3 },
      { id: '10', state: 2 }
    ]
  },
  {
    id: '6',
    success: true,
    name: 'build scan push test - cloud',
    sha: 'b7765ad1',
    description: 'update google/go-jsonnet version to',
    version: 'v0.20.0',
    timestamp: '14 hours ago',
    meter: [
      { id: '0', state: 3 },
      { id: '1', state: 3 },
      { id: '2', state: 2 },
      { id: '3', state: 2 },
      { id: '4', state: 3 },
      { id: '5', state: 1 },
      { id: '6', state: 3 },
      { id: '7', state: 3 },
      { id: '8', state: 3 },
      { id: '9', state: 1 },
      { id: '10', state: 1 }
    ]
  },
  {
    id: '7',
    success: false,
    name: 'build scan push test - k8s',
    sha: 'cf5f4b4a',
    description: 'fix: [CI-11759]: Fixing sum for Harness code',
    version: 'v1.5.4.20',
    timestamp: '15 hours ago',
    meter: [
      { id: '0', state: 0 },
      { id: '1', state: 2 },
      { id: '2', state: 2 },
      { id: '3', state: 2 },
      { id: '4', state: 1 },
      { id: '5', state: 1 },
      { id: '6', state: 1 },
      { id: '7', state: 3 },
      { id: '8', state: 3 },
      { id: '9', state: 3 },
      { id: '10', state: 3 }
    ]
  },
  {
    id: '8',
    success: true,
    name: 'build scan push test - k8s - Clone',
    sha: 'da7c1c67',
    description: 'fix: [CI-13371]: Fix log closers in case of step timeouts',
    version: 'v1.5.4.20',
    timestamp: '16 hours ago',
    meter: [
      { id: '0', state: 0 },
      { id: '1', state: 0 },
      { id: '2', state: 3 },
      { id: '3', state: 3 },
      { id: '4', state: 3 },
      { id: '5', state: 2 },
      { id: '6', state: 1 },
      { id: '7', state: 3 },
      { id: '8', state: 3 },
      { id: '9', state: 3 },
      { id: '10', state: 3 }
    ]
  }
]

function RepoSummaryPage() {
  const [loadState, setLoadState] = useState('data-loaded')

  const renderListContent = () => {
    switch (loadState) {
      case 'data-loaded':
        return <Summary pipelines={mockPipelines} />
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
          description={['There are no pipelines in this repository yet.', 'Create new or import an existing pipeline.']}
          primaryButton={{ label: 'Create pipeline' }}
          secondaryButton={{ label: 'Import pipeline' }}
        />
        <PlaygroundListSettings loadState={loadState} setLoadState={setLoadState} />
      </>
    )
  }

  return (
    <>
      <PaddingListLayout spaceTop={false}>
        <Spacer size={2} />
        <Text size={5} weight={'medium'}>
          Summary
        </Text>
        <Spacer size={6} />
        <ListActions.Root>
          <ListActions.Left>
            <ButtonGroup.Root>
              <Button variant="secondary">
                Main&nbsp;&nbsp;
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
              <Button variant="default">Clone Repository</Button>
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
      </PaddingListLayout>
      <PlaygroundListSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}

export default RepoSummaryPage
