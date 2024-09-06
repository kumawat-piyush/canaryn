import React, { useState } from 'react'
import { Spacer, ListActions, Button, SearchBox, Text, Icon, ButtonGroup, StackedList } from '@harnessio/canary'
import { Summary } from '../components/repo-summary'
import NoData from '../components/no-data'
import NoSearchResults from '../components/no-search-results'
import SkeletonList from '../components/loaders/skeleton-list'
import PlaygroundListSettings from '../settings/list-settings'
import FullWidth2ColumnLayout from '../layouts/FullWidth2ColumnLayout'
import { mockFiles } from '../data/mockSummaryFiiles'
import Floating1ColumnLayout from '../layouts/Floating1ColumnLayout'

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
    <Floating1ColumnLayout>
      <FullWidth2ColumnLayout
        leftColumn={
          <>
            <Spacer size={6} />
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
            <Spacer size={12} />
            <StackedList.Root>
              <StackedList.Item isHeader disableHover>
                <StackedList.Field title={<Text color="tertiaryBackground">README.md</Text>} />
              </StackedList.Item>
              <StackedList.Item disableHover>
                {/* Dummy WYSIWYG content */}
                <div className="flex flex-col gap-4 px-3 py-2">
                  <Text size={5} weight="medium">
                    Pixel Point — Web Design and Development
                  </Text>
                  <Text size={3}>Table of Contents</Text>
                  <ul className="flex flex-col gap-1">
                    <li>
                      <Text weight="normal" className="text-primary/80">
                        - Welcome
                      </Text>
                    </li>
                    <li>
                      <Text weight="normal" className="text-primary/80">
                        - Getting started
                      </Text>
                    </li>
                    <li>
                      <Text weight="normal" className="text-primary/80">
                        - Usage
                      </Text>
                    </li>
                  </ul>
                  <Text size={3} weight="medium">
                    Welcome
                  </Text>
                  <Text className="text-primary/80">
                    Below you will find some basic information about how to work with this project. If you've spotted a
                    bug, a copywriting mistake or just want to suggest some better solution, please, refer to the
                    contribution section.
                  </Text>
                  <Text className="text-primary/80">
                    Hello there! This repo is a home to Pixel Point, a web agency that designs and develops world-class
                    marketing websites. We made this codebase available to open source community so everyone can get
                    something useful out of our expertise, be it for project structure, code patterns or plugins.
                  </Text>
                </div>
              </StackedList.Item>
            </StackedList.Root>
          </>
        }
        rightColumn={
          <div className="flex flex-col">
            <Spacer size={5} />
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
    </Floating1ColumnLayout>
  )
}

export default RepoSummaryPage
