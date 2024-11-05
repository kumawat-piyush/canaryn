import { Text, Badge, Button, Icon, ListActions, SearchBox, Spacer, StackedList } from '@harnessio/canary'
import React from 'react'
import { NoData } from './no-data'
import { SkeletonList } from './loaders/skeleton-list'
import { NoSearchResults } from './no-search-results'
import { PaginationComponent, PaginationComponentProps } from './pagination'
import { PaddingListLayout } from '../layouts/PaddingListLayout'

export interface Repo {
  name: string
  private: boolean
  forks: number
  pulls: number
  timestamp: string
  description?: string
  stars?: number
}

export interface PageProps {
  repos?: Repo[]
  loading?: boolean
  searchTerm?: string
  paginationProps?: PaginationComponentProps
  LinkComponent: React.ComponentType<{ to: string; children: React.ReactNode }>
}

const sortOptions = [
  { name: 'Created', value: 'created' },
  { name: 'Identifier', value: 'identifier' },
  { name: 'Updated', value: 'updated' }
]

const Stats = ({ stars, forks, pulls }: { stars?: number; forks: number; pulls: number }) => (
  <div className="flex gap-3 justify-end items-center select-none font-medium">
    <span className="flex gap-1.5 items-center">
      <Icon width={16} name="star" className="text-tertiary-background" />
      <span className="text-primary text-xs font-normal">{stars || 0}</span>
    </span>
    <span className="flex gap-1.5 items-center">
      <Icon size={16} name="pull" className="text-tertiary-background" />
      <span className="text-primary text-xs font-normal">{forks || 0}</span>
    </span>
    <span className="flex gap-1.5 items-center">
      <Icon size={16} name="pull" className="text-tertiary-background" />
      <span className="text-primary text-xs font-normal">{pulls || 0}</span>
    </span>
  </div>
)

const Title = ({ title, isPrivate }: { title: string; isPrivate: boolean }) => (
  <div className="inline-flex gap-2 items-center">
    {title}
    <Badge size="sm" disableHover borderRadius="full" theme={isPrivate ? 'muted' : 'success'}>
      {isPrivate ? 'Private' : 'Public'}
    </Badge>
  </div>
)

export function RepoList({ repos, LinkComponent, loading, searchTerm, paginationProps }: PageProps) {
  if (repos?.length === 0) {
    if (searchTerm) {
      return (
        <NoSearchResults
          iconName="no-search-magnifying-glass"
          title="No search results"
          description={['Check your spelling and filter options,', 'or search for a different keyword.']}
          primaryButton={{ label: 'Clear search' }}
          secondaryButton={{ label: 'Clear filters' }}
        />
      )
    }
    return (
      <NoData
        iconName="no-data-folder"
        title="No repositories yet"
        description={['There are no repositories in this project yet.', 'Create new or import an existing repository.']}
        primaryButton={{ label: 'Create repository' }}
        secondaryButton={{ label: 'Import repository' }}
      />
    )
  }

  if (loading) {
    return <SkeletonList />
  }

  return (
    <>
      <PaddingListLayout>
        <Text size={5} weight={'medium'}>
          Repositories
        </Text>
        <Spacer size={6} />
        <ListActions.Root>
          <ListActions.Left>
            <SearchBox.Root placeholder="Search repositories" />
          </ListActions.Left>
          <ListActions.Right>
            <ListActions.Dropdown title="Sort" items={sortOptions} />
            <Button variant="default">Create repository</Button>
          </ListActions.Right>
        </ListActions.Root>
        <Spacer size={5} />
        {repos && repos.length > 0 && (
          <StackedList.Root>
            {repos.map((repo, repo_idx) => (
              <LinkComponent to={repo.name}>
                <StackedList.Item key={repo.name} isLast={repos.length - 1 === repo_idx}>
                  <StackedList.Field
                    description={repo.description}
                    title={<Title title={repo.name} isPrivate={repo.private} />}
                  />
                  <StackedList.Field
                    title={
                      <>
                        Updated <em>{repo.timestamp}</em>
                      </>
                    }
                    description={<Stats stars={repo.stars} forks={repo.forks} pulls={repo.pulls} />}
                    right
                    label
                    secondary
                  />
                </StackedList.Item>
              </LinkComponent>
            ))}
          </StackedList.Root>
        )}
        {paginationProps && <PaginationComponent {...paginationProps} />}
      </PaddingListLayout>
    </>
  )
}
