import { useCallback, useEffect, useMemo } from 'react'

import { parseAsInteger, useQueryState } from 'nuqs'

import { ListReposOkResponse, useListReposQuery } from '@harnessio/code-service-client'
import { SandboxRepoListPage } from '@harnessio/ui/views'

import { useGetSpaceURLParam } from '../../framework/hooks/useGetSpaceParam'
import useSpaceSSE from '../../framework/hooks/useSpaceSSE'
import { useDebouncedQueryState } from '../../hooks/useDebouncedQueryState'
import { SSEEvent } from '../../types'
import { useRepoStore } from './stores/repo-store'

export default function ReposListPage() {
  const space = useGetSpaceURLParam() ?? ''
  const { setRepositories, page, setPage } = useRepoStore()

  /* Query and Pagination */
  const [query] = useDebouncedQueryState('query')
  const [queryPage, setQueryPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const { data: { body: repoData, headers } = {}, refetch } = useListReposQuery(
    {
      queryParams: { page, query },
      space_ref: `${space}/+`
    },
    { retry: false }
  )

  useEffect(() => {
    if (repoData) {
      setRepositories(repoData, headers)
    }
  }, [repoData, headers, setRepositories])

  useEffect(() => {
    setQueryPage(page)
  }, [queryPage, page, setPage])

  const isRepoStillImporting: boolean = useMemo(() => {
    return repoData?.some(repository => repository.importing) ?? false
  }, [repoData])

  const onEvent = useCallback(
    (_eventRepos: ListReposOkResponse) => {
      if (repoData?.some(repository => repository.importing)) {
        refetch()
      }
    },
    [repoData]
  )

  const events = useMemo(() => [SSEEvent.REPO_IMPORTED], [])

  useSpaceSSE({
    space,
    events,
    onEvent,
    shouldRun: isRepoStillImporting
  })

  return <SandboxRepoListPage useRepoStore={useRepoStore} />
}
