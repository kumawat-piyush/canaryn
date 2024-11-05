import { Link } from 'react-router-dom'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useListReposQuery, RepoRepositoryOutput, ListReposQueryQueryParams } from '@harnessio/code-service-client'
import { RepoList, useCommonFilter } from '@harnessio/playground'
import { useGetSpaceURLParam } from '../../framework/hooks/useGetSpaceParam'
import Header from '../../components/Header'
import { timeAgoFromEpochTime } from '../pipeline-edit/utils/time-utils'
import { PageResponseHeader } from '../../types'

const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>

export default function ReposListPage() {
  const space = useGetSpaceURLParam()

  /* Query and Pagination */
  const { query: currentQuery = '', sort } = useCommonFilter<ListReposQueryQueryParams['sort']>()
  const [query, _] = useQueryState('query', { defaultValue: currentQuery })
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const { isFetching, data: { body: repositories, headers } = {} } = useListReposQuery({
    queryParams: { sort, query, page },
    space_ref: `${space}/+`
  })

  const totalPages = parseInt(headers?.get(PageResponseHeader.xTotalPages) || '')

  return (
    <>
      <Header />
      <RepoList
        repos={repositories?.map((repo: RepoRepositoryOutput) => {
          return {
            id: repo.id,
            name: repo.identifier || '',
            description: repo.description,
            private: !repo.is_public,
            stars: 0,
            forks: repo.num_forks || 0,
            pulls: repo.num_pulls || 0,
            timestamp: repo.updated ? timeAgoFromEpochTime(repo.updated) : ''
          }
        })}
        loading={isFetching}
        searchTerm={query}
        paginationProps={{
          totalPages,
          currentPage: page,
          goToPage: setPage
        }}
        LinkComponent={LinkComponent}
      />
    </>
  )
}
