import React, { useState } from 'react'
import { Spacer, Text, ListActions, SearchBox, Button } from '@harnessio/canary'
import { SandboxLayout, SkeletonList, NoData } from '..'
import { mockMemberData } from '../data/mockMembersData'
import { MembersList } from '../components/members-list'
import { PlaygroundListSettings } from '../settings/list-settings'
import { PaginationComponent } from '../components/pagination'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]

type MembersProps = {
  display_name: string
  role: string
  email: string
  avatarUrl?: string
  timestamp?: string
}

function SandboxSettingsProjectMembersPage() {
  const [loadState, setLoadState] = useState('data-loaded')

  const renderMemberListContent = () => {
    switch (loadState) {
      case 'no-data':
        return (
          //reivse name later
          <>
            <NoData
              iconName="no-data-folder"
              title="No Members yet"
              description={['Add your first team members by inviting them to join this project.']}
              primaryButton={{ label: 'Invite new members' }}
            />
            <PlaygroundListSettings loadState={loadState} setLoadState={setLoadState} />
          </>
        )
      case 'loading':
        return <SkeletonList />
      case 'data-loaded':
        return <MembersList members={mockMemberData as MembersProps[]} />
      case 'no-search-matches':
        return (
          <NoData
            iconName="no-search-magnifying-glass"
            title="No search results"
            description={['Check your spelling and filter options,', 'or search for a different keyword.']}
            primaryButton={{ label: 'Clear search' }}
            secondaryButton={{ label: 'Clear filters' }}
          />
        )
    }
  }

  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content maxWidth="3xl">
        <Spacer size={10} />
        <div>
          <Text size={5} weight={'medium'}>
            Team
          </Text>
          <Text size={5} weight={'medium'} color="tertiaryBackground">
            {loadState === 'loading' && ''}
            {loadState === 'no-data' && ', 0 members'}
            {loadState === 'loaded' && ', 30 members'}
            {loadState === 'no-search-matches' && ', 30 members'}
          </Text>
        </div>
        <Spacer size={6} />
        <ListActions.Root>
          <ListActions.Left>
            <SearchBox.Root placeholder="Search Members" />
          </ListActions.Left>
          <ListActions.Right>
            <ListActions.Dropdown title="All Team Roles" items={filterOptions} />
            <ListActions.Dropdown title="Last added" items={sortOptions} />
            <Button variant="default">Invite New Members</Button>
          </ListActions.Right>
        </ListActions.Root>
        <Spacer size={5} />
        {renderMemberListContent()}
        <Spacer size={8} />
        {loadState === 'data-loaded' && (
          <PaginationComponent
            totalPages={10}
            currentPage={5}
            nextPage={() => {}}
            previousPage={() => {}}
            handleClick={() => {}}
          />
        )}
        <PlaygroundListSettings loadState={loadState} setLoadState={setLoadState} />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsProjectMembersPage }
