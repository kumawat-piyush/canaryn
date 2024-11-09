import { useQueryState } from 'nuqs'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash-es'

interface DebouncedQueryStateProps {
  key: string
  defaultValue?: string
  delay?: number
}

export function useDebouncedQueryState({
  key,
  defaultValue = '',
  delay = 300
}: DebouncedQueryStateProps): [string, (value: string) => void] {
  const [query, setQuery] = useQueryState(key, { defaultValue })
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  const debouncedSetQuery = useCallback(
    debounce((newQuery: string) => setDebouncedQuery(newQuery), delay),
    [delay]
  )

  useEffect(() => {
    debouncedSetQuery(query)
    return () => {
      debouncedSetQuery.cancel()
    }
  }, [query, debouncedSetQuery])

  return [debouncedQuery, setQuery]
}
