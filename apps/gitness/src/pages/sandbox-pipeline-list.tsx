import { Link } from 'react-router-dom'
import { Button, Spacer, Text } from '@harnessio/canary'
import { useListPipelinesQuery, TypesPipeline } from '@harnessio/code-service-client'
import { PipelineList, MeterState, SandboxLayout, SkeletonList, Filter, useCommonFilter } from '@harnessio/playground'
import { ExecutionState } from '../types'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'
import { PageControls } from '../components/Pagination'

export default function SandboxPipelinesPage() {
  const repoRef = useGetRepoRef()

  const { query } = useCommonFilter()

  const { data: pipelines, isFetching } = useListPipelinesQuery(
    {
      repo_ref: repoRef,
      queryParams: { page: 0, limit: 10, query: query?.trim(), latest: true }
    },
    /* To enable mock data */
    {
      placeholderData: { content: [{ identifier: 'pipeline1' }, { identifier: 'pipeline2' }], headers: {} },
      enabled: true
    }
  )

  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>

  const renderListContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    return (
      <PipelineList
        pipelines={pipelines?.content?.map((item: TypesPipeline) => ({
          id: item?.identifier,
          status: item?.execution?.status,
          name: item?.identifier,
          sha: item?.execution?.after,
          description: item?.execution?.message,
          timestamp: item?.created,
          meter: [
            {
              id: item?.execution?.number,
              state: item?.execution?.status === ExecutionState.SUCCESS ? MeterState.Success : MeterState.Error
            }
          ]
        }))}
        LinkComponent={LinkComponent}
      />
    )
  }

  return (
    <>
      <SandboxLayout.Main hasHeader hasLeftPanel>
        <SandboxLayout.Content>
          <Spacer size={10} />
          <Text size={5} weight={'medium'}>
            Pipelines
          </Text>
          <Spacer size={6} />
          <div className="flex justify-between gap-5">
            <div className="flex-1">
              <Filter />
            </div>
            <Button variant="default" asChild>
              <Link to="create">Create Pipeline</Link>
            </Button>
          </div>

          <Spacer size={5} />
          {renderListContent()}
          <Spacer size={8} />
          {(pipelines?.content?.length ?? 0) > 0 && <PageControls totalPages={pipelines?.headers?.['total']} />}
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}
