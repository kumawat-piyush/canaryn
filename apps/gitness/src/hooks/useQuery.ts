import { useQueryState } from 'nuqs'
import { useDebounce } from './useDebounce'

export function useQuery(defaultValue = '', delay = 300): [string, (value: string) => void] {
  const [query, setQuery] = useQueryState('query', { defaultValue })
  const debouncedQuery = useDebounce(query, delay)
  return [debouncedQuery, setQuery] as const
}
