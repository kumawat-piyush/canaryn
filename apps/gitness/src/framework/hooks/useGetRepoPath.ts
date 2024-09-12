import { useParams } from 'react-router-dom'
import { URLProps } from '../../RouteDefinitions'
import { useGetSpaceParam } from './useGetSpaceParam'

export function useGetRepoPath(): string {
  const space = useGetSpaceParam()
  const { repoId } = useParams<URLProps>()
  return space && repoId ? `${space}/${repoId}/+` : ''
}
