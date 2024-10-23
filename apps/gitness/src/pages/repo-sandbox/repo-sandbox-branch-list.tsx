import { useEffect } from 'react'
import { SkeletonList, NoData, BranchesList, Filter, useCommonFilter, SandboxLayout } from '@harnessio/playground'
import { Button, Spacer, Text } from '@harnessio/canary'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { PageControls } from '../../components/Pagination'
import {
  useListBranchesQuery,
  RepoBranch,
  ListBranchesErrorResponse,
  useCalculateCommitDivergenceMutation,
  useFindRepositoryQuery,
  ListBranchesQueryQueryParams
} from '@harnessio/code-service-client'
import { orderSortDate } from '../../types'
import { timeAgoFromISOTime } from '../pipeline-edit/utils/time-utils'
import { Link } from 'react-router-dom'

const sortOptions = [
  { name: 'Date', value: 'date' },
  { name: 'Name', value: 'name' }
]

export function RepoSandboxBranchesListPage() {
  // lack of data: total branches
  const repoRef = useGetRepoRef()
  const { data: repoMetadata } = useFindRepositoryQuery({ repo_ref: repoRef })

  const { sort, query } = useCommonFilter<ListBranchesQueryQueryParams['sort']>()

  const {
    isLoading,
    data: brancheslistData,
    isError
  } = useListBranchesQuery(
    {
      queryParams: { page: 1, limit: 20, sort, query, order: orderSortDate.DESC, include_commit: true },
      repo_ref: repoRef
    },
    {
      onError: (error: ListBranchesErrorResponse) => {
        console.error('Error BranchList', error)
      }
    }
  )

  const { data: branchDivergence, mutate } = useCalculateCommitDivergenceMutation({
    repo_ref: repoRef
  })

  useEffect(() => {
    if (brancheslistData?.content?.length !== 0 && brancheslistData !== undefined) {
      mutate({
        body: {
          requests:
            brancheslistData?.content?.map(branch => ({
              from: branch.name,
              to: repoMetadata?.content?.default_branch
            })) || []
        }
      })
    }
  }, [mutate, brancheslistData, repoMetadata?.content?.default_branch])

  const renderContent = (error?: ListBranchesErrorResponse) => {
    if (isLoading) {
      return <SkeletonList />
    }

    if (isError) {
      return (
        <div className="mt-40">
          <NoData iconName="no-data-branches" title="Data not available" description={[`${error?.message}`]} />
        </div>
      )
    }

    if (brancheslistData?.content?.length === 0 || brancheslistData === undefined) {
      return (
        <div className="mt-40">
          <NoData
            iconName="no-data-branches"
            title="No branches yet"
            description={[
              "Your branches will appear here once they're created.",
              'Start branching to see your work organized.'
            ]}
            primaryButton={{ label: 'Create new branch' }}
          />
        </div>
      )
    }

    //get the data arr from behindAhead
    const behindAhead =
      branchDivergence?.content?.map(divergence => {
        return {
          behind: divergence.behind,
          ahead: divergence.ahead
        }
      }) || []

    return (
      <BranchesList
        branches={brancheslistData?.content?.map((branch: RepoBranch, index) => {
          const { ahead: branchAhead, behind: branchBehind } = behindAhead[index] || {}
          return {
            id: index,
            name: branch.name || '',
            sha: branch.commit?.sha || '',
            timestamp: branch.commit?.committer?.when ? timeAgoFromISOTime(branch.commit.committer.when) : '',
            user: {
              name: branch.commit?.committer?.identity?.name || '',
              avatarUrl: ''
            },
            behindAhead: {
              behind: branchBehind || 0,
              ahead: branchAhead || 0,
              default: repoMetadata?.content?.default_branch === branch.name
            }
          }
        })}
      />
    )
  }
  return (
    <>
      <SandboxLayout.Main hasHeader hasLeftPanel>
        <SandboxLayout.Content>
          <Spacer size={10} />
          <Text size={5} weight={'medium'}>
            Branches
          </Text>
          <Spacer size={6} />
          <div className="flex justify-between gap-5 items-center">
            <div className="flex-1">
              <Filter sortOptions={sortOptions} />
            </div>
            <Button variant="default" asChild>
              <Link to="create">Create Branch</Link>
            </Button>
          </div>
          <Spacer size={5} />
          {renderContent()}
          <Spacer size={8} />
          {(brancheslistData?.content?.length ?? 0) > 0 && (
            <PageControls totalPages={brancheslistData?.headers?.['total']} />
          )}
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}
