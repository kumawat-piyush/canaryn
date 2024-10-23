import { Button, ListActions, SearchBox, Spacer, Text } from '@harnessio/canary'
import { useListReposQuery, RepoRepositoryOutput } from '@harnessio/code-service-client'
import { SkeletonList, RepoList, SandboxLayout } from '@harnessio/playground'
import { Link, useNavigate } from 'react-router-dom'
import { useGetSpaceURLParam } from '../../framework/hooks/useGetSpaceParam'
import { PageControls } from '../../components/Pagination'
import { timeAgoFromEpochTime } from '../pipeline-edit/utils/time-utils'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]
const viewOptions = [{ name: 'View option 1' }, { name: 'View option 2' }]

const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>

export default function ReposSandboxListPage() {
  const navigate = useNavigate()
  const space = useGetSpaceURLParam()

  const { isFetching, data } = useListReposQuery({ queryParams: {}, space_ref: `${space}/+` })

  const renderListContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    return (
      data && (
        <RepoList
          LinkComponent={LinkComponent}
          repos={data?.map((repo: RepoRepositoryOutput) => {
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
      <SandboxLayout.Main hasHeader hasLeftPanel>
        <SandboxLayout.Content>
          <Spacer size={10} />
          <Text size={5} weight={'medium'}>
            Repositories
          </Text>
          <Spacer size={6} />
          <ListActions.Root>
            <ListActions.Left>
              <SearchBox.Root placeholder="Search repositories" />
            </ListActions.Left>
            <ListActions.Right>
              <ListActions.Dropdown title="Filter" items={filterOptions} />
              <ListActions.Dropdown title="Sort" items={sortOptions} />
              <ListActions.Dropdown title="View" items={viewOptions} />
              <Button variant="default" onClick={() => navigate(`/sandbox/spaces/${space}/repos/create`)}>
                Create Repo
              </Button>
            </ListActions.Right>
          </ListActions.Root>
          <Spacer size={5} />
          {renderListContent()}
          <Spacer size={8} />
          {(data?.content?.length ?? 0) > 0 && <PageControls totalPages={data?.headers?.['total']} />}
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}
