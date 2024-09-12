import { useParams } from 'react-router-dom'
import type { URLProps } from '../../RouteDefinitions'

export function useGetSpaceParam(): string | undefined {
  const { space } = useParams<URLProps>()
  return space
}
