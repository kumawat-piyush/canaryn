# Repository Query with Pagination and Filtering

This example demonstrates querying a list of repositories with filtering and pagination using `useQueryState` for URL state management and `useListReposQuery` for fetching data.
The `useCommonFilter` hook provides default query parameters, while `getPaginationHeaders` extracts pagination metadata.

## Example Code

```typescript
import { useQueryState } from 'nuqs'
import { useCommonFilter } from '@harnessio/playground'
import { useListReposQuery } from '@harnessio/code-service-client'
import { getPaginationHeaders } from '../../utils/page-utils'

export default function RepositoryList({ space }: { space: string }) {
  // Retrieve common filters (e.g., sort) and assign a default query if none is specified
  const { query: currentQuery = '', sort } = useCommonFilter<ListReposQueryQueryParams['sort']>()

  // Manage query and page parameters in URL state with "nuqs" library
  const [query, _] = useQueryState('query', { defaultValue: currentQuery })
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  // Fetch repositories based on the current query, sort order, and page number
  const { isFetching, data } = useListReposQuery({
    queryParams: { sort, query, page },
    space_ref: `${space}/+`
  })

  // Extract total pages for pagination control from response headers
  const { totalPages } = getPaginationHeaders(data?.headers || {})

  // Access the list of repositories from the response
  const repositories = data?.content

  return (
    <div>
      <h2>Repository List</h2>
      {/*
          Render repositories
          ...
      */}
      <PaginationControls
        page={page}
        setPage={(pageNum: number) => setPage(pageNum)}
        {/* From headers */}
        totalPages={totalPages}
      />
    </div>
  )
}
```
