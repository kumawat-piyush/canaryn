// import React, { useState } from 'react'
import { SkeletonList, NoData, PaddingListLayout, BranchesList } from '@harnessio/playground'
import {
  Button,
  ListActions,
  ListPagination,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  SearchBox,
  Spacer,
  Text
} from '@harnessio/canary'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { useListBranchesQuery } from '@harnessio/code-service-client'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]
export const mockBranchData = [
  {
    id: '0',
    name: 'main',
    timestamp: 'last month',
    user: {
      name: 'Tim Henderson',
      avatarUrl: '../assets/images/user-avatar.svg'
    },
    checks: {
      done: 1,
      total: 1,
      status: 1
    },
    behindAhead: {
      behind: 132,
      ahead: 13
    },
    pullRequest: {
      sha: '1A2Z3F',
      status: 'open'
    }
  },
  {
    id: '1',
    name: 'login-feature',
    timestamp: '2 weeks ago',
    user: {
      name: 'Sarah Johnson',
      avatarUrl: '../assets/images/user-avatar-2.svg'
    },
    checks: {
      done: 5,
      total: 8,
      status: 2
    },
    behindAhead: {
      behind: 12,
      ahead: 25
    },
    pullRequest: {
      sha: 'B3K4M6',
      status: 'merged'
    }
  },
  {
    id: '2',
    name: 'header-bugfix',
    timestamp: '3 days ago',
    user: {
      name: 'John Doe',
      avatarUrl: '../assets/images/user-avatar-3.svg'
    },
    checks: {
      done: 2,
      total: 2,
      status: 1
    },
    behindAhead: {
      behind: 0,
      ahead: 5
    },
    pullRequest: {
      sha: 'D5G7H9',
      status: 'closed'
    }
  },
  {
    id: '3',
    name: 'dashboard-updates',
    timestamp: 'yesterday',
    user: {
      name: 'Alice Kim',
      avatarUrl: '../assets/images/user-avatar-4.svg'
    },
    checks: {
      done: 9,
      total: 10,
      status: 2
    },
    behindAhead: {
      behind: 33,
      ahead: 19
    },
    pullRequest: {
      sha: 'C7Z8X1',
      status: 'open'
    }
  },
  {
    id: '4',
    name: 'payment-hotfix',
    timestamp: '4 hours ago',
    user: {
      name: 'Michael Lee',
      avatarUrl: '../assets/images/user-avatar-5.svg'
    },
    checks: {
      done: 0,
      total: 3,
      status: 0
    },
    behindAhead: {
      behind: 42,
      ahead: 8
    },
    pullRequest: {
      sha: 'P9Q8R7',
      status: 'closed'
    }
  },
  {
    id: '5',
    name: 'auth-improvements',
    timestamp: '2 days ago',
    user: {
      name: 'Emma Stone',
      avatarUrl: '../assets/images/user-avatar-6.svg'
    },
    checks: {
      done: 10,
      total: 10,
      status: 1
    },
    behindAhead: {
      behind: 0,
      ahead: 40
    },
    pullRequest: {
      sha: 'F8G7H6',
      status: 'open'
    }
  },
  {
    id: '6',
    name: 'cleanup-tasks',
    timestamp: 'last week',
    user: {
      name: 'Chris Evans',
      avatarUrl: '../assets/images/user-avatar-7.svg'
    },
    checks: {
      done: 2,
      total: 2,
      status: 1
    },
    behindAhead: {
      behind: 10,
      ahead: 4
    },
    pullRequest: {
      sha: 'J2K5L8',
      status: 'open'
    }
  },
  {
    id: '7',
    name: 'profile-update',
    timestamp: '5 days ago',
    user: {
      name: 'Sophia Turner',
      avatarUrl: '../assets/images/user-avatar-8.svg'
    },
    checks: {
      done: 7,
      total: 8,
      status: 2
    },
    behindAhead: {
      behind: 20,
      ahead: 12
    },
    pullRequest: {
      sha: 'M3N6P2',
      status: 'merged'
    }
  },
  {
    id: '8',
    name: 'code-refactor',
    timestamp: '2 weeks ago',
    user: {
      name: 'Liam Neeson',
      avatarUrl: '../assets/images/user-avatar-9.svg'
    },
    checks: {
      done: 6,
      total: 6,
      status: 1
    },
    behindAhead: {
      behind: 15,
      ahead: 25
    },
    pullRequest: {
      sha: 'Q1R2S3',
      status: 'open'
    }
  },
  {
    id: '9',
    name: 'notification-system',
    timestamp: '3 weeks ago',
    user: {
      name: 'Olivia Brown',
      avatarUrl: '../assets/images/user-avatar-10.svg'
    },
    checks: {
      done: 3,
      total: 3,
      status: 1
    },
    behindAhead: {
      behind: 8,
      ahead: 16
    },
    pullRequest: {
      sha: 'T5U9V3',
      status: 'closed'
    }
  },
  {
    id: '10',
    name: 'email-service',
    timestamp: '5 days ago',
    user: {
      name: 'Robert Smith',
      avatarUrl: '../assets/images/user-avatar-11.svg'
    },
    checks: {
      done: 4,
      total: 5,
      status: 2
    },
    behindAhead: {
      behind: 18,
      ahead: 10
    },
    pullRequest: {
      sha: 'R2T6F9',
      status: 'open'
    }
  },
  {
    id: '11',
    name: 'user-onboarding',
    timestamp: '1 week ago',
    user: {
      name: 'Megan Wilson',
      avatarUrl: '../assets/images/user-avatar-12.svg'
    },
    checks: {
      done: 8,
      total: 8,
      status: 1
    },
    behindAhead: {
      behind: 5,
      ahead: 15
    },
    pullRequest: {
      sha: 'F9H8G7',
      status: 'merged'
    }
  },
  {
    id: '12',
    name: 'api-optimization',
    timestamp: '3 weeks ago',
    user: {
      name: 'David Johnson',
      avatarUrl: '../assets/images/user-avatar-13.svg'
    },
    checks: {
      done: 3,
      total: 3,
      status: 1
    },
    behindAhead: {
      behind: 10,
      ahead: 20
    },
    pullRequest: {
      sha: 'K1M5N9',
      status: 'closed'
    }
  },
  {
    id: '13',
    name: 'search-feature',
    timestamp: '2 days ago',
    user: {
      name: 'Jessica Parker',
      avatarUrl: '../assets/images/user-avatar-14.svg'
    },
    checks: {
      done: 5,
      total: 6,
      status: 2
    },
    behindAhead: {
      behind: 8,
      ahead: 14
    },
    pullRequest: {
      sha: 'L8N7V6',
      status: 'open'
    }
  },
  {
    id: '14',
    name: 'mobile-support',
    timestamp: 'last month',
    user: {
      name: 'Henry Thompson',
      avatarUrl: '../assets/images/user-avatar-15.svg'
    },
    checks: {
      done: 1,
      total: 3,
      status: 1
    },
    behindAhead: {
      behind: 25,
      ahead: 6
    },
    pullRequest: {
      sha: 'X4B3F6',
      status: 'closed'
    }
  },
  {
    id: '15',
    name: 'dark-mode',
    timestamp: '4 days ago',
    user: {
      name: 'Isabella Martinez',
      avatarUrl: '../assets/images/user-avatar-16.svg'
    },
    checks: {
      done: 7,
      total: 7,
      status: 1
    },
    behindAhead: {
      behind: 15,
      ahead: 18
    },
    pullRequest: {
      sha: 'T2B4X9',
      status: 'open'
    }
  }
]

