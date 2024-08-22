import React from 'react'
import RepoList from '../components/repo-list'
import { Text, Spacer, ListActions, ListPagination, Button, SearchBox } from '@harnessio/canary'

const mockRepos = [
  {
    id: '1',
    name: 'drone',
    description: 'Continuous Integration platform powered by Docker',
    private: false,
    stars: 0,
    forks: 0,
    pulls: 12
  },
  {
    id: '1',
    name: 'drone-go',
    description: 'Go client for the Drone API',
    private: false,
    stars: 0,
    forks: 0,
    pulls: 5
  },
  {
    id: '1',
    name: 'go-generate',
    description: 'Package generate provides tools for generating pipeline configuration files in the Drone format.',
    private: true,
    stars: 2,
    forks: 1,
    pulls: 22
  },
  {
    id: '1',
    name: 'go-task',
    private: false,
    stars: 3,
    forks: 1,
    pulls: 7
  },
  {
    id: '1',
    name: 'go-scm',
    description: 'Package scm provides a unified interface to multiple source code management systems.',
    private: true,
    stars: 123,
    forks: 16,
    pulls: 56
  },
  {
    id: '1',
    name: 'go-convert',
    description: 'Package convert provides tools for converting pipeline configuration files to the Drone format.',
    private: true,
    stars: 0,
    forks: 0,
    pulls: 1
  }
]

function RepoListPage() {
  return (
    // TODO: get layout componentized, this wrapper div is just for quick presentation!
    <div className="px-16 py-16 max-w-[1200px] min-w-[770px] mx-auto">
      <Text size={5} weight={'medium'}>
        Repositories
      </Text>
      <Spacer size={6} />
      <ListActions.Root>
        <ListActions.Left>
          <SearchBox.Root placeholder="Search" />
        </ListActions.Left>
        <ListActions.Right>
          <ListActions.Dropdown
            title="Filter"
            items={[{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]}
          />
          <ListActions.Dropdown
            title="Sort"
            items={[{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]}
          />
          <Button variant="default">Create repository</Button>
        </ListActions.Right>
      </ListActions.Root>
      <Spacer size={5} />
      <RepoList repos={mockRepos} />
      <Spacer size={5} />
      <ListPagination.Root></ListPagination.Root>
    </div>
  )
}

export default RepoListPage
