import {
  Button,
  ListPagination,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Spacer,
  Text
} from '@harnessio/canary'
import { useListReposQuery, RepoRepositoryOutput, ListReposQueryQueryParams } from '@harnessio/code-service-client'
import { PaddingListLayout, SkeletonList, RepoList, Filter, useCommonFilter } from '@harnessio/playground'
import { Link, useNavigate } from 'react-router-dom'
import { useGetSpaceURLParam } from '../../framework/hooks/useGetSpaceParam'
import { usePagination } from '../../framework/hooks/usePagination'

import Header from '../../components/Header'
import { timeAgoFromEpochTime } from '../pipeline-edit/utils/time-utils'
import { PageResponse } from '../../types'

const sortOptions = [
  { name: 'Created', value: 'created' },
  { name: 'Identifier', value: 'identifier' },
  { name: 'Updated', value: 'updated' }
]

const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>

export default function ReposListPage() {
  const navigate = useNavigate()
  const space = useGetSpaceURLParam()

  const { query, sort } = useCommonFilter<ListReposQueryQueryParams['sort']>()

  const { isFetching, data } = useListReposQuery({ queryParams: { sort, query }, space_ref: `${space}/+` })
  // @ts-expect-error: content and pageResponse do not appear in response type
  const { content: repositories, pageResponse } = data || {}
  const { totalPages } = (pageResponse as PageResponse) || {}
  const { currentPage, previousPage, nextPage, handleClick } = usePagination(1, totalPages)

  const renderListContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    return (
      repositories && (
        <RepoList
          LinkComponent={LinkComponent}
          repos={repositories?.map((repo: RepoRepositoryOutput) => {
            return {
              id: repo.id,
              name: repo.identifier,
              description: repo.description,
              private: !repo.is_public,
              stars: 0,
              forks: repo.num_forks,
              pulls: repo.num_pulls,
              timestamp: repo.updated && timeAgoFromEpochTime(repo.updated)
            }
          })}
        />
      )
    )
  }

  return (
    <>
      <Header />
      <PaddingListLayout>
        <Text size={5} weight={'medium'}>
          Repositories
        </Text>
        <Spacer size={6} />
        <div className="flex justify-between gap-5">
          <div className="flex-1">
            <Filter sortOptions={sortOptions} />
          </div>
          <Button variant="default" onClick={() => navigate(`/sandbox/spaces/${space}/repos/create`)}>
            Create Repo
          </Button>
        </div>
        <Spacer size={5} />
        {renderListContent()}
        <Spacer size={8} />
        {(repositories?.length ?? 0) > 0 && (
          <ListPagination.Root>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    size="sm"
                    href="#"
                    onClick={() => currentPage > 1 && previousPage()}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      size="sm_icon"
                      href="#"
                      onClick={() => handleClick(index + 1)}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    size="sm"
                    href="#"
                    onClick={() => currentPage < totalPages && nextPage()}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </ListPagination.Root>
        )}
      </PaddingListLayout>
    </>
  )
}
