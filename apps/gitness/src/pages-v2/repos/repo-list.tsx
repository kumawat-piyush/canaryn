import React, { useEffect, useState } from 'react'
import { useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { parseAsInteger, useQueryState } from 'nuqs'
import { Button, Spacer, Text } from '@harnessio/ui/components'
import {
  useListReposQuery,
  RepoRepositoryOutput,
  ListReposQueryQueryParams,
  ListReposOkResponse
} from '@harnessio/code-service-client'
// import {
//   SkeletonList,
//   Filter,
//   useCommonFilter,
//   NoData,
//   NoSearchResults,
//   PaginationComponent,
//   SandboxLayout
// } from '@harnessio/ui/views'
import { SandboxRepoListPage } from '@harnessio/ui/views'
import { useGetSpaceURLParam } from '../../framework/hooks/useGetSpaceParam'
import { timeAgoFromEpochTime } from '../../pages/pipeline-edit/utils/time-utils'
import { PageResponseHeader } from '../../types'
import { useDebouncedQueryState } from '../../hooks/useDebouncedQueryState'
import useSpaceSSE from '../../framework/hooks/useSpaceSSE'
import { SSEEvent } from '../../types'
import { create } from 'lodash-es'

const sortOptions = [
  { name: 'Created', value: 'created' },
  { name: 'Identifier', value: 'identifier' },
  { name: 'Updated', value: 'updated' }
]

const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>

export default function ReposListPage() {
  const space = useGetSpaceURLParam() ?? ''
  const navigate = useNavigate()

  /* Query and Pagination */
  // const { sort } = useCommonFilter<ListReposQueryQueryParams['sort']>()
  const [query, setQuery] = useDebouncedQueryState('query')
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [repos, setRepos] = useState([])

  const {
    isFetching,
    data: { body: repositories, headers } = {},
    isError,
    error,
    refetch
  } = useListReposQuery(
    {
      queryParams: {},
      space_ref: `${space}/+`
    },
    { retry: false }
  )

  useEffect(() => {
    if (repositories) {
      const transformedRepos = repositories.map(repo => ({
        id: repo.id || 0,
        name: repo.identifier || '',
        description: repo.description || '',
        private: !repo.is_public,
        stars: 0,
        forks: repo.num_forks || 0,
        pulls: repo.num_pulls || 0,
        timestamp: repo.updated ? timeAgoFromEpochTime(repo.updated) : '',
        createdAt: repo.created || '',
        importing: !!repo.importing
      }))
      setRepos(transformedRepos)
    } else {
      setRepos([])
    }
  }, [repositories])

  const isRepoStillImporting: boolean = useMemo(() => {
    return repositories?.some(repository => repository.importing) ?? false
  }, [repositories])

  const onEvent = useCallback(
    (_eventRepos: ListReposOkResponse) => {
      if (repositories?.some(repository => repository.importing)) {
        refetch()
      }
    },
    [repositories]
  )

  const events = useMemo(() => [SSEEvent.REPO_IMPORTED], [])

  useSpaceSSE({
    space,
    events,
    onEvent,
    shouldRun: isRepoStillImporting
  })

  const totalPages = parseInt(headers?.get(PageResponseHeader.xTotalPages) || '')

  //   const renderListContent = () => {
  // if (isFetching) return <SkeletonList />

  // if (isError)
  //   return (
  //     <NoData
  //       title="Error"
  //       description={[error.message || '']}
  //       primaryButton={{
  //         label: 'Go Back',
  //         onClick: () => {
  //           navigate(-1)
  //         }
  //       }}
  //     />
  //   )

  // if (!repositories?.length) {
  //   if (query) {
  //     return (
  //       <NoSearchResults
  //         iconName="no-search-magnifying-glass"
  //         title="No search results"
  //         description={['Check your spelling and filter options,', 'or search for a different keyword.']}
  //         primaryButton={{ label: 'Clear search', onClick: () => setQuery('') }}
  //       />
  //     )
  //   }
  //   return (
  //     <NoData
  //       iconName="no-data-folder"
  //       title="No repositories yet"
  //       description={[
  //         'There are no repositories in this project yet.',
  //         'Create new or import an existing repository.'
  //       ]}
  //       primaryButton={{ label: 'Create repository', to: `create` }}
  //       /**
  //        * @TODO add "to" link when Import repository gets implemented
  //        */
  //       secondaryButton={{ label: 'Import repository', to: 'import' }}
  //     />
  //   )
  // }

  //     return (
  //       <RepoList
  //         LinkComponent={LinkComponent}
  //         repos={repositories?.map((repo: RepoRepositoryOutput) => {
  //           return {
  //             id: repo.id || 0,
  //             name: repo.identifier,
  //             description: repo.description,
  //             private: !repo.is_public,
  //             stars: 0,
  //             forks: repo.num_forks,
  //             pulls: repo.num_pulls,
  //             timestamp: (repo.updated && timeAgoFromEpochTime(repo.updated)) || '',
  //             importing: repo.importing
  //           }
  //         })}
  //       />
  //     )
  //   }

  //   const repositoriesExist = (repositories?.length || 0) > 0
  //   console.log('repositories', repositories)

  return <SandboxRepoListPage repositories={repos} />
}
