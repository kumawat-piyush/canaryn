import React from 'react'
import {
  ListPagination,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Spacer
} from '@harnessio/canary'
import { NoData, PullRequestCommits, SkeletonList } from '@harnessio/playground'
import { useListPullReqCommitsQuery, TypesCommit } from '@harnessio/code-service-client'

export default function PullRequestCommitsPage() {
  const { data: commitData, isFetching } = useListPullReqCommitsQuery(
    {
      repo_ref: 'workspace/repo/+',
      pullreq_number: 1,
      queryParams: { page: 0, limit: 10 }
    },
    /* To enable mock data */
    {
      placeholderData: {
        // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
        content: [
          {
            sha: 'a4ff390fb95d9f9c2a6fbdbf8a7727e08278f96c',
            parent_shas: ['b8f89f0c074b0ecc7dc30ecae0889ae3e6638fc8'],
            title: 'Create cxzcxzcxzc.txt',
            message: 'Create cxzcxzcxzc.txt',
            author: {
              identity: {
                name: 'Administrator',
                email: 'admin@gitness.io'
              },
              when: '2024-02-27T13:33:23-07:00'
            },
            committer: {
              identity: {
                name: 'Gitness',
                email: 'system@gitness.io'
              },
              when: '2024-02-27T13:33:23-07:00'
            }
          }
        ]
      },
      enabled: true
    }
  )

  const renderContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
    if (commitData?.content?.length) {
      return (
        <PullRequestCommits
          // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
          data={commitData?.content.map((item: TypesCommit) => ({
            sha: item.sha,
            parent_shas: item.parent_shas,
            title: item.title,
            message: item.message,
            author: item.author,
            committer: item.committer
          }))}
        />
      )
    } else {
      return (
        <NoData
          iconName="no-data-folder"
          title="No commits yet"
          description={['There are no commits for this pull request yet.']}
        />
      )
    }
  }

  return (
    <>
      {renderContent()}
      <Spacer size={8} />
      {/* TODO: actually add pagination when apis are implemented */}
      {!isFetching && (
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
  )
}
