import { useParams } from 'react-router-dom'
import type { PathParams } from '../../RouteDefinitions'
import { useAppContext } from '../context/AppContext'

export function useGetSpaceURLParam(): string | undefined {
  const spaces = useAppContext()
  const { spaceId } = useParams<PathParams>()
  return spaceId || spaces?.spaces?.[0]?.space?.path
}