export function ReposBranchesListPage() {
  const repoRef = useGetRepoRef()
  const { isLoading, data } = useListBranchesQuery({ queryParams: {}, repo_ref: repoRef })

  // const [loadState, setLoadState] = useState('data-loaded')

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonList />
    }
    if (data?.length === 0) {
      return (
        <>
          <NoData
            iconName="no-data-branches"
            title="No branches yet"
            description={[
              "Your branches will appear here once they're created. Start branching to see your work organized."
            ]}
          />
          {/* <PlaygroundBranchesSettings loadState={loadState} setLoadState={setLoadState} /> */}
        </>
      )
    }
    return data && <BranchesList branches={mockBranchData} />
  }

  // if (loadState == 'no-data') {
  //   return (
  //     <>
  //       <NoData
  //         iconName="no-data-webhooks"
  //         title="No branches yet"
  //         description={[
  //           "Your branches will appear here once they're created. Start branching to see your work organized."
  //         ]}
  //       />
  //       {/* <PlaygroundBranchesSettings loadState={loadState} setLoadState={setLoadState} /> */}
  //     </>
  //   )
  // }
  return (
    <PaddingListLayout spaceTop={false}>
      <Spacer size={2} />
      <Text size={5} weight={'medium'}>
        Branches
      </Text>
      <Spacer size={6} />
      <ListActions.Root>
        <ListActions.Left>
          <SearchBox.Root placeholder="Search branches" />
        </ListActions.Left>
        <ListActions.Right>
          <ListActions.Dropdown title="Filter" items={filterOptions} />
          <ListActions.Dropdown title="Sort" items={sortOptions} />
          <Button variant="default">Create Branch</Button>
        </ListActions.Right>
      </ListActions.Root>
      <Spacer size={5} />
      {renderContent()}
      <Spacer size={8} />
      {!isLoading && (
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
      {/* <PlaygroundBranchesSettings loadState={loadState} setLoadState={setLoadState} /> */}
    </PaddingListLayout>
  )
}
